var xt = Object.defineProperty;
var St = (a, t, e) => t in a ? xt(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var G = (a, t, e) => (St(a, typeof t != "symbol" ? t + "" : t, e), e), dt = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
};
var c = (a, t, e) => (dt(a, t, "read from private field"), e ? e.call(a) : t.get(a)), S = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, L = (a, t, e, o) => (dt(a, t, "write to private field"), o ? o.call(a, e) : t.set(a, e), e);
var I = (a, t, e) => (dt(a, t, "access private method"), e);
function Ft(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, e) {
    var o = a.get(t);
    o ? o.push(e) : a.set(t, [e]);
  }, off: function(t, e) {
    var o = a.get(t);
    o && (e ? o.splice(o.indexOf(e) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, e) {
    var o = a.get(t);
    o && o.slice().map(function(m) {
      m(e);
    }), (o = a.get("*")) && o.slice().map(function(m) {
      m(t, e);
    });
  } };
}
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ht(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Mt = { exports: {} };
(function(a, t) {
  (function(e, o) {
    a.exports = o();
  })(Ct, function() {
    var e = 1e3, o = 6e4, m = 36e5, d = "millisecond", g = "second", v = "minute", p = "hour", y = "day", Y = "week", M = "month", k = "quarter", F = "year", A = "date", K = "Invalid Date", lt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, mt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, tt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(h) {
      var n = ["th", "st", "nd", "rd"], i = h % 100;
      return "[" + h + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, R = function(h, n, i) {
      var r = String(h);
      return !r || r.length >= n ? h : "" + Array(n + 1 - r.length).join(i) + h;
    }, U = { s: R, z: function(h) {
      var n = -h.utcOffset(), i = Math.abs(n), r = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + R(r, 2, "0") + ":" + R(s, 2, "0");
    }, m: function h(n, i) {
      if (n.date() < i.date())
        return -h(i, n);
      var r = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(r, M), u = i - s < 0, l = n.clone().add(r + (u ? -1 : 1), M);
      return +(-(r + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(h) {
      return h < 0 ? Math.ceil(h) || 0 : Math.floor(h);
    }, p: function(h) {
      return { M, y: F, w: Y, d: y, D: A, h: p, m: v, s: g, ms: d, Q: k }[h] || String(h || "").toLowerCase().replace(/s$/, "");
    }, u: function(h) {
      return h === void 0;
    } }, E = "en", _ = {};
    _[E] = tt;
    var $t = "$isDayjsObject", ft = function(h) {
      return h instanceof it || !(!h || !h[$t]);
    }, et = function h(n, i, r) {
      var s;
      if (!n)
        return E;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        _[u] && (s = u), i && (_[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1)
          return h(l[0]);
      } else {
        var $ = n.name;
        _[$] = n, s = $;
      }
      return !r && s && (E = s), s || !r && E;
    }, w = function(h, n) {
      if (ft(h))
        return h.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = h, i.args = arguments, new it(i);
    }, f = U;
    f.l = et, f.i = ft, f.w = function(h, n) {
      return w(h, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var it = function() {
      function h(i) {
        this.$L = et(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[$t] = !0;
      }
      var n = h.prototype;
      return n.parse = function(i) {
        this.$d = function(r) {
          var s = r.date, u = r.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (f.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match(lt);
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
        return this.$d.toString() !== K;
      }, n.isSame = function(i, r) {
        var s = w(i);
        return this.startOf(r) <= s && s <= this.endOf(r);
      }, n.isAfter = function(i, r) {
        return w(i) < this.startOf(r);
      }, n.isBefore = function(i, r) {
        return this.endOf(r) < w(i);
      }, n.$g = function(i, r, s) {
        return f.u(i) ? this[r] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, r) {
        var s = this, u = !!f.u(r) || r, l = f.p(i), $ = function(z, C) {
          var P = f.w(s.$u ? Date.UTC(s.$y, C, z) : new Date(s.$y, C, z), s);
          return u ? P : P.endOf(y);
        }, T = function(z, C) {
          return f.w(s.toDate()[z].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, b = this.$W, x = this.$M, O = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case F:
            return u ? $(1, 0) : $(31, 11);
          case M:
            return u ? $(1, x) : $(0, x + 1);
          case Y:
            var j = this.$locale().weekStart || 0, q = (b < j ? b + 7 : b) - j;
            return $(u ? O - q : O + (6 - q), x);
          case y:
          case A:
            return T(Z + "Hours", 0);
          case p:
            return T(Z + "Minutes", 1);
          case v:
            return T(Z + "Seconds", 2);
          case g:
            return T(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, r) {
        var s, u = f.p(i), l = "set" + (this.$u ? "UTC" : ""), $ = (s = {}, s[y] = l + "Date", s[A] = l + "Date", s[M] = l + "Month", s[F] = l + "FullYear", s[p] = l + "Hours", s[v] = l + "Minutes", s[g] = l + "Seconds", s[d] = l + "Milliseconds", s)[u], T = u === y ? this.$D + (r - this.$W) : r;
        if (u === M || u === F) {
          var b = this.clone().set(A, 1);
          b.$d[$](T), b.init(), this.$d = b.set(A, Math.min(this.$D, b.daysInMonth())).$d;
        } else
          $ && this.$d[$](T);
        return this.init(), this;
      }, n.set = function(i, r) {
        return this.clone().$set(i, r);
      }, n.get = function(i) {
        return this[f.p(i)]();
      }, n.add = function(i, r) {
        var s, u = this;
        i = Number(i);
        var l = f.p(r), $ = function(x) {
          var O = w(u);
          return f.w(O.date(O.date() + Math.round(x * i)), u);
        };
        if (l === M)
          return this.set(M, this.$M + i);
        if (l === F)
          return this.set(F, this.$y + i);
        if (l === y)
          return $(1);
        if (l === Y)
          return $(7);
        var T = (s = {}, s[v] = o, s[p] = m, s[g] = e, s)[l] || 1, b = this.$d.getTime() + i * T;
        return f.w(b, this);
      }, n.subtract = function(i, r) {
        return this.add(-1 * i, r);
      }, n.format = function(i) {
        var r = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || K;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = f.z(this), $ = this.$H, T = this.$m, b = this.$M, x = s.weekdays, O = s.months, Z = s.meridiem, j = function(C, P, V, st) {
          return C && (C[P] || C(r, u)) || V[P].slice(0, st);
        }, q = function(C) {
          return f.s($ % 12 || 12, C, "0");
        }, z = Z || function(C, P, V) {
          var st = C < 12 ? "AM" : "PM";
          return V ? st.toLowerCase() : st;
        };
        return u.replace(mt, function(C, P) {
          return P || function(V) {
            switch (V) {
              case "YY":
                return String(r.$y).slice(-2);
              case "YYYY":
                return f.s(r.$y, 4, "0");
              case "M":
                return b + 1;
              case "MM":
                return f.s(b + 1, 2, "0");
              case "MMM":
                return j(s.monthsShort, b, O, 3);
              case "MMMM":
                return j(O, b);
              case "D":
                return r.$D;
              case "DD":
                return f.s(r.$D, 2, "0");
              case "d":
                return String(r.$W);
              case "dd":
                return j(s.weekdaysMin, r.$W, x, 2);
              case "ddd":
                return j(s.weekdaysShort, r.$W, x, 3);
              case "dddd":
                return x[r.$W];
              case "H":
                return String($);
              case "HH":
                return f.s($, 2, "0");
              case "h":
                return q(1);
              case "hh":
                return q(2);
              case "a":
                return z($, T, !0);
              case "A":
                return z($, T, !1);
              case "m":
                return String(T);
              case "mm":
                return f.s(T, 2, "0");
              case "s":
                return String(r.$s);
              case "ss":
                return f.s(r.$s, 2, "0");
              case "SSS":
                return f.s(r.$ms, 3, "0");
              case "Z":
                return l;
            }
            return null;
          }(C) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, r, s) {
        var u, l = this, $ = f.p(r), T = w(i), b = (T.utcOffset() - this.utcOffset()) * o, x = this - T, O = function() {
          return f.m(l, T);
        };
        switch ($) {
          case F:
            u = O() / 12;
            break;
          case M:
            u = O();
            break;
          case k:
            u = O() / 3;
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
        return _[this.$L];
      }, n.locale = function(i, r) {
        if (!i)
          return this.$L;
        var s = this.clone(), u = et(i, r, !0);
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
    }(), pt = it.prototype;
    return w.prototype = pt, [["$ms", d], ["$s", g], ["$m", v], ["$H", p], ["$W", y], ["$M", M], ["$y", F], ["$D", A]].forEach(function(h) {
      pt[h[1]] = function(n) {
        return this.$g(n, h[0], h[1]);
      };
    }), w.extend = function(h, n) {
      return h.$i || (h(n, it, w), h.$i = !0), w;
    }, w.locale = et, w.isDayjs = ft, w.unix = function(h) {
      return w(1e3 * h);
    }, w.en = _[E], w.Ls = _, w.p = {}, w;
  });
})(Mt);
var Ot = Mt.exports;
const Lt = /* @__PURE__ */ Ht(Ot), gt = (a, t = "MM/DD HH:mm") => Lt(a).format(t), vt = (a, t) => {
  let e, o = 0;
  return (...m) => {
    const d = Date.now(), g = d - o;
    !o || g >= t ? (o = d, a.apply(void 0, m)) : e || (e = setTimeout(() => {
      o = d, a.apply(void 0, m), e = null;
    }, t - g));
  };
}, _t = (a, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = a, o.fillRect(0, 0, 1, 1);
  const m = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${t})`;
}, Et = ({ xCenterPoint: a, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: m, $canvas: d, screenScaleCount: g, scaleHeight: v, startTime: p, drawLine: y, drawText: Y, drawArea: M }) => {
  const k = ({ space: A, scaleTimeFormat: K, bgTimeFormat: lt, pointerTimeFormat: mt }) => {
    Y({
      x: d.width - a / 10,
      y: 6,
      text: gt(m, lt),
      fontSize: `${d.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const tt = p % o, R = tt / e;
    for (let U = 0; U < g; U++) {
      const E = U * t.scaleSpacing - R - t.pointerWidth / 2, _ = p + U * o - tt;
      if (_ % (o * A) === 0) {
        y({ x: E, y: v.long }), Y({
          x: E,
          y: d.height - v.long - 5,
          text: gt(_, K),
          baseLine: "bottom"
        });
        continue;
      }
      y({ x: E, y: v.short });
    }
    y({
      x: a - t.pointerWidth / 2,
      y: d.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), M({
      startX: a - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: a + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), Y({
      x: a,
      y: t.pointerDisplayHeight / 2 + 5,
      text: gt(m, mt),
      align: "center",
      baseLine: "middle"
    });
  }, F = t.thresholdsConfig[o];
  F && k({
    space: F.space,
    scaleTimeFormat: F.scaleTimeFormat,
    bgTimeFormat: F.bgTimeFormat,
    pointerTimeFormat: F.pointerTimeFormat
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
var B, H, W, D, X, N, nt, Tt, rt, Dt, at, yt, ot, wt, ht, bt, ct, Q, J, ut, Yt;
class At {
  constructor(t, e) {
    // 拖拽
    S(this, nt);
    // 缩放
    S(this, rt);
    // 父元素size变化
    S(this, at);
    // 清空画布
    S(this, ot);
    // 绘制比例尺
    S(this, ht);
    S(this, ut);
    G(this, "$canvas");
    G(this, "$canvasParent");
    G(this, "ctx");
    G(this, "cfg");
    S(this, B, Ft());
    S(this, H, 0);
    S(this, W, void 0);
    S(this, D, void 0);
    S(this, X, void 0);
    S(this, N, !1);
    // 绘制线条
    S(this, ct, ({ x: t, y: e, width: o = 1, color: m = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = m, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    S(this, Q, ({ x: t, y: e, text: o, color: m = this.cfg.textColor, fontSize: d = "11px", align: g = "center", baseLine: v = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${d} ${this.cfg.fontFamily}`, this.ctx.fillStyle = m, this.ctx.textAlign = g, this.ctx.textBaseline = v, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    S(this, J, ({ startX: t, startY: e, endX: o, endY: m, bgColor: d }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, m - e), this.ctx.fillStyle = d, this.ctx.fill();
    });
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Wt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: m, height: d, zoom: g, timeSpacingList: v, scaleHeight: p, textColor: y, bgTextColor: Y } = this.cfg;
    if (Y || (this.cfg.bgTextColor = _t(y, 0.18)), g < 0 || g >= v.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${v.length - 1}, and must be an integer`);
    if (o) {
      const M = this.$canvas.parentElement;
      this.$canvasParent = M, this.$canvas.width = M.clientWidth, this.$canvas.height = M.clientHeight, new ResizeObserver(vt(I(this, at, yt).bind(this), 200)).observe(M);
    } else
      this.$canvas.width = m, this.$canvas.height = d;
    L(this, D, v[g]), p != null && p.long && (p != null && p.short) ? L(this, X, p) : L(this, X, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", I(this, rt, Dt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", I(this, nt, Tt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (c(this, N) && !o)
      return;
    L(this, H, t || Date.now()), L(this, W, e || []);
    const m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), d = m * c(this, D), g = c(this, H) - d / 2, v = c(this, H) + d / 2, p = this.$canvas.width / 2, y = d / this.$canvas.width;
    I(this, ot, wt).call(this), c(this, J).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), c(this, W).forEach((Y) => {
      const M = Y.startTime <= g ? 0 : Math.round((Y.startTime - g) / y), k = Y.endTime >= v ? this.$canvas.width : Math.round((Y.endTime - g) / y);
      M < this.$canvas.width && k > 0 && c(this, J).call(this, {
        startX: M,
        startY: 0,
        endX: k,
        endY: this.$canvas.height,
        bgColor: Y.bgColor || this.cfg.areaBgColor
      });
    }), Et.bind(this)({
      xCenterPoint: p,
      screenScaleCount: m,
      startTime: g,
      timePerPixel: y,
      scaleHeight: c(this, X),
      timeSpacing: c(this, D),
      currentTime: c(this, H),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: c(this, ct).bind(this),
      drawText: c(this, Q).bind(this),
      drawArea: c(this, J).bind(this)
    }), I(this, ht, bt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return c(this, H);
  }
  on(t, e) {
    c(this, B).on(t, e);
  }
  off(t, e) {
    c(this, B).off(t, e);
  }
}
B = new WeakMap(), H = new WeakMap(), W = new WeakMap(), D = new WeakMap(), X = new WeakMap(), N = new WeakMap(), nt = new WeakSet(), Tt = function(t) {
  L(this, N, !0);
  let e = 0, o = c(this, H);
  const m = vt(({ offsetX: v }) => {
    if (!c(this, N))
      return;
    const p = v - t.offsetX;
    o = Math.round(c(this, H) - c(this, D) / this.cfg.scaleSpacing * (p - e)), e = p, this.draw({
      currentTime: o,
      areas: c(this, W),
      _privateFlag: !0
    });
  }, 1e3 / this.cfg.fps), d = ({ offsetX: v, offsetY: p }) => {
    (v < 3 || v > this.$canvas.width - 3 || p < 3 || p > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", m), this.$canvas.removeEventListener("mousemove", d), document.removeEventListener("mouseup", g), L(this, N, !1), I(this, ut, Yt).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", m), this.$canvas.addEventListener("mousemove", d), document.addEventListener("mouseup", g);
}, rt = new WeakSet(), Dt = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === c(this, D));
  t.deltaY < 0 && e > 0 ? (L(this, D, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: c(this, H),
    areas: c(this, W),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (L(this, D, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: c(this, H),
    areas: c(this, W),
    _privateFlag: !0
  }));
}, at = new WeakSet(), yt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || L(this, X, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: c(this, H),
    areas: c(this, W)
  }));
}, ot = new WeakSet(), wt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, ht = new WeakSet(), bt = function() {
  const t = () => c(this, D) < 1e3 ? `${c(this, D)}ms` : c(this, D) < 6e4 ? `${Math.round(c(this, D) / 100) / 10}sec` : c(this, D) < 36e5 ? `${Math.round(c(this, D) / 100 / 60) / 10}min` : c(this, D) < 864e5 ? `${Math.round(c(this, D) / 100 / 60 / 60) / 10}hours` : c(this, D) < 6048e5 ? `${Math.round(c(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(c(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  c(this, Q).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ct = new WeakMap(), Q = new WeakMap(), J = new WeakMap(), ut = new WeakSet(), Yt = function(...t) {
  c(this, B).emit(...t);
};
export {
  At as default,
  gt as format
};
