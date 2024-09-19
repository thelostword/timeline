var Et = Object.defineProperty;
var Wt = (a, t, e) => t in a ? Et(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var B = (a, t, e) => (Wt(a, typeof t != "symbol" ? t + "" : t, e), e), Mt = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
};
var r = (a, t, e) => (Mt(a, t, "read from private field"), e ? e.call(a) : t.get(a)), b = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, x = (a, t, e, o) => (Mt(a, t, "write to private field"), o ? o.call(a, e) : t.set(a, e), e);
var _ = (a, t, e) => (Mt(a, t, "access private method"), e);
function kt(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, e) {
    var o = a.get(t);
    o ? o.push(e) : a.set(t, [e]);
  }, off: function(t, e) {
    var o = a.get(t);
    o && (e ? o.splice(o.indexOf(e) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, e) {
    var o = a.get(t);
    o && o.slice().map(function(f) {
      f(e);
    }), (o = a.get("*")) && o.slice().map(function(f) {
      f(t, e);
    });
  } };
}
var Xt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function At(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Yt = { exports: {} };
(function(a, t) {
  (function(e, o) {
    a.exports = o();
  })(Xt, function() {
    var e = 1e3, o = 6e4, f = 36e5, m = "millisecond", g = "second", d = "minute", M = "hour", T = "day", S = "week", v = "month", V = "quarter", C = "year", A = "date", it = "Invalid Date", $t = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, vt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, st = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var n = ["th", "st", "nd", "rd"], i = c % 100;
      return "[" + c + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, G = function(c, n, i) {
      var h = String(c);
      return !h || h.length >= n ? c : "" + Array(n + 1 - h.length).join(i) + c;
    }, U = { s: G, z: function(c) {
      var n = -c.utcOffset(), i = Math.abs(n), h = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + G(h, 2, "0") + ":" + G(s, 2, "0");
    }, m: function c(n, i) {
      if (n.date() < i.date())
        return -c(i, n);
      var h = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(h, v), u = i - s < 0, l = n.clone().add(h + (u ? -1 : 1), v);
      return +(-(h + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: v, y: C, w: S, d: T, D: A, h: M, m: d, s: g, ms: m, Q: V }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, k = "en", W = {};
    W[k] = st;
    var bt = "$isDayjsObject", pt = function(c) {
      return c instanceof rt || !(!c || !c[bt]);
    }, nt = function c(n, i, h) {
      var s;
      if (!n)
        return k;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        W[u] && (s = u), i && (W[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1)
          return c(l[0]);
      } else {
        var p = n.name;
        W[p] = n, s = p;
      }
      return !h && s && (k = s), s || !h && k;
    }, w = function(c, n) {
      if (pt(c))
        return c.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = c, i.args = arguments, new rt(i);
    }, $ = U;
    $.l = nt, $.i = pt, $.w = function(c, n) {
      return w(c, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var rt = function() {
      function c(i) {
        this.$L = nt(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[bt] = !0;
      }
      var n = c.prototype;
      return n.parse = function(i) {
        this.$d = function(h) {
          var s = h.date, u = h.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if ($.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match($t);
            if (l) {
              var p = l[2] - 1 || 0, y = (l[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(l[1], p, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, y)) : new Date(l[1], p, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, y);
            }
          }
          return new Date(s);
        }(i), this.init();
      }, n.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, n.$utils = function() {
        return $;
      }, n.isValid = function() {
        return this.$d.toString() !== it;
      }, n.isSame = function(i, h) {
        var s = w(i);
        return this.startOf(h) <= s && s <= this.endOf(h);
      }, n.isAfter = function(i, h) {
        return w(i) < this.startOf(h);
      }, n.isBefore = function(i, h) {
        return this.endOf(h) < w(i);
      }, n.$g = function(i, h, s) {
        return $.u(i) ? this[h] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, h) {
        var s = this, u = !!$.u(h) || h, l = $.p(i), p = function(R, L) {
          var I = $.w(s.$u ? Date.UTC(s.$y, L, R) : new Date(s.$y, L, R), s);
          return u ? I : I.endOf(T);
        }, y = function(R, L) {
          return $.w(s.toDate()[R].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(L)), s);
        }, Y = this.$W, F = this.$M, O = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case C:
            return u ? p(1, 0) : p(31, 11);
          case v:
            return u ? p(1, F) : p(0, F + 1);
          case S:
            var z = this.$locale().weekStart || 0, Q = (Y < z ? Y + 7 : Y) - z;
            return p(u ? O - Q : O + (6 - Q), F);
          case T:
          case A:
            return y(Z + "Hours", 0);
          case M:
            return y(Z + "Minutes", 1);
          case d:
            return y(Z + "Seconds", 2);
          case g:
            return y(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, h) {
        var s, u = $.p(i), l = "set" + (this.$u ? "UTC" : ""), p = (s = {}, s[T] = l + "Date", s[A] = l + "Date", s[v] = l + "Month", s[C] = l + "FullYear", s[M] = l + "Hours", s[d] = l + "Minutes", s[g] = l + "Seconds", s[m] = l + "Milliseconds", s)[u], y = u === T ? this.$D + (h - this.$W) : h;
        if (u === v || u === C) {
          var Y = this.clone().set(A, 1);
          Y.$d[p](y), Y.init(), this.$d = Y.set(A, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          p && this.$d[p](y);
        return this.init(), this;
      }, n.set = function(i, h) {
        return this.clone().$set(i, h);
      }, n.get = function(i) {
        return this[$.p(i)]();
      }, n.add = function(i, h) {
        var s, u = this;
        i = Number(i);
        var l = $.p(h), p = function(F) {
          var O = w(u);
          return $.w(O.date(O.date() + Math.round(F * i)), u);
        };
        if (l === v)
          return this.set(v, this.$M + i);
        if (l === C)
          return this.set(C, this.$y + i);
        if (l === T)
          return p(1);
        if (l === S)
          return p(7);
        var y = (s = {}, s[d] = o, s[M] = f, s[g] = e, s)[l] || 1, Y = this.$d.getTime() + i * y;
        return $.w(Y, this);
      }, n.subtract = function(i, h) {
        return this.add(-1 * i, h);
      }, n.format = function(i) {
        var h = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || it;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = $.z(this), p = this.$H, y = this.$m, Y = this.$M, F = s.weekdays, O = s.months, Z = s.meridiem, z = function(L, I, K, at) {
          return L && (L[I] || L(h, u)) || K[I].slice(0, at);
        }, Q = function(L) {
          return $.s(p % 12 || 12, L, "0");
        }, R = Z || function(L, I, K) {
          var at = L < 12 ? "AM" : "PM";
          return K ? at.toLowerCase() : at;
        };
        return u.replace(vt, function(L, I) {
          return I || function(K) {
            switch (K) {
              case "YY":
                return String(h.$y).slice(-2);
              case "YYYY":
                return $.s(h.$y, 4, "0");
              case "M":
                return Y + 1;
              case "MM":
                return $.s(Y + 1, 2, "0");
              case "MMM":
                return z(s.monthsShort, Y, O, 3);
              case "MMMM":
                return z(O, Y);
              case "D":
                return h.$D;
              case "DD":
                return $.s(h.$D, 2, "0");
              case "d":
                return String(h.$W);
              case "dd":
                return z(s.weekdaysMin, h.$W, F, 2);
              case "ddd":
                return z(s.weekdaysShort, h.$W, F, 3);
              case "dddd":
                return F[h.$W];
              case "H":
                return String(p);
              case "HH":
                return $.s(p, 2, "0");
              case "h":
                return Q(1);
              case "hh":
                return Q(2);
              case "a":
                return R(p, y, !0);
              case "A":
                return R(p, y, !1);
              case "m":
                return String(y);
              case "mm":
                return $.s(y, 2, "0");
              case "s":
                return String(h.$s);
              case "ss":
                return $.s(h.$s, 2, "0");
              case "SSS":
                return $.s(h.$ms, 3, "0");
              case "Z":
                return l;
            }
            return null;
          }(L) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, h, s) {
        var u, l = this, p = $.p(h), y = w(i), Y = (y.utcOffset() - this.utcOffset()) * o, F = this - y, O = function() {
          return $.m(l, y);
        };
        switch (p) {
          case C:
            u = O() / 12;
            break;
          case v:
            u = O();
            break;
          case V:
            u = O() / 3;
            break;
          case S:
            u = (F - Y) / 6048e5;
            break;
          case T:
            u = (F - Y) / 864e5;
            break;
          case M:
            u = F / f;
            break;
          case d:
            u = F / o;
            break;
          case g:
            u = F / e;
            break;
          default:
            u = F;
        }
        return s ? u : $.a(u);
      }, n.daysInMonth = function() {
        return this.endOf(v).$D;
      }, n.$locale = function() {
        return W[this.$L];
      }, n.locale = function(i, h) {
        if (!i)
          return this.$L;
        var s = this.clone(), u = nt(i, h, !0);
        return u && (s.$L = u), s;
      }, n.clone = function() {
        return $.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), xt = rt.prototype;
    return w.prototype = xt, [["$ms", m], ["$s", g], ["$m", d], ["$H", M], ["$W", T], ["$M", v], ["$y", C], ["$D", A]].forEach(function(c) {
      xt[c[1]] = function(n) {
        return this.$g(n, c[0], c[1]);
      };
    }), w.extend = function(c, n) {
      return c.$i || (c(n, rt, w), c.$i = !0), w;
    }, w.locale = nt, w.isDayjs = pt, w.unix = function(c) {
      return w(1e3 * c);
    }, w.en = W[k], w.Ls = W, w.p = {}, w;
  });
})(Yt);
var It = Yt.exports;
const jt = /* @__PURE__ */ At(It), Dt = (a, t = "MM/DD HH:mm") => jt(a).format(t), Tt = (a, t) => {
  let e, o = 0;
  return (...f) => {
    const m = Date.now(), g = m - o;
    !o || g >= t ? (o = m, a.apply(void 0, f)) : e || (e = setTimeout(() => {
      o = m, a.apply(void 0, f), e = null;
    }, t - g));
  };
}, wt = (a) => {
  const [t, e] = [a[0], a[1]], o = e.clientX - t.clientX, f = e.clientY - t.clientY;
  return Math.sqrt(o * o + f * f);
}, zt = (a, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = a, o.fillRect(0, 0, 1, 1);
  const f = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${f[0]}, ${f[1]}, ${f[2]}, ${t})`;
}, Rt = ({ xCenterPoint: a, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: f, $canvas: m, screenScaleCount: g, scaleHeight: d, startTime: M, drawLine: T, drawText: S, drawArea: v }) => {
  const V = ({ space: A, scaleTimeFormat: it, bgTimeFormat: $t, pointerTimeFormat: vt }) => {
    S({
      x: m.width - a / 10,
      y: 6,
      text: Dt(f, $t),
      fontSize: `${m.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const st = M % o, G = st / e;
    for (let U = 0; U < g; U++) {
      const k = U * t.scaleSpacing - G - t.pointerWidth / 2, W = M + U * o - st;
      if (W % (o * A) === 0) {
        T({ x: k, y: d.long }), S({
          x: k,
          y: m.height - d.long - 5,
          text: Dt(W, it),
          baseLine: "bottom"
        });
        continue;
      }
      T({ x: k, y: d.short });
    }
    T({
      x: a - t.pointerWidth / 2,
      y: m.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), v({
      startX: a - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: a + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), S({
      x: a,
      y: t.pointerDisplayHeight / 2 + 5,
      text: Dt(f, vt),
      align: "center",
      baseLine: "middle"
    });
  }, C = t.thresholdsConfig[o];
  C && V({
    space: C.space,
    scaleTimeFormat: C.scaleTimeFormat,
    bgTimeFormat: C.bgTimeFormat,
    pointerTimeFormat: C.pointerTimeFormat
  });
}, Bt = {
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
var q, H, P, D, N, E, j, X, ot, St, ht, Ft, ct, Ht, ut, Ct, lt, Lt, ft, Ot, dt, _t, mt, Pt, gt, tt, J, et, yt;
class Ut {
  constructor(t, e) {
    // 拖拽
    b(this, ot);
    // 缩放
    b(this, ht);
    // 触摸事件监听器
    b(this, ct);
    b(this, ut);
    b(this, lt);
    // 父元素size变化
    b(this, ft);
    // 清空画布
    b(this, dt);
    // 绘制比例尺
    b(this, mt);
    b(this, et);
    B(this, "$canvas");
    B(this, "$canvasParent");
    B(this, "ctx");
    B(this, "cfg");
    B(this, "timeRange");
    B(this, "msPerPixel");
    b(this, q, kt());
    b(this, H, 0);
    b(this, P, void 0);
    b(this, D, void 0);
    b(this, N, void 0);
    b(this, E, !1);
    b(this, j, null);
    b(this, X, null);
    // 绘制线条
    b(this, gt, ({ x: t, y: e, width: o = 1, color: f = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = f, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    b(this, tt, ({ x: t, y: e, text: o, color: f = this.cfg.textColor, fontSize: m = "11px", align: g = "center", baseLine: d = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${m} ${this.cfg.fontFamily}`, this.ctx.fillStyle = f, this.ctx.textAlign = g, this.ctx.textBaseline = d, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    b(this, J, ({ startX: t, startY: e, endX: o, endY: f, bgColor: m }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, f - e), this.ctx.fillStyle = m, this.ctx.fill();
    });
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Bt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: f, height: m, zoom: g, timeSpacingList: d, scaleHeight: M, textColor: T, bgTextColor: S } = this.cfg;
    if (S || (this.cfg.bgTextColor = zt(T, 0.18)), g < 0 || g >= d.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${d.length - 1}, and must be an integer`);
    if (o) {
      const v = this.$canvas.parentElement;
      this.$canvasParent = v, this.$canvas.width = v.clientWidth, this.$canvas.height = v.clientHeight, new ResizeObserver(Tt(_(this, ft, Ot).bind(this), 200)).observe(v);
    } else
      this.$canvas.width = f, this.$canvas.height = m;
    x(this, D, d[g]), M != null && M.long && (M != null && M.short) ? x(this, N, M) : x(this, N, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", _(this, ht, Ft).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", _(this, ot, St).bind(this)), this.$canvas.addEventListener("touchstart", _(this, ct, Ht).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", Tt(_(this, ut, Ct).bind(this), 1e3 / this.cfg.fps), { passive: !1 }), this.$canvas.addEventListener("touchend", _(this, lt, Lt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (r(this, E) && !o)
      return;
    x(this, H, t || Date.now()), x(this, P, e || []);
    const f = this.$canvas.width / 2, m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), g = m * r(this, D), [d, M] = this.timeRange = [r(this, H) - g / 2, r(this, H) + g / 2];
    this.msPerPixel = g / this.$canvas.width, _(this, dt, _t).call(this), r(this, J).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), r(this, P).forEach((T) => {
      const S = T.startTime <= d ? 0 : Math.round((T.startTime - d) / this.msPerPixel), v = T.endTime >= M ? this.$canvas.width : Math.round((T.endTime - d) / this.msPerPixel);
      S < this.$canvas.width && v > 0 && r(this, J).call(this, {
        startX: S,
        startY: 0,
        endX: v,
        endY: this.$canvas.height,
        bgColor: T.bgColor || this.cfg.areaBgColor
      });
    }), Rt.bind(this)({
      xCenterPoint: f,
      screenScaleCount: m,
      startTime: d,
      timePerPixel: this.msPerPixel,
      scaleHeight: r(this, N),
      timeSpacing: r(this, D),
      currentTime: r(this, H),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: r(this, gt).bind(this),
      drawText: r(this, tt).bind(this),
      drawArea: r(this, J).bind(this)
    }), _(this, mt, Pt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return r(this, H);
  }
  on(t, e) {
    r(this, q).on(t, e);
  }
  off(t, e) {
    r(this, q).off(t, e);
  }
}
q = new WeakMap(), H = new WeakMap(), P = new WeakMap(), D = new WeakMap(), N = new WeakMap(), E = new WeakMap(), j = new WeakMap(), X = new WeakMap(), ot = new WeakSet(), St = function(t) {
  x(this, E, !0);
  let e = t.clientX, o = r(this, H);
  const f = Tt(({ clientX: d }) => {
    r(this, E) && (o = Math.round(r(this, H) - r(this, D) / this.cfg.scaleSpacing * (d - e)), e = d, this.draw({
      currentTime: o,
      areas: r(this, P),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), m = (d) => {
    const M = this.$canvas.getBoundingClientRect(), T = d.clientX - M.left, S = d.clientY - M.top, v = 3;
    (T < v || T > this.$canvas.width - v || S < v || S > this.$canvas.height - v) && (this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m), document.removeEventListener("mouseup", g), x(this, E, !1), _(this, et, yt).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", f), this.$canvas.addEventListener("mousemove", m), document.addEventListener("mouseup", g);
}, ht = new WeakSet(), Ft = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === r(this, D));
  t.deltaY < 0 && e > 0 ? (x(this, D, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: r(this, H),
    areas: r(this, P),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (x(this, D, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: r(this, H),
    areas: r(this, P),
    _privateFlag: !0
  }));
}, ct = new WeakSet(), Ht = function(t) {
  t.preventDefault(), x(this, E, !0), x(this, j, t.touches[0].clientX), t.touches.length === 2 && x(this, X, wt(t.touches));
}, ut = new WeakSet(), Ct = function(t) {
  if (t.preventDefault(), !r(this, E))
    return;
  if (t.touches.length === 2 && r(this, X) !== null) {
    const m = wt(t.touches), g = Math.abs(r(this, X) - m) >= 35;
    if (!g)
      return;
    let d = this.cfg.timeSpacingList.findIndex((M) => M === r(this, D));
    if (m < r(this, X) ? d += 1 : d -= 1, d < 0 || d > this.cfg.timeSpacingList.length - 1)
      return;
    x(this, D, this.cfg.timeSpacingList[d]), g && x(this, X, m), this.draw({
      currentTime: r(this, H),
      areas: r(this, P),
      _privateFlag: !0
    });
    return;
  }
  if (r(this, j) === null)
    return;
  const e = t.touches[0], o = e.clientX - r(this, j), f = Math.round(r(this, H) - r(this, D) / this.cfg.scaleSpacing * o);
  x(this, j, e.clientX), this.draw({
    currentTime: f,
    areas: r(this, P),
    _privateFlag: !0
  });
}, lt = new WeakSet(), Lt = function(t) {
  r(this, E) && (x(this, E, !1), x(this, j, null), t.touches.length < 2 && x(this, X, null), _(this, et, yt).call(this, "dragged", r(this, H)));
}, ft = new WeakSet(), Ot = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || x(this, N, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: r(this, H),
    areas: r(this, P)
  }));
}, dt = new WeakSet(), _t = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, mt = new WeakSet(), Pt = function() {
  const t = () => r(this, D) < 1e3 ? `${r(this, D)}ms` : r(this, D) < 6e4 ? `${Math.round(r(this, D) / 100) / 10}sec` : r(this, D) < 36e5 ? `${Math.round(r(this, D) / 100 / 60) / 10}min` : r(this, D) < 864e5 ? `${Math.round(r(this, D) / 100 / 60 / 60) / 10}hours` : r(this, D) < 6048e5 ? `${Math.round(r(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(r(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  r(this, tt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, gt = new WeakMap(), tt = new WeakMap(), J = new WeakMap(), et = new WeakSet(), yt = function(...t) {
  r(this, q).emit(...t);
};
export {
  Ut as default,
  Dt as format
};
