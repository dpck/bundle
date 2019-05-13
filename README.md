# @depack/bundle

[![npm version](https://badge.fury.io/js/%40depack%2Fbundle.svg)](https://npmjs.org/package/@depack/bundle)

`@depack/bundle` is The Source Code For The Bundle Logic To Prepare Temp Files.

```sh
yarn add -E @depack/bundle
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`bundle(arg1: string, arg2?: boolean)`](#bundlearg1-stringarg2-boolean-void)
  * [`Config`](#type-config)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import bundle from '@depack/bundle'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `bundle(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

__<a name="type-config">`Config`</a>__: Options for the program.

|     Name     |       Type       |                                                                                                 Description                                                                                                  |    Default    |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| tempDir      | <em>string</em>  | The directory in which to place temp files.                                                                                                                                                                  | `depack-temp` |
| preact       | <em>boolean</em> | Whether to add `import { h } from 'preact'` automatically at the top of each JSX file.                                                                                                                       | `false`       |
| preactExtern | <em>boolean</em> | Whether to add `import { h } from '@externs/preact'` automatically at the top of each JSX file, and rename preact imports into `@externs/preact` imports. See https://www.npmjs.com/package/@externs/preact. | `false`       |

```js
/* yarn example/ */
import bundle from '@depack/bundle'

(async () => {
  const res = await bundle({
    text: 'example',
  })
  console.log(res)
})()
```
```

```

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