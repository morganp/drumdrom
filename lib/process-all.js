'use strict';

const renderElement = require('./render-element');

// Replaces every <script type="drumdrom"> with an inline SVG. A bad pattern
// shows its validation errors in place of the diagram.
function processAll() {
  const scripts = Array.from(document.querySelectorAll('script[type="drumdrom"]'));
  scripts.forEach((el, i) => {
    const div = document.createElement('div');
    div.id = 'DrumDrom_Display_' + i;
    el.parentNode.insertBefore(div, el);
    try {
      renderElement(i, el.textContent.trim(), div);
    } catch (e) {
      const list = e.errors || [e];
      const pre = document.createElement('pre');
      pre.className = 'drumdrom-error';
      pre.textContent = list.map(x => (x.path ? x.path + ': ' : '') + x.message).join('\n');
      div.appendChild(pre);
      console.error('DrumDrom error for diagram ' + i + ':', e);
    }
  });
}

module.exports = processAll;
