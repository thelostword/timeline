var xt = Object.defineProperty;
var gt = (r) => {
  throw TypeError(r);
};
var St = (r, t, e) => t in r ? xt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var K = (r, t, e) => St(r, typeof t != "symbol" ? t + "" : t, e), ut = (r, t, e) => t.has(r) || gt("Cannot " + e);
var h = (r, t, e) => (ut(r, t, "read from private field"), e ? e.call(r) : t.get(r)), _ = (r, t, e) => t.has(r) ? gt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), F = (r, t, e, o) => (ut(r, t, "write to private field"), o ? o.call(r, e) : t.set(r, e), e), E = (r, t, e) => (ut(r, t, "access private method"), e);
function Ft(r) {
  return { all: r = r || /* @__PURE__ */ new Map(), on: function(t, e) {
    var o = r.get(t);
    o ? o.push(e) : r.set(t, [e]);
  }, off: function(t, e) {
    var o = r.get(t);
    o && (e ? o.splice(o.indexOf(e) >>> 0, 1) : r.set(t, []));
  }, emit: function(t, e) {
    var o = r.get(t);
    o && o.slice().map(function(d) {
      d(e);
    }), (o = r.get("*")) && o.slice().map(function(d) {
      d(t, e);
    });
  } };
}
var Ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ct(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var vt = { exports: {} };
(function(r, t) {
  (function(e, o) {
    r.exports = o();
  })(Ht, function() {
    var e = 1e3, o = 6e4, d = 36e5, m = "millisecond", g = "second", p = "minute", M = "hour", T = "day", w = "week", $ = "month", X = "quarter", C = "year", j = "date", et = "Invalid Date", ot = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ht = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, it = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var n = ["th", "st", "nd", "rd"], i = c % 100;
      return "[" + c + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, V = function(c, n, i) {
      var a = String(c);
      return !a || a.length >= n ? c : "" + Array(n + 1 - a.length).join(i) + c;
    }, U = { s: V, z: function(c) {
      var n = -c.utcOffset(), i = Math.abs(n), a = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + V(a, 2, "0") + ":" + V(s, 2, "0");
    }, m: function c(n, i) {
      if (n.date() < i.date()) return -c(i, n);
      var a = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(a, $), u = i - s < 0, l = n.clone().add(a + (u ? -1 : 1), $);
      return +(-(a + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: $, y: C, w, d: T, D: j, h: M, m: p, s: g, ms: m, Q: X }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, A = "en", k = {};
    k[A] = it;
    var ft = "$isDayjsObject", ct = function(c) {
      return c instanceof nt || !(!c || !c[ft]);
    }, st = function c(n, i, a) {
      var s;
      if (!n) return A;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        k[u] && (s = u), i && (k[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1) return c(l[0]);
      } else {
        var v = n.name;
        k[v] = n, s = v;
      }
      return !a && s && (A = s), s || !a && A;
    }, Y = function(c, n) {
      if (ct(c)) return c.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = c, i.args = arguments, new nt(i);
    }, f = U;
    f.l = st, f.i = ct, f.w = function(c, n) {
      return Y(c, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var nt = function() {
      function c(i) {
        this.$L = st(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[ft] = !0;
      }
      var n = c.prototype;
      return n.parse = function(i) {
        this.$d = function(a) {
          var s = a.date, u = a.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (f.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match(ot);
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
        return f;
      }, n.isValid = function() {
        return this.$d.toString() !== et;
      }, n.isSame = function(i, a) {
        var s = Y(i);
        return this.startOf(a) <= s && s <= this.endOf(a);
      }, n.isAfter = function(i, a) {
        return Y(i) < this.startOf(a);
      }, n.isBefore = function(i, a) {
        return this.endOf(a) < Y(i);
      }, n.$g = function(i, a, s) {
        return f.u(i) ? this[a] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, a) {
        var s = this, u = !!f.u(a) || a, l = f.p(i), v = function(N, L) {
          var z = f.w(s.$u ? Date.UTC(s.$y, L, N) : new Date(s.$y, L, N), s);
          return u ? z : z.endOf(T);
        }, y = function(N, L) {
          return f.w(s.toDate()[N].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(L)), s);
        }, x = this.$W, S = this.$M, O = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case C:
            return u ? v(1, 0) : v(31, 11);
          case $:
            return u ? v(1, S) : v(0, S + 1);
          case w:
            var B = this.$locale().weekStart || 0, G = (x < B ? x + 7 : x) - B;
            return v(u ? O - G : O + (6 - G), S);
          case T:
          case j:
            return y(Z + "Hours", 0);
          case M:
            return y(Z + "Minutes", 1);
          case p:
            return y(Z + "Seconds", 2);
          case g:
            return y(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, a) {
        var s, u = f.p(i), l = "set" + (this.$u ? "UTC" : ""), v = (s = {}, s[T] = l + "Date", s[j] = l + "Date", s[$] = l + "Month", s[C] = l + "FullYear", s[M] = l + "Hours", s[p] = l + "Minutes", s[g] = l + "Seconds", s[m] = l + "Milliseconds", s)[u], y = u === T ? this.$D + (a - this.$W) : a;
        if (u === $ || u === C) {
          var x = this.clone().set(j, 1);
          x.$d[v](y), x.init(), this.$d = x.set(j, Math.min(this.$D, x.daysInMonth())).$d;
        } else v && this.$d[v](y);
        return this.init(), this;
      }, n.set = function(i, a) {
        return this.clone().$set(i, a);
      }, n.get = function(i) {
        return this[f.p(i)]();
      }, n.add = function(i, a) {
        var s, u = this;
        i = Number(i);
        var l = f.p(a), v = function(S) {
          var O = Y(u);
          return f.w(O.date(O.date() + Math.round(S * i)), u);
        };
        if (l === $) return this.set($, this.$M + i);
        if (l === C) return this.set(C, this.$y + i);
        if (l === T) return v(1);
        if (l === w) return v(7);
        var y = (s = {}, s[p] = o, s[M] = d, s[g] = e, s)[l] || 1, x = this.$d.getTime() + i * y;
        return f.w(x, this);
      }, n.subtract = function(i, a) {
        return this.add(-1 * i, a);
      }, n.format = function(i) {
        var a = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || et;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = f.z(this), v = this.$H, y = this.$m, x = this.$M, S = s.weekdays, O = s.months, Z = s.meridiem, B = function(L, z, Q, rt) {
          return L && (L[z] || L(a, u)) || Q[z].slice(0, rt);
        }, G = function(L) {
          return f.s(v % 12 || 12, L, "0");
        }, N = Z || function(L, z, Q) {
          var rt = L < 12 ? "AM" : "PM";
          return Q ? rt.toLowerCase() : rt;
        };
        return u.replace(ht, function(L, z) {
          return z || function(Q) {
            switch (Q) {
              case "YY":
                return String(a.$y).slice(-2);
              case "YYYY":
                return f.s(a.$y, 4, "0");
              case "M":
                return x + 1;
              case "MM":
                return f.s(x + 1, 2, "0");
              case "MMM":
                return B(s.monthsShort, x, O, 3);
              case "MMMM":
                return B(O, x);
              case "D":
                return a.$D;
              case "DD":
                return f.s(a.$D, 2, "0");
              case "d":
                return String(a.$W);
              case "dd":
                return B(s.weekdaysMin, a.$W, S, 2);
              case "ddd":
                return B(s.weekdaysShort, a.$W, S, 3);
              case "dddd":
                return S[a.$W];
              case "H":
                return String(v);
              case "HH":
                return f.s(v, 2, "0");
              case "h":
                return G(1);
              case "hh":
                return G(2);
              case "a":
                return N(v, y, !0);
              case "A":
                return N(v, y, !1);
              case "m":
                return String(y);
              case "mm":
                return f.s(y, 2, "0");
              case "s":
                return String(a.$s);
              case "ss":
                return f.s(a.$s, 2, "0");
              case "SSS":
                return f.s(a.$ms, 3, "0");
              case "Z":
                return l;
            }
            return null;
          }(L) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, a, s) {
        var u, l = this, v = f.p(a), y = Y(i), x = (y.utcOffset() - this.utcOffset()) * o, S = this - y, O = function() {
          return f.m(l, y);
        };
        switch (v) {
          case C:
            u = O() / 12;
            break;
          case $:
            u = O();
            break;
          case X:
            u = O() / 3;
            break;
          case w:
            u = (S - x) / 6048e5;
            break;
          case T:
            u = (S - x) / 864e5;
            break;
          case M:
            u = S / d;
            break;
          case p:
            u = S / o;
            break;
          case g:
            u = S / e;
            break;
          default:
            u = S;
        }
        return s ? u : f.a(u);
      }, n.daysInMonth = function() {
        return this.endOf($).$D;
      }, n.$locale = function() {
        return k[this.$L];
      }, n.locale = function(i, a) {
        if (!i) return this.$L;
        var s = this.clone(), u = st(i, a, !0);
        return u && (s.$L = u), s;
      }, n.clone = function() {
        return f.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), mt = nt.prototype;
    return Y.prototype = mt, [["$ms", m], ["$s", g], ["$m", p], ["$H", M], ["$W", T], ["$M", $], ["$y", C], ["$D", j]].forEach(function(c) {
      mt[c[1]] = function(n) {
        return this.$g(n, c[0], c[1]);
      };
    }), Y.extend = function(c, n) {
      return c.$i || (c(n, nt, Y), c.$i = !0), Y;
    }, Y.locale = st, Y.isDayjs = ct, Y.unix = function(c) {
      return Y(1e3 * c);
    }, Y.en = k[A], Y.Ls = k, Y.p = {}, Y;
  });
})(vt);
var Lt = vt.exports;
const Ot = /* @__PURE__ */ Ct(Lt), lt = (r, t = "MM/DD HH:mm") => Ot(r).format(t), $t = (r, t) => {
  let e, o = 0;
  return (...d) => {
    const m = Date.now(), g = m - o;
    !o || g >= t ? (o = m, r.apply(void 0, d)) : e || (e = setTimeout(() => {
      o = m, r.apply(void 0, d), e = null;
    }, t - g));
  };
}, _t = (r, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = r, o.fillRect(0, 0, 1, 1);
  const d = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${t})`;
}, Et = ({ xCenterPoint: r, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: d, $canvas: m, screenScaleCount: g, scaleHeight: p, startTime: M, drawLine: T, drawText: w, drawArea: $ }) => {
  const X = ({ space: j, scaleTimeFormat: et, bgTimeFormat: ot, pointerTimeFormat: ht }) => {
    w({
      x: m.width - r / 10,
      y: 6,
      text: lt(d, ot),
      fontSize: `${m.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const it = M % o, V = it / e;
    for (let U = 0; U < g; U++) {
      const A = U * t.scaleSpacing - V - t.pointerWidth / 2, k = M + U * o - it;
      if (k % (o * j) === 0) {
        T({ x: A, y: p.long }), w({
          x: A,
          y: m.height - p.long - 5,
          text: lt(k, et),
          baseLine: "bottom"
        });
        continue;
      }
      T({ x: A, y: p.short });
    }
    T({
      x: r - t.pointerWidth / 2,
      y: m.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), $({
      startX: r - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: r + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), w({
      x: r,
      y: t.pointerDisplayHeight / 2 + 5,
      text: lt(d, ht),
      align: "center",
      baseLine: "middle"
    });
  }, C = t.thresholdsConfig[o];
  C && X({
    space: C.space,
    scaleTimeFormat: C.scaleTimeFormat,
    bgTimeFormat: C.bgTimeFormat,
    pointerTimeFormat: C.pointerTimeFormat
  });
}, Wt = {
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
var J, H, P, D, R, W, I, b, pt, Mt, Dt, Tt, yt, bt, wt, Yt, at, tt, q, dt;
class Pt {
  constructor(t, e) {
    _(this, b);
    K(this, "$canvas");
    K(this, "$canvasParent");
    K(this, "ctx");
    K(this, "cfg");
    _(this, J, Ft());
    _(this, H, 0);
    _(this, P);
    _(this, D);
    _(this, R);
    _(this, W, !1);
    _(this, I, null);
    // 绘制线条
    _(this, at, ({ x: t, y: e, width: o = 1, color: d = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = d, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    _(this, tt, ({ x: t, y: e, text: o, color: d = this.cfg.textColor, fontSize: m = "11px", align: g = "center", baseLine: p = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${m} ${this.cfg.fontFamily}`, this.ctx.fillStyle = d, this.ctx.textAlign = g, this.ctx.textBaseline = p, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    _(this, q, ({ startX: t, startY: e, endX: o, endY: d, bgColor: m }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, d - e), this.ctx.fillStyle = m, this.ctx.fill();
    });
    if (!t) throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Wt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: d, height: m, zoom: g, timeSpacingList: p, scaleHeight: M, textColor: T, bgTextColor: w } = this.cfg;
    if (w || (this.cfg.bgTextColor = _t(T, 0.18)), g < 0 || g >= p.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (o) {
      const $ = this.$canvas.parentElement;
      this.$canvasParent = $, this.$canvas.width = $.clientWidth, this.$canvas.height = $.clientHeight, new ResizeObserver($t(E(this, b, bt).bind(this), 200)).observe($);
    } else
      this.$canvas.width = d, this.$canvas.height = m;
    F(this, D, p[g]), M != null && M.long && (M != null && M.short) ? F(this, R, M) : F(this, R, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", E(this, b, yt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", E(this, b, pt).bind(this)), this.$canvas.addEventListener("touchstart", E(this, b, Mt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", E(this, b, Dt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchend", E(this, b, Tt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (h(this, W) && !o) return;
    F(this, H, t || Date.now()), F(this, P, e || []);
    const d = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), m = d * h(this, D), g = h(this, H) - m / 2, p = h(this, H) + m / 2, M = this.$canvas.width / 2, T = m / this.$canvas.width;
    E(this, b, wt).call(this), h(this, q).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), h(this, P).forEach((w) => {
      const $ = w.startTime <= g ? 0 : Math.round((w.startTime - g) / T), X = w.endTime >= p ? this.$canvas.width : Math.round((w.endTime - g) / T);
      $ < this.$canvas.width && X > 0 && h(this, q).call(this, {
        startX: $,
        startY: 0,
        endX: X,
        endY: this.$canvas.height,
        bgColor: w.bgColor || this.cfg.areaBgColor
      });
    }), Et.bind(this)({
      xCenterPoint: M,
      screenScaleCount: d,
      startTime: g,
      timePerPixel: T,
      scaleHeight: h(this, R),
      timeSpacing: h(this, D),
      currentTime: h(this, H),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: h(this, at).bind(this),
      drawText: h(this, tt).bind(this),
      drawArea: h(this, q).bind(this)
    }), E(this, b, Yt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return h(this, H);
  }
  on(t, e) {
    h(this, J).on(t, e);
  }
  off(t, e) {
    h(this, J).off(t, e);
  }
}
J = new WeakMap(), H = new WeakMap(), P = new WeakMap(), D = new WeakMap(), R = new WeakMap(), W = new WeakMap(), I = new WeakMap(), b = new WeakSet(), // 拖拽
pt = function(t) {
  F(this, W, !0);
  let e = t.clientX, o = h(this, H);
  const d = $t(({ clientX: p }) => {
    h(this, W) && (o = Math.round(h(this, H) - h(this, D) / this.cfg.scaleSpacing * (p - e)), e = p, this.draw({
      currentTime: o,
      areas: h(this, P),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), m = (p) => {
    const M = this.$canvas.getBoundingClientRect(), T = p.clientX - M.left, w = p.clientY - M.top, $ = 3;
    (T < $ || T > this.$canvas.width - $ || w < $ || w > this.$canvas.height - $) && (this.$canvas.removeEventListener("mousemove", d), this.$canvas.removeEventListener("mousemove", m));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", d), this.$canvas.removeEventListener("mousemove", m), document.removeEventListener("mouseup", g), F(this, W, !1), E(this, b, dt).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", d), this.$canvas.addEventListener("mousemove", m), document.addEventListener("mouseup", g);
}, // 触摸事件监听器
Mt = function(t) {
  t.preventDefault(), F(this, W, !0), F(this, I, t.touches[0].clientX);
}, Dt = function(t) {
  if (t.preventDefault(), !h(this, W) || h(this, I) === null) return;
  const e = t.touches[0], o = e.clientX - h(this, I), d = Math.round(h(this, H) - h(this, D) / this.cfg.scaleSpacing * o);
  F(this, I, e.clientX), this.draw({
    currentTime: d,
    areas: h(this, P),
    _privateFlag: !0
  });
}, Tt = function() {
  h(this, W) && (F(this, W, !1), F(this, I, null), E(this, b, dt).call(this, "dragged", h(this, H)));
}, // 缩放
yt = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === h(this, D));
  t.deltaY < 0 && e > 0 ? (F(this, D, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: h(this, H),
    areas: h(this, P),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (F(this, D, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: h(this, H),
    areas: h(this, P),
    _privateFlag: !0
  }));
}, // 父元素size变化
bt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || F(this, R, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: h(this, H),
    areas: h(this, P)
  }));
}, // 清空画布
wt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, // 绘制比例尺
Yt = function() {
  const t = () => h(this, D) < 1e3 ? `${h(this, D)}ms` : h(this, D) < 6e4 ? `${Math.round(h(this, D) / 100) / 10}sec` : h(this, D) < 36e5 ? `${Math.round(h(this, D) / 100 / 60) / 10}min` : h(this, D) < 864e5 ? `${Math.round(h(this, D) / 100 / 60 / 60) / 10}hours` : h(this, D) < 6048e5 ? `${Math.round(h(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(h(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  h(this, tt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, at = new WeakMap(), tt = new WeakMap(), q = new WeakMap(), dt = function(...t) {
  h(this, J).emit(...t);
};
export {
  Pt as default,
  lt as format
};
