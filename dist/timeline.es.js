var kt = Object.defineProperty;
var Xt = (a, t, e) => t in a ? kt(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var et = (a, t, e) => (Xt(a, typeof t != "symbol" ? t + "" : t, e), e), yt = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
};
var r = (a, t, e) => (yt(a, t, "read from private field"), e ? e.call(a) : t.get(a)), y = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, b = (a, t, e, o) => (yt(a, t, "write to private field"), o ? o.call(a, e) : t.set(a, e), e);
var O = (a, t, e) => (yt(a, t, "access private method"), e);
function zt(a) {
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
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function It(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Ft = { exports: {} };
(function(a, t) {
  (function(e, o) {
    a.exports = o();
  })(At, function() {
    var e = 1e3, o = 6e4, f = 36e5, m = "millisecond", g = "second", d = "minute", M = "hour", T = "day", S = "week", v = "month", G = "quarter", C = "year", z = "date", rt = "Invalid Date", Mt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Dt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, at = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var n = ["th", "st", "nd", "rd"], i = c % 100;
      return "[" + c + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, Q = function(c, n, i) {
      var h = String(c);
      return !h || h.length >= n ? c : "" + Array(n + 1 - h.length).join(i) + c;
    }, Z = { s: Q, z: function(c) {
      var n = -c.utcOffset(), i = Math.abs(n), h = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + Q(h, 2, "0") + ":" + Q(s, 2, "0");
    }, m: function c(n, i) {
      if (n.date() < i.date())
        return -c(i, n);
      var h = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(h, v), u = i - s < 0, l = n.clone().add(h + (u ? -1 : 1), v);
      return +(-(h + (i - s) / (u ? s - l : l - s)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: v, y: C, w: S, d: T, D: z, h: M, m: d, s: g, ms: m, Q: G }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, k = "en", P = {};
    P[k] = at;
    var xt = "$isDayjsObject", Tt = function(c) {
      return c instanceof ht || !(!c || !c[xt]);
    }, ot = function c(n, i, h) {
      var s;
      if (!n)
        return k;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        P[u] && (s = u), i && (P[u] = i, s = u);
        var l = n.split("-");
        if (!s && l.length > 1)
          return c(l[0]);
      } else {
        var p = n.name;
        P[p] = n, s = p;
      }
      return !h && s && (k = s), s || !h && k;
    }, x = function(c, n) {
      if (Tt(c))
        return c.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = c, i.args = arguments, new ht(i);
    }, $ = Z;
    $.l = ot, $.i = Tt, $.w = function(c, n) {
      return x(c, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var ht = function() {
      function c(i) {
        this.$L = ot(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[xt] = !0;
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
            var l = s.match(Mt);
            if (l) {
              var p = l[2] - 1 || 0, w = (l[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(l[1], p, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, w)) : new Date(l[1], p, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, w);
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
        return this.$d.toString() !== rt;
      }, n.isSame = function(i, h) {
        var s = x(i);
        return this.startOf(h) <= s && s <= this.endOf(h);
      }, n.isAfter = function(i, h) {
        return x(i) < this.startOf(h);
      }, n.isBefore = function(i, h) {
        return this.endOf(h) < x(i);
      }, n.$g = function(i, h, s) {
        return $.u(i) ? this[h] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, h) {
        var s = this, u = !!$.u(h) || h, l = $.p(i), p = function(B, L) {
          var A = $.w(s.$u ? Date.UTC(s.$y, L, B) : new Date(s.$y, L, B), s);
          return u ? A : A.endOf(T);
        }, w = function(B, L) {
          return $.w(s.toDate()[B].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(L)), s);
        }, Y = this.$W, F = this.$M, _ = this.$D, q = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case C:
            return u ? p(1, 0) : p(31, 11);
          case v:
            return u ? p(1, F) : p(0, F + 1);
          case S:
            var R = this.$locale().weekStart || 0, K = (Y < R ? Y + 7 : Y) - R;
            return p(u ? _ - K : _ + (6 - K), F);
          case T:
          case z:
            return w(q + "Hours", 0);
          case M:
            return w(q + "Minutes", 1);
          case d:
            return w(q + "Seconds", 2);
          case g:
            return w(q + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, h) {
        var s, u = $.p(i), l = "set" + (this.$u ? "UTC" : ""), p = (s = {}, s[T] = l + "Date", s[z] = l + "Date", s[v] = l + "Month", s[C] = l + "FullYear", s[M] = l + "Hours", s[d] = l + "Minutes", s[g] = l + "Seconds", s[m] = l + "Milliseconds", s)[u], w = u === T ? this.$D + (h - this.$W) : h;
        if (u === v || u === C) {
          var Y = this.clone().set(z, 1);
          Y.$d[p](w), Y.init(), this.$d = Y.set(z, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          p && this.$d[p](w);
        return this.init(), this;
      }, n.set = function(i, h) {
        return this.clone().$set(i, h);
      }, n.get = function(i) {
        return this[$.p(i)]();
      }, n.add = function(i, h) {
        var s, u = this;
        i = Number(i);
        var l = $.p(h), p = function(F) {
          var _ = x(u);
          return $.w(_.date(_.date() + Math.round(F * i)), u);
        };
        if (l === v)
          return this.set(v, this.$M + i);
        if (l === C)
          return this.set(C, this.$y + i);
        if (l === T)
          return p(1);
        if (l === S)
          return p(7);
        var w = (s = {}, s[d] = o, s[M] = f, s[g] = e, s)[l] || 1, Y = this.$d.getTime() + i * w;
        return $.w(Y, this);
      }, n.subtract = function(i, h) {
        return this.add(-1 * i, h);
      }, n.format = function(i) {
        var h = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || rt;
        var u = i || "YYYY-MM-DDTHH:mm:ssZ", l = $.z(this), p = this.$H, w = this.$m, Y = this.$M, F = s.weekdays, _ = s.months, q = s.meridiem, R = function(L, A, tt, ct) {
          return L && (L[A] || L(h, u)) || tt[A].slice(0, ct);
        }, K = function(L) {
          return $.s(p % 12 || 12, L, "0");
        }, B = q || function(L, A, tt) {
          var ct = L < 12 ? "AM" : "PM";
          return tt ? ct.toLowerCase() : ct;
        };
        return u.replace(Dt, function(L, A) {
          return A || function(tt) {
            switch (tt) {
              case "YY":
                return String(h.$y).slice(-2);
              case "YYYY":
                return $.s(h.$y, 4, "0");
              case "M":
                return Y + 1;
              case "MM":
                return $.s(Y + 1, 2, "0");
              case "MMM":
                return R(s.monthsShort, Y, _, 3);
              case "MMMM":
                return R(_, Y);
              case "D":
                return h.$D;
              case "DD":
                return $.s(h.$D, 2, "0");
              case "d":
                return String(h.$W);
              case "dd":
                return R(s.weekdaysMin, h.$W, F, 2);
              case "ddd":
                return R(s.weekdaysShort, h.$W, F, 3);
              case "dddd":
                return F[h.$W];
              case "H":
                return String(p);
              case "HH":
                return $.s(p, 2, "0");
              case "h":
                return K(1);
              case "hh":
                return K(2);
              case "a":
                return B(p, w, !0);
              case "A":
                return B(p, w, !1);
              case "m":
                return String(w);
              case "mm":
                return $.s(w, 2, "0");
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
        var u, l = this, p = $.p(h), w = x(i), Y = (w.utcOffset() - this.utcOffset()) * o, F = this - w, _ = function() {
          return $.m(l, w);
        };
        switch (p) {
          case C:
            u = _() / 12;
            break;
          case v:
            u = _();
            break;
          case G:
            u = _() / 3;
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
        return P[this.$L];
      }, n.locale = function(i, h) {
        if (!i)
          return this.$L;
        var s = this.clone(), u = ot(i, h, !0);
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
    }(), Yt = ht.prototype;
    return x.prototype = Yt, [["$ms", m], ["$s", g], ["$m", d], ["$H", M], ["$W", T], ["$M", v], ["$y", C], ["$D", z]].forEach(function(c) {
      Yt[c[1]] = function(n) {
        return this.$g(n, c[0], c[1]);
      };
    }), x.extend = function(c, n) {
      return c.$i || (c(n, ht, x), c.$i = !0), x;
    }, x.locale = ot, x.isDayjs = Tt, x.unix = function(c) {
      return x(1e3 * c);
    }, x.en = P[k], x.Ls = P, x.p = {}, x;
  });
})(Ft);
var jt = Ft.exports;
const Rt = /* @__PURE__ */ It(jt), bt = (a, t = "MM/DD HH:mm") => Rt(a).format(t), wt = (a, t) => {
  let e, o = 0;
  return (...f) => {
    const m = Date.now(), g = m - o;
    !o || g >= t ? (o = m, a.apply(void 0, f)) : e || (e = setTimeout(() => {
      o = m, a.apply(void 0, f), e = null;
    }, t - g));
  };
}, St = (a) => {
  const [t, e] = [a[0], a[1]], o = e.clientX - t.clientX, f = e.clientY - t.clientY;
  return Math.sqrt(o * o + f * f);
}, Bt = (a, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const o = e.getContext("2d");
  o.fillStyle = a, o.fillRect(0, 0, 1, 1);
  const f = o.getImageData(0, 0, 1, 1).data;
  return `rgba(${f[0]}, ${f[1]}, ${f[2]}, ${t})`;
}, Nt = ({ xCenterPoint: a, cfg: t, timePerPixel: e, timeSpacing: o, currentTime: f, $canvas: m, screenScaleCount: g, scaleHeight: d, startTime: M, drawLine: T, drawText: S, drawArea: v }) => {
  const G = ({ space: z, scaleTimeFormat: rt, bgTimeFormat: Mt, pointerTimeFormat: Dt }) => {
    S({
      x: m.width - a / 10,
      y: 6,
      text: bt(f, Mt),
      fontSize: `${m.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const at = M % o, Q = at / e;
    for (let Z = 0; Z < g; Z++) {
      const k = Z * t.scaleSpacing - Q - t.pointerWidth / 2, P = M + Z * o - at;
      if (P % (o * z) === 0) {
        T({ x: k, y: d.long }), S({
          x: k,
          y: m.height - d.long - 5,
          text: bt(P, rt),
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
      text: bt(f, Dt),
      align: "center",
      baseLine: "middle"
    });
  }, C = t.thresholdsConfig[o];
  C && G({
    space: C.space,
    scaleTimeFormat: C.scaleTimeFormat,
    bgTimeFormat: C.bgTimeFormat,
    pointerTimeFormat: C.pointerTimeFormat
  });
}, Ut = {
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
var st, I, J, H, E, D, N, W, j, X, ut, Ht, lt, Ct, ft, Lt, dt, Ot, mt, _t, gt, Et, $t, Wt, vt, Pt, pt, nt, V, U, it;
class qt {
  constructor(t, e) {
    // 拖拽
    y(this, ut);
    // 缩放
    y(this, lt);
    // 触摸事件监听器
    y(this, ft);
    y(this, dt);
    y(this, mt);
    // 父元素size变化
    y(this, gt);
    // 清空画布
    y(this, $t);
    // 绘制比例尺
    y(this, vt);
    y(this, U);
    et(this, "$canvas");
    et(this, "$canvasParent");
    et(this, "ctx");
    et(this, "cfg");
    y(this, st, void 0);
    y(this, I, void 0);
    y(this, J, zt());
    y(this, H, 0);
    y(this, E, void 0);
    y(this, D, void 0);
    y(this, N, void 0);
    y(this, W, !1);
    y(this, j, null);
    y(this, X, null);
    // 绘制线条
    y(this, pt, ({ x: t, y: e, width: o = 1, color: f = this.cfg.scaleColor }) => {
      this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = f, this.ctx.lineWidth = o, this.ctx.stroke();
    });
    // 绘制文字
    y(this, nt, ({ x: t, y: e, text: o, color: f = this.cfg.textColor, fontSize: m = "11px", align: g = "center", baseLine: d = "alphabetic" }) => {
      this.ctx.beginPath(), this.ctx.font = `${m} ${this.cfg.fontFamily}`, this.ctx.fillStyle = f, this.ctx.textAlign = g, this.ctx.textBaseline = d, this.ctx.fillText(o, t, e);
    });
    // 绘制区域
    y(this, V, ({ startX: t, startY: e, endX: o, endY: f, bgColor: m }) => {
      this.ctx.beginPath(), this.ctx.rect(t, e, o - t, f - e), this.ctx.fillStyle = m, this.ctx.fill();
    });
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Ut, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: o, width: f, height: m, zoom: g, timeSpacingList: d, scaleHeight: M, textColor: T, bgTextColor: S } = this.cfg;
    if (S || (this.cfg.bgTextColor = Bt(T, 0.18)), g < 0 || g >= d.length || g % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${d.length - 1}, and must be an integer`);
    if (o) {
      const v = this.$canvas.parentElement;
      this.$canvasParent = v, this.$canvas.width = v.clientWidth, this.$canvas.height = v.clientHeight, new ResizeObserver(wt(O(this, gt, Et).bind(this), 200)).observe(v);
    } else
      this.$canvas.width = f, this.$canvas.height = m;
    b(this, D, d[g]), M != null && M.long && (M != null && M.short) ? b(this, N, M) : b(this, N, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", O(this, lt, Ct).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", O(this, ut, Ht).bind(this)), this.$canvas.addEventListener("touchstart", O(this, ft, Lt).bind(this), { passive: !1 }), this.$canvas.addEventListener("touchmove", wt(O(this, dt, Ot).bind(this), 1e3 / this.cfg.fps), { passive: !1 }), this.$canvas.addEventListener("touchend", O(this, mt, _t).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: o } = {}) {
    if (r(this, W) && !o)
      return;
    b(this, H, t || Date.now()), b(this, E, e || []);
    const f = this.$canvas.width / 2, m = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), g = m * r(this, D), [d, M] = b(this, st, [r(this, H) - g / 2, r(this, H) + g / 2]);
    b(this, I, g / this.$canvas.width), O(this, $t, Wt).call(this), r(this, V).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), r(this, E).forEach((T) => {
      const S = T.startTime <= d ? 0 : Math.round((T.startTime - d) / r(this, I)), v = T.endTime >= M ? this.$canvas.width : Math.round((T.endTime - d) / r(this, I));
      S < this.$canvas.width && v > 0 && r(this, V).call(this, {
        startX: S,
        startY: 0,
        endX: v,
        endY: this.$canvas.height,
        bgColor: T.bgColor || this.cfg.areaBgColor
      });
    }), Nt.bind(this)({
      xCenterPoint: f,
      screenScaleCount: m,
      startTime: d,
      timePerPixel: r(this, I),
      scaleHeight: r(this, N),
      timeSpacing: r(this, D),
      currentTime: r(this, H),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: r(this, pt).bind(this),
      drawText: r(this, nt).bind(this),
      drawArea: r(this, V).bind(this)
    }), O(this, vt, Pt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return r(this, H);
  }
  // 获取时间范围
  getTimeRange() {
    return r(this, st);
  }
  // 获取1px所占毫秒数
  getMsPerPixel() {
    return r(this, I);
  }
  on(t, e) {
    r(this, J).on(t, e);
  }
  off(t, e) {
    r(this, J).off(t, e);
  }
}
st = new WeakMap(), I = new WeakMap(), J = new WeakMap(), H = new WeakMap(), E = new WeakMap(), D = new WeakMap(), N = new WeakMap(), W = new WeakMap(), j = new WeakMap(), X = new WeakMap(), ut = new WeakSet(), Ht = function(t) {
  b(this, W, !0);
  let e = t.clientX, o = r(this, H);
  const f = wt(({ clientX: d }) => {
    r(this, W) && (o = Math.round(r(this, H) - r(this, D) / this.cfg.scaleSpacing * (d - e)), e = d, this.draw({
      currentTime: o,
      areas: r(this, E),
      _privateFlag: !0
    }));
  }, 1e3 / this.cfg.fps), m = (d) => {
    const M = this.$canvas.getBoundingClientRect(), T = d.clientX - M.left, S = d.clientY - M.top, v = 3;
    (T < v || T > this.$canvas.width - v || S < v || S > this.$canvas.height - v) && (this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m));
  }, g = () => {
    this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m), document.removeEventListener("mouseup", g), b(this, W, !1), O(this, U, it).call(this, "dragged", o);
  };
  this.$canvas.addEventListener("mousemove", f), this.$canvas.addEventListener("mousemove", m), document.addEventListener("mouseup", g);
}, lt = new WeakSet(), Ct = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((o) => o === r(this, D));
  t.deltaY < 0 && e > 0 ? (b(this, D, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: r(this, H),
    areas: r(this, E),
    _privateFlag: !0
  }), O(this, U, it).call(this, "zoom", e - 1)) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (b(this, D, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: r(this, H),
    areas: r(this, E),
    _privateFlag: !0
  }), O(this, U, it).call(this, "zoom", e + 1));
}, ft = new WeakSet(), Lt = function(t) {
  t.preventDefault(), b(this, W, !0), b(this, j, t.touches[0].clientX), t.touches.length === 2 && b(this, X, St(t.touches));
}, dt = new WeakSet(), Ot = function(t) {
  if (t.preventDefault(), !r(this, W))
    return;
  if (t.touches.length === 2 && r(this, X) !== null) {
    const m = St(t.touches), g = Math.abs(r(this, X) - m) >= 35;
    if (!g)
      return;
    let d = this.cfg.timeSpacingList.findIndex((M) => M === r(this, D));
    if (m < r(this, X) ? d += 1 : d -= 1, d < 0 || d > this.cfg.timeSpacingList.length - 1)
      return;
    b(this, D, this.cfg.timeSpacingList[d]), g && b(this, X, m), this.draw({
      currentTime: r(this, H),
      areas: r(this, E),
      _privateFlag: !0
    });
    return;
  }
  if (r(this, j) === null)
    return;
  const e = t.touches[0], o = e.clientX - r(this, j), f = Math.round(r(this, H) - r(this, D) / this.cfg.scaleSpacing * o);
  b(this, j, e.clientX), this.draw({
    currentTime: f,
    areas: r(this, E),
    _privateFlag: !0
  });
}, mt = new WeakSet(), _t = function(t) {
  r(this, W) && (b(this, W, !1), b(this, j, null), t.touches.length < 2 && b(this, X, null), O(this, U, it).call(this, "dragged", r(this, H)));
}, gt = new WeakSet(), Et = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || b(this, N, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: r(this, H),
    areas: r(this, E)
  }));
}, $t = new WeakSet(), Wt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, vt = new WeakSet(), Pt = function() {
  const t = () => r(this, D) < 1e3 ? `${r(this, D)}ms` : r(this, D) < 6e4 ? `${Math.round(r(this, D) / 100) / 10}sec` : r(this, D) < 36e5 ? `${Math.round(r(this, D) / 100 / 60) / 10}min` : r(this, D) < 864e5 ? `${Math.round(r(this, D) / 100 / 60 / 60) / 10}hours` : r(this, D) < 6048e5 ? `${Math.round(r(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(r(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  r(this, nt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, pt = new WeakMap(), nt = new WeakMap(), V = new WeakMap(), U = new WeakSet(), it = function(...t) {
  r(this, J).emit(...t);
};
export {
  qt as default,
  bt as format
};
