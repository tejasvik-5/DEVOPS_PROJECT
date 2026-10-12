/* ==========================================================================
   BHUKH LAGI — DOM Utilities (dom.js)
   Helper functions for DOM manipulation.
   ========================================================================== */

const DOM = {
  /**
   * Select a single element
   */
  qs(selector, parent = document) {
    return parent.querySelector(selector);
  },

  /**
   * Select all elements
   */
  qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  },

  /**
   * Create an element with attributes and children
   */
  create(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => {
      if (key === 'className') el.className = val;
      else if (key === 'innerHTML') el.innerHTML = val;
      else if (key === 'textContent') el.textContent = val;
      else if (key.startsWith('data')) el.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), val);
      else if (key === 'style' && typeof val === 'object') Object.assign(el.style, val);
      else if (key.startsWith('on') && typeof val === 'function') el.addEventListener(key.slice(2).toLowerCase(), val);
      else el.setAttribute(key, val);
    });
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child instanceof Node) el.appendChild(child);
    });
    return el;
  },

  /**
   * Render HTML string into a container
   */
  render(container, html) {
    if (typeof container === 'string') container = DOM.qs(container);
    if (!container) return;
    container.innerHTML = html;
  },

  /**
   * Delegate event listener
   */
  on(parent, event, selector, handler) {
    if (typeof parent === 'string') parent = DOM.qs(parent);
    if (!parent) return;
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler(e, target);
      }
    });
  },

  /**
   * Add class
   */
  addClass(el, ...classes) {
    if (typeof el === 'string') el = DOM.qs(el);
    if (el) el.classList.add(...classes);
  },

  /**
   * Remove class
   */
  removeClass(el, ...classes) {
    if (typeof el === 'string') el = DOM.qs(el);
    if (el) el.classList.remove(...classes);
  },

  /**
   * Toggle class
   */
  toggleClass(el, className, force) {
    if (typeof el === 'string') el = DOM.qs(el);
    if (el) return el.classList.toggle(className, force);
  },

  /**
   * Show element
   */
  show(el) {
    if (typeof el === 'string') el = DOM.qs(el);
    if (el) el.style.display = '';
  },

  /**
   * Hide element
   */
  hide(el) {
    if (typeof el === 'string') el = DOM.qs(el);
    if (el) el.style.display = 'none';
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

// Make available for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DOM;
}
