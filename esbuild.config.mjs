import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const production = process.argv[2] === "production";
const watch = process.argv[2] === null || process.argv[2] === "watch";

const outputDirectory = path.resolve("output");
const manifestSource = path.resolve("manifest.json");
const manifestDestination = path.join(outputDirectory, "manifest.json");

// Ensure output directory exists.
fs.mkdirSync(outputDirectory, { recursive: true });

// Copy manifest.json into the plugin output directory.
fs.copyFileSync(manifestSource, manifestDestination);

const context = await esbuild.context({
	entryPoints: ["src/main.ts"],

	bundle: true,
	format: "cjs",
	target: "es2018",

	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		"pdfjs-dist"
	],

	sourcemap: !production,
	treeShaking: true,

	outfile: path.join(outputDirectory, "main.js"),

	logLevel: "info",
});

if (!watch) {
	await context.rebuild();
	await context.dispose();

	console.log("Build complete.");
	console.log(`Output: ${outputDirectory}`);
} else {
	await context.watch();

	console.log("Watching for changes...");
	console.log(`Output: ${outputDirectory}`);
}