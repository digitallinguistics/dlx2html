# scription2html

A JavaScript library for converting interlinear glossed data in linguistics to HTML.

Written using modern ES modules, useable in both Node and the browser.

## Options

| Option       | type          | Default   | Description                                                                                                |
| ------------ | ------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `attributes` | Object        | `{}`      | A hash of attributes and their values to apply to the wrapper element.                                     |
| `classes`    | Array<String> | `['igl']` | An array of classes to apply to the wrapper element.                                                       |
| `tag`        | String        | `'div'`   | The HTML tag to wrap the interlinear gloss in. Can also be a custom tag (useful for HTML custom elements). |
