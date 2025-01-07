/**
 * ASCII symbol of all of the supported pressure units.
 */
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
export type PressureUnitsInputs = PressureUnitsSymbolASCII | PressureUnitsNames | PressureUnitsSymbols;
export interface PressureUnitMeta<A extends string = string, N extends string[] | readonly string[] = string[], S extends string[] | readonly string[] = string[]> {
	/**
	 * Whether is the SI unit (International System of Units) of the pressure.
	 */
	isSIUnit: boolean;
	/**
	 * Names of the pressure unit. The standard name is at the first index.
	 */
	names: N;
	/**
	 * ASCII symbol of the pressure unit. Majorly use for internal index.
	 */
	symbolASCII: A;
	/**
	 * Symbols of the pressure unit. The standard symbol is at the first index.
	 */
	symbols: S;
}
interface UnitInfo extends Omit<PressureUnitMeta<PressureUnitsSymbolASCII, readonly PressureUnitsNames[], readonly PressureUnitsSymbols[]>, "isSIUnit"> {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const units: readonly Readonly<UnitInfo>[] = [
	{
		names: ["Pascal"],
		symbolASCII: "Pa",
		symbols: ["Pa"],
		fromSI(valueSI: number): number {
			return valueSI;
		},
		toSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	{
		names: ["Bar"],
		symbolASCII: "bar",
		symbols: ["bar"],
		fromSI(valueSI: number): number {
			return (valueSI / 1e5);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 1e5);
		}
	},
	{
		names: ["Pound Per Square Inch"],
		symbolASCII: "psi",
		symbols: ["psi"],
		fromSI(valueSI: number): number {
			return (valueSI / ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		}
	},
	{
		names: ["Standard Atmosphere"],
		symbolASCII: "atm",
		symbols: ["atm"],
		fromSI(valueSI: number): number {
			return (valueSI / 101325);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 101325);
		}
	},
	{
		names: ["Technical Atmosphere"],
		symbolASCII: "at",
		symbols: ["at"],
		fromSI(valueSI: number): number {
			return (valueSI / 98066.5);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 98066.5);
		}
	},
	{
		names: ["Torr"],
		symbolASCII: "Torr",
		symbols: ["Torr"],
		fromSI(valueSI: number): number {
			return (valueSI / (101325 / 760));
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * (101325 / 760));
		}
	}
];
const unitSI: PressureUnitsSymbolASCII = "Pa";
/**
 * Resolve unit input.
 * @param {string} parameterName Name of the parameter.
 * @param {string} input Input.
 * @returns {Readonly<UnitInfo>} ASCII symbol of the unit.
 */
function resolveUnitInput(parameterName: string, input: string): Readonly<UnitInfo> {
	for (const unit of units) {
		if (
			input === unit.symbolASCII ||
			unit.names.includes(input as PressureUnitsNames) ||
			unit.symbols.includes(input as PressureUnitsSymbols)
		) {
			return unit;
		}
	}
	throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a supported pressure unit! Only accept these values: ${Array.from(new Set<string>(units.flatMap(({
		names,
		symbolASCII,
		symbols
	}: Readonly<UnitInfo>): string[] => {
		return [...names, symbolASCII, ...symbols];
	})).values()).sort().join(", ")}`);
}
/**
 * Resolve unit meta.
 * @param {PressureUnitsSymbolASCII} input Input.
 * @returns {PressureUnitMeta} Meta of the unit.
 */
function resolveUnitMeta(input: PressureUnitsSymbolASCII): PressureUnitMeta {
	const {
		names,
		symbols
	} = resolveUnitInput("$internal", input);
	return {
		isSIUnit: input === unitSI,
		names: [...names],
		symbolASCII: input,
		symbols: [...symbols]
	};
}
/**
 * Convert between units of the pressure.
 */
export class Pressure {
	#table: Map<PressureUnitsSymbolASCII, number> = new Map<PressureUnitsSymbolASCII, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {PressureUnitsInputs} [fromUnit="Pa"] From unit.
	 */
	constructor(fromValue: number, fromUnit: PressureUnitsInputs = "Pa") {
		if (Number.isNaN(fromValue)) {
			throw new RangeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const fromUnitInfo: Readonly<UnitInfo> = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(fromUnitInfo.symbolASCII, fromValue);
		if (fromUnitInfo.symbolASCII !== unitSI) {
			this.#table.set(unitSI, fromUnitInfo.toSI(fromValue));
		}
		for (const unit of units) {
			if (!this.#table.has(unit.symbolASCII)) {
				this.#table.set(unit.symbolASCII, unit.fromSI(this.#table.get(unitSI)!));
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
	 * @param {PressureUnitsInputs} [toUnit="Pa"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: PressureUnitsInputs = "Pa"): string {
		const {
			symbolASCII,
			symbols
		}: Readonly<UnitInfo> = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(symbolASCII)!} ${symbols[0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {PressureUnitsInputs} [toUnit="Pa"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: PressureUnitsInputs = "Pa"): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit).symbolASCII)!;
	}
	/**
	 * Get meta of the unit.
	 * @param {PressureUnitsInputs} [unit="Pa"] Unit.
	 * @returns {PressureUnitMeta} Meta of the unit.
	 */
	static unit(unit: PressureUnitsInputs = "Pa"): PressureUnitMeta {
		return resolveUnitMeta(resolveUnitInput("unit", unit).symbolASCII);
	}
	/**
	 * Get meta of the units.
	 * @returns {PressureUnitMeta[]} Meta of the units.
	 */
	static units(): PressureUnitMeta[] {
		return units.map(({ symbolASCII }: Readonly<UnitInfo>): PressureUnitMeta => {
			return resolveUnitMeta(symbolASCII);
		});
	}
}
export default Pressure;
/**
 * Convert between units of the pressure.
 * @param {number} fromValue From value.
 * @param {PressureUnitsInputs} [fromUnit="Pa"] From unit.
 * @param {PressureUnitsInputs} [toUnit="Pa"] To unit.
 * @returns {number} Value of the unit.
 */
export function convertPressure(fromValue: number, fromUnit: PressureUnitsInputs = "Pa", toUnit: PressureUnitsInputs = "Pa"): number {
	return new Pressure(fromValue, fromUnit).toValue(toUnit);
}
