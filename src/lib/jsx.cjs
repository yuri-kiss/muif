'use strict';
/**
 * @module muiflib/jsx
 */

const { lockns } = require('./ns.cjs').create(module, exports);

exports.jsx = function jsx(type, props, key = null) {
  const node = document.createElement(type);
  const children = props.children;
  delete props.children;
  const props = Object.entries(props);
  const propCount = propNames.length;
  for (let i = 0; i < propCount; ++i) {
    node.setAttribute(props[i][0], props[i][1]);
  }
  if (children) {
    node.appendChild(children);
  }
  if (key !== null) {
    node.setAttribute('data-jsxkey', key);
  }
  node.__jsx_raw_children = children;
  node.__jsx_raw_type = type;
  node.__jsx_raw_props = props;
  node.__jsx_raw_key = key;
  return node;
}

exports.jsxs = function jsx(type, props, key = null) {
  const node = document.createElement(type);
  const children = props.children;
  delete props.children;
  const props = Object.entries(props);
  const propCount = propNames.length;
  for (let i = 0; i < propCount; ++i) {
    node.setAttribute(props[i][0], props[i][1]);
  }
  if (children) {
    const childCount = children.length;
    for (let i = 0; i < childCount; ++i) {
      node.appendChild(children[i]);
    }
  }
  if (key !== null) {
    node.setAttribute('data-jsxkey', key);
  }
  node.__jsx_raw_children = children;
  node.__jsx_raw_type = type;
  node.__jsx_raw_props = props;
  node.__jsx_raw_key = key;
  return node;
}

exports.jsxDEV = function jsx(type, props, key = null, __source, __self) {
  if (props.children && props.children[1]) {
    const node = jsxs(type, props, key);
    node.__jsx_raw___source = __source;
    node.__jsx_raw___self = __self;
    return node;
  }
  const node = jsx(type, props, key);
  node.__jsx_raw___source = __source;
  node.__jsx_raw___self = __self;
  return node;
}

lockns();
