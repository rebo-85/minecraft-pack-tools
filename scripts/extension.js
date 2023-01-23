const vscode = require('vscode');
const vsCommand = require('./vsCommand');
const packFolders = require('./packFolders');
const rename = require('./rename');

module.exports = {
	activate,
	deactivate
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	packFolders.checkManifests();

	let bpManifest = vscode.commands.registerCommand('minecraft-pack-tools.bpManifest', () => { vsCommand.createBpManifest(); });
	let rpManifest = vscode.commands.registerCommand('minecraft-pack-tools.rpManifest', () => { vsCommand.createRpManifest(); });
	let bpRpManifest = vscode.commands.registerCommand('minecraft-pack-tools.bpRpManifest', () => { vsCommand.createBpRpManifest(); });

	let renameFiles = vscode.workspace.onDidCreateFiles(() => { 
		rename.filesInFolder(global.bpeFolderPath, 'json', 'bpe');
		rename.filesInFolder(global.bpaFolderPath, 'json', 'bpa');
		rename.filesInFolder(global.bpacFolderPath, 'json', 'bpac');
		rename.filesInFolder(global.bpiFolderPath, 'json', 'bpi');
		rename.filesInFolder(global.bpLootTableFolderPath, 'json', 'loot');
		rename.filesInFolder(global.bpRecipeFolderPath, 'json', 'r');
		
		rename.filesInFolder(global.rpeFolderPath, 'json', 'rpe');
		rename.filesInFolder(global.rpaFolderPath, 'json', 'rpa');
		rename.filesInFolder(global.rpacFolderPath, 'json', 'rpac');
		rename.filesInFolder(global.rpiFolderPath, 'json', 'rpi');
		rename.filesInFolder(global.rpAttachableFolderPath, 'json', 'at');
		rename.filesInFolder(global.rpParticleFolderPath, 'json', 'particle');
	});
	
	context.subscriptions.push( bpManifest, rpManifest, bpRpManifest, renameFiles);
}

function deactivate() {}
