import { invokeDenoNodeJSTransformer } from "DNT";
import { parse as parseJSONC } from "STD_JSONC";
const jsrManifest = parseJSONC(await Deno.readTextFile(new URL(import.meta.resolve("./jsr.jsonc"))));
await invokeDenoNodeJSTransformer({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: jsrManifest.exports,
	generateDeclarationMap: true,
	metadata: {
		//@ts-ignore Lazy type.
		name: jsrManifest.name,
		//@ts-ignore Lazy type.
		version: jsrManifest.version,
		description: "A module to convert between units of the pressure.",
		keywords: [
			"conversion",
			"convert",
			"pressure",
			"scale",
			"scales",
			"unit",
			"units"
		],
		homepage: "https://github.com/hugoalh/pressure-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/pressure-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/pressure-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-npm",
	outputDirectoryPreEmpty: true
});
