var docsifyCodeInline = (function (exports) {
  'use strict';

  var _a, _b, _c, _d;
  // Core
  function transform(markdown) {
      const RE = /\[`(.*?)(?<!\\(\\{2})*)`\s+([a-z0-9-]+?)\](?!\()/g;
      return markdown.replace(RE, (_, code, __, lang) => {
          const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return `<code class="language-${lang}">${escaped}</code>`;
      });
  }
  const DEFAULT_CSS = `
.markdown-section :not(pre) > code[class*="language-"] {
  background: var(--code-theme-background);
  margin: var(--code-inline-margin);
  padding: var(--code-inline-padding);
  border-radius: var(--code-inline-border-radius);
  color: var(--code-inline-color, currentColor);
}
`;
  // Plugin registration and CSS injection need a DOM
  if (typeof document !== 'undefined') {
      // Register the plugin automatically, unless <script data-no-autoload> was used
      if (typeof ((_b = (_a = document.currentScript) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.noAutoload) === 'undefined') {
          const inlineCode = (hook) => {
              hook.beforeEach((content) => transform(content));
          };
          $docsify = $docsify || {};
          $docsify.plugins = $docsify.plugins || [];
          $docsify.plugins.push(inlineCode);
      }
      // Add CSS automatically, unless <script data-no-css-inject> was used
      if (typeof ((_d = (_c = document.currentScript) === null || _c === void 0 ? void 0 : _c.dataset) === null || _d === void 0 ? void 0 : _d.noCssInject) === 'undefined') {
          document.head
              .insertBefore(document.createElement('style'), document.head.firstElementChild)
              .appendChild(document.createTextNode(DEFAULT_CSS));
      }
  }

  exports.DEFAULT_CSS = DEFAULT_CSS;
  exports.transform = transform;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=index.js.map
