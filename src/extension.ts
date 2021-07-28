import * as vscode from 'vscode';
const fetch = require("node-fetch");

let baseUrl = "https://waifu.pics/api/sfw/";
const flavours = ["waifu", "neko", "shinobu", "megumin", "random"];

export function activate(context: vscode.ExtensionContext) {
	
	console.log('"waifuwu" is now active!');

	let disposable = vscode.commands.registerCommand('waifuwu.getWaifu', () => {

	vscode.window
		.showQuickPick(flavours, {})
		.then((r) => {

			if (r === "random")
			{
				r = flavours[Math.floor(Math.random()*flavours.length)];
				console.log(r);
			}

			{
				let url = baseUrl += r;

				fetch(url)
					.then((res: { json: () => any; }) => res.json())
					.then((res: { [x: string]: string; }) => {
						vscode.env.openExternal(vscode.Uri.parse(res["url"]));
					});
			}
		});

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}