/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */

/**
 * Webflow: Core site library
 */

var Webflow = {};
var modules = {};
var primary = [];
var secondary = window.Webflow || [];
var $ = window.jQuery;
var $win = $(window);
var $doc = $(document);
var isFunction = $.isFunction;
var _ = Webflow._ = __webpack_require__(41);
var tram = Webflow.tram = __webpack_require__(27) && $.tram;
var domready = false;
var destroyed = false;
tram.config.hideBackface = false;
tram.config.keepInherited = true;

/**
 * Webflow.define - Define a named module
 * @param  {string} name
 * @param  {function} factory
 * @param  {object} options
 * @return {object}
 */
Webflow.define = function (name, factory, options) {
  if (modules[name]) {
    unbindModule(modules[name]);
  }
  var instance = modules[name] = factory($, _, options) || {};
  bindModule(instance);
  return instance;
};

/**
 * Webflow.require - Require a named module
 * @param  {string} name
 * @return {object}
 */
Webflow.require = function (name) {
  return modules[name];
};

function bindModule(module) {
  // If running in Webflow app, subscribe to design/preview events
  if (Webflow.env()) {
    isFunction(module.design) && $win.on('__wf_design', module.design);
    isFunction(module.preview) && $win.on('__wf_preview', module.preview);
  }
  // Subscribe to front-end destroy event
  isFunction(module.destroy) && $win.on('__wf_destroy', module.destroy);
  // Look for ready method on module
  if (module.ready && isFunction(module.ready)) {
    addReady(module);
  }
}

function addReady(module) {
  // If domready has already happened, run ready method
  if (domready) {
    module.ready();
    return;
  }
  // Otherwise add ready method to the primary queue (only once)
  if (_.contains(primary, module.ready)) {
    return;
  }
  primary.push(module.ready);
}

function unbindModule(module) {
  // Unsubscribe module from window events
  isFunction(module.design) && $win.off('__wf_design', module.design);
  isFunction(module.preview) && $win.off('__wf_preview', module.preview);
  isFunction(module.destroy) && $win.off('__wf_destroy', module.destroy);
  // Remove ready method from primary queue
  if (module.ready && isFunction(module.ready)) {
    removeReady(module);
  }
}

function removeReady(module) {
  primary = _.filter(primary, function (readyFn) {
    return readyFn !== module.ready;
  });
}

/**
 * Webflow.push - Add a ready handler into secondary queue
 * @param {function} ready  Callback to invoke on domready
 */
Webflow.push = function (ready) {
  // If domready has already happened, invoke handler
  if (domready) {
    isFunction(ready) && ready();
    return;
  }
  // Otherwise push into secondary queue
  secondary.push(ready);
};

/**
 * Webflow.env - Get the state of the Webflow app
 * @param {string} mode [optional]
 * @return {boolean}
 */
Webflow.env = function (mode) {
  var designFlag = window.__wf_design;
  var inApp = typeof designFlag !== 'undefined';
  if (!mode) {
    return inApp;
  }
  if (mode === 'design') {
    return inApp && designFlag;
  }
  if (mode === 'preview') {
    return inApp && !designFlag;
  }
  if (mode === 'slug') {
    return inApp && window.__wf_slug;
  }
  if (mode === 'editor') {
    return window.WebflowEditor;
  }
  if (mode === 'test') {
    return  false || window.__wf_test;
  }
  if (mode === 'frame') {
    return window !== window.top;
  }
};

// Feature detects + browser sniffs  ಠ_ಠ
var userAgent = navigator.userAgent.toLowerCase();
var touch = Webflow.env.touch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
var chrome = Webflow.env.chrome = /chrome/.test(userAgent) && /Google/.test(navigator.vendor) && parseInt(userAgent.match(/chrome\/(\d+)\./)[1], 10);
var ios = Webflow.env.ios = /(ipod|iphone|ipad)/.test(userAgent);
Webflow.env.safari = /safari/.test(userAgent) && !chrome && !ios;

// Maintain current touch target to prevent late clicks on touch devices
var touchTarget;
// Listen for both events to support touch/mouse hybrid devices
touch && $doc.on('touchstart mousedown', function (evt) {
  touchTarget = evt.target;
});

/**
 * Webflow.validClick - validate click target against current touch target
 * @param  {HTMLElement} clickTarget  Element being clicked
 * @return {Boolean}  True if click target is valid (always true on non-touch)
 */
Webflow.validClick = touch ? function (clickTarget) {
  return clickTarget === touchTarget || $.contains(clickTarget, touchTarget);
} : function () {
  return true;
};

/**
 * Webflow.resize, Webflow.scroll - throttled event proxies
 */
var resizeEvents = 'resize.webflow orientationchange.webflow load.webflow';
var scrollEvents = 'scroll.webflow ' + resizeEvents;
Webflow.resize = eventProxy($win, resizeEvents);
Webflow.scroll = eventProxy($win, scrollEvents);
Webflow.redraw = eventProxy();

// Create a proxy instance for throttled events
function eventProxy(target, types) {
  // Set up throttled method (using custom frame-based _.throttle)
  var handlers = [];
  var proxy = {};
  proxy.up = _.throttle(function (evt) {
    _.each(handlers, function (h) {
      h(evt);
    });
  });

  // Bind events to target
  if (target && types) {
    target.on(types, proxy.up);
  }

  /**
   * Add an event handler
   * @param  {function} handler
   */
  proxy.on = function (handler) {
    if (typeof handler !== 'function') {
      return;
    }
    if (_.contains(handlers, handler)) {
      return;
    }
    handlers.push(handler);
  };

  /**
   * Remove an event handler
   * @param  {function} handler
   */
  proxy.off = function (handler) {
    // If no arguments supplied, clear all handlers
    if (!arguments.length) {
      handlers = [];
      return;
    }
    // Otherwise, remove handler from the list
    handlers = _.filter(handlers, function (h) {
      return h !== handler;
    });
  };

  return proxy;
}

// Webflow.location - Wrap window.location in api
Webflow.location = function (url) {
  window.location = url;
};

if (Webflow.env()) {
  // Ignore redirects inside a Webflow design/edit environment
  Webflow.location = function () {};
}

// Webflow.ready - Call primary and secondary handlers
Webflow.ready = function () {
  domready = true;

  // Restore modules after destroy
  if (destroyed) {
    restoreModules();

    // Otherwise run primary ready methods
  } else {
    _.each(primary, callReady);
  }

  // Run secondary ready methods
  _.each(secondary, callReady);

  // Trigger resize
  Webflow.resize.up();
};

function callReady(readyFn) {
  isFunction(readyFn) && readyFn();
}

function restoreModules() {
  destroyed = false;
  _.each(modules, bindModule);
}

/**
 * Webflow.load - Add a window load handler that will run even if load event has already happened
 * @param  {function} handler
 */
var deferLoad;
Webflow.load = function (handler) {
  deferLoad.then(handler);
};

function bindLoad() {
  // Reject any previous deferred (to support destroy)
  if (deferLoad) {
    deferLoad.reject();
    $win.off('load', deferLoad.resolve);
  }
  // Create deferred and bind window load event
  deferLoad = new $.Deferred();
  $win.on('load', deferLoad.resolve);
}

// Webflow.destroy - Trigger a destroy event for all modules
Webflow.destroy = function (options) {
  options = options || {};
  destroyed = true;
  $win.triggerHandler('__wf_destroy');

  // Allow domready reset for tests
  if (options.domready != null) {
    domready = options.domready;
  }

  // Unbind modules
  _.each(modules, unbindModule);

  // Clear any proxy event handlers
  Webflow.resize.off();
  Webflow.scroll.off();
  Webflow.redraw.off();

  // Clear any queued ready methods
  primary = [];
  secondary = [];

  // If load event has not yet fired, replace the deferred
  if (deferLoad.state() === 'pending') {
    bindLoad();
  }
};

// Listen for domready
$(Webflow.ready);

// Listen for window.onload and resolve deferred
bindLoad();

// Export commonjs module
module.exports = window.Webflow = Webflow;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(30);
var toPrimitive = __webpack_require__(17);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(51);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(21)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(34);
var enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(21)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(10);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(9) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(1);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(10);
var LIBRARY = __webpack_require__(9);
var wksExt = __webpack_require__(24);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/* prettier-ignore */

