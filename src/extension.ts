import * as vscode from 'vscode';

const unregisteredMessage = `Hello! Thanks for trying out Visual Studio Code.

This is an unregistered evaluation version, and although the trial is untimed, a license must be purchased for continued use.

Would you like to purchase a license now?`;

let keystrokes = 0;

function showUnregisteredMessage() {
	vscode.window.showInformationMessage(unregisteredMessage, { modal: true }, 'Purchase')
		.then(button => {
			if (button === 'Purchase') {
				vscode.env.openExternal(vscode.Uri.parse('https://github.com/LewisTehMinerz/unregistered-vscode'));
			}
		});
}

export function activate(context: vscode.ExtensionContext) {
	showUnregisteredMessage();

	vscode.workspace.onDidChangeTextDocument((e) => {
		for (const contentChange of e.contentChanges) {
			keystrokes += contentChange.rangeLength;
		}

		if (keystrokes >= 1000) {
			keystrokes = 0;
			showUnregisteredMessage();
		}
	});
}

export function deactivate() {}