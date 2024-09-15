var St = Object.defineProperty;
var $t = (a) => {
  throw TypeError(a);
};
var Ft = (a, t, e) => t in a ? St(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var tt = (a, t, e) => Ft(a, typeof t != "symbol" ? t + "" : t, e), lt = (a, t, e) => t.has(a) || $t("Cannot " + e);
var h = (a, t, e) => (lt(a, t, "read from private field"), e ? e.call(a) : t.get(a)), O = (a, t, e) => t.has(a) ? $t("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), S = (a, t, e, r) => (lt(a, t, "write to private field"), r ? r.call(a, e) : t.set(a, e), e), _ = (a, t, e) => (lt(a, t, "access private method"), e);
function Ht(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, e) {
    var r = a.get(t);
    r ? r.push(e) : a.set(t, [e]);
  }, off: function(t, e) {
    var r = a.get(t);
    r && (e ? r.splice(r.indexOf(e) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, e) {
    var r = a.get(t);
    r && r.slice().map(function(f) {
      f(e);
    }), (r = a.get("*")) && r.slice().map(function(f) {
      f(t, e);
    });
  } };
}
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Lt(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var pt = { exports: {} };
(function(a, t) {
  (function(e, r) {
    a.exports = r();
  })(Ct, function() {
    var e = 1e3, r = 6e4, f = 36e5, d = "millisecond", m = "second", p = "minute", M = "hour", T = "day", w = "week", $ = "month", A = "quarter", H = "year", j = "date", it = "Invalid Date", ht = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ct = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, st = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var n = ["th", "st", "nd", "rd"], i = c % 100;
      return "[" + c + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, G = function(c, n, i) {
      var o = String(c);
      return !o || o.length >= n ? c : "" + Array(n + 1 - o.length).join(i) + c;
    }, U = { s: G, z: function(c) {
      var n = -c.utcOffset(), i = Math.abs(n), o = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + G(o, 2, "0") + ":" + G(s, 2, "0");
    }, m: function c(n, i) {
      if (n.date() < i.date()) return -c(i, n);
      var o = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(o, $), u = i - s < 0, l = n.clone().add(o + (u ? -1 : 1), $);
      return +(-(o + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: $, y: H, w, d: T, D: j, h: M, m: p, s: m, ms: d, Q: A }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, P = "en", k = {};
    k[P] = st;
    var mt = "$isDayjsObject", ut = function(c) {
      return c instanceof rt || !(!c || !c[mt]);
    }, nt = function c(n, i, o) {
      var s;
      if (!n) return P;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        k[u] && (s = u), i && (k[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1) return c(l[0]);
      } else {
        var v = n.name;
        k[v] = n, s = v;
      }
      return !o && s && (P = s), s || !o && P;
    }, Y = function(c, n) {
      if (ut(c)) return c.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = c, i.args = arguments, new rt(i);
    }, g = U;
    g.l = nt, g.i = ut, g.w = function(c, n) {
      return Y(c, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var rt = function() {
      function c(i) {
        this.$L = nt(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[mt] = !0;
      }
      var n = c.prototype;
      return n.parse = function(i) {
        this.$d = function(o) {
          var s = o.date, u = o.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (g.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match(ht);
            if (l) {
              var v = l[2] - 1 || 0, y = (l[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(l[1], v, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, y)) : new Date(l[1], v, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, y);
            }
          }
          return new Date(s);
        }(i), this.init();
      }, n.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, n.$utils = function() {
        return g;
      }, n.isValid = function() {
        return this.$d.toString() !== it;
      }, n.isSame = function(i, o) {
        var s = Y(i);
        return this.startOf(o) <= s && s <= this.endOf(o);
      }, n.isAfter = function(i, o) {
        return Y(i) < this.startOf(o);
      }, n.isBefore = function(i, o) {
        return this.endOf(o) < Y(i);
      }, n.$g = function(i, o, s) {
        return g.u(i) ? this[o] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, o) {
        var s = this, u = !!g.u(o) || o, l = g.p(i), v = function(N, C) {
          var z = g.w(s.$u ? Date.UTC(s.$y, C, N) : new Date(s.$y, C, N), s);
          return u ? z : z.endOf(T);
        }, y = function(N, C) {
          return g.w(s.toDate()[N].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, x = this.$W, F = this.$M, E = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case H:
            return u ? v(1, 0) : v(31, 11);
          case $:
            return u ? v(1, F) : v(0, F + 1);
          case w:
            var B = this.$locale().weekStart || 0, Q = (x < B ? x + 7 : x) - B;
            return v(u ? E - Q : E + (6 - Q), F);
          case T:
          case j:
            return y(Z + "Hours", 0);
          case M:
            return y(Z + "Minutes", 1);
          case p:
            return y(Z + "Seconds", 2);
          case m:
            return y(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, o) {
        var s, u = g.p(i), l = "set" + (this.$u ? "UTC" : ""), v = (s = {}, s[T] = l + "Date", s[j] = l + "Date", s[$] = l + "Month", s[H] = l + "FullYear", s[M] = l + "Hours", s[p] = l + "Minutes", s[m] = l + "Seconds", s[d] = l + "Milliseconds", s)[u], y = u === T ? this.$D + (o - this.$W) : o;
        if (u === $ || u === H) {
          var x = this.clone().set(j, 1);
          x.$d[v](y), x.init(), this.$d = x.set(j, Math.min(this.$D, x.daysInMonth())).$d;
        } else v && this.$d[v](y);
        return this.init(), this;
      }, n.set = function(i, o) {
        return this.clone().$set(i, o);
      }, n.get = function(i) {
        return this[g.p(i)]();
      }, n.add = function(i, o) {
        var s, u = this;
        i = Number(i);
        var l = g.p(o), v = function(F) {
          var E = Y(u);
          return g.w(E.date(E.date() + Math.round(F * i)), u);
        };
        if (l === $) return this.set($, this.$M + i);
        if (l === H) return this.set(H, this.$y + i);
        if (l === T) return v(1);
        if (l === w) return v(7);
        var y = (s = {}, s[p] = r, s[M] = f, s[m] = e, s)[l] || 1, x = this.$d.getTime() + i * y;
        return g.w(x, this);
      }, n.subtract = function(i, o) {
        return this.add(-1 * i, o);
      }, n.format = function(i) {
        var o = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || it;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = g.z(this), v = this.$H, y = this.$m, x = this.$M, F = s.weekdays, E = s.months, Z = s.meridiem, B = function(C, z, K, at) {
          return C && (C[z] || C(o, u)) || K[z].slice(0, at);
        }, Q = function(C) {
          return g.s(v % 12 || 12, C, "0");
        }, N = Z || function(C, z, K) {
          var at = C < 12 ? "AM" : "PM";
          return K ? at.toLowerCase() : at;
        };
        return u.replace(ct, function(C, z) {
          return z || function(K) {
            switch (K) {
              case "YY":
                return String(o.$y).slice(-2);
              case "YYYY":
                return g.s(o.$y, 4, "0");
              case "M":
                return x + 1;
              case "MM":
                return g.s(x + 1, 2, "0");
              case "MMM":
                return B(s.monthsShort, x, E, 3);
              case "MMMM":
                return B(E, x);
              case "D":
                return o.$D;
              case "DD":
                return g.s(o.$D, 2, "0");
              case "d":
                return String(o.$W);
              case "dd":
                return B(s.weekdaysMin, o.$W, F, 2);
              case "ddd":
                return B(s.weekdaysShort, o.$W, F, 3);
              case "dddd":
                return F[o.$W];
              case "H":
                return String(v);
              case "HH":
                return g.s(v, 2, "0");
              case "h":
                return Q(1);
              case "hh":
                return Q(2);
              case "a":
                return N(v, y, !0);
              case "A":
                return N(v, y, !1);
              case "m":
                return String(y);
              case "mm":
                return g.s(y, 2, "0");
              case "s":
                return String(o.$s);
              case "ss":
                return g.s(o.$s, 2, "0");
              case "SSS":
                return g.s(o.$ms, 3, "0");
              case "Z":
                return l;
            }
            return null;
          }(C) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, o, s) {
        var u, l = this, v = g.p(o), y = Y(i), x = (y.utcOffset() - this.utcOffset()) * r, F = this - y, E = function() {
          return g.m(l, y);
        };
        switch (v) {
          case H:
            u = E() / 12;
            break;
          case $:
            u = E();
            break;
          case A:
            u = E() / 3;
            break;
          case w:
            u = (F - x) / 6048e5;
            break;
          case T:
            u = (F - x) / 864e5;
            break;
          case M:
            u = F / f;
            break;
          case p:
            u = F / r;
            break;
          case m:
            u = F / e;
            break;
          default:
            u = F;
        }
        return s ? u : g.a(u);
      }, n.daysInMonth = function() {
        return this.endOf($).$D;
      }, n.$locale = function() {
        return k[this.$L];
      }, n.locale = function(i, o) {
        if (!i) return this.$L;
        var s = this.clone(), u = nt(i, o, !0);
        return u && (s.$L = u), s;
      }, n.clone = function() {
        return g.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), gt = rt.prototype;
    return Y.prototype = gt, [["$ms", d], ["$s", m], ["$m", p], ["$H", M], ["$W", T], ["$M", $], ["$y", H], ["$D", j]].forEach(function(c) {
      gt[c[1]] = function(n) {
        return this.$g(n, c[0], c[1]);
      };
    }), Y.extend = function(c, n) {
      return c.$i || (c(n, rt, Y), c.$i = !0), Y;
    }, Y.locale = nt, Y.isDayjs = ut, Y.unix = function(c) {
      return Y(1e3 * c);
    }, Y.en = k[P], Y.Ls = k, Y.p = {}, Y;
  });
})(pt);
var Ot = pt.exports;
const Et = /* @__PURE__ */ Lt(Ot), ft = (a, t = "MM/DD HH:mm") => Et(a).format(t), vt = (a, t) => {
  let e, r = 0;
  return (...f) => {
    const d = Date.now(), m = d - r;
    !r || m >= t ? (r = d, a.apply(void 0, f)) : e || (e = setTimeout(() => {
      r = d, a.apply(void 0, f), e = null;
    }, t - m));
  };
}, _t = (a, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const r = e.getContext("2d");
  r.fillStyle = a, r.fillRect(0, 0, 1, 1);
  const f = r.getImageData(0, 0, 1, 1).data;
  return `rgba(${f[0]}, ${f[1]}, ${f[2]}, ${t})`;
}, Wt = ({ xCenterPoint: a, cfg: t, timePerPixel: e, timeSpacing: r, currentTime: f, $canvas: d, screenScaleCount: m, scaleHeight: p, startTime: M, drawLine: T, drawText: w, drawArea: $ }) => {
  const A = ({ space: j, scaleTimeFormat: it, bgTimeFormat: ht, pointerTimeFormat: ct }) => {
    w({
      x: d.width - a / 10,
      y: 6,
      text: ft(f, ht),
      fontSize: `${d.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const st = M % r, G = st / e;
    for (let U = 0; U < m; U++) {
      const P = U * t.scaleSpacing - G - t.pointerWidth / 2, k = M + U * r - st;
      if (k % (r * j) === 0) {
        T({ x: P, y: p.long }), w({
          x: P,
          y: d.height - p.long - 5,
          text: ft(k, it),
          baseLine: "bottom"
        });
        continue;
      }
      T({ x: P, y: p.short });
    }
    T({
      x: a - t.pointerWidth / 2,
      y: d.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), $({
      startX: a - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: a + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), w({
      x: a,
      y: t.pointerDisplayHeight / 2 + 5,
      text: ft(f, ct),
      align: "center",
      baseLine: "middle"
    });
  }, H = t.thresholdsConfig[r];
  H && A({
    space: H.space,
    scaleTimeFormat: H.scaleTimeFormat,
    bgTimeFormat: H.bgTimeFormat,
    pointerTimeFormat: H.pointerTimeFormat
  });
}, kt = {
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
var J, L, X, D, R, W, I, b, Mt, Dt, Tt, yt, bt, q, wt, Yt, xt, ot, et, V, dt;
class Xt {
  constructor(t, e) {
    O(this, b);
    tt(this, "$canvas");
    tt(this, "$canvasParent");
    tt(this, "ctx");
    tt(this, "cfg");
    O(this, J, Ht());
    O(this, L, 0);
    O(this, X);
    O(this, D);
    O(this, R);
    O(this, W, !1);
    O(this, I, null);
    // Add a property to store the last pinch distance
    O(this, q, null);
    // 绘制线条
    O(this, ot, ({ x: t, y: e, width: r = 1, color: f = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = f, this.ctx.lineWidth = r, this.ctx.stroke();
    });
    // 绘制文字
    O(this, et, ({ x: t, y: e, text: r, color: f = this.cfg.textColor, fontSize: d = "11px", align: m = "center", baseLine: p = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${d} ${this.cfg.fontFamily}`, this.ctx.fillStyle = f, this.ctx.textAlign = m, this.ctx.textBaseline = p, this.ctx.fillText(r, t, e);
    });
    // 绘制区域
    O(this, V, ({ startX: t, startY: e, endX: r, endY: f, bgColor: d }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, r - t, f - e), this.ctx.fillStyle = d, this.ctx.fill();
    });
    if (!t) throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...kt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: r, width: f, height: d, zoom: m, timeSpacingList: p, scaleHeight: M, textColor: T, bgTextColor: w } = this.cfg;
    if (w || (this.cfg.bgTextColor = _t(T, 0.18)), m < 0 || m >= p.length || m % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (r) {
      const $ = this.$canvas.parentElement;
      this.$canvasParent = $, this.$canvas.width = $.clientWidth, this.$canvas.height = $.clientHeight, new ResizeObserver(vt(_(this, b, wt).bind(this), 200)).observe($);
    } else
      this.$canvas.width = f, this.$canvas.height = d;
    S(this, D, p[m]), M != null && M.long && (M != null && M.short) ? S(this, R, M) : S(this, R, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", _(this, b, bt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", _(this, b, Mt).bind(this)), this.$canvas.addEventListener("touchstart", _(this, b, Dt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", _(this, b, Tt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchend", _(this, b, yt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: r } = {}) {
    if (h(this, W) && !r) return;
    S(this, L, t || Date.now()), S(this, X, e || []);
    const f = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), d = f * h(this, D), m = h(this, L) - d / 2, p = h(this, L) + d / 2, M = this.$canvas.width / 2, T = d / this.$canvas.width;
    _(this, b, Yt).call(this), h(this, V).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), h(this, X).forEach((w) => {
      const $ = w.startTime <= m ? 0 : Math.round((w.startTime - m) / T), A = w.endTime >= p ? this.$canvas.width : Math.round((w.endTime - m) / T);
      $ < this.$canvas.width && A > 0 && h(this, V).call(this, {
        startX: $,
        startY: 0,
        endX: A,
        endY: this.$canvas.height,
        bgColor: w.bgColor || this.cfg.areaBgColor
      });
    }), Wt.bind(this)({
      xCenterPoint: M,
      screenScaleCount: f,
      startTime: m,
      timePerPixel: T,
      scaleHeight: h(this, R),
      timeSpacing: h(this, D),
      currentTime: h(this, L),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: h(this, ot).bind(this),
      drawText: h(this, et).bind(this),
      drawArea: h(this, V).bind(this)
    }), _(this, b, xt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return h(this, L);
  }
  on(t, e) {
    h(this, J).on(t, e);
  }
  off(t, e) {
    h(this, J).off(t, e);
  }
}
J = new WeakMap(), L = new WeakMap(), X = new WeakMap(), D = new WeakMap(), R = new WeakMap(), W = new WeakMap(), I = new WeakMap(), b = new WeakSet(), // 拖拽
Mt = function(t) {
  S(this, W, !0);
  let e = t.clientX, r = h(this, L);
  const f = vt(({ clientX: p }) => {
    h(this, W) && (r = Math.round(h(this, L) - h(this, D) / this.cfg.scaleSpacing * (p - e)), e = p, this.draw({
      currentTime: r,
      areas: h(this, X),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), d = (p) => {
    const M = this.$canvas.getBoundingClientRect(), T = p.clientX - M.left, w = p.clientY - M.top, $ = 3;
    (T < $ || T > this.$canvas.width - $ || w < $ || w > this.$canvas.height - $) && (this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", d));
  }, m = () => {
    this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", d), document.removeEventListener("mouseup", m), S(this, W, !1), _(this, b, dt).call(this, "dragged", r);
  };
  this.$canvas.addEventListener("mousemove", f), this.$canvas.addEventListener("mousemove", d), document.addEventListener("mouseup", m);
}, // Touch event handlers
Dt = function(t) {
  t.preventDefault(), S(this, W, !0), S(this, I, t.touches[0].clientX);
}, Tt = function(t) {
  if (t.preventDefault(), !h(this, W) || h(this, I) === null) return;
  const e = t.touches[0], r = e.clientX - h(this, I), f = Math.round(h(this, L) - h(this, D) / this.cfg.scaleSpacing * r);
  S(this, I, e.clientX), this.draw({
    currentTime: f,
    areas: h(this, X),
    _privateFlag: !0
  });
}, yt = function() {
  h(this, W) && (S(this, W, !1), S(this, I, null), _(this, b, dt).call(this, "dragged", h(this, L)));
}, // 缩放
bt = function(t) {
  t.preventDefault();
  let e = 0;
  if (t instanceof WheelEvent)
    e = t.deltaY;
  else if (t instanceof TouchEvent && t.touches.length === 2) {
    const f = t.touches[0], d = t.touches[1], m = Math.hypot(f.clientX - d.clientX, f.clientY - d.clientY);
    h(this, q) && (e = h(this, q) - m), S(this, q, m);
  } else
    return;
  const r = this.cfg.timeSpacingList.findIndex((f) => f === h(this, D));
  if (e < 0 && r > 0)
    S(this, D, this.cfg.timeSpacingList[r - 1]);
  else if (e > 0 && r < this.cfg.timeSpacingList.length - 1)
    S(this, D, this.cfg.timeSpacingList[r + 1]);
  else
    return;
  this.draw({
    currentTime: h(this, L),
    areas: h(this, X),
    _privateFlag: !0
  });
}, q = new WeakMap(), // 父元素size变化
wt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || S(this, R, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: h(this, L),
    areas: h(this, X)
  }));
}, // 清空画布
Yt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, // 绘制比例尺
xt = function() {
  const t = () => h(this, D) < 1e3 ? `${h(this, D)}ms` : h(this, D) < 6e4 ? `${Math.round(h(this, D) / 100) / 10}sec` : h(this, D) < 36e5 ? `${Math.round(h(this, D) / 100 / 60) / 10}min` : h(this, D) < 864e5 ? `${Math.round(h(this, D) / 100 / 60 / 60) / 10}hours` : h(this, D) < 6048e5 ? `${Math.round(h(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(h(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  h(this, et).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ot = new WeakMap(), et = new WeakMap(), V = new WeakMap(), dt = function(...t) {
  h(this, J).emit(...t);
};
export {
  Xt as default,
  ft as format
};
