import * as vscode from 'vscode';
const fetch = require("node-fetch");

const baseUrl = "https://waifu.pics/api/sfw/";
const flavours = ["waifu", "neko", "shinobu", "megumin", "random"];

export function activate(context: vscode.ExtensionContext) {
	
	console.log('"waifuwu" is now active!');

	let disposable = vscode.commands.registerCommand('waifuwu.getWaifu', () => {

	vscode.window
		.showQuickPick(flavours, {})
		.then((r) => {

			if (!r) { return; };

			if (r === "random")
			{
				r = flavours[Math.floor(Math.random() * flavours.length)];
			}

			const url = baseUrl + r;

			fetch(url)
				.catch((err: Error) =>
					{
						vscode.window.showErrorMessage(err.message);
					})
				.then((res: { json: () => any; }) => res.json())
				.then((res: { [x: string]: string; }) =>
					{
						const panel = vscode.window.createWebviewPanel(
							'waifu',
							r || "Waifu",
							vscode.ViewColumn.One,
							{}
						);
			
						panel.webview.html = displayWaifu(res["url"]);
					});
		});

	});

	context.subscriptions.push(disposable);
}

function displayWaifu(imageUrl: string)
{
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Waifu</title>
	</head>
	<body>
		<img src=${imageUrl} width="400"/>
	</body>
	</html>`;
}

export function deactivate() {}
