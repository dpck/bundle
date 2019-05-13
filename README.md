# @depack/bundle

[![npm version](https://badge.fury.io/js/%40depack%2Fbundle.svg)](https://npmjs.org/package/@depack/bundle)

`@depack/bundle` is The Source Code For The Bundle Logic To Prepare Temp Files. Because Google Closure Compiler cannot import _JSX_ files, we create a temp directory to put them in there, and also allow to update `preact` to `@externs/preact` in the temp as well, so that _Preact_ can be referenced separately from the compiled code.

```sh
yarn add -E @depack/bundle
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async generateTemp(entry: string, config?: TempConfig)`](#async-generatetempentry-stringconfig-tempconfig-void)
  * [`_depack.TempConfig`](#type-_depacktempconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import generateTemp from '@depack/bundle'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `async generateTemp(`<br/>&nbsp;&nbsp;`entry: string,`<br/>&nbsp;&nbsp;`config?: TempConfig,`<br/>`): void`

Generates a temp directory for the given entry file and transpiles JSX files that are references in it.

__<a name="type-_depacktempconfig">`_depack.TempConfig`</a>__: Options for generating the temp directory.

|     Name     |       Type       |                                                                                                 Description                                                                                                  |    Default    |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| tempDir      | <em>string</em>  | The directory in which to place temp files.                                                                                                                                                                  | `depack-temp` |
| preact       | <em>boolean</em> | Whether to add `import { h } from 'preact'` automatically at the top of each JSX file.                                                                                                                       | `false`       |
| preactExtern | <em>boolean</em> | Whether to add `import { h } from '＠externs/preact'` automatically at the top of each JSX file, and rename preact imports into `＠externs/preact` imports. See https://www.npmjs.com/package/＠externs/preact. | `false`       |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://artd.eco/depack">Depack</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>