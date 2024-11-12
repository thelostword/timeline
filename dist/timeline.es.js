var Et = Object.defineProperty;
var xt = (a) => {
  throw TypeError(a);
};
var Wt = (a, t, e) => t in a ? Et(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var ht = (a, t, e) => Wt(a, typeof t != "symbol" ? t + "" : t, e), $t = (a, t, e) => t.has(a) || xt("Cannot " + e);
var o = (a, t, e) => ($t(a, t, "read from private field"), e ? e.call(a) : t.get(a)), A = (a, t, e) => t.has(a) ? xt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), z = (a, t, e, n) => ($t(a, t, "write to private field"), n ? n.call(a, e) : t.set(a, e), e), N = (a, t, e) => ($t(a, t, "access private method"), e);
function Pt(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, e) {
    var n = a.get(t);
    n ? n.push(e) : a.set(t, [e]);
  }, off: function(t, e) {
    var n = a.get(t);
    n && (e ? n.splice(n.indexOf(e) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, e) {
    var n = a.get(t);
    n && n.slice().map(function(g) {
      g(e);
    }), (n = a.get("*")) && n.slice().map(function(g) {
      g(t, e);
    });
  } };
}
var pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mt(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var St = { exports: {} };
(function(a, t) {
  (function(e, n) {
    a.exports = n();
  })(pt, function() {
    var e = 1e3, n = 6e4, g = 36e5, p = "millisecond", l = "second", m = "minute", u = "hour", y = "day", H = "week", D = "month", S = "quarter", T = "year", v = "date", h = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, E = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, L = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(f) {
      var r = ["th", "st", "nd", "rd"], i = f % 100;
      return "[" + f + (r[(i - 20) % 10] || r[i] || r[0]) + "]";
    } }, Y = function(f, r, i) {
      var c = String(f);
      return !c || c.length >= r ? f : "" + Array(r + 1 - c.length).join(i) + f;
    }, k = { s: Y, z: function(f) {
      var r = -f.utcOffset(), i = Math.abs(r), c = Math.floor(i / 60), s = i % 60;
      return (r <= 0 ? "+" : "-") + Y(c, 2, "0") + ":" + Y(s, 2, "0");
    }, m: function f(r, i) {
      if (r.date() < i.date()) return -f(i, r);
      var c = 12 * (i.year() - r.year()) + (i.month() - r.month()), s = r.clone().add(c, D), d = i - s < 0, $ = r.clone().add(c + (d ? -1 : 1), D);
      return +(-(c + (i - s) / (d ? s - $ : $ - s)) || 0);
    }, a: function(f) {
      return f < 0 ? Math.ceil(f) || 0 : Math.floor(f);
    }, p: function(f) {
      return { M: D, y: T, w: H, d: y, D: v, h: u, m, s: l, ms: p, Q: S }[f] || String(f || "").toLowerCase().replace(/s$/, "");
    }, u: function(f) {
      return f === void 0;
    } }, b = "en", W = {};
    W[b] = L;
    var I = "$isDayjsObject", B = function(f) {
      return f instanceof lt || !(!f || !f[I]);
    }, j = function f(r, i, c) {
      var s;
      if (!r) return b;
      if (typeof r == "string") {
        var d = r.toLowerCase();
        W[d] && (s = d), i && (W[d] = i, s = d);
        var $ = r.split("-");
        if (!s && $.length > 1) return f($[0]);
      } else {
        var w = r.name;
        W[w] = r, s = w;
      }
      return !c && s && (b = s), s || !c && b;
    }, O = function(f, r) {
      if (B(f)) return f.clone();
      var i = typeof r == "object" ? r : {};
      return i.date = f, i.args = arguments, new lt(i);
    }, M = k;
    M.l = j, M.i = B, M.w = function(f, r) {
      return O(f, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
    };
    var lt = function() {
      function f(i) {
        this.$L = j(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[I] = !0;
      }
      var r = f.prototype;
      return r.parse = function(i) {
        this.$d = function(c) {
          var s = c.date, d = c.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (M.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var $ = s.match(x);
            if ($) {
              var w = $[2] - 1 || 0, _ = ($[7] || "0").substring(0, 3);
              return d ? new Date(Date.UTC($[1], w, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, _)) : new Date($[1], w, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, _);
            }
          }
          return new Date(s);
        }(i), this.init();
      }, r.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, r.$utils = function() {
        return M;
      }, r.isValid = function() {
        return this.$d.toString() !== h;
      }, r.isSame = function(i, c) {
        var s = O(i);
        return this.startOf(c) <= s && s <= this.endOf(c);
      }, r.isAfter = function(i, c) {
        return O(i) < this.startOf(c);
      }, r.isBefore = function(i, c) {
        return this.endOf(c) < O(i);
      }, r.$g = function(i, c, s) {
        return M.u(i) ? this[c] : this.set(s, i);
      }, r.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, r.valueOf = function() {
        return this.$d.getTime();
      }, r.startOf = function(i, c) {
        var s = this, d = !!M.u(c) || c, $ = M.p(i), w = function(et, Z) {
          var G = M.w(s.$u ? Date.UTC(s.$y, Z, et) : new Date(s.$y, Z, et), s);
          return d ? G : G.endOf(y);
        }, _ = function(et, Z) {
          return M.w(s.toDate()[et].apply(s.toDate("s"), (d ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), s);
        }, P = this.$W, U = this.$M, R = this.$D, st = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case T:
            return d ? w(1, 0) : w(31, 11);
          case D:
            return d ? w(1, U) : w(0, U + 1);
          case H:
            var tt = this.$locale().weekStart || 0, at = (P < tt ? P + 7 : P) - tt;
            return w(d ? R - at : R + (6 - at), U);
          case y:
          case v:
            return _(st + "Hours", 0);
          case u:
            return _(st + "Minutes", 1);
          case m:
            return _(st + "Seconds", 2);
          case l:
            return _(st + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, r.endOf = function(i) {
        return this.startOf(i, !1);
      }, r.$set = function(i, c) {
        var s, d = M.p(i), $ = "set" + (this.$u ? "UTC" : ""), w = (s = {}, s[y] = $ + "Date", s[v] = $ + "Date", s[D] = $ + "Month", s[T] = $ + "FullYear", s[u] = $ + "Hours", s[m] = $ + "Minutes", s[l] = $ + "Seconds", s[p] = $ + "Milliseconds", s)[d], _ = d === y ? this.$D + (c - this.$W) : c;
        if (d === D || d === T) {
          var P = this.clone().set(v, 1);
          P.$d[w](_), P.init(), this.$d = P.set(v, Math.min(this.$D, P.daysInMonth())).$d;
        } else w && this.$d[w](_);
        return this.init(), this;
      }, r.set = function(i, c) {
        return this.clone().$set(i, c);
      }, r.get = function(i) {
        return this[M.p(i)]();
      }, r.add = function(i, c) {
        var s, d = this;
        i = Number(i);
        var $ = M.p(c), w = function(U) {
          var R = O(d);
          return M.w(R.date(R.date() + Math.round(U * i)), d);
        };
        if ($ === D) return this.set(D, this.$M + i);
        if ($ === T) return this.set(T, this.$y + i);
        if ($ === y) return w(1);
        if ($ === H) return w(7);
        var _ = (s = {}, s[m] = n, s[u] = g, s[l] = e, s)[$] || 1, P = this.$d.getTime() + i * _;
        return M.w(P, this);
      }, r.subtract = function(i, c) {
        return this.add(-1 * i, c);
      }, r.format = function(i) {
        var c = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || h;
        var d = i || "YYYY-MM-DDTHH:mm:ssZ", $ = M.z(this), w = this.$H, _ = this.$m, P = this.$M, U = s.weekdays, R = s.months, st = s.meridiem, tt = function(Z, G, ot, mt) {
          return Z && (Z[G] || Z(c, d)) || ot[G].slice(0, mt);
        }, at = function(Z) {
          return M.s(w % 12 || 12, Z, "0");
        }, et = st || function(Z, G, ot) {
          var mt = Z < 12 ? "AM" : "PM";
          return ot ? mt.toLowerCase() : mt;
        };
        return d.replace(E, function(Z, G) {
          return G || function(ot) {
            switch (ot) {
              case "YY":
                return String(c.$y).slice(-2);
              case "YYYY":
                return M.s(c.$y, 4, "0");
              case "M":
                return P + 1;
              case "MM":
                return M.s(P + 1, 2, "0");
              case "MMM":
                return tt(s.monthsShort, P, R, 3);
              case "MMMM":
                return tt(R, P);
              case "D":
                return c.$D;
              case "DD":
                return M.s(c.$D, 2, "0");
              case "d":
                return String(c.$W);
              case "dd":
                return tt(s.weekdaysMin, c.$W, U, 2);
              case "ddd":
                return tt(s.weekdaysShort, c.$W, U, 3);
              case "dddd":
                return U[c.$W];
              case "H":
                return String(w);
              case "HH":
                return M.s(w, 2, "0");
              case "h":
                return at(1);
              case "hh":
                return at(2);
              case "a":
                return et(w, _, !0);
              case "A":
                return et(w, _, !1);
              case "m":
                return String(_);
              case "mm":
                return M.s(_, 2, "0");
              case "s":
                return String(c.$s);
              case "ss":
                return M.s(c.$s, 2, "0");
              case "SSS":
                return M.s(c.$ms, 3, "0");
              case "Z":
                return $;
            }
            return null;
          }(Z) || $.replace(":", "");
        });
      }, r.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, r.diff = function(i, c, s) {
        var d, $ = this, w = M.p(c), _ = O(i), P = (_.utcOffset() - this.utcOffset()) * n, U = this - _, R = function() {
          return M.m($, _);
        };
        switch (w) {
          case T:
            d = R() / 12;
            break;
          case D:
            d = R();
            break;
          case S:
            d = R() / 3;
            break;
          case H:
            d = (U - P) / 6048e5;
            break;
          case y:
            d = (U - P) / 864e5;
            break;
          case u:
            d = U / g;
            break;
          case m:
            d = U / n;
            break;
          case l:
            d = U / e;
            break;
          default:
            d = U;
        }
        return s ? d : M.a(d);
      }, r.daysInMonth = function() {
        return this.endOf(D).$D;
      }, r.$locale = function() {
        return W[this.$L];
      }, r.locale = function(i, c) {
        if (!i) return this.$L;
        var s = this.clone(), d = j(i, c, !0);
        return d && (s.$L = d), s;
      }, r.clone = function() {
        return M.w(this.$d, this);
      }, r.toDate = function() {
        return new Date(this.valueOf());
      }, r.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, r.toISOString = function() {
        return this.$d.toISOString();
      }, r.toString = function() {
        return this.$d.toUTCString();
      }, f;
    }(), Tt = lt.prototype;
    return O.prototype = Tt, [["$ms", p], ["$s", l], ["$m", m], ["$H", u], ["$W", y], ["$M", D], ["$y", T], ["$D", v]].forEach(function(f) {
      Tt[f[1]] = function(r) {
        return this.$g(r, f[0], f[1]);
      };
    }), O.extend = function(f, r) {
      return f.$i || (f(r, lt, O), f.$i = !0), O;
    }, O.locale = j, O.isDayjs = B, O.unix = function(f) {
      return O(1e3 * f);
    }, O.en = W[b], O.Ls = W, O.p = {}, O;
  });
})(St);
var kt = St.exports;
const Dt = /* @__PURE__ */ Mt(kt);
var Yt = { exports: {} };
(function(a, t) {
  (function(e, n) {
    a.exports = n();
  })(pt, function() {
    var e = "minute", n = /[+-]\d\d(?::?\d\d)?/g, g = /([+-]|\d\d)/g;
    return function(p, l, m) {
      var u = l.prototype;
      m.utc = function(h) {
        var x = { date: h, utc: !0, args: arguments };
        return new l(x);
      }, u.utc = function(h) {
        var x = m(this.toDate(), { locale: this.$L, utc: !0 });
        return h ? x.add(this.utcOffset(), e) : x;
      }, u.local = function() {
        return m(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var y = u.parse;
      u.parse = function(h) {
        h.utc && (this.$u = !0), this.$utils().u(h.$offset) || (this.$offset = h.$offset), y.call(this, h);
      };
      var H = u.init;
      u.init = function() {
        if (this.$u) {
          var h = this.$d;
          this.$y = h.getUTCFullYear(), this.$M = h.getUTCMonth(), this.$D = h.getUTCDate(), this.$W = h.getUTCDay(), this.$H = h.getUTCHours(), this.$m = h.getUTCMinutes(), this.$s = h.getUTCSeconds(), this.$ms = h.getUTCMilliseconds();
        } else H.call(this);
      };
      var D = u.utcOffset;
      u.utcOffset = function(h, x) {
        var E = this.$utils().u;
        if (E(h)) return this.$u ? 0 : E(this.$offset) ? D.call(this) : this.$offset;
        if (typeof h == "string" && (h = function(b) {
          b === void 0 && (b = "");
          var W = b.match(n);
          if (!W) return null;
          var I = ("" + W[0]).match(g) || ["-", 0, 0], B = I[0], j = 60 * +I[1] + +I[2];
          return j === 0 ? 0 : B === "+" ? j : -j;
        }(h), h === null)) return this;
        var L = Math.abs(h) <= 16 ? 60 * h : h, Y = this;
        if (x) return Y.$offset = L, Y.$u = h === 0, Y;
        if (h !== 0) {
          var k = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (Y = this.local().add(L + k, e)).$offset = L, Y.$x.$localOffset = k;
        } else Y = this.utc();
        return Y;
      };
      var S = u.format;
      u.format = function(h) {
        var x = h || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return S.call(this, x);
      }, u.valueOf = function() {
        var h = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * h;
      }, u.isUTC = function() {
        return !!this.$u;
      }, u.toISOString = function() {
        return this.toDate().toISOString();
      }, u.toString = function() {
        return this.toDate().toUTCString();
      };
      var T = u.toDate;
      u.toDate = function(h) {
        return h === "s" && this.$offset ? m(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : T.call(this);
      };
      var v = u.diff;
      u.diff = function(h, x, E) {
        if (h && this.$u === h.$u) return v.call(this, h, x, E);
        var L = this.local(), Y = m(h).local();
        return v.call(L, Y, x, E);
      };
    };
  });
})(Yt);
var It = Yt.exports;
const Ut = /* @__PURE__ */ Mt(It);
var wt = { exports: {} };
(function(a, t) {
  (function(e, n) {
    a.exports = n();
  })(pt, function() {
    var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, n = {};
    return function(g, p, l) {
      var m, u = function(S, T, v) {
        v === void 0 && (v = {});
        var h = new Date(S), x = function(E, L) {
          L === void 0 && (L = {});
          var Y = L.timeZoneName || "short", k = E + "|" + Y, b = n[k];
          return b || (b = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: E, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: Y }), n[k] = b), b;
        }(T, v);
        return x.formatToParts(h);
      }, y = function(S, T) {
        for (var v = u(S, T), h = [], x = 0; x < v.length; x += 1) {
          var E = v[x], L = E.type, Y = E.value, k = e[L];
          k >= 0 && (h[k] = parseInt(Y, 10));
        }
        var b = h[3], W = b === 24 ? 0 : b, I = h[0] + "-" + h[1] + "-" + h[2] + " " + W + ":" + h[4] + ":" + h[5] + ":000", B = +S;
        return (l.utc(I).valueOf() - (B -= B % 1e3)) / 6e4;
      }, H = p.prototype;
      H.tz = function(S, T) {
        S === void 0 && (S = m);
        var v, h = this.utcOffset(), x = this.toDate(), E = x.toLocaleString("en-US", { timeZone: S }), L = Math.round((x - new Date(E)) / 1e3 / 60), Y = 15 * -Math.round(x.getTimezoneOffset() / 15) - L;
        if (!Number(Y)) v = this.utcOffset(0, T);
        else if (v = l(E, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(Y, !0), T) {
          var k = v.utcOffset();
          v = v.add(h - k, "minute");
        }
        return v.$x.$timezone = S, v;
      }, H.offsetName = function(S) {
        var T = this.$x.$timezone || l.tz.guess(), v = u(this.valueOf(), T, { timeZoneName: S }).find(function(h) {
          return h.type.toLowerCase() === "timezonename";
        });
        return v && v.value;
      };
      var D = H.startOf;
      H.startOf = function(S, T) {
        if (!this.$x || !this.$x.$timezone) return D.call(this, S, T);
        var v = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return D.call(v, S, T).tz(this.$x.$timezone, !0);
      }, l.tz = function(S, T, v) {
        var h = v && T, x = v || T || m, E = y(+l(), x);
        if (typeof S != "string") return l(S).tz(x);
        var L = function(W, I, B) {
          var j = W - 60 * I * 1e3, O = y(j, B);
          if (I === O) return [j, I];
          var M = y(j -= 60 * (O - I) * 1e3, B);
          return O === M ? [j, O] : [W - 60 * Math.min(O, M) * 1e3, Math.max(O, M)];
        }(l.utc(S, h).valueOf(), E, x), Y = L[0], k = L[1], b = l(Y).utcOffset(k);
        return b.$x.$timezone = x, b;
      }, l.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, l.tz.setDefault = function(S) {
        m = S;
      };
    };
  });
})(wt);
var Xt = wt.exports;
const At = /* @__PURE__ */ Mt(Xt);
Dt.extend(Ut);
Dt.extend(At);
const gt = (a, t = "MM/DD HH:mm Z", e) => Dt(a).tz(e).format(t), vt = (a, t) => {
  let e, n = 0;
  return (...g) => {
    const p = Date.now(), l = p - n;
    !n || l >= t ? (n = p, a.apply(void 0, g)) : e || (e = setTimeout(() => {
      n = p, a.apply(void 0, g), e = null;
    }, t - l));
  };
}, yt = (a) => {
  const [t, e] = [a[0], a[1]], n = e.clientX - t.clientX, g = e.clientY - t.clientY;
  return Math.sqrt(n * n + g * g);
}, Zt = (a, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const n = e.getContext("2d");
  n.fillStyle = a, n.fillRect(0, 0, 1, 1);
  const g = n.getImageData(0, 0, 1, 1).data;
  return `rgba(${g[0]}, ${g[1]}, ${g[2]}, ${t})`;
}, jt = ({ xCenterPoint: a, cfg: t, timePerPixel: e, timeSpacing: n, currentTime: g, $canvas: p, screenScaleCount: l, scaleHeight: m, startTime: u, drawLine: y, drawText: H, drawArea: D }) => {
  const S = ({ space: v, scaleTimeFormat: h, bgTimeFormat: x, pointerTimeFormat: E, timezone: L }) => {
    H({
      x: p.width - a / 10,
      y: 6,
      text: gt(g, x, L),
      fontSize: `${p.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const Y = u % n, k = Y / e;
    for (let b = 0; b < l; b++) {
      const W = b * t.scaleSpacing - k - t.pointerWidth / 2, I = u + b * n - Y;
      if (I % (n * v) === 0) {
        y({ x: W, y: m.long }), H({
          x: W,
          y: p.height - m.long - 5,
          text: gt(I, h, L),
          baseLine: "bottom"
        });
        continue;
      }
      y({ x: W, y: m.short });
    }
    y({
      x: a - t.pointerWidth / 2,
      y: p.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), D({
      startX: a - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: a + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), H({
      x: a,
      y: t.pointerDisplayHeight / 2 + 5,
      text: gt(g, E, L),
      align: "center",
      baseLine: "middle"
    });
  }, T = t.thresholdsConfig[n];
  T && S({
    space: T.space,
    scaleTimeFormat: T.scaleTimeFormat,
    bgTimeFormat: T.bgTimeFormat,
    pointerTimeFormat: T.pointerTimeFormat,
    timezone: t.timezone
  });
}, Nt = {
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
var ut, Q, nt, X, q, C, it, J, K, V, F, bt, Ot, Ct, Ht, Ft, Lt, zt, _t, dt, ft, rt, ct;
class Bt {
  constructor(t, e) {
    A(this, F);
    ht(this, "$canvas");
    ht(this, "$canvasParent");
    ht(this, "ctx");
    ht(this, "cfg");
    A(this, ut);
    A(this, Q);
    A(this, nt, Pt());
    A(this, X, 0);
    A(this, q);
    A(this, C);
    A(this, it);
    A(this, J, !1);
    A(this, K, null);
    A(this, V, null);
    // 绘制线条
    A(this, dt, ({ x: t, y: e, width: n = 1, color: g = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = g, this.ctx.lineWidth = n, this.ctx.stroke();
    });
    // 绘制文字
    A(this, ft, ({ x: t, y: e, text: n, color: g = this.cfg.textColor, fontSize: p = "11px", align: l = "center", baseLine: m = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${p} ${this.cfg.fontFamily}`, this.ctx.fillStyle = g, this.ctx.textAlign = l, this.ctx.textBaseline = m, this.ctx.fillText(n, t, e);
    });
    // 绘制区域
    A(this, rt, ({ startX: t, startY: e, endX: n, endY: g, bgColor: p }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, n - t, g - e), this.ctx.fillStyle = p, this.ctx.fill();
    });
    if (!t) throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Nt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: n, width: g, height: p, zoom: l, timeSpacingList: m, scaleHeight: u, textColor: y, bgTextColor: H } = this.cfg;
    if (H || (this.cfg.bgTextColor = Zt(y, 0.18)), l < 0 || l >= m.length || l % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${m.length - 1}, and must be an integer`);
    if (n) {
      const D = this.$canvas.parentElement;
      this.$canvasParent = D, this.$canvas.width = D.clientWidth, this.$canvas.height = D.clientHeight, new ResizeObserver(vt(N(this, F, Lt).bind(this), 200)).observe(D);
    } else
      this.$canvas.width = g, this.$canvas.height = p;
    z(this, C, m[l]), u != null && u.long && (u != null && u.short) ? z(this, it, u) : z(this, it, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", N(this, F, Ot).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", N(this, F, bt).bind(this)), this.$canvas.addEventListener("touchstart", N(this, F, Ct).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", vt(N(this, F, Ht).bind(this), 1e3 / this.cfg.fps), { passive: !1 }), this.$canvas.addEventListener("touchend", N(this, F, Ft).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: n } = {}) {
    if (o(this, J) && !n) return;
    z(this, X, t || Date.now()), z(this, q, e || []);
    const g = this.$canvas.width / 2, p = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), l = p * o(this, C), [m, u] = z(this, ut, [o(this, X) - l / 2, o(this, X) + l / 2]);
    z(this, Q, l / this.$canvas.width), N(this, F, zt).call(this), o(this, rt).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), o(this, q).forEach((y) => {
      const H = y.startTime <= m ? 0 : Math.round((y.startTime - m) / o(this, Q)), D = y.endTime >= u ? this.$canvas.width : Math.round((y.endTime - m) / o(this, Q));
      H < this.$canvas.width && D > 0 && o(this, rt).call(this, {
        startX: H,
        startY: 0,
        endX: D,
        endY: this.$canvas.height,
        bgColor: y.bgColor || this.cfg.areaBgColor
      });
    }), jt.bind(this)({
      xCenterPoint: g,
      screenScaleCount: p,
      startTime: m,
      timePerPixel: o(this, Q),
      scaleHeight: o(this, it),
      timeSpacing: o(this, C),
      currentTime: o(this, X),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: o(this, dt).bind(this),
      drawText: o(this, ft).bind(this),
      drawArea: o(this, rt).bind(this)
    }), N(this, F, _t).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return o(this, X);
  }
  // 获取时间范围
  getTimeRange() {
    return o(this, ut);
  }
  // 获取1px所占毫秒数
  getMsPerPixel() {
    return o(this, Q);
  }
  on(t, e) {
    o(this, nt).on(t, e);
  }
  off(t, e) {
    o(this, nt).off(t, e);
  }
}
ut = new WeakMap(), Q = new WeakMap(), nt = new WeakMap(), X = new WeakMap(), q = new WeakMap(), C = new WeakMap(), it = new WeakMap(), J = new WeakMap(), K = new WeakMap(), V = new WeakMap(), F = new WeakSet(), // 拖拽
bt = function(t) {
  z(this, J, !0);
  let e = t.clientX, n = o(this, X);
  const g = vt(({ clientX: m }) => {
    o(this, J) && (n = Math.round(o(this, X) - o(this, C) / this.cfg.scaleSpacing * (m - e)), e = m, this.draw({
      currentTime: n,
      areas: o(this, q),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), p = (m) => {
    const u = this.$canvas.getBoundingClientRect(), y = m.clientX - u.left, H = m.clientY - u.top, D = 3;
    (y < D || y > this.$canvas.width - D || H < D || H > this.$canvas.height - D) && (this.$canvas.removeEventListener("mousemove", g), this.$canvas.removeEventListener("mousemove", p));
  }, l = () => {
    this.$canvas.removeEventListener("mousemove", g), this.$canvas.removeEventListener("mousemove", p), document.removeEventListener("mouseup", l), z(this, J, !1), N(this, F, ct).call(this, "dragged", n);
  };
  this.$canvas.addEventListener("mousemove", g), this.$canvas.addEventListener("mousemove", p), document.addEventListener("mouseup", l);
}, // 缩放
Ot = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((n) => n === o(this, C));
  t.deltaY < 0 && e > 0 ? (z(this, C, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: o(this, X),
    areas: o(this, q),
    _privateFlag: !0
  }), N(this, F, ct).call(this, "zoom", e - 1)) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (z(this, C, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: o(this, X),
    areas: o(this, q),
    _privateFlag: !0
  }), N(this, F, ct).call(this, "zoom", e + 1));
}, // 触摸事件监听器
Ct = function(t) {
  t.preventDefault(), z(this, J, !0), z(this, K, t.touches[0].clientX), t.touches.length === 2 && z(this, V, yt(t.touches));
}, Ht = function(t) {
  if (t.preventDefault(), !o(this, J)) return;
  if (t.touches.length === 2 && o(this, V) !== null) {
    const p = yt(t.touches), l = Math.abs(o(this, V) - p) >= 35;
    if (!l) return;
    let m = this.cfg.timeSpacingList.findIndex((u) => u === o(this, C));
    if (p < o(this, V) ? m += 1 : m -= 1, m < 0 || m > this.cfg.timeSpacingList.length - 1) return;
    z(this, C, this.cfg.timeSpacingList[m]), l && z(this, V, p), this.draw({
      currentTime: o(this, X),
      areas: o(this, q),
      _privateFlag: !0
    });
    return;
  }
  if (o(this, K) === null) return;
  const e = t.touches[0], n = e.clientX - o(this, K), g = Math.round(o(this, X) - o(this, C) / this.cfg.scaleSpacing * n);
  z(this, K, e.clientX), this.draw({
    currentTime: g,
    areas: o(this, q),
    _privateFlag: !0
  });
}, Ft = function(t) {
  o(this, J) && (z(this, J, !1), z(this, K, null), t.touches.length < 2 && z(this, V, null), N(this, F, ct).call(this, "dragged", o(this, X)));
}, // 父元素size变化
Lt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || z(this, it, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: o(this, X),
    areas: o(this, q)
  }));
}, // 清空画布
zt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, // 绘制比例尺
_t = function() {
  const t = () => o(this, C) < 1e3 ? `${o(this, C)}ms` : o(this, C) < 6e4 ? `${Math.round(o(this, C) / 100) / 10}sec` : o(this, C) < 36e5 ? `${Math.round(o(this, C) / 100 / 60) / 10}min` : o(this, C) < 864e5 ? `${Math.round(o(this, C) / 100 / 60 / 60) / 10}hours` : o(this, C) < 6048e5 ? `${Math.round(o(this, C) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(o(this, C) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  o(this, ft).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, dt = new WeakMap(), ft = new WeakMap(), rt = new WeakMap(), ct = function(...t) {
  o(this, nt).emit(...t);
};
export {
  Bt as default,
  gt as format
};
