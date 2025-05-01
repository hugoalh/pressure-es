# Pressure (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/pressure-es](https://img.shields.io/github/v/release/hugoalh/pressure-es?label=hugoalh/pressure-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/pressure-es")](https://github.com/hugoalh/pressure-es)
[![JSR: @hugoalh/pressure](https://img.shields.io/jsr/v/@hugoalh/pressure?label=@hugoalh/pressure&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/pressure")](https://jsr.io/@hugoalh/pressure)
[![NPM: @hugoalh/pressure](https://img.shields.io/npm/v/@hugoalh/pressure?label=@hugoalh/pressure&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/pressure")](https://www.npmjs.com/package/@hugoalh/pressure)

An ECMAScript (JavaScript & TypeScript) module to convert between units of the pressure.

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

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/pressure-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/pressure[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/pressure[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
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