var _typeof2 = __webpack_require__(42);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.tram = function (a) {
  function b(a, b) {
    var c = new M.Bare();return c.init(a, b);
  }function c(a) {
    return a.replace(/[A-Z]/g, function (a) {
      return "-" + a.toLowerCase();
    });
  }function d(a) {
    var b = parseInt(a.slice(1), 16),
        c = b >> 16 & 255,
        d = b >> 8 & 255,
        e = 255 & b;return [c, d, e];
  }function e(a, b, c) {
    return "#" + (1 << 24 | a << 16 | b << 8 | c).toString(16).slice(1);
  }function f() {}function g(a, b) {
    j("Type warning: Expected: [" + a + "] Got: [" + (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) + "] " + b);
  }function h(a, b, c) {
    j("Units do not match [" + a + "]: " + b + ", " + c);
  }function i(a, b, c) {
    if (void 0 !== b && (c = b), void 0 === a) return c;var d = c;return $.test(a) || !_.test(a) ? d = parseInt(a, 10) : _.test(a) && (d = 1e3 * parseFloat(a)), 0 > d && (d = 0), d === d ? d : c;
  }function j(a) {
    U.debug && window && window.console.warn(a);
  }function k(a) {
    for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
      var e = a[b];e && d.push(e);
    }return d;
  }var l = function (a, b, c) {
    function d(a) {
      return "object" == (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a));
    }function e(a) {
      return "function" == typeof a;
    }function f() {}function g(h, i) {
      function j() {
        var a = new k();return e(a.init) && a.init.apply(a, arguments), a;
      }function k() {}i === c && (i = h, h = Object), j.Bare = k;var l,
          m = f[a] = h[a],
          n = k[a] = j[a] = new f();return n.constructor = j, j.mixin = function (b) {
        return k[a] = j[a] = g(j, b)[a], j;
      }, j.open = function (a) {
        if (l = {}, e(a) ? l = a.call(j, n, m, j, h) : d(a) && (l = a), d(l)) for (var c in l) {
          b.call(l, c) && (n[c] = l[c]);
        }return e(n.init) || (n.init = h), j;
      }, j.open(i);
    }return g;
  }("prototype", {}.hasOwnProperty),
      m = { ease: ["ease", function (a, b, c, d) {
      var e = (a /= d) * a,
          f = e * a;return b + c * (-2.75 * f * e + 11 * e * e + -15.5 * f + 8 * e + .25 * a);
    }], "ease-in": ["ease-in", function (a, b, c, d) {
      var e = (a /= d) * a,
          f = e * a;return b + c * (-1 * f * e + 3 * e * e + -3 * f + 2 * e);
    }], "ease-out": ["ease-out", function (a, b, c, d) {
      var e = (a /= d) * a,
          f = e * a;return b + c * (.3 * f * e + -1.6 * e * e + 2.2 * f + -1.8 * e + 1.9 * a);
    }], "ease-in-out": ["ease-in-out", function (a, b, c, d) {
      var e = (a /= d) * a,
          f = e * a;return b + c * (2 * f * e + -5 * e * e + 2 * f + 2 * e);
    }], linear: ["linear", function (a, b, c, d) {
      return c * a / d + b;
    }], "ease-in-quad": ["cubic-bezier(0.550, 0.085, 0.680, 0.530)", function (a, b, c, d) {
      return c * (a /= d) * a + b;
    }], "ease-out-quad": ["cubic-bezier(0.250, 0.460, 0.450, 0.940)", function (a, b, c, d) {
      return -c * (a /= d) * (a - 2) + b;
    }], "ease-in-out-quad": ["cubic-bezier(0.455, 0.030, 0.515, 0.955)", function (a, b, c, d) {
      return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b;
    }], "ease-in-cubic": ["cubic-bezier(0.550, 0.055, 0.675, 0.190)", function (a, b, c, d) {
      return c * (a /= d) * a * a + b;
    }], "ease-out-cubic": ["cubic-bezier(0.215, 0.610, 0.355, 1)", function (a, b, c, d) {
      return c * ((a = a / d - 1) * a * a + 1) + b;
    }], "ease-in-out-cubic": ["cubic-bezier(0.645, 0.045, 0.355, 1)", function (a, b, c, d) {
      return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b;
    }], "ease-in-quart": ["cubic-bezier(0.895, 0.030, 0.685, 0.220)", function (a, b, c, d) {
      return c * (a /= d) * a * a * a + b;
    }], "ease-out-quart": ["cubic-bezier(0.165, 0.840, 0.440, 1)", function (a, b, c, d) {
      return -c * ((a = a / d - 1) * a * a * a - 1) + b;
    }], "ease-in-out-quart": ["cubic-bezier(0.770, 0, 0.175, 1)", function (a, b, c, d) {
      return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b;
    }], "ease-in-quint": ["cubic-bezier(0.755, 0.050, 0.855, 0.060)", function (a, b, c, d) {
      return c * (a /= d) * a * a * a * a + b;
    }], "ease-out-quint": ["cubic-bezier(0.230, 1, 0.320, 1)", function (a, b, c, d) {
      return c * ((a = a / d - 1) * a * a * a * a + 1) + b;
    }], "ease-in-out-quint": ["cubic-bezier(0.860, 0, 0.070, 1)", function (a, b, c, d) {
      return (a /= d / 2) < 1 ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b;
    }], "ease-in-sine": ["cubic-bezier(0.470, 0, 0.745, 0.715)", function (a, b, c, d) {
      return -c * Math.cos(a / d * (Math.PI / 2)) + c + b;
    }], "ease-out-sine": ["cubic-bezier(0.390, 0.575, 0.565, 1)", function (a, b, c, d) {
      return c * Math.sin(a / d * (Math.PI / 2)) + b;
    }], "ease-in-out-sine": ["cubic-bezier(0.445, 0.050, 0.550, 0.950)", function (a, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b;
    }], "ease-in-expo": ["cubic-bezier(0.950, 0.050, 0.795, 0.035)", function (a, b, c, d) {
      return 0 === a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b;
    }], "ease-out-expo": ["cubic-bezier(0.190, 1, 0.220, 1)", function (a, b, c, d) {
      return a === d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b;
    }], "ease-in-out-expo": ["cubic-bezier(1, 0, 0, 1)", function (a, b, c, d) {
      return 0 === a ? b : a === d ? b + c : (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b;
    }], "ease-in-circ": ["cubic-bezier(0.600, 0.040, 0.980, 0.335)", function (a, b, c, d) {
      return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b;
    }], "ease-out-circ": ["cubic-bezier(0.075, 0.820, 0.165, 1)", function (a, b, c, d) {
      return c * Math.sqrt(1 - (a = a / d - 1) * a) + b;
    }], "ease-in-out-circ": ["cubic-bezier(0.785, 0.135, 0.150, 0.860)", function (a, b, c, d) {
      return (a /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b;
    }], "ease-in-back": ["cubic-bezier(0.600, -0.280, 0.735, 0.045)", function (a, b, c, d, e) {
      return void 0 === e && (e = 1.70158), c * (a /= d) * a * ((e + 1) * a - e) + b;
    }], "ease-out-back": ["cubic-bezier(0.175, 0.885, 0.320, 1.275)", function (a, b, c, d, e) {
      return void 0 === e && (e = 1.70158), c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b;
    }], "ease-in-out-back": ["cubic-bezier(0.680, -0.550, 0.265, 1.550)", function (a, b, c, d, e) {
      return void 0 === e && (e = 1.70158), (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b;
    }] },
      n = { "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)", "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)", "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)" },
      o = document,
      p = window,
      q = "bkwld-tram",
      r = /[\-\.0-9]/g,
      s = /[A-Z]/,
      t = "number",
      u = /^(rgb|#)/,
      v = /(em|cm|mm|in|pt|pc|px)$/,
      w = /(em|cm|mm|in|pt|pc|px|%)$/,
      x = /(deg|rad|turn)$/,
      y = "unitless",
      z = /(all|none) 0s ease 0s/,
      A = /^(width|height)$/,
      B = " ",
      C = o.createElement("a"),
      D = ["Webkit", "Moz", "O", "ms"],
      E = ["-webkit-", "-moz-", "-o-", "-ms-"],
      F = function F(a) {
    if (a in C.style) return { dom: a, css: a };var b,
        c,
        d = "",
        e = a.split("-");for (b = 0; b < e.length; b++) {
      d += e[b].charAt(0).toUpperCase() + e[b].slice(1);
    }for (b = 0; b < D.length; b++) {
      if (c = D[b] + d, c in C.style) return { dom: c, css: E[b] + a };
    }
  },
      G = b.support = { bind: Function.prototype.bind, transform: F("transform"), transition: F("transition"), backface: F("backface-visibility"), timing: F("transition-timing-function") };if (G.transition) {
    var H = G.timing.dom;if (C.style[H] = m["ease-in-back"][0], !C.style[H]) for (var I in n) {
      m[I][0] = n[I];
    }
  }var J = b.frame = function () {
    var a = p.requestAnimationFrame || p.webkitRequestAnimationFrame || p.mozRequestAnimationFrame || p.oRequestAnimationFrame || p.msRequestAnimationFrame;return a && G.bind ? a.bind(p) : function (a) {
      p.setTimeout(a, 16);
    };
  }(),
      K = b.now = function () {
    var a = p.performance,
        b = a && (a.now || a.webkitNow || a.msNow || a.mozNow);return b && G.bind ? b.bind(a) : Date.now || function () {
      return +new Date();
    };
  }(),
      L = l(function (b) {
    function d(a, b) {
      var c = k(("" + a).split(B)),
          d = c[0];b = b || {};var e = Y[d];if (!e) return j("Unsupported property: " + d);if (!b.weak || !this.props[d]) {
        var f = e[0],
            g = this.props[d];return g || (g = this.props[d] = new f.Bare()), g.init(this.$el, c, e, b), g;
      }
    }function e(a, b, c) {
      if (a) {
        var e = typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a);if (b || (this.timer && this.timer.destroy(), this.queue = [], this.active = !1), "number" == e && b) return this.timer = new S({ duration: a, context: this, complete: h }), void (this.active = !0);if ("string" == e && b) {
          switch (a) {case "hide":
              o.call(this);break;case "stop":
              l.call(this);break;case "redraw":
              p.call(this);break;default:
              d.call(this, a, c && c[1]);}return h.call(this);
        }if ("function" == e) return void a.call(this, this);if ("object" == e) {
          var f = 0;u.call(this, a, function (a, b) {
            a.span > f && (f = a.span), a.stop(), a.animate(b);
          }, function (a) {
            "wait" in a && (f = i(a.wait, 0));
          }), t.call(this), f > 0 && (this.timer = new S({ duration: f, context: this }), this.active = !0, b && (this.timer.complete = h));var g = this,
              j = !1,
              k = {};J(function () {
            u.call(g, a, function (a) {
              a.active && (j = !0, k[a.name] = a.nextStyle);
            }), j && g.$el.css(k);
          });
        }
      }
    }function f(a) {
      a = i(a, 0), this.active ? this.queue.push({ options: a }) : (this.timer = new S({ duration: a, context: this, complete: h }), this.active = !0);
    }function g(a) {
      return this.active ? (this.queue.push({ options: a, args: arguments }), void (this.timer.complete = h)) : j("No active transition timer. Use start() or wait() before then().");
    }function h() {
      if (this.timer && this.timer.destroy(), this.active = !1, this.queue.length) {
        var a = this.queue.shift();e.call(this, a.options, !0, a.args);
      }
    }function l(a) {
      this.timer && this.timer.destroy(), this.queue = [], this.active = !1;var b;"string" == typeof a ? (b = {}, b[a] = 1) : b = "object" == (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) && null != a ? a : this.props, u.call(this, b, v), t.call(this);
    }function m(a) {
      l.call(this, a), u.call(this, a, w, x);
    }function n(a) {
      "string" != typeof a && (a = "block"), this.el.style.display = a;
    }function o() {
      l.call(this), this.el.style.display = "none";
    }function p() {
      this.el.offsetHeight;
    }function r() {
      l.call(this), a.removeData(this.el, q), this.$el = this.el = null;
    }function t() {
      var a,
          b,
          c = [];this.upstream && c.push(this.upstream);for (a in this.props) {
        b = this.props[a], b.active && c.push(b.string);
      }c = c.join(","), this.style !== c && (this.style = c, this.el.style[G.transition.dom] = c);
    }function u(a, b, e) {
      var f,
          g,
          h,
          i,
          j = b !== v,
          k = {};for (f in a) {
        h = a[f], f in Z ? (k.transform || (k.transform = {}), k.transform[f] = h) : (s.test(f) && (f = c(f)), f in Y ? k[f] = h : (i || (i = {}), i[f] = h));
      }for (f in k) {
        if (h = k[f], g = this.props[f], !g) {
          if (!j) continue;g = d.call(this, f);
        }b.call(this, g, h);
      }e && i && e.call(this, i);
    }function v(a) {
      a.stop();
    }function w(a, b) {
      a.set(b);
    }function x(a) {
      this.$el.css(a);
    }function y(a, c) {
      b[a] = function () {
        return this.children ? A.call(this, c, arguments) : (this.el && c.apply(this, arguments), this);
      };
    }function A(a, b) {
      var c,
          d = this.children.length;for (c = 0; d > c; c++) {
        a.apply(this.children[c], b);
      }return this;
    }b.init = function (b) {
      if (this.$el = a(b), this.el = this.$el[0], this.props = {}, this.queue = [], this.style = "", this.active = !1, U.keepInherited && !U.fallback) {
        var c = W(this.el, "transition");c && !z.test(c) && (this.upstream = c);
      }G.backface && U.hideBackface && V(this.el, G.backface.css, "hidden");
    }, y("add", d), y("start", e), y("wait", f), y("then", g), y("next", h), y("stop", l), y("set", m), y("show", n), y("hide", o), y("redraw", p), y("destroy", r);
  }),
      M = l(L, function (b) {
    function c(b, c) {
      var d = a.data(b, q) || a.data(b, q, new L.Bare());return d.el || d.init(b), c ? d.start(c) : d;
    }b.init = function (b, d) {
      var e = a(b);if (!e.length) return this;if (1 === e.length) return c(e[0], d);var f = [];return e.each(function (a, b) {
        f.push(c(b, d));
      }), this.children = f, this;
    };
  }),
      N = l(function (a) {
    function b() {
      var a = this.get();this.update("auto");var b = this.get();return this.update(a), b;
    }function c(a, b, c) {
      return void 0 !== b && (c = b), a in m ? a : c;
    }function d(a) {
      var b = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(a);return (b ? e(b[1], b[2], b[3]) : a).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
    }var f = { duration: 500, ease: "ease", delay: 0 };a.init = function (a, b, d, e) {
      this.$el = a, this.el = a[0];var g = b[0];d[2] && (g = d[2]), X[g] && (g = X[g]), this.name = g, this.type = d[1], this.duration = i(b[1], this.duration, f.duration), this.ease = c(b[2], this.ease, f.ease), this.delay = i(b[3], this.delay, f.delay), this.span = this.duration + this.delay, this.active = !1, this.nextStyle = null, this.auto = A.test(this.name), this.unit = e.unit || this.unit || U.defaultUnit, this.angle = e.angle || this.angle || U.defaultAngle, U.fallback || e.fallback ? this.animate = this.fallback : (this.animate = this.transition, this.string = this.name + B + this.duration + "ms" + ("ease" != this.ease ? B + m[this.ease][0] : "") + (this.delay ? B + this.delay + "ms" : ""));
    }, a.set = function (a) {
      a = this.convert(a, this.type), this.update(a), this.redraw();
    }, a.transition = function (a) {
      this.active = !0, a = this.convert(a, this.type), this.auto && ("auto" == this.el.style[this.name] && (this.update(this.get()), this.redraw()), "auto" == a && (a = b.call(this))), this.nextStyle = a;
    }, a.fallback = function (a) {
      var c = this.el.style[this.name] || this.convert(this.get(), this.type);a = this.convert(a, this.type), this.auto && ("auto" == c && (c = this.convert(this.get(), this.type)), "auto" == a && (a = b.call(this))), this.tween = new R({ from: c, to: a, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this });
    }, a.get = function () {
      return W(this.el, this.name);
    }, a.update = function (a) {
      V(this.el, this.name, a);
    }, a.stop = function () {
      (this.active || this.nextStyle) && (this.active = !1, this.nextStyle = null, V(this.el, this.name, this.get()));var a = this.tween;a && a.context && a.destroy();
    }, a.convert = function (a, b) {
      if ("auto" == a && this.auto) return a;var c,
          e = "number" == typeof a,
          f = "string" == typeof a;switch (b) {case t:
          if (e) return a;if (f && "" === a.replace(r, "")) return +a;c = "number(unitless)";break;case u:
          if (f) {
            if ("" === a && this.original) return this.original;if (b.test(a)) return "#" == a.charAt(0) && 7 == a.length ? a : d(a);
          }c = "hex or rgb string";break;case v:
          if (e) return a + this.unit;if (f && b.test(a)) return a;c = "number(px) or string(unit)";break;case w:
          if (e) return a + this.unit;if (f && b.test(a)) return a;c = "number(px) or string(unit or %)";break;case x:
          if (e) return a + this.angle;if (f && b.test(a)) return a;c = "number(deg) or string(angle)";break;case y:
          if (e) return a;if (f && w.test(a)) return a;c = "number(unitless) or string(unit or %)";}return g(c, a), a;
    }, a.redraw = function () {
      this.el.offsetHeight;
    };
  }),
      O = l(N, function (a, b) {
    a.init = function () {
      b.init.apply(this, arguments), this.original || (this.original = this.convert(this.get(), u));
    };
  }),
      P = l(N, function (a, b) {
    a.init = function () {
      b.init.apply(this, arguments), this.animate = this.fallback;
    }, a.get = function () {
      return this.$el[this.name]();
    }, a.update = function (a) {
      this.$el[this.name](a);
    };
  }),
      Q = l(N, function (a, b) {
    function c(a, b) {
      var c, d, e, f, g;for (c in a) {
        f = Z[c], e = f[0], d = f[1] || c, g = this.convert(a[c], e), b.call(this, d, g, e);
      }
    }a.init = function () {
      b.init.apply(this, arguments), this.current || (this.current = {}, Z.perspective && U.perspective && (this.current.perspective = U.perspective, V(this.el, this.name, this.style(this.current)), this.redraw()));
    }, a.set = function (a) {
      c.call(this, a, function (a, b) {
        this.current[a] = b;
      }), V(this.el, this.name, this.style(this.current)), this.redraw();
    }, a.transition = function (a) {
      var b = this.values(a);this.tween = new T({ current: this.current, values: b, duration: this.duration, delay: this.delay, ease: this.ease });var c,
          d = {};for (c in this.current) {
        d[c] = c in b ? b[c] : this.current[c];
      }this.active = !0, this.nextStyle = this.style(d);
    }, a.fallback = function (a) {
      var b = this.values(a);this.tween = new T({ current: this.current, values: b, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this });
    }, a.update = function () {
      V(this.el, this.name, this.style(this.current));
    }, a.style = function (a) {
      var b,
          c = "";for (b in a) {
        c += b + "(" + a[b] + ") ";
      }return c;
    }, a.values = function (a) {
      var b,
          d = {};return c.call(this, a, function (a, c, e) {
        d[a] = c, void 0 === this.current[a] && (b = 0, ~a.indexOf("scale") && (b = 1), this.current[a] = this.convert(b, e));
      }), d;
    };
  }),
      R = l(function (b) {
    function c(a) {
      1 === n.push(a) && J(g);
    }function g() {
      var a,
          b,
          c,
          d = n.length;if (d) for (J(g), b = K(), a = d; a--;) {
        c = n[a], c && c.render(b);
      }
    }function i(b) {
      var c,
          d = a.inArray(b, n);d >= 0 && (c = n.slice(d + 1), n.length = d, c.length && (n = n.concat(c)));
    }function j(a) {
      return Math.round(a * o) / o;
    }function k(a, b, c) {
      return e(a[0] + c * (b[0] - a[0]), a[1] + c * (b[1] - a[1]), a[2] + c * (b[2] - a[2]));
    }var l = { ease: m.ease[1], from: 0, to: 1 };b.init = function (a) {
      this.duration = a.duration || 0, this.delay = a.delay || 0;var b = a.ease || l.ease;m[b] && (b = m[b][1]), "function" != typeof b && (b = l.ease), this.ease = b, this.update = a.update || f, this.complete = a.complete || f, this.context = a.context || this, this.name = a.name;var c = a.from,
          d = a.to;void 0 === c && (c = l.from), void 0 === d && (d = l.to), this.unit = a.unit || "", "number" == typeof c && "number" == typeof d ? (this.begin = c, this.change = d - c) : this.format(d, c), this.value = this.begin + this.unit, this.start = K(), a.autoplay !== !1 && this.play();
    }, b.play = function () {
      this.active || (this.start || (this.start = K()), this.active = !0, c(this));
    }, b.stop = function () {
      this.active && (this.active = !1, i(this));
    }, b.render = function (a) {
      var b,
          c = a - this.start;if (this.delay) {
        if (c <= this.delay) return;c -= this.delay;
      }if (c < this.duration) {
        var d = this.ease(c, 0, 1, this.duration);return b = this.startRGB ? k(this.startRGB, this.endRGB, d) : j(this.begin + d * this.change), this.value = b + this.unit, void this.update.call(this.context, this.value);
      }b = this.endHex || this.begin + this.change, this.value = b + this.unit, this.update.call(this.context, this.value), this.complete.call(this.context), this.destroy();
    }, b.format = function (a, b) {
      if (b += "", a += "", "#" == a.charAt(0)) return this.startRGB = d(b), this.endRGB = d(a), this.endHex = a, this.begin = 0, void (this.change = 1);if (!this.unit) {
        var c = b.replace(r, ""),
            e = a.replace(r, "");c !== e && h("tween", b, a), this.unit = c;
      }b = parseFloat(b), a = parseFloat(a), this.begin = this.value = b, this.change = a - b;
    }, b.destroy = function () {
      this.stop(), this.context = null, this.ease = this.update = this.complete = f;
    };var n = [],
        o = 1e3;
  }),
      S = l(R, function (a) {
    a.init = function (a) {
      this.duration = a.duration || 0, this.complete = a.complete || f, this.context = a.context, this.play();
    }, a.render = function (a) {
      var b = a - this.start;b < this.duration || (this.complete.call(this.context), this.destroy());
    };
  }),
      T = l(R, function (a, b) {
    a.init = function (a) {
      this.context = a.context, this.update = a.update, this.tweens = [], this.current = a.current;var b, c;for (b in a.values) {
        c = a.values[b], this.current[b] !== c && this.tweens.push(new R({ name: b, from: this.current[b], to: c, duration: a.duration, delay: a.delay, ease: a.ease, autoplay: !1 }));
      }this.play();
    }, a.render = function (a) {
      var b,
          c,
          d = this.tweens.length,
          e = !1;for (b = d; b--;) {
        c = this.tweens[b], c.context && (c.render(a), this.current[c.name] = c.value, e = !0);
      }return e ? void (this.update && this.update.call(this.context)) : this.destroy();
    }, a.destroy = function () {
      if (b.destroy.call(this), this.tweens) {
        var a,
            c = this.tweens.length;for (a = c; a--;) {
          this.tweens[a].destroy();
        }this.tweens = null, this.current = null;
      }
    };
  }),
      U = b.config = { debug: !1, defaultUnit: "px", defaultAngle: "deg", keepInherited: !1, hideBackface: !1, perspective: "", fallback: !G.transition, agentTests: [] };b.fallback = function (a) {
    if (!G.transition) return U.fallback = !0;U.agentTests.push("(" + a + ")");var b = new RegExp(U.agentTests.join("|"), "i");U.fallback = b.test(navigator.userAgent);
  }, b.fallback("6.0.[2-5] Safari"), b.tween = function (a) {
    return new R(a);
  }, b.delay = function (a, b, c) {
    return new S({ complete: b, duration: a, context: c });
  }, a.fn.tram = function (a) {
    return b.call(null, this, a);
  };var V = a.style,
      W = a.css,
      X = { transform: G.transform && G.transform.css },
      Y = { color: [O, u], background: [O, u, "background-color"], "outline-color": [O, u], "border-color": [O, u], "border-top-color": [O, u], "border-right-color": [O, u], "border-bottom-color": [O, u], "border-left-color": [O, u], "border-width": [N, v], "border-top-width": [N, v], "border-right-width": [N, v], "border-bottom-width": [N, v], "border-left-width": [N, v], "border-spacing": [N, v], "letter-spacing": [N, v], margin: [N, v], "margin-top": [N, v], "margin-right": [N, v], "margin-bottom": [N, v], "margin-left": [N, v], padding: [N, v], "padding-top": [N, v], "padding-right": [N, v], "padding-bottom": [N, v], "padding-left": [N, v], "outline-width": [N, v], opacity: [N, t], top: [N, w], right: [N, w], bottom: [N, w], left: [N, w], "font-size": [N, w], "text-indent": [N, w], "word-spacing": [N, w], width: [N, w], "min-width": [N, w], "max-width": [N, w], height: [N, w], "min-height": [N, w], "max-height": [N, w], "line-height": [N, y], "scroll-top": [P, t, "scrollTop"], "scroll-left": [P, t, "scrollLeft"] },
      Z = {};G.transform && (Y.transform = [Q], Z = { x: [w, "translateX"], y: [w, "translateY"], rotate: [x], rotateX: [x], rotateY: [x], scale: [t], scaleX: [t], scaleY: [t], skew: [x], skewX: [x], skewY: [x] }), G.transform && G.backface && (Z.z = [w, "translateZ"], Z.rotateZ = [x], Z.scaleZ = [t], Z.perspective = [v]);var $ = /ms/,
      _ = /s|\./;return a.tram = b;
}(window.jQuery);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(9);
var $export = __webpack_require__(29);
var redefine = __webpack_require__(32);
var hide = __webpack_require__(3);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(49);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(56);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(10);
var ctx = __webpack_require__(47);
var hide = __webpack_require__(3);
var has = __webpack_require__(1);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(31)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(50);
var enumBugKeys = __webpack_require__(22);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(31)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(1);
var toIObject = __webpack_require__(6);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(34);
var hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @wf-will-never-add-flow-to-this-file
/* eslint-disable */


var IXEvents = __webpack_require__(77);

function dispatchCustomEvent(element, eventName) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, true, true, null);
  element.dispatchEvent(event);
}

