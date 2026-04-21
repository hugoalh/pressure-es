# Pressure (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/pressure-es)
[JSR](https://jsr.io/@hugoalh/pressure)
[NPM](https://www.npmjs.com/package/@hugoalh/pressure)

An ECMAScript module to convert between units of the pressure.

These units of the pressure are supported:

|  |  | **Names** | **Symbols** |
|:-:|:--|:--|:--|
| ***\[SI\]*** | **Pascal** | `Pascal` | `Pa` |
|  | **Bar** | `Bar` | `bar` |
|  | **Pound Per Square Inch** | `Pound Per Square Inch` | `psi` |
|  | **Standard Atmosphere** | `Standard Atmosphere` | `atm` |
|  | **Technical Atmosphere** | `Technical Atmosphere` | `at` |
|  | **Torr** | `Torr` | `Torr` |

## 🔰 Begin

### 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

### #️⃣ Resources Identifier

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/pressure-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/pressure[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/pressure[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class Pressure {
    constructor(fromValue: number, fromUnit?: PressureUnitsInputs);
    toObject(): Record<PressureUnitsSymbolASCII, number>;
    toString(toUnit?: PressureUnitsInputs): string;
    toValue(toUnit?: PressureUnitsInputs): number;
    static unit(unit?: PressureUnitsInputs): PressureUnitMeta;
    static units(): PressureUnitMeta[];
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/pressure)

## ✍️ Examples

- ```ts
  new Pressure(1, "Bar").toValue();
  //=> 100000
  ```
- ```ts
  new Pressure(1, "Bar").toString();
  //=> "100000 Pa"
  ```
- ```ts
  new Pressure(100000).toValue("Bar");
  //=> 1
  ```
- ```ts
  new Pressure(100000).toString("Bar");
  //=> "1 bar"
  ```

## 📚 Guides

- Wikipedia
  - [Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units)
