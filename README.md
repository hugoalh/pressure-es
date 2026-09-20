# Pressure (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/pressure_ecmascript)
● [GitHub](https://github.com/hugoalh/pressure-es)
● [JSR](https://jsr.io/@hugoalh/pressure)
● [NPM](https://www.npmjs.com/package/@hugoalh/pressure)

An ECMAScript module to convert between units of the pressure.

These units of the pressure are supported:

| **Unit** | **Keys** | **Symbols** |
|:--|:--|:--|
| Pascal **\[SI\]** | `Pascal` | `Pa` |
| Bar | `Bar` | `bar` |
| Pound Per Square Inch | `Pound Per Square Inch` | `psi` |
| Standard Atmosphere | `Standard Atmosphere` | `atm` |
| Technical Atmosphere | `Technical Atmosphere` | `at` |
| Torr | `Torr` | `Torr` |

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the entrypoints, visit the runtime documentation for more information.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  class Pressure {
    constructor(fromValue: number, fromUnit: PressureUnitsInputs);
    toObject(): Record<PressureUnitsSymbolASCII, number>;
    toString(toUnit: PressureUnitsInputs): string;
    toValue(toUnit: PressureUnitsInputs): number;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc)
>   - [JSR](https://jsr.io/@hugoalh/pressure)

## ✍️ Examples

- ```ts
  new Pressure(1, "Bar").toValue("Pa");
  //=> 100000
  ```
- ```ts
  new Pressure(1, "Bar").toString("Pa");
  //=> "100000 Pa"
  ```
- ```ts
  new Pressure(100000, "Pa").toValue("Bar");
  //=> 1
  ```
- ```ts
  new Pressure(100000, "Pa").toString("Bar");
  //=> "1 bar"
  ```

## 📚 External Resources

- Wikipedia
  - [Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units)
