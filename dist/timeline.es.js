var yt = Object.defineProperty;
var ft = (r) => {
  throw TypeError(r);
};
var wt = (r, t, e) => t in r ? yt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var Q = (r, t, e) => wt(r, typeof t != "symbol" ? t + "" : t, e), ct = (r, t, e) => t.has(r) || ft("Cannot " + e);
var c = (r, t, e) => (ct(r, t, "read from private field"), e ? e.call(r) : t.get(r)), O = (r, t, e) => t.has(r) ? ft("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), _ = (r, t, e, o) => (ct(r, t, "write to private field"), o ? o.call(r, e) : t.set(r, e), e), X = (r, t, e) => (ct(r, t, "access private method"), e);
function bt(r) {
  return { all: r = r || /* @__PURE__ */ new Map(), on: function(t, e) {
    var o = r.get(t);
    o ? o.push(e) : r.set(t, [e]);
  }, off: function(t, e) {
    var o = r.get(t);
    o && (e ? o.splice(o.indexOf(e) >>> 0, 1) : r.set(t, []));
  }, emit: function(t, e) {
    var o = r.get(t);
    o && o.slice().map(function(m) {
      m(e);
    }), (o = r.get("*")) && o.slice().map(function(m) {
      m(t, e);
    });
  } };
}
var Yt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var gt = { exports: {} };
(function(r, t) {
  (function(e, o) {
    r.exports = o();
  })(Yt, function() {
    var e = 1e3, o = 6e4, m = 36e5, d = "millisecond", g = "second", p = "minute", M = "hour", D = "day", w = "week", $ = "month", P = "quarter", S = "year", A = "date", tt = "Invalid Date", at = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ot = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, et = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(h) {
      var n = ["th", "st", "nd", "rd"], i = h % 100;
      return "[" + h + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, q = function(h, n, i) {
      var a = String(h);
      return !a || a.length >= n ? h : "" + Array(n + 1 - a.length).join(i) + h;
    }, R = { s: q, z: function(h) {
      var n = -h.utcOffset(), i = Math.abs(n), a = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + q(a, 2, "0") + ":" + q(s, 2, "0");
    }, m: function h(n, i) {
      if (n.date() < i.date()) return -h(i, n);
      var a = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(a, $), u = i - s < 0, l = n.clone().add(a + (u ? -1 : 1), $);
      return +(-(a + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(h) {
      return h < 0 ? Math.ceil(h) || 0 : Math.floor(h);
    }, p: function(h) {
      return { M: $, y: S, w, d: D, D: A, h: M, m: p, s: g, ms: d, Q: P }[h] || String(h || "").toLowerCase().replace(/s$/, "");
    }, u: function(h) {
      return h === void 0;
    } }, E = "en", W = {};
    W[E] = et;
    var lt = "$isDayjsObject", ht = function(h) {
      return h instanceof st || !(!h || !h[lt]);
    }, it = function h(n, i, a) {
      var s;
      if (!n) return E;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        W[u] && (s = u), i && (W[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1) return h(l[0]);
      } else {
        var v = n.name;
        W[v] = n, s = v;
      }
      return !a && s && (E = s), s || !a && E;
    }, b = function(h, n) {
      if (ht(h)) return h.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = h, i.args = arguments, new st(i);
    }, f = R;
    f.l = it, f.i = ht, f.w = function(h, n) {
      return b(h, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var st = function() {
      function h(i) {
        this.$L = it(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[lt] = !0;
      }
      var n = h.prototype;
      return n.parse = function(i) {
        this.$d = function(a) {
          var s = a.date, u = a.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (f.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match(at);
            if (l) {
              var v = l[2] - 1 || 0, T = (l[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(l[1], v, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, T)) : new Date(l[1], v, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, T);
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
        return this.$d.toString() !== tt;
      }, n.isSame = function(i, a) {
        var s = b(i);
        return this.startOf(a) <= s && s <= this.endOf(a);
      }, n.isAfter = function(i, a) {
        return b(i) < this.startOf(a);
      }, n.isBefore = function(i, a) {
        return this.endOf(a) < b(i);
      }, n.$g = function(i, a, s) {
        return f.u(i) ? this[a] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, a) {
        var s = this, u = !!f.u(a) || a, l = f.p(i), v = function(I, F) {
          var j = f.w(s.$u ? Date.UTC(s.$y, F, I) : new Date(s.$y, F, I), s);
          return u ? j : j.endOf(D);
        }, T = function(I, F) {
          return f.w(s.toDate()[I].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(F)), s);
        }, Y = this.$W, x = this.$M, L = this.$D, U = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case S:
            return u ? v(1, 0) : v(31, 11);
          case $:
            return u ? v(1, x) : v(0, x + 1);
          case w:
            var z = this.$locale().weekStart || 0, V = (Y < z ? Y + 7 : Y) - z;
            return v(u ? L - V : L + (6 - V), x);
          case D:
          case A:
            return T(U + "Hours", 0);
          case M:
            return T(U + "Minutes", 1);
          case p:
            return T(U + "Seconds", 2);
          case g:
            return T(U + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, a) {
        var s, u = f.p(i), l = "set" + (this.$u ? "UTC" : ""), v = (s = {}, s[D] = l + "Date", s[A] = l + "Date", s[$] = l + "Month", s[S] = l + "FullYear", s[M] = l + "Hours", s[p] = l + "Minutes", s[g] = l + "Seconds", s[d] = l + "Milliseconds", s)[u], T = u === D ? this.$D + (a - this.$W) : a;
        if (u === $ || u === S) {
          var Y = this.clone().set(A, 1);
          Y.$d[v](T), Y.init(), this.$d = Y.set(A, Math.min(this.$D, Y.daysInMonth())).$d;
        } else v && this.$d[v](T);
        return this.init(), this;
      }, n.set = function(i, a) {
        return this.clone().$set(i, a);
      }, n.get = function(i) {
        return this[f.p(i)]();
      }, n.add = function(i, a) {
        var s, u = this;
        i = Number(i);
        var l = f.p(a), v = function(x) {
          var L = b(u);
          return f.w(L.date(L.date() + Math.round(x * i)), u);
        };
        if (l === $) return this.set($, this.$M + i);
        if (l === S) return this.set(S, this.$y + i);
        if (l === D) return v(1);
        if (l === w) return v(7);
        var T = (s = {}, s[p] = o, s[M] = m, s[g] = e, s)[l] || 1, Y = this.$d.getTime() + i * T;
        return f.w(Y, this);
      }, n.subtract = function(i, a) {
        return this.add(-1 * i, a);
      }, n.format = function(i) {
        var a = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || tt;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = f.z(this), v = this.$H, T = this.$m, Y = this.$M, x = s.weekdays, L = s.months, U = s.meridiem, z = function(F, j, G, nt) {
          return F && (F[j] || F(a, u)) || G[j].slice(0, nt);
        }, V = function(F) {
          return f.s(v % 12 || 12, F, "0");
        }, I = U || function(F, j, G) {
          var nt = F < 12 ? "AM" : "PM";
          return G ? nt.toLowerCase() : nt;
        };
        return u.replace(ot, function(F, j) {
          return j || function(G) {
            switch (G) {
              case "YY":
                return String(a.$y).slice(-2);
              case "YYYY":
                return f.s(a.$y, 4, "0");
              case "M":
                return Y + 1;
              case "MM":
                return f.s(Y + 1, 2, "0");
              case "MMM":
                return z(s.monthsShort, Y, L, 3);
              case "MMMM":
                return z(L, Y);
              case "D":
                return a.$D;
              case "DD":
                return f.s(a.$D, 2, "0");
              case "d":
                return String(a.$W);
              case "dd":
                return z(s.weekdaysMin, a.$W, x, 2);
              case "ddd":
                return z(s.weekdaysShort, a.$W, x, 3);
              case "dddd":
                return x[a.$W];
              case "H":
                return String(v);
              case "HH":
                return f.s(v, 2, "0");
              case "h":
                return V(1);
              case "hh":
                return V(2);
              case "a":
                return I(v, T, !0);
              case "A":
                return I(v, T, !1);
              case "m":
                return String(T);
              case "mm":
                return f.s(T, 2, "0");
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
          }(F) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, a, s) {
        var u, l = this, v = f.p(a), T = b(i), Y = (T.utcOffset() - this.utcOffset()) * o, x = this - T, L = function() {
          return f.m(l, T);
        };
        switch (v) {
          case S:
            u = L() / 12;
            break;
          case $:
            u = L();
            break;
          case P:
            u = L() / 3;
            break;
          case w:
            u = (x - Y) / 6048e5;
            break;
          case D:
            u = (x - Y) / 864e5;
            break;
          case M:
            u = x / m;
            break;
          case p:
            u = x / o;
            break;
          case g:
            u = x / e;
            break;
          default:
            u = x;
        }
        return s ? u : f.a(u);
      }, n.daysInMonth = function() {
        return this.endOf($).$D;
      }, n.$locale = function() {
        return W[this.$L];
      }, n.locale = function(i, a) {
        if (!i) return this.$L;
        var s = this.clone(), u = it(i, a, !0);
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
      }, h;
    }(), mt = st.prototype;
    return b.prototype = mt, [["$ms", d], ["$s", g], ["$m", p], ["$H", M], ["$W", D], ["$M", $], ["$y", S], ["$D", A]].forEach(function(h) {
      mt[h[1]] = function(n) {
        return this.$g(n, h[0], h[1]);
      };
    }), b.extend = function(h, n) {
      return h.$i || (h(n, st, b), h.$i = !0), b;
    }, b.locale = it, b.isDayjs = ht, b.unix = function(h) {
      return b(1e3 * h);
    }, b.en = W[E], b.Ls = W, b.p = {}, b;
  });
})(gt);
var St = gt.exports;
const Ft = /* @__PURE__ */ xt(St), ut = (r, t = "MM/DD HH:mm") => Ft(r).format(t), dt = (r, t) => {
  let e, o = 0;
  return (...m) => {
    const d = Date.now(), g = d - o;
    !o || g >= t ? (o = d, r.apply(void 0, m)) : e || (e = setTimeout(() => {
      o = d, r.apply(void 0, m), e = null;
    }, t - g));
  };
}, Ht = (r, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = r, o.fillRect(0, 0, 1, 1);
  const m = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${t})`;
}, Ct = ({ xCenterPoint: r, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: m, $canvas: d, screenScaleCount: g, scaleHeight: p, startTime: M, drawLine: D, drawText: w, drawArea: $ }) => {
  const P = ({ space: A, scaleTimeFormat: tt, bgTimeFormat: at, pointerTimeFormat: ot }) => {
    w({
      x: d.width - r / 10,
      y: 6,
      text: ut(m, at),
      fontSize: `${d.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const et = M % o, q = et / e;
    for (let R = 0; R < g; R++) {
      const E = R * t.scaleSpacing - q - t.pointerWidth / 2, W = M + R * o - et;
      if (W % (o * A) === 0) {
        D({ x: E, y: p.long }), w({
          x: E,
          y: d.height - p.long - 5,
          text: ut(W, tt),
          baseLine: "bottom"
        });
        continue;
      }
      D({ x: E, y: p.short });
    }
    D({
      x: r - t.pointerWidth / 2,
      y: d.height,
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
      text: ut(m, ot),
      align: "center",
      baseLine: "middle"
    });
  }, S = t.thresholdsConfig[o];
  S && P({
    space: S.space,
    scaleTimeFormat: S.scaleTimeFormat,
    bgTimeFormat: S.bgTimeFormat,
    pointerTimeFormat: S.pointerTimeFormat
  });
}, Lt = {
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
var Z, C, k, y, B, N, H, $t, vt, pt, Mt, Dt, rt, K, J, Tt;
class _t {
  constructor(t, e) {
    O(this, H);
    Q(this, "$canvas");
    Q(this, "$canvasParent");
    Q(this, "ctx");
    Q(this, "cfg");
    O(this, Z, bt());
    O(this, C, 0);
    O(this, k);
    O(this, y);
    O(this, B);
    O(this, N, !1);
    // 绘制线条
    O(this, rt, ({ x: t, y: e, width: o = 1, color: m = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = m, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    O(this, K, ({ x: t, y: e, text: o, color: m = this.cfg.textColor, fontSize: d = "11px", align: g = "center", baseLine: p = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${d} ${this.cfg.fontFamily}`, this.ctx.fillStyle = m, this.ctx.textAlign = g, this.ctx.textBaseline = p, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    O(this, J, ({ startX: t, startY: e, endX: o, endY: m, bgColor: d }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, m - e), this.ctx.fillStyle = d, this.ctx.fill();
    });
    if (!t) throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Lt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: m, height: d, zoom: g, timeSpacingList: p, scaleHeight: M, textColor: D, bgTextColor: w } = this.cfg;
    if (w || (this.cfg.bgTextColor = Ht(D, 0.18)), g < 0 || g >= p.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (o) {
      const $ = this.$canvas.parentElement;
      this.$canvasParent = $, this.$canvas.width = $.clientWidth, this.$canvas.height = $.clientHeight, new ResizeObserver(dt(X(this, H, pt).bind(this), 200)).observe($);
    } else
      this.$canvas.width = m, this.$canvas.height = d;
    _(this, y, p[g]), M != null && M.long && (M != null && M.short) ? _(this, B, M) : _(this, B, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", X(this, H, vt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", X(this, H, $t).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (c(this, N) && !o) return;
    _(this, C, t || Date.now()), _(this, k, e || []);
    const m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), d = m * c(this, y), g = c(this, C) - d / 2, p = c(this, C) + d / 2, M = this.$canvas.width / 2, D = d / this.$canvas.width;
    X(this, H, Mt).call(this), c(this, J).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), c(this, k).forEach((w) => {
      const $ = w.startTime <= g ? 0 : Math.round((w.startTime - g) / D), P = w.endTime >= p ? this.$canvas.width : Math.round((w.endTime - g) / D);
      $ < this.$canvas.width && P > 0 && c(this, J).call(this, {
        startX: $,
        startY: 0,
        endX: P,
        endY: this.$canvas.height,
        bgColor: w.bgColor || this.cfg.areaBgColor
      });
    }), Ct.bind(this)({
      xCenterPoint: M,
      screenScaleCount: m,
      startTime: g,
      timePerPixel: D,
      scaleHeight: c(this, B),
      timeSpacing: c(this, y),
      currentTime: c(this, C),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: c(this, rt).bind(this),
      drawText: c(this, K).bind(this),
      drawArea: c(this, J).bind(this)
    }), X(this, H, Dt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return c(this, C);
  }
  on(t, e) {
    c(this, Z).on(t, e);
  }
  off(t, e) {
    c(this, Z).off(t, e);
  }
}
Z = new WeakMap(), C = new WeakMap(), k = new WeakMap(), y = new WeakMap(), B = new WeakMap(), N = new WeakMap(), H = new WeakSet(), // 拖拽
$t = function(t) {
  _(this, N, !0);
  let e = t.clientX, o = c(this, C);
  const m = dt(({ clientX: p }) => {
    c(this, N) && (o = Math.round(c(this, C) - c(this, y) / this.cfg.scaleSpacing * (p - e)), e = p, this.draw({
      currentTime: o,
      areas: c(this, k),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), d = (p) => {
    const M = this.$canvas.getBoundingClientRect(), D = p.clientX - M.left, w = p.clientY - M.top, $ = 3;
    (D < $ || D > this.$canvas.width - $ || w < $ || w > this.$canvas.height - $) && (this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d), document.removeEventListener("mouseup", g), _(this, N, !1), X(this, H, Tt).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", m), this.$canvas.addEventListener("mousemove", d), document.addEventListener("mouseup", g);
}, // 缩放
vt = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === c(this, y));
  t.deltaY < 0 && e > 0 ? (_(this, y, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: c(this, C),
    areas: c(this, k),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (_(this, y, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: c(this, C),
    areas: c(this, k),
    _privateFlag: !0
  }));
}, // 父元素size变化
pt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || _(this, B, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: c(this, C),
    areas: c(this, k)
  }));
}, // 清空画布
Mt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, // 绘制比例尺
Dt = function() {
  const t = () => c(this, y) < 1e3 ? `${c(this, y)}ms` : c(this, y) < 6e4 ? `${Math.round(c(this, y) / 100) / 10}sec` : c(this, y) < 36e5 ? `${Math.round(c(this, y) / 100 / 60) / 10}min` : c(this, y) < 864e5 ? `${Math.round(c(this, y) / 100 / 60 / 60) / 10}hours` : c(this, y) < 6048e5 ? `${Math.round(c(this, y) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(c(this, y) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  c(this, K).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, rt = new WeakMap(), K = new WeakMap(), J = new WeakMap(), Tt = function(...t) {
  c(this, Z).emit(...t);
};
export {
  _t as default,
  ut as format
};
