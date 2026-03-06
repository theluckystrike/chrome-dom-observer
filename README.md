# chrome-dom-observer

[![npm version](https://img.shields.io/npm/v/chrome-dom-observer)](https://npmjs.com/package/chrome-dom-observer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-dom-observer?style=social)](https://github.com/theluckystrike/chrome-dom-observer)

A small MutationObserver wrapper built for Chrome extension content scripts. It handles element appearance, attribute changes, text mutations, and debounced callbacks without any dependencies.

Designed for Manifest V3.

INSTALL

```bash
npm install chrome-dom-observer
```

USAGE

```ts
import { DOMObserver } from 'chrome-dom-observer';

const observer = new DOMObserver();

// React when elements appear in the DOM
observer
  .onAppear('.notification-badge', (elements) => {
    console.log(`Found ${elements.length} badges`);
  })
  .onAppear('#chat-panel', (elements) => {
    console.log('Chat panel loaded');
  })
  .start();
```

WAITING FOR AN ELEMENT

```ts
try {
  const el = await observer.waitFor('.dynamic-content', 5000);
  console.log('Element found:', el);
} catch (err) {
  console.error('Element did not appear in time');
}
```

The default timeout is 10 seconds. Pass a number in milliseconds to override it.

WATCHING ATTRIBUTE CHANGES

```ts
observer.watchAttributes('.status-indicator', (el, attr, oldValue) => {
  console.log(`${attr} changed from ${oldValue} to ${el.getAttribute(attr)}`);
});
```

Internally this creates a separate MutationObserver per selector with attributeOldValue enabled.

WATCHING TEXT CONTENT

```ts
observer.watchText('.live-counter', (el, newText) => {
  console.log('Counter updated:', newText);
});
```

Uses characterData observation on subtree nodes. The callback receives the parent element matching the selector and its new textContent.

DEBOUNCED OBSERVER

```ts
const debounced = DOMObserver.debounced(() => {
  console.log('DOM settled after rapid changes');
}, 200);
```

Returns a raw MutationObserver that fires the callback only after mutations stop for the given delay (default 100ms). Useful for reacting to bulk DOM updates without thrashing.

STOPPING

```ts
observer.stop();
```

Disconnects the main observer. Attribute and text observers created by watchAttributes and watchText are independent and should be disconnected separately if needed.

API REFERENCE

DOMObserver

onAppear(selector, callback) returns this
Register a callback that fires when elements matching the selector appear in the DOM. If matching elements already exist at the time of registration, the callback fires immediately. Chainable.

start(root?) returns this
Begin observing DOM mutations. Accepts an optional root element to scope observation. Defaults to document.body. Chainable.

watchAttributes(selector, callback) returns this
Observe attribute changes on elements matching the selector. The callback receives the element, the attribute name, and the previous value. Chainable.

watchText(selector, callback) returns this
Observe text content changes on elements matching the selector. The callback receives the element and its new text content. Chainable.

waitFor(selector, timeoutMs?) returns Promise of Element
Returns a promise that resolves when an element matching the selector appears. Default timeout is 10000ms. Rejects on timeout.

stop() returns void
Disconnect the main observer created by start.

DOMObserver.debounced(callback, delayMs?) returns MutationObserver
Static method. Creates a MutationObserver that fires the callback only after DOM mutations settle for delayMs milliseconds (default 100). Observes document.body with childList and subtree.

LICENSE

MIT. See LICENSE file.

CONTRIBUTING

Fork the repo, create a branch, open a pull request. Keep changes focused and include context in your commit messages.

---

Built at [zovo.one](https://zovo.one)

[github.com/theluckystrike/chrome-dom-observer](https://github.com/theluckystrike/chrome-dom-observer)
