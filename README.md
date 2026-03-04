# chrome-dom-observer

[![npm version](https://img.shields.io/npm/v/chrome-dom-observer)](https://npmjs.com/package/chrome-dom-observer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)

> MutationObserver wrapper for Chrome extensions -- watch DOM changes, element appearance, attribute mutations, and debounced callbacks for MV3.

## Install

```bash
npm install chrome-dom-observer
```

## Usage

```ts
import { DOMObserver } from 'chrome-dom-observer';

const observer = new DOMObserver();

// Watch for elements appearing in the DOM
observer
  .onAppear('.notification-badge', (elements) => {
    console.log(`Found ${elements.length} badges`);
  })
  .onAppear('#chat-panel', (elements) => {
    console.log('Chat panel loaded');
  })
  .start();

// Wait for a specific element with a timeout
try {
  const el = await observer.waitFor('.dynamic-content', 5000);
  console.log('Element found:', el);
} catch (err) {
  console.error('Element did not appear in time');
}

// Watch attribute changes on elements
observer.watchAttributes('.status-indicator', (el, attr, oldValue) => {
  console.log(`Attribute "${attr}" changed from "${oldValue}" to "${el.getAttribute(attr)}"`);
});

// Watch text content changes
observer.watchText('.live-counter', (el, newText) => {
  console.log('Counter updated:', newText);
});

// Create a debounced observer for batch DOM changes
const debounced = DOMObserver.debounced(() => {
  console.log('DOM settled after rapid changes');
}, 200);

// Stop observing when done
observer.stop();
```

## API

### `class DOMObserver`

#### `onAppear(selector: string, callback: (elements: Element[]) => void): this`

Register a callback for when elements matching `selector` appear in the DOM. If matching elements already exist, the callback fires immediately. Returns `this` for chaining.

#### `start(root?: Element): this`

Start observing DOM mutations. Optionally pass a `root` element to scope observation (defaults to `document.body`). Returns `this` for chaining.

#### `watchAttributes(selector: string, callback: (el: Element, attr: string, oldValue: string | null) => void): this`

Observe attribute changes on elements matching `selector`. The callback receives the element, the changed attribute name, and the previous value. Returns `this` for chaining.

#### `watchText(selector: string, callback: (el: Element, newText: string) => void): this`

Observe text content changes on elements matching `selector`. The callback receives the element and its new text content. Returns `this` for chaining.

#### `waitFor(selector: string, timeoutMs?: number): Promise<Element>`

Returns a promise that resolves when an element matching `selector` appears in the DOM. Times out after `timeoutMs` milliseconds (default: `10000`). Rejects with an error on timeout.

#### `stop(): void`

Disconnect the observer and stop watching for DOM mutations.

#### `static debounced(callback: () => void, delayMs?: number): MutationObserver`

Create a `MutationObserver` that fires the callback only after DOM mutations have settled for `delayMs` milliseconds (default: `100`). Returns the raw `MutationObserver` instance.

## License

MIT

## See Also

### Related Zovo Repositories

- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter
- [chrome-page-info](https://github.com/theluckystrike/chrome-page-info) - Page information extractor
- [awesome-chrome-extensions-dev](https://github.com/theluckystrike/awesome-chrome-extensions-dev) - Curated list of Chrome extension development resources

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.
