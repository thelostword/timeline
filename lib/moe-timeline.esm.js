/*!
 *  znu-event v0.0.10
 *  (c) 2020-2020 chenwuai
 *  https://github.com/chenchenwuai/znu-event.git
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var ZnuEvent = (function () {
    function ZnuEvent() {
        this._listenersMap = {};
    }
    ZnuEvent.prototype.on = function (eventName, listener) {
        if (undefined === this._listenersMap[eventName]) {
            this._listenersMap[eventName] = [];
        }
        this._listenersMap[eventName].push(listener);
        return this;
    };
    ZnuEvent.prototype.once = function (eventName, listener) {
        listener.isOnce = true;
        this.on(eventName, listener);
        return this;
    };
    ZnuEvent.prototype.off = function (eventName, listener) {
        var listeners = this._listenersMap[eventName];
        if (undefined !== listeners) {
            if (undefined === listener) {
                delete this._listenersMap[eventName];
            }
            else {
                var index = listeners.findIndex(function (fn) { return fn === listener; });
                listeners.splice(index, 1);
            }
        }
        return this;
    };
    ZnuEvent.prototype.offAll = function () {
        this._listenersMap = {};
    };
    ZnuEvent.prototype.emit = function (eventName) {
        var e_1, _a;
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var listeners = this._listenersMap[eventName];
        if (undefined !== listeners && listeners.length > 0) {
            try {
                for (var _b = __values(listeners.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), index = _d[0], listener = _d[1];
                    if (listener.isOnce) {
                        var listenerClone = listener;
                        listeners.splice(index, 1);
                        listenerClone.apply(void 0, __spread(payload));
                    }
                    else {
                        listener.apply(void 0, __spread(payload));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
        else {
            return false;
        }
    };
    ZnuEvent.prototype.has = function (eventName) {
        return undefined !== this._listenersMap[eventName] && this._listenersMap[eventName].length > 0;
    };
    ZnuEvent.prototype.eventNames = function () {
        var eventNames = [];
        for (var eventName in this._listenersMap) {
            eventNames.push(eventName);
        }
        return eventNames;
    };
    ZnuEvent.prototype.destroy = function () {
        this.offAll();
    };
    return ZnuEvent;
}());

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dayjs_min = {exports: {}};

(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
}(dayjs_min));

var dayjs = dayjs_min.exports;

const dateTime = (time, format = 'MM/DD HH:mm:ss') => {
    return dayjs(time).format(format);
};
function getTodayStartTime() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.getTime();
}
function getTodayEndTime() {
    var today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    today.setMilliseconds(999);
    return today.getTime();
}

class MoeTimeLine {
    constructor(id) {
        console.log('MoeTimeLine');
        if (!id) {
            throw new Error('canvas id is required!');
        }
        this.$canvas = document.getElementById(id);
        this.canvasContext = this.$canvas.getContext('2d');
        this.startTime = getTodayStartTime();
        this.endTime = getTodayEndTime();
        this.currentTime = this.startTime;
        this.area = [];
        this.spacing = 5;
        this.timeSpacing = 1000 * 5;
        this.event = new ZnuEvent();
    }
    create({ startTime, endTime, currentTime, area }) {
        var _a;
        console.time('createTime');
        if (startTime && endTime) {
            this.startTime = startTime;
            this.endTime = endTime;
            if (!currentTime) {
                this.currentTime = this.startTime;
                return;
            }
            this.currentTime = currentTime;
        }
        if (area === null || area === void 0 ? void 0 : area.length) {
            this.area = area;
        }
        this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        if ((_a = this.area) === null || _a === void 0 ? void 0 : _a.length) {
            this.area.forEach(item => {
                this.drawArea(item.startTime, item.endTime, item.bgColor);
            });
        }
        const hour1Height = this.$canvas.height / 2;
        const minute30Height = this.$canvas.height / 3;
        const minute15Height = this.$canvas.height / 4;
        const minute1Height = this.$canvas.height / 6;
        const secondHeight = this.$canvas.height / 10;
        (this.endTime - this.startTime) / this.timeSpacing;
        const beforLineCount = (this.currentTime - this.startTime) / this.timeSpacing;
        const afterLineCount = (this.endTime - this.currentTime) / this.timeSpacing;
        const centerPoint = this.$canvas.width / 2 - 1.5;
        for (let i = 0; i < beforLineCount; i++) {
            const xOffset = (this.currentTime % (1000 * 5)) / 1000;
            const x = (centerPoint - xOffset) - i * this.spacing;
            const timeOffset = this.startTime % (1000 * 5);
            const time = (this.currentTime - timeOffset) - i * this.timeSpacing;
            if (time % (3600 * 1000) === 0) {
                this.drawLine(x, hour1Height);
                this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
                continue;
            }
            if (time % ((3600 * 1000) / 2) === 0) {
                this.drawLine(x, minute30Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % ((3600 * 1000) / 4) === 0) {
                this.drawLine(x, minute15Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % (1000 * 60) === 0) {
                this.drawLine(x, minute1Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % (1000 * 30) === 0) {
                this.drawLine(x, secondHeight);
                continue;
            }
            if (time % (1000 * 5) === 0) {
                this.drawLine(x, secondHeight);
                continue;
            }
        }
        for (let i = 0; i < afterLineCount; i++) {
            const xOffset = (this.currentTime % (1000 * 5)) / 1000;
            const x = (centerPoint - xOffset) + i * this.spacing;
            const timeOffset = this.startTime % (1000 * 5);
            const time = (this.currentTime - timeOffset) + i * this.timeSpacing;
            if (time % (3600 * 1000) === 0) {
                this.drawLine(x, hour1Height);
                this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
                continue;
            }
            if (time % ((3600 * 1000) / 2) === 0) {
                this.drawLine(x, minute30Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % ((3600 * 1000) / 4) === 0) {
                this.drawLine(x, minute15Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % (1000 * 60) === 0) {
                this.drawLine(x, minute1Height);
                this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
                continue;
            }
            if (time % (1000 * 30) === 0) {
                this.drawLine(x, secondHeight);
                continue;
            }
            if (time % (1000 * 5) === 0) {
                this.drawLine(x, secondHeight);
                continue;
            }
        }
        console.timeEnd('createTime');
        this.$canvas.addEventListener('click', (e) => {
            const computedStyle = getComputedStyle(this.$canvas);
            const paddingTop = parseInt(computedStyle.paddingTop);
            parseInt(computedStyle.paddingBottom);
            const paddingLeft = parseInt(computedStyle.paddingLeft);
            parseInt(computedStyle.paddingRight);
            const x = e.pageX - this.$canvas.getBoundingClientRect().left - paddingLeft;
            const y = e.pageY - this.$canvas.getBoundingClientRect().top - paddingTop;
            this.emit('click', { x, y });
        }, false);
        this.$canvas.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                console.log('向上, 缩小');
                this.spacing -= 0.1;
                this.create({
                    startTime: this.startTime,
                    endTime: this.endTime,
                    currentTime: this.currentTime,
                    area: this.area,
                });
            }
            else {
                console.log('向下， 放大');
                this.spacing += 0.1;
                this.create({
                    startTime: this.startTime,
                    endTime: this.endTime,
                    currentTime: this.currentTime,
                    area: this.area,
                });
            }
        }, false);
    }
    drawLine(x, y, width = 1, color = '#ffffff') {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x, this.$canvas.height);
        this.canvasContext.lineTo(x, this.$canvas.height - y);
        this.canvasContext.stroke();
        this.canvasContext.strokeStyle = color;
        this.canvasContext.lineWidth = width;
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }
    drawText(x, y, text, color = '#ffffff') {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillText(text, x, y);
        this.canvasContext.closePath();
    }
    drawArea(startTime, endTime, bgColor) {
        const startX = (startTime - this.startTime) / (this.endTime - this.startTime) * this.$canvas.width;
        const endX = (endTime - this.startTime) / (this.endTime - this.startTime) * this.$canvas.width;
        this.canvasContext.beginPath();
        this.canvasContext.rect(startX, 0, endX - startX, this.$canvas.height);
        this.canvasContext.fillStyle = bgColor || '#ffffff';
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }
    on(name, listener) {
        this.event.on(name, listener);
    }
    off(name, listener) {
        this.event.off(name, listener);
    }
    emit(...args) {
        this.event.emit(...args);
    }
}

export { MoeTimeLine as default };
