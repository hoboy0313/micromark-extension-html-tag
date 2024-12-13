# @hoboy/micromark-extension-html-tag

## What is this?

This package contains an extension that allows you to customize the parsing of HTML tags in markdown.

## When to use this

When you want to parse HTML tags in markdown, but don't want to parse all HTML tags.

## Install

```bash
npm install @hoboy/micromark-extension-html-tag
```

## Usage

```js
import { micromark } from 'micromark'
import { htmlTag } from '@hoboy/micromark-extension-html-tag'

const micromark = micromark({
  htmlExtensions: [htmlTag({
    whitelist: ['div'],
  })],
})

const result = micromark('<div>Hello, <em>world</em>!</div>')
console.log(result) // <div>Hello, &lt;em&gt;world&lt;/em&gt;!</div>
```
