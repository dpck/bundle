# @depack/bundle

[![npm version](https://badge.fury.io/js/%40depack%2Fbundle.svg)](https://npmjs.org/package/@depack/bundle)

`@depack/bundle` is The Source Code For The Bundle Logic To Prepare Temp Files. Because Google Closure Compiler cannot import _JSX_ files, we create a temp directory to put them in there, and also allow to update `preact` to `@externs/preact` in the temp as well, so that _Preact_ can be referenced separately from the compiled code.

```sh
yarn add @depack/bundle
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async generateTemp(entry: string, config?: TempConfig)`](#async-generatetempentry-stringconfig-tempconfig-void)
  * [`TempConfig`](#type-tempconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import generateTemp from '@depack/bundle'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code>async <ins>generateTemp</ins>(</code><sub><br/>&nbsp;&nbsp;`entry: string,`<br/>&nbsp;&nbsp;`config?: TempConfig,`<br/></sub><code>): <i>void</i></code>

Generates a temp directory for the given entry file and transpiles JSX files that are references in it. Any JS files will also be placed in the TEMP dir if there is a single JSX file found. This is because references to JSX files need to be updated in JS files to point to the temp dir.

If the required file's path is higher than the current dir, the bundler will check if belongs to a linked package, and generate temp files in `temp/node_modules` dir rather than pollute the filesystem above CWD.

__<a name="type-tempconfig">`TempConfig`</a>__: Options for generating the temp directory.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
  <th>Default</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center">tempDir</td>
  <td><em>string</em></td>
  <td rowSpan="3"><code>depack-temp</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The directory in which to place temp files.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">preact</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>false</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Whether to add <code>import { h } from 'preact'</code> automatically at the top of each JSX file.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">preactExtern</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>false</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Whether to add <code>import { h } from '＠externs/preact'</code> automatically at the top of each JSX file, and rename preact imports into <code>＠externs/preact</code> imports. See https://www.npmjs.com/package/＠externs/preact.
  </td>
 </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://artd.eco/depack">Depack</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>