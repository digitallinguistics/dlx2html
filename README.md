# dlx2html 🚧 UNDER CONSTRUCTION 🚧

A JavaScript library for converting linguistic to HTML for presenting on the web.

Written using modern ES modules, useable in both Node and the browser.

When writing about linguistic data, linguists use a format called an **interlinear glossed example** which shows each of the parts of a word (morphemes) and their meanings. This allows people who are not familiar with the language under discussion to read the examples and understand their structure and meaning. Below is a very simple example from Swahili:

```txt
# Swahili
ninaenda
ni-na-end-a
1SG-PRES-go-IND
I am going
```

These interlinear glossed examples follow a very specific format, originally specified in the [Leipzig Glossing Rules][Leipzig]. Another specification, called [DaFoDiL][DaFoDiL], formalizes how such data should be structured when being stored as JSON or worked with as a plain old JavaScript object (POJO).

The `dlx2html` library takes one or more interlinear glosses in the DaFoDiL format and converts them to HTML for representing linguistic examples on the web.

The `dlx2html` library does not add any styling to the output HTML. Users should either add their own CSS styles, or use the compatible [Digital Linguistics Style Library][Styles]. The structure of the output HTML is described below.

If using this library for research, please cite it using the model below:

> Hieber, Daniel W. {year}. @digitallinguistics/dlx2html. <https://github.com/digitallinguistics/dlx2html/>

## Samples

The following pages demo the HTML output from the library. They are styled using the [DLx styles library][Styles].

- [Algonquian](/samples/html/Algonquian.html)
- [Chitimacha](/samples/html/Chitimacha.html)
- [Chitimacha Text](/samples/html/Chitimacha-text.html)
- [Mohawk](/samples/html/Mohawk.html)
- [Nuuchahnulth](/samples/html/Nuuchahnulth.html)
- [Old Latin](/samples/html/OldLatin.html)
- [Swahili](/samples/html/Swahili.html)

## Usage

This library is written in JavaScript, and may be run as either a [Node.js][Node] module or as a script in the browser. See the [Node.js learning path][learn-Node] for more information about Node.js, how to install it, and how to run programs with it.

### Node.js

To use `dlx2html` in Node:

1. Install the package.

    ```cmd
    npm install @digitallinguistics/dlx2html
    # OR
    yarn add @digitallinguistics/dlx2html
    ```

2. Import the package and use it to convert the data to HTML.

    ```js
    // Import the dlx2html module.
    import convert      from '@digitallinguistics/dlx2html'
    import { readFile } from 'node:fs/promises'

    // Load the data from a JSON-formatted DaFoDiL file.
    const json = await readFile(`examples.json`, `utf-8`)
    const data = JSON.parse(json)

    // Convert the text to HTML.
    const html = convert(data, { /* specify options here */ })

    console.log(html) // <div class=igl>...</div>
    ```

### Browser

To use `dlx2html` in the browser:

1. Download the latest version of the library from the [releases][releases] page. Copy the `dlx2html.js` file to your project.

2. Import and use the script in your code:

    ```html
    <script type=module>

      // Import the dlx2html module
      import convert from './dlx2html.js'

      // Get a reference to your data.
      const json = document.body.innerText
      const data = JSON.parse(data)

      // Convert the text to HTML.
      const html = convert(data, { /* specify options here */ })

      // Insert the HTML into your page.
      document.body.innerHTML = html

    </script>
    ```

### API

Calling the `dlx2html` function returns an HTML string.

## Options

| Option          | type          | Default   | Description                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `abbreviations` | Object        | `{}`      | An object hash providing the full descriptions of gloss abbreviations, e.g. `"sg"` => `"singular"`. If present, these will be used to populate the `title` attribute of `<abbr>` elements for glosses.                                                                                                                                                       |
| `analysisLang`  | String        | undefined | An [IETF language tag][lang-tags] to use as the default value of the `lang` attribute for any data in the analysis language (metadata, literal translation, free translation, glosses, literal word translation). If `undefined`, no `lang` tag is added, which means that browsers will assume that the analysis language is the same as the HTML document. |
| `classes`       | Array<String> | `['igl']` | An array of classes to apply to the wrapper element.                                                                                                                                                                                                                                                                                                         |
| `glosses`       | Boolean       | `false`   | Options for wrapping glosses in `<abbr>` tags.<br><br>If set to `false` (default), no `<abbr>` tags are added to the glosses.<br><br>If set to `true`, an `<abbr>` tag is wrapped around any glosses in CAPS, any numbers, and any of `sg`, `du`, or `pl` (lowercased).                                                                                      |
| `tag`           | String        | `'div'`   | The HTML tag to wrap each interlinear gloss in. Can also be a custom tag (useful for HTML custom elements).                                                                                                                                                                                                                                                  |
| `targetLang`    | String        | undefined | An [IETF language tag][lang-tags] to use as the default value of the `lang` attribute for any data in the target language.                                                                                                                                                                                                                                   |

## HTML Structure

This section describes the structure of the HTML output by this library, and the classes added to the HTML elements. You can see sample HTML output by the program in the `samples/` folder, as well as the [DLx Styles][Styles] library.

**Note:** The output HTML has lots of extraneous whitespace and is poorly formatted. If you want more readable output, use a formatting library like [Prettier][Prettier] to format the result.

Each utterance/example in the original data is wrapped in a `<div class=igl>` element by default. You can customize both the tag that is used for the wrapper and the classes applied to it with the `tag` and `classes` options. For example, to wrap each utterance in `<li class=interlinear>`, you would provide the following options:

```js
const options = {
  classes: [`interlinear`],
  tag:     `li`
}
```

### Additional Notes

- The speaker (`\sp`) and source (`\s`) data are combined into a single element strutured as follows: `<p class=ex-source>{speaker} ({source})</p>`.
- Notes fields (`\n`) are not added to the HTML by default.
- Individual glosses receive the `.gl` class.

## CSS

The CSS classes for each line type are as follows:

| Line                   | CSS Class    |
| ---------------------- | ------------ |
| metadata               | `ex-header`  |
| source                 | `ex-source`  |
| transcript             | `trs`        |
| phonemic transcription | `txn`        |
| phonetic transcription | `phon`       |
| word transcription     | `w`          |
| morphemic analysis     | `m`          |
| glosses                | `glosses`    |
| literal translation    | `lit`        |
| timespan               | `timespan`   |
| free translation       | `tln`        |
| word translation       | `wlt`        |

If the language of the text is specified, it is set as the value of the `lang` attribute for data in the target language wherever relevant. Whenever the language of analysis data (metadata, glosses, translations, etc.) is specified, it is passed through to the `lang` attribute of the relevant analysis language elements (`<p class=tln lang=en>`).

When the data occurs in multiple orthographies, the orthography of the data is specified in the `data-ortho` attribute. For example, the following data is transformed to the HTML that follows:

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

<!-- Links -->
[lang-tags]:     https://datatracker.ietf.org/doc/html/rfc5646
[learn-Node]:    https://nodejs.dev/en/learn/
[Leipzig]:       https://www.eva.mpg.de/lingua/resources/glossing-rules.php
[Node]:          https://nodejs.org/
[Prettier]:      https://prettier.io/
[releases]:      https://github.com/digitallinguistics/dlx2html/releases
[Styles]:        https://styles.digitallinguistics.io/
