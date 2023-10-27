# scription2html 🚧 UNDER CONSTRUCTION 🚧

A JavaScript library for converting interlinear glossed data in linguistics to HTML for presenting on the web.

Written using modern ES modules, useable in both Node and the browser.

When writing about linguistic data, linguists use a format called an **interlinear glossed example** which shows each of the parts of a word (morphemes) and their meanings. This allows people who are not familiar with the language under discussion to read the examples and understand their structure and meaning. Below is a very simple example from Swahili:

```
# Swahili
ninaenda
ni-na-end-a
1SG-PRES-go-IND
I am going
```

These interlinear glossed examples follow a very specific format, originally specified in the [Leipzig Glossing Rules][Leipzig]. Another specification, called [scription][scription], formalizes the Leipzig Glossing Rules in a way that allows interlinear examples to be consistently parsed by computers.

The `scription2html` library takes one or more interlinear glosses written in the scription format and converts them to HTML for representing linguistic examples on the web. It uses another library (`scription2dlx`) to parse the scription data into memory. You can access this underlying data with the `data` property in the object returned by calling `scription2html`.

The `scription2html` library does not add any styling to the output HTML. Users should either add their own CSS styles, or use the compatible [Digital Linguistics Style Library][Styles]. The structure of the output HTML is described below.

If using this library for research, please consider citing it using the model below:

> Hieber, Daniel W. {year}. @digitallinguistics/scription2html. <https://github.com/digitallinguistics/scription2html/>

## Usage

This library is written in JavaScript, and may be run as either a [Node.js][Node] module or as a script in the browser. See the [Node.js learning path][learn-Node] for more information about Node.js, how to install it, and how to run programs with it.

### Node.js

To use `scription2html` in Node:

1. Install the package.

    ```cmd
    npm install @digitallinguistics/scription2html
    # OR
    yarn add @digitallinguistics/scription2html
    ```

2. Import the package and use it to convert scription data.

    ```js
    // Import the scription2html module.
    import convert      from '@digitallinguistics/scription2html'
    import { readFile } from 'node:fs/promises'

    // Get a reference to your scription text as a String.
    const scription = await readFile(`examples.txt`, `utf-8`)

    // Convert the text to HTML.
    const { data, html } = convert(scription, { /* specify options here */ })

    // Outputs an HTML String.
    console.log(html) // <div class=igl>...</div>

    // You can also access the underlying data:
    console.log(data) // { utterances: [...] }
    ```

### Browser

To use `scription2html` in the browser:

1. Download the latest version of the library from the [releases][releases] page. Copy the `scription2html.js` file to your project.

2. Import and use the script in your code:

    ```html
    <script type=module>

      // Import the scription2html module
      import convert from './scription2html.js'

      // Get a reference to your scription text as a String.
      const scription = document.body.innerText

      // Convert the text to HTML.
      const { data, html } = convert(scription, { /* specify options here */ })

      // Insert the HTML into your page.
      document.body.innerHTML = html

      // You can also access the underlying data:
      console.log(data) // { utterances: [...] }

    </script>
    ```

### API

Calling the `scription2html` funtion returns an object with two properties: `html` and `data`.

- `html` is the linguistic examples converted to HTML.
- `data` is the linguistic examples as stored in working memory. See the [scription2dlx][scription2dlx] library for more details.

If no input is provided, `null` is returned.

If the input is a string containing only whitespace, an empty string is returned for the value of the `html` property.

## Options

| Option      | type          | Default   | Description                                                                                                 |
| ----------- | ------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `classes`   | Array<String> | `['igl']` | An array of classes to apply to the wrapper element.                                                        |
| `scription` | Object        | `{}`      | Options to pass to the `scription2dlx` library. See [scription2dlx][scription2dlx] for more details.        |
| `tag`       | String        | `'div'`   | The HTML tag to wrap each interlinear gloss in. Can also be a custom tag (useful for HTML custom elements). |

## HTML Structure

This section describes the structure of the HTML output by this library, and the classes added to the HTML elements. You can see sample HTML output by the program in the `samples/` folder.

Each utterance/example in the original scription text is wrapped in a `<div class=igl>` element by default. You can customize both the tag that is used for the wrapper and the classes applied to it with the `tag` and `classes` options. For example, to wrap each utterance in `<li class=interlinear>`, you would provide the following options:

```js
const options = {
  classes: [`interlinear`],
  tag:     `li`
}
```

Each line of the interlinear example is typically given a CSS class that matches its line type (with some exceptions, such as `timespan` instead of just `t`). For example, the `\trs` line will result in `<p class=trs>`, and the `\tln-en` line will result in `<p class=tln lang=en>`.

Whenever the language of a gloss or translation is specified, it is passed through to the `lang` attribute of the relevant analysis language elements, as just seen in the `\tln-en` example. Whenever the default language of the text is specified, it is passed through to the `lang` attribute of the relevant target language elements.

When the scription format allows for data in multiple orthographies, the orthography of the data is specified in the `data-ortho` attribute. For example, the following lines of scription are transformed to the HTML that follows:

```txt
\trs-Modern  Wetkx hus naancaakamankx wetk hi hokmiqi.
\trs-Swadesh wetkšˊ husˊ na·nča·kamankšˊ wetkˊ hi hokmiʔiˊ.
\tln         He left his brothers.
```

```html
<p class=trs data-ortho=Modern>Wetkx hus naancaakamankx wetk hi hokmiqi.</p>
<p class=trs data-ortho=Swadesh>wetkšˊ husˊ na·nča·kamankšˊ wetkˊ hi hokmiʔiˊ.</p>
<p class=tln>He left his brothers.</p>
```

### Additional Notes on HTML Structure

- The speaker (`\sp`) and source (`\s`) data are combined into a single element strutured as follows: `<p class=ex-source>{speaker} ({source})</p>`.
- Notes fields (`\n`) are not added to the HTML by default.

**FORTHCOMING**

<!-- Links -->
[learn-Node]:    https://nodejs.dev/en/learn/
[Leipzig]:       https://www.eva.mpg.de/lingua/resources/glossing-rules.php
[Node]:          https://nodejs.org/
[releases]:      https://github.com/digitallinguistics/scription2html/releases
[scription]:     https://scription.digitallinguistics.io/
[scription2dlx]: https://github.com/digitallinguistics/scription2dlx/
[Styles]:        https://styles.digitallinguistics.io/
