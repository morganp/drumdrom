'use strict';

const { renderTree } = require('./render-svg');
const createElement = require('./create-element');

function renderElement(id, source, outputDiv, options) {
  while (outputDiv.firstChild) outputDiv.removeChild(outputDiv.firstChild);
  outputDiv.appendChild(createElement(renderTree(source, { ...options, id })));
}

module.exports = renderElement;
