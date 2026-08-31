import { Notice, Plugin } from "obsidian";
import { around } from "monkey-around";

const REPEAT_COMMAND_ID = "recall-last-command:repeat-last-command";

export default class RecallLastCommandPlugin extends Plugin {
	private lastCommandId: string | null = null;

	async onload() {
		this.register(
			around((this.app as any).commands, {
				executeCommand(original: any) {
					return (command: any, ...args: any[]) => {
						const result = original.call(
							(this.app as any).commands,
							command,
							...args
						);
						if (command?.id && command.id !== REPEAT_COMMAND_ID) {
							this.lastCommandId = command.id;
						}
						return result;
					};
				},
			})
		);

		this.addCommand({
			id: "repeat-last-command",
			name: "Repeat last command",
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "p" }],
			callback: () => {
				if (this.lastCommandId) {
					(this.app as any).commands.executeCommandById(
						this.lastCommandId
					);
				} else {
					new Notice("No command to repeat");
				}
			},
		});
	}
}
