/**
 * DOM Observer — MutationObserver wrapper for content scripts
 */
export class DOMObserver {
    private observer: MutationObserver | null = null;
    private callbacks = new Map<string, Array<(elements: Element[]) => void>>();

    /** Watch for elements matching selector to appear */
    onAppear(selector: string, callback: (elements: Element[]) => void): this {
        const list = this.callbacks.get(selector) || [];
        list.push(callback);
        this.callbacks.set(selector, list);
        // Check for already-present elements
        const existing = Array.from(document.querySelectorAll(selector));
        if (existing.length) callback(existing);
        return this;
    }

    /** Start observing */
    start(root?: Element): this {
        if (this.observer) return this;
        this.observer = new MutationObserver((mutations) => {
            const addedNodes: Node[] = [];
            mutations.forEach((m) => m.addedNodes.forEach((n) => addedNodes.push(n)));
            if (addedNodes.length === 0) return;
            this.callbacks.forEach((cbs, selector) => {
                const matches = Array.from((root || document).querySelectorAll(selector));
                if (matches.length) cbs.forEach((cb) => cb(matches));
            });
        });
        this.observer.observe(root || document.body, { childList: true, subtree: true });
        return this;
    }

    /** Watch attribute changes on elements */
    watchAttributes(selector: string, callback: (el: Element, attr: string, oldValue: string | null) => void): this {
        const attrObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.type === 'attributes' && m.target instanceof Element) {
                    const el = m.target;
                    if (el.matches(selector)) callback(el, m.attributeName || '', m.oldValue);
                }
            });
        });
        document.querySelectorAll(selector).forEach((el) => {
            attrObserver.observe(el, { attributes: true, attributeOldValue: true });
        });
        return this;
    }

    /** Watch text content changes */
    watchText(selector: string, callback: (el: Element, newText: string) => void): this {
        const textObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.target.parentElement?.matches(selector)) {
                    callback(m.target.parentElement, m.target.parentElement.textContent || '');
                }
            });
        });
        document.querySelectorAll(selector).forEach((el) => {
            textObserver.observe(el, { characterData: true, subtree: true });
        });
        return this;
    }

    /** Wait for element with timeout */
    waitFor(selector: string, timeoutMs: number = 10000): Promise<Element> {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(selector);
            if (existing) { resolve(existing); return; }
            const timer = setTimeout(() => { obs.disconnect(); reject(new Error(`Timeout waiting for ${selector}`)); }, timeoutMs);
            const obs = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) { clearTimeout(timer); obs.disconnect(); resolve(el); }
            });
            obs.observe(document.body, { childList: true, subtree: true });
        });
    }

    /** Stop observing */
    stop(): void { this.observer?.disconnect(); this.observer = null; }

    /** Debounced observer */
    static debounced(callback: () => void, delayMs: number = 100): MutationObserver {
        let timer: any;
        const obs = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(callback, delayMs); });
        obs.observe(document.body, { childList: true, subtree: true });
        return obs;
    }
}
