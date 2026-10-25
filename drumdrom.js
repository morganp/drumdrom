"use strict";
var DrumDrom = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // package.json
  var require_package = __commonJS({
    "package.json"(exports, module) {
      module.exports = {
        name: "drumdrom",
        version: "0.3.0",
        description: "Drum patterns as JSON5, rendered to SVG percussion notation and lane charts",
        license: "MIT",
        author: "Morgan Prior",
        main: "./lib/index.js",
        bin: {
          drumdrom: "bin/cli.js"
        },
        files: [
          "bin/",
          "lib/",
          "skins/",
          "schema/",
          "docs/",
          "README.md",
          "CHANGELOG.md",
          "LICENSE",
          "NOTICE-BRAVURA.txt"
        ],
        engines: {
          node: ">=18"
        },
        scripts: {
          test: "mocha test",
          lint: "eslint lib bin skins scripts test eslint.config.js",
          dist: "esbuild ./lib/drumdrom.js --bundle --format=iife --global-name=DrumDrom --outfile=dist/drumdrom.js",
          "dist.min": "esbuild ./lib/drumdrom.js --bundle --format=iife --global-name=DrumDrom --minify --outfile=dist/drumdrom.min.js",
          build: "npm run dist && npm run dist.min",
          docs: "node scripts/render-fixtures.js docs/images",
          "update-snapshots": "node scripts/render-fixtures.js test/snapshots"
        },
        dependencies: {
          ajv: "^8.20.0",
          json5: "^2.2.3",
          onml: "^2.3.0"
        },
        devDependencies: {
          chai: "^6.3.0",
          esbuild: "^0.28.2",
          eslint: "^10.13.0",
          mocha: "^12.0.3"
        }
      };
    }
  });

  // lib/errors.js
  var require_errors = __commonJS({
    "lib/errors.js"(exports, module) {
      "use strict";
      var DrumDromError = class extends Error {
        constructor(code, message, location) {
          super(message);
          const loc = location || {};
          this.name = "DrumDromError";
          this.code = code;
          this.path = loc.path === void 0 ? "" : loc.path;
          if (loc.line !== void 0) this.line = loc.line;
          if (loc.column !== void 0) this.column = loc.column;
          if (loc.index !== void 0) this.index = loc.index;
        }
      };
      function errorInfo(code, message, location) {
        const e = new DrumDromError(code, message, location);
        const out = { code: e.code, message: e.message, path: e.path };
        if (e.line !== void 0) out.line = e.line;
        if (e.column !== void 0) out.column = e.column;
        if (e.index !== void 0) out.index = e.index;
        return out;
      }
      function formatError(info) {
        let head = info.path || "";
        if (info.line !== void 0) {
          const at = "line " + info.line + ", column " + info.column;
          head = head ? head + " (" + at + ")" : at;
        }
        return (head ? head + ": " : "") + info.message + " [" + info.code + "]";
      }
      module.exports = { DrumDromError, errorInfo, formatError };
    }
  });

  // node_modules/json5/dist/index.js
  var require_dist = __commonJS({
    "node_modules/json5/dist/index.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
      })(exports, (function() {
        "use strict";
        function createCommonjsModule(fn, module2) {
          return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
        }
        var _global = createCommonjsModule(function(module2) {
          var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
          if (typeof __g == "number") {
            __g = global;
          }
        });
        var _core = createCommonjsModule(function(module2) {
          var core = module2.exports = { version: "2.6.5" };
          if (typeof __e == "number") {
            __e = core;
          }
        });
        var _core_1 = _core.version;
        var _isObject = function(it) {
          return typeof it === "object" ? it !== null : typeof it === "function";
        };
        var _anObject = function(it) {
          if (!_isObject(it)) {
            throw TypeError(it + " is not an object!");
          }
          return it;
        };
        var _fails = function(exec) {
          try {
            return !!exec();
          } catch (e) {
            return true;
          }
        };
        var _descriptors = !_fails(function() {
          return Object.defineProperty({}, "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var document2 = _global.document;
        var is = _isObject(document2) && _isObject(document2.createElement);
        var _domCreate = function(it) {
          return is ? document2.createElement(it) : {};
        };
        var _ie8DomDefine = !_descriptors && !_fails(function() {
          return Object.defineProperty(_domCreate("div"), "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var _toPrimitive = function(it, S) {
          if (!_isObject(it)) {
            return it;
          }
          var fn, val;
          if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          throw TypeError("Can't convert object to primitive value");
        };
        var dP = Object.defineProperty;
        var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
          _anObject(O);
          P = _toPrimitive(P, true);
          _anObject(Attributes);
          if (_ie8DomDefine) {
            try {
              return dP(O, P, Attributes);
            } catch (e) {
            }
          }
          if ("get" in Attributes || "set" in Attributes) {
            throw TypeError("Accessors not supported!");
          }
          if ("value" in Attributes) {
            O[P] = Attributes.value;
          }
          return O;
        };
        var _objectDp = {
          f
        };
        var _propertyDesc = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value
          };
        };
        var _hide = _descriptors ? function(object, key2, value) {
          return _objectDp.f(object, key2, _propertyDesc(1, value));
        } : function(object, key2, value) {
          object[key2] = value;
          return object;
        };
        var hasOwnProperty = {}.hasOwnProperty;
        var _has = function(it, key2) {
          return hasOwnProperty.call(it, key2);
        };
        var id = 0;
        var px = Math.random();
        var _uid = function(key2) {
          return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
        };
        var _library = false;
        var _shared = createCommonjsModule(function(module2) {
          var SHARED = "__core-js_shared__";
          var store = _global[SHARED] || (_global[SHARED] = {});
          (module2.exports = function(key2, value) {
            return store[key2] || (store[key2] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: _core.version,
            mode: _library ? "pure" : "global",
            copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
          });
        });
        var _functionToString = _shared("native-function-to-string", Function.toString);
        var _redefine = createCommonjsModule(function(module2) {
          var SRC = _uid("src");
          var TO_STRING = "toString";
          var TPL = ("" + _functionToString).split(TO_STRING);
          _core.inspectSource = function(it) {
            return _functionToString.call(it);
          };
          (module2.exports = function(O, key2, val, safe) {
            var isFunction = typeof val == "function";
            if (isFunction) {
              _has(val, "name") || _hide(val, "name", key2);
            }
            if (O[key2] === val) {
              return;
            }
            if (isFunction) {
              _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
            }
            if (O === _global) {
              O[key2] = val;
            } else if (!safe) {
              delete O[key2];
              _hide(O, key2, val);
            } else if (O[key2]) {
              O[key2] = val;
            } else {
              _hide(O, key2, val);
            }
          })(Function.prototype, TO_STRING, function toString() {
            return typeof this == "function" && this[SRC] || _functionToString.call(this);
          });
        });
        var _aFunction = function(it) {
          if (typeof it != "function") {
            throw TypeError(it + " is not a function!");
          }
          return it;
        };
        var _ctx = function(fn, that, length) {
          _aFunction(fn);
          if (that === void 0) {
            return fn;
          }
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c2) {
                return fn.call(that, a, b, c2);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
        var PROTOTYPE = "prototype";
        var $export = function(type, name, source2) {
          var IS_FORCED = type & $export.F;
          var IS_GLOBAL = type & $export.G;
          var IS_STATIC = type & $export.S;
          var IS_PROTO = type & $export.P;
          var IS_BIND = type & $export.B;
          var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
          var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
          var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
          var key2, own, out, exp;
          if (IS_GLOBAL) {
            source2 = name;
          }
          for (key2 in source2) {
            own = !IS_FORCED && target && target[key2] !== void 0;
            out = (own ? target : source2)[key2];
            exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
            if (target) {
              _redefine(target, key2, out, type & $export.U);
            }
            if (exports2[key2] != out) {
              _hide(exports2, key2, exp);
            }
            if (IS_PROTO && expProto[key2] != out) {
              expProto[key2] = out;
            }
          }
        };
        _global.core = _core;
        $export.F = 1;
        $export.G = 2;
        $export.S = 4;
        $export.P = 8;
        $export.B = 16;
        $export.W = 32;
        $export.U = 64;
        $export.R = 128;
        var _export = $export;
        var ceil = Math.ceil;
        var floor = Math.floor;
        var _toInteger = function(it) {
          return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
        var _defined = function(it) {
          if (it == void 0) {
            throw TypeError("Can't call method on  " + it);
          }
          return it;
        };
        var _stringAt = function(TO_STRING) {
          return function(that, pos2) {
            var s = String(_defined(that));
            var i = _toInteger(pos2);
            var l = s.length;
            var a, b;
            if (i < 0 || i >= l) {
              return TO_STRING ? "" : void 0;
            }
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
          };
        };
        var $at = _stringAt(false);
        _export(_export.P, "String", {
          // 21.1.3.3 String.prototype.codePointAt(pos)
          codePointAt: function codePointAt2(pos2) {
            return $at(this, pos2);
          }
        });
        var codePointAt = _core.String.codePointAt;
        var max = Math.max;
        var min = Math.min;
        var _toAbsoluteIndex = function(index, length) {
          index = _toInteger(index);
          return index < 0 ? max(index + length, 0) : min(index, length);
        };
        var fromCharCode = String.fromCharCode;
        var $fromCodePoint = String.fromCodePoint;
        _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
          // 21.1.2.2 String.fromCodePoint(...codePoints)
          fromCodePoint: function fromCodePoint2(x) {
            var arguments$1 = arguments;
            var res = [];
            var aLen = arguments.length;
            var i = 0;
            var code;
            while (aLen > i) {
              code = +arguments$1[i++];
              if (_toAbsoluteIndex(code, 1114111) !== code) {
                throw RangeError(code + " is not a valid code point");
              }
              res.push(
                code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320)
              );
            }
            return res.join("");
          }
        });
        var fromCodePoint = _core.String.fromCodePoint;
        var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
        var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
        var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
        var unicode = {
          Space_Separator,
          ID_Start,
          ID_Continue
        };
        var util = {
          isSpaceSeparator: function isSpaceSeparator(c2) {
            return typeof c2 === "string" && unicode.Space_Separator.test(c2);
          },
          isIdStartChar: function isIdStartChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
          },
          isIdContinueChar: function isIdContinueChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
          },
          isDigit: function isDigit(c2) {
            return typeof c2 === "string" && /[0-9]/.test(c2);
          },
          isHexDigit: function isHexDigit(c2) {
            return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
          }
        };
        var source;
        var parseState;
        var stack;
        var pos;
        var line;
        var column;
        var token;
        var key;
        var root;
        var parse = function parse2(text, reviver) {
          source = String(text);
          parseState = "start";
          stack = [];
          pos = 0;
          line = 1;
          column = 0;
          token = void 0;
          key = void 0;
          root = void 0;
          do {
            token = lex();
            parseStates[parseState]();
          } while (token.type !== "eof");
          if (typeof reviver === "function") {
            return internalize({ "": root }, "", reviver);
          }
          return root;
        };
        function internalize(holder, name, reviver) {
          var value = holder[name];
          if (value != null && typeof value === "object") {
            if (Array.isArray(value)) {
              for (var i = 0; i < value.length; i++) {
                var key2 = String(i);
                var replacement = internalize(value, key2, reviver);
                if (replacement === void 0) {
                  delete value[key2];
                } else {
                  Object.defineProperty(value, key2, {
                    value: replacement,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            } else {
              for (var key$1 in value) {
                var replacement$1 = internalize(value, key$1, reviver);
                if (replacement$1 === void 0) {
                  delete value[key$1];
                } else {
                  Object.defineProperty(value, key$1, {
                    value: replacement$1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            }
          }
          return reviver.call(holder, name, value);
        }
        var lexState;
        var buffer;
        var doubleQuote;
        var sign;
        var c;
        function lex() {
          lexState = "default";
          buffer = "";
          doubleQuote = false;
          sign = 1;
          for (; ; ) {
            c = peek();
            var token2 = lexStates[lexState]();
            if (token2) {
              return token2;
            }
          }
        }
        function peek() {
          if (source[pos]) {
            return String.fromCodePoint(source.codePointAt(pos));
          }
        }
        function read() {
          var c2 = peek();
          if (c2 === "\n") {
            line++;
            column = 0;
          } else if (c2) {
            column += c2.length;
          } else {
            column++;
          }
          if (c2) {
            pos += c2.length;
          }
          return c2;
        }
        var lexStates = {
          default: function default$1() {
            switch (c) {
              case "	":
              case "\v":
              case "\f":
              case " ":
              case "\xA0":
              case "\uFEFF":
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                return;
              case "/":
                read();
                lexState = "comment";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            if (util.isSpaceSeparator(c)) {
              read();
              return;
            }
            return lexStates[parseState]();
          },
          comment: function comment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineComment";
                return;
              case "/":
                read();
                lexState = "singleLineComment";
                return;
            }
            throw invalidChar(read());
          },
          multiLineComment: function multiLineComment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineCommentAsterisk";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
          },
          multiLineCommentAsterisk: function multiLineCommentAsterisk() {
            switch (c) {
              case "*":
                read();
                return;
              case "/":
                read();
                lexState = "default";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
            lexState = "multiLineComment";
          },
          singleLineComment: function singleLineComment() {
            switch (c) {
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                lexState = "default";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            read();
          },
          value: function value() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
              case "n":
                read();
                literal("ull");
                return newToken("null", null);
              case "t":
                read();
                literal("rue");
                return newToken("boolean", true);
              case "f":
                read();
                literal("alse");
                return newToken("boolean", false);
              case "-":
              case "+":
                if (read() === "-") {
                  sign = -1;
                }
                lexState = "sign";
                return;
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
              case '"':
              case "'":
                doubleQuote = read() === '"';
                buffer = "";
                lexState = "string";
                return;
            }
            throw invalidChar(read());
          },
          identifierNameStartEscape: function identifierNameStartEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
                break;
              default:
                if (!util.isIdStartChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          identifierName: function identifierName() {
            switch (c) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                buffer += read();
                return;
              case "\\":
                read();
                lexState = "identifierNameEscape";
                return;
            }
            if (util.isIdContinueChar(c)) {
              buffer += read();
              return;
            }
            return newToken("identifier", buffer);
          },
          identifierNameEscape: function identifierNameEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                break;
              default:
                if (!util.isIdContinueChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          sign: function sign$1() {
            switch (c) {
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", sign * Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
            }
            throw invalidChar(read());
          },
          zero: function zero() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
              case "x":
              case "X":
                buffer += read();
                lexState = "hexadecimal";
                return;
            }
            return newToken("numeric", sign * 0);
          },
          decimalInteger: function decimalInteger() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalPointLeading: function decimalPointLeading() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            throw invalidChar(read());
          },
          decimalPoint: function decimalPoint() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalFraction: function decimalFraction() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalExponent: function decimalExponent() {
            switch (c) {
              case "+":
              case "-":
                buffer += read();
                lexState = "decimalExponentSign";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentSign: function decimalExponentSign() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentInteger: function decimalExponentInteger() {
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          hexadecimal: function hexadecimal() {
            if (util.isHexDigit(c)) {
              buffer += read();
              lexState = "hexadecimalInteger";
              return;
            }
            throw invalidChar(read());
          },
          hexadecimalInteger: function hexadecimalInteger() {
            if (util.isHexDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          string: function string() {
            switch (c) {
              case "\\":
                read();
                buffer += escape2();
                return;
              case '"':
                if (doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "'":
                if (!doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "\n":
              case "\r":
                throw invalidChar(read());
              case "\u2028":
              case "\u2029":
                separatorChar(c);
                break;
              case void 0:
                throw invalidChar(read());
            }
            buffer += read();
          },
          start: function start() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
            }
            lexState = "value";
          },
          beforePropertyName: function beforePropertyName() {
            switch (c) {
              case "$":
              case "_":
                buffer = read();
                lexState = "identifierName";
                return;
              case "\\":
                read();
                lexState = "identifierNameStartEscape";
                return;
              case "}":
                return newToken("punctuator", read());
              case '"':
              case "'":
                doubleQuote = read() === '"';
                lexState = "string";
                return;
            }
            if (util.isIdStartChar(c)) {
              buffer += read();
              lexState = "identifierName";
              return;
            }
            throw invalidChar(read());
          },
          afterPropertyName: function afterPropertyName() {
            if (c === ":") {
              return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforePropertyValue: function beforePropertyValue() {
            lexState = "value";
          },
          afterPropertyValue: function afterPropertyValue() {
            switch (c) {
              case ",":
              case "}":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforeArrayValue: function beforeArrayValue() {
            if (c === "]") {
              return newToken("punctuator", read());
            }
            lexState = "value";
          },
          afterArrayValue: function afterArrayValue() {
            switch (c) {
              case ",":
              case "]":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          end: function end() {
            throw invalidChar(read());
          }
        };
        function newToken(type, value) {
          return {
            type,
            value,
            line,
            column
          };
        }
        function literal(s) {
          for (var i = 0, list = s; i < list.length; i += 1) {
            var c2 = list[i];
            var p = peek();
            if (p !== c2) {
              throw invalidChar(read());
            }
            read();
          }
        }
        function escape2() {
          var c2 = peek();
          switch (c2) {
            case "b":
              read();
              return "\b";
            case "f":
              read();
              return "\f";
            case "n":
              read();
              return "\n";
            case "r":
              read();
              return "\r";
            case "t":
              read();
              return "	";
            case "v":
              read();
              return "\v";
            case "0":
              read();
              if (util.isDigit(peek())) {
                throw invalidChar(read());
              }
              return "\0";
            case "x":
              read();
              return hexEscape();
            case "u":
              read();
              return unicodeEscape();
            case "\n":
            case "\u2028":
            case "\u2029":
              read();
              return "";
            case "\r":
              read();
              if (peek() === "\n") {
                read();
              }
              return "";
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              throw invalidChar(read());
            case void 0:
              throw invalidChar(read());
          }
          return read();
        }
        function hexEscape() {
          var buffer2 = "";
          var c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        function unicodeEscape() {
          var buffer2 = "";
          var count = 4;
          while (count-- > 0) {
            var c2 = peek();
            if (!util.isHexDigit(c2)) {
              throw invalidChar(read());
            }
            buffer2 += read();
          }
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        var parseStates = {
          start: function start() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforePropertyName: function beforePropertyName() {
            switch (token.type) {
              case "identifier":
              case "string":
                key = token.value;
                parseState = "afterPropertyName";
                return;
              case "punctuator":
                pop();
                return;
              case "eof":
                throw invalidEOF();
            }
          },
          afterPropertyName: function afterPropertyName() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            parseState = "beforePropertyValue";
          },
          beforePropertyValue: function beforePropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforeArrayValue: function beforeArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            if (token.type === "punctuator" && token.value === "]") {
              pop();
              return;
            }
            push();
          },
          afterPropertyValue: function afterPropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforePropertyName";
                return;
              case "}":
                pop();
            }
          },
          afterArrayValue: function afterArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforeArrayValue";
                return;
              case "]":
                pop();
            }
          },
          end: function end() {
          }
        };
        function push() {
          var value;
          switch (token.type) {
            case "punctuator":
              switch (token.value) {
                case "{":
                  value = {};
                  break;
                case "[":
                  value = [];
                  break;
              }
              break;
            case "null":
            case "boolean":
            case "numeric":
            case "string":
              value = token.value;
              break;
          }
          if (root === void 0) {
            root = value;
          } else {
            var parent = stack[stack.length - 1];
            if (Array.isArray(parent)) {
              parent.push(value);
            } else {
              Object.defineProperty(parent, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
          if (value !== null && typeof value === "object") {
            stack.push(value);
            if (Array.isArray(value)) {
              parseState = "beforeArrayValue";
            } else {
              parseState = "beforePropertyName";
            }
          } else {
            var current = stack[stack.length - 1];
            if (current == null) {
              parseState = "end";
            } else if (Array.isArray(current)) {
              parseState = "afterArrayValue";
            } else {
              parseState = "afterPropertyValue";
            }
          }
        }
        function pop() {
          stack.pop();
          var current = stack[stack.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
        function invalidChar(c2) {
          if (c2 === void 0) {
            return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
          }
          return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line + ":" + column);
        }
        function invalidEOF() {
          return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
        }
        function invalidIdentifier() {
          column -= 5;
          return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
        }
        function separatorChar(c2) {
          console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
        }
        function formatChar(c2) {
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          if (replacements[c2]) {
            return replacements[c2];
          }
          if (c2 < " ") {
            var hexString = c2.charCodeAt(0).toString(16);
            return "\\x" + ("00" + hexString).substring(hexString.length);
          }
          return c2;
        }
        function syntaxError(message) {
          var err = new SyntaxError(message);
          err.lineNumber = line;
          err.columnNumber = column;
          return err;
        }
        var stringify = function stringify2(value, replacer, space) {
          var stack2 = [];
          var indent = "";
          var propertyList;
          var replacerFunc;
          var gap = "";
          var quote;
          if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
            space = replacer.space;
            quote = replacer.quote;
            replacer = replacer.replacer;
          }
          if (typeof replacer === "function") {
            replacerFunc = replacer;
          } else if (Array.isArray(replacer)) {
            propertyList = [];
            for (var i = 0, list = replacer; i < list.length; i += 1) {
              var v = list[i];
              var item = void 0;
              if (typeof v === "string") {
                item = v;
              } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
                item = String(v);
              }
              if (item !== void 0 && propertyList.indexOf(item) < 0) {
                propertyList.push(item);
              }
            }
          }
          if (space instanceof Number) {
            space = Number(space);
          } else if (space instanceof String) {
            space = String(space);
          }
          if (typeof space === "number") {
            if (space > 0) {
              space = Math.min(10, Math.floor(space));
              gap = "          ".substr(0, space);
            }
          } else if (typeof space === "string") {
            gap = space.substr(0, 10);
          }
          return serializeProperty("", { "": value });
          function serializeProperty(key2, holder) {
            var value2 = holder[key2];
            if (value2 != null) {
              if (typeof value2.toJSON5 === "function") {
                value2 = value2.toJSON5(key2);
              } else if (typeof value2.toJSON === "function") {
                value2 = value2.toJSON(key2);
              }
            }
            if (replacerFunc) {
              value2 = replacerFunc.call(holder, key2, value2);
            }
            if (value2 instanceof Number) {
              value2 = Number(value2);
            } else if (value2 instanceof String) {
              value2 = String(value2);
            } else if (value2 instanceof Boolean) {
              value2 = value2.valueOf();
            }
            switch (value2) {
              case null:
                return "null";
              case true:
                return "true";
              case false:
                return "false";
            }
            if (typeof value2 === "string") {
              return quoteString(value2, false);
            }
            if (typeof value2 === "number") {
              return String(value2);
            }
            if (typeof value2 === "object") {
              return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
            }
            return void 0;
          }
          function quoteString(value2) {
            var quotes = {
              "'": 0.1,
              '"': 0.2
            };
            var replacements = {
              "'": "\\'",
              '"': '\\"',
              "\\": "\\\\",
              "\b": "\\b",
              "\f": "\\f",
              "\n": "\\n",
              "\r": "\\r",
              "	": "\\t",
              "\v": "\\v",
              "\0": "\\0",
              "\u2028": "\\u2028",
              "\u2029": "\\u2029"
            };
            var product = "";
            for (var i2 = 0; i2 < value2.length; i2++) {
              var c2 = value2[i2];
              switch (c2) {
                case "'":
                case '"':
                  quotes[c2]++;
                  product += c2;
                  continue;
                case "\0":
                  if (util.isDigit(value2[i2 + 1])) {
                    product += "\\x00";
                    continue;
                  }
              }
              if (replacements[c2]) {
                product += replacements[c2];
                continue;
              }
              if (c2 < " ") {
                var hexString = c2.charCodeAt(0).toString(16);
                product += "\\x" + ("00" + hexString).substring(hexString.length);
                continue;
              }
              product += c2;
            }
            var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
              return quotes[a] < quotes[b] ? a : b;
            });
            product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
            return quoteChar + product + quoteChar;
          }
          function serializeObject(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var keys = propertyList || Object.keys(value2);
            var partial = [];
            for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
              var key2 = list2[i2];
              var propertyString = serializeProperty(key2, value2);
              if (propertyString !== void 0) {
                var member = serializeKey(key2) + ":";
                if (gap !== "") {
                  member += " ";
                }
                member += propertyString;
                partial.push(member);
              }
            }
            var final;
            if (partial.length === 0) {
              final = "{}";
            } else {
              var properties;
              if (gap === "") {
                properties = partial.join(",");
                final = "{" + properties + "}";
              } else {
                var separator = ",\n" + indent;
                properties = partial.join(separator);
                final = "{\n" + indent + properties + ",\n" + stepback + "}";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
          function serializeKey(key2) {
            if (key2.length === 0) {
              return quoteString(key2, true);
            }
            var firstChar = String.fromCodePoint(key2.codePointAt(0));
            if (!util.isIdStartChar(firstChar)) {
              return quoteString(key2, true);
            }
            for (var i2 = firstChar.length; i2 < key2.length; i2++) {
              if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
                return quoteString(key2, true);
              }
            }
            return key2;
          }
          function serializeArray(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var partial = [];
            for (var i2 = 0; i2 < value2.length; i2++) {
              var propertyString = serializeProperty(String(i2), value2);
              partial.push(propertyString !== void 0 ? propertyString : "null");
            }
            var final;
            if (partial.length === 0) {
              final = "[]";
            } else {
              if (gap === "") {
                var properties = partial.join(",");
                final = "[" + properties + "]";
              } else {
                var separator = ",\n" + indent;
                var properties$1 = partial.join(separator);
                final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
        };
        var JSON5 = {
          parse,
          stringify
        };
        var lib = JSON5;
        var es5 = lib;
        return es5;
      }));
    }
  });

  // node_modules/ajv/dist/compile/codegen/code.js
  var require_code = __commonJS({
    "node_modules/ajv/dist/compile/codegen/code.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
      var _CodeOrName = class {
      };
      exports._CodeOrName = _CodeOrName;
      exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
      var Name = class extends _CodeOrName {
        constructor(s) {
          super();
          if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
          this.str = s;
        }
        toString() {
          return this.str;
        }
        emptyStr() {
          return false;
        }
        get names() {
          return { [this.str]: 1 };
        }
      };
      exports.Name = Name;
      var _Code = class extends _CodeOrName {
        constructor(code) {
          super();
          this._items = typeof code === "string" ? [code] : code;
        }
        toString() {
          return this.str;
        }
        emptyStr() {
          if (this._items.length > 1)
            return false;
          const item = this._items[0];
          return item === "" || item === '""';
        }
        get str() {
          var _a;
          return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
        }
        get names() {
          var _a;
          return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
              names[c.str] = (names[c.str] || 0) + 1;
            return names;
          }, {});
        }
      };
      exports._Code = _Code;
      exports.nil = new _Code("");
      function _(strs, ...args) {
        const code = [strs[0]];
        let i = 0;
        while (i < args.length) {
          addCodeArg(code, args[i]);
          code.push(strs[++i]);
        }
        return new _Code(code);
      }
      exports._ = _;
      var plus = new _Code("+");
      function str(strs, ...args) {
        const expr = [safeStringify(strs[0])];
        let i = 0;
        while (i < args.length) {
          expr.push(plus);
          addCodeArg(expr, args[i]);
          expr.push(plus, safeStringify(strs[++i]));
        }
        optimize(expr);
        return new _Code(expr);
      }
      exports.str = str;
      function addCodeArg(code, arg) {
        if (arg instanceof _Code)
          code.push(...arg._items);
        else if (arg instanceof Name)
          code.push(arg);
        else
          code.push(interpolate(arg));
      }
      exports.addCodeArg = addCodeArg;
      function optimize(expr) {
        let i = 1;
        while (i < expr.length - 1) {
          if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== void 0) {
              expr.splice(i - 1, 3, res);
              continue;
            }
            expr[i++] = "+";
          }
          i++;
        }
      }
      function mergeExprItems(a, b) {
        if (b === '""')
          return a;
        if (a === '""')
          return b;
        if (typeof a == "string") {
          if (b instanceof Name || a[a.length - 1] !== '"')
            return;
          if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
          if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
          return;
        }
        if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
          return `"${a}${b.slice(1)}`;
        return;
      }
      function strConcat(c1, c2) {
        return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
      }
      exports.strConcat = strConcat;
      function interpolate(x) {
        return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
      }
      function stringify(x) {
        return new _Code(safeStringify(x));
      }
      exports.stringify = stringify;
      function safeStringify(x) {
        return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      }
      exports.safeStringify = safeStringify;
      function getProperty(key) {
        return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
      }
      exports.getProperty = getProperty;
      function getEsmExportName(key) {
        if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
          return new _Code(`${key}`);
        }
        throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
      }
      exports.getEsmExportName = getEsmExportName;
      function regexpCode(rx) {
        return new _Code(rx.toString());
      }
      exports.regexpCode = regexpCode;
    }
  });

  // node_modules/ajv/dist/compile/codegen/scope.js
  var require_scope = __commonJS({
    "node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
      var code_1 = require_code();
      var ValueError = class extends Error {
        constructor(name) {
          super(`CodeGen: "code" for ${name} not defined`);
          this.value = name.value;
        }
      };
      var UsedValueState;
      (function(UsedValueState2) {
        UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
        UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
      })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
      exports.varKinds = {
        const: new code_1.Name("const"),
        let: new code_1.Name("let"),
        var: new code_1.Name("var")
      };
      var Scope = class {
        constructor({ prefixes, parent } = {}) {
          this._names = {};
          this._prefixes = prefixes;
          this._parent = parent;
        }
        toName(nameOrPrefix) {
          return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
        }
        name(prefix) {
          return new code_1.Name(this._newName(prefix));
        }
        _newName(prefix) {
          const ng = this._names[prefix] || this._nameGroup(prefix);
          return `${prefix}${ng.index++}`;
        }
        _nameGroup(prefix) {
          var _a, _b;
          if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
          }
          return this._names[prefix] = { prefix, index: 0 };
        }
      };
      exports.Scope = Scope;
      var ValueScopeName = class extends code_1.Name {
        constructor(prefix, nameStr) {
          super(nameStr);
          this.prefix = prefix;
        }
        setValue(value, { property, itemIndex }) {
          this.value = value;
          this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
        }
      };
      exports.ValueScopeName = ValueScopeName;
      var line = (0, code_1._)`\n`;
      var ValueScope = class extends Scope {
        constructor(opts) {
          super(opts);
          this._values = {};
          this._scope = opts.scope;
          this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
        }
        get() {
          return this._scope;
        }
        name(prefix) {
          return new ValueScopeName(prefix, this._newName(prefix));
        }
        value(nameOrPrefix, value) {
          var _a;
          if (value.ref === void 0)
            throw new Error("CodeGen: ref must be passed in value");
          const name = this.toName(nameOrPrefix);
          const { prefix } = name;
          const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
          let vs = this._values[prefix];
          if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
              return _name;
          } else {
            vs = this._values[prefix] = /* @__PURE__ */ new Map();
          }
          vs.set(valueKey, name);
          const s = this._scope[prefix] || (this._scope[prefix] = []);
          const itemIndex = s.length;
          s[itemIndex] = value.ref;
          name.setValue(value, { property: prefix, itemIndex });
          return name;
        }
        getValue(prefix, keyOrRef) {
          const vs = this._values[prefix];
          if (!vs)
            return;
          return vs.get(keyOrRef);
        }
        scopeRefs(scopeName, values = this._values) {
          return this._reduceValues(values, (name) => {
            if (name.scopePath === void 0)
              throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._)`${scopeName}${name.scopePath}`;
          });
        }
        scopeCode(values = this._values, usedValues, getCode) {
          return this._reduceValues(values, (name) => {
            if (name.value === void 0)
              throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
          }, usedValues, getCode);
        }
        _reduceValues(values, valueCode, usedValues = {}, getCode) {
          let code = code_1.nil;
          for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
              continue;
            const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
            vs.forEach((name) => {
              if (nameSet.has(name))
                return;
              nameSet.set(name, UsedValueState.Started);
              let c = valueCode(name);
              if (c) {
                const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
              } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
                code = (0, code_1._)`${code}${c}${this.opts._n}`;
              } else {
                throw new ValueError(name);
              }
              nameSet.set(name, UsedValueState.Completed);
            });
          }
          return code;
        }
      };
      exports.ValueScope = ValueScope;
    }
  });

  // node_modules/ajv/dist/compile/codegen/index.js
  var require_codegen = __commonJS({
    "node_modules/ajv/dist/compile/codegen/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
      var code_1 = require_code();
      var scope_1 = require_scope();
      var code_2 = require_code();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return code_2._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return code_2.str;
      } });
      Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
        return code_2.strConcat;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return code_2.nil;
      } });
      Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
        return code_2.getProperty;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return code_2.stringify;
      } });
      Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
        return code_2.regexpCode;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return code_2.Name;
      } });
      var scope_2 = require_scope();
      Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
        return scope_2.Scope;
      } });
      Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
        return scope_2.ValueScope;
      } });
      Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
        return scope_2.ValueScopeName;
      } });
      Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
        return scope_2.varKinds;
      } });
      exports.operators = {
        GT: new code_1._Code(">"),
        GTE: new code_1._Code(">="),
        LT: new code_1._Code("<"),
        LTE: new code_1._Code("<="),
        EQ: new code_1._Code("==="),
        NEQ: new code_1._Code("!=="),
        NOT: new code_1._Code("!"),
        OR: new code_1._Code("||"),
        AND: new code_1._Code("&&"),
        ADD: new code_1._Code("+")
      };
      var Node = class {
        optimizeNodes() {
          return this;
        }
        optimizeNames(_names, _constants) {
          return this;
        }
      };
      var Def = class extends Node {
        constructor(varKind, name, rhs) {
          super();
          this.varKind = varKind;
          this.name = name;
          this.rhs = rhs;
        }
        render({ es5, _n }) {
          const varKind = es5 ? scope_1.varKinds.var : this.varKind;
          const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
          return `${varKind} ${this.name}${rhs};` + _n;
        }
        optimizeNames(names, constants) {
          if (!names[this.name.str])
            return;
          if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
          return this;
        }
        get names() {
          return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
        }
      };
      var Assign = class extends Node {
        constructor(lhs, rhs, sideEffects) {
          super();
          this.lhs = lhs;
          this.rhs = rhs;
          this.sideEffects = sideEffects;
        }
        render({ _n }) {
          return `${this.lhs} = ${this.rhs};` + _n;
        }
        optimizeNames(names, constants) {
          if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
          this.rhs = optimizeExpr(this.rhs, names, constants);
          return this;
        }
        get names() {
          const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
          return addExprNames(names, this.rhs);
        }
      };
      var AssignOp = class extends Assign {
        constructor(lhs, op, rhs, sideEffects) {
          super(lhs, rhs, sideEffects);
          this.op = op;
        }
        render({ _n }) {
          return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
        }
      };
      var Label = class extends Node {
        constructor(label) {
          super();
          this.label = label;
          this.names = {};
        }
        render({ _n }) {
          return `${this.label}:` + _n;
        }
      };
      var Break = class extends Node {
        constructor(label) {
          super();
          this.label = label;
          this.names = {};
        }
        render({ _n }) {
          const label = this.label ? ` ${this.label}` : "";
          return `break${label};` + _n;
        }
      };
      var Throw = class extends Node {
        constructor(error) {
          super();
          this.error = error;
        }
        render({ _n }) {
          return `throw ${this.error};` + _n;
        }
        get names() {
          return this.error.names;
        }
      };
      var AnyCode = class extends Node {
        constructor(code) {
          super();
          this.code = code;
        }
        render({ _n }) {
          return `${this.code};` + _n;
        }
        optimizeNodes() {
          return `${this.code}` ? this : void 0;
        }
        optimizeNames(names, constants) {
          this.code = optimizeExpr(this.code, names, constants);
          return this;
        }
        get names() {
          return this.code instanceof code_1._CodeOrName ? this.code.names : {};
        }
      };
      var ParentNode = class extends Node {
        constructor(nodes = []) {
          super();
          this.nodes = nodes;
        }
        render(opts) {
          return this.nodes.reduce((code, n) => code + n.render(opts), "");
        }
        optimizeNodes() {
          const { nodes } = this;
          let i = nodes.length;
          while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
              nodes.splice(i, 1, ...n);
            else if (n)
              nodes[i] = n;
            else
              nodes.splice(i, 1);
          }
          return nodes.length > 0 ? this : void 0;
        }
        optimizeNames(names, constants) {
          const { nodes } = this;
          let i = nodes.length;
          while (i--) {
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
              continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
          }
          return nodes.length > 0 ? this : void 0;
        }
        get names() {
          return this.nodes.reduce((names, n) => addNames(names, n.names), {});
        }
      };
      var BlockNode = class extends ParentNode {
        render(opts) {
          return "{" + opts._n + super.render(opts) + "}" + opts._n;
        }
      };
      var Root = class extends ParentNode {
      };
      var Else = class extends BlockNode {
      };
      Else.kind = "else";
      var If = class _If extends BlockNode {
        constructor(condition, nodes) {
          super(nodes);
          this.condition = condition;
        }
        render(opts) {
          let code = `if(${this.condition})` + super.render(opts);
          if (this.else)
            code += "else " + this.else.render(opts);
          return code;
        }
        optimizeNodes() {
          super.optimizeNodes();
          const cond = this.condition;
          if (cond === true)
            return this.nodes;
          let e = this.else;
          if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
          }
          if (e) {
            if (cond === false)
              return e instanceof _If ? e : e.nodes;
            if (this.nodes.length)
              return this;
            return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
          }
          if (cond === false || !this.nodes.length)
            return void 0;
          return this;
        }
        optimizeNames(names, constants) {
          var _a;
          this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
          if (!(super.optimizeNames(names, constants) || this.else))
            return;
          this.condition = optimizeExpr(this.condition, names, constants);
          return this;
        }
        get names() {
          const names = super.names;
          addExprNames(names, this.condition);
          if (this.else)
            addNames(names, this.else.names);
          return names;
        }
      };
      If.kind = "if";
      var For = class extends BlockNode {
      };
      For.kind = "for";
      var ForLoop = class extends For {
        constructor(iteration) {
          super();
          this.iteration = iteration;
        }
        render(opts) {
          return `for(${this.iteration})` + super.render(opts);
        }
        optimizeNames(names, constants) {
          if (!super.optimizeNames(names, constants))
            return;
          this.iteration = optimizeExpr(this.iteration, names, constants);
          return this;
        }
        get names() {
          return addNames(super.names, this.iteration.names);
        }
      };
      var ForRange = class extends For {
        constructor(varKind, name, from, to) {
          super();
          this.varKind = varKind;
          this.name = name;
          this.from = from;
          this.to = to;
        }
        render(opts) {
          const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
          const { name, from, to } = this;
          return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
        }
        get names() {
          const names = addExprNames(super.names, this.from);
          return addExprNames(names, this.to);
        }
      };
      var ForIter = class extends For {
        constructor(loop, varKind, name, iterable) {
          super();
          this.loop = loop;
          this.varKind = varKind;
          this.name = name;
          this.iterable = iterable;
        }
        render(opts) {
          return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
        }
        optimizeNames(names, constants) {
          if (!super.optimizeNames(names, constants))
            return;
          this.iterable = optimizeExpr(this.iterable, names, constants);
          return this;
        }
        get names() {
          return addNames(super.names, this.iterable.names);
        }
      };
      var Func = class extends BlockNode {
        constructor(name, args, async) {
          super();
          this.name = name;
          this.args = args;
          this.async = async;
        }
        render(opts) {
          const _async = this.async ? "async " : "";
          return `${_async}function ${this.name}(${this.args})` + super.render(opts);
        }
      };
      Func.kind = "func";
      var Return = class extends ParentNode {
        render(opts) {
          return "return " + super.render(opts);
        }
      };
      Return.kind = "return";
      var Try = class extends BlockNode {
        render(opts) {
          let code = "try" + super.render(opts);
          if (this.catch)
            code += this.catch.render(opts);
          if (this.finally)
            code += this.finally.render(opts);
          return code;
        }
        optimizeNodes() {
          var _a, _b;
          super.optimizeNodes();
          (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
          (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
          return this;
        }
        optimizeNames(names, constants) {
          var _a, _b;
          super.optimizeNames(names, constants);
          (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
          (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
          return this;
        }
        get names() {
          const names = super.names;
          if (this.catch)
            addNames(names, this.catch.names);
          if (this.finally)
            addNames(names, this.finally.names);
          return names;
        }
      };
      var Catch = class extends BlockNode {
        constructor(error) {
          super();
          this.error = error;
        }
        render(opts) {
          return `catch(${this.error})` + super.render(opts);
        }
      };
      Catch.kind = "catch";
      var Finally = class extends BlockNode {
        render(opts) {
          return "finally" + super.render(opts);
        }
      };
      Finally.kind = "finally";
      var CodeGen = class {
        constructor(extScope, opts = {}) {
          this._values = {};
          this._blockStarts = [];
          this._constants = {};
          this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
          this._extScope = extScope;
          this._scope = new scope_1.Scope({ parent: extScope });
          this._nodes = [new Root()];
        }
        toString() {
          return this._root.render(this.opts);
        }
        // returns unique name in the internal scope
        name(prefix) {
          return this._scope.name(prefix);
        }
        // reserves unique name in the external scope
        scopeName(prefix) {
          return this._extScope.name(prefix);
        }
        // reserves unique name in the external scope and assigns value to it
        scopeValue(prefixOrName, value) {
          const name = this._extScope.value(prefixOrName, value);
          const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
          vs.add(name);
          return name;
        }
        getScopeValue(prefix, keyOrRef) {
          return this._extScope.getValue(prefix, keyOrRef);
        }
        // return code that assigns values in the external scope to the names that are used internally
        // (same names that were returned by gen.scopeName or gen.scopeValue)
        scopeRefs(scopeName) {
          return this._extScope.scopeRefs(scopeName, this._values);
        }
        scopeCode() {
          return this._extScope.scopeCode(this._values);
        }
        _def(varKind, nameOrPrefix, rhs, constant) {
          const name = this._scope.toName(nameOrPrefix);
          if (rhs !== void 0 && constant)
            this._constants[name.str] = rhs;
          this._leafNode(new Def(varKind, name, rhs));
          return name;
        }
        // `const` declaration (`var` in es5 mode)
        const(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
        }
        // `let` declaration with optional assignment (`var` in es5 mode)
        let(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
        }
        // `var` declaration with optional assignment
        var(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
        }
        // assignment code
        assign(lhs, rhs, sideEffects) {
          return this._leafNode(new Assign(lhs, rhs, sideEffects));
        }
        // `+=` code
        add(lhs, rhs) {
          return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
        }
        // appends passed SafeExpr to code or executes Block
        code(c) {
          if (typeof c == "function")
            c();
          else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
          return this;
        }
        // returns code for object literal for the passed argument list of key-value pairs
        object(...keyValues) {
          const code = ["{"];
          for (const [key, value] of keyValues) {
            if (code.length > 1)
              code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
              code.push(":");
              (0, code_1.addCodeArg)(code, value);
            }
          }
          code.push("}");
          return new code_1._Code(code);
        }
        // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
        if(condition, thenBody, elseBody) {
          this._blockNode(new If(condition));
          if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
          } else if (thenBody) {
            this.code(thenBody).endIf();
          } else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
          }
          return this;
        }
        // `else if` clause - invalid without `if` or after `else` clauses
        elseIf(condition) {
          return this._elseNode(new If(condition));
        }
        // `else` clause - only valid after `if` or `else if` clauses
        else() {
          return this._elseNode(new Else());
        }
        // end `if` statement (needed if gen.if was used only with condition)
        endIf() {
          return this._endBlockNode(If, Else);
        }
        _for(node, forBody) {
          this._blockNode(node);
          if (forBody)
            this.code(forBody).endFor();
          return this;
        }
        // a generic `for` clause (or statement if `forBody` is passed)
        for(iteration, forBody) {
          return this._for(new ForLoop(iteration), forBody);
        }
        // `for` statement for a range of values
        forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
          const name = this._scope.toName(nameOrPrefix);
          return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
        }
        // `for-of` statement (in es5 mode replace with a normal for loop)
        forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
          const name = this._scope.toName(nameOrPrefix);
          if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
              this.var(name, (0, code_1._)`${arr}[${i}]`);
              forBody(name);
            });
          }
          return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
        }
        // `for-in` statement.
        // With option `ownProperties` replaced with a `for-of` loop for object keys
        forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
          if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
          }
          const name = this._scope.toName(nameOrPrefix);
          return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
        }
        // end `for` loop
        endFor() {
          return this._endBlockNode(For);
        }
        // `label` statement
        label(label) {
          return this._leafNode(new Label(label));
        }
        // `break` statement
        break(label) {
          return this._leafNode(new Break(label));
        }
        // `return` statement
        return(value) {
          const node = new Return();
          this._blockNode(node);
          this.code(value);
          if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
          return this._endBlockNode(Return);
        }
        // `try` statement
        try(tryBody, catchCode, finallyCode) {
          if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
          const node = new Try();
          this._blockNode(node);
          this.code(tryBody);
          if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
          }
          if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
          }
          return this._endBlockNode(Catch, Finally);
        }
        // `throw` statement
        throw(error) {
          return this._leafNode(new Throw(error));
        }
        // start self-balancing block
        block(body, nodeCount) {
          this._blockStarts.push(this._nodes.length);
          if (body)
            this.code(body).endBlock(nodeCount);
          return this;
        }
        // end the current self-balancing block
        endBlock(nodeCount) {
          const len = this._blockStarts.pop();
          if (len === void 0)
            throw new Error("CodeGen: not in self-balancing block");
          const toClose = this._nodes.length - len;
          if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
          }
          this._nodes.length = len;
          return this;
        }
        // `function` heading (or definition if funcBody is passed)
        func(name, args = code_1.nil, async, funcBody) {
          this._blockNode(new Func(name, args, async));
          if (funcBody)
            this.code(funcBody).endFunc();
          return this;
        }
        // end function definition
        endFunc() {
          return this._endBlockNode(Func);
        }
        optimize(n = 1) {
          while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
          }
        }
        _leafNode(node) {
          this._currNode.nodes.push(node);
          return this;
        }
        _blockNode(node) {
          this._currNode.nodes.push(node);
          this._nodes.push(node);
        }
        _endBlockNode(N1, N2) {
          const n = this._currNode;
          if (n instanceof N1 || N2 && n instanceof N2) {
            this._nodes.pop();
            return this;
          }
          throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
        }
        _elseNode(node) {
          const n = this._currNode;
          if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
          }
          this._currNode = n.else = node;
          return this;
        }
        get _root() {
          return this._nodes[0];
        }
        get _currNode() {
          const ns = this._nodes;
          return ns[ns.length - 1];
        }
        set _currNode(node) {
          const ns = this._nodes;
          ns[ns.length - 1] = node;
        }
      };
      exports.CodeGen = CodeGen;
      function addNames(names, from) {
        for (const n in from)
          names[n] = (names[n] || 0) + (from[n] || 0);
        return names;
      }
      function addExprNames(names, from) {
        return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
      }
      function optimizeExpr(expr, names, constants) {
        if (expr instanceof code_1.Name)
          return replaceName(expr);
        if (!canOptimize(expr))
          return expr;
        return new code_1._Code(expr._items.reduce((items, c) => {
          if (c instanceof code_1.Name)
            c = replaceName(c);
          if (c instanceof code_1._Code)
            items.push(...c._items);
          else
            items.push(c);
          return items;
        }, []));
        function replaceName(n) {
          const c = constants[n.str];
          if (c === void 0 || names[n.str] !== 1)
            return n;
          delete names[n.str];
          return c;
        }
        function canOptimize(e) {
          return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
        }
      }
      function subtractNames(names, from) {
        for (const n in from)
          names[n] = (names[n] || 0) - (from[n] || 0);
      }
      function not(x) {
        return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
      }
      exports.not = not;
      var andCode = mappend(exports.operators.AND);
      function and(...args) {
        return args.reduce(andCode);
      }
      exports.and = and;
      var orCode = mappend(exports.operators.OR);
      function or(...args) {
        return args.reduce(orCode);
      }
      exports.or = or;
      function mappend(op) {
        return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
      }
      function par(x) {
        return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
      }
    }
  });

  // node_modules/ajv/dist/compile/util.js
  var require_util = __commonJS({
    "node_modules/ajv/dist/compile/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
      var codegen_1 = require_codegen();
      var code_1 = require_code();
      function toHash(arr) {
        const hash = {};
        for (const item of arr)
          hash[item] = true;
        return hash;
      }
      exports.toHash = toHash;
      function alwaysValidSchema(it, schema) {
        if (typeof schema == "boolean")
          return schema;
        if (Object.keys(schema).length === 0)
          return true;
        checkUnknownRules(it, schema);
        return !schemaHasRules(schema, it.self.RULES.all);
      }
      exports.alwaysValidSchema = alwaysValidSchema;
      function checkUnknownRules(it, schema = it.schema) {
        const { opts, self: self2 } = it;
        if (!opts.strictSchema)
          return;
        if (typeof schema === "boolean")
          return;
        const rules = self2.RULES.keywords;
        for (const key in schema) {
          if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
        }
      }
      exports.checkUnknownRules = checkUnknownRules;
      function schemaHasRules(schema, rules) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (rules[key])
            return true;
        return false;
      }
      exports.schemaHasRules = schemaHasRules;
      function schemaHasRulesButRef(schema, RULES) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (key !== "$ref" && RULES.all[key])
            return true;
        return false;
      }
      exports.schemaHasRulesButRef = schemaHasRulesButRef;
      function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
        if (!$data) {
          if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
          if (typeof schema == "string")
            return (0, codegen_1._)`${schema}`;
        }
        return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
      }
      exports.schemaRefOrVal = schemaRefOrVal;
      function unescapeFragment(str) {
        return unescapeJsonPointer(decodeURIComponent(str));
      }
      exports.unescapeFragment = unescapeFragment;
      function escapeFragment(str) {
        return encodeURIComponent(escapeJsonPointer(str));
      }
      exports.escapeFragment = escapeFragment;
      function escapeJsonPointer(str) {
        if (typeof str == "number")
          return `${str}`;
        return str.replace(/~/g, "~0").replace(/\//g, "~1");
      }
      exports.escapeJsonPointer = escapeJsonPointer;
      function unescapeJsonPointer(str) {
        return str.replace(/~1/g, "/").replace(/~0/g, "~");
      }
      exports.unescapeJsonPointer = unescapeJsonPointer;
      function eachItem(xs, f) {
        if (Array.isArray(xs)) {
          for (const x of xs)
            f(x);
        } else {
          f(xs);
        }
      }
      exports.eachItem = eachItem;
      function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
        return (gen, from, to, toName) => {
          const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
          return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
        };
      }
      exports.mergeEvaluated = {
        props: makeMergeEvaluated({
          mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
          }),
          mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
            if (from === true) {
              gen.assign(to, true);
            } else {
              gen.assign(to, (0, codegen_1._)`${to} || {}`);
              setEvaluated(gen, to, from);
            }
          }),
          mergeValues: (from, to) => from === true ? true : { ...from, ...to },
          resultToName: evaluatedPropsToName
        }),
        items: makeMergeEvaluated({
          mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
          mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
          mergeValues: (from, to) => from === true ? true : Math.max(from, to),
          resultToName: (gen, items) => gen.var("items", items)
        })
      };
      function evaluatedPropsToName(gen, ps) {
        if (ps === true)
          return gen.var("props", true);
        const props = gen.var("props", (0, codegen_1._)`{}`);
        if (ps !== void 0)
          setEvaluated(gen, props, ps);
        return props;
      }
      exports.evaluatedPropsToName = evaluatedPropsToName;
      function setEvaluated(gen, props, ps) {
        Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
      }
      exports.setEvaluated = setEvaluated;
      var snippets = {};
      function useFunc(gen, f) {
        return gen.scopeValue("func", {
          ref: f,
          code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
        });
      }
      exports.useFunc = useFunc;
      var Type;
      (function(Type2) {
        Type2[Type2["Num"] = 0] = "Num";
        Type2[Type2["Str"] = 1] = "Str";
      })(Type || (exports.Type = Type = {}));
      function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
        if (dataProp instanceof codegen_1.Name) {
          const isNumber = dataPropType === Type.Num;
          return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
        }
        return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
      }
      exports.getErrorPath = getErrorPath;
      function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
        if (!mode)
          return;
        msg = `strict mode: ${msg}`;
        if (mode === true)
          throw new Error(msg);
        it.self.logger.warn(msg);
      }
      exports.checkStrictMode = checkStrictMode;
    }
  });

  // node_modules/ajv/dist/compile/names.js
  var require_names = __commonJS({
    "node_modules/ajv/dist/compile/names.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var names = {
        // validation function arguments
        data: new codegen_1.Name("data"),
        // data passed to validation function
        // args passed from referencing schema
        valCxt: new codegen_1.Name("valCxt"),
        // validation/data context - should not be used directly, it is destructured to the names below
        instancePath: new codegen_1.Name("instancePath"),
        parentData: new codegen_1.Name("parentData"),
        parentDataProperty: new codegen_1.Name("parentDataProperty"),
        rootData: new codegen_1.Name("rootData"),
        // root data - same as the data passed to the first/top validation function
        dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
        // used to support recursiveRef and dynamicRef
        // function scoped variables
        vErrors: new codegen_1.Name("vErrors"),
        // null or array of validation errors
        errors: new codegen_1.Name("errors"),
        // counter of validation errors
        this: new codegen_1.Name("this"),
        // "globals"
        self: new codegen_1.Name("self"),
        scope: new codegen_1.Name("scope"),
        // JTD serialize/parse name for JSON string and position
        json: new codegen_1.Name("json"),
        jsonPos: new codegen_1.Name("jsonPos"),
        jsonLen: new codegen_1.Name("jsonLen"),
        jsonPart: new codegen_1.Name("jsonPart")
      };
      exports.default = names;
    }
  });

  // node_modules/ajv/dist/compile/errors.js
  var require_errors2 = __commonJS({
    "node_modules/ajv/dist/compile/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var names_1 = require_names();
      exports.keywordError = {
        message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
      };
      exports.keyword$DataError = {
        message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
      };
      function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
          addError(gen, errObj);
        } else {
          returnErrors(it, (0, codegen_1._)`[${errObj}]`);
        }
      }
      exports.reportError = reportError;
      function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        addError(gen, errObj);
        if (!(compositeRule || allErrors)) {
          returnErrors(it, names_1.default.vErrors);
        }
      }
      exports.reportExtraError = reportExtraError;
      function resetErrorsCount(gen, errsCount) {
        gen.assign(names_1.default.errors, errsCount);
        gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
      }
      exports.resetErrorsCount = resetErrorsCount;
      function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
        if (errsCount === void 0)
          throw new Error("ajv implementation error");
        const err = gen.name("err");
        gen.forRange("i", errsCount, names_1.default.errors, (i) => {
          gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
          gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
          gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
          if (it.opts.verbose) {
            gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._)`${err}.data`, data);
          }
        });
      }
      exports.extendErrors = extendErrors;
      function addError(gen, errObj) {
        const err = gen.const("err", errObj);
        gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
        gen.code((0, codegen_1._)`${names_1.default.errors}++`);
      }
      function returnErrors(it, errs) {
        const { gen, validateName, schemaEnv } = it;
        if (schemaEnv.$async) {
          gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
          gen.return(false);
        }
      }
      var E = {
        keyword: new codegen_1.Name("keyword"),
        schemaPath: new codegen_1.Name("schemaPath"),
        // also used in JTD errors
        params: new codegen_1.Name("params"),
        propertyName: new codegen_1.Name("propertyName"),
        message: new codegen_1.Name("message"),
        schema: new codegen_1.Name("schema"),
        parentSchema: new codegen_1.Name("parentSchema")
      };
      function errorObjectCode(cxt, error, errorPaths) {
        const { createErrors } = cxt.it;
        if (createErrors === false)
          return (0, codegen_1._)`{}`;
        return errorObject(cxt, error, errorPaths);
      }
      function errorObject(cxt, error, errorPaths = {}) {
        const { gen, it } = cxt;
        const keyValues = [
          errorInstancePath(it, errorPaths),
          errorSchemaPath(cxt, errorPaths)
        ];
        extraErrorProps(cxt, error, keyValues);
        return gen.object(...keyValues);
      }
      function errorInstancePath({ errorPath }, { instancePath }) {
        const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
        return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
      }
      function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
        let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
        if (schemaPath) {
          schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
        }
        return [E.schemaPath, schPath];
      }
      function extraErrorProps(cxt, { params, message }, keyValues) {
        const { keyword, data, schemaValue, it } = cxt;
        const { opts, propertyName, topSchemaRef, schemaPath } = it;
        keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
        if (opts.messages) {
          keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
        }
        if (opts.verbose) {
          keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
        }
        if (propertyName)
          keyValues.push([E.propertyName, propertyName]);
      }
    }
  });

  // node_modules/ajv/dist/compile/validate/boolSchema.js
  var require_boolSchema = __commonJS({
    "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
      var errors_1 = require_errors2();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var boolError = {
        message: "boolean schema is false"
      };
      function topBoolOrEmptySchema(it) {
        const { gen, schema, validateName } = it;
        if (schema === false) {
          falseSchemaError(it, false);
        } else if (typeof schema == "object" && schema.$async === true) {
          gen.return(names_1.default.data);
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, null);
          gen.return(true);
        }
      }
      exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
      function boolOrEmptySchema(it, valid) {
        const { gen, schema } = it;
        if (schema === false) {
          gen.var(valid, false);
          falseSchemaError(it);
        } else {
          gen.var(valid, true);
        }
      }
      exports.boolOrEmptySchema = boolOrEmptySchema;
      function falseSchemaError(it, overrideAllErrors) {
        const { gen, data } = it;
        const cxt = {
          gen,
          keyword: "false schema",
          data,
          schema: false,
          schemaCode: false,
          schemaValue: false,
          params: {},
          it
        };
        (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
      }
    }
  });

  // node_modules/ajv/dist/compile/rules.js
  var require_rules = __commonJS({
    "node_modules/ajv/dist/compile/rules.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRules = exports.isJSONType = void 0;
      var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
      var jsonTypes = new Set(_jsonTypes);
      function isJSONType(x) {
        return typeof x == "string" && jsonTypes.has(x);
      }
      exports.isJSONType = isJSONType;
      function getRules() {
        const groups = {
          number: { type: "number", rules: [] },
          string: { type: "string", rules: [] },
          array: { type: "array", rules: [] },
          object: { type: "object", rules: [] }
        };
        return {
          types: { ...groups, integer: true, boolean: true, null: true },
          rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
          post: { rules: [] },
          all: {},
          keywords: {}
        };
      }
      exports.getRules = getRules;
    }
  });

  // node_modules/ajv/dist/compile/validate/applicability.js
  var require_applicability = __commonJS({
    "node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
      function schemaHasRulesForType({ schema, self: self2 }, type) {
        const group = self2.RULES.types[type];
        return group && group !== true && shouldUseGroup(schema, group);
      }
      exports.schemaHasRulesForType = schemaHasRulesForType;
      function shouldUseGroup(schema, group) {
        return group.rules.some((rule) => shouldUseRule(schema, rule));
      }
      exports.shouldUseGroup = shouldUseGroup;
      function shouldUseRule(schema, rule) {
        var _a;
        return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
      }
      exports.shouldUseRule = shouldUseRule;
    }
  });

  // node_modules/ajv/dist/compile/validate/dataType.js
  var require_dataType = __commonJS({
    "node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
      var rules_1 = require_rules();
      var applicability_1 = require_applicability();
      var errors_1 = require_errors2();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var DataType;
      (function(DataType2) {
        DataType2[DataType2["Correct"] = 0] = "Correct";
        DataType2[DataType2["Wrong"] = 1] = "Wrong";
      })(DataType || (exports.DataType = DataType = {}));
      function getSchemaTypes(schema) {
        const types = getJSONTypes(schema.type);
        const hasNull = types.includes("null");
        if (hasNull) {
          if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
        } else {
          if (!types.length && schema.nullable !== void 0) {
            throw new Error('"nullable" cannot be used without "type"');
          }
          if (schema.nullable === true)
            types.push("null");
        }
        return types;
      }
      exports.getSchemaTypes = getSchemaTypes;
      function getJSONTypes(ts) {
        const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
        if (types.every(rules_1.isJSONType))
          return types;
        throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
      }
      exports.getJSONTypes = getJSONTypes;
      function coerceAndCheckDataType(it, types) {
        const { gen, data, opts } = it;
        const coerceTo = coerceToTypes(types, opts.coerceTypes);
        const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
        if (checkTypes) {
          const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
          gen.if(wrongType, () => {
            if (coerceTo.length)
              coerceData(it, types, coerceTo);
            else
              reportTypeError(it);
          });
        }
        return checkTypes;
      }
      exports.coerceAndCheckDataType = coerceAndCheckDataType;
      var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
      function coerceToTypes(types, coerceTypes) {
        return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
      }
      function coerceData(it, types, coerceTo) {
        const { gen, data, opts } = it;
        const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
        const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
        if (opts.coerceTypes === "array") {
          gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
        }
        gen.if((0, codegen_1._)`${coerced} !== undefined`);
        for (const t of coerceTo) {
          if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
            coerceSpecificType(t);
          }
        }
        gen.else();
        reportTypeError(it);
        gen.endIf();
        gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
          gen.assign(data, coerced);
          assignParentData(it, coerced);
        });
        function coerceSpecificType(t) {
          switch (t) {
            case "string":
              gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
              return;
            case "number":
              gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
              return;
            case "integer":
              gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
              return;
            case "boolean":
              gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
              return;
            case "null":
              gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
              gen.assign(coerced, null);
              return;
            case "array":
              gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
          }
        }
      }
      function assignParentData({ gen, parentData, parentDataProperty }, expr) {
        gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
      }
      function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
        const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
        let cond;
        switch (dataType) {
          case "null":
            return (0, codegen_1._)`${data} ${EQ} null`;
          case "array":
            cond = (0, codegen_1._)`Array.isArray(${data})`;
            break;
          case "object":
            cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
          case "integer":
            cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
            break;
          case "number":
            cond = numCond();
            break;
          default:
            return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
        }
        return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
        function numCond(_cond = codegen_1.nil) {
          return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
        }
      }
      exports.checkDataType = checkDataType;
      function checkDataTypes(dataTypes, data, strictNums, correct) {
        if (dataTypes.length === 1) {
          return checkDataType(dataTypes[0], data, strictNums, correct);
        }
        let cond;
        const types = (0, util_1.toHash)(dataTypes);
        if (types.array && types.object) {
          const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
          cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
          delete types.null;
          delete types.array;
          delete types.object;
        } else {
          cond = codegen_1.nil;
        }
        if (types.number)
          delete types.integer;
        for (const t in types)
          cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
        return cond;
      }
      exports.checkDataTypes = checkDataTypes;
      var typeError = {
        message: ({ schema }) => `must be ${schema}`,
        params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
      };
      function reportTypeError(it) {
        const cxt = getTypeErrorContext(it);
        (0, errors_1.reportError)(cxt, typeError);
      }
      exports.reportTypeError = reportTypeError;
      function getTypeErrorContext(it) {
        const { gen, data, schema } = it;
        const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
        return {
          gen,
          keyword: "type",
          data,
          schema: schema.type,
          schemaCode,
          schemaValue: schemaCode,
          parentSchema: schema,
          params: {},
          it
        };
      }
    }
  });

  // node_modules/ajv/dist/compile/validate/defaults.js
  var require_defaults = __commonJS({
    "node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.assignDefaults = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      function assignDefaults(it, ty) {
        const { properties, items } = it.schema;
        if (ty === "object" && properties) {
          for (const key in properties) {
            assignDefault(it, key, properties[key].default);
          }
        } else if (ty === "array" && Array.isArray(items)) {
          items.forEach((sch, i) => assignDefault(it, i, sch.default));
        }
      }
      exports.assignDefaults = assignDefaults;
      function assignDefault(it, prop, defaultValue) {
        const { gen, compositeRule, data, opts } = it;
        if (defaultValue === void 0)
          return;
        const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
        if (compositeRule) {
          (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
          return;
        }
        let condition = (0, codegen_1._)`${childData} === undefined`;
        if (opts.useDefaults === "empty") {
          condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
        }
        gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
      }
    }
  });

  // node_modules/ajv/dist/vocabularies/code.js
  var require_code2 = __commonJS({
    "node_modules/ajv/dist/vocabularies/code.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var names_1 = require_names();
      var util_2 = require_util();
      function checkReportMissingProp(cxt, prop) {
        const { gen, data, it } = cxt;
        gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
          cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
          cxt.error();
        });
      }
      exports.checkReportMissingProp = checkReportMissingProp;
      function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
        return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
      }
      exports.checkMissingProp = checkMissingProp;
      function reportMissingProp(cxt, missing) {
        cxt.setParams({ missingProperty: missing }, true);
        cxt.error();
      }
      exports.reportMissingProp = reportMissingProp;
      function hasPropFunc(gen) {
        return gen.scopeValue("func", {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          ref: Object.prototype.hasOwnProperty,
          code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
        });
      }
      exports.hasPropFunc = hasPropFunc;
      function isOwnProperty(gen, data, property) {
        return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
      }
      exports.isOwnProperty = isOwnProperty;
      function propertyInData(gen, data, property, ownProperties) {
        const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
        return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
      }
      exports.propertyInData = propertyInData;
      function noPropertyInData(gen, data, property, ownProperties) {
        const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
        return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
      }
      exports.noPropertyInData = noPropertyInData;
      function allSchemaProperties(schemaMap) {
        return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
      }
      exports.allSchemaProperties = allSchemaProperties;
      function schemaProperties(it, schemaMap) {
        return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
      }
      exports.schemaProperties = schemaProperties;
      function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
        const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
        const valCxt = [
          [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
          [names_1.default.parentData, it.parentData],
          [names_1.default.parentDataProperty, it.parentDataProperty],
          [names_1.default.rootData, names_1.default.rootData]
        ];
        if (it.opts.dynamicRef)
          valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
        const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
        return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
      }
      exports.callValidateCode = callValidateCode;
      var newRegExp = (0, codegen_1._)`new RegExp`;
      function usePattern({ gen, it: { opts } }, pattern) {
        const u = opts.unicodeRegExp ? "u" : "";
        const { regExp } = opts.code;
        const rx = regExp(pattern, u);
        return gen.scopeValue("pattern", {
          key: rx.toString(),
          ref: rx,
          code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
        });
      }
      exports.usePattern = usePattern;
      function validateArray(cxt) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        if (it.allErrors) {
          const validArr = gen.let("valid", true);
          validateItems(() => gen.assign(validArr, false));
          return validArr;
        }
        gen.var(valid, true);
        validateItems(() => gen.break());
        return valid;
        function validateItems(notValid) {
          const len = gen.const("len", (0, codegen_1._)`${data}.length`);
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword,
              dataProp: i,
              dataPropType: util_1.Type.Num
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
          });
        }
      }
      exports.validateArray = validateArray;
      function validateUnion(cxt) {
        const { gen, schema, keyword, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
        if (alwaysValid && !it.opts.unevaluated)
          return;
        const valid = gen.let("valid", false);
        const schValid = gen.name("_valid");
        gen.block(() => schema.forEach((_sch, i) => {
          const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true
          }, schValid);
          gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
          const merged = cxt.mergeValidEvaluated(schCxt, schValid);
          if (!merged)
            gen.if((0, codegen_1.not)(valid));
        }));
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
      }
      exports.validateUnion = validateUnion;
    }
  });

  // node_modules/ajv/dist/compile/validate/keyword.js
  var require_keyword = __commonJS({
    "node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var code_1 = require_code2();
      var errors_1 = require_errors2();
      function macroKeywordCode(cxt, def) {
        const { gen, keyword, schema, parentSchema, it } = cxt;
        const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
        const schemaRef = useKeyword(gen, keyword, macroSchema);
        if (it.opts.validateSchema !== false)
          it.self.validateSchema(macroSchema, true);
        const valid = gen.name("valid");
        cxt.subschema({
          schema: macroSchema,
          schemaPath: codegen_1.nil,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`,
          topSchemaRef: schemaRef,
          compositeRule: true
        }, valid);
        cxt.pass(valid, () => cxt.error(true));
      }
      exports.macroKeywordCode = macroKeywordCode;
      function funcKeywordCode(cxt, def) {
        var _a;
        const { gen, keyword, schema, parentSchema, $data, it } = cxt;
        checkAsyncKeyword(it, def);
        const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
        const validateRef = useKeyword(gen, keyword, validate);
        const valid = gen.let("valid");
        cxt.block$data(valid, validateKeyword);
        cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
        function validateKeyword() {
          if (def.errors === false) {
            assignValid();
            if (def.modifying)
              modifyData(cxt);
            reportErrs(() => cxt.error());
          } else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
              modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
          }
        }
        function validateAsync() {
          const ruleErrs = gen.let("ruleErrs", null);
          gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
          return ruleErrs;
        }
        function validateSync() {
          const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
          gen.assign(validateErrs, null);
          assignValid(codegen_1.nil);
          return validateErrs;
        }
        function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
          const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
          const passSchema = !("compile" in def && !$data || def.schema === false);
          gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
        }
        function reportErrs(errors) {
          var _a2;
          gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
        }
      }
      exports.funcKeywordCode = funcKeywordCode;
      function modifyData(cxt) {
        const { gen, data, it } = cxt;
        gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
      }
      function addErrs(cxt, errs) {
        const { gen } = cxt;
        gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
          gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
          (0, errors_1.extendErrors)(cxt);
        }, () => cxt.error());
      }
      function checkAsyncKeyword({ schemaEnv }, def) {
        if (def.async && !schemaEnv.$async)
          throw new Error("async keyword in sync schema");
      }
      function useKeyword(gen, keyword, result) {
        if (result === void 0)
          throw new Error(`keyword "${keyword}" failed to compile`);
        return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
      }
      function validSchemaType(schema, schemaType, allowUndefined = false) {
        return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
      }
      exports.validSchemaType = validSchemaType;
      function validateKeywordUsage({ schema, opts, self: self2, errSchemaPath }, def, keyword) {
        if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
          throw new Error("ajv implementation error");
        }
        const deps = def.dependencies;
        if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
          throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
        }
        if (def.validateSchema) {
          const valid = def.validateSchema(schema[keyword]);
          if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
              self2.logger.error(msg);
            else
              throw new Error(msg);
          }
        }
      }
      exports.validateKeywordUsage = validateKeywordUsage;
    }
  });

  // node_modules/ajv/dist/compile/validate/subschema.js
  var require_subschema = __commonJS({
    "node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
        if (keyword !== void 0 && schema !== void 0) {
          throw new Error('both "keyword" and "schema" passed, only one allowed');
        }
        if (keyword !== void 0) {
          const sch = it.schema[keyword];
          return schemaProp === void 0 ? {
            schema: sch,
            schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
            errSchemaPath: `${it.errSchemaPath}/${keyword}`
          } : {
            schema: sch[schemaProp],
            schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
            errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
          };
        }
        if (schema !== void 0) {
          if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
          }
          return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath
          };
        }
        throw new Error('either "keyword" or "schema" must be passed');
      }
      exports.getSubschema = getSubschema;
      function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
        if (data !== void 0 && dataProp !== void 0) {
          throw new Error('both "data" and "dataProp" passed, only one allowed');
        }
        const { gen } = it;
        if (dataProp !== void 0) {
          const { errorPath, dataPathArr, opts } = it;
          const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
          dataContextProps(nextData);
          subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
          subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
          subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
        }
        if (data !== void 0) {
          const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
          dataContextProps(nextData);
          if (propertyName !== void 0)
            subschema.propertyName = propertyName;
        }
        if (dataTypes)
          subschema.dataTypes = dataTypes;
        function dataContextProps(_nextData) {
          subschema.data = _nextData;
          subschema.dataLevel = it.dataLevel + 1;
          subschema.dataTypes = [];
          it.definedProperties = /* @__PURE__ */ new Set();
          subschema.parentData = it.data;
          subschema.dataNames = [...it.dataNames, _nextData];
        }
      }
      exports.extendSubschemaData = extendSubschemaData;
      function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
        if (compositeRule !== void 0)
          subschema.compositeRule = compositeRule;
        if (createErrors !== void 0)
          subschema.createErrors = createErrors;
        if (allErrors !== void 0)
          subschema.allErrors = allErrors;
        subschema.jtdDiscriminator = jtdDiscriminator;
        subschema.jtdMetadata = jtdMetadata;
      }
      exports.extendSubschemaMode = extendSubschemaMode;
    }
  });

  // node_modules/fast-deep-equal/index.js
  var require_fast_deep_equal = __commonJS({
    "node_modules/fast-deep-equal/index.js"(exports, module) {
      "use strict";
      module.exports = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == "object" && typeof b == "object") {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;
          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0; )
              if (!equal(a[i], b[i])) return false;
            return true;
          }
          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0; ) {
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
          }
          return true;
        }
        return a !== a && b !== b;
      };
    }
  });

  // node_modules/json-schema-traverse/index.js
  var require_json_schema_traverse = __commonJS({
    "node_modules/json-schema-traverse/index.js"(exports, module) {
      "use strict";
      var traverse = module.exports = function(schema, opts, cb) {
        if (typeof opts == "function") {
          cb = opts;
          opts = {};
        }
        cb = opts.cb || cb;
        var pre = typeof cb == "function" ? cb : cb.pre || function() {
        };
        var post = cb.post || function() {
        };
        _traverse(opts, pre, post, schema, "", schema);
      };
      traverse.keywords = {
        additionalItems: true,
        items: true,
        contains: true,
        additionalProperties: true,
        propertyNames: true,
        not: true,
        if: true,
        then: true,
        else: true
      };
      traverse.arrayKeywords = {
        items: true,
        allOf: true,
        anyOf: true,
        oneOf: true
      };
      traverse.propsKeywords = {
        $defs: true,
        definitions: true,
        properties: true,
        patternProperties: true,
        dependencies: true
      };
      traverse.skipKeywords = {
        default: true,
        enum: true,
        const: true,
        required: true,
        maximum: true,
        minimum: true,
        exclusiveMaximum: true,
        exclusiveMinimum: true,
        multipleOf: true,
        maxLength: true,
        minLength: true,
        pattern: true,
        format: true,
        maxItems: true,
        minItems: true,
        uniqueItems: true,
        maxProperties: true,
        minProperties: true
      };
      function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
        if (schema && typeof schema == "object" && !Array.isArray(schema)) {
          pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
          for (var key in schema) {
            var sch = schema[key];
            if (Array.isArray(sch)) {
              if (key in traverse.arrayKeywords) {
                for (var i = 0; i < sch.length; i++)
                  _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
              }
            } else if (key in traverse.propsKeywords) {
              if (sch && typeof sch == "object") {
                for (var prop in sch)
                  _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
              }
            } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
              _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
            }
          }
          post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        }
      }
      function escapeJsonPtr(str) {
        return str.replace(/~/g, "~0").replace(/\//g, "~1");
      }
    }
  });

  // node_modules/ajv/dist/compile/resolve.js
  var require_resolve = __commonJS({
    "node_modules/ajv/dist/compile/resolve.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
      var util_1 = require_util();
      var equal = require_fast_deep_equal();
      var traverse = require_json_schema_traverse();
      var SIMPLE_INLINED = /* @__PURE__ */ new Set([
        "type",
        "format",
        "pattern",
        "maxLength",
        "minLength",
        "maxProperties",
        "minProperties",
        "maxItems",
        "minItems",
        "maximum",
        "minimum",
        "uniqueItems",
        "multipleOf",
        "required",
        "enum",
        "const"
      ]);
      function inlineRef(schema, limit = true) {
        if (typeof schema == "boolean")
          return true;
        if (limit === true)
          return !hasRef(schema);
        if (!limit)
          return false;
        return countKeys(schema) <= limit;
      }
      exports.inlineRef = inlineRef;
      var REF_KEYWORDS = /* @__PURE__ */ new Set([
        "$ref",
        "$recursiveRef",
        "$recursiveAnchor",
        "$dynamicRef",
        "$dynamicAnchor"
      ]);
      function hasRef(schema) {
        for (const key in schema) {
          if (REF_KEYWORDS.has(key))
            return true;
          const sch = schema[key];
          if (Array.isArray(sch) && sch.some(hasRef))
            return true;
          if (typeof sch == "object" && hasRef(sch))
            return true;
        }
        return false;
      }
      function countKeys(schema) {
        let count = 0;
        for (const key in schema) {
          if (key === "$ref")
            return Infinity;
          count++;
          if (SIMPLE_INLINED.has(key))
            continue;
          if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
          }
          if (count === Infinity)
            return Infinity;
        }
        return count;
      }
      function getFullPath(resolver, id = "", normalize) {
        if (normalize !== false)
          id = normalizeId(id);
        const p = resolver.parse(id);
        return _getFullPath(resolver, p);
      }
      exports.getFullPath = getFullPath;
      function _getFullPath(resolver, p) {
        const serialized = resolver.serialize(p);
        return serialized.split("#")[0] + "#";
      }
      exports._getFullPath = _getFullPath;
      var TRAILING_SLASH_HASH = /#\/?$/;
      function normalizeId(id) {
        return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
      }
      exports.normalizeId = normalizeId;
      function resolveUrl(resolver, baseId, id) {
        id = normalizeId(id);
        return resolver.resolve(baseId, id);
      }
      exports.resolveUrl = resolveUrl;
      var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
      function getSchemaRefs(schema, baseId) {
        if (typeof schema == "boolean")
          return {};
        const { schemaId, uriResolver } = this.opts;
        const schId = normalizeId(schema[schemaId] || baseId);
        const baseIds = { "": schId };
        const pathPrefix = getFullPath(uriResolver, schId, false);
        const localRefs = {};
        const schemaRefs = /* @__PURE__ */ new Set();
        traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
          if (parentJsonPtr === void 0)
            return;
          const fullPath = pathPrefix + jsonPtr;
          let innerBaseId = baseIds[parentJsonPtr];
          if (typeof sch[schemaId] == "string")
            innerBaseId = addRef.call(this, sch[schemaId]);
          addAnchor.call(this, sch.$anchor);
          addAnchor.call(this, sch.$dynamicAnchor);
          baseIds[jsonPtr] = innerBaseId;
          function addRef(ref) {
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
            if (schemaRefs.has(ref))
              throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
              schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
              checkAmbiguosRef(sch, schOrRef.schema, ref);
            } else if (ref !== normalizeId(fullPath)) {
              if (ref[0] === "#") {
                checkAmbiguosRef(sch, localRefs[ref], ref);
                localRefs[ref] = sch;
              } else {
                this.refs[ref] = fullPath;
              }
            }
            return ref;
          }
          function addAnchor(anchor) {
            if (typeof anchor == "string") {
              if (!ANCHOR.test(anchor))
                throw new Error(`invalid anchor "${anchor}"`);
              addRef.call(this, `#${anchor}`);
            }
          }
        });
        return localRefs;
        function checkAmbiguosRef(sch1, sch2, ref) {
          if (sch2 !== void 0 && !equal(sch1, sch2))
            throw ambiguos(ref);
        }
        function ambiguos(ref) {
          return new Error(`reference "${ref}" resolves to more than one schema`);
        }
      }
      exports.getSchemaRefs = getSchemaRefs;
    }
  });

  // node_modules/ajv/dist/compile/validate/index.js
  var require_validate = __commonJS({
    "node_modules/ajv/dist/compile/validate/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
      var boolSchema_1 = require_boolSchema();
      var dataType_1 = require_dataType();
      var applicability_1 = require_applicability();
      var dataType_2 = require_dataType();
      var defaults_1 = require_defaults();
      var keyword_1 = require_keyword();
      var subschema_1 = require_subschema();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var resolve_1 = require_resolve();
      var util_1 = require_util();
      var errors_1 = require_errors2();
      function validateFunctionCode(it) {
        if (isSchemaObj(it)) {
          checkKeywords(it);
          if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
          }
        }
        validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
      }
      exports.validateFunctionCode = validateFunctionCode;
      function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
        if (opts.code.es5) {
          gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
          });
        } else {
          gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
        }
      }
      function destructureValCxt(opts) {
        return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
      }
      function destructureValCxtES5(gen, opts) {
        gen.if(names_1.default.valCxt, () => {
          gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
          gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
          gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
          gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
          if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
        }, () => {
          gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
          gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
          gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
          gen.var(names_1.default.rootData, names_1.default.data);
          if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
        });
      }
      function topSchemaObjCode(it) {
        const { schema, opts, gen } = it;
        validateFunction(it, () => {
          if (opts.$comment && schema.$comment)
            commentKeyword(it);
          checkNoDefault(it);
          gen.let(names_1.default.vErrors, null);
          gen.let(names_1.default.errors, 0);
          if (opts.unevaluated)
            resetEvaluated(it);
          typeAndKeywords(it);
          returnResults(it);
        });
        return;
      }
      function resetEvaluated(it) {
        const { gen, validateName } = it;
        it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
        gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
        gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
      }
      function funcSourceUrl(schema, opts) {
        const schId = typeof schema == "object" && schema[opts.schemaId];
        return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
      }
      function subschemaCode(it, valid) {
        if (isSchemaObj(it)) {
          checkKeywords(it);
          if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
          }
        }
        (0, boolSchema_1.boolOrEmptySchema)(it, valid);
      }
      function schemaCxtHasRules({ schema, self: self2 }) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (self2.RULES.all[key])
            return true;
        return false;
      }
      function isSchemaObj(it) {
        return typeof it.schema != "boolean";
      }
      function subSchemaObjCode(it, valid) {
        const { schema, gen, opts } = it;
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        updateContext(it);
        checkAsyncSchema(it);
        const errsCount = gen.const("_errs", names_1.default.errors);
        typeAndKeywords(it, errsCount);
        gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
      }
      function checkKeywords(it) {
        (0, util_1.checkUnknownRules)(it);
        checkRefsAndKeywords(it);
      }
      function typeAndKeywords(it, errsCount) {
        if (it.opts.jtd)
          return schemaKeywords(it, [], false, errsCount);
        const types = (0, dataType_1.getSchemaTypes)(it.schema);
        const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
        schemaKeywords(it, types, !checkedTypes, errsCount);
      }
      function checkRefsAndKeywords(it) {
        const { schema, errSchemaPath, opts, self: self2 } = it;
        if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self2.RULES)) {
          self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
        }
      }
      function checkNoDefault(it) {
        const { schema, opts } = it;
        if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
          (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
        }
      }
      function updateContext(it) {
        const schId = it.schema[it.opts.schemaId];
        if (schId)
          it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
      }
      function checkAsyncSchema(it) {
        if (it.schema.$async && !it.schemaEnv.$async)
          throw new Error("async schema in sync schema");
      }
      function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
        const msg = schema.$comment;
        if (opts.$comment === true) {
          gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
        } else if (typeof opts.$comment == "function") {
          const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
          const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
          gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
        }
      }
      function returnResults(it) {
        const { gen, schemaEnv, validateName, ValidationError, opts } = it;
        if (schemaEnv.$async) {
          gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
          if (opts.unevaluated)
            assignEvaluated(it);
          gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
        }
      }
      function assignEvaluated({ gen, evaluated, props, items }) {
        if (props instanceof codegen_1.Name)
          gen.assign((0, codegen_1._)`${evaluated}.props`, props);
        if (items instanceof codegen_1.Name)
          gen.assign((0, codegen_1._)`${evaluated}.items`, items);
      }
      function schemaKeywords(it, types, typeErrors, errsCount) {
        const { gen, schema, data, allErrors, opts, self: self2 } = it;
        const { RULES } = self2;
        if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
          gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
          return;
        }
        if (!opts.jtd)
          checkStrictTypes(it, types);
        gen.block(() => {
          for (const group of RULES.rules)
            groupKeywords(group);
          groupKeywords(RULES.post);
        });
        function groupKeywords(group) {
          if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
          if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
              gen.else();
              (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
          } else {
            iterateKeywords(it, group);
          }
          if (!allErrors)
            gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
        }
      }
      function iterateKeywords(it, group) {
        const { gen, schema, opts: { useDefaults } } = it;
        if (useDefaults)
          (0, defaults_1.assignDefaults)(it, group.type);
        gen.block(() => {
          for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
              keywordCode(it, rule.keyword, rule.definition, group.type);
            }
          }
        });
      }
      function checkStrictTypes(it, types) {
        if (it.schemaEnv.meta || !it.opts.strictTypes)
          return;
        checkContextTypes(it, types);
        if (!it.opts.allowUnionTypes)
          checkMultipleTypes(it, types);
        checkKeywordTypes(it, it.dataTypes);
      }
      function checkContextTypes(it, types) {
        if (!types.length)
          return;
        if (!it.dataTypes.length) {
          it.dataTypes = types;
          return;
        }
        types.forEach((t) => {
          if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
          }
        });
        narrowSchemaTypes(it, types);
      }
      function checkMultipleTypes(it, ts) {
        if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
          strictTypesError(it, "use allowUnionTypes to allow union type keyword");
        }
      }
      function checkKeywordTypes(it, ts) {
        const rules = it.self.RULES.all;
        for (const keyword in rules) {
          const rule = rules[keyword];
          if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
              strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
          }
        }
      }
      function hasApplicableType(schTs, kwdT) {
        return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
      }
      function includesType(ts, t) {
        return ts.includes(t) || t === "integer" && ts.includes("number");
      }
      function narrowSchemaTypes(it, withTypes) {
        const ts = [];
        for (const t of it.dataTypes) {
          if (includesType(withTypes, t))
            ts.push(t);
          else if (withTypes.includes("integer") && t === "number")
            ts.push("integer");
        }
        it.dataTypes = ts;
      }
      function strictTypesError(it, msg) {
        const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
        msg += ` at "${schemaPath}" (strictTypes)`;
        (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
      }
      var KeywordCxt = class {
        constructor(it, def, keyword) {
          (0, keyword_1.validateKeywordUsage)(it, def, keyword);
          this.gen = it.gen;
          this.allErrors = it.allErrors;
          this.keyword = keyword;
          this.data = it.data;
          this.schema = it.schema[keyword];
          this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
          this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
          this.schemaType = def.schemaType;
          this.parentSchema = it.schema;
          this.params = {};
          this.it = it;
          this.def = def;
          if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
          } else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
              throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
          }
          if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
          }
        }
        result(condition, successAction, failAction) {
          this.failResult((0, codegen_1.not)(condition), successAction, failAction);
        }
        failResult(condition, successAction, failAction) {
          this.gen.if(condition);
          if (failAction)
            failAction();
          else
            this.error();
          if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
              this.gen.endIf();
          } else {
            if (this.allErrors)
              this.gen.endIf();
            else
              this.gen.else();
          }
        }
        pass(condition, failAction) {
          this.failResult((0, codegen_1.not)(condition), void 0, failAction);
        }
        fail(condition) {
          if (condition === void 0) {
            this.error();
            if (!this.allErrors)
              this.gen.if(false);
            return;
          }
          this.gen.if(condition);
          this.error();
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
        fail$data(condition) {
          if (!this.$data)
            return this.fail(condition);
          const { schemaCode } = this;
          this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
        }
        error(append, errorParams, errorPaths) {
          if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
          }
          this._error(append, errorPaths);
        }
        _error(append, errorPaths) {
          ;
          (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
        }
        $dataError() {
          (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
        }
        reset() {
          if (this.errsCount === void 0)
            throw new Error('add "trackErrors" to keyword definition');
          (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
        }
        ok(cond) {
          if (!this.allErrors)
            this.gen.if(cond);
        }
        setParams(obj, assign) {
          if (assign)
            Object.assign(this.params, obj);
          else
            this.params = obj;
        }
        block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
          this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
          });
        }
        check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
          if (!this.$data)
            return;
          const { gen, schemaCode, schemaType, def } = this;
          gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
          if (valid !== codegen_1.nil)
            gen.assign(valid, true);
          if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
              gen.assign(valid, false);
          }
          gen.else();
        }
        invalid$data() {
          const { gen, schemaCode, schemaType, def, it } = this;
          return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
          function wrong$DataType() {
            if (schemaType.length) {
              if (!(schemaCode instanceof codegen_1.Name))
                throw new Error("ajv implementation error");
              const st = Array.isArray(schemaType) ? schemaType : [schemaType];
              return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
          }
          function invalid$DataSchema() {
            if (def.validateSchema) {
              const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
              return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
          }
        }
        subschema(appl, valid) {
          const subschema = (0, subschema_1.getSubschema)(this.it, appl);
          (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
          (0, subschema_1.extendSubschemaMode)(subschema, appl);
          const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
          subschemaCode(nextContext, valid);
          return nextContext;
        }
        mergeEvaluated(schemaCxt, toName) {
          const { it, gen } = this;
          if (!it.opts.unevaluated)
            return;
          if (it.props !== true && schemaCxt.props !== void 0) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
          }
          if (it.items !== true && schemaCxt.items !== void 0) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
          }
        }
        mergeValidEvaluated(schemaCxt, valid) {
          const { it, gen } = this;
          if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
          }
        }
      };
      exports.KeywordCxt = KeywordCxt;
      function keywordCode(it, keyword, def, ruleType) {
        const cxt = new KeywordCxt(it, def, keyword);
        if ("code" in def) {
          def.code(cxt, ruleType);
        } else if (cxt.$data && def.validate) {
          (0, keyword_1.funcKeywordCode)(cxt, def);
        } else if ("macro" in def) {
          (0, keyword_1.macroKeywordCode)(cxt, def);
        } else if (def.compile || def.validate) {
          (0, keyword_1.funcKeywordCode)(cxt, def);
        }
      }
      var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
      var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
      function getData($data, { dataLevel, dataNames, dataPathArr }) {
        let jsonPointer;
        let data;
        if ($data === "")
          return names_1.default.rootData;
        if ($data[0] === "/") {
          if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
          jsonPointer = $data;
          data = names_1.default.rootData;
        } else {
          const matches = RELATIVE_JSON_POINTER.exec($data);
          if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
          const up = +matches[1];
          jsonPointer = matches[2];
          if (jsonPointer === "#") {
            if (up >= dataLevel)
              throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
          }
          if (up > dataLevel)
            throw new Error(errorMsg("data", up));
          data = dataNames[dataLevel - up];
          if (!jsonPointer)
            return data;
        }
        let expr = data;
        const segments = jsonPointer.split("/");
        for (const segment of segments) {
          if (segment) {
            data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._)`${expr} && ${data}`;
          }
        }
        return expr;
        function errorMsg(pointerType, up) {
          return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
        }
      }
      exports.getData = getData;
    }
  });

  // node_modules/ajv/dist/runtime/validation_error.js
  var require_validation_error = __commonJS({
    "node_modules/ajv/dist/runtime/validation_error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ValidationError = class extends Error {
        constructor(errors) {
          super("validation failed");
          this.errors = errors;
          this.ajv = this.validation = true;
        }
      };
      exports.default = ValidationError;
    }
  });

  // node_modules/ajv/dist/compile/ref_error.js
  var require_ref_error = __commonJS({
    "node_modules/ajv/dist/compile/ref_error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var resolve_1 = require_resolve();
      var MissingRefError = class extends Error {
        constructor(resolver, baseId, ref, msg) {
          super(msg || `can't resolve reference ${ref} from id ${baseId}`);
          this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
          this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
        }
      };
      exports.default = MissingRefError;
    }
  });

  // node_modules/ajv/dist/compile/index.js
  var require_compile = __commonJS({
    "node_modules/ajv/dist/compile/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
      var codegen_1 = require_codegen();
      var validation_error_1 = require_validation_error();
      var names_1 = require_names();
      var resolve_1 = require_resolve();
      var util_1 = require_util();
      var validate_1 = require_validate();
      var SchemaEnv = class {
        constructor(env) {
          var _a;
          this.refs = {};
          this.dynamicAnchors = {};
          let schema;
          if (typeof env.schema == "object")
            schema = env.schema;
          this.schema = env.schema;
          this.schemaId = env.schemaId;
          this.root = env.root || this;
          this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
          this.schemaPath = env.schemaPath;
          this.localRefs = env.localRefs;
          this.meta = env.meta;
          this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
          this.refs = {};
        }
      };
      exports.SchemaEnv = SchemaEnv;
      function compileSchema(sch) {
        const _sch = getCompilingSchema.call(this, sch);
        if (_sch)
          return _sch;
        const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
        const { es5, lines } = this.opts.code;
        const { ownProperties } = this.opts;
        const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
        let _ValidationError;
        if (sch.$async) {
          _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
          });
        }
        const validateName = gen.scopeName("validate");
        sch.validateName = validateName;
        const schemaCxt = {
          gen,
          allErrors: this.opts.allErrors,
          data: names_1.default.data,
          parentData: names_1.default.parentData,
          parentDataProperty: names_1.default.parentDataProperty,
          dataNames: [names_1.default.data],
          dataPathArr: [codegen_1.nil],
          // TODO can its length be used as dataLevel if nil is removed?
          dataLevel: 0,
          dataTypes: [],
          definedProperties: /* @__PURE__ */ new Set(),
          topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
          validateName,
          ValidationError: _ValidationError,
          schema: sch.schema,
          schemaEnv: sch,
          rootId,
          baseId: sch.baseId || rootId,
          schemaPath: codegen_1.nil,
          errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
          errorPath: (0, codegen_1._)`""`,
          opts: this.opts,
          self: this
        };
        let sourceCode;
        try {
          this._compilations.add(sch);
          (0, validate_1.validateFunctionCode)(schemaCxt);
          gen.optimize(this.opts.code.optimize);
          const validateCode = gen.toString();
          sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
          if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
          const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
          const validate = makeValidate(this, this.scope.get());
          this.scope.value(validateName, { ref: validate });
          validate.errors = null;
          validate.schema = sch.schema;
          validate.schemaEnv = sch;
          if (sch.$async)
            validate.$async = true;
          if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
          }
          if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
              props: props instanceof codegen_1.Name ? void 0 : props,
              items: items instanceof codegen_1.Name ? void 0 : items,
              dynamicProps: props instanceof codegen_1.Name,
              dynamicItems: items instanceof codegen_1.Name
            };
            if (validate.source)
              validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
          }
          sch.validate = validate;
          return sch;
        } catch (e) {
          delete sch.validate;
          delete sch.validateName;
          if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
          throw e;
        } finally {
          this._compilations.delete(sch);
        }
      }
      exports.compileSchema = compileSchema;
      function resolveRef(root, baseId, ref) {
        var _a;
        ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
        const schOrFunc = root.refs[ref];
        if (schOrFunc)
          return schOrFunc;
        let _sch = resolve.call(this, root, ref);
        if (_sch === void 0) {
          const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
          const { schemaId } = this.opts;
          if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
        }
        if (_sch === void 0)
          return;
        return root.refs[ref] = inlineOrCompile.call(this, _sch);
      }
      exports.resolveRef = resolveRef;
      function inlineOrCompile(sch) {
        if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
          return sch.schema;
        return sch.validate ? sch : compileSchema.call(this, sch);
      }
      function getCompilingSchema(schEnv) {
        for (const sch of this._compilations) {
          if (sameSchemaEnv(sch, schEnv))
            return sch;
        }
      }
      exports.getCompilingSchema = getCompilingSchema;
      function sameSchemaEnv(s1, s2) {
        return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
      }
      function resolve(root, ref) {
        let sch;
        while (typeof (sch = this.refs[ref]) == "string")
          ref = sch;
        return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
      }
      function resolveSchema(root, ref) {
        const p = this.opts.uriResolver.parse(ref);
        const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
        let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
        if (Object.keys(root.schema).length > 0 && refPath === baseId) {
          return getJsonPointer.call(this, p, root);
        }
        const id = (0, resolve_1.normalizeId)(refPath);
        const schOrRef = this.refs[id] || this.schemas[id];
        if (typeof schOrRef == "string") {
          const sch = resolveSchema.call(this, root, schOrRef);
          if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
          return getJsonPointer.call(this, p, sch);
        }
        if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
          return;
        if (!schOrRef.validate)
          compileSchema.call(this, schOrRef);
        if (id === (0, resolve_1.normalizeId)(ref)) {
          const { schema } = schOrRef;
          const { schemaId } = this.opts;
          const schId = schema[schemaId];
          if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
          return new SchemaEnv({ schema, schemaId, root, baseId });
        }
        return getJsonPointer.call(this, p, schOrRef);
      }
      exports.resolveSchema = resolveSchema;
      var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
        "properties",
        "patternProperties",
        "enum",
        "dependencies",
        "definitions"
      ]);
      function getJsonPointer(parsedRef, { baseId, schema, root }) {
        var _a;
        if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
          return;
        for (const part of parsedRef.fragment.slice(1).split("/")) {
          if (typeof schema === "boolean")
            return;
          const partSchema = schema[(0, util_1.unescapeFragment)(part)];
          if (partSchema === void 0)
            return;
          schema = partSchema;
          const schId = typeof schema === "object" && schema[this.opts.schemaId];
          if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
          }
        }
        let env;
        if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
          const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
          env = resolveSchema.call(this, root, $ref);
        }
        const { schemaId } = this.opts;
        env = env || new SchemaEnv({ schema, schemaId, root, baseId });
        if (env.schema !== env.root.schema)
          return env;
        return void 0;
      }
    }
  });

  // node_modules/ajv/dist/refs/data.json
  var require_data = __commonJS({
    "node_modules/ajv/dist/refs/data.json"(exports, module) {
      module.exports = {
        $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
        description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
        type: "object",
        required: ["$data"],
        properties: {
          $data: {
            type: "string",
            anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
          }
        },
        additionalProperties: false
      };
    }
  });

  // node_modules/fast-uri/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/fast-uri/lib/utils.js"(exports, module) {
      "use strict";
      var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
      var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
      var isPort = RegExp.prototype.test.bind(/^\d*$/u);
      var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
      var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
      var isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u);
      var isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u);
      var isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u);
      var BYTE_HEX = new Array(256);
      {
        const HEX_DIGITS = "0123456789ABCDEF";
        for (let i = 0; i < 256; i++) {
          BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
        }
      }
      function percentEncodeNonAscii(cp) {
        if (cp < 2048) {
          return BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63];
        }
        if (cp < 65536) {
          return BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
        }
        return BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
      }
      function stringArrayToHexStripped(input) {
        let acc = "";
        let code = 0;
        let i = 0;
        for (i = 0; i < input.length; i++) {
          code = input[i].charCodeAt(0);
          if (code === 48) {
            continue;
          }
          if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return "";
          }
          acc += input[i];
          break;
        }
        for (i += 1; i < input.length; i++) {
          code = input[i].charCodeAt(0);
          if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return "";
          }
          acc += input[i];
        }
        return acc;
      }
      var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/);
      var isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/);
      var isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/);
      var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
      function isZoneIdentifier(zone) {
        if (zone.length === 0) return false;
        for (let i = 0; i < zone.length; i++) {
          if (isZoneCharacter(zone[i])) continue;
          if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
            i += 2;
            continue;
          }
          return false;
        }
        return true;
      }
      function compressIPv6ZeroRun(hextets) {
        let bestStart = -1;
        let bestLength = 0;
        let runStart = -1;
        let runLength = 0;
        for (let i = 0; i < hextets.length; i++) {
          if (hextets[i] === "0") {
            if (runStart === -1) runStart = i;
            runLength++;
            if (runLength > bestLength) {
              bestLength = runLength;
              bestStart = runStart;
            }
          } else {
            runStart = -1;
            runLength = 0;
          }
        }
        if (bestLength < 2) return hextets.join(":");
        const head = hextets.slice(0, bestStart).join(":");
        const tail = hextets.slice(bestStart + bestLength).join(":");
        return head + "::" + tail;
      }
      function normalizeIPv6Address(input) {
        const compression = input.indexOf("::");
        if (compression !== -1 && input.indexOf("::", compression + 1) !== -1) return void 0;
        const left = compression === -1 ? input.split(":") : input.slice(0, compression).split(":");
        const right = compression === -1 ? [] : input.slice(compression + 2).split(":");
        if (compression !== -1) {
          if (left.length === 1 && left[0] === "") left.length = 0;
          if (right.length === 1 && right[0] === "") right.length = 0;
        }
        const parts = left.concat(right);
        let hextetCount = 0;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (part === "") return void 0;
          if (part.indexOf(".") !== -1) {
            if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return void 0;
            hextetCount += 2;
            continue;
          }
          if (!isHextet(part)) return void 0;
          parts[i] = parseInt(part, 16).toString(16);
          hextetCount++;
        }
        if (compression === -1) {
          if (hextetCount !== 8) return void 0;
          return compressIPv6ZeroRun(parts);
        }
        if (hextetCount >= 8) return void 0;
        const expanded = parts.slice(0, left.length);
        for (let i = hextetCount; i < 8; i++) expanded.push("0");
        for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
        return compressIPv6ZeroRun(expanded);
      }
      function normalizeIPv6(host) {
        const bracketed = host[0] === "[" && host[host.length - 1] === "]";
        const hasBracket = host[0] === "[" || host[host.length - 1] === "]";
        if (hasBracket && !bracketed) return { host, isIPV6: false, error: true };
        let input = bracketed ? host.slice(1, -1) : host;
        if (bracketed && isIPvFuture(input)) {
          input = input.toLowerCase();
          return { host: `[${input}]`, escapedHost: input, isIPV6: false, isIPVFuture: true };
        }
        if (findToken(input, ":") < 2) {
          return { host, isIPV6: false, error: bracketed };
        }
        let zoneIdentifier = "";
        const zoneSeparator = input.indexOf("%");
        if (zoneSeparator !== -1) {
          const separatorLength = input.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
          zoneIdentifier = input.slice(zoneSeparator + separatorLength);
          if (!isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: false, error: true };
          input = input.slice(0, zoneSeparator);
        }
        const address = normalizeIPv6Address(input);
        if (address === void 0) return { host, isIPV6: false, error: true };
        return {
          host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
          escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
          isIPV6: true
        };
      }
      function findToken(str, token) {
        let ind = 0;
        for (let i = 0; i < str.length; i++) {
          if (str[i] === token) ind++;
        }
        return ind;
      }
      function removeDotSegments(path) {
        let input = path;
        const output = [];
        let nextSlash = -1;
        let len = 0;
        while (len = input.length) {
          if (len === 1) {
            if (input === ".") {
              break;
            } else if (input === "/") {
              output.push("/");
              break;
            } else {
              output.push(input);
              break;
            }
          } else if (len === 2) {
            if (input[0] === ".") {
              if (input[1] === ".") {
                break;
              } else if (input[1] === "/") {
                input = input.slice(2);
                continue;
              }
            } else if (input[0] === "/") {
              if (input[1] === "." || input[1] === "/") {
                output.push("/");
                break;
              }
            }
          } else if (len === 3) {
            if (input === "/..") {
              if (output.length !== 0) {
                output.pop();
              }
              output.push("/");
              break;
            }
          }
          if (input[0] === ".") {
            if (input[1] === ".") {
              if (input[2] === "/") {
                input = input.slice(3);
                continue;
              }
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === ".") {
              if (input[2] === "/") {
                input = input.slice(2);
                continue;
              } else if (input[2] === ".") {
                if (input[3] === "/") {
                  input = input.slice(3);
                  if (output.length !== 0) {
                    output.pop();
                  }
                  continue;
                }
              }
            }
          }
          if ((nextSlash = input.indexOf("/", 1)) === -1) {
            output.push(input);
            break;
          } else {
            output.push(input.slice(0, nextSlash));
            input = input.slice(nextSlash);
          }
        }
        return output.join("");
      }
      function removeDotSegmentsRelative(path) {
        if (path === "" || path[0] === "/") {
          return removeDotSegments(path);
        }
        const segments = path.split("/");
        const last = segments.length - 1;
        const output = [];
        let trailingDirectory = false;
        for (let i = 0; i <= last; i++) {
          const segment = segments[i];
          if (segment === "." || segment === "..") {
            if (segment === "..") {
              if (output.length !== 0 && output[output.length - 1] !== "..") {
                output.pop();
              } else {
                output.push("..");
              }
            }
            trailingDirectory = i === last;
          } else {
            output.push(segment);
          }
        }
        if (trailingDirectory && output[output.length - 1] !== "..") {
          output.push("");
        }
        if (output.length === 0 || output[0] === "" || output[0].includes(":")) {
          output.unshift(".");
        }
        return output.join("/");
      }
      var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
      var HOST_DELIM_RE = /[@/?#:]/g;
      var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
      function reescapeHostDelimiters(host, isIP) {
        const re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
        re.lastIndex = 0;
        return host.replace(re, (ch) => HOST_DELIMS[ch]);
      }
      function normalizePercentEncoding(input, decodeUnreserved = false) {
        if (input.indexOf("%") === -1) {
          return input;
        }
        let output = "";
        for (let i = 0; i < input.length; i++) {
          if (input[i] === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (decodeUnreserved && isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          output += input[i];
        }
        return output;
      }
      function normalizePathEncoding(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (decoded !== "." && isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          if (isPathCharacter(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function serializePathEncoding(input, pathNoScheme = false) {
        let output = "";
        let firstSegment = pathNoScheme && input[0] !== "/";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          if (ch === "/") {
            firstSegment = false;
          }
          if (isPathCharacter(ch) && (ch !== ":" || !firstSegment)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function encodeComponent(input, isAllowed) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          if (isAllowed(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function encodeUserinfo(input) {
        return encodeComponent(input, isUserinfoCharacter);
      }
      function encodeQuery(input) {
        return encodeComponent(input, isQueryFragmentCharacter);
      }
      function encodeFragment(input) {
        return encodeComponent(input, isQueryFragmentCharacter);
      }
      function isEscapeSafe(cp) {
        return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
      }
      function normalizeQueryFragmentEncoding(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          if (isQueryFragmentCharacter(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function escapePreservingEscapes(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          if (input[i] === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          output += escape(input[i]);
        }
        return output;
      }
      function recomposeAuthority(component) {
        const uriTokens = [];
        if (component.userinfo !== void 0) {
          uriTokens.push(encodeUserinfo(component.userinfo));
          uriTokens.push("@");
        }
        if (component.host !== void 0) {
          let host = component.host;
          if (!isIPv4(host)) {
            let ipV6res = normalizeIPv6(host);
            if (ipV6res.isIPV6 !== true && ipV6res.isIPVFuture !== true) {
              host = normalizePercentEncoding(host, true);
              ipV6res = normalizeIPv6(host);
            }
            if (ipV6res.isIPV6 === true || ipV6res.isIPVFuture === true) {
              host = `[${ipV6res.escapedHost}]`;
            } else {
              host = reescapeHostDelimiters(host, false);
            }
          }
          uriTokens.push(host);
        }
        if (typeof component.port === "number" || typeof component.port === "string") {
          const port = String(component.port);
          if (!isPort(port)) {
            throw new TypeError("URI port is malformed.");
          }
          uriTokens.push(":");
          uriTokens.push(port);
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      module.exports = {
        nonSimpleDomain,
        recomposeAuthority,
        reescapeHostDelimiters,
        normalizePercentEncoding,
        normalizePathEncoding,
        serializePathEncoding,
        normalizeQueryFragmentEncoding,
        encodeUserinfo,
        encodeQuery,
        encodeFragment,
        escapePreservingEscapes,
        removeDotSegments,
        removeDotSegmentsRelative,
        isIPv4,
        isUUID,
        normalizeIPv6,
        stringArrayToHexStripped
      };
    }
  });

  // node_modules/fast-uri/lib/schemes.js
  var require_schemes = __commonJS({
    "node_modules/fast-uri/lib/schemes.js"(exports, module) {
      "use strict";
      var { isUUID } = require_utils();
      var URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu;
      var supportedSchemeNames = (
        /** @type {const} */
        [
          "http",
          "https",
          "ws",
          "wss",
          "urn",
          "urn:uuid"
        ]
      );
      function isValidSchemeName(name) {
        return supportedSchemeNames.indexOf(
          /** @type {*} */
          name
        ) !== -1;
      }
      function wsIsSecure(wsComponent) {
        if (wsComponent.secure === true) {
          return true;
        } else if (wsComponent.secure === false) {
          return false;
        } else if (wsComponent.scheme) {
          return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
        } else {
          return false;
        }
      }
      function httpParse(component) {
        if (!component.host) {
          component.error = component.error || "HTTP URIs must have a host.";
        }
        return component;
      }
      function httpSerialize(component) {
        const secure = String(component.scheme).toLowerCase() === "https";
        if (component.port === (secure ? 443 : 80) || component.port === "") {
          component.port = void 0;
        }
        if (!component.path) {
          component.path = "/";
        }
        return component;
      }
      function wsParse(wsComponent) {
        wsComponent.secure = wsIsSecure(wsComponent);
        wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
        wsComponent.path = void 0;
        wsComponent.query = void 0;
        return wsComponent;
      }
      function wsSerialize(wsComponent) {
        if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
          wsComponent.port = void 0;
        }
        if (typeof wsComponent.secure === "boolean") {
          wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
          wsComponent.secure = void 0;
        }
        if (wsComponent.resourceName) {
          const queryIndex = wsComponent.resourceName.indexOf("?");
          const path = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
          wsComponent.path = path && path !== "/" ? path : void 0;
          wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1);
          wsComponent.resourceName = void 0;
        }
        wsComponent.fragment = void 0;
        return wsComponent;
      }
      function urnParse(urnComponent, options) {
        if (!urnComponent.path) {
          urnComponent.error = "URN can not be parsed";
          return urnComponent;
        }
        const matches = urnComponent.path.match(URN_REG);
        if (matches && matches[0] === urnComponent.path) {
          const scheme = options.scheme || urnComponent.scheme || "urn";
          urnComponent.nid = matches[1].toLowerCase();
          urnComponent.nss = matches[2];
          const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
          const schemeHandler = getSchemeHandler(urnScheme);
          urnComponent.path = void 0;
          if (schemeHandler) {
            urnComponent = schemeHandler.parse(urnComponent, options);
          }
        } else {
          urnComponent.error = urnComponent.error || "URN can not be parsed.";
        }
        return urnComponent;
      }
      function urnSerialize(urnComponent, options) {
        if (urnComponent.nid === void 0) {
          throw new Error("URN without nid cannot be serialized");
        }
        const scheme = options.scheme || urnComponent.scheme || "urn";
        const nid = urnComponent.nid.toLowerCase();
        const urnScheme = `${scheme}:${options.nid || nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        if (schemeHandler) {
          urnComponent = schemeHandler.serialize(urnComponent, options);
        }
        const uriComponent = urnComponent;
        const nss = urnComponent.nss;
        uriComponent.path = `${nid || options.nid}:${nss}`;
        options.skipEscape = true;
        return uriComponent;
      }
      function urnuuidParse(urnComponent, options) {
        const uuidComponent = urnComponent;
        uuidComponent.uuid = uuidComponent.nss;
        uuidComponent.nss = void 0;
        if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
          uuidComponent.error = uuidComponent.error || "UUID is not valid.";
        }
        return uuidComponent;
      }
      function urnuuidSerialize(uuidComponent) {
        const urnComponent = uuidComponent;
        urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
        return urnComponent;
      }
      var http = (
        /** @type {SchemeHandler} */
        {
          scheme: "http",
          domainHost: true,
          parse: httpParse,
          serialize: httpSerialize
        }
      );
      var https = (
        /** @type {SchemeHandler} */
        {
          scheme: "https",
          domainHost: http.domainHost,
          parse: httpParse,
          serialize: httpSerialize
        }
      );
      var ws = (
        /** @type {SchemeHandler} */
        {
          scheme: "ws",
          domainHost: true,
          parse: wsParse,
          serialize: wsSerialize
        }
      );
      var wss = (
        /** @type {SchemeHandler} */
        {
          scheme: "wss",
          domainHost: ws.domainHost,
          parse: ws.parse,
          serialize: ws.serialize
        }
      );
      var urn = (
        /** @type {SchemeHandler} */
        {
          scheme: "urn",
          parse: urnParse,
          serialize: urnSerialize,
          skipNormalize: true
        }
      );
      var urnuuid = (
        /** @type {SchemeHandler} */
        {
          scheme: "urn:uuid",
          parse: urnuuidParse,
          serialize: urnuuidSerialize,
          skipNormalize: true
        }
      );
      var SCHEMES = (
        /** @type {Record<SchemeName, SchemeHandler>} */
        {
          http,
          https,
          ws,
          wss,
          urn,
          "urn:uuid": urnuuid
        }
      );
      Object.setPrototypeOf(SCHEMES, null);
      function getSchemeHandler(scheme) {
        return scheme && (SCHEMES[
          /** @type {SchemeName} */
          scheme
        ] || SCHEMES[
          /** @type {SchemeName} */
          scheme.toLowerCase()
        ]) || void 0;
      }
      module.exports = {
        wsIsSecure,
        SCHEMES,
        isValidSchemeName,
        getSchemeHandler
      };
    }
  });

  // node_modules/fast-uri/index.js
  var require_fast_uri = __commonJS({
    "node_modules/fast-uri/index.js"(exports, module) {
      "use strict";
      var { normalizeIPv6, removeDotSegments, removeDotSegmentsRelative, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
      var { SCHEMES, getSchemeHandler } = require_schemes();
      var VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u;
      var MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
      var MALFORMED_HOST_ERROR = "URI host is malformed.";
      var FORBIDDEN_DOMAIN_HOST_CHARACTER = /[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;
      function validateScheme(scheme) {
        const stringScheme = String(scheme);
        if (!VALID_SCHEME.test(stringScheme)) {
          throw new TypeError(MALFORMED_SCHEME_ERROR);
        }
        return stringScheme;
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = /** @type {T} */
          normalizeString(uri, options);
        } else if (typeof uri === "object") {
          uri = /** @type {T} */
          parse(serialize(uri, options), options);
        }
        return uri;
      }
      function resolve(baseURI, relativeURI, options) {
        const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
        const {
          parsed: baseParsed,
          malformedAuthorityOrPort: baseMalformed,
          malformedPercentEncoding: baseMalformedPercentEncoding,
          malformedSchemeSpecific: baseMalformedSchemeSpecific,
          malformedHost: baseMalformedHost,
          malformedScheme: baseMalformedScheme
        } = parseWithStatus(baseURI, schemelessOptions);
        const {
          parsed: relativeParsed,
          malformedAuthorityOrPort: relativeMalformed,
          malformedPercentEncoding: relativeMalformedPercentEncoding,
          malformedSchemeSpecific: relativeMalformedSchemeSpecific,
          malformedHost: relativeMalformedHost,
          malformedScheme: relativeMalformedScheme
        } = parseWithStatus(relativeURI, schemelessOptions);
        if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) {
          throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
        }
        const resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, true);
        const resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme);
        const resolvedHost = resolved.host;
        const resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
        if (hasForbiddenDomainHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP)) {
          throw new Error(MALFORMED_HOST_ERROR);
        }
        canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
        const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !/\P{ASCII}/u.test(resolvedHost);
        if (resolved.error && !encodedASCIIHost) {
          throw new Error(resolved.error);
        }
        schemelessOptions.skipEscape = true;
        return serialize(resolved, schemelessOptions);
      }
      function resolveComponent(base, relative, options, skipNormalization) {
        const target = {};
        if (!skipNormalization) {
          base = parse(serialize(base, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base.query;
              }
            } else {
              if (relative.path[0] === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                const baseHasAuthority = base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0;
                if (baseHasAuthority && !base.path) {
                  target.path = "/" + relative.path;
                } else if (!base.path) {
                  target.path = relative.path;
                } else {
                  target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = base.scheme === void 0 && !baseHasAuthority && target.path[0] !== "/" ? removeDotSegmentsRelative(target.path) : removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
          }
          target.scheme = base.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function equal(uriA, uriB, options) {
        const normalizedA = normalizeComparableURI(uriA, options);
        const normalizedB = normalizeComparableURI(uriB, options);
        return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
      }
      function serialize(cmpts, opts) {
        const component = {
          host: cmpts.host,
          scheme: cmpts.scheme,
          userinfo: cmpts.userinfo,
          port: cmpts.port,
          path: cmpts.path,
          query: cmpts.query,
          nid: cmpts.nid,
          nss: cmpts.nss,
          uuid: cmpts.uuid,
          fragment: cmpts.fragment,
          reference: cmpts.reference,
          resourceName: cmpts.resourceName,
          secure: cmpts.secure,
          error: ""
        };
        const options = Object.assign({}, opts);
        const uriTokens = [];
        if (component.scheme) {
          component.scheme = validateScheme(component.scheme);
        }
        const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
        const hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0;
        const schemelessReference = (component.scheme === void 0 || options.reference === "suffix") && !hasAuthority;
        const pathNoScheme = !options.skipEscape && schemelessReference;
        if (component.path !== void 0) {
          if (!options.skipEscape) {
            component.path = serializePathEncoding(component.path, pathNoScheme);
          } else {
            component.path = normalizePercentEncoding(component.path);
          }
        }
        if (options.reference !== "suffix" && component.scheme) {
          component.scheme = validateScheme(component.scheme);
          uriTokens.push(component.scheme, ":");
        }
        const authority = recomposeAuthority(component);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (component.path && component.path[0] !== "/") {
            uriTokens.push("/");
          }
        }
        if (component.path !== void 0) {
          let s = component.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = schemelessReference && s[0] !== "/" ? removeDotSegmentsRelative(s) : removeDotSegments(s);
          }
          if (schemelessReference) {
            s = serializePathEncoding(s, true);
          }
          if (authority === void 0 && s[0] === "/" && s[1] === "/") {
            s = "/%2F" + s.slice(2);
          }
          uriTokens.push(s);
        }
        if (component.query !== void 0) {
          uriTokens.push("?", encodeQuery(component.query));
        }
        if (component.fragment !== void 0) {
          uriTokens.push("#", encodeFragment(component.fragment));
        }
        return uriTokens.join("");
      }
      var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
      var AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/;
      var AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
      function getParseError(parsed, matches) {
        if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
          return 'URI path must start with "/" when authority is present.';
        }
        if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
          return "URI port is malformed.";
        }
        return void 0;
      }
      function hasMalformedPercentEncoding(component) {
        if (component === void 0) return false;
        let percent = component.indexOf("%");
        while (percent !== -1) {
          if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3))) {
            return true;
          }
          percent = component.indexOf("%", percent + 3);
        }
        return false;
      }
      function isIPLiteral(host) {
        return host[0] === "[" && host[host.length - 1] === "]";
      }
      function hasMalformedComponentPercentEncoding(matches) {
        const host = matches[4];
        return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
      }
      function canonicalizeHost(parsed, options, schemeHandler, isIP) {
        if (hasForbiddenDomainHost(parsed, options, schemeHandler, isIP)) {
          parsed.error = parsed.error || MALFORMED_HOST_ERROR;
          return true;
        }
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
          let url;
          try {
            url = new URL("http://" + parsed.host);
          } catch (e) {
            parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
            return true;
          }
          if (!isHostOnlyURL(url)) {
            parsed.error = parsed.error || MALFORMED_HOST_ERROR;
            return true;
          }
          parsed.host = url.hostname;
        }
        return false;
      }
      function hasForbiddenDomainHost(parsed, options, schemeHandler, isIP) {
        return Boolean(
          parsed.host && isIP === false && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && FORBIDDEN_DOMAIN_HOST_CHARACTER.test(parsed.host)
        );
      }
      function isHostOnlyURL(url) {
        return url.username === "" && url.password === "" && url.port === "" && url.pathname === "/" && url.search === "" && url.hash === "" && url.hostname !== "";
      }
      function parseWithStatus(uri, opts) {
        const options = Object.assign({}, opts);
        const parsed = {
          scheme: void 0,
          userinfo: void 0,
          host: "",
          port: void 0,
          path: "",
          query: void 0,
          fragment: void 0
        };
        let malformedAuthorityOrPort = false;
        let malformedPercentEncoding = false;
        let malformedSchemeSpecific = false;
        let malformedHost = false;
        let malformedIPLiteral = false;
        let malformedScheme = false;
        let isIP = false;
        if (options.reference === "suffix") {
          if (options.scheme) {
            uri = options.scheme + ":" + uri;
          } else {
            uri = "//" + uri;
          }
        }
        const authorityMatch = uri.match(AUTHORITY_PREFIX);
        if (authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1) {
          parsed.error = "URI authority must not contain a literal backslash.";
          malformedAuthorityOrPort = true;
        }
        const introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
        if (introducerMatch !== null) {
          const region = introducerMatch[1];
          const normalizedRegion = region.replace(/[\t\n\r]/g, "");
          if (normalizedRegion.length >= 2) {
            if (normalizedRegion.slice(0, 2) !== "//") {
              parsed.error = parsed.error || "URI authority must not contain a literal backslash.";
              malformedAuthorityOrPort = true;
            } else if (region.length !== normalizedRegion.length) {
              parsed.error = parsed.error || "URI authority introducer must not contain whitespace.";
              malformedAuthorityOrPort = true;
            }
          }
        }
        const matches = uri.match(URI_PARSE);
        if (matches) {
          parsed.scheme = matches[1];
          parsed.userinfo = matches[3];
          parsed.host = matches[4];
          parsed.port = parseInt(matches[5], 10);
          parsed.path = matches[6] || "";
          parsed.query = matches[7];
          parsed.fragment = matches[8];
          if (parsed.scheme !== void 0) {
            if (VALID_SCHEME.test(parsed.scheme)) {
              parsed.scheme = parsed.scheme.toLowerCase();
            } else {
              parsed.error = parsed.error || MALFORMED_SCHEME_ERROR;
              malformedScheme = true;
            }
          }
          malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches);
          if (malformedPercentEncoding) {
            parsed.error = parsed.error || "URI contains malformed percent-encoding.";
          }
          if (isNaN(parsed.port)) {
            parsed.port = matches[5];
          }
          const parseError = getParseError(parsed, matches);
          if (parseError !== void 0) {
            parsed.error = parsed.error || parseError;
            malformedAuthorityOrPort = true;
          }
          if (parsed.host) {
            const ipv4result = isIPv4(parsed.host);
            if (ipv4result === false) {
              const bracketedIPLiteral = isIPLiteral(parsed.host);
              const hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1;
              const ipv6result = normalizeIPv6(parsed.host);
              isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === true;
              malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === true);
              parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase();
              if (malformedIPLiteral) {
                parsed.error = parsed.error || MALFORMED_HOST_ERROR;
                malformedAuthorityOrPort = true;
              }
            } else {
              isIP = true;
            }
          }
          if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
            parsed.reference = "same-document";
          } else if (parsed.scheme === void 0) {
            parsed.reference = "relative";
          } else if (parsed.fragment === void 0) {
            parsed.reference = "absolute";
          } else {
            parsed.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
            parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
          }
          const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
          if (!malformedIPLiteral) {
            malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP);
          }
          if (uri.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
            let host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, true);
            if (!isIP) {
              host = normalizePercentEncoding(host.toLowerCase());
            }
            parsed.host = isIP || options.scheme !== "null" ? reescapeHostDelimiters(host, isIP) : host;
          }
          if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
            if (parsed.path) {
              parsed.path = normalizePathEncoding(parsed.path);
            }
            if (parsed.query) {
              parsed.query = normalizeQueryFragmentEncoding(parsed.query);
            }
            if (parsed.fragment) {
              parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment);
            }
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(parsed, options);
            if (schemeHandler === SCHEMES.urn && parsed.nid === void 0) {
              malformedSchemeSpecific = true;
            }
          }
        } else {
          parsed.error = parsed.error || "URI can not be parsed.";
        }
        return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
      }
      function parse(uri, opts) {
        return parseWithStatus(uri, opts).parsed;
      }
      function normalizeString(uri, opts) {
        return normalizeStringWithStatus(uri, opts).normalized;
      }
      function normalizeStringWithStatus(uri, opts) {
        const { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
        return {
          normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
          malformedAuthorityOrPort,
          malformedPercentEncoding,
          malformedSchemeSpecific,
          malformedHost,
          malformedScheme
        };
      }
      function normalizeComparableURI(uri, opts) {
        if (typeof uri !== "string" && typeof uri !== "object") {
          return void 0;
        }
        let value;
        try {
          value = typeof uri === "string" ? uri : serialize(uri, opts);
        } catch {
          return void 0;
        }
        const { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
        return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
      }
      var fastUri = {
        SCHEMES,
        normalize,
        resolve,
        resolveComponent,
        equal,
        serialize,
        parse
      };
      module.exports = fastUri;
      module.exports.default = fastUri;
      module.exports.fastUri = fastUri;
    }
  });

  // node_modules/ajv/dist/runtime/uri.js
  var require_uri = __commonJS({
    "node_modules/ajv/dist/runtime/uri.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var uri = require_fast_uri();
      uri.code = 'require("ajv/dist/runtime/uri").default';
      exports.default = uri;
    }
  });

  // node_modules/ajv/dist/core.js
  var require_core = __commonJS({
    "node_modules/ajv/dist/core.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
      var validate_1 = require_validate();
      Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
        return validate_1.KeywordCxt;
      } });
      var codegen_1 = require_codegen();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return codegen_1._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return codegen_1.str;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return codegen_1.stringify;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return codegen_1.nil;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return codegen_1.Name;
      } });
      Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
        return codegen_1.CodeGen;
      } });
      var validation_error_1 = require_validation_error();
      var ref_error_1 = require_ref_error();
      var rules_1 = require_rules();
      var compile_1 = require_compile();
      var codegen_2 = require_codegen();
      var resolve_1 = require_resolve();
      var dataType_1 = require_dataType();
      var util_1 = require_util();
      var $dataRefSchema = require_data();
      var uri_1 = require_uri();
      var defaultRegExp = (str, flags) => new RegExp(str, flags);
      defaultRegExp.code = "new RegExp";
      var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
      var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
        "validate",
        "serialize",
        "parse",
        "wrapper",
        "root",
        "schema",
        "keyword",
        "pattern",
        "formats",
        "validate$data",
        "func",
        "obj",
        "Error"
      ]);
      var removedOptions = {
        errorDataPath: "",
        format: "`validateFormats: false` can be used instead.",
        nullable: '"nullable" keyword is supported by default.',
        jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
        extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
        missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
        processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
        sourceCode: "Use option `code: {source: true}`",
        strictDefaults: "It is default now, see option `strict`.",
        strictKeywords: "It is default now, see option `strict`.",
        uniqueItems: '"uniqueItems" keyword is always validated.',
        unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
        cache: "Map is used as cache, schema object as key.",
        serialize: "Map is used as cache, schema object as key.",
        ajvErrors: "It is default now."
      };
      var deprecatedOptions = {
        ignoreKeywordsWithRef: "",
        jsPropertySyntax: "",
        unicode: '"minLength"/"maxLength" account for unicode characters by default.'
      };
      var MAX_EXPRESSION = 200;
      function requiredOptions(o) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        const s = o.strict;
        const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
        const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
        const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
        const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
        return {
          strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
          strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
          strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
          strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
          strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
          code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
          loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
          loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
          meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
          messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
          inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
          schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
          addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
          validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
          validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
          unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
          int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
          uriResolver
        };
      }
      var Ajv = class {
        constructor(opts = {}) {
          this.schemas = {};
          this.refs = {};
          this.formats = /* @__PURE__ */ Object.create(null);
          this._compilations = /* @__PURE__ */ new Set();
          this._loading = {};
          this._cache = /* @__PURE__ */ new Map();
          opts = this.opts = { ...opts, ...requiredOptions(opts) };
          const { es5, lines } = this.opts.code;
          this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
          this.logger = getLogger(opts.logger);
          const formatOpt = opts.validateFormats;
          opts.validateFormats = false;
          this.RULES = (0, rules_1.getRules)();
          checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
          checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
          this._metaOpts = getMetaSchemaOptions.call(this);
          if (opts.formats)
            addInitialFormats.call(this);
          this._addVocabularies();
          this._addDefaultMetaSchema();
          if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
          if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
          addInitialSchemas.call(this);
          opts.validateFormats = formatOpt;
        }
        _addVocabularies() {
          this.addKeyword("$async");
        }
        _addDefaultMetaSchema() {
          const { $data, meta, schemaId } = this.opts;
          let _dataRefSchema = $dataRefSchema;
          if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
          }
          if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
        }
        defaultMeta() {
          const { meta, schemaId } = this.opts;
          return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
        }
        validate(schemaKeyRef, data) {
          let v;
          if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
              throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
          } else {
            v = this.compile(schemaKeyRef);
          }
          const valid = v(data);
          if (!("$async" in v))
            this.errors = v.errors;
          return valid;
        }
        compile(schema, _meta) {
          const sch = this._addSchema(schema, _meta);
          return sch.validate || this._compileSchemaEnv(sch);
        }
        compileAsync(schema, meta) {
          if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
          }
          const { loadSchema } = this.opts;
          return runCompileAsync.call(this, schema, meta);
          async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
          }
          async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
              await runCompileAsync.call(this, { $ref }, true);
            }
          }
          async function _compileAsync(sch) {
            try {
              return this._compileSchemaEnv(sch);
            } catch (e) {
              if (!(e instanceof ref_error_1.default))
                throw e;
              checkLoaded.call(this, e);
              await loadMissingSchema.call(this, e.missingSchema);
              return _compileAsync.call(this, sch);
            }
          }
          function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
              throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
          }
          async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
              await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
              this.addSchema(_schema, ref, meta);
          }
          async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
              return p;
            try {
              return await (this._loading[ref] = loadSchema(ref));
            } finally {
              delete this._loading[ref];
            }
          }
        }
        // Adds schema to the instance
        addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
          if (Array.isArray(schema)) {
            for (const sch of schema)
              this.addSchema(sch, void 0, _meta, _validateSchema);
            return this;
          }
          let id;
          if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== void 0 && typeof id != "string") {
              throw new Error(`schema ${schemaId} must be string`);
            }
          }
          key = (0, resolve_1.normalizeId)(key || id);
          this._checkUnique(key);
          this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
          return this;
        }
        // Add schema that will be used to validate other schemas
        // options in META_IGNORE_OPTIONS are alway set to false
        addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
          this.addSchema(schema, key, true, _validateSchema);
          return this;
        }
        //  Validate schema against its meta-schema
        validateSchema(schema, throwOrLogError) {
          if (typeof schema == "boolean")
            return true;
          let $schema;
          $schema = schema.$schema;
          if ($schema !== void 0 && typeof $schema != "string") {
            throw new Error("$schema must be a string");
          }
          $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
          if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
          }
          const valid = this.validate($schema, schema);
          if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
              this.logger.error(message);
            else
              throw new Error(message);
          }
          return valid;
        }
        // Get compiled schema by `key` or `ref`.
        // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
        getSchema(keyRef) {
          let sch;
          while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
          if (sch === void 0) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
              return;
            this.refs[keyRef] = sch;
          }
          return sch.validate || this._compileSchemaEnv(sch);
        }
        // Remove cached schema(s).
        // If no parameter is passed all schemas but meta-schemas are removed.
        // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
        // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
        removeSchema(schemaKeyRef) {
          if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
          }
          switch (typeof schemaKeyRef) {
            case "undefined":
              this._removeAllSchemas(this.schemas);
              this._removeAllSchemas(this.refs);
              this._cache.clear();
              return this;
            case "string": {
              const sch = getSchEnv.call(this, schemaKeyRef);
              if (typeof sch == "object")
                this._cache.delete(sch.schema);
              delete this.schemas[schemaKeyRef];
              delete this.refs[schemaKeyRef];
              return this;
            }
            case "object": {
              const cacheKey = schemaKeyRef;
              this._cache.delete(cacheKey);
              let id = schemaKeyRef[this.opts.schemaId];
              if (id) {
                id = (0, resolve_1.normalizeId)(id);
                delete this.schemas[id];
                delete this.refs[id];
              }
              return this;
            }
            default:
              throw new Error("ajv.removeSchema: invalid parameter");
          }
        }
        // add "vocabulary" - a collection of keywords
        addVocabulary(definitions) {
          for (const def of definitions)
            this.addKeyword(def);
          return this;
        }
        addKeyword(kwdOrDef, def) {
          let keyword;
          if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
              this.logger.warn("these parameters are deprecated, see docs for addKeyword");
              def.keyword = keyword;
            }
          } else if (typeof kwdOrDef == "object" && def === void 0) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
              throw new Error("addKeywords: keyword must be string or non-empty array");
            }
          } else {
            throw new Error("invalid addKeywords parameters");
          }
          checkKeyword.call(this, keyword, def);
          if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
          }
          keywordMetaschema.call(this, def);
          const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
          };
          (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
          return this;
        }
        getKeyword(keyword) {
          const rule = this.RULES.all[keyword];
          return typeof rule == "object" ? rule.definition : !!rule;
        }
        // Remove keyword
        removeKeyword(keyword) {
          const { RULES } = this;
          delete RULES.keywords[keyword];
          delete RULES.all[keyword];
          for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
              group.rules.splice(i, 1);
          }
          return this;
        }
        // Add format
        addFormat(name, format) {
          if (typeof format == "string")
            format = new RegExp(format);
          this.formats[name] = format;
          return this;
        }
        errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
          if (!errors || errors.length === 0)
            return "No errors";
          return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
        }
        $dataMetaSchema(metaSchema, keywordsJsonPointers) {
          const rules = this.RULES.all;
          metaSchema = JSON.parse(JSON.stringify(metaSchema));
          for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1);
            let keywords = metaSchema;
            for (const seg of segments)
              keywords = keywords[seg];
            for (const key in rules) {
              const rule = rules[key];
              if (typeof rule != "object")
                continue;
              const { $data } = rule.definition;
              const schema = keywords[key];
              if ($data && schema)
                keywords[key] = schemaOrData(schema);
            }
          }
          return metaSchema;
        }
        _removeAllSchemas(schemas, regex) {
          for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
              if (typeof sch == "string") {
                delete schemas[keyRef];
              } else if (sch && !sch.meta) {
                this._cache.delete(sch.schema);
                delete schemas[keyRef];
              }
            }
          }
        }
        _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
          let id;
          const { schemaId } = this.opts;
          if (typeof schema == "object") {
            id = schema[schemaId];
          } else {
            if (this.opts.jtd)
              throw new Error("schema must be object");
            else if (typeof schema != "boolean")
              throw new Error("schema must be object or boolean");
          }
          let sch = this._cache.get(schema);
          if (sch !== void 0)
            return sch;
          baseId = (0, resolve_1.normalizeId)(id || baseId);
          const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
          sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
          this._cache.set(sch.schema, sch);
          if (addSchema && !baseId.startsWith("#")) {
            if (baseId)
              this._checkUnique(baseId);
            this.refs[baseId] = sch;
          }
          if (validateSchema)
            this.validateSchema(schema, true);
          return sch;
        }
        _checkUnique(id) {
          if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
          }
        }
        _compileSchemaEnv(sch) {
          if (sch.meta)
            this._compileMetaSchema(sch);
          else
            compile_1.compileSchema.call(this, sch);
          if (!sch.validate)
            throw new Error("ajv implementation error");
          return sch.validate;
        }
        _compileMetaSchema(sch) {
          const currentOpts = this.opts;
          this.opts = this._metaOpts;
          try {
            compile_1.compileSchema.call(this, sch);
          } finally {
            this.opts = currentOpts;
          }
        }
      };
      Ajv.ValidationError = validation_error_1.default;
      Ajv.MissingRefError = ref_error_1.default;
      exports.default = Ajv;
      function checkOptions(checkOpts, options, msg, log = "error") {
        for (const key in checkOpts) {
          const opt = key;
          if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
        }
      }
      function getSchEnv(keyRef) {
        keyRef = (0, resolve_1.normalizeId)(keyRef);
        return this.schemas[keyRef] || this.refs[keyRef];
      }
      function addInitialSchemas() {
        const optsSchemas = this.opts.schemas;
        if (!optsSchemas)
          return;
        if (Array.isArray(optsSchemas))
          this.addSchema(optsSchemas);
        else
          for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
      }
      function addInitialFormats() {
        for (const name in this.opts.formats) {
          const format = this.opts.formats[name];
          if (format)
            this.addFormat(name, format);
        }
      }
      function addInitialKeywords(defs) {
        if (Array.isArray(defs)) {
          this.addVocabulary(defs);
          return;
        }
        this.logger.warn("keywords option as map is deprecated, pass array");
        for (const keyword in defs) {
          const def = defs[keyword];
          if (!def.keyword)
            def.keyword = keyword;
          this.addKeyword(def);
        }
      }
      function getMetaSchemaOptions() {
        const metaOpts = { ...this.opts };
        for (const opt of META_IGNORE_OPTIONS)
          delete metaOpts[opt];
        return metaOpts;
      }
      var noLogs = { log() {
      }, warn() {
      }, error() {
      } };
      function getLogger(logger) {
        if (logger === false)
          return noLogs;
        if (logger === void 0)
          return console;
        if (logger.log && logger.warn && logger.error)
          return logger;
        throw new Error("logger must implement log, warn and error methods");
      }
      var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
      function checkKeyword(keyword, def) {
        const { RULES } = this;
        (0, util_1.eachItem)(keyword, (kwd) => {
          if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
          if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
        });
        if (!def)
          return;
        if (def.$data && !("code" in def || "validate" in def)) {
          throw new Error('$data keyword must have "code" or "validate" function');
        }
      }
      function addRule(keyword, definition, dataType) {
        var _a;
        const post = definition === null || definition === void 0 ? void 0 : definition.post;
        if (dataType && post)
          throw new Error('keyword with "post" flag cannot have "type"');
        const { RULES } = this;
        let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
        if (!ruleGroup) {
          ruleGroup = { type: dataType, rules: [] };
          RULES.rules.push(ruleGroup);
        }
        RULES.keywords[keyword] = true;
        if (!definition)
          return;
        const rule = {
          keyword,
          definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
          }
        };
        if (definition.before)
          addBeforeRule.call(this, ruleGroup, rule, definition.before);
        else
          ruleGroup.rules.push(rule);
        RULES.all[keyword] = rule;
        (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
      }
      function addBeforeRule(ruleGroup, rule, before) {
        const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
        if (i >= 0) {
          ruleGroup.rules.splice(i, 0, rule);
        } else {
          ruleGroup.rules.push(rule);
          this.logger.warn(`rule ${before} is not defined`);
        }
      }
      function keywordMetaschema(def) {
        let { metaSchema } = def;
        if (metaSchema === void 0)
          return;
        if (def.$data && this.opts.$data)
          metaSchema = schemaOrData(metaSchema);
        def.validateSchema = this.compile(metaSchema, true);
      }
      var $dataRef = {
        $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
      };
      function schemaOrData(schema) {
        return { anyOf: [schema, $dataRef] };
      }
    }
  });

  // node_modules/ajv/dist/vocabularies/core/id.js
  var require_id = __commonJS({
    "node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var def = {
        keyword: "id",
        code() {
          throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/core/ref.js
  var require_ref = __commonJS({
    "node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.callRef = exports.getValidate = void 0;
      var ref_error_1 = require_ref_error();
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var compile_1 = require_compile();
      var util_1 = require_util();
      var def = {
        keyword: "$ref",
        schemaType: "string",
        code(cxt) {
          const { gen, schema: $ref, it } = cxt;
          const { baseId, schemaEnv: env, validateName, opts, self: self2 } = it;
          const { root } = env;
          if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
          const schOrEnv = compile_1.resolveRef.call(self2, root, baseId, $ref);
          if (schOrEnv === void 0)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
          if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
          return inlineRefSchema(schOrEnv);
          function callRootRef() {
            if (env === root)
              return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
          }
          function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
          }
          function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
              schema: sch,
              dataTypes: [],
              schemaPath: codegen_1.nil,
              topSchemaRef: schName,
              errSchemaPath: $ref
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
          }
        }
      };
      function getValidate(cxt, sch) {
        const { gen } = cxt;
        return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
      }
      exports.getValidate = getValidate;
      function callRef(cxt, v, sch, $async) {
        const { gen, it } = cxt;
        const { allErrors, schemaEnv: env, opts } = it;
        const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
        if ($async)
          callAsyncRef();
        else
          callSyncRef();
        function callAsyncRef() {
          if (!env.$async)
            throw new Error("async schema referenced by sync schema");
          const valid = gen.let("valid");
          gen.try(() => {
            gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v);
            if (!allErrors)
              gen.assign(valid, true);
          }, (e) => {
            gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
              gen.assign(valid, false);
          });
          cxt.ok(valid);
        }
        function callSyncRef() {
          cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
        }
        function addErrorsFrom(source) {
          const errs = (0, codegen_1._)`${source}.errors`;
          gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
          gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        }
        function addEvaluatedFrom(source) {
          var _a;
          if (!it.opts.unevaluated)
            return;
          const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
          if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
              if (schEvaluated.props !== void 0) {
                it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
              }
            } else {
              const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
              it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
          }
          if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
              if (schEvaluated.items !== void 0) {
                it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
              }
            } else {
              const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
              it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
          }
        }
      }
      exports.callRef = callRef;
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/core/index.js
  var require_core2 = __commonJS({
    "node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var id_1 = require_id();
      var ref_1 = require_ref();
      var core = [
        "$schema",
        "$id",
        "$defs",
        "$vocabulary",
        { keyword: "$comment" },
        "definitions",
        id_1.default,
        ref_1.default
      ];
      exports.default = core;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/limitNumber.js
  var require_limitNumber = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var ops = codegen_1.operators;
      var KWDs = {
        maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
        minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
        exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
        exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
      };
      var error = {
        message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
        params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
      };
      var def = {
        keyword: Object.keys(KWDs),
        type: "number",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/multipleOf.js
  var require_multipleOf = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
        params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
      };
      var def = {
        keyword: "multipleOf",
        type: "number",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, schemaCode, it } = cxt;
          const prec = it.opts.multipleOfPrecision;
          const res = gen.let("res");
          const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
          cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/runtime/ucs2length.js
  var require_ucs2length = __commonJS({
    "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function ucs2length(str) {
        const len = str.length;
        let length = 0;
        let pos = 0;
        let value;
        while (pos < len) {
          length++;
          value = str.charCodeAt(pos++);
          if (value >= 55296 && value <= 56319 && pos < len) {
            value = str.charCodeAt(pos);
            if ((value & 64512) === 56320)
              pos++;
          }
        }
        return length;
      }
      exports.default = ucs2length;
      ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/limitLength.js
  var require_limitLength = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var ucs2length_1 = require_ucs2length();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxLength" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxLength", "minLength"],
        type: "string",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode, it } = cxt;
          const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
          const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
          cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/pattern.js
  var require_pattern = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var util_1 = require_util();
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
        params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
      };
      var def = {
        keyword: "pattern",
        type: "string",
        schemaType: "string",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          const u = it.opts.unicodeRegExp ? "u" : "";
          if ($data) {
            const { regExp } = it.opts.code;
            const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
            const valid = gen.let("valid");
            gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
            cxt.fail$data((0, codegen_1._)`!${valid}`);
          } else {
            const regExp = (0, code_1.usePattern)(cxt, schema);
            cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/limitProperties.js
  var require_limitProperties = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxProperties" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxProperties", "minProperties"],
        type: "object",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
          cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/required.js
  var require_required = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
        params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
      };
      var def = {
        keyword: "required",
        type: "object",
        schemaType: "array",
        $data: true,
        error,
        code(cxt) {
          const { gen, schema, schemaCode, data, $data, it } = cxt;
          const { opts } = it;
          if (!$data && schema.length === 0)
            return;
          const useLoop = schema.length >= opts.loopRequired;
          if (it.allErrors)
            allErrorsMode();
          else
            exitOnErrorMode();
          if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
              if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
                const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
              }
            }
          }
          function allErrorsMode() {
            if (useLoop || $data) {
              cxt.block$data(codegen_1.nil, loopAllRequired);
            } else {
              for (const prop of schema) {
                (0, code_1.checkReportMissingProp)(cxt, prop);
              }
            }
          }
          function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
              const valid = gen.let("valid", true);
              cxt.block$data(valid, () => loopUntilMissing(missing, valid));
              cxt.ok(valid);
            } else {
              gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
              (0, code_1.reportMissingProp)(cxt, missing);
              gen.else();
            }
          }
          function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
              cxt.setParams({ missingProperty: prop });
              gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
          }
          function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
              gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.error();
                gen.break();
              });
            }, codegen_1.nil);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/limitItems.js
  var require_limitItems = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxItems" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxItems", "minItems"],
        type: "array",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
          cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/runtime/equal.js
  var require_equal = __commonJS({
    "node_modules/ajv/dist/runtime/equal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var equal = require_fast_deep_equal();
      equal.code = 'require("ajv/dist/runtime/equal").default';
      exports.default = equal;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
  var require_uniqueItems = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dataType_1 = require_dataType();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
        params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
      };
      var def = {
        keyword: "uniqueItems",
        type: "array",
        schemaType: "boolean",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
          if (!$data && !schema)
            return;
          const valid = gen.let("valid");
          const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
          cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
          cxt.ok(valid);
          function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._)`${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
          }
          function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
          }
          function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._)`{}`);
            gen.for((0, codegen_1._)`;${i}--;`, () => {
              gen.let(item, (0, codegen_1._)`${data}[${i}]`);
              gen.if(wrongType, (0, codegen_1._)`continue`);
              if (itemTypes.length > 1)
                gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
              gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
                gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
                cxt.error();
                gen.assign(valid, false).break();
              }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
            });
          }
          function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
              cxt.error();
              gen.assign(valid, false).break(outer);
            })));
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/const.js
  var require_const = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: "must be equal to constant",
        params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
      };
      var def = {
        keyword: "const",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schemaCode, schema } = cxt;
          if ($data || schema && typeof schema == "object") {
            cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
          } else {
            cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/enum.js
  var require_enum = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: "must be equal to one of the allowed values",
        params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
      };
      var def = {
        keyword: "enum",
        schemaType: "array",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
          const useLoop = schema.length >= it.opts.loopEnum;
          let eql;
          const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
          let valid;
          if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
          } else {
            if (!Array.isArray(schema))
              throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
          }
          cxt.pass(valid);
          function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
          }
          function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/index.js
  var require_validation = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var limitNumber_1 = require_limitNumber();
      var multipleOf_1 = require_multipleOf();
      var limitLength_1 = require_limitLength();
      var pattern_1 = require_pattern();
      var limitProperties_1 = require_limitProperties();
      var required_1 = require_required();
      var limitItems_1 = require_limitItems();
      var uniqueItems_1 = require_uniqueItems();
      var const_1 = require_const();
      var enum_1 = require_enum();
      var validation = [
        // number
        limitNumber_1.default,
        multipleOf_1.default,
        // string
        limitLength_1.default,
        pattern_1.default,
        // object
        limitProperties_1.default,
        required_1.default,
        // array
        limitItems_1.default,
        uniqueItems_1.default,
        // any
        { keyword: "type", schemaType: ["string", "array"] },
        { keyword: "nullable", schemaType: "boolean" },
        const_1.default,
        enum_1.default
      ];
      exports.default = validation;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
  var require_additionalItems = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateAdditionalItems = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
        params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
      };
      var def = {
        keyword: "additionalItems",
        type: "array",
        schemaType: ["boolean", "object"],
        before: "uniqueItems",
        error,
        code(cxt) {
          const { parentSchema, it } = cxt;
          const { items } = parentSchema;
          if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
          }
          validateAdditionalItems(cxt, items);
        }
      };
      function validateAdditionalItems(cxt, items) {
        const { gen, schema, data, keyword, it } = cxt;
        it.items = true;
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        if (schema === false) {
          cxt.setParams({ len: items.length });
          cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
        } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
          const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
          gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
          cxt.ok(valid);
        }
        function validateItems(valid) {
          gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
              gen.if((0, codegen_1.not)(valid), () => gen.break());
          });
        }
      }
      exports.validateAdditionalItems = validateAdditionalItems;
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/items.js
  var require_items = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateTuple = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      var def = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "array", "boolean"],
        before: "uniqueItems",
        code(cxt) {
          const { schema, it } = cxt;
          if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
          it.items = true;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          cxt.ok((0, code_1.validateArray)(cxt));
        }
      };
      function validateTuple(cxt, extraItems, schArr = cxt.schema) {
        const { gen, parentSchema, data, keyword, it } = cxt;
        checkStrictTuple(parentSchema);
        if (it.opts.unevaluated && schArr.length && it.items !== true) {
          it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
        }
        const valid = gen.name("valid");
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        schArr.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i
          }, valid));
          cxt.ok(valid);
        });
        function checkStrictTuple(sch) {
          const { opts, errSchemaPath } = it;
          const l = schArr.length;
          const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
          if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
          }
        }
      }
      exports.validateTuple = validateTuple;
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
  var require_prefixItems = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var items_1 = require_items();
      var def = {
        keyword: "prefixItems",
        type: "array",
        schemaType: ["array"],
        before: "uniqueItems",
        code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/items2020.js
  var require_items2020 = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      var additionalItems_1 = require_additionalItems();
      var error = {
        message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
        params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
      };
      var def = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        error,
        code(cxt) {
          const { schema, parentSchema, it } = cxt;
          const { prefixItems } = parentSchema;
          it.items = true;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
          else
            cxt.ok((0, code_1.validateArray)(cxt));
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/contains.js
  var require_contains = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
        params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
      };
      var def = {
        keyword: "contains",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, data, it } = cxt;
          let min;
          let max;
          const { minContains, maxContains } = parentSchema;
          if (it.opts.next) {
            min = minContains === void 0 ? 1 : minContains;
            max = maxContains;
          } else {
            min = 1;
          }
          const len = gen.const("len", (0, codegen_1._)`${data}.length`);
          cxt.setParams({ min, max });
          if (max === void 0 && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
          }
          if (max !== void 0 && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
          }
          if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._)`${len} >= ${min}`;
            if (max !== void 0)
              cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
          }
          it.items = true;
          const valid = gen.name("valid");
          if (max === void 0 && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
          } else if (min === 0) {
            gen.let(valid, true);
            if (max !== void 0)
              gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
          } else {
            gen.let(valid, false);
            validateItemsWithCount();
          }
          cxt.result(valid, () => cxt.reset());
          function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
          }
          function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
              cxt.subschema({
                keyword: "contains",
                dataProp: i,
                dataPropType: util_1.Type.Num,
                compositeRule: true
              }, _valid);
              block();
            });
          }
          function checkLimits(count) {
            gen.code((0, codegen_1._)`${count}++`);
            if (max === void 0) {
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
            } else {
              gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
              if (min === 1)
                gen.assign(valid, true);
              else
                gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/dependencies.js
  var require_dependencies = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      exports.error = {
        message: ({ params: { property, depsCount, deps } }) => {
          const property_ies = depsCount === 1 ? "property" : "properties";
          return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
        },
        params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
        // TODO change to reference
      };
      var def = {
        keyword: "dependencies",
        type: "object",
        schemaType: "object",
        error: exports.error,
        code(cxt) {
          const [propDeps, schDeps] = splitDependencies(cxt);
          validatePropertyDeps(cxt, propDeps);
          validateSchemaDeps(cxt, schDeps);
        }
      };
      function splitDependencies({ schema }) {
        const propertyDeps = {};
        const schemaDeps = {};
        for (const key in schema) {
          if (key === "__proto__")
            continue;
          const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
          deps[key] = schema[key];
        }
        return [propertyDeps, schemaDeps];
      }
      function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
        const { gen, data, it } = cxt;
        if (Object.keys(propertyDeps).length === 0)
          return;
        const missing = gen.let("missing");
        for (const prop in propertyDeps) {
          const deps = propertyDeps[prop];
          if (deps.length === 0)
            continue;
          const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
          cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", ")
          });
          if (it.allErrors) {
            gen.if(hasProperty, () => {
              for (const depProp of deps) {
                (0, code_1.checkReportMissingProp)(cxt, depProp);
              }
            });
          } else {
            gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
      }
      exports.validatePropertyDeps = validatePropertyDeps;
      function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        for (const prop in schemaDeps) {
          if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
          gen.if(
            (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
            () => {
              const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
              cxt.mergeValidEvaluated(schCxt, valid);
            },
            () => gen.var(valid, true)
            // TODO var
          );
          cxt.ok(valid);
        }
      }
      exports.validateSchemaDeps = validateSchemaDeps;
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
  var require_propertyNames = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: "property name must be valid",
        params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
      };
      var def = {
        keyword: "propertyNames",
        type: "object",
        schemaType: ["object", "boolean"],
        error,
        code(cxt) {
          const { gen, schema, data, it } = cxt;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          const valid = gen.name("valid");
          gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
              keyword: "propertyNames",
              data: key,
              dataTypes: ["string"],
              propertyName: key,
              compositeRule: true
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error(true);
              if (!it.allErrors)
                gen.break();
            });
          });
          cxt.ok(valid);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
  var require_additionalProperties = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var util_1 = require_util();
      var error = {
        message: "must NOT have additional properties",
        params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
      };
      var def = {
        keyword: "additionalProperties",
        type: ["object"],
        schemaType: ["boolean", "object"],
        allowUndefined: true,
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, data, errsCount, it } = cxt;
          if (!errsCount)
            throw new Error("ajv implementation error");
          const { allErrors, opts } = it;
          it.props = true;
          if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
          const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
          const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
          checkAdditionalProperties();
          cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
          function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
              if (!props.length && !patProps.length)
                additionalPropertyCode(key);
              else
                gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
          }
          function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
              const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
              definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            } else if (props.length) {
              definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
            } else {
              definedProp = codegen_1.nil;
            }
            if (patProps.length) {
              definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
          }
          function deleteAdditional(key) {
            gen.code((0, codegen_1._)`delete ${data}[${key}]`);
          }
          function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
              deleteAdditional(key);
              return;
            }
            if (schema === false) {
              cxt.setParams({ additionalProperty: key });
              cxt.error();
              if (!allErrors)
                gen.break();
              return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
              const valid = gen.name("valid");
              if (opts.removeAdditional === "failing") {
                applyAdditionalSchema(key, valid, false);
                gen.if((0, codegen_1.not)(valid), () => {
                  cxt.reset();
                  deleteAdditional(key);
                });
              } else {
                applyAdditionalSchema(key, valid);
                if (!allErrors)
                  gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            }
          }
          function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
              keyword: "additionalProperties",
              dataProp: key,
              dataPropType: util_1.Type.Str
            };
            if (errors === false) {
              Object.assign(subschema, {
                compositeRule: true,
                createErrors: false,
                allErrors: false
              });
            }
            cxt.subschema(subschema, valid);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/properties.js
  var require_properties = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_1 = require_validate();
      var code_1 = require_code2();
      var util_1 = require_util();
      var additionalProperties_1 = require_additionalProperties();
      var def = {
        keyword: "properties",
        type: "object",
        schemaType: "object",
        code(cxt) {
          const { gen, schema, parentSchema, data, it } = cxt;
          if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
          }
          const allProps = (0, code_1.allSchemaProperties)(schema);
          for (const prop of allProps) {
            it.definedProperties.add(prop);
          }
          if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
          }
          const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
          if (properties.length === 0)
            return;
          const valid = gen.name("valid");
          for (const prop of properties) {
            if (hasDefault(prop)) {
              applyPropertySchema(prop);
            } else {
              gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
              applyPropertySchema(prop);
              if (!it.allErrors)
                gen.else().var(valid, true);
              gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
          }
          function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
          }
          function applyPropertySchema(prop) {
            cxt.subschema({
              keyword: "properties",
              schemaProp: prop,
              dataProp: prop
            }, valid);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
  var require_patternProperties = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var util_2 = require_util();
      var def = {
        keyword: "patternProperties",
        type: "object",
        schemaType: "object",
        code(cxt) {
          const { gen, schema, data, parentSchema, it } = cxt;
          const { opts } = it;
          const patterns = (0, code_1.allSchemaProperties)(schema);
          const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
          if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
            return;
          }
          const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
          const valid = gen.name("valid");
          if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
          }
          const { props } = it;
          validatePatternProperties();
          function validatePatternProperties() {
            for (const pat of patterns) {
              if (checkProperties)
                checkMatchingProperties(pat);
              if (it.allErrors) {
                validateProperties(pat);
              } else {
                gen.var(valid, true);
                validateProperties(pat);
                gen.if(valid);
              }
            }
          }
          function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
              if (new RegExp(pat).test(prop)) {
                (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
              }
            }
          }
          function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
              gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                const alwaysValid = alwaysValidPatterns.includes(pat);
                if (!alwaysValid) {
                  cxt.subschema({
                    keyword: "patternProperties",
                    schemaProp: pat,
                    dataProp: key,
                    dataPropType: util_2.Type.Str
                  }, valid);
                }
                if (it.opts.unevaluated && props !== true) {
                  gen.assign((0, codegen_1._)`${props}[${key}]`, true);
                } else if (!alwaysValid && !it.allErrors) {
                  gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
              });
            });
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/not.js
  var require_not = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: "not",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        code(cxt) {
          const { gen, schema, it } = cxt;
          if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
          }
          const valid = gen.name("valid");
          cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, valid);
          cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
        },
        error: { message: "must NOT be valid" }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/anyOf.js
  var require_anyOf = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var def = {
        keyword: "anyOf",
        schemaType: "array",
        trackErrors: true,
        code: code_1.validateUnion,
        error: { message: "must match a schema in anyOf" }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/oneOf.js
  var require_oneOf = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: "must match exactly one schema in oneOf",
        params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
      };
      var def = {
        keyword: "oneOf",
        schemaType: "array",
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, it } = cxt;
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          if (it.opts.discriminator && parentSchema.discriminator)
            return;
          const schArr = schema;
          const valid = gen.let("valid", false);
          const passing = gen.let("passing", null);
          const schValid = gen.name("_valid");
          cxt.setParams({ passing });
          gen.block(validateOneOf);
          cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
          function validateOneOf() {
            schArr.forEach((sch, i) => {
              let schCxt;
              if ((0, util_1.alwaysValidSchema)(it, sch)) {
                gen.var(schValid, true);
              } else {
                schCxt = cxt.subschema({
                  keyword: "oneOf",
                  schemaProp: i,
                  compositeRule: true
                }, schValid);
              }
              if (i > 0) {
                gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
              }
              gen.if(schValid, () => {
                gen.assign(valid, true);
                gen.assign(passing, i);
                if (schCxt)
                  cxt.mergeEvaluated(schCxt, codegen_1.Name);
              });
            });
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/allOf.js
  var require_allOf = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: "allOf",
        schemaType: "array",
        code(cxt) {
          const { gen, schema, it } = cxt;
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const valid = gen.name("valid");
          schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
              return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
          });
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/if.js
  var require_if = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
        params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
      };
      var def = {
        keyword: "if",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, parentSchema, it } = cxt;
          if (parentSchema.then === void 0 && parentSchema.else === void 0) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
          }
          const hasThen = hasSchema(it, "then");
          const hasElse = hasSchema(it, "else");
          if (!hasThen && !hasElse)
            return;
          const valid = gen.let("valid", true);
          const schValid = gen.name("_valid");
          validateIf();
          cxt.reset();
          if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
          } else if (hasThen) {
            gen.if(schValid, validateClause("then"));
          } else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
          }
          cxt.pass(valid, () => cxt.error(true));
          function validateIf() {
            const schCxt = cxt.subschema({
              keyword: "if",
              compositeRule: true,
              createErrors: false,
              allErrors: false
            }, schValid);
            cxt.mergeEvaluated(schCxt);
          }
          function validateClause(keyword, ifClause) {
            return () => {
              const schCxt = cxt.subschema({ keyword }, schValid);
              gen.assign(valid, schValid);
              cxt.mergeValidEvaluated(schCxt, valid);
              if (ifClause)
                gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
              else
                cxt.setParams({ ifClause: keyword });
            };
          }
        }
      };
      function hasSchema(it, keyword) {
        const schema = it.schema[keyword];
        return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
      }
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/thenElse.js
  var require_thenElse = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: ["then", "else"],
        schemaType: ["object", "boolean"],
        code({ keyword, parentSchema, it }) {
          if (parentSchema.if === void 0)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/index.js
  var require_applicator = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var additionalItems_1 = require_additionalItems();
      var prefixItems_1 = require_prefixItems();
      var items_1 = require_items();
      var items2020_1 = require_items2020();
      var contains_1 = require_contains();
      var dependencies_1 = require_dependencies();
      var propertyNames_1 = require_propertyNames();
      var additionalProperties_1 = require_additionalProperties();
      var properties_1 = require_properties();
      var patternProperties_1 = require_patternProperties();
      var not_1 = require_not();
      var anyOf_1 = require_anyOf();
      var oneOf_1 = require_oneOf();
      var allOf_1 = require_allOf();
      var if_1 = require_if();
      var thenElse_1 = require_thenElse();
      function getApplicator(draft2020 = false) {
        const applicator = [
          // any
          not_1.default,
          anyOf_1.default,
          oneOf_1.default,
          allOf_1.default,
          if_1.default,
          thenElse_1.default,
          // object
          propertyNames_1.default,
          additionalProperties_1.default,
          dependencies_1.default,
          properties_1.default,
          patternProperties_1.default
        ];
        if (draft2020)
          applicator.push(prefixItems_1.default, items2020_1.default);
        else
          applicator.push(additionalItems_1.default, items_1.default);
        applicator.push(contains_1.default);
        return applicator;
      }
      exports.default = getApplicator;
    }
  });

  // node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js
  var require_dynamicAnchor = __commonJS({
    "node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.dynamicAnchor = void 0;
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var compile_1 = require_compile();
      var ref_1 = require_ref();
      var def = {
        keyword: "$dynamicAnchor",
        schemaType: "string",
        code: (cxt) => dynamicAnchor(cxt, cxt.schema)
      };
      function dynamicAnchor(cxt, anchor) {
        const { gen, it } = cxt;
        it.schemaEnv.root.dynamicAnchors[anchor] = true;
        const v = (0, codegen_1._)`${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`;
        const validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
        gen.if((0, codegen_1._)`!${v}`, () => gen.assign(v, validate));
      }
      exports.dynamicAnchor = dynamicAnchor;
      function _getValidate(cxt) {
        const { schemaEnv, schema, self: self2 } = cxt.it;
        const { root, baseId, localRefs, meta } = schemaEnv.root;
        const { schemaId } = self2.opts;
        const sch = new compile_1.SchemaEnv({ schema, schemaId, root, baseId, localRefs, meta });
        compile_1.compileSchema.call(self2, sch);
        return (0, ref_1.getValidate)(cxt, sch);
      }
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js
  var require_dynamicRef = __commonJS({
    "node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.dynamicRef = void 0;
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var ref_1 = require_ref();
      var def = {
        keyword: "$dynamicRef",
        schemaType: "string",
        code: (cxt) => dynamicRef(cxt, cxt.schema)
      };
      function dynamicRef(cxt, ref) {
        const { gen, keyword, it } = cxt;
        if (ref[0] !== "#")
          throw new Error(`"${keyword}" only supports hash fragment reference`);
        const anchor = ref.slice(1);
        if (it.allErrors) {
          _dynamicRef();
        } else {
          const valid = gen.let("valid", false);
          _dynamicRef(valid);
          cxt.ok(valid);
        }
        function _dynamicRef(valid) {
          if (it.schemaEnv.root.dynamicAnchors[anchor]) {
            const v = gen.let("_v", (0, codegen_1._)`${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`);
            gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
          } else {
            _callRef(it.validateName, valid)();
          }
        }
        function _callRef(validate, valid) {
          return valid ? () => gen.block(() => {
            (0, ref_1.callRef)(cxt, validate);
            gen.let(valid, true);
          }) : () => (0, ref_1.callRef)(cxt, validate);
        }
      }
      exports.dynamicRef = dynamicRef;
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js
  var require_recursiveAnchor = __commonJS({
    "node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dynamicAnchor_1 = require_dynamicAnchor();
      var util_1 = require_util();
      var def = {
        keyword: "$recursiveAnchor",
        schemaType: "boolean",
        code(cxt) {
          if (cxt.schema)
            (0, dynamicAnchor_1.dynamicAnchor)(cxt, "");
          else
            (0, util_1.checkStrictMode)(cxt.it, "$recursiveAnchor: false is ignored");
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js
  var require_recursiveRef = __commonJS({
    "node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dynamicRef_1 = require_dynamicRef();
      var def = {
        keyword: "$recursiveRef",
        schemaType: "string",
        code: (cxt) => (0, dynamicRef_1.dynamicRef)(cxt, cxt.schema)
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/dynamic/index.js
  var require_dynamic = __commonJS({
    "node_modules/ajv/dist/vocabularies/dynamic/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dynamicAnchor_1 = require_dynamicAnchor();
      var dynamicRef_1 = require_dynamicRef();
      var recursiveAnchor_1 = require_recursiveAnchor();
      var recursiveRef_1 = require_recursiveRef();
      var dynamic = [dynamicAnchor_1.default, dynamicRef_1.default, recursiveAnchor_1.default, recursiveRef_1.default];
      exports.default = dynamic;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/dependentRequired.js
  var require_dependentRequired = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/dependentRequired.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dependencies_1 = require_dependencies();
      var def = {
        keyword: "dependentRequired",
        type: "object",
        schemaType: "object",
        error: dependencies_1.error,
        code: (cxt) => (0, dependencies_1.validatePropertyDeps)(cxt)
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js
  var require_dependentSchemas = __commonJS({
    "node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dependencies_1 = require_dependencies();
      var def = {
        keyword: "dependentSchemas",
        type: "object",
        schemaType: "object",
        code: (cxt) => (0, dependencies_1.validateSchemaDeps)(cxt)
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/validation/limitContains.js
  var require_limitContains = __commonJS({
    "node_modules/ajv/dist/vocabularies/validation/limitContains.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: ["maxContains", "minContains"],
        type: "array",
        schemaType: "number",
        code({ keyword, parentSchema, it }) {
          if (parentSchema.contains === void 0) {
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "contains" is ignored`);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/next.js
  var require_next = __commonJS({
    "node_modules/ajv/dist/vocabularies/next.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var dependentRequired_1 = require_dependentRequired();
      var dependentSchemas_1 = require_dependentSchemas();
      var limitContains_1 = require_limitContains();
      var next = [dependentRequired_1.default, dependentSchemas_1.default, limitContains_1.default];
      exports.default = next;
    }
  });

  // node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js
  var require_unevaluatedProperties = __commonJS({
    "node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var names_1 = require_names();
      var error = {
        message: "must NOT have unevaluated properties",
        params: ({ params }) => (0, codegen_1._)`{unevaluatedProperty: ${params.unevaluatedProperty}}`
      };
      var def = {
        keyword: "unevaluatedProperties",
        type: "object",
        schemaType: ["boolean", "object"],
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, data, errsCount, it } = cxt;
          if (!errsCount)
            throw new Error("ajv implementation error");
          const { allErrors, props } = it;
          if (props instanceof codegen_1.Name) {
            gen.if((0, codegen_1._)`${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key))));
          } else if (props !== true) {
            gen.forIn("key", data, (key) => props === void 0 ? unevaluatedPropCode(key) : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key)));
          }
          it.props = true;
          cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
          function unevaluatedPropCode(key) {
            if (schema === false) {
              cxt.setParams({ unevaluatedProperty: key });
              cxt.error();
              if (!allErrors)
                gen.break();
              return;
            }
            if (!(0, util_1.alwaysValidSchema)(it, schema)) {
              const valid = gen.name("valid");
              cxt.subschema({
                keyword: "unevaluatedProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str
              }, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
          function unevaluatedDynamic(evaluatedProps, key) {
            return (0, codegen_1._)`!${evaluatedProps} || !${evaluatedProps}[${key}]`;
          }
          function unevaluatedStatic(evaluatedProps, key) {
            const ps = [];
            for (const p in evaluatedProps) {
              if (evaluatedProps[p] === true)
                ps.push((0, codegen_1._)`${key} !== ${p}`);
            }
            return (0, codegen_1.and)(...ps);
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js
  var require_unevaluatedItems = __commonJS({
    "node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
        params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
      };
      var def = {
        keyword: "unevaluatedItems",
        type: "array",
        schemaType: ["boolean", "object"],
        error,
        code(cxt) {
          const { gen, schema, data, it } = cxt;
          const items = it.items || 0;
          if (items === true)
            return;
          const len = gen.const("len", (0, codegen_1._)`${data}.length`);
          if (schema === false) {
            cxt.setParams({ len: items });
            cxt.fail((0, codegen_1._)`${len} > ${items}`);
          } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items}`);
            gen.if((0, codegen_1.not)(valid), () => validateItems(valid, items));
            cxt.ok(valid);
          }
          it.items = true;
          function validateItems(valid, from) {
            gen.forRange("i", from, len, (i) => {
              cxt.subschema({ keyword: "unevaluatedItems", dataProp: i, dataPropType: util_1.Type.Num }, valid);
              if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            });
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/unevaluated/index.js
  var require_unevaluated = __commonJS({
    "node_modules/ajv/dist/vocabularies/unevaluated/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var unevaluatedProperties_1 = require_unevaluatedProperties();
      var unevaluatedItems_1 = require_unevaluatedItems();
      var unevaluated = [unevaluatedProperties_1.default, unevaluatedItems_1.default];
      exports.default = unevaluated;
    }
  });

  // node_modules/ajv/dist/vocabularies/format/format.js
  var require_format = __commonJS({
    "node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
        params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
      };
      var def = {
        keyword: "format",
        type: ["number", "string"],
        schemaType: "string",
        $data: true,
        error,
        code(cxt, ruleType) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
          if (!opts.validateFormats)
            return;
          if ($data)
            validate$DataFormat();
          else
            validateFormat();
          function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
              ref: self2.formats,
              code: opts.code.formats
            });
            const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
              if (opts.strictSchema === false)
                return codegen_1.nil;
              return (0, codegen_1._)`${schemaCode} && !${format}`;
            }
            function invalidFmt() {
              const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
              const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
              return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
          }
          function validateFormat() {
            const formatDef = self2.formats[schema];
            if (!formatDef) {
              unknownFormat();
              return;
            }
            if (formatDef === true)
              return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
              cxt.pass(validCondition());
            function unknownFormat() {
              if (opts.strictSchema === false) {
                self2.logger.warn(unknownMsg());
                return;
              }
              throw new Error(unknownMsg());
              function unknownMsg() {
                return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
              }
            }
            function getFormat(fmtDef) {
              const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
              const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
              if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
              }
              return ["string", fmtDef, fmt];
            }
            function validCondition() {
              if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                if (!schemaEnv.$async)
                  throw new Error("async format in sync schema");
                return (0, codegen_1._)`await ${fmtRef}(${data})`;
              }
              return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/vocabularies/format/index.js
  var require_format2 = __commonJS({
    "node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var format_1 = require_format();
      var format = [format_1.default];
      exports.default = format;
    }
  });

  // node_modules/ajv/dist/vocabularies/metadata.js
  var require_metadata = __commonJS({
    "node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.contentVocabulary = exports.metadataVocabulary = void 0;
      exports.metadataVocabulary = [
        "title",
        "description",
        "default",
        "deprecated",
        "readOnly",
        "writeOnly",
        "examples"
      ];
      exports.contentVocabulary = [
        "contentMediaType",
        "contentEncoding",
        "contentSchema"
      ];
    }
  });

  // node_modules/ajv/dist/vocabularies/draft2020.js
  var require_draft2020 = __commonJS({
    "node_modules/ajv/dist/vocabularies/draft2020.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core_1 = require_core2();
      var validation_1 = require_validation();
      var applicator_1 = require_applicator();
      var dynamic_1 = require_dynamic();
      var next_1 = require_next();
      var unevaluated_1 = require_unevaluated();
      var format_1 = require_format2();
      var metadata_1 = require_metadata();
      var draft2020Vocabularies = [
        dynamic_1.default,
        core_1.default,
        validation_1.default,
        (0, applicator_1.default)(true),
        format_1.default,
        metadata_1.metadataVocabulary,
        metadata_1.contentVocabulary,
        next_1.default,
        unevaluated_1.default
      ];
      exports.default = draft2020Vocabularies;
    }
  });

  // node_modules/ajv/dist/vocabularies/discriminator/types.js
  var require_types = __commonJS({
    "node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiscrError = void 0;
      var DiscrError;
      (function(DiscrError2) {
        DiscrError2["Tag"] = "tag";
        DiscrError2["Mapping"] = "mapping";
      })(DiscrError || (exports.DiscrError = DiscrError = {}));
    }
  });

  // node_modules/ajv/dist/vocabularies/discriminator/index.js
  var require_discriminator = __commonJS({
    "node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var types_1 = require_types();
      var compile_1 = require_compile();
      var ref_error_1 = require_ref_error();
      var util_1 = require_util();
      var error = {
        message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
        params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
      };
      var def = {
        keyword: "discriminator",
        type: "object",
        schemaType: "object",
        error,
        code(cxt) {
          const { gen, data, schema, parentSchema, it } = cxt;
          const { oneOf } = parentSchema;
          if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
          }
          const tagName = schema.propertyName;
          if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
          if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
          if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
          const valid = gen.let("valid", false);
          const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
          gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
          cxt.ok(valid);
          function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
              gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
              gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
          }
          function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
          }
          function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
              let sch = oneOf[i];
              if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                const ref = sch.$ref;
                sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
                if (sch instanceof compile_1.SchemaEnv)
                  sch = sch.schema;
                if (sch === void 0)
                  throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
              }
              const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
              if (typeof propSch != "object") {
                throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
              }
              tagRequired = tagRequired && (topRequired || hasRequired(sch));
              addMappings(propSch, i);
            }
            if (!tagRequired)
              throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
              return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
              if (sch.const) {
                addMapping(sch.const, i);
              } else if (sch.enum) {
                for (const tagValue of sch.enum) {
                  addMapping(tagValue, i);
                }
              } else {
                throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
              }
            }
            function addMapping(tagValue, i) {
              if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                throw new Error(`discriminator: "${tagName}" values must be unique strings`);
              }
              oneOfMapping[tagValue] = i;
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/schema.json
  var require_schema = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/schema.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/schema",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/core": true,
          "https://json-schema.org/draft/2020-12/vocab/applicator": true,
          "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
          "https://json-schema.org/draft/2020-12/vocab/validation": true,
          "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
          "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
          "https://json-schema.org/draft/2020-12/vocab/content": true
        },
        $dynamicAnchor: "meta",
        title: "Core and Validation specifications meta-schema",
        allOf: [
          { $ref: "meta/core" },
          { $ref: "meta/applicator" },
          { $ref: "meta/unevaluated" },
          { $ref: "meta/validation" },
          { $ref: "meta/meta-data" },
          { $ref: "meta/format-annotation" },
          { $ref: "meta/content" }
        ],
        type: ["object", "boolean"],
        $comment: "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",
        properties: {
          definitions: {
            $comment: '"definitions" has been replaced by "$defs".',
            type: "object",
            additionalProperties: { $dynamicRef: "#meta" },
            deprecated: true,
            default: {}
          },
          dependencies: {
            $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
            type: "object",
            additionalProperties: {
              anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }]
            },
            deprecated: true,
            default: {}
          },
          $recursiveAnchor: {
            $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
            $ref: "meta/core#/$defs/anchorString",
            deprecated: true
          },
          $recursiveRef: {
            $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
            $ref: "meta/core#/$defs/uriReferenceString",
            deprecated: true
          }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json
  var require_applicator2 = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/applicator",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/applicator": true
        },
        $dynamicAnchor: "meta",
        title: "Applicator vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          prefixItems: { $ref: "#/$defs/schemaArray" },
          items: { $dynamicRef: "#meta" },
          contains: { $dynamicRef: "#meta" },
          additionalProperties: { $dynamicRef: "#meta" },
          properties: {
            type: "object",
            additionalProperties: { $dynamicRef: "#meta" },
            default: {}
          },
          patternProperties: {
            type: "object",
            additionalProperties: { $dynamicRef: "#meta" },
            propertyNames: { format: "regex" },
            default: {}
          },
          dependentSchemas: {
            type: "object",
            additionalProperties: { $dynamicRef: "#meta" },
            default: {}
          },
          propertyNames: { $dynamicRef: "#meta" },
          if: { $dynamicRef: "#meta" },
          then: { $dynamicRef: "#meta" },
          else: { $dynamicRef: "#meta" },
          allOf: { $ref: "#/$defs/schemaArray" },
          anyOf: { $ref: "#/$defs/schemaArray" },
          oneOf: { $ref: "#/$defs/schemaArray" },
          not: { $dynamicRef: "#meta" }
        },
        $defs: {
          schemaArray: {
            type: "array",
            minItems: 1,
            items: { $dynamicRef: "#meta" }
          }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json
  var require_unevaluated2 = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/unevaluated",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/unevaluated": true
        },
        $dynamicAnchor: "meta",
        title: "Unevaluated applicator vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          unevaluatedItems: { $dynamicRef: "#meta" },
          unevaluatedProperties: { $dynamicRef: "#meta" }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json
  var require_content = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/content",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/content": true
        },
        $dynamicAnchor: "meta",
        title: "Content vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          contentEncoding: { type: "string" },
          contentMediaType: { type: "string" },
          contentSchema: { $dynamicRef: "#meta" }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json
  var require_core3 = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/core",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/core": true
        },
        $dynamicAnchor: "meta",
        title: "Core vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          $id: {
            $ref: "#/$defs/uriReferenceString",
            $comment: "Non-empty fragments not allowed.",
            pattern: "^[^#]*#?$"
          },
          $schema: { $ref: "#/$defs/uriString" },
          $ref: { $ref: "#/$defs/uriReferenceString" },
          $anchor: { $ref: "#/$defs/anchorString" },
          $dynamicRef: { $ref: "#/$defs/uriReferenceString" },
          $dynamicAnchor: { $ref: "#/$defs/anchorString" },
          $vocabulary: {
            type: "object",
            propertyNames: { $ref: "#/$defs/uriString" },
            additionalProperties: {
              type: "boolean"
            }
          },
          $comment: {
            type: "string"
          },
          $defs: {
            type: "object",
            additionalProperties: { $dynamicRef: "#meta" }
          }
        },
        $defs: {
          anchorString: {
            type: "string",
            pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
          },
          uriString: {
            type: "string",
            format: "uri"
          },
          uriReferenceString: {
            type: "string",
            format: "uri-reference"
          }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json
  var require_format_annotation = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/format-annotation",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/format-annotation": true
        },
        $dynamicAnchor: "meta",
        title: "Format vocabulary meta-schema for annotation results",
        type: ["object", "boolean"],
        properties: {
          format: { type: "string" }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json
  var require_meta_data = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/meta-data",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/meta-data": true
        },
        $dynamicAnchor: "meta",
        title: "Meta-data vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          default: true,
          deprecated: {
            type: "boolean",
            default: false
          },
          readOnly: {
            type: "boolean",
            default: false
          },
          writeOnly: {
            type: "boolean",
            default: false
          },
          examples: {
            type: "array",
            items: true
          }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json
  var require_validation2 = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://json-schema.org/draft/2020-12/meta/validation",
        $vocabulary: {
          "https://json-schema.org/draft/2020-12/vocab/validation": true
        },
        $dynamicAnchor: "meta",
        title: "Validation vocabulary meta-schema",
        type: ["object", "boolean"],
        properties: {
          type: {
            anyOf: [
              { $ref: "#/$defs/simpleTypes" },
              {
                type: "array",
                items: { $ref: "#/$defs/simpleTypes" },
                minItems: 1,
                uniqueItems: true
              }
            ]
          },
          const: true,
          enum: {
            type: "array",
            items: true
          },
          multipleOf: {
            type: "number",
            exclusiveMinimum: 0
          },
          maximum: {
            type: "number"
          },
          exclusiveMaximum: {
            type: "number"
          },
          minimum: {
            type: "number"
          },
          exclusiveMinimum: {
            type: "number"
          },
          maxLength: { $ref: "#/$defs/nonNegativeInteger" },
          minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
          pattern: {
            type: "string",
            format: "regex"
          },
          maxItems: { $ref: "#/$defs/nonNegativeInteger" },
          minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
          uniqueItems: {
            type: "boolean",
            default: false
          },
          maxContains: { $ref: "#/$defs/nonNegativeInteger" },
          minContains: {
            $ref: "#/$defs/nonNegativeInteger",
            default: 1
          },
          maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
          minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
          required: { $ref: "#/$defs/stringArray" },
          dependentRequired: {
            type: "object",
            additionalProperties: {
              $ref: "#/$defs/stringArray"
            }
          }
        },
        $defs: {
          nonNegativeInteger: {
            type: "integer",
            minimum: 0
          },
          nonNegativeIntegerDefault0: {
            $ref: "#/$defs/nonNegativeInteger",
            default: 0
          },
          simpleTypes: {
            enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
          },
          stringArray: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            default: []
          }
        }
      };
    }
  });

  // node_modules/ajv/dist/refs/json-schema-2020-12/index.js
  var require_json_schema_2020_12 = __commonJS({
    "node_modules/ajv/dist/refs/json-schema-2020-12/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var metaSchema = require_schema();
      var applicator = require_applicator2();
      var unevaluated = require_unevaluated2();
      var content = require_content();
      var core = require_core3();
      var format = require_format_annotation();
      var metadata = require_meta_data();
      var validation = require_validation2();
      var META_SUPPORT_DATA = ["/properties"];
      function addMetaSchema2020($data) {
        ;
        [
          metaSchema,
          applicator,
          unevaluated,
          content,
          core,
          with$data(this, format),
          metadata,
          with$data(this, validation)
        ].forEach((sch) => this.addMetaSchema(sch, void 0, false));
        return this;
        function with$data(ajv, sch) {
          return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
        }
      }
      exports.default = addMetaSchema2020;
    }
  });

  // node_modules/ajv/dist/2020.js
  var require__ = __commonJS({
    "node_modules/ajv/dist/2020.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv2020 = void 0;
      var core_1 = require_core();
      var draft2020_1 = require_draft2020();
      var discriminator_1 = require_discriminator();
      var json_schema_2020_12_1 = require_json_schema_2020_12();
      var META_SCHEMA_ID = "https://json-schema.org/draft/2020-12/schema";
      var Ajv2020 = class extends core_1.default {
        constructor(opts = {}) {
          super({
            ...opts,
            dynamicRef: true,
            next: true,
            unevaluated: true
          });
        }
        _addVocabularies() {
          super._addVocabularies();
          draft2020_1.default.forEach((v) => this.addVocabulary(v));
          if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
        }
        _addDefaultMetaSchema() {
          super._addDefaultMetaSchema();
          const { $data, meta } = this.opts;
          if (!meta)
            return;
          json_schema_2020_12_1.default.call(this, $data);
          this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
        }
        defaultMeta() {
          return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
        }
      };
      exports.Ajv2020 = Ajv2020;
      module.exports = exports = Ajv2020;
      module.exports.Ajv2020 = Ajv2020;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = Ajv2020;
      var validate_1 = require_validate();
      Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
        return validate_1.KeywordCxt;
      } });
      var codegen_1 = require_codegen();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return codegen_1._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return codegen_1.str;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return codegen_1.stringify;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return codegen_1.nil;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return codegen_1.Name;
      } });
      Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
        return codegen_1.CodeGen;
      } });
      var validation_error_1 = require_validation_error();
      Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
        return validation_error_1.default;
      } });
      var ref_error_1 = require_ref_error();
      Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
        return ref_error_1.default;
      } });
    }
  });

  // schema/drumdrom.schema.json
  var require_drumdrom_schema = __commonJS({
    "schema/drumdrom.schema.json"(exports, module) {
      module.exports = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://github.com/morganp/drumdrom/schema/drumdrom.schema.json",
        title: "DrumDrom pattern",
        description: "Structural rules for a drumdrom version 1 file. The wave alphabet, bar lengths, kit lookups and cross-lane rules are enforced by the semantic validator in lib/validate.js and documented in docs/spec.md.",
        type: "object",
        required: ["format", "version", "lanes"],
        additionalProperties: false,
        properties: {
          format: { const: "drumdrom" },
          version: { const: 1 },
          name: { type: "string" },
          subtitle: { type: "string" },
          tempo: { type: "number", minimum: 20, maximum: 400 },
          time: {
            type: "array",
            prefixItems: [
              { type: "integer", minimum: 1, maximum: 32 },
              { enum: [1, 2, 4, 8, 16, 32] }
            ],
            items: false,
            minItems: 2,
            default: [4, 4]
          },
          steps_per_beat: { type: "integer", minimum: 1, maximum: 12, default: 4 },
          kit: {
            type: "object",
            propertyNames: { $ref: "#/$defs/id" },
            additionalProperties: { $ref: "#/$defs/kit_entry" }
          },
          lanes: {
            type: "array",
            minItems: 1,
            items: { $ref: "#/$defs/lane" }
          },
          config: { $ref: "#/$defs/config" },
          sections: false
        },
        $defs: {
          id: { type: "string", pattern: "^[a-z][a-z0-9_]{0,15}$" },
          kit_entry: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string", minLength: 1 },
              gm: { type: "integer", minimum: 0, maximum: 127 },
              staff: { type: "integer", minimum: -6, maximum: 14 },
              head: { enum: ["normal", "x", "x_open", "diamond"] }
            }
          },
          lane: {
            type: "object",
            required: ["id", "wave"],
            additionalProperties: false,
            properties: {
              id: { $ref: "#/$defs/id" },
              wave: { type: "string", minLength: 1 },
              name: { type: "string", minLength: 1 },
              staff: { type: "integer", minimum: -6, maximum: 14 }
            }
          },
          config: {
            type: "object",
            properties: {
              skin: { type: "string" },
              bars_per_row: { type: "integer", minimum: 1, maximum: 16 },
              voices: { enum: [1, 2] }
            },
            additionalProperties: { type: ["number", "string", "boolean"] }
          }
        }
      };
    }
  });

  // lib/kit.js
  var require_kit = __commonJS({
    "lib/kit.js"(exports, module) {
      "use strict";
      var kit = {
        cr: { name: "Crash", gm: 49, staff: 10, head: "x" },
        rd: { name: "Ride", gm: 51, staff: 8, head: "x" },
        hh: { name: "Closed hi-hat", gm: 42, staff: 9, head: "x" },
        ho: { name: "Open hi-hat", gm: 46, staff: 9, head: "x_open" },
        hp: { name: "Pedal hi-hat", gm: 44, staff: -1, head: "x" },
        sd: { name: "Snare", gm: 38, staff: 5, head: "normal" },
        rs: { name: "Rimshot", gm: 40, staff: 5, head: "normal" },
        cs: { name: "Cross stick", gm: 37, staff: 5, head: "x" },
        t1: { name: "Hi tom", gm: 50, staff: 7, head: "normal" },
        t2: { name: "Lo tom", gm: 47, staff: 6, head: "normal" },
        t3: { name: "Floor tom", gm: 43, staff: 3, head: "normal" },
        bd: { name: "Bass drum", gm: 36, staff: 1, head: "normal" }
      };
      var order = Object.keys(kit);
      function resolveKit(custom) {
        const out = {};
        Object.keys(kit).forEach((id) => {
          out[id] = { ...kit[id] };
        });
        Object.keys(custom || {}).forEach((id) => {
          out[id] = { head: "normal", ...out[id], ...custom[id] };
        });
        return out;
      }
      module.exports = { kit, order, resolveKit };
    }
  });

  // lib/wave.js
  var require_wave = __commonJS({
    "lib/wave.js"(exports, module) {
      "use strict";
      var symbols = {
        ".": null,
        "-": null,
        x: { accent: "normal" },
        X: { accent: "accent" },
        o: { accent: "ghost" },
        O: { accent: "normal", articulation: "open" },
        f: { accent: "normal", articulation: "flam" }
      };
      var reserved = {
        r: "roll",
        b: "buzz",
        d: "drag",
        "^": "choke"
      };
      "123456789".split("").forEach((c) => {
        reserved[c] = "velocity digit";
      });
      var BAR = "|";
      function scan(wave) {
        const steps = [];
        const segments = [];
        let current = 0;
        let segStart = 0;
        for (let i = 0; i < wave.length; i++) {
          if (wave[i] === BAR) {
            segments.push({ start: segStart, steps: current });
            current = 0;
            segStart = i + 1;
          } else {
            steps.push({ char: wave[i], index: i });
            current++;
          }
        }
        segments.push({ start: segStart, steps: current });
        const hasBars = wave.indexOf(BAR) >= 0;
        if (hasBars) {
          if (segments[0].steps === 0 && segments.length > 1) segments.shift();
          if (segments[segments.length - 1].steps === 0 && segments.length > 1) segments.pop();
        }
        return { steps, segments, hasBars };
      }
      module.exports = { symbols, reserved, scan, BAR };
    }
  });

  // lib/locate.js
  var require_locate = __commonJS({
    "lib/locate.js"(exports, module) {
      "use strict";
      function buildLocator(text) {
        const values = /* @__PURE__ */ new Map();
        const keys = /* @__PURE__ */ new Map();
        let i = 0;
        function skip() {
          for (; ; ) {
            const c = text[i];
            if (c === void 0) return;
            if (/\s/.test(c) || c === "\uFEFF") {
              i++;
            } else if (c === "/" && text[i + 1] === "/") {
              while (i < text.length && text[i] !== "\n") i++;
            } else if (c === "/" && text[i + 1] === "*") {
              const end = text.indexOf("*/", i + 2);
              i = end < 0 ? text.length : end + 2;
            } else {
              return;
            }
          }
        }
        function readString() {
          const q = text[i++];
          while (i < text.length && text[i] !== q) i += text[i] === "\\" ? 2 : 1;
          i++;
        }
        function readKey() {
          const c = text[i];
          if (c === '"' || c === "'") {
            const start = i;
            readString();
            return text.slice(start + 1, i - 1);
          }
          const m = /^[^\s:/]+/.exec(text.slice(i));
          i += m ? m[0].length : 1;
          return m ? m[0] : "";
        }
        function value(path) {
          skip();
          values.set(path.join("\0"), i);
          const c = text[i];
          if (c === "{") {
            i++;
            for (; ; ) {
              skip();
              if (text[i] === "}" || i >= text.length) {
                i++;
                return;
              }
              const at = i;
              const k = readKey();
              keys.set(path.concat(k).join("\0"), at);
              skip();
              i++;
              value(path.concat(k));
              skip();
              if (text[i] === ",") i++;
            }
          } else if (c === "[") {
            i++;
            for (let n = 0; ; n++) {
              skip();
              if (text[i] === "]" || i >= text.length) {
                i++;
                return;
              }
              value(path.concat(n));
              skip();
              if (text[i] === ",") i++;
            }
          } else if (c === '"' || c === "'") {
            readString();
          } else {
            while (i < text.length && !/[\s,\]}]/.test(text[i]) && !(text[i] === "/" && (text[i + 1] === "/" || text[i + 1] === "*"))) i++;
          }
        }
        value([]);
        function position(offset) {
          const before = text.slice(0, offset);
          const line = before.split("\n").length;
          return { line, column: offset - before.lastIndexOf("\n") };
        }
        return function locate(path, wantKey, index) {
          const id = path.join("\0");
          let offset = wantKey && keys.has(id) ? keys.get(id) : values.get(id);
          if (offset === void 0) {
            const parent = path.slice(0, -1).join("\0");
            offset = keys.has(id) ? keys.get(id) : values.get(parent);
          }
          if (offset === void 0) return {};
          if (index !== void 0 && !wantKey) offset += 1 + index;
          return position(offset);
        };
      }
      module.exports = buildLocator;
    }
  });

  // skins/default.js
  var require_default = __commonJS({
    "skins/default.js"(exports, module) {
      "use strict";
      module.exports = {
        default: {
          bg_color: "#ffffff",
          text_color: "#222222",
          title_color: "#222222",
          subtitle_color: "#666666",
          label_color: "#333333",
          count_color: "#888888",
          count_beat_color: "#333333",
          grid_color: "#e2e2e2",
          beat_color: "#bdbdbd",
          bar_color: "#333333",
          mark_color: "#222222",
          accent_color: "#d9381e",
          ghost_color: "#8a8a8a",
          font_family: "Helvetica, Arial, sans-serif",
          title_size: 18,
          subtitle_size: 12,
          tempo_size: 12,
          label_size: 12,
          count_size: 11,
          cell_w: 24,
          row_h: 30,
          label_w: 104,
          count_h: 22,
          mark_r: 6,
          accent_scale: 1.3,
          ghost_scale: 0.75,
          flam_scale: 0.6,
          mark_stroke: 2,
          grid_width: 1,
          beat_width: 1,
          bar_width: 2,
          margin_left: 16,
          margin_right: 16,
          margin_top: 16,
          margin_bottom: 16,
          title_gap: 10,
          row_gap: 20,
          bars_per_row: 2,
          staff_color: "#444444",
          ink_color: "#1a1a1a",
          staff_space: 9,
          staff_line_w: 0.13,
          ledger_w: 0.16,
          stem_w: 0.12,
          beam_w: 0.5,
          barline_w: 0.16,
          final_barline_w: 0.5,
          open_w: 0.14,
          slot_w: 3.4,
          beat_min_w: 8,
          lead_in: 1.6,
          lead_flam: 3,
          bar_clear: 0.6,
          feet_rests: true
        }
      };
    }
  });

  // skins/dark.js
  var require_dark = __commonJS({
    "skins/dark.js"(exports, module) {
      "use strict";
      var { default: base } = require_default();
      module.exports = {
        dark: Object.assign({}, base, {
          bg_color: "#1e1f24",
          text_color: "#e6e6e6",
          title_color: "#f2f2f2",
          subtitle_color: "#a0a0a8",
          label_color: "#d8d8d8",
          count_color: "#7c7c86",
          count_beat_color: "#d0d0d8",
          grid_color: "#33353d",
          beat_color: "#50535e",
          bar_color: "#c8c8d0",
          mark_color: "#f0f0f0",
          accent_color: "#ff6a4d",
          ghost_color: "#8e8e98",
          staff_color: "#8a8c96",
          ink_color: "#f0f0f0"
        })
      };
    }
  });

  // lib/all-skins.js
  var require_all_skins = __commonJS({
    "lib/all-skins.js"(exports, module) {
      "use strict";
      module.exports = Object.assign({}, require_default(), require_dark());
    }
  });

  // lib/validate.js
  var require_validate2 = __commonJS({
    "lib/validate.js"(exports, module) {
      "use strict";
      var json5 = require_dist();
      var Ajv2020 = require__();
      var schema = require_drumdrom_schema();
      var { errorInfo } = require_errors();
      var { kit, order, resolveKit } = require_kit();
      var { symbols, reserved, scan } = require_wave();
      var buildLocator = require_locate();
      var allSkins = require_all_skins();
      var ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
      var checkSchema = ajv.compile(schema);
      function pathString(parts) {
        return parts.reduce((s, p) => typeof p === "number" ? s + "[" + p + "]" : s ? s + "." + p : p, "");
      }
      function ajvToIssue(e) {
        const parts = e.instancePath.split("/").slice(1).map((p2) => p2.replace(/~1/g, "/").replace(/~0/g, "~")).map((p2) => /^\d+$/.test(p2) ? Number(p2) : p2);
        const p = e.params;
        let message = e.message;
        let wantKey = false;
        if (e.keyword === "required") {
          message = "missing required key '" + p.missingProperty + "'";
        } else if (e.keyword === "additionalProperties") {
          parts.push(p.additionalProperty);
          message = "unknown key '" + p.additionalProperty + "'";
          wantKey = true;
        } else if (e.keyword === "propertyNames") {
          parts.push(p.propertyName);
          message = "invalid id '" + p.propertyName + "': use lowercase letters, digits and underscore, starting with a letter, up to 16 characters";
          wantKey = true;
        } else if (e.keyword === "const") {
          message = "must be " + JSON.stringify(p.allowedValue);
        } else if (e.keyword === "enum") {
          message = "must be one of " + p.allowedValues.map((v) => JSON.stringify(v)).join(", ");
        } else if (e.keyword === "false schema") {
          message = "this key is not allowed here";
          wantKey = true;
        }
        return { code: "E_SCHEMA", message, parts, wantKey };
      }
      function semantic(data, issues) {
        const add = (code, message, parts, extra) => issues.push({ code, message, parts, ...extra });
        if ("sections" in data) {
          add("E_RESERVED_KEY", "'sections' is reserved for a future version and must not be used in version 1 files", ["sections"], { wantKey: true });
        }
        if (data.format !== void 0 && data.format !== "drumdrom") {
          add("E_FORMAT", "format must be 'drumdrom'", ["format"]);
        }
        if (Number.isInteger(data.version) && data.version !== 1) {
          add("E_VERSION", "unsupported version " + data.version + ": this validator supports version 1", ["version"]);
        }
        if (data.config && typeof data.config === "object" && typeof data.config.skin === "string" && !allSkins[data.config.skin]) {
          add("E_UNKNOWN_SKIN", "unknown skin '" + data.config.skin + "'; available: " + Object.keys(allSkins).join(", "), ["config", "skin"]);
        }
        const custom = data.kit && typeof data.kit === "object" && !Array.isArray(data.kit) ? data.kit : {};
        Object.keys(custom).forEach((id) => {
          const entry = custom[id];
          if (!kit[id] && entry && typeof entry === "object") {
            const missing = ["name", "gm", "staff"].filter((k) => entry[k] === void 0);
            if (missing.length) {
              add("E_KIT", "kit lane '" + id + "' is not in the default kit, so it needs " + missing.join(", "), ["kit", id], { wantKey: true });
            }
          }
        });
        const known = resolveKit(custom);
        const beats = data.time === void 0 ? 4 : Array.isArray(data.time) ? data.time[0] : null;
        const spb = data.steps_per_beat === void 0 ? 4 : data.steps_per_beat;
        const perBar = Number.isInteger(beats) && beats >= 1 && Number.isInteger(spb) && spb >= 1 ? beats * spb : null;
        if (!Array.isArray(data.lanes)) return;
        const seen = {};
        const lengths = [];
        data.lanes.forEach((lane, i) => {
          if (!lane || typeof lane !== "object") return;
          const id = lane.id;
          if (typeof id === "string" && /^[a-z][a-z0-9_]{0,15}$/.test(id)) {
            if (!known[id]) {
              add("E_UNKNOWN_LANE", "unknown lane id '" + id + "'; use one of " + order.join(", ") + " or declare it in kit", ["lanes", i, "id"]);
            }
            if (seen[id] !== void 0) {
              add("E_DUPLICATE_LANE", "lane id '" + id + "' is already used by lanes[" + seen[id] + "]", ["lanes", i, "id"]);
            } else {
              seen[id] = i;
            }
          }
          if (typeof lane.wave !== "string" || lane.wave === "") return;
          const wp = ["lanes", i, "wave"];
          const label = typeof id === "string" ? "lane '" + id + "'" : "lane " + i;
          const { steps, segments, hasBars } = scan(lane.wave);
          steps.forEach(({ char, index }) => {
            if (Object.prototype.hasOwnProperty.call(symbols, char)) {
              if (char === "O" && id !== "hh" && id !== "ho") {
                add("E_OPEN_HAT_LANE", label + ": 'O' (open hi-hat) is only valid on lanes hh and ho at index " + index, wp, { index });
              }
            } else if (Object.prototype.hasOwnProperty.call(reserved, char)) {
              add("E_RESERVED_CHAR", label + ": character '" + char + "' at index " + index + " (" + reserved[char] + ") is reserved for a future version", wp, { index });
            } else {
              add("E_BAD_CHAR", label + ": unknown character '" + char + "' at index " + index + " in wave (allowed: . - x X o O f and '|')", wp, { index });
            }
          });
          let lengthOk = true;
          if (perBar === null) {
            lengthOk = false;
          } else if (hasBars) {
            segments.forEach((seg) => {
              if (seg.steps !== perBar) {
                lengthOk = false;
                add("E_BAR_LENGTH", label + ": bar starting at index " + seg.start + " has " + seg.steps + " steps, expected " + perBar + " (" + beats + " beats x " + spb + " steps per beat)", wp, { index: seg.start });
              }
            });
          } else if (steps.length % perBar !== 0) {
            lengthOk = false;
            add("E_WAVE_LENGTH", label + " has " + steps.length + " steps, which is not a multiple of " + perBar + " steps per bar (" + beats + " beats x " + spb + " steps per beat)", wp);
          }
          if (lengthOk) lengths.push({ label, path: wp, steps: steps.length });
        });
        if (lengths.length > 1) {
          const first = lengths[0];
          lengths.slice(1).forEach((l) => {
            if (l.steps !== first.steps) {
              add("E_LANE_LENGTH", l.label + " has " + l.steps + " steps but " + first.label + " has " + first.steps + " steps: all lanes must have the same length", l.path);
            }
          });
        }
      }
      function check(input) {
        let data = input;
        let locate = null;
        if (typeof input === "string") {
          try {
            data = json5.parse(input);
          } catch (e) {
            return { data: null, errors: [errorInfo("E_SYNTAX", e.message, { path: "", line: e.lineNumber, column: e.columnNumber })] };
          }
          locate = buildLocator(input);
        }
        const issues = [];
        if (data === null || typeof data !== "object" || Array.isArray(data)) {
          issues.push({ code: "E_SCHEMA", message: "a drumdrom file must be an object", parts: [] });
        } else {
          const sem = [];
          semantic(data, sem);
          const taken = new Set(sem.map((s) => pathString(s.parts)));
          if (!checkSchema(data)) {
            checkSchema.errors.map(ajvToIssue).forEach((s) => {
              if (!taken.has(pathString(s.parts))) issues.push(s);
            });
          }
          issues.push(...sem);
        }
        const errors = issues.map((s) => {
          const loc = { path: pathString(s.parts), index: s.index };
          if (s.line !== void 0) {
            loc.line = s.line;
            loc.column = s.column;
          } else if (locate) {
            Object.assign(loc, locate(s.parts, s.wantKey, s.index));
          }
          return errorInfo(s.code, s.message, loc);
        });
        return { data, errors };
      }
      function validate(input) {
        const { errors } = check(input);
        return { ok: errors.length === 0, errors };
      }
      module.exports = { validate, check };
    }
  });

  // lib/normalize.js
  var require_normalize = __commonJS({
    "lib/normalize.js"(exports, module) {
      "use strict";
      var { order, resolveKit } = require_kit();
      var { symbols, scan } = require_wave();
      function normalize(src) {
        const time = src.time || [4, 4];
        const spb = src.steps_per_beat || 4;
        const stepsPerBar = time[0] * spb;
        const known = resolveKit(src.kit);
        const lanes = /* @__PURE__ */ new Map();
        function lane(id, nameOverride, staff) {
          if (!lanes.has(id)) {
            const k = known[id];
            lanes.set(id, {
              id,
              name: nameOverride || k.name,
              gm: k.gm === void 0 ? null : k.gm,
              staff: staff === void 0 ? k.staff : staff,
              head: k.head,
              hits: []
            });
          }
          return lanes.get(id);
        }
        function makeHit(step, sym, laneId) {
          const hit = {
            step,
            bar: Math.floor(step / stepsPerBar),
            step_in_bar: step % stepsPerBar,
            accent: sym.accent
          };
          const articulation = sym.articulation || (laneId === "ho" ? "open" : null);
          if (articulation) hit.articulation = articulation;
          return hit;
        }
        let totalSteps = 0;
        const derived = [];
        src.lanes.forEach((l) => {
          const target = lane(l.id, l.name, l.staff);
          const { steps } = scan(l.wave);
          totalSteps = steps.length;
          steps.forEach(({ char }, step) => {
            const sym = symbols[char];
            if (!sym) return;
            if (char === "O" && l.id === "hh") {
              derived.push({ step, sym });
            } else {
              target.hits.push(makeHit(step, sym, l.id));
            }
          });
        });
        derived.forEach(({ step, sym }) => {
          const ho = lane("ho");
          if (!ho.hits.some((h) => h.step === step)) ho.hits.push(makeHit(step, sym, "ho"));
        });
        const rank = (id) => order.indexOf(id) < 0 ? order.length : order.indexOf(id);
        const sorted = Array.from(lanes.values()).map((l, i) => ({ l, i })).sort((a, b) => rank(a.l.id) - rank(b.l.id) || a.i - b.i).map((x) => x.l);
        sorted.forEach((l) => l.hits.sort((a, b) => a.step - b.step));
        return {
          format: "drumdrom",
          version: 1,
          name: src.name || "",
          subtitle: src.subtitle || "",
          tempo: src.tempo === void 0 ? null : src.tempo,
          time: [time[0], time[1]],
          steps_per_beat: spb,
          steps_per_bar: stepsPerBar,
          bars: totalSteps / stepsPerBar,
          lanes: sorted,
          config: { ...src.config || {} }
        };
      }
      module.exports = normalize;
    }
  });

  // lib/parse.js
  var require_parse = __commonJS({
    "lib/parse.js"(exports, module) {
      "use strict";
      var { DrumDromError } = require_errors();
      var { check } = require_validate2();
      var normalize = require_normalize();
      function parse(source) {
        const { data, errors } = check(source);
        if (errors.length) {
          const first = errors[0];
          const err = new DrumDromError(first.code, first.message, first);
          err.errors = errors;
          throw err;
        }
        return normalize(data);
      }
      module.exports = parse;
    }
  });

  // node_modules/sax/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/sax/lib/sax.js"(exports) {
      (function(sax) {
        sax.parser = function(strict, opt) {
          return new SAXParser(strict, opt);
        };
        sax.SAXParser = SAXParser;
        sax.SAXStream = SAXStream;
        sax.createStream = createStream;
        sax.MAX_BUFFER_LENGTH = 64 * 1024;
        var buffers = [
          "comment",
          "sgmlDecl",
          "textNode",
          "tagName",
          "doctype",
          "procInstName",
          "procInstBody",
          "entity",
          "attribName",
          "attribValue",
          "cdata",
          "script"
        ];
        sax.EVENTS = [
          "text",
          "processinginstruction",
          "sgmldeclaration",
          "doctype",
          "comment",
          "opentagstart",
          "attribute",
          "opentag",
          "closetag",
          "opencdata",
          "cdata",
          "closecdata",
          "error",
          "end",
          "ready",
          "script",
          "opennamespace",
          "closenamespace"
        ];
        function SAXParser(strict, opt) {
          if (!(this instanceof SAXParser)) {
            return new SAXParser(strict, opt);
          }
          var parser = this;
          clearBuffers(parser);
          parser.q = parser.c = "";
          parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
          parser.encoding = null;
          parser.opt = opt || {};
          parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
          parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
          parser.opt.maxEntityCount = parser.opt.maxEntityCount || 512;
          parser.opt.maxEntityDepth = parser.opt.maxEntityDepth || 4;
          parser.entityCount = parser.entityDepth = 0;
          parser.tags = [];
          parser.closed = parser.closedRoot = parser.sawRoot = false;
          parser.tag = parser.error = null;
          parser.strict = !!strict;
          parser.noscript = !!(strict || parser.opt.noscript);
          parser.state = S.BEGIN;
          parser.strictEntities = parser.opt.strictEntities;
          parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
          parser.attribList = [];
          if (parser.opt.xmlns) {
            parser.ns = Object.create(rootNS);
          }
          if (parser.opt.unquotedAttributeValues === void 0) {
            parser.opt.unquotedAttributeValues = !strict;
          }
          parser.trackPosition = parser.opt.position !== false;
          if (parser.trackPosition) {
            parser.position = parser.line = parser.column = 0;
          }
          emit(parser, "onready");
        }
        if (!Object.create) {
          Object.create = function(o) {
            function F() {
            }
            F.prototype = o;
            var newf = new F();
            return newf;
          };
        }
        if (!Object.keys) {
          Object.keys = function(o) {
            var a = [];
            for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
            return a;
          };
        }
        function checkBufferLength(parser) {
          var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
          var maxActual = 0;
          for (var i = 0, l = buffers.length; i < l; i++) {
            var len = parser[buffers[i]].length;
            if (len > maxAllowed) {
              switch (buffers[i]) {
                case "textNode":
                  closeText(parser);
                  break;
                case "cdata":
                  emitNode(parser, "oncdata", parser.cdata);
                  parser.cdata = "";
                  break;
                case "script":
                  emitNode(parser, "onscript", parser.script);
                  parser.script = "";
                  break;
                default:
                  error(parser, "Max buffer length exceeded: " + buffers[i]);
              }
            }
            maxActual = Math.max(maxActual, len);
          }
          var m = sax.MAX_BUFFER_LENGTH - maxActual;
          parser.bufferCheckPosition = m + parser.position;
        }
        function clearBuffers(parser) {
          for (var i = 0, l = buffers.length; i < l; i++) {
            parser[buffers[i]] = "";
          }
        }
        function flushBuffers(parser) {
          closeText(parser);
          if (parser.cdata !== "") {
            emitNode(parser, "oncdata", parser.cdata);
            parser.cdata = "";
          }
          if (parser.script !== "") {
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
        }
        SAXParser.prototype = {
          end: function() {
            end(this);
          },
          write,
          resume: function() {
            this.error = null;
            return this;
          },
          close: function() {
            return this.write(null);
          },
          flush: function() {
            flushBuffers(this);
          }
        };
        var Stream;
        try {
          Stream = __require("stream").Stream;
        } catch (ex) {
          Stream = function() {
          };
        }
        if (!Stream) Stream = function() {
        };
        var streamWraps = sax.EVENTS.filter(function(ev) {
          return ev !== "error" && ev !== "end";
        });
        function createStream(strict, opt) {
          return new SAXStream(strict, opt);
        }
        function determineBufferEncoding(data, isEnd) {
          if (data.length >= 2) {
            if (data[0] === 255 && data[1] === 254) {
              return "utf-16le";
            }
            if (data[0] === 254 && data[1] === 255) {
              return "utf-16be";
            }
          }
          if (data.length >= 3 && data[0] === 239 && data[1] === 187 && data[2] === 191) {
            return "utf8";
          }
          if (data.length >= 4) {
            if (data[0] === 60 && data[1] === 0 && data[2] === 63 && data[3] === 0) {
              return "utf-16le";
            }
            if (data[0] === 0 && data[1] === 60 && data[2] === 0 && data[3] === 63) {
              return "utf-16be";
            }
            return "utf8";
          }
          return isEnd ? "utf8" : null;
        }
        function SAXStream(strict, opt) {
          if (!(this instanceof SAXStream)) {
            return new SAXStream(strict, opt);
          }
          Stream.apply(this);
          this._parser = new SAXParser(strict, opt);
          this.writable = true;
          this.readable = true;
          var me = this;
          this._parser.onend = function() {
            me.emit("end");
          };
          this._parser.onerror = function(er) {
            me.emit("error", er);
            me._parser.error = null;
          };
          this._decoder = null;
          this._decoderBuffer = null;
          streamWraps.forEach(function(ev) {
            Object.defineProperty(me, "on" + ev, {
              get: function() {
                return me._parser["on" + ev];
              },
              set: function(h) {
                if (!h) {
                  me.removeAllListeners(ev);
                  me._parser["on" + ev] = h;
                  return h;
                }
                me.on(ev, h);
              },
              enumerable: true,
              configurable: false
            });
          });
        }
        SAXStream.prototype = Object.create(Stream.prototype, {
          constructor: {
            value: SAXStream
          }
        });
        SAXStream.prototype._decodeBuffer = function(data, isEnd) {
          if (this._decoderBuffer) {
            data = Buffer.concat([this._decoderBuffer, data]);
            this._decoderBuffer = null;
          }
          if (!this._decoder) {
            var encoding = determineBufferEncoding(data, isEnd);
            if (!encoding) {
              this._decoderBuffer = data;
              return "";
            }
            this._parser.encoding = encoding;
            this._decoder = new TextDecoder(encoding);
          }
          return this._decoder.decode(data, { stream: !isEnd });
        };
        SAXStream.prototype.write = function(data) {
          if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
            data = this._decodeBuffer(data, false);
          } else if (this._decoderBuffer) {
            var remaining = this._decodeBuffer(Buffer.alloc(0), true);
            if (remaining) {
              this._parser.write(remaining);
              this.emit("data", remaining);
            }
          }
          this._parser.write(data.toString());
          this.emit("data", data);
          return true;
        };
        SAXStream.prototype.end = function(chunk) {
          if (chunk && chunk.length) {
            this.write(chunk);
          }
          if (this._decoderBuffer) {
            var finalChunk = this._decodeBuffer(Buffer.alloc(0), true);
            if (finalChunk) {
              this._parser.write(finalChunk);
              this.emit("data", finalChunk);
            }
          } else if (this._decoder) {
            var remaining = this._decoder.decode();
            if (remaining) {
              this._parser.write(remaining);
              this.emit("data", remaining);
            }
          }
          this._parser.end();
          return true;
        };
        SAXStream.prototype.on = function(ev, handler) {
          var me = this;
          if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
            me._parser["on" + ev] = function() {
              var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
              args.splice(0, 0, ev);
              me.emit.apply(me, args);
            };
          }
          return Stream.prototype.on.call(me, ev, handler);
        };
        var CDATAre = /^\[CDATA\[$/i;
        var DOCTYPEre = /^DOCTYPE$/i;
        var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
        var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
        var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
        var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function isWhitespace(c) {
          return c === " " || c === "\n" || c === "\r" || c === "	";
        }
        function isQuote(c) {
          return c === '"' || c === "'";
        }
        function isAttribEnd(c) {
          return c === ">" || isWhitespace(c);
        }
        function isMatch(regex, c) {
          return regex.test(c);
        }
        function notMatch(regex, c) {
          return !isMatch(regex, c);
        }
        var S = 0;
        sax.STATE = {
          BEGIN: S++,
          // leading byte order mark or whitespace
          BEGIN_WHITESPACE: S++,
          // leading whitespace
          TEXT: S++,
          // general stuff
          TEXT_ENTITY: S++,
          // &amp and such.
          OPEN_WAKA: S++,
          // <
          SGML_DECL: S++,
          // <!BLARG
          SGML_DECL_QUOTED: S++,
          // <!BLARG foo "bar
          DOCTYPE: S++,
          // <!DOCTYPE
          DOCTYPE_QUOTED: S++,
          // <!DOCTYPE "//blah
          DOCTYPE_DTD: S++,
          // <!DOCTYPE "//blah" [ ...
          DOCTYPE_DTD_QUOTED: S++,
          // <!DOCTYPE "//blah" [ "foo
          COMMENT_STARTING: S++,
          // <!-
          COMMENT: S++,
          // <!--
          COMMENT_ENDING: S++,
          // <!-- blah -
          COMMENT_ENDED: S++,
          // <!-- blah --
          CDATA: S++,
          // <![CDATA[ something
          CDATA_ENDING: S++,
          // ]
          CDATA_ENDING_2: S++,
          // ]]
          PROC_INST: S++,
          // <?hi
          PROC_INST_BODY: S++,
          // <?hi there
          PROC_INST_ENDING: S++,
          // <?hi "there" ?
          OPEN_TAG: S++,
          // <strong
          OPEN_TAG_SLASH: S++,
          // <strong /
          ATTRIB: S++,
          // <a
          ATTRIB_NAME: S++,
          // <a foo
          ATTRIB_NAME_SAW_WHITE: S++,
          // <a foo _
          ATTRIB_VALUE: S++,
          // <a foo=
          ATTRIB_VALUE_QUOTED: S++,
          // <a foo="bar
          ATTRIB_VALUE_CLOSED: S++,
          // <a foo="bar"
          ATTRIB_VALUE_UNQUOTED: S++,
          // <a foo=bar
          ATTRIB_VALUE_ENTITY_Q: S++,
          // <foo bar="&quot;"
          ATTRIB_VALUE_ENTITY_U: S++,
          // <foo bar=&quot
          CLOSE_TAG: S++,
          // </a
          CLOSE_TAG_SAW_WHITE: S++,
          // </a   >
          SCRIPT: S++,
          // <script> ...
          SCRIPT_ENDING: S++
          // <script> ... <
        };
        sax.XML_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
          amp: "&",
          gt: ">",
          lt: "<",
          quot: '"',
          apos: "'"
        });
        sax.ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
          amp: "&",
          gt: ">",
          lt: "<",
          quot: '"',
          apos: "'",
          AElig: 198,
          Aacute: 193,
          Acirc: 194,
          Agrave: 192,
          Aring: 197,
          Atilde: 195,
          Auml: 196,
          Ccedil: 199,
          ETH: 208,
          Eacute: 201,
          Ecirc: 202,
          Egrave: 200,
          Euml: 203,
          Iacute: 205,
          Icirc: 206,
          Igrave: 204,
          Iuml: 207,
          Ntilde: 209,
          Oacute: 211,
          Ocirc: 212,
          Ograve: 210,
          Oslash: 216,
          Otilde: 213,
          Ouml: 214,
          THORN: 222,
          Uacute: 218,
          Ucirc: 219,
          Ugrave: 217,
          Uuml: 220,
          Yacute: 221,
          aacute: 225,
          acirc: 226,
          aelig: 230,
          agrave: 224,
          aring: 229,
          atilde: 227,
          auml: 228,
          ccedil: 231,
          eacute: 233,
          ecirc: 234,
          egrave: 232,
          eth: 240,
          euml: 235,
          iacute: 237,
          icirc: 238,
          igrave: 236,
          iuml: 239,
          ntilde: 241,
          oacute: 243,
          ocirc: 244,
          ograve: 242,
          oslash: 248,
          otilde: 245,
          ouml: 246,
          szlig: 223,
          thorn: 254,
          uacute: 250,
          ucirc: 251,
          ugrave: 249,
          uuml: 252,
          yacute: 253,
          yuml: 255,
          copy: 169,
          reg: 174,
          nbsp: 160,
          iexcl: 161,
          cent: 162,
          pound: 163,
          curren: 164,
          yen: 165,
          brvbar: 166,
          sect: 167,
          uml: 168,
          ordf: 170,
          laquo: 171,
          not: 172,
          shy: 173,
          macr: 175,
          deg: 176,
          plusmn: 177,
          sup1: 185,
          sup2: 178,
          sup3: 179,
          acute: 180,
          micro: 181,
          para: 182,
          middot: 183,
          cedil: 184,
          ordm: 186,
          raquo: 187,
          frac14: 188,
          frac12: 189,
          frac34: 190,
          iquest: 191,
          times: 215,
          divide: 247,
          OElig: 338,
          oelig: 339,
          Scaron: 352,
          scaron: 353,
          Yuml: 376,
          fnof: 402,
          circ: 710,
          tilde: 732,
          Alpha: 913,
          Beta: 914,
          Gamma: 915,
          Delta: 916,
          Epsilon: 917,
          Zeta: 918,
          Eta: 919,
          Theta: 920,
          Iota: 921,
          Kappa: 922,
          Lambda: 923,
          Mu: 924,
          Nu: 925,
          Xi: 926,
          Omicron: 927,
          Pi: 928,
          Rho: 929,
          Sigma: 931,
          Tau: 932,
          Upsilon: 933,
          Phi: 934,
          Chi: 935,
          Psi: 936,
          Omega: 937,
          alpha: 945,
          beta: 946,
          gamma: 947,
          delta: 948,
          epsilon: 949,
          zeta: 950,
          eta: 951,
          theta: 952,
          iota: 953,
          kappa: 954,
          lambda: 955,
          mu: 956,
          nu: 957,
          xi: 958,
          omicron: 959,
          pi: 960,
          rho: 961,
          sigmaf: 962,
          sigma: 963,
          tau: 964,
          upsilon: 965,
          phi: 966,
          chi: 967,
          psi: 968,
          omega: 969,
          thetasym: 977,
          upsih: 978,
          piv: 982,
          ensp: 8194,
          emsp: 8195,
          thinsp: 8201,
          zwnj: 8204,
          zwj: 8205,
          lrm: 8206,
          rlm: 8207,
          ndash: 8211,
          mdash: 8212,
          lsquo: 8216,
          rsquo: 8217,
          sbquo: 8218,
          ldquo: 8220,
          rdquo: 8221,
          bdquo: 8222,
          dagger: 8224,
          Dagger: 8225,
          bull: 8226,
          hellip: 8230,
          permil: 8240,
          prime: 8242,
          Prime: 8243,
          lsaquo: 8249,
          rsaquo: 8250,
          oline: 8254,
          frasl: 8260,
          euro: 8364,
          image: 8465,
          weierp: 8472,
          real: 8476,
          trade: 8482,
          alefsym: 8501,
          larr: 8592,
          uarr: 8593,
          rarr: 8594,
          darr: 8595,
          harr: 8596,
          crarr: 8629,
          lArr: 8656,
          uArr: 8657,
          rArr: 8658,
          dArr: 8659,
          hArr: 8660,
          forall: 8704,
          part: 8706,
          exist: 8707,
          empty: 8709,
          nabla: 8711,
          isin: 8712,
          notin: 8713,
          ni: 8715,
          prod: 8719,
          sum: 8721,
          minus: 8722,
          lowast: 8727,
          radic: 8730,
          prop: 8733,
          infin: 8734,
          ang: 8736,
          and: 8743,
          or: 8744,
          cap: 8745,
          cup: 8746,
          int: 8747,
          there4: 8756,
          sim: 8764,
          cong: 8773,
          asymp: 8776,
          ne: 8800,
          equiv: 8801,
          le: 8804,
          ge: 8805,
          sub: 8834,
          sup: 8835,
          nsub: 8836,
          sube: 8838,
          supe: 8839,
          oplus: 8853,
          otimes: 8855,
          perp: 8869,
          sdot: 8901,
          lceil: 8968,
          rceil: 8969,
          lfloor: 8970,
          rfloor: 8971,
          lang: 9001,
          rang: 9002,
          loz: 9674,
          spades: 9824,
          clubs: 9827,
          hearts: 9829,
          diams: 9830
        });
        Object.keys(sax.ENTITIES).forEach(function(key) {
          var e = sax.ENTITIES[key];
          var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
          sax.ENTITIES[key] = s2;
        });
        for (var s in sax.STATE) {
          sax.STATE[sax.STATE[s]] = s;
        }
        S = sax.STATE;
        function emit(parser, event, data) {
          parser[event] && parser[event](data);
        }
        function getDeclaredEncoding(body) {
          var match = body && body.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
          return match ? match[2] : null;
        }
        function normalizeEncodingName(encoding) {
          if (!encoding) {
            return null;
          }
          return encoding.toLowerCase().replace(/[^a-z0-9]/g, "");
        }
        function encodingsMatch(detectedEncoding, declaredEncoding) {
          const detected = normalizeEncodingName(detectedEncoding);
          const declared = normalizeEncodingName(declaredEncoding);
          if (!detected || !declared) {
            return true;
          }
          if (declared === "utf16") {
            return detected === "utf16le" || detected === "utf16be";
          }
          return detected === declared;
        }
        function validateXmlDeclarationEncoding(parser, data) {
          if (!parser.strict || !parser.encoding || !data || data.name !== "xml") {
            return;
          }
          var declaredEncoding = getDeclaredEncoding(data.body);
          if (declaredEncoding && !encodingsMatch(parser.encoding, declaredEncoding)) {
            strictFail(
              parser,
              "XML declaration encoding " + declaredEncoding + " does not match detected stream encoding " + parser.encoding.toUpperCase()
            );
          }
        }
        function emitNode(parser, nodeType, data) {
          if (parser.textNode) closeText(parser);
          emit(parser, nodeType, data);
        }
        function closeText(parser) {
          parser.textNode = textopts(parser.opt, parser.textNode);
          if (parser.textNode) emit(parser, "ontext", parser.textNode);
          parser.textNode = "";
        }
        function textopts(opt, text) {
          if (opt.trim) text = text.trim();
          if (opt.normalize) text = text.replace(/\s+/g, " ");
          return text;
        }
        function error(parser, er) {
          closeText(parser);
          if (parser.trackPosition) {
            er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
          }
          er = new Error(er);
          parser.error = er;
          emit(parser, "onerror", er);
          return parser;
        }
        function end(parser) {
          if (parser.sawRoot && !parser.closedRoot)
            strictFail(parser, "Unclosed root tag");
          if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
            error(parser, "Unexpected end");
          }
          closeText(parser);
          parser.c = "";
          parser.closed = true;
          emit(parser, "onend");
          SAXParser.call(parser, parser.strict, parser.opt);
          return parser;
        }
        function strictFail(parser, message) {
          if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
            throw new Error("bad call to strictFail");
          }
          if (parser.strict) {
            error(parser, message);
          }
        }
        function newTag(parser) {
          if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
          var parent = parser.tags[parser.tags.length - 1] || parser;
          var tag = parser.tag = { name: parser.tagName, attributes: {} };
          if (parser.opt.xmlns) {
            tag.ns = parent.ns;
          }
          parser.attribList.length = 0;
          emitNode(parser, "onopentagstart", tag);
        }
        function qname(name, attribute) {
          var i = name.indexOf(":");
          var qualName = i < 0 ? ["", name] : name.split(":");
          var prefix = qualName[0];
          var local = qualName[1];
          if (attribute && name === "xmlns") {
            prefix = "xmlns";
            local = "";
          }
          return { prefix, local };
        }
        function attrib(parser) {
          if (!parser.strict) {
            parser.attribName = parser.attribName[parser.looseCase]();
          }
          if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
            parser.attribName = parser.attribValue = "";
            return;
          }
          if (parser.opt.xmlns) {
            var qn = qname(parser.attribName, true);
            var prefix = qn.prefix;
            var local = qn.local;
            if (prefix === "xmlns") {
              if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
                strictFail(
                  parser,
                  "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
                strictFail(
                  parser,
                  "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else {
                var tag = parser.tag;
                var parent = parser.tags[parser.tags.length - 1] || parser;
                if (tag.ns === parent.ns) {
                  tag.ns = Object.create(parent.ns);
                }
                tag.ns[local] = parser.attribValue;
              }
            }
            parser.attribList.push([parser.attribName, parser.attribValue]);
          } else {
            parser.tag.attributes[parser.attribName] = parser.attribValue;
            emitNode(parser, "onattribute", {
              name: parser.attribName,
              value: parser.attribValue
            });
          }
          parser.attribName = parser.attribValue = "";
        }
        function openTag(parser, selfClosing) {
          if (parser.opt.xmlns) {
            var tag = parser.tag;
            var qn = qname(parser.tagName);
            tag.prefix = qn.prefix;
            tag.local = qn.local;
            tag.uri = tag.ns[qn.prefix] || "";
            if (tag.prefix && !tag.uri) {
              strictFail(
                parser,
                "Unbound namespace prefix: " + JSON.stringify(parser.tagName)
              );
              tag.uri = qn.prefix;
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns && parent.ns !== tag.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                emitNode(parser, "onopennamespace", {
                  prefix: p,
                  uri: tag.ns[p]
                });
              });
            }
            for (var i = 0, l = parser.attribList.length; i < l; i++) {
              var nv = parser.attribList[i];
              var name = nv[0];
              var value = nv[1];
              var qualName = qname(name, true);
              var prefix = qualName.prefix;
              var local = qualName.local;
              var uri = prefix === "" ? "" : tag.ns[prefix] || "";
              var a = {
                name,
                value,
                prefix,
                local,
                uri
              };
              if (prefix && prefix !== "xmlns" && !uri) {
                strictFail(
                  parser,
                  "Unbound namespace prefix: " + JSON.stringify(prefix)
                );
                a.uri = prefix;
              }
              parser.tag.attributes[name] = a;
              emitNode(parser, "onattribute", a);
            }
            parser.attribList.length = 0;
          }
          parser.tag.isSelfClosing = !!selfClosing;
          parser.sawRoot = true;
          parser.tags.push(parser.tag);
          emitNode(parser, "onopentag", parser.tag);
          if (!selfClosing) {
            if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
              parser.state = S.SCRIPT;
            } else {
              parser.state = S.TEXT;
            }
            parser.tag = null;
            parser.tagName = "";
          }
          parser.attribName = parser.attribValue = "";
          parser.attribList.length = 0;
        }
        function closeTag(parser) {
          if (!parser.tagName) {
            strictFail(parser, "Weird empty close tag.");
            parser.textNode += "</>";
            parser.state = S.TEXT;
            return;
          }
          if (parser.script) {
            if (parser.tagName !== "script") {
              parser.script += "</" + parser.tagName + ">";
              parser.tagName = "";
              parser.state = S.SCRIPT;
              return;
            }
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
          var t = parser.tags.length;
          var tagName = parser.tagName;
          if (!parser.strict) {
            tagName = tagName[parser.looseCase]();
          }
          var closeTo = tagName;
          while (t--) {
            var close = parser.tags[t];
            if (close.name !== closeTo) {
              strictFail(parser, "Unexpected close tag");
            } else {
              break;
            }
          }
          if (t < 0) {
            strictFail(parser, "Unmatched closing tag: " + parser.tagName);
            parser.textNode += "</" + parser.tagName + ">";
            parser.state = S.TEXT;
            return;
          }
          parser.tagName = tagName;
          var s2 = parser.tags.length;
          while (s2-- > t) {
            var tag = parser.tag = parser.tags.pop();
            parser.tagName = parser.tag.name;
            emitNode(parser, "onclosetag", parser.tagName);
            var x = {};
            for (var i in tag.ns) {
              x[i] = tag.ns[i];
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (parser.opt.xmlns && tag.ns !== parent.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                var n = tag.ns[p];
                emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
              });
            }
          }
          if (t === 0) parser.closedRoot = true;
          parser.tagName = parser.attribValue = parser.attribName = "";
          parser.attribList.length = 0;
          parser.state = S.TEXT;
        }
        function parseEntity(parser) {
          var entity = parser.entity;
          var entityLC = entity.toLowerCase();
          var num;
          var numStr = "";
          if (parser.ENTITIES[entity]) {
            return parser.ENTITIES[entity];
          }
          if (parser.ENTITIES[entityLC]) {
            return parser.ENTITIES[entityLC];
          }
          entity = entityLC;
          if (entity.charAt(0) === "#") {
            if (entity.charAt(1) === "x") {
              entity = entity.slice(2);
              num = parseInt(entity, 16);
              numStr = num.toString(16);
            } else {
              entity = entity.slice(1);
              num = parseInt(entity, 10);
              numStr = num.toString(10);
            }
          }
          entity = entity.replace(/^0+/, "");
          if (isNaN(num) || numStr.toLowerCase() !== entity || num < 0 || num > 1114111 || !isXmlChar(num)) {
            strictFail(parser, "Invalid character entity");
            return "&" + parser.entity + ";";
          }
          return String.fromCodePoint(num);
        }
        function isXmlChar(num) {
          return num === 9 || num === 10 || num === 13 || num >= 32 && num <= 55295 || num >= 57344 && num <= 65533 || num >= 65536 && num <= 1114111;
        }
        function beginWhiteSpace(parser, c) {
          if (c === "<") {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
          } else if (!isWhitespace(c)) {
            strictFail(parser, "Non-whitespace before first tag.");
            parser.textNode = c;
            parser.state = S.TEXT;
          }
        }
        function charAt(chunk, i) {
          var result = "";
          if (i < chunk.length) {
            result = chunk.charAt(i);
          }
          return result;
        }
        function write(chunk) {
          var parser = this;
          if (this.error) {
            throw this.error;
          }
          if (parser.closed) {
            return error(
              parser,
              "Cannot write after close. Assign an onready handler."
            );
          }
          if (chunk === null) {
            return end(parser);
          }
          if (typeof chunk === "object") {
            chunk = chunk.toString();
          }
          var i = 0;
          var c = "";
          while (true) {
            c = charAt(chunk, i++);
            parser.c = c;
            if (!c) {
              break;
            }
            if (parser.trackPosition) {
              parser.position++;
              if (c === "\n") {
                parser.line++;
                parser.column = 0;
              } else {
                parser.column++;
              }
            }
            switch (parser.state) {
              case S.BEGIN:
                parser.state = S.BEGIN_WHITESPACE;
                if (c === "\uFEFF") {
                  continue;
                }
                beginWhiteSpace(parser, c);
                continue;
              case S.BEGIN_WHITESPACE:
                beginWhiteSpace(parser, c);
                continue;
              case S.TEXT:
                if (parser.sawRoot && !parser.closedRoot) {
                  var starti = i - 1;
                  while (c && c !== "<" && c !== "&") {
                    c = charAt(chunk, i++);
                    if (c && parser.trackPosition) {
                      parser.position++;
                      if (c === "\n") {
                        parser.line++;
                        parser.column = 0;
                      } else {
                        parser.column++;
                      }
                    }
                  }
                  parser.textNode += chunk.substring(starti, i - 1);
                }
                if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                  parser.state = S.OPEN_WAKA;
                  parser.startTagPosition = parser.position;
                } else {
                  if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                    strictFail(parser, "Text data outside of root node.");
                  }
                  if (c === "&") {
                    parser.state = S.TEXT_ENTITY;
                  } else {
                    parser.textNode += c;
                  }
                }
                continue;
              case S.SCRIPT:
                if (c === "<") {
                  parser.state = S.SCRIPT_ENDING;
                } else {
                  parser.script += c;
                }
                continue;
              case S.SCRIPT_ENDING:
                if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                } else {
                  parser.script += "<" + c;
                  parser.state = S.SCRIPT;
                }
                continue;
              case S.OPEN_WAKA:
                if (c === "!") {
                  parser.state = S.SGML_DECL;
                  parser.sgmlDecl = "";
                } else if (isWhitespace(c)) {
                } else if (isMatch(nameStart, c)) {
                  parser.state = S.OPEN_TAG;
                  parser.tagName = c;
                } else if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                  parser.tagName = "";
                } else if (c === "?") {
                  parser.state = S.PROC_INST;
                  parser.procInstName = parser.procInstBody = "";
                } else {
                  strictFail(parser, "Unencoded <");
                  if (parser.startTagPosition + 1 < parser.position) {
                    var pad = parser.position - parser.startTagPosition;
                    c = new Array(pad).join(" ") + c;
                  }
                  parser.textNode += "<" + c;
                  parser.state = S.TEXT;
                }
                continue;
              case S.SGML_DECL:
                if (parser.sgmlDecl + c === "--") {
                  parser.state = S.COMMENT;
                  parser.comment = "";
                  parser.sgmlDecl = "";
                  continue;
                }
                if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                  parser.state = S.DOCTYPE_DTD;
                  parser.doctype += "<!" + parser.sgmlDecl + c;
                  parser.sgmlDecl = "";
                } else if (CDATAre.test(parser.sgmlDecl + c)) {
                  emitNode(parser, "onopencdata");
                  parser.state = S.CDATA;
                  parser.sgmlDecl = "";
                  parser.cdata = "";
                } else if (DOCTYPEre.test(parser.sgmlDecl + c)) {
                  parser.state = S.DOCTYPE;
                  if (parser.doctype || parser.sawRoot) {
                    strictFail(
                      parser,
                      "Inappropriately located doctype declaration"
                    );
                  }
                  parser.doctype = "";
                  parser.sgmlDecl = "";
                } else if (c === ">") {
                  emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                  parser.sgmlDecl = "";
                  parser.state = S.TEXT;
                } else if (isQuote(c)) {
                  parser.state = S.SGML_DECL_QUOTED;
                  parser.sgmlDecl += c;
                } else {
                  parser.sgmlDecl += c;
                }
                continue;
              case S.SGML_DECL_QUOTED:
                if (c === parser.q) {
                  parser.state = S.SGML_DECL;
                  parser.q = "";
                }
                parser.sgmlDecl += c;
                continue;
              case S.DOCTYPE:
                if (c === ">") {
                  parser.state = S.TEXT;
                  emitNode(parser, "ondoctype", parser.doctype);
                  parser.doctype = true;
                } else {
                  parser.doctype += c;
                  if (c === "[") {
                    parser.state = S.DOCTYPE_DTD;
                  } else if (isQuote(c)) {
                    parser.state = S.DOCTYPE_QUOTED;
                    parser.q = c;
                  }
                }
                continue;
              case S.DOCTYPE_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.q = "";
                  parser.state = S.DOCTYPE;
                }
                continue;
              case S.DOCTYPE_DTD:
                if (c === "]") {
                  parser.doctype += c;
                  parser.state = S.DOCTYPE;
                } else if (c === "<") {
                  parser.state = S.OPEN_WAKA;
                  parser.startTagPosition = parser.position;
                } else if (isQuote(c)) {
                  parser.doctype += c;
                  parser.state = S.DOCTYPE_DTD_QUOTED;
                  parser.q = c;
                } else {
                  parser.doctype += c;
                }
                continue;
              case S.DOCTYPE_DTD_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.state = S.DOCTYPE_DTD;
                  parser.q = "";
                }
                continue;
              case S.COMMENT:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDING;
                } else {
                  parser.comment += c;
                }
                continue;
              case S.COMMENT_ENDING:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDED;
                  parser.comment = textopts(parser.opt, parser.comment);
                  if (parser.comment) {
                    emitNode(parser, "oncomment", parser.comment);
                  }
                  parser.comment = "";
                } else {
                  parser.comment += "-" + c;
                  parser.state = S.COMMENT;
                }
                continue;
              case S.COMMENT_ENDED:
                if (c !== ">") {
                  strictFail(parser, "Malformed comment");
                  parser.comment += "--" + c;
                  parser.state = S.COMMENT;
                } else if (parser.doctype && parser.doctype !== true) {
                  parser.state = S.DOCTYPE_DTD;
                } else {
                  parser.state = S.TEXT;
                }
                continue;
              case S.CDATA:
                var starti = i - 1;
                while (c && c !== "]") {
                  c = charAt(chunk, i++);
                  if (c && parser.trackPosition) {
                    parser.position++;
                    if (c === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.cdata += chunk.substring(starti, i - 1);
                if (c === "]") {
                  parser.state = S.CDATA_ENDING;
                }
                continue;
              case S.CDATA_ENDING:
                if (c === "]") {
                  parser.state = S.CDATA_ENDING_2;
                } else {
                  parser.cdata += "]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.CDATA_ENDING_2:
                if (c === ">") {
                  if (parser.cdata) {
                    emitNode(parser, "oncdata", parser.cdata);
                  }
                  emitNode(parser, "onclosecdata");
                  parser.cdata = "";
                  parser.state = S.TEXT;
                } else if (c === "]") {
                  parser.cdata += "]";
                } else {
                  parser.cdata += "]]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.PROC_INST:
                if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else if (isWhitespace(c)) {
                  parser.state = S.PROC_INST_BODY;
                } else {
                  parser.procInstName += c;
                }
                continue;
              case S.PROC_INST_BODY:
                if (!parser.procInstBody && isWhitespace(c)) {
                  continue;
                } else if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else {
                  parser.procInstBody += c;
                }
                continue;
              case S.PROC_INST_ENDING:
                if (c === ">") {
                  const procInstEndData = {
                    name: parser.procInstName,
                    body: parser.procInstBody
                  };
                  validateXmlDeclarationEncoding(parser, procInstEndData);
                  emitNode(parser, "onprocessinginstruction", procInstEndData);
                  parser.procInstName = parser.procInstBody = "";
                  parser.state = S.TEXT;
                } else {
                  parser.procInstBody += "?" + c;
                  parser.state = S.PROC_INST_BODY;
                }
                continue;
              case S.OPEN_TAG:
                if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else {
                  newTag(parser);
                  if (c === ">") {
                    openTag(parser);
                  } else if (c === "/") {
                    parser.state = S.OPEN_TAG_SLASH;
                  } else {
                    if (!isWhitespace(c)) {
                      strictFail(parser, "Invalid character in tag name");
                    }
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.OPEN_TAG_SLASH:
                if (c === ">") {
                  openTag(parser, true);
                  closeTag(parser);
                } else {
                  strictFail(
                    parser,
                    "Forward-slash in opening tag not followed by >"
                  );
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.ATTRIB:
                if (isWhitespace(c)) {
                  continue;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (c === ">") {
                  strictFail(parser, "Attribute without value");
                  parser.attribValue = parser.attribName;
                  attrib(parser);
                  openTag(parser);
                } else if (isWhitespace(c)) {
                  parser.state = S.ATTRIB_NAME_SAW_WHITE;
                } else if (isMatch(nameBody, c)) {
                  parser.attribName += c;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME_SAW_WHITE:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (isWhitespace(c)) {
                  continue;
                } else {
                  strictFail(parser, "Attribute without value");
                  parser.tag.attributes[parser.attribName] = "";
                  parser.attribValue = "";
                  emitNode(parser, "onattribute", {
                    name: parser.attribName,
                    value: ""
                  });
                  parser.attribName = "";
                  if (c === ">") {
                    openTag(parser);
                  } else if (isMatch(nameStart, c)) {
                    parser.attribName = c;
                    parser.state = S.ATTRIB_NAME;
                  } else {
                    strictFail(parser, "Invalid attribute name");
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.ATTRIB_VALUE:
                if (isWhitespace(c)) {
                  continue;
                } else if (isQuote(c)) {
                  parser.q = c;
                  parser.state = S.ATTRIB_VALUE_QUOTED;
                } else {
                  if (!parser.opt.unquotedAttributeValues) {
                    error(parser, "Unquoted attribute value");
                  }
                  parser.state = S.ATTRIB_VALUE_UNQUOTED;
                  parser.attribValue = c;
                }
                continue;
              case S.ATTRIB_VALUE_QUOTED:
                if (c !== parser.q) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                parser.q = "";
                parser.state = S.ATTRIB_VALUE_CLOSED;
                continue;
              case S.ATTRIB_VALUE_CLOSED:
                if (isWhitespace(c)) {
                  parser.state = S.ATTRIB;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  strictFail(parser, "No whitespace between attributes");
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_VALUE_UNQUOTED:
                if (!isAttribEnd(c)) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_U;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                if (c === ">") {
                  openTag(parser);
                } else {
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.CLOSE_TAG:
                if (!parser.tagName) {
                  if (isWhitespace(c)) {
                    continue;
                  } else if (notMatch(nameStart, c)) {
                    if (parser.script) {
                      parser.script += "</" + c;
                      parser.state = S.SCRIPT;
                    } else {
                      strictFail(parser, "Invalid tagname in closing tag.");
                    }
                  } else {
                    parser.tagName = c;
                  }
                } else if (c === ">") {
                  closeTag(parser);
                } else if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else if (parser.script) {
                  parser.script += "</" + parser.tagName + c;
                  parser.tagName = "";
                  parser.state = S.SCRIPT;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser, "Invalid tagname in closing tag");
                  }
                  parser.state = S.CLOSE_TAG_SAW_WHITE;
                }
                continue;
              case S.CLOSE_TAG_SAW_WHITE:
                if (isWhitespace(c)) {
                  continue;
                }
                if (c === ">") {
                  closeTag(parser);
                } else {
                  strictFail(parser, "Invalid characters in closing tag");
                }
                continue;
              case S.TEXT_ENTITY:
              case S.ATTRIB_VALUE_ENTITY_Q:
              case S.ATTRIB_VALUE_ENTITY_U:
                var returnState;
                var buffer;
                switch (parser.state) {
                  case S.TEXT_ENTITY:
                    returnState = S.TEXT;
                    buffer = "textNode";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_Q:
                    returnState = S.ATTRIB_VALUE_QUOTED;
                    buffer = "attribValue";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_U:
                    returnState = S.ATTRIB_VALUE_UNQUOTED;
                    buffer = "attribValue";
                    break;
                }
                if (c === ";") {
                  var parsedEntity = parseEntity(parser);
                  if (parser.opt.unparsedEntities && !Object.values(sax.XML_ENTITIES).includes(parsedEntity)) {
                    if ((parser.entityCount += 1) > parser.opt.maxEntityCount) {
                      error(
                        parser,
                        "Parsed entity count exceeds max entity count"
                      );
                    }
                    if ((parser.entityDepth += 1) > parser.opt.maxEntityDepth) {
                      error(
                        parser,
                        "Parsed entity depth exceeds max entity depth"
                      );
                    }
                    parser.entity = "";
                    parser.state = returnState;
                    parser.write(parsedEntity);
                    parser.entityDepth -= 1;
                  } else {
                    parser[buffer] += parsedEntity;
                    parser.entity = "";
                    parser.state = returnState;
                  }
                } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                  parser.entity += c;
                } else {
                  strictFail(parser, "Invalid character in entity name");
                  parser[buffer] += "&" + parser.entity + c;
                  parser.entity = "";
                  parser.state = returnState;
                }
                continue;
              default: {
                throw new Error(parser, "Unknown state: " + parser.state);
              }
            }
          }
          if (parser.position >= parser.bufferCheckPosition) {
            checkBufferLength(parser);
          }
          return parser;
        }
        if (!String.fromCodePoint) {
          ;
          (function() {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            var fromCodePoint = function() {
              var MAX_SIZE = 16384;
              var codeUnits = [];
              var highSurrogate;
              var lowSurrogate;
              var index = -1;
              var length = arguments.length;
              if (!length) {
                return "";
              }
              var result = "";
              while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                codePoint < 0 || // not a valid Unicode code point
                codePoint > 1114111 || // not a valid Unicode code point
                floor(codePoint) !== codePoint) {
                  throw RangeError("Invalid code point: " + codePoint);
                }
                if (codePoint <= 65535) {
                  codeUnits.push(codePoint);
                } else {
                  codePoint -= 65536;
                  highSurrogate = (codePoint >> 10) + 55296;
                  lowSurrogate = codePoint % 1024 + 56320;
                  codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                  result += stringFromCharCode.apply(null, codeUnits);
                  codeUnits.length = 0;
                }
              }
              return result;
            };
            if (Object.defineProperty) {
              Object.defineProperty(String, "fromCodePoint", {
                value: fromCodePoint,
                configurable: true,
                writable: true
              });
            } else {
              String.fromCodePoint = fromCodePoint;
            }
          })();
        }
      })(typeof exports === "undefined" ? exports.sax = {} : exports);
    }
  });

  // node_modules/onml/parse.js
  var require_parse2 = __commonJS({
    "node_modules/onml/parse.js"(exports, module) {
      "use strict";
      var parser = require_sax().parser;
      function parse(data, config) {
        const res = [];
        const stack = [];
        let pointer = res;
        let trim = true;
        let strict = true;
        if (config && config.strict !== void 0) {
          strict = config.strict;
        }
        if (config !== void 0) {
          if (config.trim !== void 0) {
            trim = config.trim;
          }
        }
        const p = parser(strict);
        p.ontext = function(e) {
          if (trim === false || e.trim() !== "") {
            pointer.push(e);
          }
        };
        p.onopentag = function(e) {
          const leaf = [e.name, e.attributes];
          stack.push(pointer);
          pointer.push(leaf);
          pointer = leaf;
        };
        p.onclosetag = function() {
          pointer = stack.pop();
        };
        p.oncdata = function(e) {
          if (trim === false || e.trim() !== "") {
            pointer.push("<![CDATA[" + e + "]]>");
          }
        };
        p.write(data).close();
        return res[0];
      }
      module.exports = parse;
    }
  });

  // node_modules/onml/stringify.js
  var require_stringify = __commonJS({
    "node_modules/onml/stringify.js"(exports, module) {
      "use strict";
      var isObject = (o) => o && Object.prototype.toString.call(o) === "[object Object]";
      function indenter(indentation) {
        if (!(indentation > 0)) {
          return (txt) => txt;
        }
        var space = " ".repeat(indentation);
        return (txt) => {
          if (typeof txt !== "string") {
            return txt;
          }
          const arr = txt.split("\n");
          if (arr.length === 1) {
            return space + txt;
          }
          return arr.map((e) => e.trim() === "" ? e : space + e).join("\n");
        };
      }
      var clean = (txt) => txt.split("\n").filter((e) => e.trim() !== "").join("\n");
      function stringify(a, indentation) {
        const cr = indentation > 0 ? "\n" : "";
        const indent = indenter(indentation);
        function rec(a2) {
          let body = "";
          let isFlat = true;
          let res;
          const isEmpty = a2.some((e, i, arr) => {
            if (i === 0) {
              res = "<" + e;
              return arr.length === 1;
            }
            if (i === 1) {
              if (isObject(e)) {
                Object.keys(e).map((key) => {
                  let val = e[key];
                  if (Array.isArray(val)) {
                    val = val.join(" ");
                  }
                  res += " " + key + '="' + val + '"';
                });
                if (arr.length === 2) {
                  return true;
                }
                res += ">";
                return;
              }
              res += ">";
            }
            if (!e && e !== 0 && e !== "") {
              return;
            }
            switch (typeof e) {
              case "string":
              case "number":
              case "boolean":
              case "undefined":
                body += e + cr;
                return;
            }
            isFlat = false;
            body += rec(e);
          });
          if (isEmpty) {
            return res + "/>" + cr;
          }
          return isFlat ? res + clean(body) + "</" + a2[0] + ">" + cr : res + cr + indent(body) + "</" + a2[0] + ">" + cr;
        }
        return rec(a);
      }
      module.exports = stringify;
    }
  });

  // node_modules/onml/traverse.js
  var require_traverse = __commonJS({
    "node_modules/onml/traverse.js"(exports, module) {
      "use strict";
      function skipFn() {
        this._skip = true;
      }
      function removeFn() {
        this._remove = true;
      }
      function nameFn(name) {
        this._name = name;
      }
      function replaceFn(node) {
        this._replace = node;
      }
      function traverse(origin, callbacks) {
        const empty = function() {
        };
        const enter = callbacks && callbacks.enter || empty;
        const leave = callbacks && callbacks.leave || empty;
        function rec(tree, parent) {
          if (tree === void 0) return;
          if (tree === null) return;
          if (tree === true) return;
          if (tree === false) return;
          const node = {
            attr: {},
            full: tree
          };
          const cxt = {
            name: nameFn,
            skip: skipFn,
            // break: breakFn,
            remove: removeFn,
            replace: replaceFn,
            _name: void 0,
            _skip: false,
            // _break: false,
            _remove: false,
            _replace: void 0
          };
          let e1IsNotAnObject = true;
          switch (Object.prototype.toString.call(tree)) {
            case "[object String]":
            case "[object Number]":
              return;
            case "[object Array]":
              tree.some(function(e, i) {
                if (i === 0) {
                  node.name = e;
                  return false;
                }
                if (i === 1) {
                  if (Object.prototype.toString.call(e) === "[object Object]") {
                    e1IsNotAnObject = false;
                    node.attr = e;
                  }
                  return true;
                }
              });
              enter.call(cxt, node, parent);
              if (cxt._name) {
                tree[0] = cxt._name;
              }
              if (cxt._replace) {
                return cxt._replace;
              }
              if (cxt._remove) {
                return null;
              }
              if (!cxt._skip) {
                let index = 0;
                let ilen = tree.length;
                while (index < ilen) {
                  if (index > 1 || index === 1 && e1IsNotAnObject) {
                    const returnRes = rec(tree[index], node);
                    if (returnRes === null) {
                      tree.splice(index, 1);
                      ilen -= 1;
                      continue;
                    }
                    if (returnRes) {
                      tree[index] = returnRes;
                    }
                  }
                  index += 1;
                }
                leave.call(cxt, node, parent);
                if (cxt._name) {
                  tree[0] = cxt._name;
                }
                if (cxt._replace) {
                  return cxt._replace;
                }
                if (cxt._remove) {
                  return null;
                }
              }
          }
        }
        rec(origin, void 0);
      }
      module.exports = traverse;
    }
  });

  // node_modules/onml/renderer.js
  var require_renderer = __commonJS({
    "node_modules/onml/renderer.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var renderer = (root) => {
        const content = typeof root === "string" ? document.getElementById(root) : root;
        return (ml) => {
          let str;
          try {
            str = stringify(ml);
            content.innerHTML = str;
          } catch (err) {
            console.log(ml, err);
          }
        };
      };
      module.exports = renderer;
    }
  });

  // node_modules/onml/tt.js
  var require_tt = __commonJS({
    "node_modules/onml/tt.js"(exports, module) {
      "use strict";
      module.exports = (x, y, obj) => {
        let objt = {};
        if (x || y) {
          const tt = [x || 0].concat(y ? [y] : []);
          objt = { transform: "translate(" + tt.join(",") + ")" };
        }
        obj = typeof obj === "object" ? obj : {};
        return Object.assign(objt, obj);
      };
    }
  });

  // node_modules/onml/gen-svg.js
  var require_gen_svg = __commonJS({
    "node_modules/onml/gen-svg.js"(exports, module) {
      "use strict";
      var w3 = {
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xmlns: "http://www.w3.org/XML/1998/namespace"
      };
      module.exports = (w, h) => ["svg", {
        xmlns: w3.svg,
        "xmlns:xlink": w3.xlink,
        width: w,
        height: h,
        viewBox: "0 0 " + w + " " + h
      }];
    }
  });

  // node_modules/onml/index.js
  var require_onml = __commonJS({
    "node_modules/onml/index.js"(exports) {
      "use strict";
      var parse = require_parse2();
      var stringify = require_stringify();
      var traverse = require_traverse();
      var renderer = require_renderer();
      var tt = require_tt();
      var genSvg = require_gen_svg();
      exports.renderer = renderer;
      exports.parse = parse;
      exports.stringify = stringify;
      exports.traverse = traverse;
      exports.tt = tt;
      exports.gen = {
        svg: genSvg
      };
      exports.p = parse;
      exports.s = stringify;
      exports.t = traverse;
    }
  });

  // lib/common.js
  var require_common = __commonJS({
    "lib/common.js"(exports, module) {
      "use strict";
      var rd = (n) => Math.round(n * 100) / 100;
      var esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var UNIT_LETTER = { 1: "w", 2: "h", 4: "q", 8: "e", 16: "s", 32: "t" };
      function timeLabel(model) {
        let s = model.time[0] + "/" + model.time[1];
        if (model.tempo !== null) s += "  " + UNIT_LETTER[model.time[1]] + " = " + model.tempo;
        return s;
      }
      function describe(model) {
        const bars = model.bars + (model.bars === 1 ? " bar" : " bars");
        const names = model.lanes.map((l) => l.name).join(", ");
        return "Drum pattern in " + model.time[0] + "/" + model.time[1] + ", " + bars + ", lanes: " + names + ".";
      }
      function text(x, y, size, fill, str, extra) {
        return ["text", { x: rd(x), y: rd(y), "font-size": size, fill, ...extra }, esc(str)];
      }
      function header(model, skin) {
        let y = skin.margin_top;
        const nodes = [];
        if (model.name) {
          y += skin.title_size;
          nodes.push(text(skin.margin_left, y, skin.title_size, skin.title_color, model.name, { "font-weight": "bold" }));
        }
        if (model.subtitle) {
          y += skin.subtitle_size + 4;
          nodes.push(text(skin.margin_left, y, skin.subtitle_size, skin.subtitle_color, model.subtitle));
        }
        const tempoY = model.name ? skin.margin_top + skin.title_size : skin.margin_top + skin.tempo_size;
        if (!model.name && !model.subtitle) y = tempoY;
        y += skin.title_gap;
        return { nodes, y, tempoY };
      }
      function tempoText(model, skin, width, tempoY) {
        return text(width - skin.margin_right, tempoY, skin.tempo_size, skin.subtitle_color, timeLabel(model), { "text-anchor": "end" });
      }
      module.exports = { rd, esc, text, timeLabel, describe, header, tempoText };
    }
  });

  // lib/render-lanes.js
  var require_render_lanes = __commonJS({
    "lib/render-lanes.js"(exports, module) {
      "use strict";
      var { rd, esc, text, describe, header, tempoText } = require_common();
      function countLabels(beats, spb) {
        const syllables = { 1: [], 2: ["&"], 3: ["&", "a"], 4: ["e", "&", "a"] }[spb];
        const out = [];
        for (let b = 0; b < beats; b++) {
          for (let s = 0; s < spb; s++) {
            if (!syllables) out.push(String(b * spb + s + 1));
            else out.push(s === 0 ? String(b + 1) : syllables[s - 1]);
          }
        }
        return out;
      }
      function head(kind, cx, cy, r, color, skin) {
        const sw = { "stroke-width": skin.mark_stroke, "stroke-linecap": "round" };
        if (kind === "x" || kind === "x_open") {
          const d = r * 0.85;
          const nodes = [
            ["path", {
              d: "M" + rd(cx - d) + "," + rd(cy - d) + "L" + rd(cx + d) + "," + rd(cy + d) + "M" + rd(cx - d) + "," + rd(cy + d) + "L" + rd(cx + d) + "," + rd(cy - d),
              stroke: color,
              fill: "none",
              ...sw
            }]
          ];
          if (kind === "x_open") {
            nodes.push(["circle", { cx: rd(cx), cy: rd(cy), r: rd(r * 1.3), fill: "none", stroke: color, "stroke-width": rd(skin.mark_stroke * 0.75) }]);
          }
          return nodes;
        }
        if (kind === "diamond") {
          const pts = [[cx, cy - r * 1.15], [cx + r * 1.15, cy], [cx, cy + r * 1.15], [cx - r * 1.15, cy]];
          return [["polygon", { points: pts.map((p) => rd(p[0]) + "," + rd(p[1])).join(" "), fill: color }]];
        }
        return [["circle", { cx: rd(cx), cy: rd(cy), r: rd(r), fill: color }]];
      }
      function mark(lane, hit, cx, cy, skin) {
        const isAccent = hit.accent === "accent";
        const isGhost = hit.accent === "ghost";
        const scale = isAccent ? skin.accent_scale : isGhost ? skin.ghost_scale : 1;
        const r = skin.mark_r * scale;
        const color = isAccent ? skin.accent_color : isGhost ? skin.ghost_color : skin.mark_color;
        const nodes = [];
        if (hit.articulation === "flam") {
          const gr = skin.mark_r * skin.flam_scale;
          const gk = lane.head === "x_open" ? "x" : lane.head;
          nodes.push(...head(gk, cx - r - gr - 1.5, cy, gr, color, { ...skin, mark_stroke: skin.mark_stroke * 0.7 }));
        }
        nodes.push(...head(lane.head, cx, cy, r, color, skin));
        if (isAccent) {
          const top = cy - r - 6.5;
          nodes.push(["path", {
            d: "M" + rd(cx - 4) + "," + rd(top) + "L" + rd(cx + 4) + "," + rd(top + 2.75) + "L" + rd(cx - 4) + "," + rd(top + 5.5),
            fill: "none",
            stroke: color,
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }]);
        }
        if (isGhost) {
          const off = r + 3.5;
          const p = (x, dir) => "M" + rd(x + dir * 2) + "," + rd(cy - 5) + "Q" + rd(x - dir * 2) + "," + rd(cy) + " " + rd(x + dir * 2) + "," + rd(cy + 5);
          nodes.push(["path", { d: p(cx - off, 1), fill: "none", stroke: color, "stroke-width": 1.2, "stroke-linecap": "round" }]);
          nodes.push(["path", { d: p(cx + off, -1), fill: "none", stroke: color, "stroke-width": 1.2, "stroke-linecap": "round" }]);
        }
        return nodes;
      }
      function renderLanes(id, model, skin, options) {
        const prefix = "drumdrom-" + (id === null || id === void 0 ? 0 : id);
        const perBar = model.steps_per_bar;
        const spb = model.steps_per_beat;
        const beats = model.time[0];
        const perRow = Math.max(1, Math.min(Math.floor(skin.bars_per_row) || 1, model.bars));
        const rowCount = Math.ceil(model.bars / perRow);
        const gridW = perRow * perBar * skin.cell_w;
        const x0 = skin.margin_left + skin.label_w;
        const lanesH = model.lanes.length * skin.row_h;
        const rowH = skin.count_h + lanesH;
        const labels = countLabels(beats, spb);
        const showHeader = !(options && options.header === false);
        const head2 = showHeader ? header(model, skin) : { nodes: [], y: skin.margin_top, tempoY: 0 };
        const y0 = head2.y;
        const width = Math.max(rd(x0 + gridW + skin.margin_right), 240);
        const headerNodes = showHeader ? [...head2.nodes, tempoText(model, skin, width, head2.tempoY)] : [];
        let y = y0;
        const rows = [];
        for (let r = 0; r < rowCount; r++) {
          const firstBar = r * perRow;
          const nBars = Math.min(perRow, model.bars - firstBar);
          const w = nBars * perBar * skin.cell_w;
          const top = y + skin.count_h;
          const g = [];
          for (let i = 0; i <= model.lanes.length; i++) {
            const ly = top + i * skin.row_h;
            g.push(["line", { x1: x0, y1: rd(ly), x2: rd(x0 + w), y2: rd(ly), stroke: skin.grid_color, "stroke-width": skin.grid_width }]);
          }
          for (let b = 0; b < nBars; b++) {
            for (let k = 1; k < beats; k++) {
              const bx = x0 + (b * perBar + k * spb) * skin.cell_w;
              g.push(["line", { x1: rd(bx), y1: rd(top), x2: rd(bx), y2: rd(top + lanesH), stroke: skin.beat_color, "stroke-width": skin.beat_width }]);
            }
          }
          for (let b = 0; b <= nBars; b++) {
            const bx = x0 + b * perBar * skin.cell_w;
            g.push(["line", { x1: rd(bx), y1: rd(top - 4), x2: rd(bx), y2: rd(top + lanesH), stroke: skin.bar_color, "stroke-width": skin.bar_width }]);
          }
          for (let b = 0; b < nBars; b++) {
            labels.forEach((lab, s) => {
              const isBeat = s % spb === 0;
              g.push(text(
                x0 + (b * perBar + s + 0.5) * skin.cell_w,
                y + skin.count_h - 8,
                skin.count_size,
                isBeat ? skin.count_beat_color : skin.count_color,
                lab,
                { "text-anchor": "middle", "font-weight": isBeat ? "bold" : "normal" }
              ));
            });
          }
          model.lanes.forEach((lane, i) => {
            const cy = top + (i + 0.5) * skin.row_h;
            g.push(text(x0 - 10, cy + skin.label_size * 0.35, skin.label_size, skin.label_color, lane.name, { "text-anchor": "end" }));
            const marks = [];
            lane.hits.forEach((hit) => {
              if (hit.bar < firstBar || hit.bar >= firstBar + nBars) return;
              const col = (hit.bar - firstBar) * perBar + hit.step_in_bar;
              marks.push(...mark(lane, hit, x0 + (col + 0.5) * skin.cell_w, cy, skin));
            });
            g.push(["g", { id: prefix + "-row" + r + "-" + lane.id }, ...marks]);
          });
          rows.push(["g", { id: prefix + "-row" + r }, ...g]);
          y += rowH + skin.row_gap;
        }
        const height = rd(y - skin.row_gap + skin.margin_bottom);
        const tid = prefix + "-title";
        const did = prefix + "-desc";
        return [
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            id: prefix,
            width,
            height,
            viewBox: "0 0 " + width + " " + height,
            role: "img",
            "aria-labelledby": tid + " " + did,
            "font-family": skin.font_family
          },
          ["title", { id: tid }, esc(model.name || "Drum pattern")],
          ["desc", { id: did }, esc(describe(model))],
          ["rect", { width: "100%", height: "100%", fill: skin.bg_color }],
          ["g", { id: prefix + "-header" }, ...headerNodes],
          ...rows
        ];
      }
      module.exports = renderLanes;
    }
  });

  // lib/glyphs.js
  var require_glyphs = __commonJS({
    "lib/glyphs.js"(exports, module) {
      "use strict";
      module.exports = {
        unpitchedPercussionClef1: { w: 1.528, d: "M0.64 0.94L0.64-0.94C0.64-0.972 0.616-1 0.584-1L0.056-1C0.024-1 0-0.972 0-0.94L0 0.94C0 0.972 0.024 1 0.056 1L0.584 1C0.616 1 0.64 0.972 0.64 0.94M1.528-0.94C1.528-0.972 1.504-1 1.472-1L0.944-1C0.912-1 0.888-0.972 0.888-0.94L0.888 0.94C0.888 0.972 0.912 1 0.944 1L1.472 1C1.504 1 1.528 0.972 1.528 0.94", box: [0, -1, 1.528, 1] },
        noteheadHalf: { w: 1.18, d: "M0.388 0.5C1.048 0.5 1.18-0.036 1.18-0.168C1.18-0.372 1.016-0.5 0.784-0.5C0.188-0.5 0-0.04 0 0.168C0 0.38 0.168 0.5 0.388 0.5M0.692 0.184C0.512 0.304 0.388 0.348 0.3 0.348C0.216 0.348 0.168 0.304 0.14 0.256C0.128 0.232 0.116 0.204 0.116 0.176C0.116 0.088 0.204-0.02 0.48-0.18C0.68-0.296 0.804-0.336 0.884-0.336C0.96-0.336 1.004-0.3 1.032-0.252C1.044-0.228 1.056-0.204 1.056-0.176C1.056-0.096 0.972 0 0.692 0.184", box: [0, -0.5, 1.18, 0.5], up: [1.18, -0.168], down: [0, 0.168] },
        noteheadBlack: { w: 1.18, d: "M0.388 0.5C0.744 0.5 1.18 0.172 1.18-0.168C1.18-0.372 1.02-0.5 0.792-0.5C0.352-0.5 0-0.176 0 0.168C0 0.376 0.172 0.5 0.388 0.5", box: [0, -0.5, 1.18, 0.5], up: [1.18, -0.168], down: [0, 0.168] },
        noteheadXBlack: { w: 1.16, d: "M1.14 0.396L0.664 0L1.14-0.4C1.152-0.408 1.16-0.428 1.16-0.444C1.16-0.476 1.132-0.5 1.108-0.5C1.1-0.5 1.088-0.496 1.08-0.492L0.576-0.072L0.08-0.492C0.072-0.496 0.06-0.5 0.048-0.5C0.02-0.5 0-0.472 0-0.448C0-0.432 0.008-0.412 0.02-0.4L0.496 0L0.02 0.396C0.004 0.408 0 0.424 0 0.44C0 0.472 0.02 0.5 0.052 0.5C0.064 0.5 0.072 0.496 0.08 0.488L0.576 0.068L1.08 0.488C1.088 0.496 1.1 0.5 1.108 0.5C1.14 0.5 1.16 0.468 1.16 0.444C1.16 0.424 1.152 0.408 1.14 0.396", box: [0, -0.5, 1.16, 0.5], up: [1.16, -0.444], down: [0, 0.44] },
        noteheadDiamondBlack: { w: 0.98, d: "M0.52-0.552C0.512-0.564 0.504-0.564 0.496-0.564C0.484-0.564 0.476-0.56 0.472-0.552L0.008-0.02C0-0.012 0-0.008 0 0C0 0.012 0.004 0.016 0.008 0.02L0.472 0.552C0.476 0.56 0.488 0.564 0.496 0.564C0.504 0.564 0.512 0.56 0.52 0.552L0.972 0.02C0.976 0.016 0.98 0.008 0.98 0C0.98-0.008 0.976-0.016 0.972-0.02", box: [0, -0.564, 0.98, 0.564], up: [0.978, 0], down: [0, 0] },
        noteheadParenthesisLeft: { w: 0.292, d: "M0.436 0.696C0.3 0.592 0.252 0.532 0.208 0.404C0.168 0.288 0.148 0.16 0.148-0.008C0.148-0.188 0.168-0.328 0.216-0.432C0.264-0.536 0.316-0.596 0.436-0.696L0.42-0.724C0.296-0.64 0.244-0.596 0.18-0.52C0.06-0.372 0-0.204 0-0.004C0 0.212 0.064 0.38 0.212 0.552C0.284 0.632 0.328 0.668 0.416 0.724", box: [0, -0.724, 0.436, 0.724] },
        noteheadParenthesisRight: { w: 0.292, d: "M-0.12 0.724C-0.032 0.668 0.012 0.632 0.08 0.552C0.228 0.38 0.292 0.212 0.292-0.004C0.292-0.204 0.232-0.372 0.112-0.52C0.048-0.596 0-0.64-0.128-0.724L-0.144-0.696C-0.02-0.596 0.032-0.536 0.08-0.432C0.124-0.328 0.148-0.188 0.148-0.008C0.148 0.16 0.128 0.288 0.088 0.404C0.04 0.532-0.008 0.592-0.144 0.696", box: [-0.144, -0.724, 0.292, 0.724] },
        flag8thUp: { w: 1.056, d: "M0.952 3.16C0.952 3.16 1.056 2.78 1.056 2.468C1.056 1.968 0.848 1.496 0.596 1.096C0.392 0.78 0.224 0.436 0.16 0.052C0.148-0.012 0.116-0.036 0.076-0.036C0.032-0.036 0-0.024 0 0.024L0 0.98C0.264 1.028 0.644 1.572 0.788 1.912C0.848 2.048 0.884 2.276 0.884 2.512C0.884 2.692 0.856 2.88 0.788 3.06C0.78 3.084 0.776 3.104 0.776 3.12C0.776 3.184 0.816 3.22 0.84 3.236C0.844 3.24 0.852 3.24 0.86 3.24C0.888 3.24 0.936 3.216 0.952 3.16", box: [0, -0.036, 1.056, 3.24] },
        flag8thDown: { w: 1.224, d: "M0.96-3.04C1.016-2.872 1.044-2.672 1.044-2.492C1.044-2.256 0.944-1.92 0.884-1.784C0.736-1.448 0.536-1.124 0-0.944L0-0.004C0 0.036 0.032 0.056 0.064 0.056C0.1 0.056 0.152 0.032 0.16-0.032C0.228-0.412 0.524-0.76 0.728-1.076C0.98-1.472 1.224-1.948 1.224-2.448C1.224-2.76 1.144-3.044 1.112-3.172C1.1-3.216 1.076-3.232 1.048-3.232C1-3.232 0.948-3.184 0.948-3.108C0.948-3.088 0.952-3.064 0.96-3.04", box: [0, -3.232, 1.224, 0.056] },
        flag16thUp: { w: 1.116, d: "M1.088 3.184C1.104 3.164 1.116 2.936 1.116 2.744L1.116 2.656C1.116 2.488 1.072 2.324 1 2.176C1 2.164 0.996 2.156 0.996 2.14C0.996 2.132 0.996 2.124 1 2.112C1.012 2.088 1.1 1.848 1.1 1.604C1.1 1.552 1.096 1.508 1.088 1.46C1.048 1.188 0.944 1.076 0.656 0.764C0.44 0.532 0.216 0.468 0.148 0.044C0.14 0 0.092-0.008 0.068-0.008C0.044-0.008 0 0.004 0 0.032L0 1.584L0.02 1.584C0.268 1.592 0.552 1.6 0.828 2.16C0.92 2.352 0.956 2.548 0.956 2.756C0.956 2.872 0.944 2.992 0.924 3.112C0.92 3.128 0.92 3.136 0.92 3.148C0.92 3.204 0.948 3.236 0.976 3.244C0.988 3.248 0.996 3.252 1.008 3.252C1.036 3.252 1.064 3.236 1.088 3.184M0.836 1.836C0.772 1.736 0.704 1.656 0.62 1.56C0.432 1.344 0.248 1.248 0.164 0.92C0.16 0.916 0.16 0.912 0.16 0.908C0.16 0.892 0.184 0.868 0.216 0.868L0.248 0.868C0.492 0.868 0.708 1.092 0.84 1.288C0.912 1.392 0.948 1.516 0.948 1.644C0.948 1.672 0.948 1.696 0.944 1.724C0.936 1.756 0.936 1.796 0.916 1.828C0.912 1.84 0.884 1.852 0.864 1.852C0.852 1.852 0.844 1.848 0.836 1.836", box: [0, -8e-3, 1.116, 3.252] },
        flag16thDown: { w: 1.168, d: "M0.96-3.144C0.984-3.016 0.996-2.88 0.996-2.748C0.996-2.536 0.96-2.324 0.868-2.132C0.592-1.572 0.268-1.56 0.02-1.552L0-1.552L0-0.004C0 0.016 0.028 0.036 0.068 0.036C0.096 0.036 0.14 0.028 0.148-0.016C0.244-0.632 1.032-0.804 1.128-1.432C1.136-1.476 1.14-1.524 1.14-1.576C1.14-1.82 1.052-2.06 1.04-2.084C1.036-2.092 1.036-2.1 1.036-2.112C1.036-2.128 1.04-2.136 1.04-2.148C1.128-2.332 1.164-2.548 1.164-2.764C1.164-2.9 1.148-3.036 1.124-3.16C1.104-3.252 1.076-3.248 1.028-3.248C0.98-3.244 0.948-3.212 0.96-3.144M0.904-1.824C0.924-1.824 0.952-1.812 0.956-1.796C0.976-1.768 0.976-1.728 0.984-1.696C0.988-1.668 0.988-1.64 0.988-1.616C0.988-1.484 0.952-1.364 0.88-1.26C0.748-1.064 0.492-0.84 0.248-0.84L0.216-0.84C0.184-0.84 0.16-0.86 0.16-0.88C0.16-0.884 0.16-0.888 0.164-0.892C0.248-1.22 0.472-1.312 0.66-1.532C0.744-1.624 0.812-1.704 0.876-1.808C0.884-1.82 0.892-1.824 0.904-1.824", box: [0, -3.248, 1.164, 0.036] },
        flag32ndUp: { w: 1.048, d: "M1.04 2.692C1.032 2.536 0.996 2.384 0.936 2.24C0.932 2.232 0.932 2.224 0.932 2.212C0.932 2.204 0.932 2.196 0.936 2.188C0.944 2.16 1.028 1.94 1.028 1.712C1.028 1.664 1.024 1.62 1.016 1.572C1 1.48 0.976 1.408 0.944 1.34C0.98 1.236 1.024 1.072 1.024 0.916C1.024 0.876 1.024 0.84 1.016 0.804C0.972 0.56 0.88 0.452 0.612 0.16C0.412-0.056 0.196-0.12 0.128-0.52C0.124-0.556 0.096-0.596 0.056-0.596C0.032-0.596 0-0.576 0-0.548L0 1.692L0.02 1.692C0.252 1.7 0.516 1.708 0.772 2.228C0.86 2.404 0.896 2.584 0.896 2.776C0.896 2.888 0.884 3 0.864 3.116C0.864 3.128 0.86 3.136 0.86 3.144C0.86 3.192 0.884 3.228 0.912 3.24C0.92 3.244 0.928 3.248 0.936 3.248C0.96 3.248 0.988 3.228 1.016 3.184C1.028 3.16 1.044 2.976 1.044 2.804C1.044 2.764 1.04 2.728 1.04 2.692M0.832 0.724C0.876 0.804 0.892 0.864 0.892 0.916C0.892 0.948 0.884 0.972 0.88 1C0.872 1.04 0.852 1.108 0.832 1.176C0.776 1.104 0.704 1.028 0.612 0.928C0.416 0.712 0.22 0.644 0.156 0.256C0.376 0.256 0.612 0.352 0.832 0.724M0.876 1.824C0.868 1.856 0.868 1.888 0.856 1.916C0.852 1.928 0.832 1.94 0.812 1.94C0.8 1.94 0.788 1.936 0.784 1.924C0.724 1.836 0.668 1.768 0.6 1.688L0.58 1.668C0.408 1.464 0.244 1.376 0.156 1.084C0.148 1.056 0.168 1.02 0.204 1.02C0.456 1.02 0.66 1.224 0.784 1.408C0.848 1.504 0.884 1.612 0.884 1.728C0.884 1.76 0.88 1.792 0.876 1.824", box: [0, -0.596, 1.044, 3.248] },
        flag32ndDown: { w: 1.096, d: "M1.092-2.704C1.092-2.904 1.024-3.156 1.008-3.184C0.98-3.232 0.952-3.248 0.924-3.248C0.916-3.248 0.908-3.248 0.9-3.244C0.872-3.232 0.844-3.192 0.844-3.14C0.844-3.132 0.848-3.124 0.848-3.112C0.88-2.932 0.928-2.808 0.928-2.672C0.928-2.56 0.896-2.444 0.804-2.28C0.5-1.736 0.244-1.728 0-1.72L0 0.636C0 0.672 0.024 0.688 0.056 0.688C0.096 0.688 0.128 0.644 0.132 0.608C0.2 0.192 0.428 0.128 0.636-0.1C0.916-0.404 1.012-0.516 1.056-0.772C1.064-0.808 1.064-0.848 1.064-0.888C1.064-1.06 1.012-1.236 0.976-1.344C1.016-1.416 1.04-1.496 1.056-1.592C1.064-1.644 1.068-1.696 1.068-1.748C1.068-1.956 1.004-2.128 0.988-2.168C0.988-2.18 0.976-2.192 0.976-2.204C0.976-2.212 0.98-2.22 0.988-2.232L1.004-2.26C1.056-2.36 1.076-2.404 1.092-2.66M0.156-1.072C0.24-1.392 0.424-1.48 0.604-1.692C0.684-1.784 0.748-1.86 0.812-1.96C0.82-1.972 0.832-1.976 0.844-1.976C0.864-1.976 0.888-1.964 0.892-1.952C0.904-1.924 0.904-1.892 0.912-1.86C0.916-1.828 0.92-1.792 0.92-1.76C0.92-1.64 0.88-1.524 0.812-1.424C0.688-1.232 0.476-1.02 0.228-1.02L0.208-1.02C0.172-1.02 0.156-1.052 0.156-1.072M0.916-0.972C0.92-0.944 0.928-0.92 0.928-0.888C0.928-0.836 0.912-0.772 0.864-0.688C0.636-0.304 0.392-0.2 0.164-0.2C0.156-0.204 0.156-0.208 0.156-0.212C0.224-0.628 0.428-0.692 0.636-0.92C0.732-1.024 0.804-1.104 0.86-1.176C0.884-1.1 0.904-1.016 0.916-0.972", box: [0, -3.248, 1.092, 0.688] },
        restWhole: { w: 1.132, d: "M1.128 0.436L1.128 0.068C1.128 0.008 1.08-0.036 1.024-0.036L0.104-0.036C0.044-0.036 0 0.008 0 0.068L0 0.436C0 0.492 0.044 0.54 0.104 0.54L1.024 0.54C1.08 0.54 1.128 0.492 1.128 0.436", box: [0, -0.036, 1.128, 0.54] },
        restHalf: { w: 1.132, d: "M1.128-0.096L1.128-0.464C1.128-0.524 1.08-0.568 1.024-0.568L0.104-0.568C0.044-0.568 0-0.524 0-0.464L0-0.096C0-0.04 0.044 0.008 0.104 0.008L1.024 0.008C1.08 0.008 1.128-0.04 1.128-0.096", box: [0, -0.568, 1.128, 8e-3] },
        restQuarter: { w: 1.08, d: "M0.312 0.152C0.376 0.232 0.432 0.308 0.484 0.392C0.492 0.408 0.508 0.44 0.508 0.448C0.508 0.452 0.508 0.46 0.504 0.464C0.496 0.48 0.48 0.484 0.46 0.484C0.444 0.484 0.412 0.476 0.396 0.472C0.376 0.472 0.352 0.46 0.332 0.46C0.16 0.46 0.004 0.632 0.004 0.844C0.004 1.044 0.176 1.24 0.468 1.464C0.5 1.488 0.54 1.5 0.572 1.5C0.6 1.5 0.628 1.492 0.632 1.476C0.636 1.464 0.64 1.456 0.64 1.448C0.64 1.412 0.608 1.38 0.576 1.352C0.524 1.352 0.48 1.244 0.472 1.208C0.46 1.176 0.456 1.14 0.456 1.104C0.456 0.98 0.516 0.84 0.644 0.816C0.664 0.812 0.684 0.812 0.708 0.812C0.824 0.812 0.956 0.856 1.02 0.88C1.024 0.88 1.028 0.884 1.032 0.884C1.044 0.888 1.052 0.888 1.06 0.888C1.072 0.888 1.08 0.884 1.08 0.872C1.08 0.824 0.976 0.692 0.932 0.644C0.78 0.46 0.656 0.312 0.656 0.088C0.656 0.072 0.66 0.052 0.66 0.036C0.676-0.196 0.82-0.388 0.924-0.552C0.936-0.572 0.94-0.592 0.94-0.612C0.94-0.652 0.924-0.688 0.924-0.688C0.924-0.688 0.332-1.392 0.264-1.46C0.244-1.48 0.216-1.492 0.192-1.492C0.152-1.492 0.112-1.464 0.112-1.408C0.112-1.388 0.116-1.368 0.128-1.344C0.144-1.3 0.372-1.096 0.372-0.808C0.372-0.66 0.312-0.488 0.132-0.3C0.092-0.26 0.076-0.216 0.076-0.184C0.076-0.128 0.116-0.088 0.116-0.088", box: [4e-3, -1.492, 1.08, 1.5] },
        rest8th: { w: 1, d: "M0.536-0.428C0.536-0.576 0.416-0.696 0.268-0.696C0.12-0.696 0-0.576 0-0.428C0-0.344 0.048-0.272 0.108-0.224C0.144-0.2 0.18-0.18 0.22-0.172C0.252-0.164 0.288-0.156 0.324-0.156C0.38-0.156 0.436-0.168 0.48-0.184C0.536-0.2 0.572-0.216 0.624-0.244C0.632-0.248 0.64-0.248 0.644-0.248C0.66-0.248 0.664-0.232 0.664-0.212C0.664-0.2 0.664-0.184 0.66-0.168C0.648-0.108 0.36 0.688 0.288 0.952C0.288 1 0.38 1.004 0.404 1.004C0.448 1.004 0.504 0.996 0.544 0.964C0.556 0.956 0.948-0.448 0.948-0.448C0.964-0.52 0.984-0.584 0.988-0.604C0.988-0.644 0.948-0.664 0.94-0.668C0.932-0.668 0.92-0.668 0.896-0.652C0.868-0.628 0.668-0.388 0.536-0.388", box: [0, -0.696, 0.988, 1.004] },
        rest16th: { w: 1.28, d: "M0.832-0.444C0.832-0.596 0.712-0.716 0.56-0.716C0.412-0.716 0.288-0.596 0.288-0.444C0.288-0.364 0.336-0.288 0.4-0.24C0.432-0.216 0.472-0.196 0.512-0.184C0.54-0.176 0.572-0.172 0.608-0.172C0.664-0.172 0.728-0.184 0.776-0.2C0.832-0.216 0.868-0.232 0.92-0.26C0.932-0.264 0.94-0.268 0.948-0.268C0.96-0.268 0.968-0.26 0.968-0.24C0.968-0.228 0.964-0.208 0.956-0.18C0.948-0.148 0.772 0.404 0.736 0.48C0.704 0.556 0.596 0.604 0.54 0.604C0.544 0.588 0.544 0.576 0.544 0.564C0.544 0.412 0.42 0.292 0.272 0.292C0.12 0.292 0 0.412 0 0.564C0 0.644 0.048 0.72 0.112 0.768C0.144 0.792 0.18 0.812 0.22 0.824C0.252 0.832 0.284 0.836 0.32 0.836C0.376 0.836 0.44 0.824 0.488 0.808C0.544 0.792 0.568 0.78 0.62 0.752C0.628 0.752 0.636 0.76 0.636 0.772C0.636 0.776 0.632 0.78 0.632 0.784L0.252 1.916C0.252 1.92 0.248 1.924 0.248 1.928C0.248 1.96 0.284 2 0.372 2C0.488 2 0.508 1.952 0.524 1.908L0.988 0.384C1.092 0.044 1.168-0.224 1.168-0.224C1.168-0.224 1.268-0.576 1.276-0.628C1.276-0.636 1.28-0.64 1.28-0.644C1.28-0.668 1.248-0.684 1.24-0.688C1.22-0.688 1.208-0.68 1.196-0.672C1.168-0.648 0.968-0.408 0.832-0.404", box: [0, -0.716, 1.28, 2] },
        rest32nd: { w: 1.452, d: "M1.412-1.676C1.392-1.676 1.38-1.668 1.368-1.66C1.34-1.64 1.14-1.396 1.004-1.396L1.004-1.432C1.004-1.584 0.884-1.704 0.732-1.704C0.584-1.704 0.46-1.584 0.46-1.432C0.46-1.352 0.508-1.28 0.572-1.232C0.604-1.204 0.644-1.188 0.684-1.176C0.716-1.168 0.748-1.16 0.788-1.16C0.844-1.16 0.904-1.172 0.952-1.188C1.008-1.208 1.04-1.22 1.092-1.248C1.096-1.252 1.104-1.252 1.108-1.252C1.136-1.252 1.152-1.212 1.152-1.188C1.152-1.184 1.148-1.176 1.148-1.172L0.992-0.532C0.972-0.468 0.84-0.388 0.776-0.388C0.78-0.4 0.78-0.412 0.78-0.424C0.78-0.576 0.656-0.696 0.508-0.696C0.356-0.696 0.236-0.576 0.236-0.424C0.236-0.344 0.284-0.272 0.348-0.224C0.38-0.196 0.416-0.18 0.456-0.168C0.488-0.16 0.524-0.152 0.564-0.152C0.62-0.152 0.68-0.164 0.724-0.18C0.78-0.2 0.812-0.212 0.864-0.24C0.868-0.244 0.872-0.244 0.876-0.244C0.896-0.244 0.904-0.212 0.904-0.192L0.744 0.464C0.724 0.548 0.6 0.6 0.54 0.604C0.544 0.588 0.544 0.576 0.544 0.564C0.544 0.412 0.424 0.292 0.272 0.292C0.124 0.292 0 0.412 0 0.564C0 0.644 0.048 0.72 0.112 0.768C0.144 0.792 0.184 0.812 0.224 0.824C0.252 0.832 0.284 0.836 0.32 0.836C0.376 0.836 0.44 0.824 0.488 0.808C0.544 0.792 0.58 0.776 0.632 0.748C0.636 0.744 0.64 0.744 0.644 0.744C0.656 0.744 0.668 0.756 0.668 0.768C0.668 0.784 0.392 1.884 0.384 1.912C0.38 1.92 0.38 1.928 0.38 1.936C0.38 1.968 0.404 2 0.488 2C0.616 2 0.628 1.96 0.644 1.916C0.656 1.868 1.344-1.212 1.344-1.212C1.344-1.212 1.44-1.568 1.448-1.616C1.448-1.624 1.452-1.628 1.452-1.632C1.452-1.668 1.42-1.676 1.412-1.676", box: [0, -1.704, 1.452, 2] },
        articAccentAbove: { w: 1.356, d: "M1.304-0.42C1.356-0.432 1.356-0.46 1.356-0.492C1.356-0.524 1.356-0.548 1.304-0.564L0.104-0.972C0.088-0.976 0.072-0.98 0.068-0.98C0.032-0.98 0.02-0.956 0.008-0.924C0.004-0.908 0-0.896 0-0.884C0-0.864 0.012-0.844 0.056-0.828C0.056-0.828 0.92-0.536 0.96-0.52C0.98-0.516 0.988-0.504 0.988-0.492C0.988-0.48 0.98-0.472 0.956-0.464C0.912-0.452 0.056-0.16 0.056-0.16C0.012-0.14 0-0.12 0-0.1C0-0.088 0.004-0.076 0.008-0.064C0.02-0.036 0.036-0.004 0.064-0.004C0.068-0.004 0.076-0.004 0.08-0.008", box: [0, -0.98, 1.356, -4e-3] },
        articAccentBelow: { w: 1.356, d: "M1.304 0.56C1.356 0.548 1.356 0.52 1.356 0.488C1.356 0.456 1.356 0.432 1.304 0.416L0.104 0.008C0.088 0.004 0.072 0 0.068 0C0.032 0 0.02 0.024 0.008 0.056C0.004 0.072 0 0.084 0 0.096C0 0.116 0.012 0.136 0.056 0.152C0.056 0.152 0.92 0.444 0.96 0.46C0.98 0.464 0.988 0.476 0.988 0.488C0.988 0.5 0.98 0.508 0.956 0.516C0.912 0.528 0.056 0.82 0.056 0.82C0.012 0.84 0 0.86 0 0.88C0 0.892 0.004 0.904 0.008 0.916C0.02 0.944 0.036 0.976 0.064 0.976C0.068 0.976 0.076 0.976 0.08 0.972", box: [0, 0, 1.356, 0.976] },
        timeSig0: { w: 1.88, d: "M1.8 0C1.8-0.556 1.416-1.004 0.94-1.004C0.464-1.004 0.08-0.556 0.08 0C0.08 0.552 0.464 1 0.94 1C1.416 1 1.8 0.552 1.8 0M0.94-0.88C1.104-0.88 1.24-0.5 1.24-0.028C1.24 0.44 1.104 0.82 0.94 0.82C0.772 0.82 0.64 0.44 0.64-0.028C0.64-0.5 0.772-0.88 0.94-0.88", box: [0.08, -1.004, 1.8, 1] },
        timeSig1: { w: 1.336, d: "M0.096-0.052C0.096-0.052 0.08-0.028 0.08 0C0.08 0.02 0.092 0.044 0.124 0.056C0.14 0.06 0.156 0.064 0.16 0.064C0.2 0.064 0.216 0.028 0.216 0.028C0.216 0.028 0.388-0.248 0.432-0.324C0.448-0.352 0.464-0.364 0.472-0.364C0.488-0.364 0.496-0.332 0.496-0.308L0.496 0.724C0.496 0.816 0.404 0.876 0.32 0.876C0.292 0.876 0.252 0.888 0.252 0.936C0.252 0.98 0.288 1 0.34 1L1.192 1C1.256 1 1.256 0.936 1.256 0.936C1.256 0.936 1.256 0.876 1.196 0.876C1.14 0.876 1.068 0.804 1.068 0.736L1.068-0.912C1.068-0.976 1.044-1 0.988-1.004C0.932-1.004 0.832-0.988 0.78-0.988C0.704-0.988 0.632-0.992 0.572-1C0.564-1 0.556-1.004 0.552-1.004C0.512-1.004 0.496-0.964 0.48-0.928", box: [0.08, -1.004, 1.256, 1] },
        timeSig2: { w: 1.784, d: "M1.684 0.364C1.684 0.316 1.664 0.308 1.636 0.308C1.604 0.308 1.592 0.324 1.584 0.348C1.584 0.352 1.58 0.356 1.58 0.36C1.54 0.456 1.508 0.532 1.424 0.532C1.404 0.532 1.384 0.528 1.356 0.52C1.304 0.5 1.276 0.496 1.236 0.476C1.156 0.444 0.968 0.38 0.804 0.38C0.752 0.38 0.7 0.388 0.656 0.404C0.744 0.26 1.084 0.14 1.172 0.116C1.232 0.1 1.4 0.068 1.532-0.04C1.628-0.116 1.704-0.232 1.704-0.408C1.704-0.596 1.624-0.732 1.52-0.82C1.316-0.992 1.004-1.016 0.916-1.016C0.808-1.016 0.672-1.012 0.568-0.988C0.428-0.96 0.288-0.876 0.192-0.764C0.124-0.68 0.08-0.58 0.08-0.472C0.08-0.416 0.092-0.36 0.116-0.3C0.176-0.176 0.3-0.08 0.444-0.08C0.688-0.08 0.724-0.332 0.724-0.432C0.724-0.672 0.448-0.684 0.448-0.764C0.456-0.82 0.528-0.916 0.764-0.916C1.12-0.916 1.124-0.648 1.124-0.532C1.124-0.38 1.076-0.24 0.988-0.124C0.844 0.068 0.732 0.164 0.536 0.284C0.316 0.424 0.16 0.62 0.092 0.872C0.092 0.88 0.088 0.888 0.088 0.896C0.088 0.94 0.116 0.992 0.16 1.02C0.172 1.028 0.184 1.028 0.192 1.028C0.28 1.028 0.328 0.784 0.564 0.784C0.724 0.784 0.784 1 1.14 1C1.312 1 1.62 0.984 1.684 0.364", box: [0.08, -1.016, 1.704, 1.028] },
        timeSig3: { w: 1.684, d: "M0.852-0.992C0.832-0.992 0.812-0.996 0.792-0.996C0.448-0.996 0.104-0.768 0.104-0.556C0.104-0.424 0.18-0.248 0.428-0.232L0.448-0.232C0.624-0.232 0.712-0.36 0.712-0.492L0.712-0.524C0.7-0.672 0.6-0.68 0.58-0.688C0.56-0.696 0.5-0.688 0.5-0.744L0.5-0.76C0.508-0.828 0.632-0.86 0.668-0.86C1.008-0.86 1.04-0.648 1.04-0.552L1.04-0.524C1.04-0.228 0.804-0.112 0.552-0.1C0.512-0.096 0.456-0.076 0.456-0.032C0.456 0.016 0.524 0.016 0.556 0.016C1.016 0.016 1.052 0.328 1.052 0.38C1.052 0.804 0.836 0.852 0.748 0.852C0.732 0.852 0.716 0.848 0.712 0.848C0.68 0.844 0.604 0.844 0.6 0.784L0.6 0.764C0.6 0.676 0.688 0.616 0.692 0.5C0.692 0.46 0.688 0.416 0.672 0.376C0.628 0.276 0.512 0.212 0.404 0.212C0.388 0.212 0.376 0.212 0.36 0.216C0.292 0.228 0.216 0.268 0.168 0.32C0.1 0.38 0.08 0.476 0.08 0.564C0.088 0.876 0.372 0.996 0.764 1.004L0.8 1.004C1.196 1.004 1.604 0.8 1.604 0.448L1.604 0.42C1.6 0.364 1.592 0.308 1.568 0.256C1.552 0.216 1.524 0.176 1.492 0.14C1.468 0.108 1.436 0.08 1.396 0.056L1.312 0.008L1.18-0.028C1.16-0.032 1.148-0.032 1.14-0.048C1.136-0.056 1.136-0.06 1.136-0.068C1.136-0.084 1.14-0.1 1.152-0.104C1.196-0.116 1.24-0.12 1.276-0.14C1.336-0.168 1.388-0.196 1.432-0.248C1.496-0.32 1.52-0.412 1.52-0.504C1.52-0.872 1.02-0.98 0.852-0.992", box: [0.08, -0.996, 1.604, 1.004] },
        timeSig4: { w: 1.88, d: "M1.448 0.296L1.448-0.56C1.448-0.592 1.444-0.628 1.4-0.628C1.364-0.628 1.344-0.62 1.32-0.592L0.94-0.132C0.924-0.112 0.904-0.088 0.904-0.04L0.904 0.296L0.364 0.296C0.684 0.024 1.324-0.884 1.336-0.928C1.336-0.936 1.34-0.94 1.34-0.948C1.34-0.98 1.312-1.004 1.28-1.004C1.244-1.004 1.08-0.996 1.008-0.996C0.936-0.996 0.756-1.004 0.724-1.004C0.688-1.004 0.632-0.992 0.632-0.928C0.632-0.432 0.24 0.124 0.12 0.292L0.096 0.324C0.096 0.328 0.092 0.332 0.092 0.336C0.084 0.352 0.08 0.368 0.08 0.38C0.08 0.42 0.112 0.448 0.16 0.448L0.904 0.448L0.904 0.7C0.904 0.808 0.816 0.84 0.744 0.84C0.68 0.84 0.652 0.876 0.652 0.916C0.652 0.956 0.668 1 0.728 1L1.58 1C1.62 1 1.66 0.972 1.66 0.916C1.66 0.86 1.612 0.836 1.572 0.836C1.532 0.836 1.448 0.812 1.448 0.684L1.448 0.448L1.74 0.448C1.78 0.448 1.8 0.42 1.8 0.372C1.8 0.324 1.784 0.296 1.74 0.296", box: [0.08, -1.004, 1.8, 1] },
        timeSig5: { w: 1.612, d: "M0.304-0.236C0.304-0.236 0.32-0.46 0.324-0.496C0.328-0.528 0.348-0.548 0.384-0.548L0.4-0.548C0.44-0.54 0.628-0.512 0.792-0.512C1.348-0.512 1.368-0.832 1.368-0.896C1.368-0.948 1.356-0.98 1.312-0.98C1.26-0.98 0.948-0.944 0.82-0.944C0.692-0.944 0.348-0.976 0.28-0.984C0.208-0.984 0.188-0.948 0.184-0.916L0.14-0.028L0.14-0.02C0.14 0.032 0.18 0.04 0.22 0.04C0.26 0.04 0.264 0.004 0.308-0.04C0.348-0.08 0.444-0.172 0.58-0.172C0.716-0.172 0.992-0.096 0.992 0.348C0.992 0.788 0.756 0.844 0.652 0.844C0.62 0.844 0.588 0.844 0.56 0.832C0.54 0.82 0.516 0.804 0.512 0.776C0.512 0.748 0.54 0.732 0.56 0.72C0.652 0.664 0.712 0.564 0.712 0.452C0.712 0.276 0.572 0.14 0.4 0.14C0.184 0.14 0.096 0.296 0.084 0.436C0.08 0.46 0.08 0.484 0.08 0.508C0.08 0.84 0.296 1.004 0.788 1.004C1.268 1.004 1.532 0.708 1.532 0.348C1.532-0.016 1.236-0.312 0.872-0.312C0.64-0.312 0.468-0.272 0.34-0.196C0.332-0.192 0.324-0.192 0.32-0.192C0.304-0.192 0.304-0.208 0.304-0.22", box: [0.08, -0.984, 1.532, 1.004] },
        timeSig6: { w: 1.736, d: "M1.04-0.4C1.088-0.352 1.156-0.332 1.22-0.332C1.252-0.332 1.288-0.34 1.32-0.348C1.444-0.38 1.54-0.508 1.54-0.636C1.54-0.652 1.54-0.664 1.536-0.68C1.516-0.812 1.404-0.908 1.284-0.952C1.188-0.992 1.072-1.004 0.968-1.004C0.664-1 0.38-0.852 0.236-0.58C0.148-0.412 0.08-0.2 0.08-0.012L0.08 0.004C0.084 0.188 0.116 0.396 0.204 0.556C0.288 0.708 0.424 0.872 0.58 0.94C0.68 0.984 0.8 0.996 0.9 0.996C1.08 0.996 1.28 0.968 1.424 0.852C1.564 0.74 1.656 0.56 1.656 0.38C1.656 0.156 1.536 0.02 1.408-0.076C1.3-0.156 1.176-0.2 1.052-0.2C0.924-0.2 0.792-0.152 0.688-0.06C0.68-0.052 0.672-0.052 0.664-0.052C0.64-0.052 0.628-0.084 0.628-0.148C0.64-0.888 0.876-0.908 0.96-0.908C1.04-0.908 1.092-0.888 1.092-0.848C1.092-0.792 1.016-0.744 0.992-0.696C0.972-0.66 0.964-0.62 0.964-0.58C0.964-0.52 0.984-0.46 1.024-0.416C1.028-0.408 1.036-0.404 1.04-0.4M0.888-0.008C1.016-0.008 1.124 0.192 1.124 0.44C1.124 0.688 1.016 0.888 0.888 0.888C0.76 0.888 0.656 0.688 0.656 0.44C0.656 0.192 0.76-0.008 0.888-0.008", box: [0.08, -1.004, 1.656, 0.996] },
        timeSig7: { w: 1.764, d: "M1.684-0.816C1.684-0.924 1.684-0.976 1.616-0.976C1.612-0.976 1.548-0.96 1.532-0.932C1.504-0.884 1.448-0.656 1.348-0.656C1.248-0.656 1.06-0.996 0.728-0.996C0.496-0.996 0.436-0.904 0.38-0.852C0.324-0.8 0.3-0.784 0.272-0.78C0.24-0.78 0.188-0.836 0.168-0.876C0.16-0.892 0.14-0.904 0.12-0.904C0.1-0.904 0.08-0.892 0.08-0.856L0.08-0.196C0.08-0.196 0.084-0.132 0.124-0.132C0.156-0.132 0.168-0.168 0.184-0.212C0.224-0.312 0.276-0.544 0.456-0.544C0.616-0.544 0.808-0.244 1.04-0.244C1.152-0.244 1.208-0.304 1.24-0.328C1.252-0.336 1.268-0.344 1.276-0.344C1.292-0.344 1.3-0.332 1.304-0.308C1.304-0.196 0.996 0.028 0.756 0.312C0.604 0.488 0.48 0.72 0.48 0.876C0.48 0.96 0.48 1 0.556 1C0.628 1 0.716 0.964 0.816 0.964C0.916 0.964 1.104 1 1.144 1C1.184 1 1.208 0.968 1.208 0.852C1.208 0.184 1.684-0.388 1.684-0.8", box: [0.08, -0.996, 1.684, 1] },
        timeSig8: { w: 1.744, d: "M1.336-0.144C1.48-0.236 1.576-0.368 1.576-0.568C1.576-0.976 0.988-1.036 0.88-1.036C0.416-1.036 0.1-0.824 0.1-0.488C0.1-0.212 0.256-0.064 0.448 0.044C0.24 0.144 0.08 0.276 0.08 0.528C0.08 0.876 0.44 1.036 0.836 1.036C1.236 1.036 1.664 0.864 1.664 0.324C1.664 0.084 1.524-0.048 1.336-0.144M1.128-0.236C0.808-0.348 0.468-0.416 0.468-0.668C0.468-0.836 0.696-0.92 0.872-0.92C1-0.92 1.34-0.856 1.34-0.576C1.34-0.416 1.26-0.312 1.128-0.236M0.82 0.904C0.552 0.904 0.308 0.768 0.308 0.508C0.308 0.348 0.448 0.2 0.624 0.132C0.916 0.26 1.212 0.344 1.212 0.608C1.212 0.768 1.088 0.904 0.82 0.904", box: [0.08, -1.036, 1.664, 1.036] },
        timeSig9: { w: 1.736, d: "M0.696 0.392C0.648 0.344 0.58 0.324 0.516 0.324C0.484 0.324 0.448 0.332 0.416 0.34C0.292 0.372 0.196 0.5 0.196 0.628C0.196 0.644 0.196 0.656 0.2 0.672C0.22 0.804 0.332 0.9 0.452 0.944C0.548 0.984 0.664 0.996 0.768 0.996C1.072 0.992 1.356 0.844 1.5 0.572C1.588 0.404 1.656 0.192 1.656 0.004L1.656-0.012C1.652-0.196 1.62-0.404 1.532-0.564C1.448-0.716 1.312-0.88 1.156-0.948C1.056-0.992 0.936-1.004 0.836-1.004C0.656-1.004 0.456-0.976 0.312-0.86C0.172-0.748 0.08-0.568 0.08-0.388C0.08-0.164 0.2-0.028 0.328 0.068C0.436 0.148 0.56 0.192 0.684 0.192C0.812 0.192 0.944 0.144 1.048 0.052C1.056 0.044 1.064 0.044 1.072 0.044C1.096 0.044 1.108 0.076 1.108 0.14C1.096 0.88 0.86 0.9 0.776 0.9C0.696 0.9 0.644 0.88 0.644 0.84C0.644 0.784 0.72 0.736 0.744 0.688C0.764 0.652 0.772 0.612 0.772 0.572C0.772 0.512 0.752 0.452 0.712 0.408C0.708 0.4 0.7 0.396 0.696 0.392M0.848 0C0.72 0 0.612-0.2 0.612-0.448C0.612-0.696 0.72-0.896 0.848-0.896C0.976-0.896 1.08-0.696 1.08-0.448C1.08-0.2 0.976 0 0.848 0", box: [0.08, -1.004, 1.656, 0.996] }
      };
    }
  });

  // lib/spelling.js
  var require_spelling = __commonJS({
    "lib/spelling.js"(exports, module) {
      "use strict";
      var { DrumDromError } = require_errors();
      function checkGrid(spb, unit) {
        if ((spb & spb - 1) !== 0 || unit * spb > 32) {
          throw new DrumDromError(
            "E_STAFF_GRID",
            "staff notation needs steps_per_beat 1, 2, 4 or 8 with steps no shorter than a 32nd note (got " + spb + " steps per beat in x/" + unit + ")"
          );
        }
      }
      function longest(cell, available, spb) {
        let w = spb;
        while (w > 1 && (cell % w !== 0 || w > available)) w /= 2;
        return w;
      }
      function valueOf(steps, spb, unit) {
        return unit * spb / steps;
      }
      function levelsOf(value) {
        return value >= 8 ? Math.log2(value) - 2 : 0;
      }
      function spell(sounding, unit) {
        const spb = sounding.length;
        const events = [];
        const add = (type, slot, steps) => {
          const value = valueOf(steps, spb, unit || 4);
          events.push({ type, slot, steps, value, levels: type === "note" ? levelsOf(value) : 0 });
        };
        let cell = 0;
        while (cell < spb) {
          let next = cell + 1;
          while (next < spb && !sounding[next]) next++;
          if (sounding[cell]) {
            const w = longest(cell, next - cell, spb);
            add("note", cell, w);
            cell += w;
          } else {
            while (cell < next) {
              const w = longest(cell, next - cell, spb);
              add("rest", cell, w);
              cell += w;
            }
          }
        }
        return events;
      }
      function beamRuns(events) {
        const runs = [];
        let current = [];
        events.forEach((e) => {
          if (e.type === "note" && e.levels > 0) {
            current.push(e);
          } else {
            if (current.length > 1) runs.push(current);
            current = [];
          }
        });
        if (current.length > 1) runs.push(current);
        return runs;
      }
      function beatsPerGroup(beats, unit) {
        return unit === 8 && beats % 3 === 0 ? 3 : 1;
      }
      module.exports = { checkGrid, spell, beamRuns, beatsPerGroup, valueOf, levelsOf };
    }
  });

  // lib/render-staff.js
  var require_render_staff = __commonJS({
    "lib/render-staff.js"(exports, module) {
      "use strict";
      var glyphs = require_glyphs();
      var { rd, esc, describe, header, tempoText } = require_common();
      var { checkGrid, spell, beamRuns, beatsPerGroup } = require_spelling();
      var GLYPH_ORDER = Object.keys(glyphs);
      var STEM_MIN = 3;
      var BEAM_PITCH = 0.75;
      var BEAM_STUB = 1;
      var HANDS_BEAM = -3.5;
      var FEET_BEAM = 7;
      var GHOST_SCALE = 0.85;
      var SOFT_HAT_SCALE = 0.8;
      var GRACE_SCALE = 0.6;
      var isFeet = (lane) => lane.staff <= 1;
      var isHat = (lane) => lane.id === "hh" || lane.id === "ho" || lane.id === "hp";
      var yOf = (pos) => 4 - pos / 2;
      function noteGlyph(lane, value) {
        if (lane.head === "x" || lane.head === "x_open") return "noteheadXBlack";
        if (lane.head === "diamond") return "noteheadDiamondBlack";
        return value <= 2 ? "noteheadHalf" : "noteheadBlack";
      }
      function restGlyph(value) {
        if (value >= 32) return "rest32nd";
        if (value >= 16) return "rest16th";
        if (value >= 8) return "rest8th";
        if (value >= 4) return "restQuarter";
        return value >= 2 ? "restHalf" : "restWhole";
      }
      function flagGlyph(levels, up) {
        return "flag" + ["8th", "16th", "32nd"][Math.min(levels, 3) - 1] + (up ? "Up" : "Down");
      }
      function renderStaff(id, model, skin) {
        const prefix = "drumdrom-" + (id === null || id === void 0 ? 0 : id);
        const u = skin.staff_space;
        const beats = model.time[0];
        const unit = model.time[1];
        const spb = model.steps_per_beat;
        checkGrid(spb, unit);
        const groupSize = beatsPerGroup(beats, unit);
        const ink = skin.ink_color;
        const stemW = skin.stem_w * u;
        const single = skin.voices !== 2;
        const used = /* @__PURE__ */ new Set();
        const g = (name) => glyphs[name];
        function use(name, x, y2, k, fill) {
          used.add(name);
          return ["use", {
            href: "#" + prefix + "-g-" + name,
            transform: "translate(" + rd(x) + " " + rd(y2) + ") scale(" + rd(u * (k || 1)) + ")",
            fill: fill || ink
          }];
        }
        function line(x1, y1, x2, y2, w, color) {
          return ["line", { x1: rd(x1), y1: rd(y1), x2: rd(x2), y2: rd(y2), stroke: color, "stroke-width": rd(w) }];
        }
        function rect(x1, y1, x2, y2, color) {
          return ["rect", { x: rd(x1), y: rd(y1), width: rd(x2 - x1), height: rd(y2 - y1), fill: color }];
        }
        let top = 0;
        let bottom = 0;
        const touch = (...ys) => ys.forEach((y2) => {
          top = Math.min(top, y2);
          bottom = Math.max(bottom, y2);
        });
        function voiceEvents(byStep, feet) {
          const out = [];
          for (let b = 0; b < beats; b++) {
            const sounding = [];
            for (let s = 0; s < spb; s++) sounding.push((byStep[b * spb + s] || []).some((h) => feet === null || isFeet(h.lane) === feet));
            out.push(spell(sounding, unit).map((e) => ({ ...e, beat: b, step: b * spb + e.slot, voice: feet === null ? "all" : feet ? "feet" : "hands" })));
          }
          return out;
        }
        function layoutNote(ev, entries, cx) {
          const up = ev.voice !== "feet";
          const heads = entries.filter((h) => ev.voice === "all" || isFeet(h.lane) !== up).map((h) => {
            const ghost = h.hit.accent === "ghost";
            const soft = ghost && isHat(h.lane);
            const paren = ghost && !soft;
            const k = paren ? GHOST_SCALE : soft ? SOFT_HAT_SCALE : 1;
            const name = noteGlyph(h.lane, ev.value);
            return {
              lane: h.lane,
              hit: h.hit,
              name,
              k,
              paren,
              soft,
              pos: h.lane.staff,
              cy: yOf(h.lane.staff) * u,
              half: g(name).w * k * u / 2,
              dx: 0
            };
          }).sort((a, b) => a.pos - b.pos);
          if (up) {
            heads.forEach((h, i) => {
              if (i > 0 && h.pos - heads[i - 1].pos === 1 && heads[i - 1].dx === 0) h.dx = heads[i - 1].half + h.half - stemW;
            });
          }
          const plain = heads.filter((h) => h.dx === 0);
          const stemX = up ? cx + Math.max(...plain.map((h) => h.half)) - stemW / 2 : cx - Math.max(...plain.map((h) => h.half)) + stemW / 2;
          const ys = heads.map((h) => h.cy);
          return { ev, up, heads, cx, stemX, high: Math.min(...ys), low: Math.max(...ys) };
        }
        function drawBar(barIndex, x0) {
          const byStep = [];
          model.lanes.forEach((lane) => lane.hits.forEach((hit) => {
            if (hit.bar !== barIndex) return;
            if (!byStep[hit.step_in_bar]) byStep[hit.step_in_bar] = [];
            byStep[hit.step_in_bar].push({ lane, hit });
          }));
          let fine = 1;
          byStep.forEach((hits, s) => {
            if (!hits) return;
            let p = spb;
            while (p > 1 && s % spb % p !== 0) p /= 2;
            fine = Math.max(fine, spb / p);
          });
          const beatW = Math.max(skin.beat_min_w, fine * skin.slot_w) * u;
          const flamFirst = (byStep[0] || []).some((h) => h.hit.articulation === "flam");
          const lead = (flamFirst ? skin.lead_flam : skin.lead_in) * u;
          const xAt = (step) => x0 + lead + step / spb * beatW;
          const voices = single ? [voiceEvents(byStep, null)] : ["hands", "feet"].map((v) => voiceEvents(byStep, v === "feet"));
          const hasNotes = voices.map((v) => v.some((beat) => beat.some((e) => e.type === "note")));
          const twoVoices = hasNotes[0] && hasNotes[1];
          const nodes = [];
          let right = 0;
          if (!hasNotes.some(Boolean)) {
            const w = lead + beats * beatW;
            const r = g("restWhole");
            nodes.push(use("restWhole", x0 + w / 2 - (r.box[0] + r.box[2]) / 2 * u, u, 1));
            touch(0, 2 * u);
            return { nodes, width: w, right: 0 };
          }
          const restKey = (e) => e.step + ":" + e.steps;
          const handRests = /* @__PURE__ */ new Set();
          voices[0].forEach((beat) => beat.forEach((e) => {
            if (e.type === "rest") handRests.add(restKey(e));
          }));
          const merged = /* @__PURE__ */ new Set();
          (voices[1] || []).forEach((beat) => beat.forEach((e) => {
            if (e.type === "rest" && handRests.has(restKey(e))) merged.add(restKey(e));
          }));
          const out = [];
          voices.forEach((perBeat, vi) => {
            if (!hasNotes[vi]) return;
            const up = vi === 0;
            const otherNotes = (voices[1 - vi] || []).flat().filter((e) => e.type === "note").map((e) => e.step);
            const notes = [];
            const rests = [];
            perBeat.forEach((beat) => beat.forEach((ev) => {
              const cx = xAt(ev.step);
              if (ev.type === "note") notes.push(layoutNote(ev, byStep[ev.step], cx));
              else rests.push({ ev, cx });
            }));
            const noteOf = new Map(notes.map((n) => [n.ev, n]));
            const groups = [];
            for (let b = 0; b < beats; b += groupSize) {
              const events = [];
              for (let k = b; k < Math.min(beats, b + groupSize); k++) events.push(...perBeat[k]);
              groups.push(events);
            }
            const runs = [];
            groups.forEach((events) => beamRuns(events).forEach((r) => runs.push(r)));
            const beamed = /* @__PURE__ */ new Set();
            runs.forEach((r) => r.forEach((e) => beamed.add(e)));
            let maxLevels = 1;
            notes.forEach((n) => {
              maxLevels = Math.max(maxLevels, n.ev.levels);
            });
            const need = (STEM_MIN + BEAM_PITCH * (maxLevels - 1)) * u;
            let beamY = up ? HANDS_BEAM * u : FEET_BEAM * u;
            notes.forEach((n) => {
              if (n.ev.value < 2) return;
              beamY = up ? Math.min(beamY, n.high - need) : Math.max(beamY, n.low + need);
            });
            const color = skin.ink_color;
            const vnodes = [];
            notes.forEach((n) => {
              const { ev, cx } = n;
              const stemless = ev.value < 2;
              const ledgers = /* @__PURE__ */ new Map();
              n.heads.forEach((h) => {
                const wanted = [];
                for (let p = 10; p <= h.pos; p += 2) wanted.push(p);
                for (let p = -2; p >= h.pos; p -= 2) wanted.push(p);
                wanted.forEach((p) => {
                  const span = ledgers.get(p) || [Infinity, -Infinity];
                  ledgers.set(p, [Math.min(span[0], cx + h.dx - h.half - 0.4 * u), Math.max(span[1], cx + h.dx + h.half + 0.4 * u)]);
                });
              });
              ledgers.forEach((span, p) => {
                vnodes.push(line(span[0], yOf(p) * u, span[1], yOf(p) * u, skin.ledger_w * u, skin.staff_color));
                touch(yOf(p) * u);
              });
              n.heads.forEach((h) => {
                const fill = h.soft ? skin.ghost_color : color;
                const hx = cx + h.dx - h.half;
                vnodes.push(use(h.name, hx, h.cy, h.k, fill));
                touch(h.cy - 0.6 * u, h.cy + 0.6 * u);
                right = Math.max(right, hx + h.half * 2 - x0);
                if (h.lane.head === "x_open") {
                  const cyc = h.cy - 0.95 * u * h.k;
                  vnodes.push(["circle", { cx: rd(cx + h.dx), cy: rd(cyc), r: rd(0.3 * u * h.k), fill: "none", stroke: fill, "stroke-width": rd(skin.open_w * u) }]);
                }
                if (h.paren) {
                  const inner = Math.max(h.half, Math.abs(n.stemX - cx) + stemW / 2) + 0.1 * u;
                  const pk = 0.9;
                  const left = g("noteheadParenthesisLeft");
                  const rightP = g("noteheadParenthesisRight");
                  vnodes.push(use("noteheadParenthesisLeft", cx - inner - left.box[2] * pk * u, h.cy, pk, color));
                  vnodes.push(use("noteheadParenthesisRight", cx + inner - rightP.box[0] * pk * u, h.cy, pk, color));
                  right = Math.max(right, cx + inner + rightP.box[2] * pk * u - x0);
                }
                if (h.hit.articulation === "flam") {
                  const gh = g(h.name);
                  const gk = GRACE_SCALE;
                  const gx = cx - 1.9 * u;
                  vnodes.push(use(h.name, gx - gh.w * gk * u / 2, h.cy, gk, color));
                  const sx = gx + gh.w * gk * u / 2 - stemW / 2;
                  const sTop = h.cy - 2.5 * u;
                  vnodes.push(line(sx, h.cy + gh.up[1] * gk * u, sx, sTop, stemW, color));
                  vnodes.push(use("flag8thUp", sx - stemW / 2, sTop, gk, color));
                  vnodes.push(line(sx - 0.7 * u, sTop + 1.2 * u, sx + 0.9 * u, sTop + 0.25 * u, 0.1 * u, color));
                  touch(sTop);
                }
              });
              if (!stemless) {
                const baseHead = up ? n.heads.find((h) => h.cy === n.low) : n.heads.find((h) => h.cy === n.high);
                const anchor = up ? g(baseHead.name).up[1] : g(baseHead.name).down[1];
                const y0 = baseHead.cy + anchor * baseHead.k * u;
                vnodes.push(line(n.stemX, y0, n.stemX, beamY, stemW, color));
                touch(beamY);
                if (ev.levels > 0 && !beamed.has(ev)) {
                  vnodes.push(use(flagGlyph(ev.levels, up), n.stemX - stemW / 2, beamY, 1, color));
                  right = Math.max(right, n.stemX + 1.2 * u - x0);
                }
                right = Math.max(right, n.stemX + stemW / 2 - x0);
              }
              if (n.heads.some((h) => h.hit.accent === "accent")) {
                const a = g(up ? "articAccentAbove" : "articAccentBelow");
                const ay = up ? beamY - 0.55 * u : beamY + 0.55 * u;
                vnodes.push(use(up ? "articAccentAbove" : "articAccentBelow", cx - a.w * u / 2, ay, 1, color));
                touch(up ? ay - 1 * u : ay + 1 * u);
              }
            });
            runs.forEach((run) => {
              const stems = run.map((e) => ({ x: noteOf.get(e).stemX, levels: e.levels }));
              const levelRect = (level, xa, xb) => {
                const y2 = up ? beamY + level * BEAM_PITCH * u : beamY - skin.beam_w * u - level * BEAM_PITCH * u;
                vnodes.push(rect(xa - stemW / 2, y2, xb + stemW / 2, y2 + skin.beam_w * u, color));
              };
              levelRect(0, stems[0].x, stems[stems.length - 1].x);
              const deepest = Math.max(...stems.map((s) => s.levels));
              for (let level = 1; level < deepest; level++) {
                let i = 0;
                while (i < stems.length) {
                  if (stems[i].levels <= level) {
                    i++;
                    continue;
                  }
                  let j = i;
                  while (j + 1 < stems.length && stems[j + 1].levels > level) j++;
                  if (j > i) levelRect(level, stems[i].x, stems[j].x);
                  else if (i === 0) levelRect(level, stems[i].x, stems[i].x + BEAM_STUB * u);
                  else levelRect(level, stems[i].x - BEAM_STUB * u, stems[i].x);
                  i = j + 1;
                }
              }
            });
            rests.forEach((r) => {
              const merge = merged.has(restKey(r.ev));
              if (merge && !up) return;
              if (!up && !skin.feet_rests && twoVoices) return;
              if (otherNotes.some((s) => s >= r.ev.step && s < r.ev.step + r.ev.steps)) return;
              const y2 = merge || !twoVoices ? 2 * u : up ? 1 * u : 3.7 * u;
              const name = restGlyph(r.ev.value);
              const box = g(name).box;
              vnodes.push(use(name, r.cx - (box[0] + box[2]) / 2 * u, y2, 1, color));
              touch(y2 + box[1] * u, y2 + box[3] * u);
            });
            out.push(["g", { id: prefix + "-bar" + barIndex + (single ? "" : up ? "-hands" : "-feet") }, ...vnodes]);
          });
          nodes.push(...out);
          const natural = lead + beats * beatW;
          return { nodes, width: Math.max(natural, right + skin.bar_clear * u), right };
        }
        const perRow = Math.max(1, Math.min(Math.floor(skin.bars_per_row) || 1, model.bars));
        const rowCount = Math.ceil(model.bars / perRow);
        const rows = [];
        const clef = g("unpitchedPercussionClef1");
        const digits = (n) => String(n).split("").map((c) => "timeSig" + c);
        const digitsW = (n) => digits(n).reduce((sum, d) => sum + g(d).w, 0) * u;
        for (let r = 0; r < rowCount; r++) {
          top = 0;
          bottom = 4 * u;
          const first = r * perRow;
          const n = Math.min(perRow, model.bars - first);
          const staff = [];
          let x = 0;
          staff.push(line(0, 0, 0, 4 * u, skin.barline_w * u, skin.ink_color));
          x += 1 * u;
          staff.push(use("unpitchedPercussionClef1", x, 2 * u, 1));
          x += clef.w * u + 1.2 * u;
          if (r === 0) {
            const w = Math.max(digitsW(beats), digitsW(unit));
            [[beats, 1], [unit, 3]].forEach(([value, row]) => {
              let dx = x + (w - digitsW(value)) / 2;
              digits(value).forEach((d) => {
                staff.push(use(d, dx, row * u, 1));
                dx += g(d).w * u;
              });
            });
            x += w + 1 * u;
          }
          const bars = [];
          for (let b = 0; b < n; b++) {
            const bar = drawBar(first + b, x);
            bars.push(...bar.nodes);
            x += bar.width;
            const last = first + b === model.bars - 1;
            if (last) {
              const thin = x - (skin.final_barline_w + 0.4 + skin.barline_w / 2) * u;
              staff.push(line(thin, 0, thin, 4 * u, skin.barline_w * u, skin.ink_color));
              staff.push(line(x - skin.final_barline_w * u / 2, 0, x - skin.final_barline_w * u / 2, 4 * u, skin.final_barline_w * u, skin.ink_color));
            } else {
              staff.push(line(x, 0, x, 4 * u, skin.barline_w * u, skin.ink_color));
            }
          }
          const lines = [];
          for (let i = 0; i < 5; i++) lines.push(line(0, i * u, x, i * u, skin.staff_line_w * u, skin.staff_color));
          rows.push({ width: x, top, bottom, nodes: [["g", { id: prefix + "-row" + r + "-staff" }, ...lines, ...staff], ["g", { id: prefix + "-row" + r }, ...bars]] });
        }
        const head = header(model, skin);
        const maxRow = Math.max(...rows.map((r) => r.width));
        const width = Math.max(rd(skin.margin_left + maxRow + skin.margin_right), 320);
        const shift = skin.margin_left + (width - skin.margin_left - skin.margin_right - maxRow) / 2;
        let y = head.y;
        const rowNodes = rows.map((row, r) => {
          const oy = y - row.top;
          y += row.bottom - row.top + skin.row_gap;
          return ["g", { id: prefix + "-system" + r, transform: "translate(" + rd(shift) + " " + rd(oy) + ")" }, ...row.nodes];
        });
        const height = rd(y - skin.row_gap + skin.margin_bottom);
        const defs = GLYPH_ORDER.filter((name) => used.has(name)).map((name) => ["path", { id: prefix + "-g-" + name, d: glyphs[name].d }]);
        const tid = prefix + "-title";
        const did = prefix + "-desc";
        return [
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            id: prefix,
            width,
            height,
            viewBox: "0 0 " + width + " " + height,
            role: "img",
            "aria-labelledby": tid + " " + did,
            "font-family": skin.font_family
          },
          ["title", { id: tid }, esc(model.name || "Drum pattern")],
          ["desc", { id: did }, esc(describe(model))],
          ["defs", ...defs],
          ["rect", { width: "100%", height: "100%", fill: skin.bg_color }],
          ["g", { id: prefix + "-header" }, ...head.nodes, tempoText(model, skin, width, head.tempoY)],
          ...rowNodes
        ];
      }
      module.exports = renderStaff;
    }
  });

  // lib/stack.js
  var require_stack = __commonJS({
    "lib/stack.js"(exports, module) {
      "use strict";
      var { rd, esc, describe } = require_common();
      function stack(id, model, skin, first, second) {
        const prefix = "drumdrom-" + id;
        const size = (t) => ({ w: t[1].width, h: t[1].height });
        const a = size(first);
        const b = size(second);
        const width = Math.max(a.w, b.w);
        const height = rd(a.h + b.h);
        const nest = (t, y) => {
          const { xmlns: _x, role: _r, "aria-labelledby": _l, "font-family": _f, ...attrs } = t[1];
          const rest = t.slice(2).filter((n) => n[0] !== "title" && n[0] !== "desc");
          return ["svg", { ...attrs, x: 0, y: rd(y), "font-family": skin.font_family }, ...rest];
        };
        const tid = prefix + "-title";
        const did = prefix + "-desc";
        return [
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            id: prefix,
            width,
            height,
            viewBox: "0 0 " + width + " " + height,
            role: "img",
            "aria-labelledby": tid + " " + did,
            "font-family": skin.font_family
          },
          ["title", { id: tid }, esc(model.name || "Drum pattern")],
          ["desc", { id: did }, esc(describe(model))],
          ["rect", { width: "100%", height: "100%", fill: skin.bg_color }],
          nest(first, 0),
          nest(second, a.h)
        ];
      }
      module.exports = stack;
    }
  });

  // lib/resolve-skin.js
  var require_resolve_skin = __commonJS({
    "lib/resolve-skin.js"(exports, module) {
      "use strict";
      function resolveSkin(cfg, skins) {
        const config = cfg || {};
        const chosen = skins[config.skin] || skins.default;
        const { skin: _skinName, ...overrides } = config;
        return Object.keys(overrides).length ? { ...chosen, ...overrides } : chosen;
      }
      module.exports = resolveSkin;
    }
  });

  // lib/render-svg.js
  var require_render_svg = __commonJS({
    "lib/render-svg.js"(exports, module) {
      "use strict";
      var onml = require_onml();
      var parse = require_parse();
      var renderLanes = require_render_lanes();
      var renderStaff = require_render_staff();
      var stack = require_stack();
      var resolveSkin = require_resolve_skin();
      var allSkins = require_all_skins();
      function isModel(x) {
        return !!x && typeof x === "object" && typeof x.steps_per_bar === "number" && Array.isArray(x.lanes);
      }
      var STYLES = ["lanes", "staff", "both"];
      function renderTree(input, options) {
        const opts = options || {};
        const style = opts.style || "lanes";
        if (!STYLES.includes(style)) throw new Error("unknown style '" + style + "'; use one of " + STYLES.join(", "));
        const model = isModel(input) ? input : parse(input);
        const cfg = { ...model.config, ...opts.config || {} };
        if (opts.skin) cfg.skin = opts.skin;
        const skin = resolveSkin(cfg, allSkins);
        if (style === "staff") return renderStaff(opts.id, model, skin);
        if (style === "lanes") return renderLanes(opts.id, model, skin);
        const id = opts.id === null || opts.id === void 0 ? 0 : opts.id;
        return stack(id, model, skin, renderStaff(id + "-staff", model, skin), renderLanes(id + "-lanes", model, skin, { header: false }));
      }
      function renderSVG(input, options) {
        return onml.s(renderTree(input, options));
      }
      module.exports = { renderTree, renderSVG, STYLES };
    }
  });

  // lib/index.js
  var require_index = __commonJS({
    "lib/index.js"(exports, module) {
      "use strict";
      var pkg = require_package();
      var parse = require_parse();
      var normalize = require_normalize();
      var { validate } = require_validate2();
      var { renderSVG, renderTree, STYLES } = require_render_svg();
      var { DrumDromError } = require_errors();
      var kit = require_kit();
      var allSkins = require_all_skins();
      module.exports = {
        version: pkg.version,
        parse,
        validate,
        normalize,
        renderSVG,
        renderTree,
        renderStaff: (input, options) => renderSVG(input, { ...options, style: "staff" }),
        renderLanes: (input, options) => renderSVG(input, { ...options, style: "lanes" }),
        styles: STYLES,
        DrumDromError,
        kit: kit.kit,
        kitOrder: kit.order,
        skins: allSkins
      };
    }
  });

  // lib/create-element.js
  var require_create_element = __commonJS({
    "lib/create-element.js"(exports, module) {
      "use strict";
      var onml = require_onml();
      function createElement(tree) {
        const svgStr = onml.s(tree);
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgStr, "image/svg+xml");
        return document.importNode(doc.documentElement, true);
      }
      module.exports = createElement;
    }
  });

  // lib/render-element.js
  var require_render_element = __commonJS({
    "lib/render-element.js"(exports, module) {
      "use strict";
      var { renderTree } = require_render_svg();
      var createElement = require_create_element();
      function renderElement(id, source, outputDiv, options) {
        while (outputDiv.firstChild) outputDiv.removeChild(outputDiv.firstChild);
        outputDiv.appendChild(createElement(renderTree(source, { ...options, id })));
      }
      module.exports = renderElement;
    }
  });

  // lib/process-all.js
  var require_process_all = __commonJS({
    "lib/process-all.js"(exports, module) {
      "use strict";
      var renderElement = require_render_element();
      function processAll(options) {
        const scripts = Array.from(document.querySelectorAll('script[type="drumdrom"]'));
        scripts.forEach((el, i) => {
          const div = document.createElement("div");
          div.id = "DrumDrom_Display_" + i;
          el.parentNode.insertBefore(div, el);
          try {
            renderElement(i, el.textContent.trim(), div, { ...options, style: el.getAttribute("data-style") || options && options.style || void 0 });
          } catch (e) {
            const list = e.errors || [e];
            const pre = document.createElement("pre");
            pre.className = "drumdrom-error";
            pre.textContent = list.map((x) => (x.path ? x.path + ": " : "") + x.message).join("\n");
            div.appendChild(pre);
            console.error("DrumDrom error for diagram " + i + ":", e);
          }
        });
      }
      module.exports = processAll;
    }
  });

  // lib/drumdrom.js
  var require_drumdrom = __commonJS({
    "lib/drumdrom.js"(exports, module) {
      var api = require_index();
      var processAll = require_process_all();
      var renderElement = require_render_element();
      module.exports = { ...api, processAll, renderElement };
    }
  });
  return require_drumdrom();
})();
/*! Bundled license information:

sax/lib/sax.js:
  (*! http://mths.be/fromcodepoint v0.1.0 by @mathias *)
*/
