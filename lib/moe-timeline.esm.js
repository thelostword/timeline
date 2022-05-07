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
        const hourHeight = this.$canvas.height / 2;
        const minuteHeight = this.$canvas.height / 3;
        const secondHeight = this.$canvas.height / 5;
        const timeDiff = (this.endTime - this.startTime) / (1000 * 60);
        for (let i = 0; i < timeDiff; i++) {
            const x = this.$canvas.width / timeDiff * i;
            if (i % 60 === 0) {
                this.drawLine(x, hourHeight);
                continue;
            }
            if (i % 30 === 0) {
                this.drawLine(x, minuteHeight);
                continue;
            }
            if (i % 10 === 0) {
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
    }
    drawLine(x, y) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x, this.$canvas.height);
        this.canvasContext.lineTo(x, this.$canvas.height - y);
        this.canvasContext.stroke();
        this.canvasContext.strokeStyle = '#ffffff';
        this.canvasContext.lineWidth = 1;
        this.canvasContext.stroke();
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
