'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

/*!
 *  znu-event v0.0.10
 *  (c) 2020-2020 chenwuai
 *  https://github.com/chenchenwuai/znu-event.git
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var ZnuEvent = (function () {
    function ZnuEvent() {
        this._listenersMap = {};
    }
    ZnuEvent.prototype.on = function (eventName, listener) {
        if (undefined === this._listenersMap[eventName]) {
            this._listenersMap[eventName] = [];
        }
        this._listenersMap[eventName].push(listener);
        return this;
    };
    ZnuEvent.prototype.once = function (eventName, listener) {
        listener.isOnce = true;
        this.on(eventName, listener);
        return this;
    };
    ZnuEvent.prototype.off = function (eventName, listener) {
        var listeners = this._listenersMap[eventName];
        if (undefined !== listeners) {
            if (undefined === listener) {
                delete this._listenersMap[eventName];
            }
            else {
                var index = listeners.findIndex(function (fn) { return fn === listener; });
                listeners.splice(index, 1);
            }
        }
        return this;
    };
    ZnuEvent.prototype.offAll = function () {
        this._listenersMap = {};
    };
    ZnuEvent.prototype.emit = function (eventName) {
        var e_1, _a;
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var listeners = this._listenersMap[eventName];
        if (undefined !== listeners && listeners.length > 0) {
            try {
                for (var _b = __values(listeners.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), index = _d[0], listener = _d[1];
                    if (listener.isOnce) {
                        var listenerClone = listener;
                        listeners.splice(index, 1);
                        listenerClone.apply(void 0, __spread(payload));
                    }
                    else {
                        listener.apply(void 0, __spread(payload));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
        else {
            return false;
        }
    };
    ZnuEvent.prototype.has = function (eventName) {
        return undefined !== this._listenersMap[eventName] && this._listenersMap[eventName].length > 0;
    };
    ZnuEvent.prototype.eventNames = function () {
        var eventNames = [];
        for (var eventName in this._listenersMap) {
            eventNames.push(eventName);
        }
        return eventNames;
    };
    ZnuEvent.prototype.destroy = function () {
        this.offAll();
    };
    return ZnuEvent;
}());

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;

var dayjs_min = {exports: {}};

(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
}(dayjs_min));

var dayjs = dayjs_min.exports;

const dateTime = (time, format = 'MM/DD HH:mm') => {
    return dayjs(time * 1000).format(format);
};
const getWeekStartDate = (timestamp = Math.floor(Date.now() / 1000)) => {
    const time = timestamp * 1000;
    const year = dayjs(time).year();
    const month = dayjs(time).month();
    const date = dayjs(time).date();
    const day = dayjs(time).day();
    const weekStartDate = new Date(year, month, date - day).getTime();
    return Math.floor(weekStartDate / 1000);
};

function drawHelper({ pointWidth, timePerPixel, timeSpacing, screenScaleCount, scaleSpacing, scaleHeight, startTime, drawLine, drawText, }) {
    if (timeSpacing === 1) {
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing + pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing);
            if (time % 10 === 0) {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm:ss')}`);
                continue;
            }
            if (time % 5 === 0) {
                drawLine(x, scaleHeight.height3);
                continue;
            }
            if (time % 1 === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 10) {
        const timeOffset = +dateTime(startTime, 's') % 10;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % 60 === 0) {
                drawLine(x, scaleHeight.height4);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % 10 === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 30) {
        const timeOffset = +dateTime(startTime, 's') % 30;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % (60 * 5) === 0) {
                drawLine(x, scaleHeight.height4);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % 30 === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 60) {
        const timeOffset = +dateTime(startTime, 's') % 60;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % (60 * 60) === 0) {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
                continue;
            }
            if (time % (60 * 5) === 0) {
                drawLine(x, scaleHeight.height3);
                if (time % (60 * 10) === 0) {
                    drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
                }
                continue;
            }
            if (time % 60 === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 120) {
        const timeArr = dateTime(startTime, 'm:s').split(':');
        const timestamp = +timeArr[0] * 60 + +timeArr[1];
        const timeOffset = timestamp % 120;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % (60 * 30) === 0) {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
                continue;
            }
            if (time % (60 * 10) === 0) {
                drawLine(x, scaleHeight.height3);
                continue;
            }
            if (time % (60 * 2) === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 300) {
        const timeArr = dateTime(startTime, 'm:s').split(':');
        const timestamp = +timeArr[0] * 60 + +timeArr[1];
        const timeOffset = timestamp % 300;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % (60 * 60) === 0) {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
                continue;
            }
            if (time % (60 * 30) === 0) {
                drawLine(x, scaleHeight.height3);
                continue;
            }
            if (time % (60 * 5) === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 7200) {
        const timeArr = dateTime(startTime, 'H:m:s').split(':');
        const timestamp = +timeArr[0] * 3600 + +timeArr[1] * 60 + +timeArr[2];
        const timeOffset = timestamp % 7200;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (time % (3600 * 24) === 0) {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'MM/DD HH:mm')}`);
                continue;
            }
            if (time % (3600 * 12) === 0) {
                drawLine(x, scaleHeight.height3);
                continue;
            }
            if (time % 7200 === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 86400) {
        const timeArr = dateTime(startTime, 'H:m:s').split(':');
        const timestamp = +timeArr[0] * 3600 + +timeArr[1] * 60 + +timeArr[2];
        const timeOffset = timestamp % 86400;
        const xOffset = timeOffset / timePerPixel;
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset - pointWidth / 2;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (dateTime(time, 'D') === '1') {
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'YYYY/MM/DD')}`);
                continue;
            }
            if (time % 86400 === 57600) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
    if (timeSpacing === 604800) {
        const timeOffset = startTime - getWeekStartDate(startTime);
        const xOffset = timeOffset / timePerPixel;
        const yearText = new Array(screenScaleCount).fill(false);
        const canDrawYearScale = (index) => {
            for (let i = index; i > index - 7; i--) {
                if (yearText[i]) {
                    return false;
                }
            }
            return true;
        };
        for (let i = 0; i < screenScaleCount; i++) {
            const x = i * scaleSpacing - xOffset;
            const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
            if (dayjs(time * 1000).month() === 0 && (dayjs(time * 1000).date() > 0 || dayjs(time * 1000).date() <= 31) && canDrawYearScale(i)) {
                yearText[i] = true;
                drawLine(x, scaleHeight.height5);
                drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'YYYY/MM/DD')}`);
                continue;
            }
            if (dayjs(time * 1000).day() === 0) {
                drawLine(x, scaleHeight.height1);
                continue;
            }
        }
        return;
    }
}

var _TimeLine_event, _TimeLine_timeSpacingMap, _TimeLine_timeSpacing, _TimeLine_scaleHeight, _TimeLine_isDraging;
const defaultOptions = {
    fill: false,
    bgColor: 'rgba(0,0,0,0.5)',
    textColor: '#ffffff',
    scaleColor: '#ffffff',
    areaBgColor: '#ffffff55',
    pointColor: '#00aeec',
    pointWidth: 3,
    scaleSpacing: 7,
    fps: 60,
    zoom: 2,
    maxZoom: 9,
    minZoom: 1,
};
class TimeLine {
    constructor(id, options) {
        _TimeLine_event.set(this, void 0);
        _TimeLine_timeSpacingMap.set(this, void 0);
        _TimeLine_timeSpacing.set(this, void 0);
        _TimeLine_scaleHeight.set(this, void 0);
        _TimeLine_isDraging.set(this, void 0);
        if (!id) {
            throw new Error('canvas id is required!');
        }
        this.$canvas = document.getElementById(id);
        this.canvasContext = this.$canvas.getContext('2d');
        const { fill, width, height, bgColor, textColor, scaleColor, areaBgColor, pointColor, pointWidth, scaleSpacing, fps, zoom, maxZoom, minZoom } = Object.assign(Object.assign({}, defaultOptions), options);
        if (zoom < 1 || zoom > 9 || zoom % 1 !== 0) {
            throw new Error('zoom must be 1 ~ 9, and must be an integer');
        }
        if (maxZoom < 1 || maxZoom > 9 || maxZoom % 1 !== 0) {
            throw new Error('maxZoom must be 1 ~ 9, and must be an integer');
        }
        if (minZoom < 1 || minZoom > 9 || minZoom % 1 !== 0) {
            throw new Error('minZoom must be 1 ~ 9, and must be an integer');
        }
        if (maxZoom < minZoom) {
            throw new Error('maxZoom must be greater than minZoom');
        }
        if (fill) {
            const $canvasParent = this.$canvas.parentElement;
            this.$canvas.width = $canvasParent.clientWidth;
            this.$canvas.height = $canvasParent.clientHeight;
            const parentResizeObserver = new ResizeObserver(lodash_throttle(this._onParentResize.bind(this), 200));
            parentResizeObserver.observe($canvasParent);
        }
        else {
            if (width)
                this.$canvas.width = width;
            if (height)
                this.$canvas.height = height;
        }
        __classPrivateFieldSet(this, _TimeLine_isDraging, false, "f");
        __classPrivateFieldSet(this, _TimeLine_event, new ZnuEvent(), "f");
        this.currentTime = 0;
        const timeSpacingMap = [1, 10, 30, 60, 120, 300, 7200, 86400, 604800];
        __classPrivateFieldSet(this, _TimeLine_timeSpacingMap, [], "f");
        for (let i = minZoom - 1; i < maxZoom; i++) {
            __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f").push(timeSpacingMap[i]);
        }
        __classPrivateFieldSet(this, _TimeLine_timeSpacing, __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f")[zoom - 1], "f");
        this.scaleSpacing = scaleSpacing;
        __classPrivateFieldSet(this, _TimeLine_scaleHeight, {
            height6: this.$canvas.height / 2,
            height5: this.$canvas.height / 3,
            height4: this.$canvas.height / 4,
            height3: this.$canvas.height / 5,
            height2: this.$canvas.height / 8,
            height1: this.$canvas.height / 10,
        }, "f");
        this.bgColor = bgColor;
        this.pointWidth = pointWidth;
        this.pointColor = pointColor;
        this.textColor = textColor;
        this.scaleColor = scaleColor;
        this.areaBgColor = areaBgColor;
        this.fps = fps;
    }
    draw({ currentTime = 0, areas, _privateFlag } = {}) {
        if (__classPrivateFieldGet(this, _TimeLine_isDraging, "f") && !_privateFlag) {
            return;
        }
        this.currentTime = currentTime || Math.floor(Date.now() / 1000);
        this.areas = areas || [];
        const screenScaleCount = Math.ceil(this.$canvas.width / this.scaleSpacing);
        const screenSecondCount = screenScaleCount * __classPrivateFieldGet(this, _TimeLine_timeSpacing, "f");
        const startTime = this.currentTime - screenSecondCount / 2;
        const endTime = this.currentTime + screenSecondCount / 2;
        const xCenterPoint = this.$canvas.width / 2;
        const timePerPixel = screenSecondCount / this.$canvas.width;
        this.clear();
        this.drawArea(0, 0, this.$canvas.width, this.$canvas.height, this.bgColor);
        this.areas.forEach(item => {
            const startX = item.startTime < startTime ? 0 : Math.floor((item.startTime - startTime) / timePerPixel);
            const endX = item.endTime > endTime ? this.$canvas.width : Math.floor((item.endTime - startTime) / timePerPixel);
            this.drawArea(startX, 0, endX, this.$canvas.height, item.bgColor || this.areaBgColor);
        });
        drawHelper.bind(this)({
            pointWidth: this.pointWidth,
            timePerPixel,
            scaleHeight: __classPrivateFieldGet(this, _TimeLine_scaleHeight, "f"),
            scaleSpacing: this.scaleSpacing,
            timeSpacing: __classPrivateFieldGet(this, _TimeLine_timeSpacing, "f"),
            screenScaleCount,
            startTime,
            drawLine: this.drawLine.bind(this),
            drawText: this.drawText.bind(this),
        });
        this.drawTimelineScale(__classPrivateFieldGet(this, _TimeLine_timeSpacing, "f"));
        this.drawLine(xCenterPoint - this.pointWidth / 2, this.$canvas.height, this.pointWidth, this.pointColor);
        this.drawArea(xCenterPoint - 54, 4, xCenterPoint + 54, 18, this.pointColor);
        this.drawText(xCenterPoint, 6, `${dateTime(this.currentTime, 'YYYY/MM/DD HH:mm:ss')}`, this.textColor, 'center', 'top');
        this.$canvas.onwheel = this._onZoom.bind(this);
        this.$canvas.onmousedown = this._onDrag.bind(this);
    }
    _onDrag({ clientX }) {
        __classPrivateFieldSet(this, _TimeLine_isDraging, true, "f");
        let prexOffset = 0;
        document.onmousemove = lodash_throttle((moveEvent) => {
            const curxOffset = moveEvent.clientX - clientX;
            const currentTime = this.currentTime - __classPrivateFieldGet(this, _TimeLine_timeSpacing, "f") / this.scaleSpacing * (curxOffset - prexOffset);
            prexOffset = curxOffset;
            this.draw({
                currentTime: Math.round(currentTime),
                areas: this.areas,
                _privateFlag: true,
            });
        }, __classPrivateFieldGet(this, _TimeLine_timeSpacing, "f") === 1 ? 100 : 1000 / this.fps);
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            __classPrivateFieldSet(this, _TimeLine_isDraging, false, "f");
            this.emit('timeUpdate', this.currentTime);
        };
    }
    _onZoom(e) {
        e.preventDefault();
        const currentIndex = __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f").findIndex(item => item === __classPrivateFieldGet(this, _TimeLine_timeSpacing, "f"));
        if (e.deltaY < 0 && currentIndex > 0) {
            __classPrivateFieldSet(this, _TimeLine_timeSpacing, __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f")[currentIndex - 1], "f");
            this.draw({
                currentTime: this.currentTime,
                areas: this.areas,
                _privateFlag: true,
            });
        }
        else if (e.deltaY > 0 && currentIndex < __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f").length - 1) {
            __classPrivateFieldSet(this, _TimeLine_timeSpacing, __classPrivateFieldGet(this, _TimeLine_timeSpacingMap, "f")[currentIndex + 1], "f");
            this.draw({
                currentTime: this.currentTime,
                areas: this.areas,
                _privateFlag: true,
            });
        }
    }
    _onParentResize() {
        const $canvasParent = this.$canvas.parentNode;
        if (!$canvasParent) {
            return;
        }
        this.$canvas.width = $canvasParent.clientWidth;
        this.$canvas.height = $canvasParent.clientHeight;
        __classPrivateFieldSet(this, _TimeLine_scaleHeight, {
            height6: this.$canvas.height / 2,
            height5: this.$canvas.height / 3,
            height4: this.$canvas.height / 4,
            height3: this.$canvas.height / 5,
            height2: this.$canvas.height / 8,
            height1: this.$canvas.height / 10,
        }, "f");
        this.draw({
            currentTime: this.currentTime,
            areas: this.areas,
        });
    }
    clear() {
        if (this.canvasContext) {
            this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        }
        if (this.$canvas) {
            this.$canvas.onwheel = null;
            this.$canvas.onmousedown = null;
        }
    }
    drawTimelineScale(timespacing) {
        let text = '';
        switch (timespacing) {
            case 1:
                text = '1s';
                break;
            case 10:
                text = '10s';
                break;
            case 30:
                text = '30s';
                break;
            case 60:
                text = '1min';
                break;
            case 120:
                text = '2min';
                break;
            case 300:
                text = '5min';
                break;
            case 7200:
                text = '2hour';
                break;
            case 86400:
                text = '1day';
                break;
            case 604800:
                text = '1week';
                break;
        }
        this.drawText(this.scaleSpacing + 12, 9, `${text}`, this.textColor, 'left', 'middle');
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(5, 6);
        this.canvasContext.lineTo(5, 10);
        this.canvasContext.lineTo(this.scaleSpacing + 7, 10);
        this.canvasContext.lineTo(this.scaleSpacing + 7, 6);
        this.canvasContext.strokeStyle = this.scaleColor;
        this.canvasContext.lineWidth = 1.5;
        this.canvasContext.stroke();
    }
    drawLine(x, y, width = 1, color = this.scaleColor) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x, this.$canvas.height);
        this.canvasContext.lineTo(x, this.$canvas.height - y);
        this.canvasContext.closePath();
        this.canvasContext.strokeStyle = color;
        this.canvasContext.lineWidth = width;
        this.canvasContext.stroke();
    }
    drawText(x, y, text, color = this.textColor, align = 'center', baseLine = 'alphabetic') {
        this.canvasContext.beginPath();
        this.canvasContext.font = '11px Arial';
        this.canvasContext.fillStyle = color;
        this.canvasContext.textAlign = align;
        this.canvasContext.textBaseline = baseLine;
        this.canvasContext.fillText(text, x, y);
    }
    drawArea(startX, startY, endX, endY, bgColor) {
        this.canvasContext.beginPath();
        this.canvasContext.rect(startX, startY, endX - startX, endY - startY);
        this.canvasContext.fillStyle = bgColor;
        this.canvasContext.fill();
    }
    on(name, listener) {
        __classPrivateFieldGet(this, _TimeLine_event, "f").on(name, listener);
    }
    off(name, listener) {
        __classPrivateFieldGet(this, _TimeLine_event, "f").off(name, listener);
    }
    emit(...args) {
        __classPrivateFieldGet(this, _TimeLine_event, "f").emit(...args);
    }
}
_TimeLine_event = new WeakMap(), _TimeLine_timeSpacingMap = new WeakMap(), _TimeLine_timeSpacing = new WeakMap(), _TimeLine_scaleHeight = new WeakMap(), _TimeLine_isDraging = new WeakMap();

module.exports = TimeLine;
