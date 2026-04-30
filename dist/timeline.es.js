var At = Object.defineProperty;
var Zt = (h, t, e) => t in h ? At(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var ct = (h, t, e) => (Zt(h, typeof t != "symbol" ? t + "" : t, e), e), yt = (h, t, e) => {
  if (!t.has(h))
    throw TypeError("Cannot " + e);
};
var i = (h, t, e) => (yt(h, t, "read from private field"), e ? e.call(h) : t.get(h)), L = (h, t, e) => {
  if (t.has(h))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(h) : t.set(h, e);
}, W = (h, t, e, n) => (yt(h, t, "write to private field"), n ? n.call(h, e) : t.set(h, e), e);
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
    n && n.slice().map(function(m) {
      m(e);
    }), (n = h.get("*")) && n.slice().map(function(m) {
      m(t, e);
    });
  } };
}
var bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wt(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Ot = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(bt, function() {
    var e = 1e3, n = 6e4, m = 36e5, $ = "millisecond", f = "second", l = "minute", u = "hour", v = "day", T = "week", y = "month", Y = "quarter", x = "year", b = "date", o = "Invalid Date", S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, E = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, w = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(d) {
      var a = ["th", "st", "nd", "rd"], s = d % 100;
      return "[" + d + (a[(s - 20) % 10] || a[s] || a[0]) + "]";
    } }, F = function(d, a, s) {
      var c = String(d);
      return !c || c.length >= a ? d : "" + Array(a + 1 - c.length).join(s) + d;
    }, X = { s: F, z: function(d) {
      var a = -d.utcOffset(), s = Math.abs(a), c = Math.floor(s / 60), r = s % 60;
      return (a <= 0 ? "+" : "-") + F(c, 2, "0") + ":" + F(r, 2, "0");
    }, m: function d(a, s) {
      if (a.date() < s.date())
        return -d(s, a);
      var c = 12 * (s.year() - a.year()) + (s.month() - a.month()), r = a.clone().add(c, y), g = s - r < 0, p = a.clone().add(c + (g ? -1 : 1), y);
      return +(-(c + (s - r) / (g ? r - p : p - r)) || 0);
    }, a: function(d) {
      return d < 0 ? Math.ceil(d) || 0 : Math.floor(d);
    }, p: function(d) {
      return { M: y, y: x, w: T, d: v, D: b, h: u, m: l, s: f, ms: $, Q: Y }[d] || String(d || "").toLowerCase().replace(/s$/, "");
    }, u: function(d) {
      return d === void 0;
    } }, C = "en", z = {};
    z[C] = w;
    var I = "$isDayjsObject", B = function(d) {
      return d instanceof ft || !(!d || !d[I]);
    }, Z = function d(a, s, c) {
      var r;
      if (!a)
        return C;
      if (typeof a == "string") {
        var g = a.toLowerCase();
        z[g] && (r = g), s && (z[g] = s, r = g);
        var p = a.split("-");
        if (!r && p.length > 1)
          return d(p[0]);
      } else {
        var H = a.name;
        z[H] = a, r = H;
      }
      return !c && r && (C = r), r || !c && C;
    }, O = function(d, a) {
      if (B(d))
        return d.clone();
      var s = typeof a == "object" ? a : {};
      return s.date = d, s.args = arguments, new ft(s);
    }, D = X;
    D.l = Z, D.i = B, D.w = function(d, a) {
      return O(d, { locale: a.$L, utc: a.$u, x: a.$x, $offset: a.$offset });
    };
    var ft = function() {
      function d(s) {
        this.$L = Z(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[I] = !0;
      }
      var a = d.prototype;
      return a.parse = function(s) {
        this.$d = function(c) {
          var r = c.date, g = c.utc;
          if (r === null)
            return /* @__PURE__ */ new Date(NaN);
          if (D.u(r))
            return /* @__PURE__ */ new Date();
          if (r instanceof Date)
            return new Date(r);
          if (typeof r == "string" && !/Z$/i.test(r)) {
            var p = r.match(S);
            if (p) {
              var H = p[2] - 1 || 0, _ = (p[7] || "0").substring(0, 3);
              return g ? new Date(Date.UTC(p[1], H, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, _)) : new Date(p[1], H, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, _);
            }
          }
          return new Date(r);
        }(s), this.init();
      }, a.init = function() {
        var s = this.$d;
        this.$y = s.getFullYear(), this.$M = s.getMonth(), this.$D = s.getDate(), this.$W = s.getDay(), this.$H = s.getHours(), this.$m = s.getMinutes(), this.$s = s.getSeconds(), this.$ms = s.getMilliseconds();
      }, a.$utils = function() {
        return D;
      }, a.isValid = function() {
        return this.$d.toString() !== o;
      }, a.isSame = function(s, c) {
        var r = O(s);
        return this.startOf(c) <= r && r <= this.endOf(c);
      }, a.isAfter = function(s, c) {
        return O(s) < this.startOf(c);
      }, a.isBefore = function(s, c) {
        return this.endOf(c) < O(s);
      }, a.$g = function(s, c, r) {
        return D.u(s) ? this[c] : this.set(r, s);
      }, a.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, a.valueOf = function() {
        return this.$d.getTime();
      }, a.startOf = function(s, c) {
        var r = this, g = !!D.u(c) || c, p = D.p(s), H = function(tt, A) {
          var V = D.w(r.$u ? Date.UTC(r.$y, A, tt) : new Date(r.$y, A, tt), r);
          return g ? V : V.endOf(v);
        }, _ = function(tt, A) {
          return D.w(r.toDate()[tt].apply(r.toDate("s"), (g ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(A)), r);
        }, k = this.$W, P = this.$M, R = this.$D, st = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case x:
            return g ? H(1, 0) : H(31, 11);
          case y:
            return g ? H(1, P) : H(0, P + 1);
          case T:
            var Q = this.$locale().weekStart || 0, ot = (k < Q ? k + 7 : k) - Q;
            return H(g ? R - ot : R + (6 - ot), P);
          case v:
          case b:
            return _(st + "Hours", 0);
          case u:
            return _(st + "Minutes", 1);
          case l:
            return _(st + "Seconds", 2);
          case f:
            return _(st + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, a.endOf = function(s) {
        return this.startOf(s, !1);
      }, a.$set = function(s, c) {
        var r, g = D.p(s), p = "set" + (this.$u ? "UTC" : ""), H = (r = {}, r[v] = p + "Date", r[b] = p + "Date", r[y] = p + "Month", r[x] = p + "FullYear", r[u] = p + "Hours", r[l] = p + "Minutes", r[f] = p + "Seconds", r[$] = p + "Milliseconds", r)[g], _ = g === v ? this.$D + (c - this.$W) : c;
        if (g === y || g === x) {
          var k = this.clone().set(b, 1);
          k.$d[H](_), k.init(), this.$d = k.set(b, Math.min(this.$D, k.daysInMonth())).$d;
        } else
          H && this.$d[H](_);
        return this.init(), this;
      }, a.set = function(s, c) {
        return this.clone().$set(s, c);
      }, a.get = function(s) {
        return this[D.p(s)]();
      }, a.add = function(s, c) {
        var r, g = this;
        s = Number(s);
        var p = D.p(c), H = function(P) {
          var R = O(g);
          return D.w(R.date(R.date() + Math.round(P * s)), g);
        };
        if (p === y)
          return this.set(y, this.$M + s);
        if (p === x)
          return this.set(x, this.$y + s);
        if (p === v)
          return H(1);
        if (p === T)
          return H(7);
        var _ = (r = {}, r[l] = n, r[u] = m, r[f] = e, r)[p] || 1, k = this.$d.getTime() + s * _;
        return D.w(k, this);
      }, a.subtract = function(s, c) {
        return this.add(-1 * s, c);
      }, a.format = function(s) {
        var c = this, r = this.$locale();
        if (!this.isValid())
          return r.invalidDate || o;
        var g = s || "YYYY-MM-DDTHH:mm:ssZ", p = D.z(this), H = this.$H, _ = this.$m, k = this.$M, P = r.weekdays, R = r.months, st = r.meridiem, Q = function(A, V, ht, dt) {
          return A && (A[V] || A(c, g)) || ht[V].slice(0, dt);
        }, ot = function(A) {
          return D.s(H % 12 || 12, A, "0");
        }, tt = st || function(A, V, ht) {
          var dt = A < 12 ? "AM" : "PM";
          return ht ? dt.toLowerCase() : dt;
        };
        return g.replace(E, function(A, V) {
          return V || function(ht) {
            switch (ht) {
              case "YY":
                return String(c.$y).slice(-2);
              case "YYYY":
                return D.s(c.$y, 4, "0");
              case "M":
                return k + 1;
              case "MM":
                return D.s(k + 1, 2, "0");
              case "MMM":
                return Q(r.monthsShort, k, R, 3);
              case "MMMM":
                return Q(R, k);
              case "D":
                return c.$D;
              case "DD":
                return D.s(c.$D, 2, "0");
              case "d":
                return String(c.$W);
              case "dd":
                return Q(r.weekdaysMin, c.$W, P, 2);
              case "ddd":
                return Q(r.weekdaysShort, c.$W, P, 3);
              case "dddd":
                return P[c.$W];
              case "H":
                return String(H);
              case "HH":
                return D.s(H, 2, "0");
              case "h":
                return ot(1);
              case "hh":
                return ot(2);
              case "a":
                return tt(H, _, !0);
              case "A":
                return tt(H, _, !1);
              case "m":
                return String(_);
              case "mm":
                return D.s(_, 2, "0");
              case "s":
                return String(c.$s);
              case "ss":
                return D.s(c.$s, 2, "0");
              case "SSS":
                return D.s(c.$ms, 3, "0");
              case "Z":
                return p;
            }
            return null;
          }(A) || p.replace(":", "");
        });
      }, a.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, a.diff = function(s, c, r) {
        var g, p = this, H = D.p(c), _ = O(s), k = (_.utcOffset() - this.utcOffset()) * n, P = this - _, R = function() {
          return D.m(p, _);
        };
        switch (H) {
          case x:
            g = R() / 12;
            break;
          case y:
            g = R();
            break;
          case Y:
            g = R() / 3;
            break;
          case T:
            g = (P - k) / 6048e5;
            break;
          case v:
            g = (P - k) / 864e5;
            break;
          case u:
            g = P / m;
            break;
          case l:
            g = P / n;
            break;
          case f:
            g = P / e;
            break;
          default:
            g = P;
        }
        return r ? g : D.a(g);
      }, a.daysInMonth = function() {
        return this.endOf(y).$D;
      }, a.$locale = function() {
        return z[this.$L];
      }, a.locale = function(s, c) {
        if (!s)
          return this.$L;
        var r = this.clone(), g = Z(s, c, !0);
        return g && (r.$L = g), r;
      }, a.clone = function() {
        return D.w(this.$d, this);
      }, a.toDate = function() {
        return new Date(this.valueOf());
      }, a.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, a.toISOString = function() {
        return this.$d.toISOString();
      }, a.toString = function() {
        return this.$d.toUTCString();
      }, d;
    }(), Ft = ft.prototype;
    return O.prototype = Ft, [["$ms", $], ["$s", f], ["$m", l], ["$H", u], ["$W", v], ["$M", y], ["$y", x], ["$D", b]].forEach(function(d) {
      Ft[d[1]] = function(a) {
        return this.$g(a, d[0], d[1]);
      };
    }), O.extend = function(d, a) {
      return d.$i || (d(a, ft, O), d.$i = !0), O;
    }, O.locale = Z, O.isDayjs = B, O.unix = function(d) {
      return O(1e3 * d);
    }, O.en = z[C], O.Ls = z, O.p = {}, O;
  });
})(Ot);
var Rt = Ot.exports;
const Ht = /* @__PURE__ */ wt(Rt);
var Lt = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(bt, function() {
    var e = "minute", n = /[+-]\d\d(?::?\d\d)?/g, m = /([+-]|\d\d)/g;
    return function($, f, l) {
      var u = f.prototype;
      l.utc = function(o) {
        var S = { date: o, utc: !0, args: arguments };
        return new f(S);
      }, u.utc = function(o) {
        var S = l(this.toDate(), { locale: this.$L, utc: !0 });
        return o ? S.add(this.utcOffset(), e) : S;
      }, u.local = function() {
        return l(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var v = u.parse;
      u.parse = function(o) {
        o.utc && (this.$u = !0), this.$utils().u(o.$offset) || (this.$offset = o.$offset), v.call(this, o);
      };
      var T = u.init;
      u.init = function() {
        if (this.$u) {
          var o = this.$d;
          this.$y = o.getUTCFullYear(), this.$M = o.getUTCMonth(), this.$D = o.getUTCDate(), this.$W = o.getUTCDay(), this.$H = o.getUTCHours(), this.$m = o.getUTCMinutes(), this.$s = o.getUTCSeconds(), this.$ms = o.getUTCMilliseconds();
        } else
          T.call(this);
      };
      var y = u.utcOffset;
      u.utcOffset = function(o, S) {
        var E = this.$utils().u;
        if (E(o))
          return this.$u ? 0 : E(this.$offset) ? y.call(this) : this.$offset;
        if (typeof o == "string" && (o = function(C) {
          C === void 0 && (C = "");
          var z = C.match(n);
          if (!z)
            return null;
          var I = ("" + z[0]).match(m) || ["-", 0, 0], B = I[0], Z = 60 * +I[1] + +I[2];
          return Z === 0 ? 0 : B === "+" ? Z : -Z;
        }(o), o === null))
          return this;
        var w = Math.abs(o) <= 16 ? 60 * o : o, F = this;
        if (S)
          return F.$offset = w, F.$u = o === 0, F;
        if (o !== 0) {
          var X = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (F = this.local().add(w + X, e)).$offset = w, F.$x.$localOffset = X;
        } else
          F = this.utc();
        return F;
      };
      var Y = u.format;
      u.format = function(o) {
        var S = o || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return Y.call(this, S);
      }, u.valueOf = function() {
        var o = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * o;
      }, u.isUTC = function() {
        return !!this.$u;
      }, u.toISOString = function() {
        return this.toDate().toISOString();
      }, u.toString = function() {
        return this.toDate().toUTCString();
      };
      var x = u.toDate;
      u.toDate = function(o) {
        return o === "s" && this.$offset ? l(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : x.call(this);
      };
      var b = u.diff;
      u.diff = function(o, S, E) {
        if (o && this.$u === o.$u)
          return b.call(this, o, S, E);
        var w = this.local(), F = l(o).local();
        return b.call(w, F, S, E);
      };
    };
  });
})(Lt);
var Bt = Lt.exports;
const Nt = /* @__PURE__ */ wt(Bt);
var zt = { exports: {} };
(function(h, t) {
  (function(e, n) {
    h.exports = n();
  })(bt, function() {
    var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, n = {};
    return function(m, $, f) {
      var l, u = function(Y, x, b) {
        b === void 0 && (b = {});
        var o = new Date(Y), S = function(E, w) {
          w === void 0 && (w = {});
          var F = w.timeZoneName || "short", X = E + "|" + F, C = n[X];
          return C || (C = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: E, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: F }), n[X] = C), C;
        }(x, b);
        return S.formatToParts(o);
      }, v = function(Y, x) {
        for (var b = u(Y, x), o = [], S = 0; S < b.length; S += 1) {
          var E = b[S], w = E.type, F = E.value, X = e[w];
          X >= 0 && (o[X] = parseInt(F, 10));
        }
        var C = o[3], z = C === 24 ? 0 : C, I = o[0] + "-" + o[1] + "-" + o[2] + " " + z + ":" + o[4] + ":" + o[5] + ":000", B = +Y;
        return (f.utc(I).valueOf() - (B -= B % 1e3)) / 6e4;
      }, T = $.prototype;
      T.tz = function(Y, x) {
        Y === void 0 && (Y = l);
        var b = this.utcOffset(), o = this.toDate(), S = o.toLocaleString("en-US", { timeZone: Y }), E = Math.round((o - new Date(S)) / 1e3 / 60), w = f(S, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(o.getTimezoneOffset() / 15) - E, !0);
        if (x) {
          var F = w.utcOffset();
          w = w.add(b - F, "minute");
        }
        return w.$x.$timezone = Y, w;
      }, T.offsetName = function(Y) {
        var x = this.$x.$timezone || f.tz.guess(), b = u(this.valueOf(), x, { timeZoneName: Y }).find(function(o) {
          return o.type.toLowerCase() === "timezonename";
        });
        return b && b.value;
      };
      var y = T.startOf;
      T.startOf = function(Y, x) {
        if (!this.$x || !this.$x.$timezone)
          return y.call(this, Y, x);
        var b = f(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return y.call(b, Y, x).tz(this.$x.$timezone, !0);
      }, f.tz = function(Y, x, b) {
        var o = b && x, S = b || x || l, E = v(+f(), S);
        if (typeof Y != "string")
          return f(Y).tz(S);
        var w = function(z, I, B) {
          var Z = z - 60 * I * 1e3, O = v(Z, B);
          if (I === O)
            return [Z, I];
          var D = v(Z -= 60 * (O - I) * 1e3, B);
          return O === D ? [Z, O] : [z - 60 * Math.min(O, D) * 1e3, Math.max(O, D)];
        }(f.utc(Y, o).valueOf(), E, S), F = w[0], X = w[1], C = f(F).utcOffset(X);
        return C.$x.$timezone = S, C;
      }, f.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, f.tz.setDefault = function(Y) {
        l = Y;
      };
    };
  });
})(zt);
var Jt = zt.exports;
const qt = /* @__PURE__ */ wt(Jt);
Ht.extend(Nt);
Ht.extend(qt);
const ut = (h, t = "MM/DD HH:mm Z", e) => Ht(h).tz(e).format(t), St = (h, t) => {
  let e, n = 0;
  return (...m) => {
    const $ = Date.now(), f = $ - n;
    !n || f >= t ? (n = $, h.apply(void 0, m)) : e || (e = setTimeout(() => {
      n = $, h.apply(void 0, m), e = null;
    }, t - f));
  };
}, Ct = (h) => {
  const [t, e] = [h[0], h[1]], n = e.clientX - t.clientX, m = e.clientY - t.clientY;
  return Math.sqrt(n * n + m * m);
}, Vt = (h, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const n = e.getContext("2d");
  n.fillStyle = h, n.fillRect(0, 0, 1, 1);
  const m = n.getImageData(0, 0, 1, 1).data;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${t})`;
}, Gt = ({ xCenterPoint: h, cfg: t, timePerPixel: e, timeSpacing: n, currentTime: m, $canvas: $, screenScaleCount: f, scaleHeight: l, startTime: u, drawLine: v, drawText: T, drawArea: y }) => {
  const Y = ({ space: b, scaleTimeFormat: o, bgTimeFormat: S, pointerTimeFormat: E, timezone: w }) => {
    T({
      x: $.width - h / 10,
      y: 6,
      text: ut(m, S, w),
      fontSize: `${$.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const F = u % n, X = F / e;
    for (let C = 0; C < f; C++) {
      const z = C * t.scaleSpacing - X - t.pointerWidth / 2, I = u + C * n - F;
      if (I % (n * b) === 0) {
        t.theme === "modern" ? (v({ x: z, y: $.height, width: 1, color: t.scaleColor }), T({
          x: z,
          y: $.height - 8,
          text: ut(I, o, w),
          baseLine: "bottom",
          fontSize: "10px"
        })) : (v({ x: z, y: l.long }), T({
          x: z,
          y: $.height - l.long - 5,
          text: ut(I, o, w),
          baseLine: "bottom"
        }));
        continue;
      }
      t.theme === "modern" ? v({ x: z, y: $.height, width: 1, color: "rgba(255, 255, 255, 0.05)" }) : v({ x: z, y: l.short });
    }
    v({
      x: h - t.pointerWidth / 2,
      y: $.height,
      width: t.pointerWidth,
      color: t.pointerColor,
      shadowBlur: t.theme === "modern" ? 8 : 0,
      shadowColor: t.theme === "modern" ? t.pointerColor : "transparent"
    }), t.theme === "modern" ? (y({
      startX: h + 4,
      startY: 4,
      endX: h + 4 + t.pointerDisplayWidth,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), T({
      x: h + 4 + t.pointerDisplayWidth / 2,
      y: 4 + t.pointerDisplayHeight / 2,
      text: ut(m, E, w),
      align: "center",
      baseLine: "middle",
      color: t.pointerTextColor || t.textColor,
      fontSize: "bold 10px"
    })) : (y({
      startX: h - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: h + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), T({
      x: h,
      y: t.pointerDisplayHeight / 2 + 5,
      text: ut(m, E, w),
      align: "center",
      baseLine: "middle",
      color: t.pointerTextColor || t.textColor
    }));
  }, x = t.thresholdsConfig[n];
  x && Y({
    space: x.space,
    scaleTimeFormat: x.scaleTimeFormat,
    bgTimeFormat: x.bgTimeFormat,
    pointerTimeFormat: x.pointerTimeFormat,
    timezone: t.timezone
  });
}, Kt = {
  bgColor: "#0f1216",
  textColor: "#7c8693",
  fontFamily: "'JetBrains Mono', monospace",
  scaleColor: "#232c36",
  scaleSpacing: 10,
  areaBgColor: "rgba(255, 71, 87, 0.18)",
  pointerColor: "#f5d547",
  pointerTextColor: "#0a0c0f",
  pointerWidth: 2,
  pointerDisplayWidth: 146,
  pointerDisplayHeight: 16,
  bgTextColor: "rgba(0,0,0,0)",
  thresholdsConfig: {
    10: { scaleTimeFormat: "mm:ss:SSS", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss:SSS", space: 10 },
    100: { scaleTimeFormat: "mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss:SSS", space: 10 },
    1e3: { scaleTimeFormat: "mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss", space: 10 },
    1e4: { scaleTimeFormat: "HH:mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss", space: 10 },
    6e4: { scaleTimeFormat: "HH:mm", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss", space: 10 },
    6e5: { scaleTimeFormat: "HH:mm", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "MM/DD/YYYY  HH:mm:ss", space: 10 },
    36e5: { scaleTimeFormat: "MM/DD HH:mm", bgTimeFormat: "YYYY/MM", pointerTimeFormat: "MM/DD/YYYY  HH:mm", space: 10 },
    864e5: { scaleTimeFormat: "MM/DD HH:mm", bgTimeFormat: "YYYY/MM", pointerTimeFormat: "MM/DD/YYYY  HH:mm", space: 10 },
    6048e5: { scaleTimeFormat: "YYYY/MM/DD", bgTimeFormat: "YYYY", pointerTimeFormat: "YYYY/MM/DD", space: 10 }
  }
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
var mt, G, nt, U, N, M, et, J, K, q, gt, Wt, pt, _t, $t, Et, vt, kt, Yt, It, Mt, Pt, Dt, Ut, Tt, Xt, xt, rt, at, it, lt;
class ee {
  constructor(t, e) {
    // 拖拽
    L(this, gt);
    // 缩放
    L(this, pt);
    // 触摸事件监听器
    L(this, $t);
    L(this, vt);
    L(this, Yt);
    // 父元素size变化
    L(this, Mt);
    // 清空画布
    L(this, Dt);
    // 绘制比例尺
    L(this, Tt);
    L(this, it);
    ct(this, "$canvas");
    ct(this, "$canvasParent");
    ct(this, "ctx");
    ct(this, "cfg");
    L(this, mt, void 0);
    L(this, G, void 0);
    L(this, nt, jt());
    L(this, U, 0);
    L(this, N, void 0);
    L(this, M, void 0);
    L(this, et, void 0);
    L(this, J, !1);
    L(this, K, null);
    L(this, q, null);
    // 绘制线条
    L(this, xt, ({ x: t, y: e, width: n = 1, color: m = this.cfg.scaleColor, shadowBlur: $ = 0, shadowColor: f = "transparent" }) => {
      this.ctx.shadowBlur = $, this.ctx.shadowColor = f, this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = m, this.ctx.lineWidth = n, this.ctx.stroke(), this.ctx.shadowBlur = 0, this.ctx.shadowColor = "transparent";
    });
    // 绘制文字
    L(this, rt, ({ x: t, y: e, text: n, color: m = this.cfg.textColor, fontSize: $ = "11px", align: f = "center", baseLine: l = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${$} ${this.cfg.fontFamily}`, this.ctx.fillStyle = m, this.ctx.textAlign = f, this.ctx.textBaseline = l, this.ctx.fillText(n, t, e);
    });
    // 绘制区域
    L(this, at, ({ startX: t, startY: e, endX: n, endY: m, bgColor: $ }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, n - t, m - e), this.ctx.fillStyle = $, this.ctx.fill();
    });
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d");
    const n = (e == null ? void 0 : e.theme) === "modern" ? Kt : {};
    this.cfg = { ...Qt, ...n, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: m, width: $, height: f, zoom: l, timeSpacingList: u, scaleHeight: v, textColor: T, bgTextColor: y } = this.cfg;
    if (y || (this.cfg.bgTextColor = Vt(T, 0.18)), l < 0 || l >= u.length || l % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${u.length - 1}, and must be an integer`);
    if (m) {
      const Y = this.$canvas.parentElement;
      this.$canvasParent = Y, this.$canvas.width = Y.clientWidth, this.$canvas.height = Y.clientHeight, new ResizeObserver(St(j(this, Mt, Pt).bind(this), 200)).observe(Y);
    } else
      this.$canvas.width = $, this.$canvas.height = f;
    W(this, M, u[l]), v != null && v.long && (v != null && v.short) ? W(this, et, v) : W(this, et, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", j(this, pt, _t).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", j(this, gt, Wt).bind(this)), this.$canvas.addEventListener("touchstart", j(this, $t, Et).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", St(j(this, vt, kt).bind(this), 1e3 / this.cfg.fps), { passive: !1 }), this.$canvas.addEventListener("touchend", j(this, Yt, It).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: n } = {}) {
    if (i(this, J) && !n)
      return;
    let m = t || Date.now();
    m < this.cfg.minimumTime && (m = this.cfg.minimumTime), m > this.cfg.maximumTime && (m = this.cfg.maximumTime), W(this, U, m), W(this, N, e || []);
    const $ = this.$canvas.width / 2, f = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), l = f * i(this, M), [u, v] = W(this, mt, [i(this, U) - l / 2, i(this, U) + l / 2]);
    W(this, G, l / this.$canvas.width), j(this, Dt, Ut).call(this), i(this, at).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), i(this, N).forEach((T) => {
      const y = T.startTime <= u ? 0 : Math.round((T.startTime - u) / i(this, G)), Y = T.endTime >= v ? this.$canvas.width : Math.round((T.endTime - u) / i(this, G));
      y < this.$canvas.width && Y > 0 && i(this, at).call(this, {
        startX: y,
        startY: 0,
        endX: Y,
        endY: this.$canvas.height,
        bgColor: T.bgColor || this.cfg.areaBgColor
      });
    }), Gt.bind(this)({
      xCenterPoint: $,
      screenScaleCount: f,
      startTime: u,
      timePerPixel: i(this, G),
      scaleHeight: i(this, et),
      timeSpacing: i(this, M),
      currentTime: i(this, U),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: i(this, xt).bind(this),
      drawText: i(this, rt).bind(this),
      drawArea: i(this, at).bind(this)
    }), j(this, Tt, Xt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return i(this, U);
  }
  // 获取时间范围
  getTimeRange() {
    return i(this, mt);
  }
  // 获取1px所占毫秒数
  getMsPerPixel() {
    return i(this, G);
  }
  on(t, e) {
    i(this, nt).on(t, e);
  }
  off(t, e) {
    i(this, nt).off(t, e);
  }
}
mt = new WeakMap(), G = new WeakMap(), nt = new WeakMap(), U = new WeakMap(), N = new WeakMap(), M = new WeakMap(), et = new WeakMap(), J = new WeakMap(), K = new WeakMap(), q = new WeakMap(), gt = new WeakSet(), Wt = function(t) {
  W(this, J, !0);
  let e = t.clientX, n = i(this, U);
  const m = St(({ clientX: l }) => {
    i(this, J) && (n = Math.round(i(this, U) - i(this, M) / this.cfg.scaleSpacing * (l - e)), e = l, this.draw({
      currentTime: n,
      areas: i(this, N),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), $ = (l) => {
    const u = this.$canvas.getBoundingClientRect(), v = l.clientX - u.left, T = l.clientY - u.top, y = 3;
    (v < y || v > this.$canvas.width - y || T < y || T > this.$canvas.height - y) && (this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", $));
  }, f = () => {
    this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", $), document.removeEventListener("mouseup", f), W(this, J, !1), j(this, it, lt).call(this, "dragged", n);
  };
  this.$canvas.addEventListener("mousemove", m), this.$canvas.addEventListener("mousemove", $), document.addEventListener("mouseup", f);
}, pt = new WeakSet(), _t = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((n) => n === i(this, M));
  t.deltaY < 0 && e > 0 ? (W(this, M, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: i(this, U),
    areas: i(this, N),
    _privateFlag: !0
  }), j(this, it, lt).call(this, "zoom", e - 1)) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (W(this, M, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: i(this, U),
    areas: i(this, N),
    _privateFlag: !0
  }), j(this, it, lt).call(this, "zoom", e + 1));
}, $t = new WeakSet(), Et = function(t) {
  t.preventDefault(), W(this, J, !0), W(this, K, t.touches[0].clientX), t.touches.length === 2 && W(this, q, Ct(t.touches));
}, vt = new WeakSet(), kt = function(t) {
  if (t.preventDefault(), !i(this, J))
    return;
  if (t.touches.length === 2 && i(this, q) !== null) {
    const $ = Ct(t.touches), f = Math.abs(i(this, q) - $) >= 35;
    if (!f)
      return;
    let l = this.cfg.timeSpacingList.findIndex((u) => u === i(this, M));
    if ($ < i(this, q) ? l += 1 : l -= 1, l < 0 || l > this.cfg.timeSpacingList.length - 1)
      return;
    W(this, M, this.cfg.timeSpacingList[l]), f && W(this, q, $), this.draw({
      currentTime: i(this, U),
      areas: i(this, N),
      _privateFlag: !0
    });
    return;
  }
  if (i(this, K) === null)
    return;
  const e = t.touches[0], n = e.clientX - i(this, K), m = Math.round(i(this, U) - i(this, M) / this.cfg.scaleSpacing * n);
  W(this, K, e.clientX), this.draw({
    currentTime: m,
    areas: i(this, N),
    _privateFlag: !0
  });
}, Yt = new WeakSet(), It = function(t) {
  i(this, J) && (W(this, J, !1), W(this, K, null), t.touches.length < 2 && W(this, q, null), j(this, it, lt).call(this, "dragged", i(this, U)));
}, Mt = new WeakSet(), Pt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || W(this, et, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: i(this, U),
    areas: i(this, N)
  }));
}, Dt = new WeakSet(), Ut = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, Tt = new WeakSet(), Xt = function() {
  const t = () => i(this, M) < 1e3 ? `${i(this, M)}ms` : i(this, M) < 6e4 ? `${Math.round(i(this, M) / 100) / 10}sec` : i(this, M) < 36e5 ? `${Math.round(i(this, M) / 100 / 60) / 10}min` : i(this, M) < 864e5 ? `${Math.round(i(this, M) / 100 / 60 / 60) / 10}hours` : i(this, M) < 6048e5 ? `${Math.round(i(this, M) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(i(this, M) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  if (this.cfg.theme === "modern") {
    const n = `[—] ${i(this, M) < 1e3 ? `${i(this, M)}MS` : i(this, M) < 6e4 ? `${Math.round(i(this, M) / 100) / 10}SEC` : i(this, M) < 36e5 ? `${Math.round(i(this, M) / 100 / 60) / 10}MIN` : i(this, M) < 864e5 ? `${Math.round(i(this, M) / 100 / 60 / 60) / 10}HR` : i(this, M) < 6048e5 ? `${Math.round(i(this, M) / 100 / 60 / 60 / 24) / 10}DAY` : `${Math.round(i(this, M) / 100 / 60 / 60 / 24 / 7) / 10}WK`}`;
    this.ctx.font = `10px ${this.cfg.fontFamily}`;
    const m = this.ctx.measureText(n).width, $ = 7, f = 3, l = 8, u = 6, v = m + $ * 2, T = 10 + f * 2;
    this.ctx.fillStyle = "#151a20", this.ctx.fillRect(l, u, v, T), this.ctx.strokeStyle = "#232c36", this.ctx.lineWidth = 1, this.ctx.strokeRect(l + 0.5, u + 0.5, v - 1, T - 1), i(this, rt).call(this, {
      x: l + $,
      y: u + f,
      text: n,
      align: "left",
      baseLine: "top",
      fontSize: "10px"
    });
  } else
    i(this, rt).call(this, {
      x: this.cfg.scaleSpacing + 12,
      y: 9,
      text: t(),
      align: "left",
      baseLine: "middle"
    }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, xt = new WeakMap(), rt = new WeakMap(), at = new WeakMap(), it = new WeakSet(), lt = function(...t) {
  i(this, nt).emit(...t);
};
export {
  ee as default,
  ut as format
};
