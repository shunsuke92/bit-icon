var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BitIcon_instances, _BitIcon_rects, _BitIcon_randomValue, _BitIcon_createRect, _BitIcon_renderSvg, _BitIcon_loadImage, _BitIcon_getColor, _BitIcon_getBackground;
export class BitIcon {
    constructor(hash, options) {
        _BitIcon_instances.add(this);
        this.type = 'normal';
        _BitIcon_rects.set(this, []);
        _BitIcon_randomValue.set(this, getRandomInt(2));
        let h;
        let o;
        if (hash === undefined) {
            // hash: none, options: none
            h = createHash();
        }
        else if (typeof hash === 'object') {
            // hash: none, options: exist
            h = createHash();
            o = hash;
        }
        else {
            // hash: exist, options: exist or none
            if (!isValidHash(hash)) {
                throw new Error('A hexadecimal hash value of at least 22 characters is required to generate identicon.');
            }
            h = hash;
            o = options;
        }
        this.hash = h;
        this.size = o?.size ?? (o?.pixel !== undefined ? Math.round(o.pixel * 6) : 420);
        this.pixel = o?.pixel ?? (o?.size !== undefined ? Math.round(o.size / 6) : 70);
        this.hue = o?.hue !== undefined && o?.hue.length === 2 ? o.hue : [0, 360];
        this.saturation =
            o?.saturation !== undefined && o?.saturation.length === 2 ? o.saturation : [45, 65];
        this.lightness =
            o?.lightness !== undefined && o?.lightness.length === 2 ? o.lightness : [55, 75];
        this.type = o?.type !== undefined ? o.type : 'normal';
        let color;
        if (o?.color !== undefined) {
            if (Array.isArray(o.color)) {
                color = hslToHex(o.color);
            }
            else {
                color = o.color;
            }
        }
        else {
            color = hashToHex(this.hash, this.hue, this.saturation, this.lightness);
        }
        this.color = color;
        let background;
        if (o?.background !== undefined) {
            if (Array.isArray(o.background)) {
                background = hslToHex(o.background);
            }
            else {
                background = o.background;
            }
        }
        else {
            background = '#ffffff';
        }
        this.background = background;
        const isInvalidSize = this.size < this.pixel * 5;
        let isInvalidColor = false;
        if (this.color !== undefined) {
            isInvalidColor = Array.isArray(this.color)
                ? !isValidHslColor(this.color)
                : !isValidHexColor(this.color);
        }
        let isInvalidBackground = false;
        if (this.background !== undefined) {
            isInvalidBackground = Array.isArray(this.background)
                ? !isValidHslColor(this.background)
                : !isValidHexColor(this.background);
        }
        const isInvalidColorRange = this.hue[0] > this.hue[1] ||
            this.hue[0] < 0 ||
            this.hue[0] > 360 ||
            this.hue[1] < 0 ||
            this.hue[1] > 360 ||
            this.saturation[0] > this.saturation[1] ||
            this.saturation[0] < 0 ||
            this.saturation[0] > 100 ||
            this.saturation[1] < 0 ||
            this.saturation[1] > 100 ||
            this.lightness[0] > this.lightness[1] ||
            this.lightness[0] < 0 ||
            this.lightness[0] > 100 ||
            this.lightness[1] < 0 ||
            this.lightness[1] > 100;
        const isInvalidType = !(this.type === 'normal' ||
            this.type === 'reverse' ||
            this.type === 'random');
        if (isInvalidSize ||
            isInvalidColor ||
            isInvalidBackground ||
            isInvalidColorRange ||
            isInvalidType) {
            throw new Error('input is invalid options.');
        }
    }
    toSvg() {
        var _a;
        return `data:image/svg+xml;base64,${btoa(__classPrivateFieldGet((_a = __classPrivateFieldGet(this, _BitIcon_instances, "m", _BitIcon_createRect).call(this)), _BitIcon_instances, "m", _BitIcon_renderSvg).call(_a))}`;
    }
    async toPng() {
        let canvas = document.createElement('canvas');
        canvas.width = this.size;
        canvas.height = this.size;
        const ctx = canvas.getContext('2d');
        const image = await __classPrivateFieldGet(this, _BitIcon_instances, "m", _BitIcon_loadImage).call(this, this.toSvg());
        ctx?.drawImage(image, 0, 0);
        return canvas.toDataURL();
    }
}
_BitIcon_rects = new WeakMap(), _BitIcon_randomValue = new WeakMap(), _BitIcon_instances = new WeakSet(), _BitIcon_createRect = function _BitIcon_createRect() {
    __classPrivateFieldSet(this, _BitIcon_rects, [], "f");
    const pixel = Math.floor(this.pixel);
    const margin = Math.floor((this.size - pixel * 5) / 2);
    const setRect = (x, y) => {
        __classPrivateFieldGet(this, _BitIcon_rects, "f").push({
            x: x * pixel + margin,
            y: y * pixel + margin,
            width: pixel,
            height: pixel,
        });
    };
    const isDraw = (position) => parseInt(this.hash.charAt(position), 16) % 2 === 0;
    for (let i = 0; i < 5; i += 1) {
        if (isDraw(i)) {
            setRect(2, i);
        }
    }
    for (let i = 0; i < 5; i += 1) {
        if (isDraw(i + 5)) {
            setRect(1, i);
            setRect(3, i);
        }
    }
    for (let i = 0; i < 5; i += 1) {
        if (isDraw(i + 10)) {
            setRect(0, i);
            setRect(4, i);
        }
    }
    return this;
}, _BitIcon_renderSvg = function _BitIcon_renderSvg() {
    let svg = '<svg ' +
        `width="${this.size}" ` +
        `height="${this.size}" ` +
        `viewBox="0 0 ${this.size} ${this.size}" ` +
        'fill="none" ' +
        'xmlns="http://www.w3.org/2000/svg"' +
        '>' +
        `<rect width="${this.size}" height="${this.size}" fill="${__classPrivateFieldGet(this, _BitIcon_instances, "m", _BitIcon_getBackground).call(this)}"/>`;
    for (const rect of __classPrivateFieldGet(this, _BitIcon_rects, "f")) {
        svg +=
            '<rect ' +
                `x="${rect.x}" ` +
                `y="${rect.y}" ` +
                `width="${rect.width}" ` +
                `height="${rect.height}" ` +
                `fill="${__classPrivateFieldGet(this, _BitIcon_instances, "m", _BitIcon_getColor).call(this)}"` +
                '/>';
    }
    svg += '</svg>';
    return svg;
}, _BitIcon_loadImage = function _BitIcon_loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}, _BitIcon_getColor = function _BitIcon_getColor() {
    if (this.type === 'normal') {
        return this.color;
    }
    else if (this.type === 'reverse') {
        return this.background;
    }
    else if (this.type === 'random') {
        return __classPrivateFieldGet(this, _BitIcon_randomValue, "f") === 0 ? this.color : this.background;
    }
}, _BitIcon_getBackground = function _BitIcon_getBackground() {
    if (this.type === 'normal') {
        return this.background;
    }
    else if (this.type === 'reverse') {
        return this.color;
    }
    else if (this.type === 'random') {
        return __classPrivateFieldGet(this, _BitIcon_randomValue, "f") === 0 ? this.background : this.color;
    }
};
const hashToHex = (hash, h, s, l) => {
    const [hue, saturation, lightness] = hashToHsl(hash);
    const mappingHsl = [
        mapping(hue, 0, 360, h[0], h[1]),
        mapping(saturation, 0, 100, s[0], s[1]),
        mapping(lightness, 0, 100, l[0], l[1]),
    ];
    const rgb = hslToRgb(mappingHsl);
    const hex = rgbToHex(rgb);
    return hex;
};
const hslToHex = (hsl) => {
    const rgb = hslToRgb(hsl);
    const hex = rgbToHex(rgb);
    return hex;
};
const hashToHsl = (hash) => {
    const hue = Math.round(parseInt(hash.slice(-7, -4), 16) * (360 / 4095));
    const saturation = Math.round(parseInt(hash.slice(-4, -2), 16) * (100 / 255));
    const lightness = Math.round(parseInt(hash.slice(-2), 16) * (100 / 255));
    return [hue, saturation, lightness];
};
const hslToRgb = (hsl) => {
    const hue = hsl[0];
    const saturation = hsl[1];
    const lightness = hsl[2];
    let max;
    let min;
    let red;
    let green;
    let blue;
    if (lightness <= 49) {
        max = Math.round(2.55 * (lightness + lightness * (saturation / 100)));
        min = Math.round(2.55 * (lightness - lightness * (saturation / 100)));
    }
    else {
        max = Math.round(2.55 * (lightness + (100 - lightness) * (saturation / 100)));
        min = Math.round(2.55 * (lightness - (100 - lightness) * (saturation / 100)));
    }
    if (hue <= 60) {
        red = max;
        green = Math.round((hue / 60) * (max - min) + min);
        blue = min;
    }
    else if (hue <= 120) {
        red = Math.round(((120 - hue) / 60) * (max - min) + min);
        green = max;
        blue = min;
    }
    else if (hue <= 180) {
        red = min;
        green = max;
        blue = Math.round(((hue - 120) / 60) * (max - min) + min);
    }
    else if (hue <= 240) {
        red = min;
        green = Math.round(((240 - hue) / 60) * (max - min) + min);
        blue = max;
    }
    else if (hue <= 300) {
        red = Math.round(((hue - 240) / 60) * (max - min) + min);
        green = min;
        blue = max;
    }
    else {
        red = max;
        green = min;
        blue = Math.round(((360 - hue) / 60) * (max - min) + min);
    }
    return [red, green, blue];
};
const rgbToHex = (rgb) => {
    const red = rgb[0].toString(16).padStart(2, '0');
    const green = rgb[1].toString(16).padStart(2, '0');
    const blue = rgb[2].toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
};
const mapping = (value, beforeMin, beforeMax, afterMin, afterMax) => {
    return Math.round(((value - beforeMax) * (afterMax - afterMin)) / (beforeMax - beforeMin) + afterMax);
};
const createHash = () => {
    const h1 = Math.random().toString(16).slice(-8);
    const h2 = Math.random().toString(16).slice(-8);
    const h3 = Math.random().toString(16).slice(-8);
    const h4 = Math.random().toString(16).slice(-8);
    return h1 + h2 + h3 + h4;
};
const isValidHash = (value) => {
    return /^[0-9a-f]{22,}$/i.test(value);
};
const isValidHexColor = (color) => {
    return (/^#[0-9a-f]{3}$/i.test(color) || /^#[0-9a-f]{6}$/i.test(color) || /^#[0-9a-f]{8}$/i.test(color));
};
const isValidHslColor = (color) => {
    return (color.length === 3 &&
        color[0] >= 0 &&
        color[0] <= 360 &&
        color[1] >= 0 &&
        color[1] <= 100 &&
        color[2] >= 0 &&
        color[2] <= 100);
};
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
