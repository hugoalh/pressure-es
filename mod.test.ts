import { deepStrictEqual } from "node:assert";
import { Pressure } from "./mod.ts";
Deno.test("1", { permissions: "none" }, async (t) => {
	const instance = new Pressure(1, "Bar");
	console.log(instance.toObject());
	await t.step("To String", () => {
		deepStrictEqual(instance.toString("Pa"), "100000 Pa");
	});
	await t.step("To Value", () => {
		deepStrictEqual(instance.toValue("Pa"), 100000);
	});
});
Deno.test("2", { permissions: "none" }, async (t) => {
	const instance = new Pressure(100000, "Pa");
	console.log(instance.toObject());
	await t.step("To String", () => {
		deepStrictEqual(instance.toString("Bar"), "1 bar");
	});
	await t.step("To Value", () => {
		deepStrictEqual(instance.toValue("Bar"), 1);
	});
});
