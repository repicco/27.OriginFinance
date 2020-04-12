// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery.maskMoney.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* maskMoney plugin for jQuery
* http://plentz.github.com/jquery-maskmoney/
* version: 2.0.1
* Licensed under the MIT license
*/
;

(function ($) {
  if (!$.browser) {
    $.browser = {};
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
  }

  var methods = {
    destroy: function destroy() {
      var input = $(this);
      input.unbind('.maskMoney');

      if ($.browser.msie) {
        this.onpaste = null;
      } else if ($.browser.mozilla) {
        this.removeEventListener('input', blurEvent, false);
      }

      return this;
    },
    mask: function mask() {
      return this.trigger('mask');
    },
    init: function init(settings) {
      settings = $.extend({
        symbol: 'US$',
        showSymbol: false,
        symbolStay: false,
        thousands: ',',
        decimal: '.',
        precision: 2,
        defaultZero: true,
        allowZero: false,
        allowNegative: false
      }, settings);
      return this.each(function () {
        var input = $(this);
        var dirty = false;

        function markAsDirty() {
          dirty = true;
        }

        function clearDirt() {
          dirty = false;
        }

        function keypressEvent(e) {
          e = e || window.event;
          var k = e.which || e.charCode || e.keyCode;
          if (k == undefined) return false; //needed to handle an IE "special" event

          if (k < 48 || k > 57) {
            // any key except the numbers 0-9
            if (k == 45) {
              // -(minus) key
              markAsDirty();
              input.val(changeSign(input));
              return false;
            } else if (k == 43) {
              // +(plus) key
              markAsDirty();
              input.val(input.val().replace('-', ''));
              return false;
            } else if (k == 13 || k == 9) {
              // enter key or tab key
              if (dirty) {
                clearDirt();
                $(this).change();
              }

              return true;
            } else if ($.browser.mozilla && (k == 37 || k == 39) && e.charCode == 0) {
              // needed for left arrow key or right arrow key with firefox
              // the charCode part is to avoid allowing '%'(e.charCode 0, e.keyCode 37)
              return true;
            } else {
              // any other key with keycode less than 48 and greater than 57
              preventDefault(e);
              return true;
            }
          } else if (input.val().length >= input.attr('maxlength')) {
            return false;
          } else {
            preventDefault(e);
            var key = String.fromCharCode(k);
            var x = input.get(0);
            var selection = getInputSelection(x);
            var startPos = selection.start;
            var endPos = selection.end;
            x.value = x.value.substring(0, startPos) + key + x.value.substring(endPos, x.value.length);
            maskAndPosition(x, startPos + 1);
            markAsDirty();
            return false;
          }
        }

        function keydownEvent(e) {
          e = e || window.event;
          var k = e.which || e.charCode || e.keyCode;
          if (k == undefined) return false; //needed to handle an IE "special" event

          var x = input.get(0);
          var selection = getInputSelection(x);
          var startPos = selection.start;
          var endPos = selection.end;

          if (k == 8) {
            // backspace key
            preventDefault(e);

            if (startPos == endPos) {
              // Remove single character
              x.value = x.value.substring(0, startPos - 1) + x.value.substring(endPos, x.value.length);
              startPos = startPos - 1;
            } else {
              // Remove multiple characters
              x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
            }

            maskAndPosition(x, startPos);
            markAsDirty();
            return false;
          } else if (k == 9) {
            // tab key
            if (dirty) {
              $(this).change();
              clearDirt();
            }

            return true;
          } else if (k == 46 || k == 63272) {
            // delete key (with special case for safari)
            preventDefault(e);

            if (x.selectionStart == x.selectionEnd) {
              // Remove single character
              x.value = x.value.substring(0, startPos) + x.value.substring(endPos + 1, x.value.length);
            } else {
              //Remove multiple characters
              x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
            }

            maskAndPosition(x, startPos);
            markAsDirty();
            return false;
          } else {
            // any other key
            return true;
          }
        }

        function focusEvent(e) {
          var mask = getDefaultMask();

          if (input.val() == mask) {
            input.val('');
          } else if (input.val() == '' && settings.defaultZero) {
            input.val(setSymbol(mask));
          } else {
            input.val(setSymbol(input.val()));
          }

          if (this.createTextRange) {
            var textRange = this.createTextRange();
            textRange.collapse(false); // set the cursor at the end of the input

            textRange.select();
          }
        }

        function blurEvent(e) {
          if ($.browser.msie) {
            keypressEvent(e);
          }

          if (input.val() == '' || input.val() == setSymbol(getDefaultMask()) || input.val() == settings.symbol) {
            if (!settings.allowZero) input.val('');else if (!settings.symbolStay) input.val(getDefaultMask());else input.val(setSymbol(getDefaultMask()));
          } else {
            if (!settings.symbolStay) input.val(input.val().replace(settings.symbol, ''));else if (settings.symbolStay && input.val() == settings.symbol) input.val(setSymbol(getDefaultMask()));
          }
        }

        function preventDefault(e) {
          if (e.preventDefault) {
            //standard browsers
            e.preventDefault();
          } else {
            // internet explorer
            e.returnValue = false;
          }
        }

        function maskAndPosition(x, startPos) {
          var originalLen = input.val().length;
          input.val(maskValue(x.value));
          var newLen = input.val().length;
          startPos = startPos - (originalLen - newLen);
          setCursorPosition(input, startPos);
        }

        function mask() {
          var value = input.val();
          input.val(maskValue(value));
        }

        function maskValue(v) {
          v = v.replace(settings.symbol, '');
          var strCheck = '0123456789';
          var len = v.length;
          var a = '',
              t = '',
              neg = '';

          if (len != 0 && v.charAt(0) == '-') {
            v = v.replace('-', '');

            if (settings.allowNegative) {
              neg = '-';
            }
          }

          if (len == 0) {
            if (!settings.defaultZero) return t;
            t = '0.00';
          }

          for (var i = 0; i < len; i++) {
            if (v.charAt(i) != '0' && v.charAt(i) != settings.decimal) break;
          }

          for (; i < len; i++) {
            if (strCheck.indexOf(v.charAt(i)) != -1) a += v.charAt(i);
          }

          var n = parseFloat(a);
          n = isNaN(n) ? 0 : n / Math.pow(10, settings.precision);
          t = n.toFixed(settings.precision);
          i = settings.precision == 0 ? 0 : 1;
          var p,
              d = (t = t.split('.'))[i].substr(0, settings.precision);

          for (p = (t = t[0]).length; (p -= 3) >= 1;) {
            t = t.substr(0, p) + settings.thousands + t.substr(p);
          }

          return settings.precision > 0 ? setSymbol(neg + t + settings.decimal + d + Array(settings.precision + 1 - d.length).join(0)) : setSymbol(neg + t);
        }

        function getDefaultMask() {
          var n = parseFloat('0') / Math.pow(10, settings.precision);
          return n.toFixed(settings.precision).replace(new RegExp('\\.', 'g'), settings.decimal);
        }

        function setSymbol(value) {
          if (settings.showSymbol) {
            var operator = '';

            if (value.length != 0 && value.charAt(0) == '-') {
              value = value.replace('-', '');
              operator = '-';
            }

            if (value.substr(0, settings.symbol.length) != settings.symbol) {
              value = operator + settings.symbol + value;
            }
          }

          return value;
        }

        function changeSign(i) {
          if (settings.allowNegative) {
            var vic = i.val();

            if (i.val() != '' && i.val().charAt(0) == '-') {
              return i.val().replace('-', '');
            } else {
              return '-' + i.val();
            }
          } else {
            return i.val();
          }
        }

        function setCursorPosition(input, pos) {
          // I'm not sure if we need to jqueryfy input
          $(input).each(function (index, elem) {
            if (elem.setSelectionRange) {
              elem.focus();
              elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
              var range = elem.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          });
          return this;
        }

        ;

        function getInputSelection(el) {
          var start = 0,
              end = 0,
              normalizedValue,
              range,
              textInputRange,
              len,
              endRange;

          if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
          } else {
            range = document.selection.createRange();

            if (range && range.parentElement() == el) {
              len = el.value.length;
              normalizedValue = el.value.replace(/\r\n/g, "\n"); // Create a working TextRange that lives only in the input

              textInputRange = el.createTextRange();
              textInputRange.moveToBookmark(range.getBookmark()); // Check if the start and end of the selection are at the very end
              // of the input, since moveStart/moveEnd doesn't return what we want
              // in those cases

              endRange = el.createTextRange();
              endRange.collapse(false);

              if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
              } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                  end = len;
                } else {
                  end = -textInputRange.moveEnd("character", -len);
                  end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
              }
            }
          }

          return {
            start: start,
            end: end
          };
        } // getInputSelection


        if (!input.attr("readonly")) {
          input.unbind('.maskMoney');
          input.bind('keypress.maskMoney', keypressEvent);
          input.bind('keydown.maskMoney', keydownEvent);
          input.bind('blur.maskMoney', blurEvent);
          input.bind('focus.maskMoney', focusEvent);
          input.bind('mask.maskMoney', mask);
        }
      });
    }
  };

  $.fn.maskMoney = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  };
})(jQuery);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51983" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.maskMoney.js"], null)
//# sourceMappingURL=/jquery.maskMoney.f1ee018b.js.map