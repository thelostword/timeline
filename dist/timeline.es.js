var yt = Object.defineProperty;
var ft = (r) => {
  throw TypeError(r);
};
var wt = (r, t, e) => t in r ? yt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var Q = (r, t, e) => wt(r, typeof t != "symbol" ? t + "" : t, e), ct = (r, t, e) => t.has(r) || ft("Cannot " + e);
var c = (r, t, e) => (ct(r, t, "read from private field"), e ? e.call(r) : t.get(r)), O = (r, t, e) => t.has(r) ? ft("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), _ = (r, t, e, o) => (ct(r, t, "write to private field"), o ? o.call(r, e) : t.set(r, e), e), N = (r, t, e) => (ct(r, t, "access private method"), e);
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
    var e = 1e3, o = 6e4, m = 36e5, d = "millisecond", g = "second", v = "minute", p = "hour", y = "day", Y = "week", M = "month", A = "quarter", S = "year", P = "date", tt = "Invalid Date", at = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ot = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, et = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(h) {
      var n = ["th", "st", "nd", "rd"], i = h % 100;
      return "[" + h + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, q = function(h, n, i) {
      var a = String(h);
      return !a || a.length >= n ? h : "" + Array(n + 1 - a.length).join(i) + h;
    }, Z = { s: q, z: function(h) {
      var n = -h.utcOffset(), i = Math.abs(n), a = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + q(a, 2, "0") + ":" + q(s, 2, "0");
    }, m: function h(n, i) {
      if (n.date() < i.date()) return -h(i, n);
      var a = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(a, M), u = i - s < 0, l = n.clone().add(a + (u ? -1 : 1), M);
      return +(-(a + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(h) {
      return h < 0 ? Math.ceil(h) || 0 : Math.floor(h);
    }, p: function(h) {
      return { M, y: S, w: Y, d: y, D: P, h: p, m: v, s: g, ms: d, Q: A }[h] || String(h || "").toLowerCase().replace(/s$/, "");
    }, u: function(h) {
      return h === void 0;
    } }, W = "en", E = {};
    E[W] = et;
    var lt = "$isDayjsObject", ht = function(h) {
      return h instanceof st || !(!h || !h[lt]);
    }, it = function h(n, i, a) {
      var s;
      if (!n) return W;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        E[u] && (s = u), i && (E[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1) return h(l[0]);
      } else {
        var $ = n.name;
        E[$] = n, s = $;
      }
      return !a && s && (W = s), s || !a && W;
    }, w = function(h, n) {
      if (ht(h)) return h.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = h, i.args = arguments, new st(i);
    }, f = Z;
    f.l = it, f.i = ht, f.w = function(h, n) {
      return w(h, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
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
              var $ = l[2] - 1 || 0, T = (l[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(l[1], $, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, T)) : new Date(l[1], $, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, T);
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
        var s = w(i);
        return this.startOf(a) <= s && s <= this.endOf(a);
      }, n.isAfter = function(i, a) {
        return w(i) < this.startOf(a);
      }, n.isBefore = function(i, a) {
        return this.endOf(a) < w(i);
      }, n.$g = function(i, a, s) {
        return f.u(i) ? this[a] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, a) {
        var s = this, u = !!f.u(a) || a, l = f.p(i), $ = function(I, F) {
          var j = f.w(s.$u ? Date.UTC(s.$y, F, I) : new Date(s.$y, F, I), s);
          return u ? j : j.endOf(y);
        }, T = function(I, F) {
          return f.w(s.toDate()[I].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(F)), s);
        }, b = this.$W, x = this.$M, L = this.$D, B = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case S:
            return u ? $(1, 0) : $(31, 11);
          case M:
            return u ? $(1, x) : $(0, x + 1);
          case Y:
            var z = this.$locale().weekStart || 0, V = (b < z ? b + 7 : b) - z;
            return $(u ? L - V : L + (6 - V), x);
          case y:
          case P:
            return T(B + "Hours", 0);
          case p:
            return T(B + "Minutes", 1);
          case v:
            return T(B + "Seconds", 2);
          case g:
            return T(B + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, a) {
        var s, u = f.p(i), l = "set" + (this.$u ? "UTC" : ""), $ = (s = {}, s[y] = l + "Date", s[P] = l + "Date", s[M] = l + "Month", s[S] = l + "FullYear", s[p] = l + "Hours", s[v] = l + "Minutes", s[g] = l + "Seconds", s[d] = l + "Milliseconds", s)[u], T = u === y ? this.$D + (a - this.$W) : a;
        if (u === M || u === S) {
          var b = this.clone().set(P, 1);
          b.$d[$](T), b.init(), this.$d = b.set(P, Math.min(this.$D, b.daysInMonth())).$d;
        } else $ && this.$d[$](T);
        return this.init(), this;
      }, n.set = function(i, a) {
        return this.clone().$set(i, a);
      }, n.get = function(i) {
        return this[f.p(i)]();
      }, n.add = function(i, a) {
        var s, u = this;
        i = Number(i);
        var l = f.p(a), $ = function(x) {
          var L = w(u);
          return f.w(L.date(L.date() + Math.round(x * i)), u);
        };
        if (l === M) return this.set(M, this.$M + i);
        if (l === S) return this.set(S, this.$y + i);
        if (l === y) return $(1);
        if (l === Y) return $(7);
        var T = (s = {}, s[v] = o, s[p] = m, s[g] = e, s)[l] || 1, b = this.$d.getTime() + i * T;
        return f.w(b, this);
      }, n.subtract = function(i, a) {
        return this.add(-1 * i, a);
      }, n.format = function(i) {
        var a = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || tt;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = f.z(this), $ = this.$H, T = this.$m, b = this.$M, x = s.weekdays, L = s.months, B = s.meridiem, z = function(F, j, G, nt) {
          return F && (F[j] || F(a, u)) || G[j].slice(0, nt);
        }, V = function(F) {
          return f.s($ % 12 || 12, F, "0");
        }, I = B || function(F, j, G) {
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
                return b + 1;
              case "MM":
                return f.s(b + 1, 2, "0");
              case "MMM":
                return z(s.monthsShort, b, L, 3);
              case "MMMM":
                return z(L, b);
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
                return String($);
              case "HH":
                return f.s($, 2, "0");
              case "h":
                return V(1);
              case "hh":
                return V(2);
              case "a":
                return I($, T, !0);
              case "A":
                return I($, T, !1);
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
        var u, l = this, $ = f.p(a), T = w(i), b = (T.utcOffset() - this.utcOffset()) * o, x = this - T, L = function() {
          return f.m(l, T);
        };
        switch ($) {
          case S:
            u = L() / 12;
            break;
          case M:
            u = L();
            break;
          case A:
            u = L() / 3;
            break;
          case Y:
            u = (x - b) / 6048e5;
            break;
          case y:
            u = (x - b) / 864e5;
            break;
          case p:
            u = x / m;
            break;
          case v:
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
        return this.endOf(M).$D;
      }, n.$locale = function() {
        return E[this.$L];
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
    return w.prototype = mt, [["$ms", d], ["$s", g], ["$m", v], ["$H", p], ["$W", y], ["$M", M], ["$y", S], ["$D", P]].forEach(function(h) {
      mt[h[1]] = function(n) {
        return this.$g(n, h[0], h[1]);
      };
    }), w.extend = function(h, n) {
      return h.$i || (h(n, st, w), h.$i = !0), w;
    }, w.locale = it, w.isDayjs = ht, w.unix = function(h) {
      return w(1e3 * h);
    }, w.en = E[W], w.Ls = E, w.p = {}, w;
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
}, Ct = (r, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = r, o.fillRect(0, 0, 1, 1);
  const m = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${t})`;
}, Ht = ({ xCenterPoint: r, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: m, $canvas: d, screenScaleCount: g, scaleHeight: v, startTime: p, drawLine: y, drawText: Y, drawArea: M }) => {
  const A = ({ space: P, scaleTimeFormat: tt, bgTimeFormat: at, pointerTimeFormat: ot }) => {
    Y({
      x: d.width - r / 10,
      y: 6,
      text: ut(m, at),
      fontSize: `${d.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const et = p % o, q = et / e;
    for (let Z = 0; Z < g; Z++) {
      const W = Z * t.scaleSpacing - q - t.pointerWidth / 2, E = p + Z * o - et;
      if (E % (o * P) === 0) {
        y({ x: W, y: v.long }), Y({
          x: W,
          y: d.height - v.long - 5,
          text: ut(E, tt),
          baseLine: "bottom"
        });
        continue;
      }
      y({ x: W, y: v.short });
    }
    y({
      x: r - t.pointerWidth / 2,
      y: d.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), M({
      startX: r - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: r + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), Y({
      x: r,
      y: t.pointerDisplayHeight / 2 + 5,
      text: ut(m, ot),
      align: "center",
      baseLine: "middle"
    });
  }, S = t.thresholdsConfig[o];
  S && A({
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
var J, H, k, D, U, X, C, $t, vt, pt, Mt, Tt, rt, K, R, Dt;
class _t {
  constructor(t, e) {
    O(this, C);
    Q(this, "$canvas");
    Q(this, "$canvasParent");
    Q(this, "ctx");
    Q(this, "cfg");
    O(this, J, bt());
    O(this, H, 0);
    O(this, k);
    O(this, D);
    O(this, U);
    O(this, X, !1);
    // 绘制线条
    O(this, rt, ({ x: t, y: e, width: o = 1, color: m = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = m, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    O(this, K, ({ x: t, y: e, text: o, color: m = this.cfg.textColor, fontSize: d = "11px", align: g = "center", baseLine: v = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${d} ${this.cfg.fontFamily}`, this.ctx.fillStyle = m, this.ctx.textAlign = g, this.ctx.textBaseline = v, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    O(this, R, ({ startX: t, startY: e, endX: o, endY: m, bgColor: d }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, m - e), this.ctx.fillStyle = d, this.ctx.fill();
    });
    if (!t) throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Lt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: m, height: d, zoom: g, timeSpacingList: v, scaleHeight: p, textColor: y, bgTextColor: Y } = this.cfg;
    if (Y || (this.cfg.bgTextColor = Ct(y, 0.18)), g < 0 || g >= v.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${v.length - 1}, and must be an integer`);
    if (o) {
      const M = this.$canvas.parentElement;
      this.$canvasParent = M, this.$canvas.width = M.clientWidth, this.$canvas.height = M.clientHeight, new ResizeObserver(dt(N(this, C, pt).bind(this), 200)).observe(M);
    } else
      this.$canvas.width = m, this.$canvas.height = d;
    _(this, D, v[g]), p != null && p.long && (p != null && p.short) ? _(this, U, p) : _(this, U, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", N(this, C, vt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", N(this, C, $t).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (c(this, X) && !o) return;
    _(this, H, t || Date.now()), _(this, k, e || []);
    const m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), d = m * c(this, D), g = c(this, H) - d / 2, v = c(this, H) + d / 2, p = this.$canvas.width / 2, y = d / this.$canvas.width;
    N(this, C, Mt).call(this), c(this, R).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), c(this, k).forEach((Y) => {
      const M = Y.startTime <= g ? 0 : Math.round((Y.startTime - g) / y), A = Y.endTime >= v ? this.$canvas.width : Math.round((Y.endTime - g) / y);
      M < this.$canvas.width && A > 0 && c(this, R).call(this, {
        startX: M,
        startY: 0,
        endX: A,
        endY: this.$canvas.height,
        bgColor: Y.bgColor || this.cfg.areaBgColor
      });
    }), Ht.bind(this)({
      xCenterPoint: p,
      screenScaleCount: m,
      startTime: g,
      timePerPixel: y,
      scaleHeight: c(this, U),
      timeSpacing: c(this, D),
      currentTime: c(this, H),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: c(this, rt).bind(this),
      drawText: c(this, K).bind(this),
      drawArea: c(this, R).bind(this)
    }), N(this, C, Tt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return c(this, H);
  }
  on(t, e) {
    c(this, J).on(t, e);
  }
  off(t, e) {
    c(this, J).off(t, e);
  }
}
J = new WeakMap(), H = new WeakMap(), k = new WeakMap(), D = new WeakMap(), U = new WeakMap(), X = new WeakMap(), C = new WeakSet(), // 拖拽
$t = function(t) {
  _(this, X, !0);
  let e = t.clientX, o = c(this, H);
  const m = dt(({ clientX: v }) => {
    c(this, X) && (o = Math.round(c(this, H) - c(this, D) / this.cfg.scaleSpacing * (v - e)), e = v, this.draw({
      currentTime: o,
      areas: c(this, k),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), d = ({ offsetX: v, offsetY: p }) => {
    (v < 3 || v > this.$canvas.width - 3 || p < 3 || p > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d), document.removeEventListener("mouseup", g), _(this, X, !1), N(this, C, Dt).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", m), this.$canvas.addEventListener("mousemove", d), document.addEventListener("mouseup", g);
}, // 缩放
vt = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === c(this, D));
  t.deltaY < 0 && e > 0 ? (_(this, D, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: c(this, H),
    areas: c(this, k),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (_(this, D, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: c(this, H),
    areas: c(this, k),
    _privateFlag: !0
  }));
}, // 父元素size变化
pt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || _(this, U, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: c(this, H),
    areas: c(this, k)
  }));
}, // 清空画布
Mt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, // 绘制比例尺
Tt = function() {
  const t = () => c(this, D) < 1e3 ? `${c(this, D)}ms` : c(this, D) < 6e4 ? `${Math.round(c(this, D) / 100) / 10}sec` : c(this, D) < 36e5 ? `${Math.round(c(this, D) / 100 / 60) / 10}min` : c(this, D) < 864e5 ? `${Math.round(c(this, D) / 100 / 60 / 60) / 10}hours` : c(this, D) < 6048e5 ? `${Math.round(c(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(c(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  c(this, K).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, rt = new WeakMap(), K = new WeakMap(), R = new WeakMap(), Dt = function(...t) {
  c(this, J).emit(...t);
};
export {
  _t as default,
  ut as format
};
