var Ft = Object.defineProperty;
var Ct = (r, t, s) => t in r ? Ft(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[t] = s;
var V = (r, t, s) => (Ct(r, typeof t != "symbol" ? t + "" : t, s), s), gt = (r, t, s) => {
  if (!t.has(r))
    throw TypeError("Cannot " + s);
};
var f = (r, t, s) => (gt(r, t, "read from private field"), s ? s.call(r) : t.get(r)), b = (r, t, s) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, s);
}, O = (r, t, s, a) => (gt(r, t, "write to private field"), a ? a.call(r, s) : t.set(r, s), s);
var H = (r, t, s) => (gt(r, t, "access private method"), s);
function Ht(r) {
  return { all: r = r || /* @__PURE__ */ new Map(), on: function(t, s) {
    var a = r.get(t);
    a ? a.push(s) : r.set(t, [s]);
  }, off: function(t, s) {
    var a = r.get(t);
    a && (s ? a.splice(a.indexOf(s) >>> 0, 1) : r.set(t, []));
  }, emit: function(t, s) {
    var a = r.get(t);
    a && a.slice().map(function(l) {
      l(s);
    }), (a = r.get("*")) && a.slice().map(function(l) {
      l(t, s);
    });
  } };
}
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ot(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Dt = { exports: {} };
(function(r, t) {
  (function(s, a) {
    r.exports = a();
  })(Lt, function() {
    var s = 1e3, a = 6e4, l = 36e5, $ = "millisecond", d = "second", v = "minute", p = "hour", Y = "day", S = "week", T = "month", F = "quarter", E = "year", W = "date", K = "Invalid Date", ft = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, tt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, lt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(o) {
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
      var h = 12 * (e.year() - n.year()) + (e.month() - n.month()), i = n.clone().add(h, T), u = e - i < 0, c = n.clone().add(h + (u ? -1 : 1), T);
      return +(-(h + (e - i) / (u ? i - c : c - i)) || 0);
    }, a: function(o) {
      return o < 0 ? Math.ceil(o) || 0 : Math.floor(o);
    }, p: function(o) {
      return { M: T, y: E, w: S, d: Y, D: W, h: p, m: v, s: d, ms: $, Q: F }[o] || String(o || "").toLowerCase().replace(/s$/, "");
    }, u: function(o) {
      return o === void 0;
    } }, k = "en", j = {};
    j[k] = lt;
    var dt = function(o) {
      return o instanceof st;
    }, et = function o(n, e, h) {
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
        var g = n.name;
        j[g] = n, i = g;
      }
      return !h && i && (k = i), i || !h && k;
    }, y = function(o, n) {
      if (dt(o))
        return o.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = o, e.args = arguments, new st(e);
    }, m = J;
    m.l = et, m.i = dt, m.w = function(o, n) {
      return y(o, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var st = function() {
      function o(e) {
        this.$L = et(e.locale, null, !0), this.parse(e);
      }
      var n = o.prototype;
      return n.parse = function(e) {
        this.$d = function(h) {
          var i = h.date, u = h.utc;
          if (i === null)
            return /* @__PURE__ */ new Date(NaN);
          if (m.u(i))
            return /* @__PURE__ */ new Date();
          if (i instanceof Date)
            return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var c = i.match(ft);
            if (c) {
              var g = c[2] - 1 || 0, w = (c[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(c[1], g, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, w)) : new Date(c[1], g, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, w);
            }
          }
          return new Date(i);
        }(e), this.$x = e.x || {}, this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return m;
      }, n.isValid = function() {
        return this.$d.toString() !== K;
      }, n.isSame = function(e, h) {
        var i = y(e);
        return this.startOf(h) <= i && i <= this.endOf(h);
      }, n.isAfter = function(e, h) {
        return y(e) < this.startOf(h);
      }, n.isBefore = function(e, h) {
        return this.endOf(h) < y(e);
      }, n.$g = function(e, h, i) {
        return m.u(e) ? this[h] : this.set(i, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, h) {
        var i = this, u = !!m.u(h) || h, c = m.p(e), g = function(U, C) {
          var I = m.w(i.$u ? Date.UTC(i.$y, C, U) : new Date(i.$y, C, U), i);
          return u ? I : I.endOf(Y);
        }, w = function(U, C) {
          return m.w(i.toDate()[U].apply(i.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), i);
        }, M = this.$W, x = this.$M, z = this.$D, _ = "set" + (this.$u ? "UTC" : "");
        switch (c) {
          case E:
            return u ? g(1, 0) : g(31, 11);
          case T:
            return u ? g(1, x) : g(0, x + 1);
          case S:
            var R = this.$locale().weekStart || 0, q = (M < R ? M + 7 : M) - R;
            return g(u ? z - q : z + (6 - q), x);
          case Y:
          case W:
            return w(_ + "Hours", 0);
          case p:
            return w(_ + "Minutes", 1);
          case v:
            return w(_ + "Seconds", 2);
          case d:
            return w(_ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, h) {
        var i, u = m.p(e), c = "set" + (this.$u ? "UTC" : ""), g = (i = {}, i[Y] = c + "Date", i[W] = c + "Date", i[T] = c + "Month", i[E] = c + "FullYear", i[p] = c + "Hours", i[v] = c + "Minutes", i[d] = c + "Seconds", i[$] = c + "Milliseconds", i)[u], w = u === Y ? this.$D + (h - this.$W) : h;
        if (u === T || u === E) {
          var M = this.clone().set(W, 1);
          M.$d[g](w), M.init(), this.$d = M.set(W, Math.min(this.$D, M.daysInMonth())).$d;
        } else
          g && this.$d[g](w);
        return this.init(), this;
      }, n.set = function(e, h) {
        return this.clone().$set(e, h);
      }, n.get = function(e) {
        return this[m.p(e)]();
      }, n.add = function(e, h) {
        var i, u = this;
        e = Number(e);
        var c = m.p(h), g = function(x) {
          var z = y(u);
          return m.w(z.date(z.date() + Math.round(x * e)), u);
        };
        if (c === T)
          return this.set(T, this.$M + e);
        if (c === E)
          return this.set(E, this.$y + e);
        if (c === Y)
          return g(1);
        if (c === S)
          return g(7);
        var w = (i = {}, i[v] = a, i[p] = l, i[d] = s, i)[c] || 1, M = this.$d.getTime() + e * w;
        return m.w(M, this);
      }, n.subtract = function(e, h) {
        return this.add(-1 * e, h);
      }, n.format = function(e) {
        var h = this, i = this.$locale();
        if (!this.isValid())
          return i.invalidDate || K;
        var u = e || "YYYY-MM-DDTHH:mm:ssZ", c = m.z(this), g = this.$H, w = this.$m, M = this.$M, x = i.weekdays, z = i.months, _ = function(C, I, mt, it) {
          return C && (C[I] || C(h, u)) || mt[I].slice(0, it);
        }, R = function(C) {
          return m.s(g % 12 || 12, C, "0");
        }, q = i.meridiem || function(C, I, mt) {
          var it = C < 12 ? "AM" : "PM";
          return mt ? it.toLowerCase() : it;
        }, U = { YY: String(this.$y).slice(-2), YYYY: m.s(this.$y, 4, "0"), M: M + 1, MM: m.s(M + 1, 2, "0"), MMM: _(i.monthsShort, M, z, 3), MMMM: _(z, M), D: this.$D, DD: m.s(this.$D, 2, "0"), d: String(this.$W), dd: _(i.weekdaysMin, this.$W, x, 2), ddd: _(i.weekdaysShort, this.$W, x, 3), dddd: x[this.$W], H: String(g), HH: m.s(g, 2, "0"), h: R(1), hh: R(2), a: q(g, w, !0), A: q(g, w, !1), m: String(w), mm: m.s(w, 2, "0"), s: String(this.$s), ss: m.s(this.$s, 2, "0"), SSS: m.s(this.$ms, 3, "0"), Z: c };
        return u.replace(tt, function(C, I) {
          return I || U[C] || c.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, h, i) {
        var u, c = m.p(h), g = y(e), w = (g.utcOffset() - this.utcOffset()) * a, M = this - g, x = m.m(this, g);
        return x = (u = {}, u[E] = x / 12, u[T] = x, u[F] = x / 3, u[S] = (M - w) / 6048e5, u[Y] = (M - w) / 864e5, u[p] = M / l, u[v] = M / a, u[d] = M / s, u)[c] || M, i ? x : m.a(x);
      }, n.daysInMonth = function() {
        return this.endOf(T).$D;
      }, n.$locale = function() {
        return j[this.$L];
      }, n.locale = function(e, h) {
        if (!e)
          return this.$L;
        var i = this.clone(), u = et(e, h, !0);
        return u && (i.$L = u), i;
      }, n.clone = function() {
        return m.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, o;
    }(), Mt = st.prototype;
    return y.prototype = Mt, [["$ms", $], ["$s", d], ["$m", v], ["$H", p], ["$W", Y], ["$M", T], ["$y", E], ["$D", W]].forEach(function(o) {
      Mt[o[1]] = function(n) {
        return this.$g(n, o[0], o[1]);
      };
    }), y.extend = function(o, n) {
      return o.$i || (o(n, st, y), o.$i = !0), y;
    }, y.locale = et, y.isDayjs = dt, y.unix = function(o) {
      return y(1e3 * o);
    }, y.en = j[k], y.Ls = j, y.p = {}, y;
  });
})(Dt);
var Et = Dt.exports;
const _t = /* @__PURE__ */ Ot(Et);
function At(r, t) {
  const s = Wt(r), a = kt(t, 0, 1), l = {
    ...s,
    a
  };
  return Pt(l);
}
function Wt(r) {
  const t = document.createElement("canvas");
  t.width = t.height = 1;
  const s = t.getContext("2d");
  s.fillStyle = r, s.fillRect(0, 0, 1, 1);
  const a = s.getImageData(0, 0, 1, 1).data;
  return {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a[3] / 255
  };
}
function Pt(r) {
  return `rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`;
}
function kt(r, t, s) {
  return Math.min(Math.max(r, t), s);
}
const $t = (r, t = "MM/DD HH:mm") => _t(r).format(t), Yt = (r, t) => {
  let s, a = 0;
  return (...l) => {
    const $ = Date.now(), d = $ - a;
    !a || d >= t ? (a = $, r.apply(void 0, l)) : s || (s = setTimeout(() => {
      a = $, r.apply(void 0, l), s = null;
    }, t - d));
  };
}, zt = ({ xCenterPoint: r, cfg: t, timePerPixel: s, timeSpacing: a, currentTime: l, $canvas: $, screenScaleCount: d, scaleHeight: v, startTime: p, drawLine: Y, drawText: S, drawArea: T }) => {
  const F = ({ space: E, scaleFormat: W, bgFormat: K, currentFormat: ft }) => {
    S({
      x: $.width - r / 10,
      y: 6,
      text: $t(l, K),
      fontSize: `${$.height - 5}px`,
      align: "right",
      baseLine: "top",
      // color: Color(cfg.textColor).alpha(0.18).string(),
      color: At(t.textColor, 0.18)
    });
    const tt = p % a, lt = tt / s;
    for (let P = 0; P < d; P++) {
      const J = P * t.scaleSpacing - lt - t.pointWidth / 2, k = p + P * a - tt;
      if (k % (a * E) === 0) {
        Y({ x: J, y: v.long }), S({
          x: J,
          y: $.height - v.long - 5,
          text: $t(k, W),
          baseLine: "bottom"
        });
        continue;
      }
      Y({ x: J, y: v.short });
    }
    Y({
      x: r - t.pointWidth / 2,
      y: $.height,
      width: t.pointWidth,
      color: t.pointColor
    }), T({
      startX: r - 50,
      startY: 4,
      endX: r + 50,
      endY: 18,
      bgColor: t.pointColor
    }), S({
      x: r,
      y: 6,
      text: $t(l, ft),
      align: "center",
      baseLine: "top"
    });
  };
  a < 100 ? F({ space: 10, scaleFormat: "mm:ss:SSS", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : a < 1e3 ? F({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : a < 1e4 ? F({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : a < 6e4 ? F({ space: 12, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : a < 6e5 ? F({ space: 10, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : a < 36e5 ? F({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "MM/DD HH:mm:ss" }) : a < 864e5 ? F({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "YYYY/MM/DD HH:mm" }) : a < 6048e5 ? F({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" }) : F({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" });
}, It = {
  fill: !0,
  bgColor: "rgba(0,0,0,0.5)",
  areaBgColor: "#ffffff55",
  textColor: "#ffffff",
  scaleColor: "#ffffff",
  pointColor: "#00aeec",
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 60,
  zoom: 2,
  timeSpacingList: [10, 100, 1e3, 1e4, 6e4, 6e5, 36e5, 864e5, 6048e5]
};
var Z, L, A, D, X, N, rt, wt, at, yt, ot, xt, ht, bt, ct, St, ut, Tt, G, vt, B, nt, Q, pt;
class Xt {
  constructor(t, s) {
    // 拖拽
    b(this, rt);
    // 缩放
    b(this, at);
    // 父元素size变化
    b(this, ot);
    // 清空画布
    b(this, ht);
    // 绘制比例尺
    b(this, ct);
    // 绘制线条
    b(this, ut);
    // 绘制文字
    b(this, G);
    // 绘制区域
    b(this, B);
    b(this, Q);
    V(this, "$canvas");
    // canvas 元素
    V(this, "ctx");
    // canvas context,
    V(this, "$canvasParent");
    V(this, "cfg");
    b(this, Z, Ht());
    b(this, L, 0);
    // 当前时间
    b(this, A, void 0);
    // 阴影区域
    b(this, D, void 0);
    // 刻度高度
    b(this, X, void 0);
    // 是否在拖拽中
    b(this, N, !1);
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    if (typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, !(this.$canvas instanceof HTMLCanvasElement))
      throw new Error("element must be canvas!");
    this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...It, ...s };
    const { fill: a, width: l, height: $, zoom: d, timeSpacingList: v, scaleHeight: p } = this.cfg;
    if (d < 0 || d >= v.length || d % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${v.length - 1}, and must be an integer`);
    if (a) {
      const Y = this.$canvas.parentElement;
      this.$canvasParent = Y, this.$canvas.width = Y.clientWidth, this.$canvas.height = Y.clientHeight, new ResizeObserver(Yt(H(this, ot, xt).bind(this), 200)).observe(Y);
    } else
      l && (this.$canvas.width = l), $ && (this.$canvas.height = $);
    O(this, D, v[d]), p != null && p.long && (p != null && p.short) ? O(this, X, p) : O(this, X, {
      long: this.$canvas.height / 3,
      // 1/3高度
      medium: this.$canvas.height / 6,
      // 1/6高度
      short: this.$canvas.height / 10
      // 1/10高度
    }), this.$canvas.addEventListener("wheel", H(this, at, yt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", H(this, rt, wt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: s, _privateFlag: a } = {}) {
    if (f(this, N) && !a)
      return;
    O(this, L, t || Date.now()), O(this, A, s || []);
    const l = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), $ = l * f(this, D), d = f(this, L) - $ / 2, v = f(this, L) + $ / 2, p = this.$canvas.width / 2, Y = $ / this.$canvas.width;
    H(this, ht, bt).call(this), H(this, B, nt).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), f(this, A).forEach((S) => {
      const T = S.startTime < d ? 0 : Math.floor((S.startTime - d) / Y), F = S.endTime > v ? this.$canvas.width : Math.floor((S.endTime - d) / Y);
      H(this, B, nt).call(this, {
        startX: T,
        startY: 0,
        endX: F,
        endY: this.$canvas.height,
        bgColor: S.bgColor || this.cfg.areaBgColor
      });
    }), zt.bind(this)({
      xCenterPoint: p,
      screenScaleCount: l,
      startTime: d,
      timePerPixel: Y,
      scaleHeight: f(this, X),
      timeSpacing: f(this, D),
      currentTime: f(this, L),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: H(this, ut, Tt).bind(this),
      drawText: H(this, G, vt).bind(this),
      drawArea: H(this, B, nt).bind(this)
    }), H(this, ct, St).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return f(this, L);
  }
  on(t, s) {
    f(this, Z).on(t, s);
  }
  off(t, s) {
    f(this, Z).off(t, s);
  }
}
Z = new WeakMap(), L = new WeakMap(), A = new WeakMap(), D = new WeakMap(), X = new WeakMap(), N = new WeakMap(), rt = new WeakSet(), wt = function(t) {
  O(this, N, !0);
  let s = 0;
  const a = Yt(({ offsetX: d }) => {
    const v = d - t.offsetX, p = f(this, L) - f(this, D) / this.cfg.scaleSpacing * (v - s);
    s = v, this.draw({
      currentTime: Math.round(p),
      areas: f(this, A),
      _privateFlag: !0
    });
  }, 1e3 / this.cfg.fps), l = ({ offsetX: d, offsetY: v }) => {
    (d < 3 || d > this.$canvas.width - 3 || v < 3 || v > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", a), this.$canvas.removeEventListener("mousemove", l), O(this, N, !1), H(this, Q, pt).call(this, "dragend", f(this, L)));
  }, $ = () => {
    this.$canvas.removeEventListener("mousemove", a), this.$canvas.removeEventListener("mousemove", l), O(this, N, !1), H(this, Q, pt).call(this, "dragend", f(this, L)), document.removeEventListener("mouseup", $);
  };
  this.$canvas.addEventListener("mousemove", a), this.$canvas.addEventListener("mousemove", l), document.addEventListener("mouseup", $);
}, at = new WeakSet(), yt = function(t) {
  t.preventDefault();
  const s = this.cfg.timeSpacingList.findIndex((a) => a === f(this, D));
  t.deltaY < 0 && s > 0 ? (O(this, D, this.cfg.timeSpacingList[s - 1]), this.draw({
    currentTime: f(this, L),
    areas: f(this, A),
    _privateFlag: !0
  })) : t.deltaY > 0 && s < this.cfg.timeSpacingList.length - 1 && (O(this, D, this.cfg.timeSpacingList[s + 1]), this.draw({
    currentTime: f(this, L),
    areas: f(this, A),
    _privateFlag: !0
  }));
}, ot = new WeakSet(), xt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || O(this, X, {
    long: this.$canvas.height / 3,
    // 1/3高度
    medium: this.$canvas.height / 6,
    // 1/6高度
    short: this.$canvas.height / 10
    // 1/10高度
  }), this.draw({
    currentTime: f(this, L),
    areas: f(this, A)
  }));
}, ht = new WeakSet(), bt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, ct = new WeakSet(), St = function() {
  const t = () => f(this, D) < 1e3 ? `${f(this, D)}ms` : f(this, D) < 6e4 ? `${Math.round(f(this, D) / 100) / 10}sec` : f(this, D) < 36e5 ? `${Math.round(f(this, D) / 100 / 60) / 10}min` : f(this, D) < 864e5 ? `${Math.round(f(this, D) / 100 / 60 / 60) / 10}hours` : f(this, D) < 6048e5 ? `${Math.round(f(this, D) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(f(this, D) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  H(this, G, vt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ut = new WeakSet(), Tt = function({ x: t, y: s, width: a = 1, color: l = this.cfg.scaleColor }) {
  this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - s), this.ctx.closePath(), this.ctx.strokeStyle = l, this.ctx.lineWidth = a, this.ctx.stroke();
}, G = new WeakSet(), vt = function({ x: t, y: s, text: a, color: l = this.cfg.textColor, fontSize: $ = "11px", align: d = "center", baseLine: v = "alphabetic" }) {
  this.ctx.beginPath(), this.ctx.font = `${$} Arial`, this.ctx.fillStyle = l, this.ctx.textAlign = d, this.ctx.textBaseline = v, this.ctx.fillText(a, t, s);
}, B = new WeakSet(), nt = function({ startX: t, startY: s, endX: a, endY: l, bgColor: $ }) {
  this.ctx.beginPath(), this.ctx.rect(t, s, a - t, l - s), this.ctx.fillStyle = $, this.ctx.fill();
}, Q = new WeakSet(), pt = function(...t) {
  f(this, Z).emit(...t);
};
export {
  Xt as default
};
