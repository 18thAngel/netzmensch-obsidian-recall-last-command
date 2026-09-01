import { Plugin,apiVersion } from "obsidian";
export default class RecallLastCommandPlugin extends Plugin {

	async onload(): Promise<void> {
		
		const myApp = this.app as any;
		this.logWithPluginName(0, "Starting loading");
		this.logWithPluginName(1, "Plugin ID:", this.manifest.id);
		this.logWithPluginName(1, "Plugin version:", this.manifest.version);
		this.logWithPluginName(1, "Min App version:", this.manifest.minAppVersion);
		this.logWithPluginName(1, "Min App version:", this.manifest.minAppVersion);
		this.logWithPluginName(1, "API version:", apiVersion);

		//for development purposes, add a command to dump the recent command history
		if (this.isDebug()) {
			this.addCommand({
				id: "dump-command-history",
				name: "Dump command history to console",
				callback: () => {
					this.logWithPluginName(0, "=== Recent Commands ===");
					myApp.internalPlugins.getEnabledPluginById("command-palette").recentCommands.forEach((p: any) => {
						this.logWithPluginName(1, "-", p);
					});
					debugger;
				}
			});
		}

		this.addCommand({
			id: "recall-last-command",
			name: "Recall last command",
			callback: () => {
				this.recallLastCommand();
			},
			hotkeys: [
				{
					modifiers: ["Mod", "Shift"],
					key: "P"
				}
			]
		});

		this.logWithPluginName(0, "Finished loading");
	}

	// Recalls the last command that was not from this plugin
	private recallLastCommand(): void {
		const myApp = this.app as any;
		const recentCommands = myApp.internalPlugins.getEnabledPluginById("command-palette").recentCommands;

		let lastCommand = null;

		if (recentCommands.length > 0) {
			let i = 0;
			lastCommand = recentCommands[i++];
			// as long as the last command is from this plugin, keep looking for the next one
			while (lastCommand.startsWith(this.manifest.id) && i < recentCommands.length) {
				lastCommand = recentCommands[i++];
			}
			// if the last command is still from this plugin, set it to null
			if (lastCommand.startsWith(this.manifest.id)) {
				lastCommand = null;
			}
		}
		// if no valid last command was found, log and return
		if (lastCommand === null) {
			this.logWithPluginName(0, "No recent commands found.");
			return;
		}

		this.logWithPluginName(0, "Recalling last command:", lastCommand);
		myApp.commands.executeCommandById(lastCommand);
	}

	private isDebug(): boolean {
		return process.env.NODE_ENV !== "production";
	}
	//internal helper function to log messages with the plugin name and optional indentation
	//no logging on production builds
	private logWithPluginName(indentLevel: number = 0, ...args: any[]): void {
		if(!this.isDebug()) {
			return;
		}
		const indent = "\t".repeat(indentLevel);
		console.log(`[${this.manifest.id}]:${indent}`, ...args);
	}

	private isHotkeyInUse(modifiers: string[], key: string): boolean {
		return false; // placeholder implementation
	}
}
