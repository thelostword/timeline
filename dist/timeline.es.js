var Ct = Object.defineProperty;
var Ht = (o, t, e) => t in o ? Ct(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var G = (o, t, e) => (Ht(o, typeof t != "symbol" ? t + "" : t, e), e), $t = (o, t, e) => {
  if (!t.has(o))
    throw TypeError("Cannot " + e);
};
var l = (o, t, e) => ($t(o, t, "read from private field"), e ? e.call(o) : t.get(o)), F = (o, t, e) => {
  if (t.has(o))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(o) : t.set(o, e);
}, _ = (o, t, e, r) => ($t(o, t, "write to private field"), r ? r.call(o, e) : t.set(o, e), e);
var H = (o, t, e) => ($t(o, t, "access private method"), e);
function Ot(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(t, e) {
    var r = o.get(t);
    r ? r.push(e) : o.set(t, [e]);
  }, off: function(t, e) {
    var r = o.get(t);
    r && (e ? r.splice(r.indexOf(e) >>> 0, 1) : o.set(t, []));
  }, emit: function(t, e) {
    var r = o.get(t);
    r && r.slice().map(function(f) {
      f(e);
    }), (r = o.get("*")) && r.slice().map(function(f) {
      f(t, e);
    });
  } };
}
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _t(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Yt = { exports: {} };
(function(o, t) {
  (function(e, r) {
    o.exports = r();
  })(Lt, function() {
    var e = 1e3, r = 6e4, f = 36e5, m = "millisecond", $ = "second", p = "minute", v = "hour", T = "day", b = "week", M = "month", x = "quarter", E = "year", k = "date", K = "Invalid Date", ft = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, tt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, dt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(h) {
      var n = ["th", "st", "nd", "rd"], i = h % 100;
      return "[" + h + (n[(i - 20) % 10] || n[i] || n[0]) + "]";
    } }, A = function(h, n, i) {
      var a = String(h);
      return !a || a.length >= n ? h : "" + Array(n + 1 - a.length).join(i) + h;
    }, R = { s: A, z: function(h) {
      var n = -h.utcOffset(), i = Math.abs(n), a = Math.floor(i / 60), s = i % 60;
      return (n <= 0 ? "+" : "-") + A(a, 2, "0") + ":" + A(s, 2, "0");
    }, m: function h(n, i) {
      if (n.date() < i.date())
        return -h(i, n);
      var a = 12 * (i.year() - n.year()) + (i.month() - n.month()), s = n.clone().add(a, M), c = i - s < 0, u = n.clone().add(a + (c ? -1 : 1), M);
      return +(-(a + (i - s) / (c ? s - u : u - s)) || 0);
    }, a: function(h) {
      return h < 0 ? Math.ceil(h) || 0 : Math.floor(h);
    }, p: function(h) {
      return { M, y: E, w: b, d: T, D: k, h: v, m: p, s: $, ms: m, Q: x }[h] || String(h || "").toLowerCase().replace(/s$/, "");
    }, u: function(h) {
      return h === void 0;
    } }, P = "en", z = {};
    z[P] = dt;
    var pt = "$isDayjsObject", mt = function(h) {
      return h instanceof it || !(!h || !h[pt]);
    }, et = function h(n, i, a) {
      var s;
      if (!n)
        return P;
      if (typeof n == "string") {
        var c = n.toLowerCase();
        z[c] && (s = c), i && (z[c] = i, s = c);
        var u = n.split("-");
        if (!s && u.length > 1)
          return h(u[0]);
      } else {
        var g = n.name;
        z[g] = n, s = g;
      }
      return !a && s && (P = s), s || !a && P;
    }, w = function(h, n) {
      if (mt(h))
        return h.clone();
      var i = typeof n == "object" ? n : {};
      return i.date = h, i.args = arguments, new it(i);
    }, d = R;
    d.l = et, d.i = mt, d.w = function(h, n) {
      return w(h, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var it = function() {
      function h(i) {
        this.$L = et(i.locale, null, !0), this.parse(i), this.$x = this.$x || i.x || {}, this[pt] = !0;
      }
      var n = h.prototype;
      return n.parse = function(i) {
        this.$d = function(a) {
          var s = a.date, c = a.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var u = s.match(ft);
            if (u) {
              var g = u[2] - 1 || 0, D = (u[7] || "0").substring(0, 3);
              return c ? new Date(Date.UTC(u[1], g, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, D)) : new Date(u[1], g, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, D);
            }
          }
          return new Date(s);
        }(i), this.init();
      }, n.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, n.$utils = function() {
        return d;
      }, n.isValid = function() {
        return this.$d.toString() !== K;
      }, n.isSame = function(i, a) {
        var s = w(i);
        return this.startOf(a) <= s && s <= this.endOf(a);
      }, n.isAfter = function(i, a) {
        return w(i) < this.startOf(a);
      }, n.isBefore = function(i, a) {
        return this.endOf(a) < w(i);
      }, n.$g = function(i, a, s) {
        return d.u(i) ? this[a] : this.set(s, i);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(i, a) {
        var s = this, c = !!d.u(a) || a, u = d.p(i), g = function(X, C) {
          var j = d.w(s.$u ? Date.UTC(s.$y, C, X) : new Date(s.$y, C, X), s);
          return c ? j : j.endOf(T);
        }, D = function(X, C) {
          return d.w(s.toDate()[X].apply(s.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, y = this.$W, S = this.$M, L = this.$D, Z = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case E:
            return c ? g(1, 0) : g(31, 11);
          case M:
            return c ? g(1, S) : g(0, S + 1);
          case b:
            var I = this.$locale().weekStart || 0, q = (y < I ? y + 7 : y) - I;
            return g(c ? L - q : L + (6 - q), S);
          case T:
          case k:
            return D(Z + "Hours", 0);
          case v:
            return D(Z + "Minutes", 1);
          case p:
            return D(Z + "Seconds", 2);
          case $:
            return D(Z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(i) {
        return this.startOf(i, !1);
      }, n.$set = function(i, a) {
        var s, c = d.p(i), u = "set" + (this.$u ? "UTC" : ""), g = (s = {}, s[T] = u + "Date", s[k] = u + "Date", s[M] = u + "Month", s[E] = u + "FullYear", s[v] = u + "Hours", s[p] = u + "Minutes", s[$] = u + "Seconds", s[m] = u + "Milliseconds", s)[c], D = c === T ? this.$D + (a - this.$W) : a;
        if (c === M || c === E) {
          var y = this.clone().set(k, 1);
          y.$d[g](D), y.init(), this.$d = y.set(k, Math.min(this.$D, y.daysInMonth())).$d;
        } else
          g && this.$d[g](D);
        return this.init(), this;
      }, n.set = function(i, a) {
        return this.clone().$set(i, a);
      }, n.get = function(i) {
        return this[d.p(i)]();
      }, n.add = function(i, a) {
        var s, c = this;
        i = Number(i);
        var u = d.p(a), g = function(S) {
          var L = w(c);
          return d.w(L.date(L.date() + Math.round(S * i)), c);
        };
        if (u === M)
          return this.set(M, this.$M + i);
        if (u === E)
          return this.set(E, this.$y + i);
        if (u === T)
          return g(1);
        if (u === b)
          return g(7);
        var D = (s = {}, s[p] = r, s[v] = f, s[$] = e, s)[u] || 1, y = this.$d.getTime() + i * D;
        return d.w(y, this);
      }, n.subtract = function(i, a) {
        return this.add(-1 * i, a);
      }, n.format = function(i) {
        var a = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || K;
        var c = i || "YYYY-MM-DDTHH:mm:ssZ", u = d.z(this), g = this.$H, D = this.$m, y = this.$M, S = s.weekdays, L = s.months, Z = s.meridiem, I = function(C, j, V, st) {
          return C && (C[j] || C(a, c)) || V[j].slice(0, st);
        }, q = function(C) {
          return d.s(g % 12 || 12, C, "0");
        }, X = Z || function(C, j, V) {
          var st = C < 12 ? "AM" : "PM";
          return V ? st.toLowerCase() : st;
        };
        return c.replace(tt, function(C, j) {
          return j || function(V) {
            switch (V) {
              case "YY":
                return String(a.$y).slice(-2);
              case "YYYY":
                return d.s(a.$y, 4, "0");
              case "M":
                return y + 1;
              case "MM":
                return d.s(y + 1, 2, "0");
              case "MMM":
                return I(s.monthsShort, y, L, 3);
              case "MMMM":
                return I(L, y);
              case "D":
                return a.$D;
              case "DD":
                return d.s(a.$D, 2, "0");
              case "d":
                return String(a.$W);
              case "dd":
                return I(s.weekdaysMin, a.$W, S, 2);
              case "ddd":
                return I(s.weekdaysShort, a.$W, S, 3);
              case "dddd":
                return S[a.$W];
              case "H":
                return String(g);
              case "HH":
                return d.s(g, 2, "0");
              case "h":
                return q(1);
              case "hh":
                return q(2);
              case "a":
                return X(g, D, !0);
              case "A":
                return X(g, D, !1);
              case "m":
                return String(D);
              case "mm":
                return d.s(D, 2, "0");
              case "s":
                return String(a.$s);
              case "ss":
                return d.s(a.$s, 2, "0");
              case "SSS":
                return d.s(a.$ms, 3, "0");
              case "Z":
                return u;
            }
            return null;
          }(C) || u.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(i, a, s) {
        var c, u = this, g = d.p(a), D = w(i), y = (D.utcOffset() - this.utcOffset()) * r, S = this - D, L = function() {
          return d.m(u, D);
        };
        switch (g) {
          case E:
            c = L() / 12;
            break;
          case M:
            c = L();
            break;
          case x:
            c = L() / 3;
            break;
          case b:
            c = (S - y) / 6048e5;
            break;
          case T:
            c = (S - y) / 864e5;
            break;
          case v:
            c = S / f;
            break;
          case p:
            c = S / r;
            break;
          case $:
            c = S / e;
            break;
          default:
            c = S;
        }
        return s ? c : d.a(c);
      }, n.daysInMonth = function() {
        return this.endOf(M).$D;
      }, n.$locale = function() {
        return z[this.$L];
      }, n.locale = function(i, a) {
        if (!i)
          return this.$L;
        var s = this.clone(), c = et(i, a, !0);
        return c && (s.$L = c), s;
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
      }, h;
    }(), Mt = it.prototype;
    return w.prototype = Mt, [["$ms", m], ["$s", $], ["$m", p], ["$H", v], ["$W", T], ["$M", M], ["$y", E], ["$D", k]].forEach(function(h) {
      Mt[h[1]] = function(n) {
        return this.$g(n, h[0], h[1]);
      };
    }), w.extend = function(h, n) {
      return h.$i || (h(n, it, w), h.$i = !0), w;
    }, w.locale = et, w.isDayjs = mt, w.unix = function(h) {
      return w(1e3 * h);
    }, w.en = z[P], w.Ls = z, w.p = {}, w;
  });
})(Yt);
var Et = Yt.exports;
const Wt = /* @__PURE__ */ _t(Et), gt = (o, t = "MM/DD HH:mm") => Wt(o).format(t), Dt = (o, t) => {
  let e, r = 0;
  return (...f) => {
    const m = Date.now(), $ = m - r;
    !r || $ >= t ? (r = m, o.apply(void 0, f)) : e || (e = setTimeout(() => {
      r = m, o.apply(void 0, f), e = null;
    }, t - $));
  };
}, kt = (o, t) => {
  const e = document.createElement("canvas");
  e.width = e.height = 1;
  const r = e.getContext("2d");
  r.fillStyle = o, r.fillRect(0, 0, 1, 1);
  const f = r.getImageData(0, 0, 1, 1).data;
  return `rgba(${f[0]}, ${f[1]}, ${f[2]}, ${t})`;
}, At = ({ xCenterPoint: o, cfg: t, timePerPixel: e, timeSpacing: r, currentTime: f, $canvas: m, screenScaleCount: $, scaleHeight: p, startTime: v, drawLine: T, drawText: b, drawArea: M }) => {
  const x = ({ space: E, scaleTimeFormat: k, bgTimeFormat: K, pointerTimeFormat: ft }) => {
    b({
      x: m.width - o / 10,
      y: 6,
      text: gt(f, K),
      fontSize: `${m.height - 5}px`,
      align: "right",
      baseLine: "top",
      color: t.bgTextColor
    });
    const tt = v % r, dt = tt / e;
    for (let A = 0; A < $; A++) {
      const R = A * t.scaleSpacing - dt - t.pointerWidth / 2, P = v + A * r - tt;
      if (P % (r * E) === 0) {
        T({ x: R, y: p.long }), b({
          x: R,
          y: m.height - p.long - 5,
          text: gt(P, k),
          baseLine: "bottom"
        });
        continue;
      }
      T({ x: R, y: p.short });
    }
    T({
      x: o - t.pointerWidth / 2,
      y: m.height,
      width: t.pointerWidth,
      color: t.pointerColor
    }), M({
      startX: o - t.pointerDisplayWidth / 2,
      startY: 4,
      endX: o + t.pointerDisplayWidth / 2,
      endY: 4 + t.pointerDisplayHeight,
      bgColor: t.pointerColor
    }), b({
      x: o,
      y: t.pointerDisplayHeight / 2 + 5,
      text: gt(f, ft),
      align: "center",
      baseLine: "middle"
    });
  };
  r < 100 ? x({ space: 10, scaleTimeFormat: "mm:ss:SSS", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "HH:mm:ss:SSS" }) : r < 1e3 ? x({ space: 10, scaleTimeFormat: "mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "HH:mm:ss:SSS" }) : r < 1e4 ? x({ space: 10, scaleTimeFormat: "mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "HH:mm:ss" }) : r < 6e4 ? x({ space: 12, scaleTimeFormat: "HH:mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "HH:mm:ss" }) : r < 6e5 ? x({ space: 10, scaleTimeFormat: "HH:mm:ss", bgTimeFormat: "YYYY/MM/DD", pointerTimeFormat: "HH:mm:ss" }) : r < 36e5 ? x({ space: 12, scaleTimeFormat: "MM/DD HH:mm", bgTimeFormat: "YYYY/MM", pointerTimeFormat: "MM/DD HH:mm:ss" }) : r < 864e5 ? x({ space: 12, scaleTimeFormat: "MM/DD HH:mm", bgTimeFormat: "YYYY/MM", pointerTimeFormat: "YYYY/MM/DD HH:mm" }) : r < 6048e5 ? x({ space: 10, scaleTimeFormat: "YYYY/MM/DD", bgTimeFormat: "YYYY", pointerTimeFormat: "YYYY/MM/DD" }) : x({ space: 10, scaleTimeFormat: "YYYY/MM/DD", bgTimeFormat: "YYYY", pointerTimeFormat: "YYYY/MM/DD" });
}, Pt = {
  fill: !0,
  width: 1e3,
  height: 60,
  bgColor: "rgba(0,0,0,0.5)",
  textColor: "#ffffff",
  scaleColor: "#ffffff",
  scaleSpacing: 7,
  areaBgColor: "#ffffff55",
  pointerColor: "#00aeec",
  pointerWidth: 3,
  pointerDisplayWidth: 100,
  pointerDisplayHeight: 14,
  fps: 60,
  zoom: 3,
  timeSpacingList: [10, 100, 1e3, 1e4, 6e4, 6e5, 36e5, 864e5, 6048e5]
  // scaleHeight: ,
  // bgTextColor: ,
  // todo formatters
};
var B, O, W, Y, N, U, rt, Tt, at, wt, ot, yt, ht, bt, ct, xt, ut, St, Q, vt, J, nt, lt, Ft;
class zt {
  constructor(t, e) {
    // 拖拽
    F(this, rt);
    // 缩放
    F(this, at);
    // 父元素size变化
    F(this, ot);
    // 清空画布
    F(this, ht);
    // 绘制比例尺
    F(this, ct);
    // 绘制线条
    F(this, ut);
    // 绘制文字
    F(this, Q);
    // 绘制区域
    F(this, J);
    F(this, lt);
    G(this, "$canvas");
    G(this, "ctx");
    G(this, "$canvasParent");
    G(this, "cfg");
    F(this, B, Ot());
    F(this, O, 0);
    F(this, W, void 0);
    F(this, Y, void 0);
    F(this, N, void 0);
    F(this, U, !1);
    if (!t)
      throw new Error("canvas Element Or Element ID is required!");
    typeof t == "string" ? this.$canvas = document.querySelector(t) : this.$canvas = t, this.ctx = this.$canvas.getContext("2d"), this.cfg = { ...Pt, ...e }, e != null && e.pointColor && (this.cfg.pointerColor = e.pointColor), e != null && e.pointWidth && (this.cfg.pointerWidth = e.pointWidth);
    const { fill: r, width: f, height: m, zoom: $, timeSpacingList: p, scaleHeight: v, textColor: T, bgTextColor: b } = this.cfg;
    if (b || (this.cfg.bgTextColor = kt(T, 0.18)), $ < 0 || $ >= p.length || $ % 1 !== 0)
      throw new Error(`zoom must be 0 ~ ${p.length - 1}, and must be an integer`);
    if (r) {
      const M = this.$canvas.parentElement;
      this.$canvasParent = M, this.$canvas.width = M.clientWidth, this.$canvas.height = M.clientHeight, new ResizeObserver(Dt(H(this, ot, yt).bind(this), 200)).observe(M);
    } else
      this.$canvas.width = f, this.$canvas.height = m;
    _(this, Y, p[$]), v != null && v.long && (v != null && v.short) ? _(this, N, v) : _(this, N, {
      long: this.$canvas.height / 3,
      medium: this.$canvas.height / 6,
      short: this.$canvas.height / 10
    }), this.draw(), this.$canvas.addEventListener("wheel", H(this, at, wt).bind(this), { passive: !1 }), this.$canvas.addEventListener("mousedown", H(this, rt, Tt).bind(this));
  }
  // 绘制时间轴
  draw({ currentTime: t, areas: e, _privateFlag: r } = {}) {
    if (l(this, U) && !r)
      return;
    _(this, O, t || Date.now()), _(this, W, e || []);
    const f = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing), m = f * l(this, Y), $ = l(this, O) - m / 2, p = l(this, O) + m / 2, v = this.$canvas.width / 2, T = m / this.$canvas.width;
    H(this, ht, bt).call(this), H(this, J, nt).call(this, {
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor
    }), l(this, W).forEach((b) => {
      const M = b.startTime <= $ ? 0 : Math.round((b.startTime - $) / T), x = b.endTime >= p ? this.$canvas.width : Math.round((b.endTime - $) / T);
      M < this.$canvas.width && x > 0 && H(this, J, nt).call(this, {
        startX: M,
        startY: 0,
        endX: x,
        endY: this.$canvas.height,
        bgColor: b.bgColor || this.cfg.areaBgColor
      });
    }), At.bind(this)({
      xCenterPoint: v,
      screenScaleCount: f,
      startTime: $,
      timePerPixel: T,
      scaleHeight: l(this, N),
      timeSpacing: l(this, Y),
      currentTime: l(this, O),
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: H(this, ut, St).bind(this),
      drawText: H(this, Q, vt).bind(this),
      drawArea: H(this, J, nt).bind(this)
    }), H(this, ct, xt).call(this);
  }
  // 获取当前时间
  getCurrentTime() {
    return l(this, O);
  }
  on(t, e) {
    l(this, B).on(t, e);
  }
  off(t, e) {
    l(this, B).off(t, e);
  }
}
B = new WeakMap(), O = new WeakMap(), W = new WeakMap(), Y = new WeakMap(), N = new WeakMap(), U = new WeakMap(), rt = new WeakSet(), Tt = function(t) {
  _(this, U, !0);
  let e = 0, r = l(this, O);
  const f = Dt(({ offsetX: p }) => {
    if (!l(this, U))
      return;
    const v = p - t.offsetX;
    r = Math.round(l(this, O) - l(this, Y) / this.cfg.scaleSpacing * (v - e)), e = v, this.draw({
      currentTime: r,
      areas: l(this, W),
      _privateFlag: !0
    });
  }, 1e3 / this.cfg.fps), m = ({ offsetX: p, offsetY: v }) => {
    (p < 3 || p > this.$canvas.width - 3 || v < 3 || v > this.$canvas.height - 3) && (this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m));
  }, $ = () => {
    this.$canvas.removeEventListener("mousemove", f), this.$canvas.removeEventListener("mousemove", m), document.removeEventListener("mouseup", $), _(this, U, !1), H(this, lt, Ft).call(this, "dragged", r);
  };
  this.$canvas.addEventListener("mousemove", f), this.$canvas.addEventListener("mousemove", m), document.addEventListener("mouseup", $);
}, at = new WeakSet(), wt = function(t) {
  t.preventDefault();
  const e = this.cfg.timeSpacingList.findIndex((r) => r === l(this, Y));
  t.deltaY < 0 && e > 0 ? (_(this, Y, this.cfg.timeSpacingList[e - 1]), this.draw({
    currentTime: l(this, O),
    areas: l(this, W),
    _privateFlag: !0
  })) : t.deltaY > 0 && e < this.cfg.timeSpacingList.length - 1 && (_(this, Y, this.cfg.timeSpacingList[e + 1]), this.draw({
    currentTime: l(this, O),
    areas: l(this, W),
    _privateFlag: !0
  }));
}, ot = new WeakSet(), yt = function() {
  this.$canvasParent && (this.$canvas.width = this.$canvasParent.clientWidth, this.$canvas.height = this.$canvasParent.clientHeight, this.cfg.scaleHeight || _(this, N, {
    long: this.$canvas.height / 3,
    medium: this.$canvas.height / 6,
    short: this.$canvas.height / 10
  }), this.draw({
    currentTime: l(this, O),
    areas: l(this, W)
  }));
}, ht = new WeakSet(), bt = function() {
  this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
}, ct = new WeakSet(), xt = function() {
  const t = () => l(this, Y) < 1e3 ? `${l(this, Y)}ms` : l(this, Y) < 6e4 ? `${Math.round(l(this, Y) / 100) / 10}sec` : l(this, Y) < 36e5 ? `${Math.round(l(this, Y) / 100 / 60) / 10}min` : l(this, Y) < 864e5 ? `${Math.round(l(this, Y) / 100 / 60 / 60) / 10}hours` : l(this, Y) < 6048e5 ? `${Math.round(l(this, Y) / 100 / 60 / 60 / 24) / 10}days` : `${Math.round(l(this, Y) / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
  H(this, Q, vt).call(this, {
    x: this.cfg.scaleSpacing + 12,
    y: 9,
    text: t(),
    align: "left",
    baseLine: "middle"
  }), this.ctx.beginPath(), this.ctx.moveTo(5, 6), this.ctx.lineTo(5, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10), this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6), this.ctx.strokeStyle = this.cfg.scaleColor, this.ctx.lineWidth = 1.5, this.ctx.stroke();
}, ut = new WeakSet(), St = function({ x: t, y: e, width: r = 1, color: f = this.cfg.scaleColor }) {
  this.ctx.beginPath(), this.ctx.moveTo(t, this.$canvas.height), this.ctx.lineTo(t, this.$canvas.height - e), this.ctx.closePath(), this.ctx.strokeStyle = f, this.ctx.lineWidth = r, this.ctx.stroke();
}, Q = new WeakSet(), vt = function({ x: t, y: e, text: r, color: f = this.cfg.textColor, fontSize: m = "11px", align: $ = "center", baseLine: p = "alphabetic" }) {
  this.ctx.beginPath(), this.ctx.font = `${m} Arial`, this.ctx.fillStyle = f, this.ctx.textAlign = $, this.ctx.textBaseline = p, this.ctx.fillText(r, t, e);
}, J = new WeakSet(), nt = function({ startX: t, startY: e, endX: r, endY: f, bgColor: m }) {
  this.ctx.beginPath(), this.ctx.rect(t, e, r - t, f - e), this.ctx.fillStyle = m, this.ctx.fill();
}, lt = new WeakSet(), Ft = function(...t) {
  l(this, B).emit(...t);
};
export {
  zt as default,
  gt as format
};
