'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getPerson = (id) => {
    if (id === 'losting') {
        return;
    }
    return {
        name: '123',
        age: 18,
        sex: 1,
        email: '123',
        avatar: {
            mini: 'https://avatar.png',
            small: 'https://avatar.png',
            medium: 'https://avatar.png',
            large: 'https://avatar.png',
        },
    };
};
const fibonaci = (i) => {
    if (i === 0) {
        return 0;
    }
    if (i === 1) {
        return 1;
    }
    return fibonaci[i - 1] + fibonaci[i - 2];
};
(function () {
    const root = document.querySelector("#root");
    const inner = getPerson('ee');
    root.innerHTML = `姓名：${inner === null || inner === void 0 ? void 0 : inner.name},年龄：${inner === null || inner === void 0 ? void 0 : inner.age}岁...`;
}());

exports["default"] = fibonaci;
exports.fibonaci = fibonaci;
exports.getPerson = getPerson;
