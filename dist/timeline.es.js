var At = Object.defineProperty;
var Zt = (h, t, e) => t in h ? At(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var ht = (h, t, e) => (Zt(h, typeof t != "symbol" ? t + "" : t, e), e), yt = (h, t, e) => {
  if (!t.has(h))
    throw TypeError("Cannot " + e);
};
var o = (h, t, e) => (yt(h, t, "read from private field"), e ? e.call(h) : t.get(h)), L = (h, t, e) => {
  if (t.has(h))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(h) : t.set(h, e);
}, z = (h, t, e, n) => (yt(h, t, "write to private field"), n ? n.call(h, e) : t.set(h, e), e);
var j = (h, t, e) => (yt(h, t, "access private method"), e);
function jt(h) {
  return { all: h = h || /* @__PURE__ */ new Map(), on: function(t, e) {
    var n = h.get(t);
    n ? n.push(e) : h.set(t, [e]);
  }, off: function(t, e) {
    var n = h.get(t);
    n && (e ? n.splice(n.indexOf(e) >>> 0, 1) : h.set(t, []));
  }, emit: function(t, e) {
    var n = h.get(t);
    n && n.slice().map(function(l) {
      l(e);
    }), (n = h.get("*")) && n.slice().map(function(l) {
      l(t, e);
    });
  } };
}
var wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bt(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Ft = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(wt, function() {
    var e = 1e3, n = 6e4, l = 36e5, p = "millisecond", m = "second", d = "minute", u = "hour", b = "day", S = "week", M = "month", D = "quarter", T = "year", y = "date", a = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, E = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(f) {
      var r = ["th", "st", "nd", "rd"], i = f % 100;
      return "[" + f + (r[(i - 20) % 10] || r[i] || r[0]) + "]";
    } }, O = function(f, r, i) {
      var c = String(f);
      return !c || c.length >= r ? f : "" + Array(r + 1 - c.length).join(i) + f;
    }, X = { s: O, z: function(f) {
      var r = -f.utcOffset(), i = Math.abs(r), c = Math.floor(i / 60), s = i % 60;
      return (r <= 0 ? "+" : "-") + O(c, 2, "0") + ":" + O(s, 2, "0");
    }, m: function f(r, i) {
      if (r.date() < i.date())
        return -f(i, r);
      var c = 12 * (i.year() - r.year()) + (i.month() - r.month()), s = r.clone().add(c, M), $ = i - s < 0, g = r.clone().add(c + ($ ? -1 : 1), M);
      return +(-(c + (i - s) / ($ ? s - g : g - s)) || 0);
    }, a: function(f) {
      return f < 0 ? Math.ceil(f) || 0 : Math.floor(f);
    }, p: function(f) {
      return { M, y: T, w: S, d: b, D: y, h: u, m: d, s: m, ms: p, Q: D }[f] || String(f || "").toLowerCase().replace(/s$/, "");
    }, u: function(f) {
      return f === void 0;
    } }, C = "en", W = {};
    W[C] = Y;
    var k = "$isDayjsObject", R = function(f) {
      return f instanceof lt || !(!f || !f[k]);
    }, Z = function f(r, i, c) {
      var s;
      if (!r)
        return C;
      if (typeof r == "string") {
        var $ = r.toLowerCase();
        W[$] && (s = $), i && (W[$] = i, s = $);
        var g = r.split("-");
        if (!s && g.length > 1)
          return f(g[0]);
      } else {
        var w = r.name;
        W[w] = r, s = w;
      }
      return !c && s && (C = s), s || !c && C;
    }, H = function(f, r) {
      if (R(f))
        return f.clone();
      var i = typeof r == "object" ? r : {};
      return i.date = f, i.args = arguments, new lt(i);
    }, v = X;
    v.l = Z, v.i = R, v.w = function(f, r) {
      return H(f, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
    };
    var lt = function() {
      function f(i) {
        this.$L = Z(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[k] = !0;
      }
      var r = f.prototype;
      return r.parse = function(i) {
        this.$d = function(c) {
          var s = c.date, $ = c.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (v.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var g = s.match(x);
            if (g) {
              var w = g[2] - 1 || 0, _ = (g[7] || "0").substring(0, 3);
              return $ ? new Date(Date.UTC(g[1], w, g[3] || 1, g[4] || 0, g[5] || 0, g[6] || 0, _)) : new Date(g[1], w, g[3] || 1, g[4] || 0, g[5] || 0, g[6] || 0, _);
            }
          }
          return new Date(s);
        }(i), this.init();
      }, r.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, r.$utils = function() {
        return v;
      }, r.isValid = function() {
        return this.$d.toString() !== a;
      }, r.isSame = function(i, c) {
        var s = H(i);
        return this.startOf(c) <= s && s <= this.endOf(c);
      }, r.isAfter = function(i, c) {
        return H(i) < this.startOf(c);
      }, r.isBefore = function(i, c) {
        return this.endOf(c) < H(i);
      }, r.$g = function(i, c, s) {
        return v.u(i) ? this[c] : this.set(s, i);
      }, r.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, r.valueOf = function() {
        return this.$d.getTime();
      }, r.startOf = function(i, c) {
        var s = this, $ = !!v.u(c) || c, g = v.p(i), w = function(tt, A) {
          var V = v.w(s.$u ? Date.UTC(s.$y, A, tt) : new Date(s.$y, A, tt), s);
          return $ ? V : V.endOf(b);
        }, _ = function(tt, A) {
          return v.w(s.toDate()[tt].apply(s.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(A)), s);
        }, P = this.$W, I = this.$M, N = this.$D, st = "set" + (this.$u ? "UTC" : "");
        switch (g) {
          case T:
            return $ ? w(1, 0) : w(31, 11);
          case M:
            return $ ? w(1, I) : w(0, I + 1);
          case S:
            var K = this.$locale().weekStart || 0, at = (P < K ? P + 7 : P) - K;
            return w($ ? N - at : N + (6 - at), I);
          case b:
          case y:
            return _(st + "Hours", 0);
          case u:
            return _(st + "Minutes", 1);
          case d:
            return _(st + "Seconds", 2);
          case m:
            return _(st + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, r.endOf = function(i) {
        return this.startOf(i, !1);
      }, r.$set = function(i, c) {
        var s, $ = v.p(i), g = "set" + (this.$u ? "UTC" : ""), w = (s = {}, s[b] = g + "Date", s[y] = g + "Date", s[M] = g + "Month", s[T] = g + "FullYear", s[u] = g + "Hours", s[d] = g + "Minutes", s[m] = g + "Seconds", s[p] = g + "Milliseconds", s)[$], _ = $ === b ? this.$D + (c - this.$W) : c;
        if ($ === M || $ === T) {
          var P = this.clone().set(y, 1);
          P.$d[w](_), P.init(), this.$d = P.set(y, Math.min(this.$D, P.daysInMonth())).$d;
        } else
          w && this.$d[w](_);
        return this.init(), this;
      }, r.set = function(i, c) {
        return this.clone().$set(i, c);
      }, r.get = function(i) {
        return this[v.p(i)]();
      }, r.add = function(i, c) {
        var s, $ = this;
        i = Number(i);
        var g = v.p(c), w = function(I) {
          var N = H($);
          return v.w(N.date(N.date() + Math.round(I * i)), $);
        };
        if (g === M)
          return this.set(M, this.$M + i);
        if (g === T)
          return this.set(T, this.$y + i);
        if (g === b)
          return w(1);
        if (g === S)
          return w(7);
        var _ = (s = {}, s[d] = n, s[u] = l, s[m] = e, s)[g] || 1, P = this.$d.getTime() + i * _;
        return v.w(P, this);
      }, r.subtract = function(i, c) {
        return this.add(-1 * i, c);
      }, r.format = function(i) {
        var c = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || a;
        var $ = i || "YYYY-MM-DDTHH:mm:ssZ", g = v.z(this), w = this.$H, _ = this.$m, P = this.$M, I = s.weekdays, N = s.months, st = s.meridiem, K = function(A, V, ot, mt) {
          return A && (A[V] || A(c, $)) || ot[V].slice(0, mt);
        }, at = function(A) {
          return v.s(w % 12 || 12, A, "0");
        }, tt = st || function(A, V, ot) {
          var mt = A < 12 ? "AM" : "PM";
          return ot ? mt.toLowerCase() : mt;
        };
        return $.replace(E, function(A, V) {
          return V || function(ot) {
            switch (ot) {
              case "YY":
                return String(c.$y).slice(-2);
              case "YYYY":
                return v.s(c.$y, 4, "0");
              case "M":
                return P + 1;
              case "MM":
                return v.s(P + 1, 2, "0");
              case "MMM":
                return K(s.monthsShort, P, N, 3);
              case "MMMM":
                return K(N, P);
              case "D":
                return c.$D;
              case "DD":
                return v.s(c.$D, 2, "0");
              case "d":
                return String(c.$W);
              case "dd":
                return K(s.weekdaysMin, c.$W, I, 2);
              case "ddd":
                return K(s.weekdaysShort, c.$W, I, 3);
              case "dddd":
                return I[c.$W];
              case "H":
                return String(w);
              case "HH":
                return v.s(w, 2, "0");
              case "h":
                return at(1);
              case "hh":
                return at(2);
              case "a":
                return tt(w, _, !0);
              case "A":
                return tt(w, _, !1);
              case "m":
                return String(_);
              case "mm":
                return v.s(_, 2, "0");
              case "s":
                return String(c.$s);
              case "ss":
                return v.s(c.$s, 2, "0");
              case "SSS":
                return v.s(c.$ms, 3, "0");
              case "Z":
                return g;
            }
            return null;
          }(A) || g.replace(":", "");
        });
      }, r.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, r.diff = function(i, c, s) {
        var $, g = this, w = v.p(c), _ = H(i), P = (_.utcOffset() - this.utcOffset()) * n, I = this - _, N = function() {
          return v.m(g, _);
        };
        switch (w) {
          case T:
            $ = N() / 12;
            break;
          case M:
            $ = N();
            break;
          case D:
            $ = N() / 3;
            break;
          case S:
            $ = (I - P) / 6048e5;
            break;
          case b:
            $ = (I - P) / 864e5;
            break;
          case u:
            $ = I / l;
            break;
          case d:
            $ = I / n;
            break;
          case m:
            $ = I / e;
            break;
          default:
            $ = I;
        }
        return s ? $ : v.a($);
      }, r.daysInMonth = function() {
        return this.endOf(M).$D;
      }, r.$locale = function() {
        return W[this.$L];
      }, r.locale = function(i, c) {
        if (!i)
          return this.$L;
        var s = this.clone(), $ = Z(i, c, !0);
        return $ && (s.$L = $), s;
      }, r.clone = function() {
        return v.w(this.$d, this);
      }, r.toDate = function() {
        return new Date(this.valueOf());
      }, r.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, r.toISOString = function() {
        return this.$d.toISOString();
      }, r.toString = function() {
        return this.$d.toUTCString();
      }, f;
    }(), Ct = lt.prototype;
    return H.prototype = Ct, [["$ms", p], ["$s", m], ["$m", d], ["$H", u], ["$W", b], ["$M", M], ["$y", T], ["$D", y]].forEach(function(f) {
      Ct[f[1]] = function(r) {
        return this.$g(r, f[0], f[1]);
      };
    }), H.extend = function(f, r) {
      return f.$i || (f(r, lt, H), f.$i = !0), H;
    }, H.locale = Z, H.isDayjs = R, H.unix = function(f) {
      return H(1e3 * f);
    }, H.en = W[C], H.Ls = W, H.p = {}, H;
  });
})(Ft);
var Nt = Ft.exports;
const Ot = /* @__PURE__ */ bt(Nt);
var Lt = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(wt, function() {
    var e = "minute", n = /[+-]\d\d(?::?\d\d)?/g, l = /([+-]|\d\d)/g;
    return function(p, m, d) {
      var u = m.prototype;
      d.utc = function(a) {
        var x = { date: a, utc: !0, args: arguments };
        return new m(x);
      }, u.utc = function(a) {
        var x = d(this.toDate(), { locale: this.$L, utc: !0 });
        return a ? x.add(this.utcOffset(), e) : x;
      }, u.local = function() {
        return d(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var b = u.parse;
      u.parse = function(a) {
        a.utc && (this.$u = !0), this.$utils().u(a.$offset) || (this.$offset = a.$offset), b.call(this, a);
      };
      var S = u.init;
      u.init = function() {
        if (this.$u) {
          var a = this.$d;
          this.$y = a.getUTCFullYear(), this.$M = a.getUTCMonth(), this.$D = a.getUTCDate(), this.$W = a.getUTCDay(), this.$H = a.getUTCHours(), this.$m = a.getUTCMinutes(), this.$s = a.getUTCSeconds(), this.$ms = a.getUTCMilliseconds();
        } else
          S.call(this);
      };
      var M = u.utcOffset;
      u.utcOffset = function(a, x) {
        var E = this.$utils().u;
        if (E(a))
          return this.$u ? 0 : E(this.$offset) ? M.call(this) : this.$offset;
        if (typeof a == "string" && (a = function(C) {
          C === void 0 && (C = "");
          var W = C.match(n);
          if (!W)
            return null;
          var k = ("" + W[0]).match(l) || ["-", 0, 0], R = k[0], Z = 60 * +k[1] + +k[2];
          return Z === 0 ? 0 : R === "+" ? Z : -Z;
        }(a), a === null))
          return this;
        var Y = Math.abs(a) <= 16 ? 60 * a : a, O = this;
        if (x)
          return O.$offset = Y, O.$u = a === 0, O;
        if (a !== 0) {
          var X = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (O = this.local().add(Y + X, e)).$offset = Y, O.$x.$localOffset = X;
        } else
          O = this.utc();
        return O;
      };
      var D = u.format;
      u.format = function(a) {
        var x = a || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return D.call(this, x);
      }, u.valueOf = function() {
        var a = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * a;
      }, u.isUTC = function() {
        return !!this.$u;
      }, u.toISOString = function() {
        return this.toDate().toISOString();
      }, u.toString = function() {
        return this.toDate().toUTCString();
      };
      var T = u.toDate;
      u.toDate = function(a) {
        return a === "s" && this.$offset ? d(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : T.call(this);
      };
      var y = u.diff;
      u.diff = function(a, x, E) {
        if (a && this.$u === a.$u)
          return y.call(this, a, x, E);
        var Y = this.local(), O = d(a).local();
        return y.call(Y, O, x, E);
      };
    };
  });
})(Lt);
var Rt = Lt.exports;
const Bt = /* @__PURE__ */ bt(Rt);
var zt = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(wt, function() {
    var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, n = {};
    return function(l, p, m) {
      var d, u = function(D, T, y) {
        y === void 0 && (y = {});
        var a = new Date(D), x = function(E, Y) {
          Y === void 0 && (Y = {});
          var O = Y.timeZoneName || "short", X = E + "|" + O, C = n[X];
          return C || (C = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: E, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: O }), n[X] = C), C;
        }(T, y);
        return x.formatToParts(a);
      }, b = function(D, T) {
        for (var y = u(D, T), a = [], x = 0; x < y.length; x += 1) {
          var E = y[x], Y = E.type, O = E.value, X = e[Y];
          X >= 0 && (a[X] = parseInt(O, 10));
        }
        var C = a[3], W = C === 24 ? 0 : C, k = a[0] + "-" + a[1] + "-" + a[2] + " " + W + ":" + a[4] + ":" + a[5] + ":000", R = +D;
        return (m.utc(k).valueOf() - (R -= R % 1e3)) / 6e4;
      }, S = p.prototype;
      S.tz = function(D, T) {
        D === void 0 && (D = d);
        var y = this.utcOffset(), a = this.toDate(), x = a.toLocaleString("en-US", { timeZone: D }), E = Math.round((a - new Date(x)) / 1e3 / 60), Y = m(x, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(a.getTimezoneOffset() / 15) - E, !0);
        if (T) {
          var O = Y.utcOffset();
          Y = Y.add(y - O, "minute");
        }
        return Y.$x.$timezone = D, Y;
      }, S.offsetName = function(D) {
        var T = this.$x.$timezone || m.tz.guess(), y = u(this.valueOf(), T, { timeZoneName: D }).find(function(a) {
          return a.type.toLowerCase() === "timezonename";
        });
        return y && y.value;
      };
      var M = S.startOf;
      S.startOf = function(D, T) {
        if (!this.$x || !this.$x.$timezone)
          return M.call(this, D, T);
        var y = m(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return M.call(y, D, T).tz(this.$x.$timezone, !0);
      }, m.tz = function(D, T, y) {
        var a = y && T, x = y || T || d, E = b(+m(), x);
        if (typeof D != "string")
          return m(D).tz(x);
        var Y = function(W, k, R) {
          var Z = W - 60 * k * 1e3, H = b(Z, R);
          if (k === H)
            return [Z, k];
          var v = b(Z -= 60 * (H - k) * 1e3, R);
          return H === v ? [Z, H] : [W - 60 * Math.min(H, v) * 1e3, Math.max(H, v)];
        }(m.utc(D, a).valueOf(), E, x), O = Y[0], X = Y[1], C = m(O).utcOffset(X);
        return C.$x.$timezone = x, C;
      }, m.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, m.tz.setDefault = function(D) {
        d = D;
      };
    };
  });
})(zt);
var qt = zt.exports;
const Jt = /* @__PURE__ */ bt(qt);
Ot.extend(Bt);
Ot.extend(Jt);
const St = (h, t = "MM/DD HH:mm Z", e) => Ot(h).tz(e).format(t), Yt = (h, t) => {
  let e, n = 0;
  return (...l) => {
    const p = Date.now(), m = p - n;
    !n || m >= t ? (n = p, h.apply(void 0, l)) : e || (e = setTimeout(() => {
      n = p, h.apply(void 0, l), e = null;
    }, t - m));
  };
}, Ht = (h) => {
  const [t, e] = [h[0], h[1]], n = e.clientX - t.clientX, l = e.clientY - t.clientY;
  return Math.sqrt(n * n + l * l);
}, Vt = (h, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const n = e.getContext("2d");
  n.fillStyle = h, n.fillRect(0, 0, 1, 1);
  const l = n.getImageData(0, 0, 1, 1).data;
  return `rgba(${l[0]}, ${l[1]}, ${l[2]}, ${t})`;
}, Gt = ({ xCenterPoint: h, cfg: t, timePerPixel: e, timeSpacing: n, currentTime: l, $canvas: p, screenScaleCount: m, scaleHeight: d, startTime: u, drawLine: b, drawText: S, drawArea: M }) => {
  const D = ({ space: y, scaleTimeFormat: a, bgTimeFormat: x, pointerTimeFormat: E, timezone: Y }) => {
    S({
      x: p.width - h / 10,
      y: 6,
      text: St(l, x, Y),
      fontSize: `${p.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const O = u % n, X = O / e;
    for (let C = 0; C < m; C++) {
      const W = C * t.scaleSpacing - X - t.pointerWidth / 2, k = u + C * n - O;
      if (k % (n * y) === 0) {
        b({ x: W, y: d.long }), S({
          x: W,
          y: p.height - d.long - 5,
          text: St(k, a, Y),
          baseLine: "bottom"
        });
        continue;
      }
      b({ x: W, y: d.short });
    }
    b({
      x: h - t.pointerWidth / 2,
      y: p.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), M({
      startX: h - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: h + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), S({
      x: h,
      y: t.pointerDisplayHeight / 2 + 5,
      text: St(l, E, Y),
      align: "center",
      baseLine: "middle"
    });
  }, T = t.thresholdsConfig[n];
  T && D({
    space: T.space,
    scaleTimeFormat: T.scaleTimeFormat,
    bgTimeFormat: T.bgTimeFormat,
    pointerTimeFormat: T.pointerTimeFormat,
    timezone: t.timezone
  });
}, Qt = {
  fill: !0,
  width: 1e3,
  height: 60,
  bgColor: "rgba(0,0,0,0.5)",
  textColor: "#ffffff",
  fontFamily: "Arial",
  scaleColor: "#ffffff",
  scaleSpacing: 7,
  areaBgColor: "#ffffff55",
  pointerColor: "#00aeec",
  pointerWidth: 3,
  pointerDisplayWidth: 100,
  pointerDisplayHeight: 14,
  fps: 60,
  zoom: 3,
  timeSpacingList: [10, 100, 1e3, 1e4, 6e4, 6e5, 36e5, 864e5, 6048e5],
  // scaleHeight: ,
  // bgTextColor: ,
  minimumTime: -1 / 0,
  maximumTime: 1 / 0,
  thresholdsConfig: {
    10: {
      scaleTimeFormat: "mm:ss:SSS",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss:SSS",
      space: 10
    },
    100: {
      scaleTimeFormat: "mm:ss",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss:SSS",
      space: 10
    },
    1e3: {
      scaleTimeFormat: "mm:ss",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss",
      space: 10
    },
    1e4: {
      scaleTimeFormat: "HH:mm:ss",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss",
      space: 12
    },
    6e4: {
      scaleTimeFormat: "HH:mm",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss",
      space: 10
    },
    6e5: {
      scaleTimeFormat: "HH:mm",
      bgTimeFormat: "YYYY/MM/DD",
      pointerTimeFormat: "HH:mm:ss",
      space: 10
    },
    36e5: {
      scaleTimeFormat: "MM/DD HH:mm",
      bgTimeFormat: "YYYY/MM",
      pointerTimeFormat: "MM/DD HH:mm",
      space: 12
    },
    864e5: {
      scaleTimeFormat: "MM/DD HH:mm",
      bgTimeFormat: "YYYY/MM",
      pointerTimeFormat: "YYYY/MM/DD HH:mm",
      space: 12
    },
    6048e5: {
      scaleTimeFormat: "YYYY/MM/DD",
      bgTimeFormat: "YYYY",
      pointerTimeFormat: "YYYY/MM/DD",
      space: 10
    }
  }
};
var ut, G, nt, U, B, F, et, q, Q, J, dt, _t, $t, Et, gt, Wt, vt, Pt, pt, kt, Mt, It, Dt, Ut, Tt, Xt, xt, ft, rt, it, ct;
class te {
  constructor(t, e) {
    // 拖拽
    L(this, dt);
    // 缩放
    L(this, $t);
    // 触摸事件监听器
    L(this, gt);
    L(this, vt);
    L(this, pt);
    // 父元素size变化
    L(this, Mt);
    // 清空画布
    L(this, Dt);
    // 绘制比例尺
    L(this, Tt);
    L(this, it);
    ht(this, "$canvas");
    ht(this, "$canvasParent");
    ht(this, "ctx");
    ht(this, "cfg");
    L(this, ut, void 0);
    L(this, G, void 0);
    L(this, nt, jt());
    L(this, U, 0);
    L(this, B, void 0);
    L(this, F, void 0);
    L(this, et, void 0);
    L(this, q, !1);
    L(this, Q, null);
    L(this, J, null);
    // 绘制线条
    L(this, xt, ({ x: t, y: e, width: n = 1, color: l = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = l, this.ctx.lineWidth = n, this.ctx.stroke();
    });
    // 绘制文字
    L(this, ft, ({ x: t, y: e, text: n, color: l = this.cfg.textColor, fontSize: p = "11px", align: m = "center", baseLine: d = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${p} ${this.cfg.fontFamily}`, this.ctx.fillStyle = l, this.ctx.textAlign = m, this.ctx.textBaseline = d, this.ctx.fillText(n, t, e);
    });
    // 绘制区域
    L(this, rt, ({ startX: t, startY: e, endX: n, endY: l, bgColor: p }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, n - t, l - e), this.ctx.fillStyle = p, this.ctx.fill();
    });
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Qt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: n, width: l, height: p, zoom: m, timeSpacingList: d, scaleHeight: u, textColor: b, bgTextColor: S } = this.cfg;
    if (S || (this.cfg.bgTextColor = Vt(b, 0.18)), m < 0 || m >= d.length || m % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${d.length - 1}, and must be an integer`);
    if (n) {
      const M = this.$canvas.parentElement;
      this.$canvasParent = M, this.$canvas.width = M.clientWidth, this.$canvas.height = M.clientHeight, new ResizeObserver(Yt(j(this, Mt, It).bind(this), 200)).observe(M);
    } else
      this.$canvas.width = l, this.$canvas.height = p;
    z(this, F, d[m]), u != null && u.long && (u != null && u.short) ? z(this, et, u) : z(this, et, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", j(this, $t, Et).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", j(this, dt, _t).bind(this)), this.$canvas.addEventListener("touchstart", j(this, gt, Wt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", Yt(j(this, vt, Pt).bind(this), 1e3 / this.cfg.fps), { passive: !1 }), this.$canvas.addEventListener("touchend", j(this, pt, kt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: n } = {}) {
    if (o(this, q) && !n)
      return;
    let l = t || Date.now();
    l < this.cfg.minimumTime && (l = this.cfg.minimumTime), l > this.cfg.maximumTime && (l = this.cfg.maximumTime), z(this, U, l), z(this, B, e || []);
    const p = this.$canvas.width / 2, m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), d = m * o(this, F), [u, b] = z(this, ut, [o(this, U) - d / 2, o(this, U) + d / 2]);
    z(this, G, d / this.$canvas.width), j(this, Dt, Ut).call(this), o(this, rt).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), o(this, B).forEach((S) => {
      const M = S.startTime <= u ? 0 : Math.round((S.startTime - u) / o(this, G)), D = S.endTime >= b ? this.$canvas.width : Math.round((S.endTime - u) / o(this, G));
      M < this.$canvas.width && D > 0 && o(this, rt).call(this, {
        startX: M,
        startY: 0,
        endX: D,
        endY: this.$canvas.height,
        bgColor: S.bgColor || this.cfg.areaBgColor
      });
    }), Gt.bind(this)({
      xCenterPoint: p,
      screenScaleCount: m,
      startTime: u,
      timePerPixel: o(this, G),
      scaleHeight: o(this, et),
      timeSpacing: o(this, F),
      currentTime: o(this, U),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: o(this, xt).bind(this),
      drawText: o(this, ft).bind(this),
      drawArea: o(this, rt).bind(this)
    }), j(this, Tt, Xt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return o(this, U);
  }
  // 获取时间范围
  getTimeRange() {
    return o(this, ut);
  }
  // 获取1px所占毫秒数
  getMsPerPixel() {
    return o(this, G);
  }
  on(t, e) {
    o(this, nt).on(t, e);
  }
  off(t, e) {
    o(this, nt).off(t, e);
  }
}
ut = new WeakMap(), G = new WeakMap(), nt = new WeakMap(), U = new WeakMap(), B = new WeakMap(), F = new WeakMap(), et = new WeakMap(), q = new WeakMap(), Q = new WeakMap(), J = new WeakMap(), dt = new WeakSet(), _t = function(t) {
  z(this, q, !0);
  let e = t.clientX, n = o(this, U);
  const l = Yt(({ clientX: d }) => {
    o(this, q) && (n = Math.round(o(this, U) - o(this, F) / this.cfg.scaleSpacing * (d - e)), e = d, this.draw({
      currentTime: n,
      areas: o(this, B),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), p = (d) => {
    const u = this.$canvas.getBoundingClientRect(), b = d.clientX - u.left, S = d.clientY - u.top, M = 3;
    (b < M || b > this.$canvas.width - M || S < M || S > this.$canvas.height - M) && (this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", p));
  }, m = () => {
    this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", p), document.removeEventListener("mouseup", m), z(this, q, !1), j(this, it, ct).call(this, "dragged", n);
  };
  this.$canvas.addEventListener("mousemove", l), this.$canvas.addEventListener("mousemove", p), document.addEventListener("mouseup", m);
}, $t = new WeakSet(), Et = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((n) => n === o(this, F));
  t.deltaY < 0 && e > 0 ? (z(this, F, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: o(this, U),
    areas: o(this, B),
    _privateFlag: !0
  }), j(this, it, ct).call(this, "zoom", e - 1)) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (z(this, F, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: o(this, U),
    areas: o(this, B),
    _privateFlag: !0
  }), j(this, it, ct).call(this, "zoom", e + 1));
}, gt = new WeakSet(), Wt = function(t) {
  t.preventDefault(), z(this, q, !0), z(this, Q, t.touches[0].clientX), t.touches.length === 2 && z(this, J, Ht(t.touches));
}, vt = new WeakSet(), Pt = function(t) {
  if (t.preventDefault(), !o(this, q))
    return;
  if (t.touches.length === 2 && o(this, J) !== null) {
    const p = Ht(t.touches), m = Math.abs(o(this, J) - p) >= 35;
    if (!m)
      return;
    let d = this.cfg.timeSpacingList.findIndex((u) => u === o(this, F));
    if (p < o(this, J) ? d += 1 : d -= 1, d < 0 || d > this.cfg.timeSpacingList.length - 1)
      return;
    z(this, F, this.cfg.timeSpacingList[d]), m && z(this, J, p), this.draw({
      currentTime: o(this, U),
      areas: o(this, B),
      _privateFlag: !0
    });
    return;
  }
  if (o(this, Q) === null)
    return;
  const e = t.touches[0], n = e.clientX - o(this, Q), l = Math.round(o(this, U) - o(this, F) / this.cfg.scaleSpacing * n);
  z(this, Q, e.clientX), this.draw({
    currentTime: l,
    areas: o(this, B),
    _privateFlag: !0
  });
}, pt = new WeakSet(), kt = function(t) {
  o(this, q) && (z(this, q, !1), z(this, Q, null), t.touches.length < 2 && z(this, J, null), j(this, it, ct).call(this, "dragged", o(this, U)));
}, Mt = new WeakSet(), It = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || z(this, et, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: o(this, U),
    areas: o(this, B)
  }));
}, Dt = new WeakSet(), Ut = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, Tt = new WeakSet(), Xt = function() {
  const t = () => o(this, F) < 1e3 ? `${o(this, F)}ms` : o(this, F) < 6e4 ? `${Math.round(o(this, F) / 100) / 10}sec` : o(this, F) < 36e5 ? `${Math.round(o(this, F) / 100 / 60) / 10}min` : o(this, F) < 864e5 ? `${Math.round(o(this, F) / 100 / 60 / 60) / 10}hours` : o(this, F) < 6048e5 ? `${Math.round(o(this, F) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(o(this, F) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  o(this, ft).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, xt = new WeakMap(), ft = new WeakMap(), rt = new WeakMap(), it = new WeakSet(), ct = function(...t) {
  o(this, nt).emit(...t);
};
export {
  te as default,
  St as format
};
