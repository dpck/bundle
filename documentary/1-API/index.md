## API

The package is available by importing its default function:

```js
import generateTemp from '@depack/bundle'
```

%~%

```## async generateTemp
[
  ["entry", "string"],
  ["config?", "TempConfig"]
]
```

Generates a temp directory for the given entry file and transpiles JSX files that are references in it. Any JS files will also be placed in the TEMP dir if there is a single JSX file found. This is because references to JSX files need to be updated in JS files to point to the temp dir.

If the required file's path is higher than the current dir, the bundler will check if belongs to a linked package, and generate temp files in `temp/node_modules` dir rather than pollute the filesystem above CWD.

<typedef narrow>types/index.xml</typedef>

<!-- %EXAMPLE: example/example, ../src => @depack/bundle%
%FORK example/example% -->

%~%