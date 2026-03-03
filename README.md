# chrome-dom-observer — MutationObserver Wrapper

[![npm version](https://img.shields.io/npm/v/chrome-dom-observer)](https://npmjs.com/package/chrome-dom-observer)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-dom-observer/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-dom-observer/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-dom-observer?style=social)](https://github.com/theluckystrike/chrome-dom-observer)

> Watch DOM changes, wait for elements, attribute/text mutations, and debounced callbacks.

**chrome-dom-observer** provides a MutationObserver wrapper for Chrome extensions. Watch DOM changes, wait for elements, track attribute and text mutations, with debounced callbacks.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **DOM Watching** - Monitor DOM changes
- ✅ **Element Wait** - Wait for elements to appear
- ✅ **Mutation Tracking** - Track attribute/text changes
- ✅ **Debouncing** - Debounced callbacks
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-dom-observer
```

## Usage

```typescript
import { DOMObserver } from 'chrome-dom-observer';

const obs = new DOMObserver();

// Watch for element appearance
obs.onAppear('.dynamic-content', (els) => {
  els.forEach(process);
});

// Wait for element
const el = await obs.waitFor('#lazy-widget', 5000);

// Start observing
obs.start();
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/observer-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/observer-feature`
7. **Submit** a Pull Request

## See Also

### Related Zovo Repositories

- [chrome-page-info](https://github.com/theluckystrike/chrome-page-info) - Page data extraction
- [webext-element-picker](https://github.com/theluckystrike/webext-element-picker) - Element selector

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
