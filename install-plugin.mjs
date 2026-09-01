import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project directories
const outputDirectory = path.resolve(__dirname, "output");

const pluginName = "netzmensch-obsidian-recall-last-command";

const pluginsDirectory = path.resolve(
	__dirname,
	"..",
	"TestObsidianVault",
	"PluginDev",
	".obsidian",
	"plugins"
);

const targetDirectory = path.join(pluginsDirectory, pluginName);

// Validate build output
if (!fs.existsSync(outputDirectory)) {
	throw new Error(`Build output does not exist: ${outputDirectory}`);
}

const manifestPath = path.join(outputDirectory, "manifest.json");
const mainPath = path.join(outputDirectory, "main.js");

if (!fs.existsSync(manifestPath)) {
	throw new Error(`manifest.json is missing from: ${outputDirectory}`);
}

if (!fs.existsSync(mainPath)) {
	throw new Error(`main.js is missing from: ${outputDirectory}`);
}

// Ensure plugins directory exists
fs.mkdirSync(pluginsDirectory, { recursive: true });

// Remove existing plugin
if (fs.existsSync(targetDirectory)) {
	console.log(`Removing existing plugin: ${targetDirectory}`);

	fs.rmSync(targetDirectory, {
		recursive: true,
		force: true
	});
}

// Copy new plugin
console.log(`Installing plugin to: ${targetDirectory}`);

fs.cpSync(outputDirectory, targetDirectory, {
	recursive: true
});

console.log("");
console.log("Plugin installed successfully.");
console.log(`Target: ${targetDirectory}`);