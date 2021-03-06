/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = decorate;
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0,
        arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}
var _privateUtils = require('./private/utils');
function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _toArray(_ref);
  var decorator = _ref2[0];
  var args = _ref2.slice(1);
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var writable = descriptor.writable;
  var originalGet = descriptor.get;
  var originalSet = descriptor.set;
  var originalValue = descriptor.value;
  var isGetter = !!originalGet;
  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      var fn = isGetter ? originalGet.call(this) : originalValue;
      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));
      if (isGetter) {
        return value;
      } else {
        var desc = {
          configurable: configurable,
          enumerable: enumerable
        };
        desc.value = value;
        desc.writable = writable;
        Object.defineProperty(this, key, desc);
        return value;
      }
    },
    set: isGetter ? originalSet : (0, _privateUtils.createDefaultSetter)()
  };
}
function decorate() {
  for (var _len = arguments.length,
      args = Array(_len),
      _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (0, _privateUtils.decorate)(handleDescriptor, args);
}
module.exports = exports['default'];