/**
 * Webflow: IX Event triggers for other modules
 */

var $ = window.jQuery;
var api = {};
var namespace = '.w-ix';

var eventTriggers = {
  reset: function reset(i, el) {
    IXEvents.triggers.reset(i, el);
  },
  intro: function intro(i, el) {
    IXEvents.triggers.intro(i, el);
    dispatchCustomEvent(el, 'COMPONENT_ACTIVE');
  },
  outro: function outro(i, el) {
    IXEvents.triggers.outro(i, el);
    dispatchCustomEvent(el, 'COMPONENT_INACTIVE');
  }
};

api.triggers = {};

api.types = {
  INTRO: 'w-ix-intro' + namespace,
  OUTRO: 'w-ix-outro' + namespace
};

$.extend(api.triggers, eventTriggers);

module.exports = api;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
module.exports = __webpack_require__(78);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Brand pages on the subdomain
 */

var Webflow = __webpack_require__(2);

Webflow.define('brand', module.exports = function ($) {
  var api = {};
  var doc = document;
  var $html = $('html');
  var $body = $('body');
  var namespace = '.w-webflow-badge';
  var location = window.location;
  var isPhantom = /PhantomJS/i.test(navigator.userAgent);
  var fullScreenEvents = 'fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange';
  var brandElement;

  // -----------------------------------
  // Module methods

  api.ready = function () {
    var shouldBrand = $html.attr('data-wf-status');
    var publishedDomain = $html.attr('data-wf-domain') || '';
    if (/\.webflow\.io$/i.test(publishedDomain) && location.hostname !== publishedDomain) {
      shouldBrand = true;
    }
    if (shouldBrand && !isPhantom) {
      brandElement = brandElement || createBadge();
      ensureBrand();
      setTimeout(ensureBrand, 500);

      $(doc).off(fullScreenEvents, onFullScreenChange).on(fullScreenEvents, onFullScreenChange);
    }
  };

  function onFullScreenChange() {
    var fullScreen = doc.fullScreen || doc.mozFullScreen || doc.webkitIsFullScreen || doc.msFullscreenElement || Boolean(doc.webkitFullscreenElement);
    $(brandElement).attr('style', fullScreen ? 'display: none !important;' : '');
  }

  function createBadge() {
    var $brand = $('<a class="w-webflow-badge"></a>').attr('href', 'https://webflow.com?utm_campaign=brandjs');

    var $logoArt = $('<img>').attr('src', 'https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg').css({
      marginRight: '8px',
      width: '16px'
    });

    var $logoText = $('<img>').attr('src', 'https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg');

    $brand.append($logoArt, $logoText);
    return $brand[0];
  }

  function ensureBrand() {
    var found = $body.children(namespace);
    var match = found.length && found.get(0) === brandElement;
    var inEditor = Webflow.env('editor');
    if (match) {
      // Remove brand when Editor is active
      if (inEditor) {
        found.remove();
      }
      // Exit early, brand is in place
      return;
    }
    // Remove any invalid brand elements
    if (found.length) {
      found.remove();
    }
    // Append the brand (unless Editor is active)
    if (!inEditor) {
      $body.append(brandElement);
    }
  }

  // Export module
  return api;
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
// Include tram for frame-throttling

var $ = window.$;
var tram = __webpack_require__(27) && $.tram;

/*eslint-disable */

/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
module.exports = function () {
  var _ = {};

  // Current version.
  _.VERSION = '1.6.0-Webflow';

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      concat = ArrayProto.concat,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeForEach = ArrayProto.forEach,
      nativeMap = ArrayProto.map,
      nativeReduce = ArrayProto.reduce,
      nativeReduceRight = ArrayProto.reduceRight,
      nativeFilter = ArrayProto.filter,
      nativeEvery = ArrayProto.every,
      nativeSome = ArrayProto.some,
      nativeIndexOf = ArrayProto.indexOf,
      nativeLastIndexOf = ArrayProto.lastIndexOf,
      nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind;

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function (obj, iterator, context) {
    /* jshint shadow:true */
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function (obj, predicate, context) {
    var result;
    any(obj, function (value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function (obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function (value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function (obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function (value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function (obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function (value) {
      return value === target;
    });
  };

  // Function (ahem) Functions
  // --------------------

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function (func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function (func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered once every
  // browser animation frame - using tram's requestAnimationFrame polyfill.
  _.throttle = function (func) {
    var wait, args, context;
    return function () {
      if (wait) return;
      wait = true;
      args = arguments;
      context = this;
      tram.frame(function () {
        wait = false;
        func.apply(context, args);
      });
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function later() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Object Functions
  // ----------------

  // Fill in a given object with default properties.
  _.defaults = function (obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function (obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) {
      if (_.has(obj, key)) keys.push(key);
    }return keys;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Is a given variable an object?
  _.isObject = function (obj) {
    return obj === Object(obj);
  };

  // Utility Functions
  // -----------------

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function () {
    return new Date().getTime();
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function escapeChar(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function (text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function template(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Export underscore
  return _;
}();

/* eslint-enable */

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(43);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(62);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(58);
module.exports = __webpack_require__(24).f('iterator');


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(46)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(28)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(3)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(35);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6);
var toLength = __webpack_require__(53);
var toAbsoluteIndex = __webpack_require__(54);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(1);
var toObject = __webpack_require__(57);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
var global = __webpack_require__(0);
var hide = __webpack_require__(3);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(60);
var step = __webpack_require__(61);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(28)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
module.exports = __webpack_require__(10).Symbol;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(29);
var redefine = __webpack_require__(32);
var META = __webpack_require__(65).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(21);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(14);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(24);
var wksDefine = __webpack_require__(25);
var enumKeys = __webpack_require__(66);
var isArray = __webpack_require__(67);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(17);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(68);
var $GOPD = __webpack_require__(69);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(19);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f = $propertyIsEnumerable;
  __webpack_require__(36).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(9)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(3)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(1);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(26);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(35);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(26);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(17);
var has = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(30);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25)('asyncIterator');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25)('observable');


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Auto-select links to current page or section
 */

var Webflow = __webpack_require__(2);

Webflow.define('links', module.exports = function ($, _) {
  var api = {};
  var $win = $(window);
  var designer;
  var inApp = Webflow.env();
  var location = window.location;
  var tempLink = document.createElement('a');
  var linkCurrent = 'w--current';
  var validHash = /^#[\w:.-]+$/;
  var indexPage = /index\.(html|php)$/;
  var dirList = /\/$/;
  var anchors;
  var slug;

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');
    slug = Webflow.env('slug') || location.pathname || '';

    // Reset scroll listener, init anchors
    Webflow.scroll.off(scroll);
    anchors = [];

    // Test all links for a selectable href
    var links = document.links;
    for (var i = 0; i < links.length; ++i) {
      select(links[i]);
    }

    // Listen for scroll if any anchors exist
    if (anchors.length) {
      Webflow.scroll.on(scroll);
      scroll();
    }
  }

  function select(link) {
    var href = designer && link.getAttribute('href-disabled') || link.getAttribute('href');
    tempLink.href = href;

    // Ignore any hrefs with a colon to safely avoid all uri schemes
    if (href.indexOf(':') >= 0) {
      return;
    }

    var $link = $(link);

    // Check for valid hash links w/ sections and use scroll anchor
    if (href.indexOf('#') === 0 && validHash.test(href)) {
      var $section = $(href);
      $section.length && anchors.push({ link: $link, sec: $section, active: false });
      return;
    }

    // Ignore empty # links
    if (href === '#' || href === '') {
      return;
    }

    // Determine whether the link should be selected
    var match = tempLink.href === location.href || href === slug || indexPage.test(href) && dirList.test(slug);
    setClass($link, linkCurrent, match);
  }

  function scroll() {
    var viewTop = $win.scrollTop();
    var viewHeight = $win.height();

    // Check each anchor for a section in view
    _.each(anchors, function (anchor) {
      var $link = anchor.link;
      var $section = anchor.sec;
      var top = $section.offset().top;
      var height = $section.outerHeight();
      var offset = viewHeight * 0.5;
      var active = $section.is(':visible') && top + height - offset >= viewTop && top + offset <= viewTop + viewHeight;
      if (anchor.active === active) {
        return;
      }
      anchor.active = active;
      setClass($link, linkCurrent, active);
    });
  }

  function setClass($elem, className, add) {
    var exists = $elem.hasClass(className);
    if (add && exists) {
      return;
    }
    if (!add && !exists) {
      return;
    }
    add ? $elem.addClass(className) : $elem.removeClass(className);
  }

  // Export module
  return api;
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Smooth scroll
 */

var Webflow = __webpack_require__(2);

Webflow.define('scroll', module.exports = function ($) {
  var $doc = $(document);
  var win = window;
  var loc = win.location;
  var history = inIframe() ? null : win.history;
  var validHash = /^[a-zA-Z0-9][\w:.-]*$/;

  function inIframe() {
    try {
      return Boolean(win.frameElement);
    } catch (e) {
      return true;
    }
  }

  function ready() {
    // The current page url without the hash part.
    var locHref = loc.href.split('#')[0];

    // When clicking on a link, check if it links to another part of the page
    $doc.on('click', 'a', function (e) {
      if (Webflow.env('design')) {
        return;
      }

      // Ignore links being used by jQuery mobile
      if (window.$.mobile && $(e.currentTarget).hasClass('ui-link')) {
        return;
      }

      // Ignore empty # links
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        return;
      }

      // The href property always contains the full url so we can compare
      // with the document’s location to only target links on this page.
      var parts = this.href.split('#');
      var hash = parts[0] === locHref ? parts[1] : null;
      if (hash) {
        findEl(hash, e);
      }
    });
  }

  function findEl(hash, e) {
    if (!validHash.test(hash)) {
      return;
    }

    var el = $('#' + hash);
    if (!el.length) {
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Push new history state
    if (loc.hash !== hash && history && history.pushState &&
    // Navigation breaks Chrome when the protocol is `file:`.
    !(Webflow.env.chrome && loc.protocol === 'file:')) {
      var oldHash = history.state && history.state.hash;
      if (oldHash !== hash) {
        history.pushState({ hash: hash }, '', '#' + hash);
      }
    }

    // If a fixed header exists, offset for the height
    var rootTag = Webflow.env('editor') ? '.w-editor-body' : 'body';
    var header = $('header, ' + rootTag + ' > .header, ' + rootTag + ' > .w-nav:not([data-no-scroll])');
    var offset = header.css('position') === 'fixed' ? header.outerHeight() : 0;

    win.setTimeout(function () {
      scroll(el, offset);
    }, e ? 0 : 300);
  }

  function scroll(el, offset) {
    var start = $(win).scrollTop();
    var end = el.offset().top - offset;

    // If specified, scroll so that the element ends up in the middle of the viewport
    if (el.data('scroll') === 'mid') {
      var available = $(win).height() - offset;
      var elHeight = el.outerHeight();
      if (elHeight < available) {
        end -= Math.round((available - elHeight) / 2);
      }
    }

    var mult = 1;

    // Check for custom time multiplier on the body and the element
    $('body').add(el).each(function () {
      var time = parseFloat($(this).attr('data-scroll-time'), 10);
      if (!isNaN(time) && (time === 0 || time > 0)) {
        mult = time;
      }
    });

    // Shim for IE8 and below
    if (!Date.now) {
      Date.now = function () {
        return new Date().getTime();
      };
    }

    var clock = Date.now();
    var animate = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || function (fn) {
      win.setTimeout(fn, 15);
    };
    var duration = (472.143 * Math.log(Math.abs(start - end) + 125) - 2000) * mult;

    var step = function step() {
      var elapsed = Date.now() - clock;
      win.scroll(0, getY(start, end, elapsed, duration));

      if (elapsed <= duration) {
        animate(step);
      }
    };

    step();
  }

  function getY(start, end, elapsed, duration) {
    if (elapsed > duration) {
      return end;
    }

    return start + (end - start) * ease(elapsed / duration);
  }

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // Export module
  return { ready: ready };
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Touch events
 */

var Webflow = __webpack_require__(2);

Webflow.define('touch', module.exports = function ($) {
  var api = {};
  var fallback = !document.addEventListener;
  var getSelection = window.getSelection;

  // Fallback to click events in old IE
  if (fallback) {
    $.event.special.tap = { bindType: 'click', delegateType: 'click' };
  }

  api.init = function (el) {
    if (fallback) {
      return null;
    }
    el = typeof el === 'string' ? $(el).get(0) : el;
    return el ? new Touch(el) : null;
  };

  function Touch(el) {
    var active = false;
    var dirty = false;
    var useTouch = false;
    var thresholdX = Math.min(Math.round(window.innerWidth * 0.04), 40);
    var startX;
    var startY;
    var lastX;

    el.addEventListener('touchstart', start, false);
    el.addEventListener('touchmove', move, false);
    el.addEventListener('touchend', end, false);
    el.addEventListener('touchcancel', cancel, false);
    el.addEventListener('mousedown', start, false);
    el.addEventListener('mousemove', move, false);
    el.addEventListener('mouseup', end, false);
    el.addEventListener('mouseout', cancel, false);

    function start(evt) {
      // We don’t handle multi-touch events yet.
      var touches = evt.touches;
      if (touches && touches.length > 1) {
        return;
      }

      active = true;
      dirty = false;

      if (touches) {
        useTouch = true;
        startX = touches[0].clientX;
        startY = touches[0].clientY;
      } else {
        startX = evt.clientX;
        startY = evt.clientY;
      }

      lastX = startX;
    }

    function move(evt) {
      if (!active) {
        return;
      }

      if (useTouch && evt.type === 'mousemove') {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }

      var touches = evt.touches;
      var x = touches ? touches[0].clientX : evt.clientX;
      var y = touches ? touches[0].clientY : evt.clientY;

      var velocityX = x - lastX;
      lastX = x;

      // Allow swipes while pointer is down, but prevent them during text selection
      if (Math.abs(velocityX) > thresholdX && getSelection && String(getSelection()) === '') {
        triggerEvent('swipe', evt, {
          direction: velocityX > 0 ? 'right' : 'left'
        });
        cancel();
      }

      // If pointer moves more than 10px flag to cancel tap
      if (Math.abs(x - startX) > 10 || Math.abs(y - startY) > 10) {
        dirty = true;
      }
    }

    function end(evt) {
      if (!active) {
        return;
      }
      active = false;

      if (useTouch && evt.type === 'mouseup') {
        evt.preventDefault();
        evt.stopPropagation();
        useTouch = false;
        return;
      }

      if (!dirty) {
        triggerEvent('tap', evt);
      }
    }

    function cancel() {
      active = false;
    }

    function destroy() {
      el.removeEventListener('touchstart', start, false);
      el.removeEventListener('touchmove', move, false);
      el.removeEventListener('touchend', end, false);
      el.removeEventListener('touchcancel', cancel, false);
      el.removeEventListener('mousedown', start, false);
      el.removeEventListener('mousemove', move, false);
      el.removeEventListener('mouseup', end, false);
      el.removeEventListener('mouseout', cancel, false);
      el = null;
    }

    // Public instance methods
    this.destroy = destroy;
  }

  // Wrap native event to supoprt preventdefault + stopPropagation
  function triggerEvent(type, evt, data) {
    var newEvent = $.Event(type, { originalEvent: evt });
    $(evt.target).trigger(newEvent, data);
  }

  // Listen for touch events on all nodes by default.
  api.instance = api.init(document);

  // Export module
  return api;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Dropdown component
 */

var Webflow = __webpack_require__(2);
var IXEvents = __webpack_require__(38);

Webflow.define('dropdown', module.exports = function ($, _) {
  var api = {};
  var $doc = $(document);
  var $dropdowns;
  var designer;
  var inApp = Webflow.env();
  var touch = Webflow.env.touch;
  var namespace = '.w-dropdown';
  var stateOpen = 'w--open';
  var closeEvent = 'w-close' + namespace;
  var ix = IXEvents.triggers;
  var defaultZIndex = 900; // @dropdown-depth
  var inPreview = false;

  // -----------------------------------
  // Module methods

  api.ready = init;

  api.design = function () {
    // Close all when returning from preview
    if (inPreview) {
      closeAll();
    }
    inPreview = false;
    init();
  };

  api.preview = function () {
    inPreview = true;
    init();
  };

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');

    // Find all instances on the page
    $dropdowns = $doc.find(namespace);
    $dropdowns.each(build);
  }

  function build(i, el) {
    var $el = $(el);

    // Store state in data
    var data = $.data(el, namespace);
    if (!data) {
      data = $.data(el, namespace, { open: false, el: $el, config: {} });
    }
    data.list = $el.children('.w-dropdown-list');
    data.toggle = $el.children('.w-dropdown-toggle');
    data.links = data.list.children('.w-dropdown-link');
    data.outside = outside(data);
    data.complete = complete(data);
    data.leave = leave(data);
    data.moveOutside = moveOutside(data);

    // Remove old events
    $el.off(namespace);
    data.toggle.off(namespace);

    // Set config from data attributes
    configure(data);

    if (data.nav) {
      data.nav.off(namespace);
    }
    data.nav = $el.closest('.w-nav');
    data.nav.on(closeEvent, handler(data));

    // Add events based on mode
    if (designer) {
      $el.on('setting' + namespace, handler(data));
    } else {
      data.toggle.on(mouseOrTap() + namespace, toggle(data));
      if (data.config.hover) {
        data.toggle.on('mouseenter' + namespace, enter(data));
      }
      $el.on(closeEvent, handler(data));

      // Close in preview mode and clean the data.hovering state
      if (inApp) {
        data.hovering = false;
        close(data);
      }
    }
  }

  function configure(data) {
    // Determine if z-index should be managed
    var zIndex = Number(data.el.css('z-index'));
    data.manageZ = zIndex === defaultZIndex || zIndex === defaultZIndex + 1;

    data.config = {
      hover: (data.el.attr('data-hover') === true || data.el.attr('data-hover') === '1') && !touch,
      delay: Number(data.el.attr('data-delay')) || 0
    };
  }

  function handler(data) {
    return function (evt, options) {
      options = options || {};

      if (evt.type === 'w-close') {
        return close(data);
      }

      if (evt.type === 'setting') {
        configure(data);
        options.open === true && open(data, true);
        options.open === false && close(data, true);
        return;
      }
    };
  }

  function toggle(data) {
    return _.debounce(function () {
      data.open ? close(data) : open(data);
    });
  }

  function open(data) {
    if (data.open) {
      return;
    }
    closeOthers(data);
    data.open = true;
    data.list.addClass(stateOpen);
    data.toggle.addClass(stateOpen);
    ix.intro(0, data.el[0]);
    Webflow.redraw.up();

    // Increase z-index to keep above other managed dropdowns
    data.manageZ && data.el.css('z-index', defaultZIndex + 1);

    // Listen for tap outside events
    var isEditor = Webflow.env('editor');
    if (!designer) {
      $doc.on(mouseOrTap() + namespace, data.outside);
    }
    if (data.hovering && !isEditor) {
      data.el.on('mouseleave' + namespace, data.leave);
    }
    if (data.hovering && isEditor) {
      $doc.on('mousemove' + namespace, data.moveOutside);
    }

    // Clear previous delay
    window.clearTimeout(data.delayId);
  }

  function close(data, immediate) {
    if (!data.open) {
      return;
    }

    // Do not close hover-based menus if currently hovering
    if (data.config.hover && data.hovering) {
      return;
    }

    data.open = false;
    var config = data.config;
    ix.outro(0, data.el[0]);

    // Stop listening for tap outside events
    $doc.off(mouseOrTap() + namespace, data.outside);
    data.el.off('mouseleave' + namespace, data.leave);
    $doc.off('mousemove' + namespace, data.moveOutside);

    // Clear previous delay
    window.clearTimeout(data.delayId);

    // Skip delay during immediate
    if (!config.delay || immediate) {
      return data.complete();
    }

    // Optionally wait for delay before close
    data.delayId = window.setTimeout(data.complete, config.delay);
  }

  function closeAll() {
    $doc.find(namespace).each(function (i, el) {
      $(el).triggerHandler(closeEvent);
    });
  }

  function closeOthers(data) {
    var self = data.el[0];
    $dropdowns.each(function (i, other) {
      var $other = $(other);
      if ($other.is(self) || $other.has(self).length) {
        return;
      }
      $other.triggerHandler(closeEvent);
    });
  }

  function outside(data) {
    // Unbind previous tap handler if it exists
    if (data.outside) {
      $doc.off(mouseOrTap() + namespace, data.outside);
    }

    // Close menu when tapped outside
    return _.debounce(function (evt) {
      if (!data.open) {
        return;
      }
      var $target = $(evt.target);
      if ($target.closest('.w-dropdown-toggle').length) {
        return;
      }
      var isEventOutsideDropdowns = $.inArray(data.el[0], $target.parents(namespace)) === -1;
      var isEditor = Webflow.env('editor');
      if (isEventOutsideDropdowns) {
        if (isEditor) {
          var isEventOnDetachedSvg = $target.parents().length === 1 && $target.parents('svg').length === 1;
          var isEventOnHoverControls = $target.parents('.w-editor-bem-EditorHoverControls').length;
          if (isEventOnDetachedSvg || isEventOnHoverControls) {
            return;
          }
        }
        close(data);
      }
    });
  }

  function complete(data) {
    return function () {
      data.list.removeClass(stateOpen);
      data.toggle.removeClass(stateOpen);

      // Reset z-index for managed dropdowns
      data.manageZ && data.el.css('z-index', '');
    };
  }

  function enter(data) {
    return function () {
      data.hovering = true;
      open(data);
    };
  }

  function leave(data) {
    return function () {
      data.hovering = false;
      close(data);
    };
  }

  function moveOutside(data) {
    return _.debounce(function (evt) {
      if (!data.open) {
        return;
      }
      var $target = $(evt.target);
      var isEventOutsideDropdowns = $.inArray(data.el[0], $target.parents(namespace)) === -1;
      if (isEventOutsideDropdowns) {
        var isEventOnHoverControls = $target.parents('.w-editor-bem-EditorHoverControls').length;
        var isEventOnHoverToolbar = $target.parents('.w-editor-bem-RTToolbar').length;
        var $editorOverlay = $('.w-editor-bem-EditorOverlay');
        var isDropdownInEdition = $editorOverlay.find('.w-editor-edit-outline').length || $editorOverlay.find('.w-editor-bem-RTToolbar').length;
        if (isEventOnHoverControls || isEventOnHoverToolbar || isDropdownInEdition) {
          return;
        }
        data.hovering = false;
        close(data);
      }
    });
  }

  function mouseOrTap() {
    return touch ? 'tap' : 'mouseup';
  }

  // Export module
  return api;
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: IX Event triggers for other modules
 */


var $ = window.jQuery;
var api = {};
var eventQueue = [];
var namespace = '.w-ix';

var eventTriggers = {
  reset: function reset(i, el) {
    el.__wf_intro = null;
  },
  intro: function intro(i, el) {
    if (el.__wf_intro) {
      return;
    }
    el.__wf_intro = true;
    $(el).triggerHandler(api.types.INTRO);
  },
  outro: function outro(i, el) {
    if (!el.__wf_intro) {
      return;
    }
    el.__wf_intro = null;
    $(el).triggerHandler(api.types.OUTRO);
  }
};

api.triggers = {};

api.types = {
  INTRO: 'w-ix-intro' + namespace,
  OUTRO: 'w-ix-outro' + namespace
};

// Trigger any events in queue + restore trigger methods
api.init = function () {
  var count = eventQueue.length;
  for (var i = 0; i < count; i++) {
    var memo = eventQueue[i];
    memo[0](0, memo[1]);
  }
  eventQueue = [];
  $.extend(api.triggers, eventTriggers);
};

// Replace all triggers with async wrapper to queue events until init
api.async = function () {
  for (var key in eventTriggers) {
    var func = eventTriggers[key];
    if (!eventTriggers.hasOwnProperty(key)) {
      continue;
    }

    // Replace trigger method with async wrapper
    api.triggers[key] = function (i, el) {
      eventQueue.push([func, el]);
    };
  }
};

// Default triggers to async queue
api.async();

module.exports = api;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @wf-will-never-add-flow-to-this-file
/* eslint-disable */
/**
 * Webflow: Navbar component
 */

var Webflow = __webpack_require__(2);
var IXEvents = __webpack_require__(38);

Webflow.define('navbar', module.exports = function ($, _) {
  var api = {};
  var tram = $.tram;
  var $win = $(window);
  var $doc = $(document);
  var $body;
  var $navbars;
  var designer;
  var inEditor;
  var inApp = Webflow.env();
  var overlay = '<div class="w-nav-overlay" data-wf-ignore />';
  var namespace = '.w-nav';
  var buttonOpen = 'w--open';
  var menuOpen = 'w--nav-menu-open';
  var linkOpen = 'w--nav-link-open';
  var ix = IXEvents.triggers;
  var menuSibling = $();

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  api.destroy = function () {
    menuSibling = $();
    removeListeners();
    if ($navbars && $navbars.length) {
      $navbars.each(teardown);
    }
  };

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');
    inEditor = Webflow.env('editor');
    $body = $(document.body);

    // Find all instances on the page
    $navbars = $doc.find(namespace);
    if (!$navbars.length) {
      return;
    }
    $navbars.each(build);

    // Wire events
    removeListeners();
    addListeners();
  }

  function removeListeners() {
    Webflow.resize.off(resizeAll);
  }

  function addListeners() {
    Webflow.resize.on(resizeAll);
  }

  function resizeAll() {
    $navbars.each(resize);
  }

  function build(i, el) {
    var $el = $(el);

    // Store state in data
    var data = $.data(el, namespace);
    if (!data) {
      data = $.data(el, namespace, { open: false, el: $el, config: {} });
    }
    data.menu = $el.find('.w-nav-menu');
    data.links = data.menu.find('.w-nav-link');
    data.dropdowns = data.menu.find('.w-dropdown');
    data.button = $el.find('.w-nav-button');
    data.container = $el.find('.w-container');
    data.outside = outside(data);

    // Remove old events
    data.el.off(namespace);
    data.button.off(namespace);
    data.menu.off(namespace);

    // Set config from data attributes
    configure(data);

    // Add events based on mode
    if (designer) {
      removeOverlay(data);
      data.el.on('setting' + namespace, handler(data));
    } else {
      addOverlay(data);
      data.button.on('tap' + namespace, toggle(data));
      data.menu.on('click' + namespace, 'a', navigate(data));
    }

    // Trigger initial resize
    resize(i, el);
  }

  function teardown(i, el) {
    var data = $.data(el, namespace);
    if (data) {
      removeOverlay(data);
      $.removeData(el, namespace);
    }
  }

  function removeOverlay(data) {
    if (!data.overlay) {
      return;
    }
    close(data, true);
    data.overlay.remove();
    data.overlay = null;
  }

  function addOverlay(data) {
    if (data.overlay) {
      return;
    }
    data.overlay = $(overlay).appendTo(data.el);
    data.parent = data.menu.parent();
    close(data, true);
  }

  function configure(data) {
    var config = {};
    var old = data.config || {};

    // Set config options from data attributes
    var animation = config.animation = data.el.attr('data-animation') || 'default';
    config.animOver = /^over/.test(animation);
    config.animDirect = /left$/.test(animation) ? -1 : 1;

    // Re-open menu if the animation type changed
    if (old.animation !== animation) {
      data.open && _.defer(reopen, data);
    }

    config.easing = data.el.attr('data-easing') || 'ease';
    config.easing2 = data.el.attr('data-easing2') || 'ease';

    var duration = data.el.attr('data-duration');
    config.duration = duration != null ? Number(duration) : 400;

    config.docHeight = data.el.attr('data-doc-height');

    // Store config in data
    data.config = config;
  }

  function handler(data) {
    return function (evt, options) {
      options = options || {};
      var winWidth = $win.width();
      configure(data);
      options.open === true && open(data, true);
      options.open === false && close(data, true);
      // Reopen if media query changed after setting
      data.open && _.defer(function () {
        if (winWidth !== $win.width()) {
          reopen(data);
        }
      });
    };
  }

  function reopen(data) {
    if (!data.open) {
      return;
    }
    close(data, true);
    open(data, true);
  }

  function toggle(data) {
    // Debounce toggle to wait for accurate open state
    return _.debounce(function () {
      data.open ? close(data) : open(data);
    });
  }

  function navigate(data) {
    return function (evt) {
      var link = $(this);
      var href = link.attr('href');

      // Avoid late clicks on touch devices
      if (!Webflow.validClick(evt.currentTarget)) {
        evt.preventDefault();
        return;
      }

      // Close when navigating to an in-page anchor
      if (href && href.indexOf('#') === 0 && data.open) {
        close(data);
      }
    };
  }

  function outside(data) {
    // Unbind previous tap handler if it exists
    if (data.outside) {
      $doc.off('tap' + namespace, data.outside);
    }

    return function (evt) {
      var $target = $(evt.target);
      // Ignore clicks on Editor overlay UI
      if (inEditor && $target.closest('.w-editor-bem-EditorOverlay').length) {
        return;
      }
      // Close menu when tapped outside, debounced to wait for state
      outsideDebounced(data, $target);
    };
  }

  var outsideDebounced = _.debounce(function (data, $target) {
    if (!data.open) {
      return;
    }
    var menu = $target.closest('.w-nav-menu');
    if (!data.menu.is(menu)) {
      close(data);
    }
  });

  function resize(i, el) {
    var data = $.data(el, namespace);
    // Check for collapsed state based on button display
    var collapsed = data.collapsed = data.button.css('display') !== 'none';
    // Close menu if button is no longer visible (and not in designer)
    if (data.open && !collapsed && !designer) {
      close(data, true);
    }
    // Set max-width of links + dropdowns to match container
    if (data.container.length) {
      var updateEachMax = updateMax(data);
      data.links.each(updateEachMax);
      data.dropdowns.each(updateEachMax);
    }
    // If currently open, update height to match body
    if (data.open) {
      setOverlayHeight(data);
    }
  }

  var maxWidth = 'max-width';
  function updateMax(data) {
    // Set max-width of each element to match container
    var containMax = data.container.css(maxWidth);
    if (containMax === 'none') {
      containMax = '';
    }
    return function (i, link) {
      link = $(link);
      link.css(maxWidth, '');
      // Don't set the max-width if an upstream value exists
      if (link.css(maxWidth) === 'none') {
        link.css(maxWidth, containMax);
      }
    };
  }

  function open(data, immediate) {
    if (data.open) {
      return;
    }
    data.open = true;
    data.menu.addClass(menuOpen);
    data.links.addClass(linkOpen);
    data.button.addClass(buttonOpen);
    var config = data.config;
    var animation = config.animation;
    if (animation === 'none' || !tram.support.transform) {
      immediate = true;
    }
    var bodyHeight = setOverlayHeight(data);
    var menuHeight = data.menu.outerHeight(true);
    var menuWidth = data.menu.outerWidth(true);
    var navHeight = data.el.height();
    var navbarEl = data.el[0];
    resize(0, navbarEl);
    ix.intro(0, navbarEl);
    Webflow.redraw.up();

    // Listen for tap outside events
    if (!designer) {
      $doc.on('tap' + namespace, data.outside);
    }

    // No transition for immediate
    if (immediate) {
      return;
    }

    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing;

    // Add menu to overlay
    if (data.overlay) {
      menuSibling = data.menu.prev();
      data.overlay.show().append(data.menu);
    }

    // Over left/right
    if (config.animOver) {
      tram(data.menu).add(transConfig).set({ x: config.animDirect * menuWidth, height: bodyHeight }).start({ x: 0 });
      data.overlay && data.overlay.width(menuWidth);
      return;
    }

    // Drop Down
    var offsetY = navHeight + menuHeight;
    tram(data.menu).add(transConfig).set({ y: -offsetY }).start({ y: 0 });
  }

  function setOverlayHeight(data) {
    var config = data.config;
    var bodyHeight = config.docHeight ? $doc.height() : $body.height();
    if (config.animOver) {
      data.menu.height(bodyHeight);
    } else if (data.el.css('position') !== 'fixed') {
      bodyHeight -= data.el.height();
    }
    data.overlay && data.overlay.height(bodyHeight);
    return bodyHeight;
  }

  function close(data, immediate) {
    if (!data.open) {
      return;
    }
    data.open = false;
    data.button.removeClass(buttonOpen);
    var config = data.config;
    if (config.animation === 'none' || !tram.support.transform || config.duration <= 0) {
      immediate = true;
    }
    ix.outro(0, data.el[0]);

    // Stop listening for tap outside events
    $doc.off('tap' + namespace, data.outside);

    if (immediate) {
      tram(data.menu).stop();
      complete();
      return;
    }

    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing2;
    var menuHeight = data.menu.outerHeight(true);
    var menuWidth = data.menu.outerWidth(true);
    var navHeight = data.el.height();

    // Over left/right
    if (config.animOver) {
      tram(data.menu).add(transConfig).start({ x: menuWidth * config.animDirect }).then(complete);
      return;
    }

    // Drop Down
    var offsetY = navHeight + menuHeight;
    tram(data.menu).add(transConfig).start({ y: -offsetY }).then(complete);

    function complete() {
      data.menu.height('');
      tram(data.menu).set({ x: 0, y: 0 });
      data.menu.removeClass(menuOpen);
      data.links.removeClass(linkOpen);
      if (data.overlay && data.overlay.children().length) {
        // Move menu back to parent at the original location
        menuSibling.length ? data.menu.insertAfter(menuSibling) : data.menu.prependTo(data.parent);
        data.overlay.attr('style', '').hide();
      }

      // Trigger event so other components can hook in (dropdown)
      data.el.triggerHandler('w-close');
    }
  }

  // Export module
  return api;
});

/***/ })
/******/ ]);