# Commitly - Automated Commit Message Generator

Commitly is a VS Code extension that uses AI to automatically generate clear and concise commit messages based on your staged changes. With just one click, it analyzes the differences in your code and creates an informative commit title and description, helping you save time and maintain consistent commit message standards. Perfect for developers who want to streamline their workflow and improve version control practices!

## Features

-   **Automatic Commit Message Generation**: Analyze your staged changes and generate informative commit titles and descriptions automatically.
-   **AI-Powered**: Uses AI's model to understand your code changes and produce high-quality commit messages.
-   **Easy Integration**: Just one command in VS Code to automatically commit your changes with the generated message.
-   **Customizable**: Provides concise, clear commit messages in a structured format that helps maintain clean Git history.

## Installation

1. Open **VS Code**.
2. Navigate to the **Extensions** tab.
3. Search for `Commitly`.
4. Click **Install**.

Or, install it directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/).

## Usage

1. **Stage Your Changes**: Stage the changes in your Git repository using the VS Code Source Control panel.
2. **Generate Commit Message**: Open the command palette (Cmd+Shift+P on Mac or Ctrl+Shift+P on Windows/Linux) and run the command: `Commitly: Generate Commit Message`.
3. **Review Commit Message**: The extension will generate a commit title and description based on your staged changes.
4. **Commit Automatically**: The extension will automatically commit your changes with the generated message.

## Command

-   **`Commitly: Generate Commit Message`**: This command analyzes your staged changes, generates a commit title and description using OpenAI's GPT-4, and commits the changes with the generated message.

## Requirements

-   **Git**: Make sure Git is installed and configured on your system.
-   **OpenAI API Key**: You'll need an OpenAI API key to use the commit message generation feature. Insert your API key in the `OPENAI_API_KEY` variable in the extension's code.

    You can get your API key from [OpenAI](https://platform.openai.com/).

## How It Works

1. **Get Staged Changes**: The extension uses `git diff --staged` to fetch the changes you have staged for commit.
2. **Generate Commit Message**: The staged changes are passed to OpenAI's GPT-4 API, which generates a commit title and description.
3. **Commit the Changes**: The generated commit message is used in the `git commit` command to commit your changes automatically.

## Contributing

If you would like to contribute to the project, feel free to submit pull requests or open issues for any bugs, enhancements, or suggestions.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make changes and commit them.
4. Push your branch and create a pu
