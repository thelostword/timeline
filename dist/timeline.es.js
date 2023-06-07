var Ft = Object.defineProperty;
var Ct = (a, t, i) => t in a ? Ft(a, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : a[t] = i;
var V = (a, t, i) => (Ct(a, typeof t != "symbol" ? t + "" : t, i), i), gt = (a, t, i) => {
  if (!t.has(a))
    throw TypeError("Cannot " + i);
};
var f = (a, t, i) => (gt(a, t, "read from private field"), i ? i.call(a) : t.get(a)), T = (a, t, i) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, i);
}, O = (a, t, i, r) => (gt(a, t, "write to private field"), r ? r.call(a, i) : t.set(a, i), i);
var H = (a, t, i) => (gt(a, t, "access private method"), i);
function Ht(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(t, i) {
    var r = a.get(t);
    r ? r.push(i) : a.set(t, [i]);
  }, off: function(t, i) {
    var r = a.get(t);
    r && (i ? r.splice(r.indexOf(i) >>> 0, 1) : a.set(t, []));
  }, emit: function(t, i) {
    var r = a.get(t);
    r && r.slice().map(function(l) {
      l(i);
    }), (r = a.get("*")) && r.slice().map(function(l) {
      l(t, i);
    });
  } };
}
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ot(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Yt = { exports: {} };
(function(a, t) {
  (function(i, r) {
    a.exports = r();
  })(Lt, function() {
    var i = 1e3, r = 6e4, l = 36e5, g = "millisecond", $ = "second", p = "minute", v = "hour", w = "day", y = "week", b = "month", F = "quarter", E = "year", W = "date", Q = "Invalid Date", ft = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, K = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, lt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(o) {
      var n = ["th", "st", "nd", "rd"], e = o % 100;
      return "[" + o + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
    } }, P = function(o, n, e) {
      var h = String(o);
      return !h || h.length >= n ? o : "" + Array(n + 1 - h.length).join(e) + o;
    }, J = { s: P, z: function(o) {
      var n = -o.utcOffset(), e = Math.abs(n), h = Math.floor(e / 60), s = e % 60;
      return (n <= 0 ? "+" : "-") + P(h, 2, "0") + ":" + P(s, 2, "0");
    }, m: function o(n, e) {
      if (n.date() < e.date())
        return -o(e, n);
      var h = 12 * (e.year() - n.year()) + (e.month() - n.month()), s = n.clone().add(h, b), u = e - s < 0, c = n.clone().add(h + (u ? -1 : 1), b);
      return +(-(h + (e - s) / (u ? s - c : c - s)) || 0);
    }, a: function(o) {
      return o < 0 ? Math.ceil(o) || 0 : Math.floor(o);
    }, p: function(o) {
      return { M: b, y: E, w: y, d: w, D: W, h: v, m: p, s: $, ms: g, Q: F }[o] || String(o || "").toLowerCase().replace(/s$/, "");
    }, u: function(o) {
      return o === void 0;
    } }, k = "en", j = {};
    j[k] = lt;
    var dt = function(o) {
      return o instanceof et;
    }, tt = function o(n, e, h) {
      var s;
      if (!n)
        return k;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        j[u] && (s = u), e && (j[u] = e, s = u);
        var c = n.split("-");
        if (!s && c.length > 1)
          return o(c[0]);
      } else {
        var m = n.name;
        j[m] = n, s = m;
      }
      return !h && s && (k = s), s || !h && k;
    }, x = function(o, n) {
      if (dt(o))
        return o.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = o, e.args = arguments, new et(e);
    }, d = J;
    d.l = tt, d.i = dt, d.w = function(o, n) {
      return x(o, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var et = function() {
      function o(e) {
        this.$L = tt(e.locale, null, !0), this.parse(e);
      }
      var n = o.prototype;
      return n.parse = function(e) {
        this.$d = function(h) {
          var s = h.date, u = h.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var c = s.match(ft);
            if (c) {
              var m = c[2] - 1 || 0, D = (c[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(c[1], m, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, D)) : new Date(c[1], m, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, D);
            }
          }
          return new Date(s);
        }(e), this.$x = e.x || {}, this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return d;
      }, n.isValid = function() {
        return this.$d.toString() !== Q;
      }, n.isSame = function(e, h) {
        var s = x(e);
        return this.startOf(h) <= s && s <= this.endOf(h);
      }, n.isAfter = function(e, h) {
        return x(e) < this.startOf(h);
      }, n.isBefore = function(e, h) {
        return this.endOf(h) < x(e);
      }, n.$g = function(e, h, s) {
        return d.u(e) ? this[h] : this.set(s, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, h) {
        var s = this, u = !!d.u(h) || h, c = d.p(e), m = function(U, C) {
          var I = d.w(s.$u ? Date.UTC(s.$y, C, U) : new Date(s.$y, C, U), s);
          return u ? I : I.endOf(w);
        }, D = function(U, C) {
          return d.w(s.toDate()[U].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, M = this.$W, S = this.$M, z = this.$D, _ = "set" + (this.$u ? "UTC" : "");
        switch (c) {
          case E:
            return u ? m(1, 0) : m(31, 11);
          case b:
            return u ? m(1, S) : m(0, S + 1);
          case y:
            var R = this.$locale().weekStart || 0, q = (M < R ? M + 7 : M) - R;
            return m(u ? z - q : z + (6 - q), S);
          case w:
          case W:
            return D(_ + "Hours", 0);
          case v:
            return D(_ + "Minutes", 1);
          case p:
            return D(_ + "Seconds", 2);
          case $:
            return D(_ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, h) {
        var s, u = d.p(e), c = "set" + (this.$u ? "UTC" : ""), m = (s = {}, s[w] = c + "Date", s[W] = c + "Date", s[b] = c + "Month", s[E] = c + "FullYear", s[v] = c + "Hours", s[p] = c + "Minutes", s[$] = c + "Seconds", s[g] = c + "Milliseconds", s)[u], D = u === w ? this.$D + (h - this.$W) : h;
        if (u === b || u === E) {
          var M = this.clone().set(W, 1);
          M.$d[m](D), M.init(), this.$d = M.set(W, Math.min(this.$D, M.daysInMonth())).$d;
        } else
          m && this.$d[m](D);
        return this.init(), this;
      }, n.set = function(e, h) {
        return this.clone().$set(e, h);
      }, n.get = function(e) {
        return this[d.p(e)]();
      }, n.add = function(e, h) {
        var s, u = this;
        e = Number(e);
        var c = d.p(h), m = function(S) {
          var z = x(u);
          return d.w(z.date(z.date() + Math.round(S * e)), u);
        };
        if (c === b)
          return this.set(b, this.$M + e);
        if (c === E)
          return this.set(E, this.$y + e);
        if (c === w)
          return m(1);
        if (c === y)
          return m(7);
        var D = (s = {}, s[p] = r, s[v] = l, s[$] = i, s)[c] || 1, M = this.$d.getTime() + e * D;
        return d.w(M, this);
      }, n.subtract = function(e, h) {
        return this.add(-1 * e, h);
      }, n.format = function(e) {
        var h = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || Q;
        var u = e || "YYYY-MM-DDTHH:mm:ssZ", c = d.z(this), m = this.$H, D = this.$m, M = this.$M, S = s.weekdays, z = s.months, _ = function(C, I, mt, st) {
          return C && (C[I] || C(h, u)) || mt[I].slice(0, st);
        }, R = function(C) {
          return d.s(m % 12 || 12, C, "0");
        }, q = s.meridiem || function(C, I, mt) {
          var st = C < 12 ? "AM" : "PM";
          return mt ? st.toLowerCase() : st;
        }, U = { YY: String(this.$y).slice(-2), YYYY: d.s(this.$y, 4, "0"), M: M + 1, MM: d.s(M + 1, 2, "0"), MMM: _(s.monthsShort, M, z, 3), MMMM: _(z, M), D: this.$D, DD: d.s(this.$D, 2, "0"), d: String(this.$W), dd: _(s.weekdaysMin, this.$W, S, 2), ddd: _(s.weekdaysShort, this.$W, S, 3), dddd: S[this.$W], H: String(m), HH: d.s(m, 2, "0"), h: R(1), hh: R(2), a: q(m, D, !0), A: q(m, D, !1), m: String(D), mm: d.s(D, 2, "0"), s: String(this.$s), ss: d.s(this.$s, 2, "0"), SSS: d.s(this.$ms, 3, "0"), Z: c };
        return u.replace(K, function(C, I) {
          return I || U[C] || c.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, h, s) {
        var u, c = d.p(h), m = x(e), D = (m.utcOffset() - this.utcOffset()) * r, M = this - m, S = d.m(this, m);
        return S = (u = {}, u[E] = S / 12, u[b] = S, u[F] = S / 3, u[y] = (M - D) / 6048e5, u[w] = (M - D) / 864e5, u[v] = M / l, u[p] = M / r, u[$] = M / i, u)[c] || M, s ? S : d.a(S);
      }, n.daysInMonth = function() {
        return this.endOf(b).$D;
      }, n.$locale = function() {
        return j[this.$L];
      }, n.locale = function(e, h) {
        if (!e)
          return this.$L;
        var s = this.clone(), u = tt(e, h, !0);
        return u && (s.$L = u), s;
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
    return x.prototype = pt, [["$ms", g], ["$s", $], ["$m", p], ["$H", v], ["$W", w], ["$M", b], ["$y", E], ["$D", W]].forEach(function(o) {
      pt[o[1]] = function(n) {
        return this.$g(n, o[0], o[1]);
      };
    }), x.extend = function(o, n) {
      return o.$i || (o(n, et, x), o.$i = !0), x;
    }, x.locale = tt, x.isDayjs = dt, x.unix = function(o) {
      return x(1e3 * o);
    }, x.en = j[k], x.Ls = j, x.p = {}, x;
  });
})(Yt);
var Et = Yt.exports;
const _t = /* @__PURE__ */ Ot(Et), $t = (a, t = "MM/DD HH:mm") => _t(a).format(t), Mt = (a, t) => {
  let i, r = 0;
  return (...l) => {
    const g = Date.now(), $ = g - r;
    !r || $ >= t ? (r = g, a.apply(void 0, l)) : i || (i = setTimeout(() => {
      r = g, a.apply(void 0, l), i = null;
    }, t - $));
  };
}, At = (a, t) => {
  const i = document.createElement("canvas");
  i.width = i.height = 1;
  const r = i.getContext("2d");
  r.fillStyle = a, r.fillRect(0, 0, 1, 1);
  const l = r.getImageData(0, 0, 1, 1).data;
  return `rgba(${l[0]}, ${l[1]}, ${l[2]}, ${t})`;
}, Wt = ({ xCenterPoint: a, cfg: t, timePerPixel: i, timeSpacing: r, currentTime: l, $canvas: g, screenScaleCount: $, scaleHeight: p, startTime: v, drawLine: w, drawText: y, drawArea: b }) => {
  const F = ({ space: E, scaleFormat: W, bgFormat: Q, currentFormat: ft }) => {
    y({
      x: g.width - a / 10,
      y: 6,
      text: $t(l, Q),
      fontSize: `${g.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const K = v % r, lt = K / i;
    for (let P = 0; P < $; P++) {
      const J = P * t.scaleSpacing - lt - t.pointWidth / 2, k = v + P * r - K;
      if (k % (r * E) === 0) {
        w({ x: J, y: p.long }), y({
          x: J,
          y: g.height - p.long - 5,
          text: $t(k, W),
          baseLine: "bottom"
        });
        continue;
      }
      w({ x: J, y: p.short });
    }
    w({
      x: a - t.pointWidth / 2,
      y: g.height,
      width: t.pointWidth,
      color: t.pointColor
    }), b({
      startX: a - 50,
      startY: 4,
      endX: a + 50,
      endY: 18,
      bgColor: t.pointColor
    }), y({
      x: a,
      y: 6,
      text: $t(l, ft),
      align: "center",
      baseLine: "top"
    });
  };
  r < 100 ? F({ space: 10, scaleFormat: "mm:ss:SSS", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : r < 1e3 ? F({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss:SSS" }) : r < 1e4 ? F({ space: 10, scaleFormat: "mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 6e4 ? F({ space: 12, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 6e5 ? F({ space: 10, scaleFormat: "HH:mm:ss", bgFormat: "YYYY/MM/DD", currentFormat: "HH:mm:ss" }) : r < 36e5 ? F({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "MM/DD HH:mm:ss" }) : r < 864e5 ? F({ space: 12, scaleFormat: "MM/DD HH:mm", bgFormat: "YYYY/MM", currentFormat: "YYYY/MM/DD HH:mm" }) : r < 6048e5 ? F({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" }) : F({ space: 10, scaleFormat: "YYYY/MM/DD", bgFormat: "YYYY", currentFormat: "YYYY/MM/DD" });
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
var Z, L, A, Y, X, N, nt, Dt, rt, wt, at, yt, ot, xt, ht, bt, ct, St, G, vt, B, it, ut, Tt;
class zt {
  constructor(t, i) {
    // 拖拽
    T(this, nt);
    // 缩放
    T(this, rt);
    // 父元素size变化
    T(this, at);
    // 清空画布
    T(this, ot);
    // 绘制比例尺
    T(this, ht);
    // 绘制线条
    T(this, ct);
    // 绘制文字
    T(this, G);
    // 绘制区域
    T(this, B);
    T(this, ut);
    V(this, "$canvas");
    V(this, "ctx");
    V(this, "$canvasParent");
    V(this, "cfg");
    T(this, Z, Ht());
    T(this, L, 0);
    T(this, A, void 0);
    T(this, Y, void 0);
    // 刻度高度
    T(this, X, void 0);
    // 是否在拖拽中
    T(this, N, !1);
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    if (typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, !(this.$canvas instanceof HTMLCanvasElement))
      throw new Error("element must be canvas!");
    this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Pt, ...i };
    const { fill: r, width: l, height: g, zoom: $, timeSpacingList: p, scaleHeight: v, textColor: w } = this.cfg;
    if (this.cfg.bgTextColor = At(w, 0.18), $ < 0 || $ >= p.length || $ % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (r) {
      const y = this.$canvas.parentElement;
      this.$canvasParent = y, this.$canvas.width = y.clientWidth, this.$canvas.height = y.clientHeight, new ResizeObserver(Mt(H(this, at, yt).bind(this), 200)).observe(y);
    } else
      l && (this.$canvas.width = l), g && (this.$canvas.height = g);
    O(this, Y, p[$]), v != null && v.long && (v != null && v.short) ? O(this, X, v) : O(this, X, {
      long: this.$canvas.height / 3,
      // 1/3高度
      medium: this.$canvas.height / 6,
      // 1/6高度
      short: this.$canvas.height / 10
      // 1/10高度
    }), this.draw(), this.$canvas.addEventListener("wheel", H(this, rt, wt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", H(this, nt, Dt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: i, _privateFlag: r } = {}) {
    if (f(this, N) && !r)
      return;
    O(this, L, t || Date.now()), O(this, A, i || []);
    const l = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), g = l * f(this, Y), $ = f(this, L) - g / 2, p = f(this, L) + g / 2, v = this.$canvas.width / 2, w = g / this.$canvas.width;
    H(this, ot, xt).call(this), H(this, B, it).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), f(this, A).forEach((y) => {
      const b = y.startTime < $ ? 0 : Math.floor((y.startTime - $) / w), F = y.endTime > p ? this.$canvas.width : Math.floor((y.endTime - $) / w);
      H(this, B, it).call(this, {
        startX: b,
        startY: 0,
        endX: F,
        endY: this.$canvas.height,
        bgColor: y.bgColor || this.cfg.areaBgColor
      });
    }), Wt.bind(this)({
      xCenterPoint: v,
      screenScaleCount: l,
      startTime: $,
      timePerPixel: w,
      scaleHeight: f(this, X),
      timeSpacing: f(this, Y),
      currentTime: f(this, L),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: H(this, ct, St).bind(this),
      drawText: H(this, G, vt).bind(this),
      drawArea: H(this, B, it).bind(this)
    }), H(this, ht, bt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return f(this, L);
  }
  on(t, i) {
    f(this, Z).on(t, i);
  }
  off(t, i) {
    f(this, Z).off(t, i);
  }
}
Z = new WeakMap(), L = new WeakMap(), A = new WeakMap(), Y = new WeakMap(), X = new WeakMap(), N = new WeakMap(), nt = new WeakSet(), Dt = function(t) {
  O(this, N, !0);
  let i = 0, r = f(this, L);
  const l = Mt(({ offsetX: p }) => {
    if (!f(this, N))
      return;
    const v = p - t.offsetX;
    r = Math.round(f(this, L) - f(this, Y) / this.cfg.scaleSpacing * (v - i)), i = v, this.draw({
      currentTime: r,
      areas: f(this, A),
      _privateFlag: !0
    });
  }, 1e3 / this.cfg.fps), g = ({ offsetX: p, offsetY: v }) => {
    (p < 3 || p > this.$canvas.width - 3 || v < 3 || v > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", g));
  }, $ = () => {
    this.$canvas.removeEventListener("mousemove", l), this.$canvas.removeEventListener("mousemove", g), document.removeEventListener("mouseup", $), O(this, N, !1), H(this, ut, Tt).call(this, "dragged", r);
  };
  this.$canvas.addEventListener("mousemove", l), this.$canvas.addEventListener("mousemove", g), document.addEventListener("mouseup", $);
}, rt = new WeakSet(), wt = function(t) {
  t.preventDefault();
  const i = this.cfg.timeSpacingList.findIndex((r) => r === f(this, Y));
  t.deltaY < 0 && i > 0 ? (O(this, Y, this.cfg.timeSpacingList[i - 1]), this.draw({
    currentTime: f(this, L),
    areas: f(this, A),
    _privateFlag: !0
  })) : t.deltaY > 0 && i < this.cfg.timeSpacingList.length - 1 && (O(this, Y, this.cfg.timeSpacingList[i + 1]), this.draw({
    currentTime: f(this, L),
    areas: f(this, A),
    _privateFlag: !0
  }));
}, at = new WeakSet(), yt = function() {
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
}, ot = new WeakSet(), xt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, ht = new WeakSet(), bt = function() {
  const t = () => f(this, Y) < 1e3 ? `${f(this, Y)}ms` : f(this, Y) < 6e4 ? `${Math.round(f(this, Y) / 100) / 10}sec` : f(this, Y) < 36e5 ? `${Math.round(f(this, Y) / 100 / 60) / 10}min` : f(this, Y) < 864e5 ? `${Math.round(f(this, Y) / 100 / 60 / 60) / 10}hours` : f(this, Y) < 6048e5 ? `${Math.round(f(this, Y) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(f(this, Y) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  H(this, G, vt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ct = new WeakSet(), St = function({ x: t, y: i, width: r = 1, color: l = this.cfg.scaleColor }) {
  this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - i), this.ctx.closePath(), this.ctx.strokeStyle = l, this.ctx.lineWidth = r, this.ctx.stroke();
}, G = new WeakSet(), vt = function({ x: t, y: i, text: r, color: l = this.cfg.textColor, fontSize: g = "11px", align: $ = "center", baseLine: p = "alphabetic" }) {
  this.ctx.beginPath(), this.ctx.font = `${g} Arial`, this.ctx.fillStyle = l, this.ctx.textAlign = $, this.ctx.textBaseline = p, this.ctx.fillText(r, t, i);
}, B = new WeakSet(), it = function({ startX: t, startY: i, endX: r, endY: l, bgColor: g }) {
  this.ctx.beginPath(), this.ctx.rect(t, i, r - t, l - i), this.ctx.fillStyle = g, this.ctx.fill();
}, ut = new WeakSet(), Tt = function(...t) {
  f(this, Z).emit(...t);
};
export {
  zt as default
};
