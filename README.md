# chrome-dom-observer — MutationObserver Wrapper
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-dom-observer`

Watch DOM changes, wait for elements, attribute/text mutations, and debounced callbacks.

```typescript
import { DOMObserver } from 'chrome-dom-observer';
const obs = new DOMObserver();
obs.onAppear('.dynamic-content', (els) => els.forEach(process));
const el = await obs.waitFor('#lazy-widget', 5000);
obs.start();
```
MIT License
