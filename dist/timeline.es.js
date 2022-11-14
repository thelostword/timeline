var $t = Object.defineProperty;
var vt = (n, e, t) => e in n ? $t(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var j = (n, e, t) => (vt(n, typeof e != "symbol" ? e + "" : e, t), t), ct = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
};
var k = (n, e, t) => (ct(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Q = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, z = (n, e, t, a) => (ct(n, e, "write to private field"), a ? a.call(n, t) : e.set(n, t), t);
function gt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(e, t) {
    var a = n.get(e);
    a ? a.push(t) : n.set(e, [t]);
  }, off: function(e, t) {
    var a = n.get(e);
    a && (t ? a.splice(a.indexOf(t) >>> 0, 1) : n.set(e, []));
  }, emit: function(e, t) {
    var a = n.get(e);
    a && a.slice().map(function(l) {
      l(t);
    }), (a = n.get("*")) && a.slice().map(function(l) {
      l(e, t);
    });
  } };
}
var et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, dt = "Expected a function", ft = 0 / 0, pt = "[object Symbol]", xt = /^\s+|\s+$/g, Mt = /^[-+]0x[0-9a-f]+$/i, yt = /^0b[01]+$/i, bt = /^0o[0-7]+$/i, Ct = parseInt, Dt = typeof et == "object" && et && et.Object === Object && et, Ot = typeof self == "object" && self && self.Object === Object && self, wt = Dt || Ot || Function("return this")(), Tt = Object.prototype, St = Tt.toString, _t = Math.max, kt = Math.min, at = function() {
  return wt.Date.now();
};
function Yt(n, e, t) {
  var a, l, h, d, u, y, f = 0, b = !1, c = !1, M = !0;
  if (typeof n != "function")
    throw new TypeError(dt);
  e = ut(e) || 0, st(t) && (b = !!t.leading, c = "maxWait" in t, h = c ? _t(ut(t.maxWait) || 0, e) : h, M = "trailing" in t ? !!t.trailing : M);
  function o(D) {
    var E = a, B = l;
    return a = l = void 0, f = D, d = n.apply(B, E), d;
  }
  function g(D) {
    return f = D, u = setTimeout(F, e), b ? o(D) : d;
  }
  function x(D) {
    var E = D - y, B = D - f, T = e - E;
    return c ? kt(T, h - B) : T;
  }
  function I(D) {
    var E = D - y, B = D - f;
    return y === void 0 || E >= e || E < 0 || c && B >= h;
  }
  function F() {
    var D = at();
    if (I(D))
      return W(D);
    u = setTimeout(F, x(D));
  }
  function W(D) {
    return u = void 0, M && a ? o(D) : (a = l = void 0, d);
  }
  function H() {
    u !== void 0 && clearTimeout(u), f = 0, a = y = l = u = void 0;
  }
  function rt() {
    return u === void 0 ? d : W(at());
  }
  function N() {
    var D = at(), E = I(D);
    if (a = arguments, l = this, y = D, E) {
      if (u === void 0)
        return g(y);
      if (c)
        return u = setTimeout(F, e), o(y);
    }
    return u === void 0 && (u = setTimeout(F, e)), d;
  }
  return N.cancel = H, N.flush = rt, N;
}
function At(n, e, t) {
  var a = !0, l = !0;
  if (typeof n != "function")
    throw new TypeError(dt);
  return st(t) && (a = "leading" in t ? !!t.leading : a, l = "trailing" in t ? !!t.trailing : l), Yt(n, e, {
    leading: a,
    maxWait: e,
    trailing: l
  });
}
function st(n) {
  var e = typeof n;
  return !!n && (e == "object" || e == "function");
}
function jt(n) {
  return !!n && typeof n == "object";
}
function It(n) {
  return typeof n == "symbol" || jt(n) && St.call(n) == pt;
}
function ut(n) {
  if (typeof n == "number")
    return n;
  if (It(n))
    return ft;
  if (st(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = st(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = n.replace(xt, "");
  var t = yt.test(n);
  return t || bt.test(n) ? Ct(n.slice(2), t ? 2 : 8) : Mt.test(n) ? ft : +n;
}
var lt = At, mt = { exports: {} };
(function(n, e) {
  (function(t, a) {
    n.exports = a();
  })(et, function() {
    var t = 1e3, a = 6e4, l = 36e5, h = "millisecond", d = "second", u = "minute", y = "hour", f = "day", b = "week", c = "month", M = "quarter", o = "year", g = "date", x = "Invalid Date", I = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, F = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, W = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(m) {
      var r = ["th", "st", "nd", "rd"], i = m % 100;
      return "[" + m + (r[(i - 20) % 10] || r[i] || r[0]) + "]";
    } }, H = function(m, r, i) {
      var $ = String(m);
      return !$ || $.length >= r ? m : "" + Array(r + 1 - $.length).join(i) + m;
    }, rt = { s: H, z: function(m) {
      var r = -m.utcOffset(), i = Math.abs(r), $ = Math.floor(i / 60), s = i % 60;
      return (r <= 0 ? "+" : "-") + H($, 2, "0") + ":" + H(s, 2, "0");
    }, m: function m(r, i) {
      if (r.date() < i.date())
        return -m(i, r);
      var $ = 12 * (i.year() - r.year()) + (i.month() - r.month()), s = r.clone().add($, c), p = i - s < 0, v = r.clone().add($ + (p ? -1 : 1), c);
      return +(-($ + (i - s) / (p ? s - v : v - s)) || 0);
    }, a: function(m) {
      return m < 0 ? Math.ceil(m) || 0 : Math.floor(m);
    }, p: function(m) {
      return { M: c, y: o, w: b, d: f, D: g, h: y, m: u, s: d, ms: h, Q: M }[m] || String(m || "").toLowerCase().replace(/s$/, "");
    }, u: function(m) {
      return m === void 0;
    } }, N = "en", D = {};
    D[N] = W;
    var E = function(m) {
      return m instanceof nt;
    }, B = function m(r, i, $) {
      var s;
      if (!r)
        return N;
      if (typeof r == "string") {
        var p = r.toLowerCase();
        D[p] && (s = p), i && (D[p] = i, s = p);
        var v = r.split("-");
        if (!s && v.length > 1)
          return m(v[0]);
      } else {
        var C = r.name;
        D[C] = r, s = C;
      }
      return !$ && s && (N = s), s || !$ && N;
    }, T = function(m, r) {
      if (E(m))
        return m.clone();
      var i = typeof r == "object" ? r : {};
      return i.date = m, i.args = arguments, new nt(i);
    }, O = rt;
    O.l = B, O.i = E, O.w = function(m, r) {
      return T(m, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
    };
    var nt = function() {
      function m(i) {
        this.$L = B(i.locale, null, !0), this.parse(i);
      }
      var r = m.prototype;
      return r.parse = function(i) {
        this.$d = function($) {
          var s = $.date, p = $.utc;
          if (s === null)
            return new Date(NaN);
          if (O.u(s))
            return new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var v = s.match(I);
            if (v) {
              var C = v[2] - 1 || 0, S = (v[7] || "0").substring(0, 3);
              return p ? new Date(Date.UTC(v[1], C, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, S)) : new Date(v[1], C, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, S);
            }
          }
          return new Date(s);
        }(i), this.$x = i.x || {}, this.init();
      }, r.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, r.$utils = function() {
        return O;
      }, r.isValid = function() {
        return this.$d.toString() !== x;
      }, r.isSame = function(i, $) {
        var s = T(i);
        return this.startOf($) <= s && s <= this.endOf($);
      }, r.isAfter = function(i, $) {
        return T(i) < this.startOf($);
      }, r.isBefore = function(i, $) {
        return this.endOf($) < T(i);
      }, r.$g = function(i, $, s) {
        return O.u(i) ? this[$] : this.set(s, i);
      }, r.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, r.valueOf = function() {
        return this.$d.getTime();
      }, r.startOf = function(i, $) {
        var s = this, p = !!O.u($) || $, v = O.p(i), C = function(P, A) {
          var X = O.w(s.$u ? Date.UTC(s.$y, A, P) : new Date(s.$y, A, P), s);
          return p ? X : X.endOf(f);
        }, S = function(P, A) {
          return O.w(s.toDate()[P].apply(s.toDate("s"), (p ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(A)), s);
        }, w = this.$W, Y = this.$M, V = this.$D, R = "set" + (this.$u ? "UTC" : "");
        switch (v) {
          case o:
            return p ? C(1, 0) : C(31, 11);
          case c:
            return p ? C(1, Y) : C(0, Y + 1);
          case b:
            var L = this.$locale().weekStart || 0, tt = (w < L ? w + 7 : w) - L;
            return C(p ? V - tt : V + (6 - tt), Y);
          case f:
          case g:
            return S(R + "Hours", 0);
          case y:
            return S(R + "Minutes", 1);
          case u:
            return S(R + "Seconds", 2);
          case d:
            return S(R + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, r.endOf = function(i) {
        return this.startOf(i, !1);
      }, r.$set = function(i, $) {
        var s, p = O.p(i), v = "set" + (this.$u ? "UTC" : ""), C = (s = {}, s[f] = v + "Date", s[g] = v + "Date", s[c] = v + "Month", s[o] = v + "FullYear", s[y] = v + "Hours", s[u] = v + "Minutes", s[d] = v + "Seconds", s[h] = v + "Milliseconds", s)[p], S = p === f ? this.$D + ($ - this.$W) : $;
        if (p === c || p === o) {
          var w = this.clone().set(g, 1);
          w.$d[C](S), w.init(), this.$d = w.set(g, Math.min(this.$D, w.daysInMonth())).$d;
        } else
          C && this.$d[C](S);
        return this.init(), this;
      }, r.set = function(i, $) {
        return this.clone().$set(i, $);
      }, r.get = function(i) {
        return this[O.p(i)]();
      }, r.add = function(i, $) {
        var s, p = this;
        i = Number(i);
        var v = O.p($), C = function(Y) {
          var V = T(p);
          return O.w(V.date(V.date() + Math.round(Y * i)), p);
        };
        if (v === c)
          return this.set(c, this.$M + i);
        if (v === o)
          return this.set(o, this.$y + i);
        if (v === f)
          return C(1);
        if (v === b)
          return C(7);
        var S = (s = {}, s[u] = a, s[y] = l, s[d] = t, s)[v] || 1, w = this.$d.getTime() + i * S;
        return O.w(w, this);
      }, r.subtract = function(i, $) {
        return this.add(-1 * i, $);
      }, r.format = function(i) {
        var $ = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || x;
        var p = i || "YYYY-MM-DDTHH:mm:ssZ", v = O.z(this), C = this.$H, S = this.$m, w = this.$M, Y = s.weekdays, V = s.months, R = function(A, X, ot, it) {
          return A && (A[X] || A($, p)) || ot[X].slice(0, it);
        }, L = function(A) {
          return O.s(C % 12 || 12, A, "0");
        }, tt = s.meridiem || function(A, X, ot) {
          var it = A < 12 ? "AM" : "PM";
          return ot ? it.toLowerCase() : it;
        }, P = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: w + 1, MM: O.s(w + 1, 2, "0"), MMM: R(s.monthsShort, w, V, 3), MMMM: R(V, w), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: R(s.weekdaysMin, this.$W, Y, 2), ddd: R(s.weekdaysShort, this.$W, Y, 3), dddd: Y[this.$W], H: String(C), HH: O.s(C, 2, "0"), h: L(1), hh: L(2), a: tt(C, S, !0), A: tt(C, S, !1), m: String(S), mm: O.s(S, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: v };
        return p.replace(F, function(A, X) {
          return X || P[A] || v.replace(":", "");
        });
      }, r.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, r.diff = function(i, $, s) {
        var p, v = O.p($), C = T(i), S = (C.utcOffset() - this.utcOffset()) * a, w = this - C, Y = O.m(this, C);
        return Y = (p = {}, p[o] = Y / 12, p[c] = Y, p[M] = Y / 3, p[b] = (w - S) / 6048e5, p[f] = (w - S) / 864e5, p[y] = w / l, p[u] = w / a, p[d] = w / t, p)[v] || w, s ? Y : O.a(Y);
      }, r.daysInMonth = function() {
        return this.endOf(c).$D;
      }, r.$locale = function() {
        return D[this.$L];
      }, r.locale = function(i, $) {
        if (!i)
          return this.$L;
        var s = this.clone(), p = B(i, $, !0);
        return p && (s.$L = p), s;
      }, r.clone = function() {
        return O.w(this.$d, this);
      }, r.toDate = function() {
        return new Date(this.valueOf());
      }, r.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, r.toISOString = function() {
        return this.$d.toISOString();
      }, r.toString = function() {
        return this.$d.toUTCString();
      }, m;
    }(), ht = nt.prototype;
    return T.prototype = ht, [["$ms", h], ["$s", d], ["$m", u], ["$H", y], ["$W", f], ["$M", c], ["$y", o], ["$D", g]].forEach(function(m) {
      ht[m[1]] = function(r) {
        return this.$g(r, m[0], m[1]);
      };
    }), T.extend = function(m, r) {
      return m.$i || (m(r, nt, T), m.$i = !0), T;
    }, T.locale = B, T.isDayjs = E, T.unix = function(m) {
      return T(1e3 * m);
    }, T.en = D[N], T.Ls = D, T.p = {}, T;
  });
})(mt);
const J = mt.exports, _ = (n, e = "MM/DD HH:mm") => J(n * 1e3).format(e), Wt = (n = Math.floor(Date.now() / 1e3)) => {
  const e = n * 1e3, t = J(e).year(), a = J(e).month(), l = J(e).date(), h = J(e).day(), d = new Date(t, a, l - h).getTime();
  return Math.floor(d / 1e3);
};
function Et({
  pointWidth: n,
  timePerPixel: e,
  timeSpacing: t,
  screenScaleCount: a,
  scaleSpacing: l,
  scaleHeight: h,
  startTime: d,
  drawLine: u,
  drawText: y
}) {
  if (t === 1) {
    for (let f = 0; f < a; f++) {
      const b = f * l + n / 2, c = Math.ceil(d + f * t);
      if (c % 10 === 0) {
        u(b, h.height5), y(b, h.height5 + 13, `${_(c, "HH:mm:ss")}`);
        continue;
      }
      if (c % 5 === 0) {
        u(b, h.height3);
        continue;
      }
      if (c % 1 === 0) {
        u(b, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 10) {
    const f = +_(d, "s") % 10, b = f / e;
    for (let c = 0; c < a; c++) {
      const M = c * l - b - n / 2, o = Math.ceil(d + c * t - f);
      if (o % 60 === 0) {
        u(M, h.height4), y(M, h.height5 + 13, `${_(o, "HH:mm")}`);
        continue;
      }
      if (o % 10 === 0) {
        u(M, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 30) {
    const f = +_(d, "s") % 30, b = f / e;
    for (let c = 0; c < a; c++) {
      const M = c * l - b - n / 2, o = Math.ceil(d + c * t - f);
      if (o % (60 * 5) === 0) {
        u(M, h.height4), y(M, h.height5 + 13, `${_(o, "HH:mm")}`);
        continue;
      }
      if (o % 30 === 0) {
        u(M, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 60) {
    const f = +_(d, "s") % 60, b = f / e;
    for (let c = 0; c < a; c++) {
      const M = c * l - b - n / 2, o = Math.ceil(d + c * t - f);
      if (o % (60 * 60) === 0) {
        u(M, h.height5), y(M, h.height5 + 13, `${_(o)}`);
        continue;
      }
      if (o % (60 * 5) === 0) {
        u(M, h.height3), o % (60 * 10) === 0 && y(M, h.height5 + 13, `${_(o, "HH:mm")}`);
        continue;
      }
      if (o % 60 === 0) {
        u(M, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 120) {
    const f = _(d, "m:s").split(":"), c = (+f[0] * 60 + +f[1]) % 120, M = c / e;
    for (let o = 0; o < a; o++) {
      const g = o * l - M - n / 2, x = Math.ceil(d + o * t - c);
      if (x % (60 * 30) === 0) {
        u(g, h.height5), y(g, h.height5 + 13, `${_(x)}`);
        continue;
      }
      if (x % (60 * 10) === 0) {
        u(g, h.height3);
        continue;
      }
      if (x % (60 * 2) === 0) {
        u(g, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 300) {
    const f = _(d, "m:s").split(":"), c = (+f[0] * 60 + +f[1]) % 300, M = c / e;
    for (let o = 0; o < a; o++) {
      const g = o * l - M - n / 2, x = Math.ceil(d + o * t - c);
      if (x % (60 * 60) === 0) {
        u(g, h.height5), y(g, h.height5 + 13, `${_(x)}`);
        continue;
      }
      if (x % (60 * 30) === 0) {
        u(g, h.height3);
        continue;
      }
      if (x % (60 * 5) === 0) {
        u(g, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 7200) {
    const f = _(d, "H:m:s").split(":"), c = (+f[0] * 3600 + +f[1] * 60 + +f[2]) % 7200, M = c / e;
    for (let o = 0; o < a; o++) {
      const g = o * l - M - n / 2, x = Math.ceil(d + o * t - c);
      if (x % (3600 * 24) === 0) {
        u(g, h.height5), y(g, h.height5 + 13, `${_(x, "MM/DD HH:mm")}`);
        continue;
      }
      if (x % (3600 * 12) === 0) {
        u(g, h.height3);
        continue;
      }
      if (x % 7200 === 0) {
        u(g, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 86400) {
    const f = _(d, "H:m:s").split(":"), c = (+f[0] * 3600 + +f[1] * 60 + +f[2]) % 86400, M = c / e;
    for (let o = 0; o < a; o++) {
      const g = o * l - M - n / 2, x = Math.ceil(d + o * t - c);
      if (_(x, "D") === "1") {
        u(g, h.height5), y(g, h.height5 + 13, `${_(x, "YYYY/MM/DD")}`);
        continue;
      }
      if (x % 86400 === 57600) {
        u(g, h.height1);
        continue;
      }
    }
    return;
  }
  if (t === 604800) {
    const f = d - Wt(d), b = f / e, c = new Array(a).fill(!1), M = (o) => {
      for (let g = o; g > o - 7; g--)
        if (c[g])
          return !1;
      return !0;
    };
    for (let o = 0; o < a; o++) {
      const g = o * l - b, x = Math.ceil(d + o * t - f);
      if (J(x * 1e3).month() === 0 && (J(x * 1e3).date() > 0 || J(x * 1e3).date() <= 31) && M(o)) {
        c[o] = !0, u(g, h.height5), y(g, h.height5 + 13, `${_(x, "YYYY/MM/DD")}`);
        continue;
      }
      if (J(x * 1e3).day() === 0) {
        u(g, h.height1);
        continue;
      }
    }
    return;
  }
}
const Zt = {
  fill: !1,
  bgColor: "rgba(0,0,0,0.5)",
  textColor: "#ffffff",
  scaleColor: "#ffffff",
  areaBgColor: "#ffffff55",
  pointColor: "#00aeec",
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 60,
  zoom: 2,
  maxZoom: 9,
  minZoom: 1
};
var q, U, Z, K, G;
class Bt {
  constructor(e, t) {
    j(this, "$canvas");
    j(this, "canvasContext");
    Q(this, q, void 0);
    j(this, "currentTime");
    j(this, "areas");
    Q(this, U, void 0);
    Q(this, Z, void 0);
    j(this, "scaleSpacing");
    j(this, "bgColor");
    Q(this, K, void 0);
    j(this, "pointWidth");
    j(this, "pointColor");
    j(this, "textColor");
    j(this, "scaleColor");
    j(this, "areaBgColor");
    Q(this, G, void 0);
    j(this, "fps");
    if (!e)
      throw new Error("canvas id is required!");
    this.$canvas = document.getElementById(e), this.canvasContext = this.$canvas.getContext("2d");
    const { fill: a, width: l, height: h, bgColor: d, textColor: u, scaleColor: y, areaBgColor: f, pointColor: b, pointWidth: c, scaleSpacing: M, fps: o, zoom: g, maxZoom: x, minZoom: I } = { ...Zt, ...t };
    if (g < I || g > x || g % 1 !== 0)
      throw new Error(`zoom must be minZoom ~ maxZoom(${I} ~1 ${x}), and must be an integer`);
    if (x < 1 || x > 9 || x % 1 !== 0)
      throw new Error("maxZoom must be 1 ~ 9, and must be an integer");
    if (I < 1 || I > 9 || I % 1 !== 0)
      throw new Error("minZoom must be 1 ~ 9, and must be an integer");
    if (x < I)
      throw new Error("maxZoom must be greater than minZoom");
    if (a) {
      const W = this.$canvas.parentElement;
      this.$canvas.width = W.clientWidth, this.$canvas.height = W.clientHeight, new ResizeObserver(lt(this._onParentResize.bind(this), 200)).observe(W);
    } else
      l && (this.$canvas.width = l), h && (this.$canvas.height = h);
    z(this, G, !1), z(this, q, gt()), this.currentTime = 0;
    const F = [1, 10, 30, 60, 120, 300, 7200, 86400, 604800];
    z(this, U, []);
    for (let W = I - 1; W < x; W++)
      k(this, U).push(F[W]);
    z(this, Z, F[g - 1]), this.scaleSpacing = M, z(this, K, {
      height6: this.$canvas.height / 2,
      height5: this.$canvas.height / 3,
      height4: this.$canvas.height / 4,
      height3: this.$canvas.height / 5,
      height2: this.$canvas.height / 8,
      height1: this.$canvas.height / 10
    }), this.bgColor = d, this.pointWidth = c, this.pointColor = b, this.textColor = u, this.scaleColor = y, this.areaBgColor = f, this.fps = o;
  }
  draw({ currentTime: e, areas: t, _privateFlag: a } = {}) {
    if (k(this, G) && !a)
      return;
    this.currentTime = e || Math.floor(Date.now() / 1e3), this.areas = t || [];
    const l = Math.ceil(this.$canvas.width / this.scaleSpacing), h = l * k(this, Z), d = this.currentTime - h / 2, u = this.currentTime + h / 2, y = this.$canvas.width / 2, f = h / this.$canvas.width;
    this.clear(), this.drawArea(0, 0, this.$canvas.width, this.$canvas.height, this.bgColor), this.areas.forEach((b) => {
      const c = b.startTime < d ? 0 : Math.floor((b.startTime - d) / f), M = b.endTime > u ? this.$canvas.width : Math.floor((b.endTime - d) / f);
      this.drawArea(c, 0, M, this.$canvas.height, b.bgColor || this.areaBgColor);
    }), Et.bind(this)({
      pointWidth: this.pointWidth,
      timePerPixel: f,
      scaleHeight: k(this, K),
      scaleSpacing: this.scaleSpacing,
      timeSpacing: k(this, Z),
      screenScaleCount: l,
      startTime: d,
      drawLine: this.drawLine.bind(this),
      drawText: this.drawText.bind(this)
    }), this.drawTimelineScale(k(this, Z)), this.drawLine(y - this.pointWidth / 2, this.$canvas.height, this.pointWidth, this.pointColor), this.drawArea(y - 54, 4, y + 54, 18, this.pointColor), this.drawText(y, 6, `${_(this.currentTime, "YYYY/MM/DD HH:mm:ss")}`, this.textColor, "center", "top"), this.$canvas.onwheel = this._onZoom.bind(this), this.$canvas.onmousedown = this._onDrag.bind(this);
  }
  _onDrag({ clientX: e }) {
    z(this, G, !0);
    let t = 0;
    document.onmousemove = lt((a) => {
      const l = a.clientX - e, h = this.currentTime - k(this, Z) / this.scaleSpacing * (l - t);
      t = l, this.draw({
        currentTime: Math.round(h),
        areas: this.areas,
        _privateFlag: !0
      });
    }, k(this, Z) === 1 ? 100 : 1e3 / this.fps), document.onmouseup = () => {
      document.onmousemove = null, document.onmouseup = null, z(this, G, !1), this.emit("timeUpdate", this.currentTime);
    };
  }
  _onZoom(e) {
    e.preventDefault();
    const t = k(this, U).findIndex((a) => a === k(this, Z));
    e.deltaY < 0 && t > 0 ? (z(this, Z, k(this, U)[t - 1]), this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
      _privateFlag: !0
    })) : e.deltaY > 0 && t < k(this, U).length - 1 && (z(this, Z, k(this, U)[t + 1]), this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
      _privateFlag: !0
    }));
  }
  _onParentResize() {
    const e = this.$canvas.parentNode;
    !e || (this.$canvas.width = e.clientWidth, this.$canvas.height = e.clientHeight, z(this, K, {
      height6: this.$canvas.height / 2,
      height5: this.$canvas.height / 3,
      height4: this.$canvas.height / 4,
      height3: this.$canvas.height / 5,
      height2: this.$canvas.height / 8,
      height1: this.$canvas.height / 10
    }), this.draw({
      currentTime: this.currentTime,
      areas: this.areas
    }));
  }
  clear() {
    this.canvasContext && this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height), this.$canvas && (this.$canvas.onwheel = null, this.$canvas.onmousedown = null);
  }
  drawTimelineScale(e) {
    let t = "";
    switch (e) {
      case 1:
        t = "1s";
        break;
      case 10:
        t = "10s";
        break;
      case 30:
        t = "30s";
        break;
      case 60:
        t = "1min";
        break;
      case 120:
        t = "2min";
        break;
      case 300:
        t = "5min";
        break;
      case 7200:
        t = "2hour";
        break;
      case 86400:
        t = "1day";
        break;
      case 604800:
        t = "1week";
        break;
    }
    this.drawText(this.scaleSpacing + 12, 9, `${t}`, this.textColor, "left", "middle"), this.canvasContext.beginPath(), this.canvasContext.moveTo(5, 6), this.canvasContext.lineTo(5, 10), this.canvasContext.lineTo(this.scaleSpacing + 7, 10), this.canvasContext.lineTo(this.scaleSpacing + 7, 6), this.canvasContext.strokeStyle = this.scaleColor, this.canvasContext.lineWidth = 1.5, this.canvasContext.stroke();
  }
  drawLine(e, t, a = 1, l = this.scaleColor) {
    this.canvasContext.beginPath(), this.canvasContext.moveTo(e, this.$canvas.height), this.canvasContext.lineTo(e, this.$canvas.height - t), this.canvasContext.closePath(), this.canvasContext.strokeStyle = l, this.canvasContext.lineWidth = a, this.canvasContext.stroke();
  }
  drawText(e, t, a, l = this.textColor, h = "center", d = "alphabetic") {
    this.canvasContext.beginPath(), this.canvasContext.font = "11px Arial", this.canvasContext.fillStyle = l, this.canvasContext.textAlign = h, this.canvasContext.textBaseline = d, this.canvasContext.fillText(a, e, t);
  }
  drawArea(e, t, a, l, h) {
    this.canvasContext.beginPath(), this.canvasContext.rect(e, t, a - e, l - t), this.canvasContext.fillStyle = h, this.canvasContext.fill();
  }
  on(e, t) {
    k(this, q).on(e, t);
  }
  off(e, t) {
    k(this, q).off(e, t);
  }
  emit(...e) {
    k(this, q).emit(...e);
  }
}
q = new WeakMap(), U = new WeakMap(), Z = new WeakMap(), K = new WeakMap(), G = new WeakMap();
export {
  Bt as default
};
