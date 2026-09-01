# Recall Last Command

Repeat the last executed command in Obsidian with a single hotkey.

This plugin adds a command that re-executes the most recently used command, making repetitive workflows faster and more convenient. It is especially useful for commands that do not have their own dedicated hotkeys assigned.

## Features

- 🔄 Repeat the last executed Obsidian command
- ⌨️ Includes a default hotkey: `Ctrl/Cmd + Shift + P`
- 🚀 Speeds up repetitive workflows
- 🧠 No need to remember command names or reopen the command palette
- 🔒 Prevents recursion by ignoring its own command in the command history

## Use Cases

### Repeating Formatting Commands

If you frequently apply the same formatting command to multiple notes or selections, simply execute it once and then use the recall hotkey to repeat it.

### Working with Other Plugins

Many community plugins provide commands without assigned hotkeys. Instead of manually finding the command again in the command palette, you can instantly execute it a second time.

### Streamlining Workflows

When performing repetitive actions such as:

- Moving notes
- Creating templates
- Running custom automation commands
- Triggering plugin-specific actions

you can simply repeat the last command without additional navigation.

## Installation

### Community Plugins (after publication)

1. Open **Settings** → **Community Plugins**
2. Disable **Safe Mode** if necessary
3. Click **Browse**
4. Search for **Recall Last Command**
5. Install and enable the plugin

### Manual Installation

1. Download the latest release.
2. Extract the files into:

   ```
   <vault>/.obsidian/plugins/netzmensch-obsidian-recall-last-command/
   ```

3. Ensure the folder contains:

   ```
   manifest.json
   main.js
   ```

4. Reload Obsidian.
5. Enable **Recall Last Command** in Community Plugins.

## Usage

### Command Palette

Open the command palette and execute:

```
Recall Last Command: Recall last command
```

### Hotkey

By default, the plugin registers:

```
Ctrl/Cmd + Shift + P
```

You can change or remove this hotkey in:

```
Settings → Hotkeys
```

## How It Works

The plugin reads Obsidian's recent command history and determines the most recently executed command.

To avoid an infinite loop, commands belonging to this plugin are skipped. This ensures that repeated execution always targets the last external command rather than repeatedly calling itself.

Example:

| Command History | Result |
|----------------|---------|
| Format Note | Executes "Format Note" |
| Format Note → Recall Last Command | Executes "Format Note" |
| Format Note → Recall Last Command → Recall Last Command | Executes "Format Note" again |

## Development

### Build

```bash
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

In development builds, an additional command is available:

```
Dump command history to console
```

This command outputs Obsidian's recent command history to the browser developer console and can help during debugging.

## Compatibility

- Minimum Obsidian version: **1.1.0**
- Desktop: ✅
- Mobile: ✅

## Technical Notes

The plugin accesses Obsidian's internal command history provided by the Command Palette plugin.

Because this implementation relies on internal APIs, future Obsidian updates could potentially affect compatibility.

## Author

**Alexander Szymanski**

- Website: https://netzmensch.com

## Version

Current version: **1.0.0**

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.MD) file for details.
