/**
 * ASCII symbol of all of the supported pressure units.
 */
//deno-lint-ignore hugoalh/no-duplicate-types -- .
export type PressureUnitsSymbolASCII =
	| "at"
	| "atm"
	| "bar"
	| "Pa"
	| "psi"
	| "Torr";
/**
 * Names of all of the supported pressure units.
 */
export type PressureUnitsNames =
	| "Bar"
	| "Pascal"
	| "Pound Per Square Inch"
	| "Standard Atmosphere"
	| "Technical Atmosphere"
	| "Torr";
/**
 * Symbols of all of the supported pressure units.
 */
//deno-lint-ignore hugoalh/no-duplicate-types -- .
export type PressureUnitsSymbols =
	| "at"
	| "atm"
	| "bar"
	| "Pa"
	| "psi"
	| "Torr";
/**
 * Inputs of all of the supported pressure units.
 */
export type PressureUnitsInputs =
	| PressureUnitsNames
	| PressureUnitsSymbolASCII
	| PressureUnitsSymbols;
const unitSI: PressureUnitsSymbolASCII = "Pa";
interface PressureUnitInfo {
	/**
	 * Names of the pressure unit. The standard name is at the first index.
	 */
	names: PressureUnitsNames[];
	/**
	 * ASCII symbol of the pressure unit. Majorly use for internal index.
	 */
	symbolASCII: PressureUnitsSymbolASCII;
	/**
	 * Symbols of the pressure unit. The standard symbol is at the first index.
	 */
	symbols: PressureUnitsSymbols[];
	convertFromSI: (valueSI: number) => number;
	convertToSI: (valueCurrent: number) => number;
}
const unitsInfo: readonly PressureUnitInfo[] = [
	{
		names: ["Pascal"],
		symbolASCII: "Pa",
		symbols: ["Pa"],
		convertFromSI(valueSI: number): number {
			return valueSI;
		},
		convertToSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	{
		names: ["Bar"],
		symbolASCII: "bar",
		symbols: ["bar"],
		convertFromSI(valueSI: number): number {
			return (valueSI / 1e5);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * 1e5);
		}
	},
	{
		names: ["Pound Per Square Inch"],
		symbolASCII: "psi",
		symbols: ["psi"],
		convertFromSI(valueSI: number): number {
			return (valueSI / ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		}
	},
	{
		names: ["Standard Atmosphere"],
		symbolASCII: "atm",
		symbols: ["atm"],
		convertFromSI(valueSI: number): number {
			return (valueSI / 101325);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * 101325);
		}
	},
	{
		names: ["Technical Atmosphere"],
		symbolASCII: "at",
		symbols: ["at"],
		convertFromSI(valueSI: number): number {
			return (valueSI / 98066.5);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * 98066.5);
		}
	},
	{
		names: ["Torr"],
		symbolASCII: "Torr",
		symbols: ["Torr"],
		convertFromSI(valueSI: number): number {
			return (valueSI / (101325 / 760));
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * (101325 / 760));
		}
	}
];
function resolveUnitInput(parameterName: string, input: string): PressureUnitInfo {
	for (const unitInfo of unitsInfo) {
		if (
			input === unitInfo.symbolASCII ||
			unitInfo.names.includes(input as PressureUnitsNames) ||
			unitInfo.symbols.includes(input as PressureUnitsSymbols)
		) {
			return unitInfo;
		}
	}
	throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a supported pressure unit! Only accept these values: ${Array.from(new Set<string>(unitsInfo.flatMap(({
		names,
		symbolASCII,
		symbols
	}: PressureUnitInfo): string[] => {
		return [...names, symbolASCII, ...symbols];
	})).values()).sort().join(", ")}.`);
}
/**
 * Convert between units of the pressure.
 */
export class Pressure {
	#table: Map<PressureUnitsSymbolASCII, number> = new Map<PressureUnitsSymbolASCII, number>();
	/**
	 * Initialize.
	 * @param {number} fromValue From value.
	 * @param {PressureUnitsInputs} fromUnit From unit.
	 */
	constructor(fromValue: number, fromUnit: PressureUnitsInputs) {
		if (Number.isNaN(fromValue)) {
			throw new RangeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const {
			convertToSI,
			symbolASCII
		}: PressureUnitInfo = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(symbolASCII, fromValue);
		if (symbolASCII !== unitSI) {
			this.#table.set(unitSI, convertToSI(fromValue));
		}
		for (const {
			convertFromSI,
			symbolASCII
		} of unitsInfo) {
			if (!this.#table.has(symbolASCII)) {
				this.#table.set(symbolASCII, convertFromSI(this.#table.get(unitSI)!));
			}
		}
	}
	/**
	 * Get values of all of the units.
	 * @returns {Record<PressureUnitsSymbolASCII, number>} Values of all of the units.
	 */
	toObject(): Record<PressureUnitsSymbolASCII, number> {
		return Object.fromEntries(this.#table.entries()) as Record<PressureUnitsSymbolASCII, number>;
	}
	/**
	 * Get value of the unit with standard symbol.
	 * @param {PressureUnitsInputs} toUnit To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: PressureUnitsInputs): string {
		const {
			symbolASCII,
			symbols
		}: PressureUnitInfo = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(symbolASCII)!} ${symbols[0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {PressureUnitsInputs} toUnit To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: PressureUnitsInputs): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit).symbolASCII)!;
	}
}
export default Pressure;
