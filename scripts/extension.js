const vscode = require('vscode');
const vsCommand = require('./vsCommand');
const rename = require('./rename');
const workspace = require('./workspace');

module.exports = {
	activate,
}
async function activate(context) {
	workspace.getPackFolders();

	let bpManifest = vscode.commands.registerCommand('minecraft-pack-tools.bpManifest', () => { vsCommand.createBpManifest(); });
	let rpManifest = vscode.commands.registerCommand('minecraft-pack-tools.rpManifest', () => { vsCommand.createRpManifest(); });
	let bpRpManifest = vscode.commands.registerCommand('minecraft-pack-tools.bpRpManifest', () => { vsCommand.createBpRpManifest(); });
	let scriptAPIManifest = vscode.commands.registerCommand('minecraft-pack-tools.scriptAPIManifest', () => { vsCommand.createScriptAPIManifest(); });

	let onDidChangeWorkspaceFolders = vscode.workspace.onDidChangeWorkspaceFolders(() => { workspace.getPackFolders(); });

	let onDidSaveTextDocument = vscode.workspace.onDidSaveTextDocument(() => { 
		renameFiles();
	});
	let onDidCreateFiles = vscode.workspace.onDidCreateFiles(() => { 
		renameFiles();
	});
	let onDidRenameFiles = vscode.workspace.onDidRenameFiles(() => { 
		renameFiles();
	});


	function renameFiles() {
		rename.filesInFolder(global.bpeFolderPath, '.json', '.bpe'); 
		rename.filesInFolder(global.bpaFolderPath, '.json', '.bpa');
		rename.filesInFolder(global.bpacFolderPath, '.json', '.bpac');
		rename.filesInFolder(global.bpiFolderPath, '.json', '.bpi');
		rename.filesInFolder(global.bpLootTableFolderPath, '.json', '.loot');
		rename.filesInFolder(global.bpDialogueFolderPath, '.json', '.dialogue');
		rename.filesInFolder(global.bpTradingFolderPath, '.json', '.trade');
		rename.filesInFolder(global.bpRecipeFolderPath, '.json', '.r');
		rename.filesInFolder(global.bpFunctionFolderPath, '.mcfunction', '');
		
		rename.filesInFolder(global.rpacFolderPath, '.json', '.rpac');
		rename.filesInFolder(global.rpaFolderPath, '.json', '.rpa');
		rename.filesInFolder(global.rpAttachableFolderPath, '.json', '.at');
		rename.filesInFolder(global.rpeFolderPath, '.json', '.rpe');
		rename.filesInFolder(global.rpiFolderPath, '.json', '.rpi');
		rename.filesInFolder(global.rpModelFolderPath, '.json', '.geo');
		rename.filesInFolder(global.rpParticleFolderPath, '.json', '.particle');
	}
	context.subscriptions.push( bpManifest, rpManifest, bpRpManifest, onDidSaveTextDocument, onDidChangeWorkspaceFolders, onDidCreateFiles, onDidRenameFiles, scriptAPIManifest);
}

function deactivate() {}