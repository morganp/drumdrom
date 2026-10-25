'use strict';
const { default: base } = require('./default');

module.exports = {
  dark: Object.assign({}, base, {
    bg_color: '#1e1f24', text_color: '#e6e6e6',
    title_color: '#f2f2f2', subtitle_color: '#a0a0a8', label_color: '#d8d8d8',
    count_color: '#7c7c86', count_beat_color: '#d0d0d8',
    grid_color: '#33353d', beat_color: '#50535e', bar_color: '#c8c8d0',
    mark_color: '#f0f0f0', accent_color: '#ff6a4d', ghost_color: '#8e8e98',
    staff_color: '#8a8c96', ink_color: '#f0f0f0'
  })
};
