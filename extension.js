const vscode = require("vscode");
const cp = require("child_process");
const axios = require("axios");

const AI_API_URI = process.env.AI_API_URI;
const AI_MODEL_NAME = process.env.AI_MODEL_NAME;
const AI_API_KEY = process.env.AI_API_KEY;

function activate(context) {
    let disposable = vscode.commands.registerCommand(
        "commitly.generateCommitMessage",
        async () => {
            try {
                const stagedDiff = await getStagedDiff();
                if (!stagedDiff) {
                    console.log("no staging data");
                    vscode.window.showWarningMessage(
                        "No staged changes detected."
                    );
                    return;
                } else {
                    console.log("staging data found");
                }

                const aiResponse = await generateCommitMessage(stagedDiff);
                if (!aiResponse) {
                    vscode.window.showErrorMessage(
                        "Failed to generate commit message using AI."
                    );
                    return;
                }

                const commitMessage = formatCommitMessage(aiResponse);

                await commitChanges(commitMessage);

                vscode.window.showInformationMessage(
                    "Commit completed successfully!"
                );
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(disposable);
}

async function getStagedDiff() {
    return new Promise((resolve, reject) => {
        cp.exec(
            "git diff --staged",
            { cwd: vscode.workspace.rootPath },
            (err, stdout, stderr) => {
                if (err || stderr) {
                    reject(
                        new Error(
                            "Failed to get staged changes. Make sure you're in a Git repository."
                        )
                    );
                }
                resolve(stdout.trim() || null);
            }
        );
    });
}

async function generateCommitMessage(stagedDiff) {
    const prompt = `
    Based on the following line-by-line changes in a commit, please generate an informative commit title and description:
    (max two or three lines of description to not exceed the model max token limitation):
    Commit changes:
    ${stagedDiff}
    Format your response as follows:
    Commit title: [Generated commit title]
    Commit description: [Generated commit description]
  `;

    try {
        const response = await axios.post(
            AI_API_URI,
            {
                model: AI_MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an assistant that writes concise, clear commit messages.",
                    },
                    { role: "user", content: prompt },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${AI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = response.data.choices?.[0]?.message?.content || null;
        return content;
    } catch (error) {
        console.log(error);
        throw new Error(`OpenAI API returned an error: ${error.message}`);
    }
}

function formatCommitMessage(aiResponse) {
    const titleMatch = aiResponse.match(/Commit title:\s*(.*)/);
    const descMatch = aiResponse.match(/Commit description:\s*(.*)/s);

    const title = titleMatch ? titleMatch[1].trim() : "Generated Commit Title";
    const description = descMatch
        ? descMatch[1].trim()
        : "Generated Commit Description";

    return `${title}\n\n${description}`;
}

async function commitChanges(commitMessage) {
    return new Promise((resolve, reject) => {
        cp.exec(
            `git commit -m "${commitMessage}"`,
            { cwd: vscode.workspace.rootPath },
            (err, stdout, stderr) => {
                if (err) {
                    reject(
                        new Error(`Failed to commit changes: ${err.message}`)
                    );
                }
                resolve(stdout);
            }
        );
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
