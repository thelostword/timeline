var Ft = Object.defineProperty;
var Ct = (a, t, s) => t in a ? Ft(a, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[t] = s;
var V = (a, t, s) => (Ct(a, typeof t != "symbol" ? t + "" : t, s), s), gt = (a, t, s) => {
  if (!t.has(a))
    throw TypeError("Cannot " + s);
};
var f = (a, t, s) => (gt(a, t, "read from private field"), s ? s.call(a) : t.get(a)), F = (a, t, s) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, s);
}, L = (a, t, s, r) => (gt(a, t, "write to private field"), r ? r.call(a, s) : t.set(a, s), s);
var H = (a, t, s) => (gt(a, t, "access private method"), s);
function Ht(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, s) {
    var r = a.get(t);
    r ? r.push(s) : a.set(t, [s]);
  }, off: function(t, s) {
    var r = a.get(t);
    r && (s ? r.splice(r.indexOf(s) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, s) {
    var r = a.get(t);
    r && r.slice().map(function(l) {
      l(s);
    }), (r = a.get("*")) && r.slice().map(function(l) {
      l(t, s);
    });
  } };
}
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Lt(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Yt = { exports: {} };
(function(a, t) {
  (function(s, r) {
    a.exports = r();
  })(Ot, function() {
    var s = 1e3, r = 6e4, l = 36e5, g = "millisecond", $ = "second", p = "minute", v = "hour", x = "day", b = "week", Y = "month", S = "quarter", _ = "year", W = "date", Q = "Invalid Date", ft = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, K = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, lt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(o) {
      var n = ["th", "st", "nd", "rd"], e = o % 100;
      return "[" + o + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
    } }, P = function(o, n, e) {
      var h = String(o);
      return !h || h.length >= n ? o : "" + Array(n + 1 - h.length).join(e) + o;
    }, J = { s: P, z: function(o) {
      var n = -o.utcOffset(), e = Math.abs(n), h = Math.floor(e / 60), i = e % 60;
      return (n <= 0 ? "+" : "-") + P(h, 2, "0") + ":" + P(i, 2, "0");
    }, m: function o(n, e) {
      if (n.date() < e.date())
        return -o(e, n);
      var h = 12 * (e.year() - n.year()) + (e.month() - n.month()), i = n.clone().add(h, Y), u = e - i < 0, c = n.clone().add(h + (u ? -1 : 1), Y);
      return +(-(h + (e - i) / (u ? i - c : c - i)) || 0);
    }, a: function(o) {
      return o < 0 ? Math.ceil(o) || 0 : Math.floor(o);
    }, p: function(o) {
      return { M: Y, y: _, w: b, d: x, D: W, h: v, m: p, s: $, ms: g, Q: S }[o] || String(o || "").toLowerCase().replace(/s$/, "");
    }, u: function(o) {
      return o === void 0;
    } }, k = "en", j = {};
    j[k] = lt;
    var dt = function(o) {
      return o instanceof et;
    }, tt = function o(n, e, h) {
      var i;
      if (!n)
        return k;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        j[u] && (i = u), e && (j[u] = e, i = u);
        var c = n.split("-");
        if (!i && c.length > 1)
          return o(c[0]);
      } else {
        var m = n.name;
        j[m] = n, i = m;
      }
      return !h && i && (k = i), i || !h && k;
    }, y = function(o, n) {
      if (dt(o))
        return o.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = o, e.args = arguments, new et(e);
    }, d = J;
    d.l = tt, d.i = dt, d.w = function(o, n) {
      return y(o, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var et = function() {
      function o(e) {
        this.$L = tt(e.locale, null, !0), this.parse(e);
      }
      var n = o.prototype;
      return n.parse = function(e) {
        this.$d = function(h) {
          var i = h.date, u = h.utc;
          if (i === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(i))
            return /* @__PURE__ */ new Date();
          if (i instanceof Date)
            return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var c = i.match(ft);
            if (c) {
              var m = c[2] - 1 || 0, w = (c[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(c[1], m, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, w)) : new Date(c[1], m, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, w);
            }
          }
          return new Date(i);
        }(e), this.$x = e.x || {}, this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return d;
      }, n.isValid = function() {
        return this.$d.toString() !== Q;
      }, n.isSame = function(e, h) {
        var i = y(e);
        return this.startOf(h) <= i && i <= this.endOf(h);
      }, n.isAfter = function(e, h) {
        return y(e) < this.startOf(h);
      }, n.isBefore = function(e, h) {
        return this.endOf(h) < y(e);
      }, n.$g = function(e, h, i) {
        return d.u(e) ? this[h] : this.set(i, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, h) {
        var i = this, u = !!d.u(h) || h, c = d.p(e), m = function(U, C) {
          var I = d.w(i.$u ? Date.UTC(i.$y, C, U) : new Date(i.$y, C, U), i);
          return u ? I : I.endOf(x);
        }, w = function(U, C) {
          return d.w(i.toDate()[U].apply(i.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), i);
        }, M = this.$W, T = this.$M, z = this.$D, E = "set" + (this.$u ? "UTC" : "");
        switch (c) {
          case _:
            return u ? m(1, 0) : m(31, 11);
          case Y:
            return u ? m(1, T) : m(0, T + 1);
          case b:
            var R = this.$locale().weekStart || 0, q = (M < R ? M + 7 : M) - R;
            return m(u ? z - q : z + (6 - q), T);
          case x:
          case W:
            return w(E + "Hours", 0);
          case v:
            return w(E + "Minutes", 1);
          case p:
            return w(E + "Seconds", 2);
          case $:
            return w(E + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, h) {
        var i, u = d.p(e), c = "set" + (this.$u ? "UTC" : ""), m = (i = {}, i[x] = c + "Date", i[W] = c + "Date", i[Y] = c + "Month", i[_] = c + "FullYear", i[v] = c + "Hours", i[p] = c + "Minutes", i[$] = c + "Seconds", i[g] = c + "Milliseconds", i)[u], w = u === x ? this.$D + (h - this.$W) : h;
        if (u === Y || u === _) {
          var M = this.clone().set(W, 1);
          M.$d[m](w), M.init(), this.$d = M.set(W, Math.min(this.$D, M.daysInMonth())).$d;
        } else
          m && this.$d[m](w);
        return this.init(), this;
      }, n.set = function(e, h) {
        return this.clone().$set(e, h);
      }, n.get = function(e) {
        return this[d.p(e)]();
      }, n.add = function(e, h) {
        var i, u = this;
        e = Number(e);
        var c = d.p(h), m = function(T) {
          var z = y(u);
          return d.w(z.date(z.date() + Math.round(T * e)), u);
        };
        if (c === Y)
          return this.set(Y, this.$M + e);
        if (c === _)
          return this.set(_, this.$y + e);
        if (c === x)
          return m(1);
        if (c === b)
          return m(7);
        var w = (i = {}, i[p] = r, i[v] = l, i[$] = s, i)[c] || 1, M = this.$d.getTime() + e * w;
        return d.w(M, this);
      }, n.subtract = function(e, h) {
        return this.add(-1 * e, h);
      }, n.format = function(e) {
        var h = this, i = this.$locale();
        if (!this.isValid())
          return i.invalidDate || Q;
        var u = e || "YYYY-MM-DDTHH:mm:ssZ", c = d.z(this), m = this.$H, w = this.$m, M = this.$M, T = i.weekdays, z = i.months, E = function(C, I, mt, it) {
          return C && (C[I] || C(h, u)) || mt[I].slice(0, it);
        }, R = function(C) {
          return d.s(m % 12 || 12, C, "0");
        }, q = i.meridiem || function(C, I, mt) {
          var it = C < 12 ? "AM" : "PM";
          return mt ? it.toLowerCase() : it;
        }, U = { YY: String(this.$y).slice(-2), YYYY: d.s(this.$y, 4, "0"), M: M + 1, MM: d.s(M + 1, 2, "0"), MMM: E(i.monthsShort, M, z, 3), MMMM: E(z, M), D: this.$D, DD: d.s(this.$D, 2, "0"), d: String(this.$W), dd: E(i.weekdaysMin, this.$W, T, 2), ddd: E(i.weekdaysShort, this.$W, T, 3), dddd: T[this.$W], H: String(m), HH: d.s(m, 2, "0"), h: R(1), hh: R(2), a: q(m, w, !0), A: q(m, w, !1), m: String(w), mm: d.s(w, 2, "0"), s: String(this.$s), ss: d.s(this.$s, 2, "0"), SSS: d.s(this.$ms, 3, "0"), Z: c };
        return u.replace(K, function(C, I) {
          return I || U[C] || c.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, h, i) {
        var u, c = d.p(h), m = y(e), w = (m.utcOffset() - this.utcOffset()) * r, M = this - m, T = d.m(this, m);
        return T = (u = {}, u[_] = T / 12, u[Y] = T, u[S] = T / 3, u[b] = (M - w) / 6048e5, u[x] = (M - w) / 864e5, u[v] = M / l, u[p] = M / r, u[$] = M / s, u)[c] || M, i ? T : d.a(T);
      }, n.daysInMonth = function() {
        return this.endOf(Y).$D;
      }, n.$locale = function() {
        return j[this.$L];
      }, n.locale = function(e, h) {
        if (!e)
          return this.$L;
        var i = this.clone(), u = tt(e, h, !0);
        return u && (i.$L = u), i;
      }, n.clone = function() {
        return d.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, o;
    }(), pt = et.prototype;
    return y.prototype = pt, [["$ms", g], ["$s", $], ["$m", p], ["$H", v], ["$W", x], ["$M", Y], ["$y", _], ["$D", W]].forEach(function(o) {
      pt[o[1]] = function(n) {
        return this.$g(n, o[0], o[1]);
      };
    }), y.extend = function(o, n) {
      return o.$i || (o(n, et, y), o.$i = !0), y;
    }, y.locale = tt, y.isDayjs = dt, y.unix = function(o) {
      return y(1e3 * o);
    }, y.en = j[k], y.Ls = j, y.p = {}, y;
  });
})(Yt);
var _t = Yt.exports;
const Et = /* @__PURE__ */ Lt(_t), $t = (a, t = "MM/DD HH:mm") => Et(a).format(t), Mt = (a, t) => {
  let s, r = 0;
  return (...l) => {
    const g = Date.now(), $ = g - r;
    !r || $ >= t ? (r = g, a.apply(void 0, l)) : s || (s = setTimeout(() => {
      r = g, a.apply(void 0, l), s = null;
    }, t - $));
  };
}, At = (a, t) => {
  const s = document.createElement("canvas");
  s.width = s.height = 1;
  const r = s.getContext("2d");
  r.fillStyle = a, r.fillRect(0, 0, 1, 1);
  const l = r.getImageData(0, 0, 1, 1).data;
  return `rgba(${l[0]}, ${l[1]}, ${l[2]}, ${t})`;
}, Wt = ({ xCenterPoint: a, cfg: t, timePerPixel: s, timeSpacing: r, currentTime: l, $canvas: g, screenScaleCount: $, scaleHeight: p, startTime: v, drawLine: x, drawText: b, drawArea: Y }) => {
  const S = ({ space: _, scaleFormat: W, bgFormat: Q, currentFormat: ft }) => {
    b({
      x: g.width - a / 10,
      y: 6,
      text: $t(l, Q),
      fontSize: `${g.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const K = v % r, lt = K / s;
    for (let P = 0; P < $; P++) {
      const J = P * t.scaleSpacing - lt - t.pointWidth / 2, k = v + P * r - K;
      if (k % (r * _) === 0) {
        x({ x: J, y: p.long }), b({
          x: J,
          y: g.height - p.long - 5,
          text: $t(k, W),
          baseLine: "bottom"
        });
        continue;
      }
      x({ x: J, y: p.short });
    }
    x({
      x: a - t.pointWidth / 2,
      y: g.height,
      width: t.pointWidth,
      color: t.pointColor
    }), Y({
      startX: a - 50,
      startY: 4,
      endX: a + 50,
      endY: 18,
      bgColor: t.pointColor
    }), b({
      x: a,
      y: 6,
      text: $t(l, ft),
      align: "center",
      baseLine: "top"
    });
  };
  r < 100 ? S({ space: 10, scaleFormat: "mm:ss:SSS", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : r < 1e3 ? S({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : r < 1e4 ? S({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 6e4 ? S({ space: 12, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 6e5 ? S({ space: 10, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 36e5 ? S({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "MM/DD HH:mm:ss" }) : r < 864e5 ? S({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "YYYY/MM/DD HH:mm" }) : r < 6048e5 ? S({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" }) : S({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" });
}, Pt = {
  fill: !0,
  width: 1e3,
  height: 60,
  bgColor: "rgba(0,0,0,0.5)",
  areaBgColor: "#ffffff55",
  textColor: "#ffffff",
  scaleColor: "#ffffff",
  pointColor: "#00aeec",
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 60,
  zoom: 3,
  timeSpacingList: [10, 100, 1e3, 1e4, 6e4, 6e5, 36e5, 864e5, 6048e5]
};
var Z, O, A, D, X, N, nt, Dt, rt, wt, at, xt, ot, yt, ht, bt, ct, St, G, vt, B, st, ut, Tt;
class zt {
  constructor(t, s) {
    // 拖拽
    F(this, nt);
    // 缩放
    F(this, rt);
    // 父元素size变化
    F(this, at);
    // 清空画布
    F(this, ot);
    // 绘制比例尺
    F(this, ht);
    // 绘制线条
    F(this, ct);
    // 绘制文字
    F(this, G);
    // 绘制区域
    F(this, B);
    F(this, ut);
    V(this, "$canvas");
    V(this, "ctx");
    V(this, "$canvasParent");
    V(this, "cfg");
    F(this, Z, Ht());
    F(this, O, 0);
    F(this, A, void 0);
    F(this, D, void 0);
    // 刻度高度
    F(this, X, void 0);
    // 是否在拖拽中
    F(this, N, !1);
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Pt, ...s };
    const { fill: r, width: l, height: g, zoom: $, timeSpacingList: p, scaleHeight: v, textColor: x, bgTextColor: b } = this.cfg;
    if (b || (this.cfg.bgTextColor = At(x, 0.18)), $ < 0 || $ >= p.length || $ % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (r) {
      const Y = this.$canvas.parentElement;
      this.$canvasParent = Y, this.$canvas.width = Y.clientWidth, this.$canvas.height = Y.clientHeight, new ResizeObserver(Mt(H(this, at, xt).bind(this), 200)).observe(Y);
    } else
      l && (this.$canvas.width = l), g && (this.$canvas.height = g);
    L(this, D, p[$]), v != null && v.long && (v != null && v.short) ? L(this, X, v) : L(this, X, {
      long: this.$canvas.height / 3,
      // 1/3高度
      medium: this.$canvas.height / 6,
      // 1/6高度
      short: this.$canvas.height / 10
      // 1/10高度
    }), this.draw(), this.$canvas.addEventListener("wheel", H(this, rt, wt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", H(this, nt, Dt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: s, _privateFlag: r } = {}) {
    if (f(this, N) && !r)
      return;
    L(this, O, t || Date.now()), L(this, A, s || []);
    const l = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), g = l * f(this, D), $ = f(this, O) - g / 2, p = f(this, O) + g / 2, v = this.$canvas.width / 2, x = g / this.$canvas.width;
    H(this, ot, yt).call(this), H(this, B, st).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), f(this, A).forEach((b) => {
      const Y = b.startTime <= $ ? 0 : Math.round((b.startTime - $) / x), S = b.endTime >= p ? this.$canvas.width : Math.round((b.endTime - $) / x);
      Y < this.$canvas.width && S > 0 && H(this, B, st).call(this, {
        startX: Y,
        startY: 0,
        endX: S,
        endY: this.$canvas.height,
        bgColor: b.bgColor || this.cfg.areaBgColor
      });
    }), Wt.bind(this)({
      xCenterPoint: v,
      screenScaleCount: l,
      startTime: $,
      timePerPixel: x,
      scaleHeight: f(this, X),
      timeSpacing: f(this, D),
      currentTime: f(this, O),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: H(this, ct, St).bind(this),
      drawText: H(this, G, vt).bind(this),
      drawArea: H(this, B, st).bind(this)
    }), H(this, ht, bt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return f(this, O);
  }
  on(t, s) {
    f(this, Z).on(t, s);
  }
  off(t, s) {
    f(this, Z).off(t, s);
  }
}
Z = new WeakMap(), O = new WeakMap(), A = new WeakMap(), D = new WeakMap(), X = new WeakMap(), N = new WeakMap(), nt = new WeakSet(), Dt = function(t) {
  L(this, N, !0);
  let s = 0, r = f(this, O);
  const l = Mt(({ offsetX: p }) => {
    if (!f(this, N))
      return;
    const v = p - t.offsetX;
    r = Math.round(f(this, O) - f(this, D) / this.cfg.scaleSpacing * (v - s)), s = v, this.draw({
      currentTime: r,
      areas: f(this, A),
      _privateFlag: !0
    });
  }, 1e3 / this.cfg.fps), g = ({ offsetX: p, offsetY: v }) => {
    (p < 3 || p > this.$canvas.width - 3 || v < 3 || v > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", g));
  }, $ = () => {
    this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", g), document.removeEventListener("mouseup", $), L(this, N, !1), H(this, ut, Tt).call(this, "dragged", r);
  };
  this.$canvas.addEventListener("mousemove", l), this.$canvas.addEventListener("mousemove", g), document.addEventListener("mouseup", $);
}, rt = new WeakSet(), wt = function(t) {
  t.preventDefault();
  const s = this.cfg.timeSpacingList.findIndex((r) => r === f(this, D));
  t.deltaY < 0 && s > 0 ? (L(this, D, this.cfg.timeSpacingList[s - 1]), this.draw({
    currentTime: f(this, O),
    areas: f(this, A),
    _privateFlag: !0
  })) : t.deltaY > 0 && s < this.cfg.timeSpacingList.length - 1 && (L(this, D, this.cfg.timeSpacingList[s + 1]), this.draw({
    currentTime: f(this, O),
    areas: f(this, A),
    _privateFlag: !0
  }));
}, at = new WeakSet(), xt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || L(this, X, {
    long: this.$canvas.height / 3,
    // 1/3高度
    medium: this.$canvas.height / 6,
    // 1/6高度
    short: this.$canvas.height / 10
    // 1/10高度
  }), this.draw({
    currentTime: f(this, O),
    areas: f(this, A)
  }));
}, ot = new WeakSet(), yt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, ht = new WeakSet(), bt = function() {
  const t = () => f(this, D) < 1e3 ? `${f(this, D)}ms` : f(this, D) < 6e4 ? `${Math.round(f(this, D) / 100) / 10}sec` : f(this, D) < 36e5 ? `${Math.round(f(this, D) / 100 / 60) / 10}min` : f(this, D) < 864e5 ? `${Math.round(f(this, D) / 100 / 60 / 60) / 10}hours` : f(this, D) < 6048e5 ? `${Math.round(f(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(f(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  H(this, G, vt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ct = new WeakSet(), St = function({ x: t, y: s, width: r = 1, color: l = this.cfg.scaleColor }) {
  this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - s), this.ctx.closePath(), this.ctx.strokeStyle = l, this.ctx.lineWidth = r, this.ctx.stroke();
}, G = new WeakSet(), vt = function({ x: t, y: s, text: r, color: l = this.cfg.textColor, fontSize: g = "11px", align: $ = "center", baseLine: p = "alphabetic" }) {
  this.ctx.beginPath(), this.ctx.font = `${g} Arial`, this.ctx.fillStyle = l, this.ctx.textAlign = $, this.ctx.textBaseline = p, this.ctx.fillText(r, t, s);
}, B = new WeakSet(), st = function({ startX: t, startY: s, endX: r, endY: l, bgColor: g }) {
  this.ctx.beginPath(), this.ctx.rect(t, s, r - t, l - s), this.ctx.fillStyle = g, this.ctx.fill();
}, ut = new WeakSet(), Tt = function(...t) {
  f(this, Z).emit(...t);
};
export {
  zt as default
};
