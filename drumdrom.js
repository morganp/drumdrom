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
        version: "0.4.1",
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
          "build-validator": "node scripts/build-validator.js",
          prepare: "npm run build-validator",
          pretest: "npm run build",
          test: "mocha test",
          prelint: "npm run build-validator",
          lint: "eslint lib bin skins scripts test eslint.config.js",
          prebuild: "npm run build-validator",
          predocs: "npm run build-validator",
          "preupdate-snapshots": "npm run build-validator",
          dist: "esbuild ./lib/drumdrom.js --bundle --format=iife --global-name=DrumDrom --alias:json5=json5/lib/index.js --outfile=dist/drumdrom.js",
          "dist.min": "esbuild ./lib/drumdrom.js --bundle --format=iife --global-name=DrumDrom --alias:json5=json5/lib/index.js --minify --outfile=dist/drumdrom.min.js",
          build: "npm run dist && npm run dist.min",
          docs: "node scripts/render-fixtures.js docs/images",
          "update-snapshots": "node scripts/render-fixtures.js test/snapshots"
        },
        dependencies: {
          json5: "^2.2.3",
          onml: "^2.3.0"
        },
        devDependencies: {
          ajv: "^8.20.0",
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

  // node_modules/json5/lib/unicode.js
  var require_unicode = __commonJS({
    "node_modules/json5/lib/unicode.js"(exports, module) {
      module.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
      module.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
      module.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
    }
  });

  // node_modules/json5/lib/util.js
  var require_util = __commonJS({
    "node_modules/json5/lib/util.js"(exports, module) {
      var unicode = require_unicode();
      module.exports = {
        isSpaceSeparator(c) {
          return typeof c === "string" && unicode.Space_Separator.test(c);
        },
        isIdStartChar(c) {
          return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "$" || c === "_" || unicode.ID_Start.test(c));
        },
        isIdContinueChar(c) {
          return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "$" || c === "_" || c === "\u200C" || c === "\u200D" || unicode.ID_Continue.test(c));
        },
        isDigit(c) {
          return typeof c === "string" && /[0-9]/.test(c);
        },
        isHexDigit(c) {
          return typeof c === "string" && /[0-9A-Fa-f]/.test(c);
        }
      };
    }
  });

  // node_modules/json5/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/json5/lib/parse.js"(exports, module) {
      var util = require_util();
      var source;
      var parseState;
      var stack;
      var pos;
      var line;
      var column;
      var token;
      var key;
      var root;
      module.exports = function parse(text, reviver) {
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
        const value = holder[name];
        if (value != null && typeof value === "object") {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const key2 = String(i);
              const replacement = internalize(value, key2, reviver);
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
            for (const key2 in value) {
              const replacement = internalize(value, key2, reviver);
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
          const token2 = lexStates[lexState]();
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
        const c2 = peek();
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
        default() {
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
        comment() {
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
        multiLineComment() {
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
        multiLineCommentAsterisk() {
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
        singleLineComment() {
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
        value() {
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
        identifierNameStartEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          const u = unicodeEscape();
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
        identifierName() {
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
        identifierNameEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          const u = unicodeEscape();
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
        sign() {
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
        zero() {
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
        decimalInteger() {
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
        decimalPointLeading() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          throw invalidChar(read());
        },
        decimalPoint() {
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
        decimalFraction() {
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
        decimalExponent() {
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
        decimalExponentSign() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentInteger() {
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        hexadecimal() {
          if (util.isHexDigit(c)) {
            buffer += read();
            lexState = "hexadecimalInteger";
            return;
          }
          throw invalidChar(read());
        },
        hexadecimalInteger() {
          if (util.isHexDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        string() {
          switch (c) {
            case "\\":
              read();
              buffer += escape();
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
        start() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
          }
          lexState = "value";
        },
        beforePropertyName() {
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
        afterPropertyName() {
          if (c === ":") {
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforePropertyValue() {
          lexState = "value";
        },
        afterPropertyValue() {
          switch (c) {
            case ",":
            case "}":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforeArrayValue() {
          if (c === "]") {
            return newToken("punctuator", read());
          }
          lexState = "value";
        },
        afterArrayValue() {
          switch (c) {
            case ",":
            case "]":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        end() {
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
        for (const c2 of s) {
          const p = peek();
          if (p !== c2) {
            throw invalidChar(read());
          }
          read();
        }
      }
      function escape() {
        const c2 = peek();
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
        let buffer2 = "";
        let c2 = peek();
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
        let buffer2 = "";
        let count = 4;
        while (count-- > 0) {
          const c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
        }
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      var parseStates = {
        start() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforePropertyName() {
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
        afterPropertyName() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          parseState = "beforePropertyValue";
        },
        beforePropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforeArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          if (token.type === "punctuator" && token.value === "]") {
            pop();
            return;
          }
          push();
        },
        afterPropertyValue() {
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
        afterArrayValue() {
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
        end() {
        }
      };
      function push() {
        let value;
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
          const parent = stack[stack.length - 1];
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
          const current = stack[stack.length - 1];
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
        const current = stack[stack.length - 1];
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
          return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
        }
        return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
      }
      function invalidEOF() {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
      }
      function invalidIdentifier() {
        column -= 5;
        return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
      }
      function separatorChar(c2) {
        console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
      }
      function formatChar(c2) {
        const replacements = {
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
          const hexString = c2.charCodeAt(0).toString(16);
          return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c2;
      }
      function syntaxError(message) {
        const err = new SyntaxError(message);
        err.lineNumber = line;
        err.columnNumber = column;
        return err;
      }
    }
  });

  // node_modules/json5/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/json5/lib/stringify.js"(exports, module) {
      var util = require_util();
      module.exports = function stringify(value, replacer, space) {
        const stack = [];
        let indent = "";
        let propertyList;
        let replacerFunc;
        let gap = "";
        let quote;
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
          space = replacer.space;
          quote = replacer.quote;
          replacer = replacer.replacer;
        }
        if (typeof replacer === "function") {
          replacerFunc = replacer;
        } else if (Array.isArray(replacer)) {
          propertyList = [];
          for (const v of replacer) {
            let item;
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
        function serializeProperty(key, holder) {
          let value2 = holder[key];
          if (value2 != null) {
            if (typeof value2.toJSON5 === "function") {
              value2 = value2.toJSON5(key);
            } else if (typeof value2.toJSON === "function") {
              value2 = value2.toJSON(key);
            }
          }
          if (replacerFunc) {
            value2 = replacerFunc.call(holder, key, value2);
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
          const quotes = {
            "'": 0.1,
            '"': 0.2
          };
          const replacements = {
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
          let product = "";
          for (let i = 0; i < value2.length; i++) {
            const c = value2[i];
            switch (c) {
              case "'":
              case '"':
                quotes[c]++;
                product += c;
                continue;
              case "\0":
                if (util.isDigit(value2[i + 1])) {
                  product += "\\x00";
                  continue;
                }
            }
            if (replacements[c]) {
              product += replacements[c];
              continue;
            }
            if (c < " ") {
              let hexString = c.charCodeAt(0).toString(16);
              product += "\\x" + ("00" + hexString).substring(hexString.length);
              continue;
            }
            product += c;
          }
          const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
          product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
          return quoteChar + product + quoteChar;
        }
        function serializeObject(value2) {
          if (stack.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack.push(value2);
          let stepback = indent;
          indent = indent + gap;
          let keys = propertyList || Object.keys(value2);
          let partial = [];
          for (const key of keys) {
            const propertyString = serializeProperty(key, value2);
            if (propertyString !== void 0) {
              let member = serializeKey(key) + ":";
              if (gap !== "") {
                member += " ";
              }
              member += propertyString;
              partial.push(member);
            }
          }
          let final;
          if (partial.length === 0) {
            final = "{}";
          } else {
            let properties;
            if (gap === "") {
              properties = partial.join(",");
              final = "{" + properties + "}";
            } else {
              let separator = ",\n" + indent;
              properties = partial.join(separator);
              final = "{\n" + indent + properties + ",\n" + stepback + "}";
            }
          }
          stack.pop();
          indent = stepback;
          return final;
        }
        function serializeKey(key) {
          if (key.length === 0) {
            return quoteString(key, true);
          }
          const firstChar = String.fromCodePoint(key.codePointAt(0));
          if (!util.isIdStartChar(firstChar)) {
            return quoteString(key, true);
          }
          for (let i = firstChar.length; i < key.length; i++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
              return quoteString(key, true);
            }
          }
          return key;
        }
        function serializeArray(value2) {
          if (stack.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack.push(value2);
          let stepback = indent;
          indent = indent + gap;
          let partial = [];
          for (let i = 0; i < value2.length; i++) {
            const propertyString = serializeProperty(String(i), value2);
            partial.push(propertyString !== void 0 ? propertyString : "null");
          }
          let final;
          if (partial.length === 0) {
            final = "[]";
          } else {
            if (gap === "") {
              let properties = partial.join(",");
              final = "[" + properties + "]";
            } else {
              let separator = ",\n" + indent;
              let properties = partial.join(separator);
              final = "[\n" + indent + properties + ",\n" + stepback + "]";
            }
          }
          stack.pop();
          indent = stepback;
          return final;
        }
      };
    }
  });

  // node_modules/json5/lib/index.js
  var require_lib = __commonJS({
    "node_modules/json5/lib/index.js"(exports, module) {
      var parse = require_parse();
      var stringify = require_stringify();
      var JSON5 = {
        parse,
        stringify
      };
      module.exports = JSON5;
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
          stem_length_lone: 3.5,
          beam_w: 0.5,
          barline_w: 0.16,
          final_barline_w: 0.5,
          open_w: 0.14,
          tie_w: 0.2,
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

  // lib/generated/validate-schema.js
  var require_validate_schema = __commonJS({
    "lib/generated/validate-schema.js"(exports, module) {
      "use strict";
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __commonJS2 = (cb, mod) => function __require2() {
        try {
          return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
        } catch (e) {
          throw mod = 0, e;
        }
      };
      var require_ucs2length = __commonJS2({
        "node_modules/ajv/dist/runtime/ucs2length.js"(exports2) {
          "use strict";
          Object.defineProperty(exports2, "__esModule", { value: true });
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
          exports2.default = ucs2length;
          ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
        }
      });
      module.exports = validate20;
      module.exports.default = validate20;
      var schema31 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://github.com/morganp/drumdrom/schema/drumdrom.schema.json", "title": "DrumDrom pattern", "description": "Structural rules for a drumdrom version 1 file. The wave alphabet, bar lengths, kit lookups and cross-lane rules are enforced by the semantic validator in lib/validate.js and documented in docs/spec.md.", "type": "object", "required": ["format", "version", "lanes"], "additionalProperties": false, "properties": { "format": { "const": "drumdrom" }, "version": { "const": 1 }, "name": { "type": "string" }, "subtitle": { "type": "string" }, "tempo": { "type": "number", "minimum": 20, "maximum": 400 }, "time": { "type": "array", "prefixItems": [{ "type": "integer", "minimum": 1, "maximum": 32 }, { "enum": [1, 2, 4, 8, 16, 32] }], "items": false, "minItems": 2, "default": [4, 4] }, "steps_per_beat": { "type": "integer", "minimum": 1, "maximum": 12, "default": 4 }, "kit": { "type": "object", "propertyNames": { "$ref": "#/$defs/id" }, "additionalProperties": { "$ref": "#/$defs/kit_entry" } }, "lanes": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/lane" } }, "config": { "$ref": "#/$defs/config" }, "sections": false }, "$defs": { "id": { "type": "string", "pattern": "^[a-z][a-z0-9_]{0,15}$" }, "kit_entry": { "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string", "minLength": 1 }, "gm": { "type": "integer", "minimum": 0, "maximum": 127 }, "staff": { "type": "integer", "minimum": -6, "maximum": 14 }, "head": { "enum": ["normal", "x", "x_open", "diamond"] } } }, "lane": { "type": "object", "required": ["id", "wave"], "additionalProperties": false, "properties": { "id": { "$ref": "#/$defs/id" }, "wave": { "type": "string", "minLength": 1 }, "name": { "type": "string", "minLength": 1 }, "staff": { "type": "integer", "minimum": -6, "maximum": 14 } } }, "config": { "type": "object", "properties": { "skin": { "type": "string" }, "bars_per_row": { "type": "integer", "minimum": 1, "maximum": 16 }, "voices": { "enum": [1, 2] } }, "additionalProperties": { "type": ["number", "string", "boolean"] } } } };
      var schema33 = { "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string", "minLength": 1 }, "gm": { "type": "integer", "minimum": 0, "maximum": 127 }, "staff": { "type": "integer", "minimum": -6, "maximum": 14 }, "head": { "enum": ["normal", "x", "x_open", "diamond"] } } };
      var schema36 = { "type": "object", "properties": { "skin": { "type": "string" }, "bars_per_row": { "type": "integer", "minimum": 1, "maximum": 16 }, "voices": { "enum": [1, 2] } }, "additionalProperties": { "type": ["number", "string", "boolean"] } };
      var func1 = Object.prototype.hasOwnProperty;
      var func2 = require_ucs2length().default;
      var pattern4 = new RegExp("^[a-z][a-z0-9_]{0,15}$", "u");
      function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
        let vErrors = null;
        let errors = 0;
        const evaluated0 = validate21.evaluated;
        if (evaluated0.dynamicProps) {
          evaluated0.props = void 0;
        }
        if (evaluated0.dynamicItems) {
          evaluated0.items = void 0;
        }
        if (data && typeof data == "object" && !Array.isArray(data)) {
          if (data.id === void 0) {
            const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
            if (vErrors === null) {
              vErrors = [err0];
            } else {
              vErrors.push(err0);
            }
            errors++;
          }
          if (data.wave === void 0) {
            const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "wave" }, message: "must have required property 'wave'" };
            if (vErrors === null) {
              vErrors = [err1];
            } else {
              vErrors.push(err1);
            }
            errors++;
          }
          for (const key0 in data) {
            if (!(key0 === "id" || key0 === "wave" || key0 === "name" || key0 === "staff")) {
              const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
              if (vErrors === null) {
                vErrors = [err2];
              } else {
                vErrors.push(err2);
              }
              errors++;
            }
          }
          if (data.id !== void 0) {
            let data0 = data.id;
            if (typeof data0 === "string") {
              if (!pattern4.test(data0)) {
                const err3 = { instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9_]{0,15}$" }, message: 'must match pattern "^[a-z][a-z0-9_]{0,15}$"' };
                if (vErrors === null) {
                  vErrors = [err3];
                } else {
                  vErrors.push(err3);
                }
                errors++;
              }
            } else {
              const err4 = { instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
          if (data.wave !== void 0) {
            let data1 = data.wave;
            if (typeof data1 === "string") {
              if (func2(data1) < 1) {
                const err5 = { instancePath: instancePath + "/wave", schemaPath: "#/properties/wave/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                if (vErrors === null) {
                  vErrors = [err5];
                } else {
                  vErrors.push(err5);
                }
                errors++;
              }
            } else {
              const err6 = { instancePath: instancePath + "/wave", schemaPath: "#/properties/wave/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          }
          if (data.name !== void 0) {
            let data2 = data.name;
            if (typeof data2 === "string") {
              if (func2(data2) < 1) {
                const err7 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                if (vErrors === null) {
                  vErrors = [err7];
                } else {
                  vErrors.push(err7);
                }
                errors++;
              }
            } else {
              const err8 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          }
          if (data.staff !== void 0) {
            let data3 = data.staff;
            if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
              const err9 = { instancePath: instancePath + "/staff", schemaPath: "#/properties/staff/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (typeof data3 == "number" && isFinite(data3)) {
              if (data3 > 14 || isNaN(data3)) {
                const err10 = { instancePath: instancePath + "/staff", schemaPath: "#/properties/staff/maximum", keyword: "maximum", params: { comparison: "<=", limit: 14 }, message: "must be <= 14" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
              }
              if (data3 < -6 || isNaN(data3)) {
                const err11 = { instancePath: instancePath + "/staff", schemaPath: "#/properties/staff/minimum", keyword: "minimum", params: { comparison: ">=", limit: -6 }, message: "must be >= -6" };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              }
            }
          }
        } else {
          const err12 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        validate21.errors = vErrors;
        return errors === 0;
      }
      validate21.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
      function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
        ;
        let vErrors = null;
        let errors = 0;
        const evaluated0 = validate20.evaluated;
        if (evaluated0.dynamicProps) {
          evaluated0.props = void 0;
        }
        if (evaluated0.dynamicItems) {
          evaluated0.items = void 0;
        }
        if (data && typeof data == "object" && !Array.isArray(data)) {
          if (data.format === void 0) {
            const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "format" }, message: "must have required property 'format'" };
            if (vErrors === null) {
              vErrors = [err0];
            } else {
              vErrors.push(err0);
            }
            errors++;
          }
          if (data.version === void 0) {
            const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "version" }, message: "must have required property 'version'" };
            if (vErrors === null) {
              vErrors = [err1];
            } else {
              vErrors.push(err1);
            }
            errors++;
          }
          if (data.lanes === void 0) {
            const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "lanes" }, message: "must have required property 'lanes'" };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
          for (const key0 in data) {
            if (!func1.call(schema31.properties, key0)) {
              const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
          }
          if (data.format !== void 0) {
            if ("drumdrom" !== data.format) {
              const err4 = { instancePath: instancePath + "/format", schemaPath: "#/properties/format/const", keyword: "const", params: { allowedValue: "drumdrom" }, message: "must be equal to constant" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
          if (data.version !== void 0) {
            if (1 !== data.version) {
              const err5 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
          }
          if (data.name !== void 0) {
            if (typeof data.name !== "string") {
              const err6 = { instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          }
          if (data.subtitle !== void 0) {
            if (typeof data.subtitle !== "string") {
              const err7 = { instancePath: instancePath + "/subtitle", schemaPath: "#/properties/subtitle/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err7];
              } else {
                vErrors.push(err7);
              }
              errors++;
            }
          }
          if (data.tempo !== void 0) {
            let data4 = data.tempo;
            if (typeof data4 == "number" && isFinite(data4)) {
              if (data4 > 400 || isNaN(data4)) {
                const err8 = { instancePath: instancePath + "/tempo", schemaPath: "#/properties/tempo/maximum", keyword: "maximum", params: { comparison: "<=", limit: 400 }, message: "must be <= 400" };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
              if (data4 < 20 || isNaN(data4)) {
                const err9 = { instancePath: instancePath + "/tempo", schemaPath: "#/properties/tempo/minimum", keyword: "minimum", params: { comparison: ">=", limit: 20 }, message: "must be >= 20" };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            } else {
              const err10 = { instancePath: instancePath + "/tempo", schemaPath: "#/properties/tempo/type", keyword: "type", params: { type: "number" }, message: "must be number" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          }
          if (data.time !== void 0) {
            let data5 = data.time;
            if (Array.isArray(data5)) {
              if (data5.length < 2) {
                const err11 = { instancePath: instancePath + "/time", schemaPath: "#/properties/time/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              }
              const len0 = data5.length;
              if (len0 > 0) {
                let data6 = data5[0];
                if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
                  const err12 = { instancePath: instancePath + "/time/0", schemaPath: "#/properties/time/prefixItems/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (typeof data6 == "number" && isFinite(data6)) {
                  if (data6 > 32 || isNaN(data6)) {
                    const err13 = { instancePath: instancePath + "/time/0", schemaPath: "#/properties/time/prefixItems/0/maximum", keyword: "maximum", params: { comparison: "<=", limit: 32 }, message: "must be <= 32" };
                    if (vErrors === null) {
                      vErrors = [err13];
                    } else {
                      vErrors.push(err13);
                    }
                    errors++;
                  }
                  if (data6 < 1 || isNaN(data6)) {
                    const err14 = { instancePath: instancePath + "/time/0", schemaPath: "#/properties/time/prefixItems/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                }
              }
              if (len0 > 1) {
                let data7 = data5[1];
                if (!(data7 === 1 || data7 === 2 || data7 === 4 || data7 === 8 || data7 === 16 || data7 === 32)) {
                  const err15 = { instancePath: instancePath + "/time/1", schemaPath: "#/properties/time/prefixItems/1/enum", keyword: "enum", params: { allowedValues: schema31.properties.time.prefixItems[1].enum }, message: "must be equal to one of the allowed values" };
                  if (vErrors === null) {
                    vErrors = [err15];
                  } else {
                    vErrors.push(err15);
                  }
                  errors++;
                }
              }
              const len1 = data5.length;
              if (!(len1 <= 2)) {
                const err16 = { instancePath: instancePath + "/time", schemaPath: "#/properties/time/items", keyword: "items", params: { limit: 2 }, message: "must NOT have more than 2 items" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            } else {
              const err17 = { instancePath: instancePath + "/time", schemaPath: "#/properties/time/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
          }
          if (data.steps_per_beat !== void 0) {
            let data8 = data.steps_per_beat;
            if (!(typeof data8 == "number" && (!(data8 % 1) && !isNaN(data8)) && isFinite(data8))) {
              const err18 = { instancePath: instancePath + "/steps_per_beat", schemaPath: "#/properties/steps_per_beat/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            if (typeof data8 == "number" && isFinite(data8)) {
              if (data8 > 12 || isNaN(data8)) {
                const err19 = { instancePath: instancePath + "/steps_per_beat", schemaPath: "#/properties/steps_per_beat/maximum", keyword: "maximum", params: { comparison: "<=", limit: 12 }, message: "must be <= 12" };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              }
              if (data8 < 1 || isNaN(data8)) {
                const err20 = { instancePath: instancePath + "/steps_per_beat", schemaPath: "#/properties/steps_per_beat/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
            }
          }
          if (data.kit !== void 0) {
            let data9 = data.kit;
            if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
              for (const key1 in data9) {
                const _errs19 = errors;
                if (typeof key1 === "string") {
                  if (!pattern4.test(key1)) {
                    const err21 = { instancePath: instancePath + "/kit", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[a-z][a-z0-9_]{0,15}$" }, message: 'must match pattern "^[a-z][a-z0-9_]{0,15}$"', propertyName: key1 };
                    if (vErrors === null) {
                      vErrors = [err21];
                    } else {
                      vErrors.push(err21);
                    }
                    errors++;
                  }
                } else {
                  const err22 = { instancePath: instancePath + "/kit", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string", propertyName: key1 };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
                var valid2 = _errs19 === errors;
                if (!valid2) {
                  const err23 = { instancePath: instancePath + "/kit", schemaPath: "#/properties/kit/propertyNames", keyword: "propertyNames", params: { propertyName: key1 }, message: "property name must be valid" };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
              }
              for (const key2 in data9) {
                let data10 = data9[key2];
                if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
                  for (const key3 in data10) {
                    if (!(key3 === "name" || key3 === "gm" || key3 === "staff" || key3 === "head")) {
                      const err24 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/kit_entry/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                      if (vErrors === null) {
                        vErrors = [err24];
                      } else {
                        vErrors.push(err24);
                      }
                      errors++;
                    }
                  }
                  if (data10.name !== void 0) {
                    let data11 = data10.name;
                    if (typeof data11 === "string") {
                      if (func2(data11) < 1) {
                        const err25 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/name", schemaPath: "#/$defs/kit_entry/properties/name/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                        if (vErrors === null) {
                          vErrors = [err25];
                        } else {
                          vErrors.push(err25);
                        }
                        errors++;
                      }
                    } else {
                      const err26 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/name", schemaPath: "#/$defs/kit_entry/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                      if (vErrors === null) {
                        vErrors = [err26];
                      } else {
                        vErrors.push(err26);
                      }
                      errors++;
                    }
                  }
                  if (data10.gm !== void 0) {
                    let data12 = data10.gm;
                    if (!(typeof data12 == "number" && (!(data12 % 1) && !isNaN(data12)) && isFinite(data12))) {
                      const err27 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/gm", schemaPath: "#/$defs/kit_entry/properties/gm/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                      if (vErrors === null) {
                        vErrors = [err27];
                      } else {
                        vErrors.push(err27);
                      }
                      errors++;
                    }
                    if (typeof data12 == "number" && isFinite(data12)) {
                      if (data12 > 127 || isNaN(data12)) {
                        const err28 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/gm", schemaPath: "#/$defs/kit_entry/properties/gm/maximum", keyword: "maximum", params: { comparison: "<=", limit: 127 }, message: "must be <= 127" };
                        if (vErrors === null) {
                          vErrors = [err28];
                        } else {
                          vErrors.push(err28);
                        }
                        errors++;
                      }
                      if (data12 < 0 || isNaN(data12)) {
                        const err29 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/gm", schemaPath: "#/$defs/kit_entry/properties/gm/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                        if (vErrors === null) {
                          vErrors = [err29];
                        } else {
                          vErrors.push(err29);
                        }
                        errors++;
                      }
                    }
                  }
                  if (data10.staff !== void 0) {
                    let data13 = data10.staff;
                    if (!(typeof data13 == "number" && (!(data13 % 1) && !isNaN(data13)) && isFinite(data13))) {
                      const err30 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/staff", schemaPath: "#/$defs/kit_entry/properties/staff/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                      if (vErrors === null) {
                        vErrors = [err30];
                      } else {
                        vErrors.push(err30);
                      }
                      errors++;
                    }
                    if (typeof data13 == "number" && isFinite(data13)) {
                      if (data13 > 14 || isNaN(data13)) {
                        const err31 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/staff", schemaPath: "#/$defs/kit_entry/properties/staff/maximum", keyword: "maximum", params: { comparison: "<=", limit: 14 }, message: "must be <= 14" };
                        if (vErrors === null) {
                          vErrors = [err31];
                        } else {
                          vErrors.push(err31);
                        }
                        errors++;
                      }
                      if (data13 < -6 || isNaN(data13)) {
                        const err32 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/staff", schemaPath: "#/$defs/kit_entry/properties/staff/minimum", keyword: "minimum", params: { comparison: ">=", limit: -6 }, message: "must be >= -6" };
                        if (vErrors === null) {
                          vErrors = [err32];
                        } else {
                          vErrors.push(err32);
                        }
                        errors++;
                      }
                    }
                  }
                  if (data10.head !== void 0) {
                    let data14 = data10.head;
                    if (!(data14 === "normal" || data14 === "x" || data14 === "x_open" || data14 === "diamond")) {
                      const err33 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/head", schemaPath: "#/$defs/kit_entry/properties/head/enum", keyword: "enum", params: { allowedValues: schema33.properties.head.enum }, message: "must be equal to one of the allowed values" };
                      if (vErrors === null) {
                        vErrors = [err33];
                      } else {
                        vErrors.push(err33);
                      }
                      errors++;
                    }
                  }
                } else {
                  const err34 = { instancePath: instancePath + "/kit/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/kit_entry/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                  if (vErrors === null) {
                    vErrors = [err34];
                  } else {
                    vErrors.push(err34);
                  }
                  errors++;
                }
              }
            } else {
              const err35 = { instancePath: instancePath + "/kit", schemaPath: "#/properties/kit/type", keyword: "type", params: { type: "object" }, message: "must be object" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          }
          if (data.lanes !== void 0) {
            let data15 = data.lanes;
            if (Array.isArray(data15)) {
              if (data15.length < 1) {
                const err36 = { instancePath: instancePath + "/lanes", schemaPath: "#/properties/lanes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
              const len2 = data15.length;
              for (let i0 = 0; i0 < len2; i0++) {
                if (!validate21(data15[i0], { instancePath: instancePath + "/lanes/" + i0, parentData: data15, parentDataProperty: i0, rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                  errors = vErrors.length;
                }
              }
            } else {
              const err37 = { instancePath: instancePath + "/lanes", schemaPath: "#/properties/lanes/type", keyword: "type", params: { type: "array" }, message: "must be array" };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
          }
          if (data.config !== void 0) {
            let data17 = data.config;
            if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
              for (const key4 in data17) {
                if (!(key4 === "skin" || key4 === "bars_per_row" || key4 === "voices")) {
                  let data18 = data17[key4];
                  if (!(typeof data18 == "number" && isFinite(data18)) && typeof data18 !== "string" && typeof data18 !== "boolean") {
                    const err38 = { instancePath: instancePath + "/config/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/config/additionalProperties/type", keyword: "type", params: { type: schema36.additionalProperties.type }, message: "must be number,string,boolean" };
                    if (vErrors === null) {
                      vErrors = [err38];
                    } else {
                      vErrors.push(err38);
                    }
                    errors++;
                  }
                }
              }
              if (data17.skin !== void 0) {
                if (typeof data17.skin !== "string") {
                  const err39 = { instancePath: instancePath + "/config/skin", schemaPath: "#/$defs/config/properties/skin/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                  if (vErrors === null) {
                    vErrors = [err39];
                  } else {
                    vErrors.push(err39);
                  }
                  errors++;
                }
              }
              if (data17.bars_per_row !== void 0) {
                let data20 = data17.bars_per_row;
                if (!(typeof data20 == "number" && (!(data20 % 1) && !isNaN(data20)) && isFinite(data20))) {
                  const err40 = { instancePath: instancePath + "/config/bars_per_row", schemaPath: "#/$defs/config/properties/bars_per_row/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                  if (vErrors === null) {
                    vErrors = [err40];
                  } else {
                    vErrors.push(err40);
                  }
                  errors++;
                }
                if (typeof data20 == "number" && isFinite(data20)) {
                  if (data20 > 16 || isNaN(data20)) {
                    const err41 = { instancePath: instancePath + "/config/bars_per_row", schemaPath: "#/$defs/config/properties/bars_per_row/maximum", keyword: "maximum", params: { comparison: "<=", limit: 16 }, message: "must be <= 16" };
                    if (vErrors === null) {
                      vErrors = [err41];
                    } else {
                      vErrors.push(err41);
                    }
                    errors++;
                  }
                  if (data20 < 1 || isNaN(data20)) {
                    const err42 = { instancePath: instancePath + "/config/bars_per_row", schemaPath: "#/$defs/config/properties/bars_per_row/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  }
                }
              }
              if (data17.voices !== void 0) {
                let data21 = data17.voices;
                if (!(data21 === 1 || data21 === 2)) {
                  const err43 = { instancePath: instancePath + "/config/voices", schemaPath: "#/$defs/config/properties/voices/enum", keyword: "enum", params: { allowedValues: schema36.properties.voices.enum }, message: "must be equal to one of the allowed values" };
                  if (vErrors === null) {
                    vErrors = [err43];
                  } else {
                    vErrors.push(err43);
                  }
                  errors++;
                }
              }
            } else {
              const err44 = { instancePath: instancePath + "/config", schemaPath: "#/$defs/config/type", keyword: "type", params: { type: "object" }, message: "must be object" };
              if (vErrors === null) {
                vErrors = [err44];
              } else {
                vErrors.push(err44);
              }
              errors++;
            }
          }
          if (data.sections !== void 0) {
            const err45 = { instancePath: instancePath + "/sections", schemaPath: "#/properties/sections/false schema", keyword: "false schema", params: {}, message: "boolean schema is false" };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        } else {
          const err46 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
          if (vErrors === null) {
            vErrors = [err46];
          } else {
            vErrors.push(err46);
          }
          errors++;
        }
        validate20.errors = vErrors;
        return errors === 0;
      }
      validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
    }
  });

  // lib/validate.js
  var require_validate = __commonJS({
    "lib/validate.js"(exports, module) {
      "use strict";
      var json5 = require_lib();
      var { errorInfo } = require_errors();
      var { kit, order, resolveKit } = require_kit();
      var { symbols, reserved, scan } = require_wave();
      var buildLocator = require_locate();
      var allSkins = require_all_skins();
      var checkSchema = require_validate_schema();
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
  var require_parse2 = __commonJS({
    "lib/parse.js"(exports, module) {
      "use strict";
      var { DrumDromError } = require_errors();
      var { check } = require_validate();
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
  var require_parse3 = __commonJS({
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
  var require_stringify2 = __commonJS({
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
      var stringify = require_stringify2();
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
      var parse = require_parse3();
      var stringify = require_stringify2();
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
        augmentationDot: { w: 0.4, d: "M0.4 0C0.4-0.112 0.312-0.2 0.2-0.2C0.088-0.2 0-0.112 0 0C0 0.112 0.088 0.2 0.2 0.2C0.312 0.2 0.4 0.112 0.4 0", box: [0, -0.2, 0.4, 0.2] },
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
      function meterKind(beats, unit) {
        if (unit === 8 && beats % 3 === 0) return "compound";
        if (unit === 4 && beats >= 2 && beats <= 4) return "simple";
        return "beat";
      }
      function dottedAt(p, spb, total) {
        const out = [];
        if (spb % 2 === 0 && p % (2 * spb) === 0 && p + 1.5 * spb <= total) out.push(1.5 * spb);
        if (spb % 4 === 0 && p % spb === 0) out.push(0.75 * spb);
        return out;
      }
      function longestLegal(kind, p, room, spb, total, long) {
        let best = longest(p, room, spb);
        if (kind === "compound") {
          const group = 3 * spb;
          if (p % group === 0) {
            if (room >= group) best = group;
            else if (room >= 2 * spb) best = Math.max(best, 2 * spb);
          }
        } else {
          dottedAt(p, spb, total).forEach((len) => {
            if (len <= room) best = Math.max(best, len);
          });
          if (long && p % (2 * spb) === 0 && p + 2 * spb <= total && room >= 2 * spb) best = Math.max(best, 2 * spb);
        }
        return best;
      }
      function plainNote(kind, p, gap, trailing, spb, total) {
        if (kind === "compound") return longestLegal(kind, p, gap, spb, total, false);
        let best = longest(p, gap, spb);
        if (!trailing) dottedAt(p, spb, total).forEach((len) => {
          if (len === gap) best = Math.max(best, len);
        });
        return best;
      }
      function restLen(kind, p, room, spb, total) {
        if (kind === "compound") return longestLegal(kind, p, room, spb, total, false);
        let best = longest(p, room, spb);
        dottedAt(p, spb, total).forEach((len) => {
          if (len === room) best = Math.max(best, len);
        });
        return best;
      }
      var MAX_TIED = 3;
      function spellBar(sounding, sustained, beats, spb, unit) {
        const total = beats * spb;
        const kind = meterKind(beats, unit || 4);
        if (kind === "beat") {
          const out = [];
          for (let b = 0; b < beats; b++) {
            spell(sounding.slice(b * spb, (b + 1) * spb), unit).forEach((e) => out.push({ ...e, dots: 0, beat: b, step: b * spb + e.slot }));
          }
          return out;
        }
        const beatLen = kind === "compound" ? 3 * spb : spb;
        const events = [];
        const add = (type, step, len, extra) => {
          const dots = (len & len - 1) === 0 ? 0 : 1;
          const value = valueOf(dots ? len * 2 / 3 : len, spb, unit || 4);
          events.push({ type, step, beat: Math.floor(step / spb), steps: len, value, dots, levels: type === "note" ? levelsOf(value) : 0, ...extra });
        };
        let p = 0;
        while (p < total) {
          let next = p + 1;
          while (next < total && !sounding[next]) next++;
          const gap = next - p;
          if (!sounding[p]) {
            const len2 = restLen(kind, p, gap, spb, total);
            add("rest", p, len2);
            p += len2;
            continue;
          }
          const trailing = next === total;
          if (sustained && sustained[p] && !trailing) {
            const chain = [];
            for (let at = p; at < next; ) {
              const len2 = longestLegal(kind, at, next - at, spb, total, true);
              chain.push(len2);
              at += len2;
            }
            if (chain.length === 1 || gap > beatLen && chain.length <= MAX_TIED) {
              let at = p;
              chain.forEach((len2, i) => {
                add("note", at, len2, chain.length > 1 ? { tie_prev: i > 0, tie_next: i < chain.length - 1, from: p } : {});
                at += len2;
              });
              p = next;
              continue;
            }
          }
          const len = plainNote(kind, p, gap, trailing, spb, total);
          add("note", p, len);
          p += len;
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
      module.exports = { checkGrid, spell, spellBar, beamRuns, beatsPerGroup, valueOf, levelsOf };
    }
  });

  // lib/render-staff.js
  var require_render_staff = __commonJS({
    "lib/render-staff.js"(exports, module) {
      "use strict";
      var glyphs = require_glyphs();
      var { rd, esc, describe, header, tempoText } = require_common();
      var { checkGrid, spell, spellBar, beamRuns, beatsPerGroup } = require_spelling();
      var GLYPH_ORDER = Object.keys(glyphs);
      var STEM_MIN = 3;
      var BEAM_PITCH = 0.75;
      var BEAM_STUB = 1;
      var FLAG_STEM = 3.5;
      var LONE_END_MAX = 2;
      var HANDS_BEAM = -3.5;
      var FEET_BEAM = 7;
      var DOT_GAP = 0.35;
      var TIE_GAP = 0.12;
      var GHOST_SCALE = 0.85;
      var SOFT_HAT_SCALE = 0.8;
      var GRACE_SCALE = 0.6;
      var isFeet = (lane) => lane.staff <= 1;
      var isHat = (lane) => lane.id === "hh" || lane.id === "ho" || lane.id === "hp";
      var isSustained = (lane) => lane.id === "ho" || lane.id === "cr" || lane.id === "rd";
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
          if (feet === null) {
            const hits = [];
            for (let s = 0; s < beats * spb; s++) hits.push(byStep[s] || []);
            const perBeat = Array.from({ length: beats }, () => []);
            spellBar(hits.map((h) => h.length > 0), hits.map((h) => h.some((x) => isSustained(x.lane))), beats, spb, unit).forEach((e) => perBeat[e.beat].push({ ...e, voice: "all" }));
            return perBeat;
          }
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
            const ghost = h.hit.accent === "ghost" && !ev.tie_prev;
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
          const voices = single ? [voiceEvents(byStep, null)] : ["hands", "feet"].map((v) => voiceEvents(byStep, v === "feet"));
          let fine = 1;
          const grid = (s) => {
            let p = spb;
            while (p > 1 && s % spb % p !== 0) p /= 2;
            fine = Math.max(fine, spb / p);
          };
          byStep.forEach((hits, s) => {
            if (hits) grid(s);
          });
          voices.forEach((perBeat) => perBeat.forEach((beat) => beat.forEach((e) => {
            if (e.tie_prev) grid(e.step);
          })));
          const beatW = Math.max(skin.beat_min_w, fine * skin.slot_w) * u;
          const flamFirst = (byStep[0] || []).some((h) => h.hit.articulation === "flam");
          const lead = (flamFirst ? skin.lead_flam : skin.lead_in) * u;
          const xAt = (step) => x0 + lead + step / spb * beatW;
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
              if (ev.type === "note") notes.push(layoutNote(ev, ev.tie_prev ? byStep[ev.from].filter((h) => isSustained(h.lane)) : byStep[ev.step], cx));
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
              const lone = single && !beamed.has(ev);
              const stemEnd = lone ? Math.min(n.high - Math.max(skin.stem_length_lone, FLAG_STEM + BEAM_PITCH * (ev.levels - 1)) * u, LONE_END_MAX * u) : beamY;
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
              let edge = n.stemX + stemW / 2;
              n.heads.forEach((h) => {
                const fill = h.soft ? skin.ghost_color : color;
                const hx = cx + h.dx - h.half;
                vnodes.push(use(h.name, hx, h.cy, h.k, fill));
                touch(h.cy - 0.6 * u, h.cy + 0.6 * u);
                right = Math.max(right, hx + h.half * 2 - x0);
                edge = Math.max(edge, hx + h.half * 2);
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
                  edge = Math.max(edge, cx + inner + rightP.box[2] * pk * u);
                }
                if (h.hit.articulation === "flam" && !ev.tie_prev) {
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
              n.edge = edge;
              if (ev.dots) {
                const dotX = edge + DOT_GAP * u;
                const taken = /* @__PURE__ */ new Set();
                n.heads.slice().sort((a, b) => b.pos - a.pos).forEach((h) => {
                  let dp = (h.pos & 1) === 0 ? h.pos + 1 : h.pos;
                  if (taken.has(dp) && (h.pos & 1) === 0) dp = h.pos - 1;
                  if (taken.has(dp)) return;
                  taken.add(dp);
                  vnodes.push(use("augmentationDot", dotX, yOf(dp) * u, 1, color));
                  touch(yOf(dp) * u - 0.3 * u, yOf(dp) * u + 0.3 * u);
                });
                n.edge = dotX + g("augmentationDot").w * u;
                right = Math.max(right, n.edge - x0);
              }
              if (!stemless) {
                const baseHead = up ? n.heads.find((h) => h.cy === n.low) : n.heads.find((h) => h.cy === n.high);
                const anchor = up ? g(baseHead.name).up[1] : g(baseHead.name).down[1];
                const y0 = baseHead.cy + anchor * baseHead.k * u;
                vnodes.push(line(n.stemX, y0, n.stemX, stemEnd, stemW, color));
                touch(stemEnd);
                if (ev.levels > 0 && !beamed.has(ev)) {
                  vnodes.push(use(flagGlyph(ev.levels, up), n.stemX - stemW / 2, stemEnd, 1, color));
                  right = Math.max(right, n.stemX + 1.2 * u - x0);
                }
                right = Math.max(right, n.stemX + stemW / 2 - x0);
              }
              if (!ev.tie_prev && n.heads.some((h) => h.hit.accent === "accent")) {
                const a = g(up ? "articAccentAbove" : "articAccentBelow");
                const ay = up ? stemEnd - 0.55 * u : stemEnd + 0.55 * u;
                vnodes.push(use(up ? "articAccentAbove" : "articAccentBelow", cx - a.w * u / 2, ay, 1, color));
                touch(up ? ay - 1 * u : ay + 1 * u);
              }
            });
            notes.forEach((n, i) => {
              if (!n.ev.tie_next) return;
              const m = notes[i + 1];
              n.heads.filter((h) => isSustained(h.lane)).forEach((h) => {
                const h2 = m.heads.find((x) => x.lane === h.lane);
                if (!h2) return;
                const x1 = (n.ev.dots ? n.edge : n.cx + h.dx + h.half) + TIE_GAP * u;
                const x2 = m.cx + h2.dx - h2.half - TIE_GAP * u;
                const y2 = h.cy + 0.45 * u;
                const depth = Math.min(0.9, 0.35 + (x2 - x1) / u * 0.05) * u;
                const t = skin.tie_w * u;
                const xm = (x1 + x2) / 2;
                vnodes.push(["path", { d: "M" + rd(x1) + " " + rd(y2) + "Q" + rd(xm) + " " + rd(y2 + 2 * depth) + " " + rd(x2) + " " + rd(y2) + "Q" + rd(xm) + " " + rd(y2 + 2 * (depth - t)) + " " + rd(x1) + " " + rd(y2) + "Z", fill: color }]);
                touch(y2 + depth + 0.1 * u);
              });
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
              if (r.ev.dots) vnodes.push(use("augmentationDot", r.cx + (box[2] - box[0]) / 2 * u + 0.3 * u, y2 - 0.5 * u, 1, color));
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
      var parse = require_parse2();
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
      var parse = require_parse2();
      var normalize = require_normalize();
      var { validate } = require_validate();
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
