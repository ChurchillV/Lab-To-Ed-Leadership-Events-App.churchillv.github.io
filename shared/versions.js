/* "All versions" bar: injected at the very top of every alternative screen.
   It sits outside the app's own UI (fixed strip, prototype styling) so it is never
   confused with an in-app back button. Include with:
   <script src="../shared/versions.js" data-alt="Alternative A – Ref1"></script> */
(function () {
  const me = document.currentScript;
  const launcher = new URL('../index.html', me.src).href;
  const label = me.dataset.alt || '';

  const css = `
  :root { --proto-bar: calc(44px + env(safe-area-inset-top, 0px)); }
  html { scroll-padding-top: var(--proto-bar); }
  body { padding-top: var(--proto-bar) !important; }
  .proto-bar { position: fixed; z-index: 9999; top: 0; left: 0; right: 0;
    height: var(--proto-bar); padding: env(safe-area-inset-top, 0px) max(10px, env(safe-area-inset-right, 0px)) 0 max(10px, env(safe-area-inset-left, 0px));
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    background: repeating-linear-gradient(135deg, #16161a 0 10px, #1d1d22 10px 20px);
    border-bottom: 2px dashed #f5c542; box-sizing: border-box;
    font: 600 13px/1.2 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; }
  .proto-bar a { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; min-width: 44px;
    padding: 0 12px; border-radius: 8px; background: #f5c542; color: #16161a; text-decoration: none; font-weight: 700; }
  .proto-bar a:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
  .proto-bar .proto-label { color: #f3f3f5; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
  .proto-bar .proto-label b { color: #f5c542; font-weight: 700; letter-spacing: .06em; font-size: 11px; margin-right: 6px; }
  .proto-bar a::after { content: ""; position: absolute; inset: -4px; } /* larger hit area */
  .proto-bar a { position: relative; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function inject() {
    if (document.querySelector('.proto-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'proto-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Prototype controls');
    bar.innerHTML = `<a href="${launcher}" data-proto="all-versions"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>All versions</a><span class="proto-label"><b>PROTOTYPE</b>${label}</span>`;
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.body) inject(); else document.addEventListener('DOMContentLoaded', inject);
})();
