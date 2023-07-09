export type Options = {
  size?: number;
  pixel?: number;
  color?: string;
  background?: string;
  hue?: number[];
  saturation?: number[];
  lightness?: number[];
  type?: 'normal' | 'reverse' | 'random';
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class BitIcon {
  hash: string;

  size: number;

  pixel: number;

  color: string;

  background: string;

  hue: number[];

  saturation: number[];

  lightness: number[];

  type: 'normal' | 'reverse' | 'random' = 'normal';

  #rects: Rect[] = [];

  #randomValue: number = getRandomInt(2);

  constructor(hash?: string, options?: Options) {
    let h;
    let o;
    if (hash === undefined) {
      // hash: none, options: none
      h = createHash();
    } else if (typeof hash === 'object') {
      // hash: none, options: exist
      h = createHash();
      o = hash;
    } else {
      // hash: exist, options: exist or none
      if (!isValidHash(hash)) {
        throw new Error(
          'A hexadecimal hash value of at least 22 characters is required to generate identicon.',
        );
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

    let color: string;
    if (o?.color !== undefined) {
      color = inputColorToHex(o.color);
    } else {
      color = hashToHex(this.hash, this.hue, this.saturation, this.lightness);
    }
    this.color = color;

    let background: string;
    if (o?.background !== undefined) {
      background = inputColorToHex(o.background);
    } else {
      background = '#ffffff';
    }
    this.background = background;

    const isInvalidSize = this.size < this.pixel * 5;

    const isInvalidColor = !isValidHexColor(this.color);

    const isInvalidBackground = !isValidHexColor(this.background);

    const isInvalidColorRange =
      this.hue[0] > this.hue[1] ||
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

    const isInvalidType = !(
      this.type === 'normal' ||
      this.type === 'reverse' ||
      this.type === 'random'
    );

    if (
      isInvalidSize ||
      isInvalidColor ||
      isInvalidBackground ||
      isInvalidColorRange ||
      isInvalidType
    ) {
      throw new Error('input is invalid options.');
    }
  }

  #createRect() {
    this.#rects = [];
    const pixel = Math.floor(this.pixel);
    const margin = Math.floor((this.size - pixel * 5) / 2);

    const setRect = (x: number, y: number) => {
      this.#rects.push({
        x: x * pixel + margin,
        y: y * pixel + margin,
        width: pixel,
        height: pixel,
      });
    };

    const isDraw = (position: number) => parseInt(this.hash.charAt(position), 16) % 2 === 0;

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
  }

  toSvg() {
    return `data:image/svg+xml;base64,${btoa(this.#createRect().#renderSvg())}`;
  }

  async toPng(): Promise<string> {
    let canvas = document.createElement('canvas');
    canvas.width = this.size;
    canvas.height = this.size;
    const ctx = canvas.getContext('2d');
    const image = await this.#loadImage(this.toSvg());
    ctx?.drawImage(image, 0, 0);
    return canvas.toDataURL();
  }

  #renderSvg() {
    let svg =
      '<svg ' +
      `width="${this.size}" ` +
      `height="${this.size}" ` +
      `viewBox="0 0 ${this.size} ${this.size}" ` +
      'fill="none" ' +
      'xmlns="http://www.w3.org/2000/svg"' +
      '>' +
      `<rect width="${this.size}" height="${this.size}" fill="${this.#getBackground()}"/>`;

    for (const rect of this.#rects) {
      svg +=
        '<rect ' +
        `x="${rect.x}" ` +
        `y="${rect.y}" ` +
        `width="${rect.width}" ` +
        `height="${rect.height}" ` +
        `fill="${this.#getColor()}"` +
        '/>';
    }
    svg += '</svg>';

    return svg;
  }

  #loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  #getColor() {
    if (this.type === 'normal') {
      return this.color;
    } else if (this.type === 'reverse') {
      return this.background;
    } else if (this.type === 'random') {
      return this.#randomValue === 0 ? this.color : this.background;
    }
  }

  #getBackground() {
    if (this.type === 'normal') {
      return this.background;
    } else if (this.type === 'reverse') {
      return this.color;
    } else if (this.type === 'random') {
      return this.#randomValue === 0 ? this.background : this.color;
    }
  }
}

export const inputColorToHex = (color: string): string => {
  // Trim space
  const trimColor = color.replace(/\s+/g, '');

  // In case of Hex
  if (isValidHexColor(trimColor)) {
    return trimColor;
  }

  // In the case of Non-Hex
  const format = trimColor.slice(0, 3).toLowerCase();
  const data = trimColor.slice(3);
  if (format === 'rgb') {
    const rgb = parseRgb(data);
    const hex = rgbToHex(rgb);
    return hex;
  } else if (format === 'hsl') {
    const hsl = parseHsl(data);
    const hex = hslToHex(hsl);
    return hex;
  } else if (format === 'hsb') {
    const hsb = parseHsl(data);
    const hex = hsbToHex(hsb);
    return hex;
  }

  throw new Error('Invalid color format.');
};

export const parseRgb = (rgb: string): number[] => {
  let parsedRgb: number[] = [];

  if (rgb.slice(0, 1) !== '(' || rgb.slice(-1) !== ')') {
    throw new Error('Invalid color format.');
  }

  const arrayRgb = rgb.slice(1, -1).split(',');

  if (arrayRgb.length < 3) {
    throw new Error('Invalid color format.');
  }

  for (let i = 0; i < 3; i += 1) {
    if (isNaN(Number(arrayRgb[i])) || Number(arrayRgb[i]) < 0 || Number(arrayRgb[i]) > 255) {
      throw new Error('Invalid color format.');
    }
    parsedRgb.push(Math.trunc(Number(arrayRgb[i])));
  }

  if (arrayRgb.length >= 4) {
    if (arrayRgb[3].includes('%')) {
      const str = arrayRgb[3].replace('%', '');
      if (isNaN(Number(str)) || Number(str) < 0 || Number(str) > 100) {
        throw new Error('Invalid color format.');
      }
      parsedRgb.push(Math.trunc(Number(str)));
    } else {
      if (isNaN(Number(arrayRgb[3])) || Number(arrayRgb[3]) < 0 || Number(arrayRgb[3]) > 1) {
        throw new Error('Invalid color format.');
      }
      parsedRgb.push(Number(Math.trunc(Number(arrayRgb[3]) * 100)));
    }
  }
  return parsedRgb;
};

export const parseHsl = (rgb: string): number[] => {
  let parsedHsl: number[] = [];

  if (rgb.slice(0, 1) !== '(' || rgb.slice(-1) !== ')') {
    throw new Error('Invalid color format.');
  }

  const arrayRgb = rgb.slice(1, -1).split(',');

  if (arrayRgb.length < 3) {
    throw new Error('Invalid color format.');
  }

  if (isNaN(Number(arrayRgb[0])) || Number(arrayRgb[0]) < 0 || Number(arrayRgb[0]) > 360) {
    throw new Error('Invalid color format.');
  }
  parsedHsl.push(Math.trunc(Number(arrayRgb[0])));

  for (let i = 1; i < 3; i += 1) {
    if (isNaN(Number(arrayRgb[i])) || Number(arrayRgb[i]) < 0 || Number(arrayRgb[i]) > 100) {
      throw new Error('Invalid color format.');
    }
    parsedHsl.push(Math.trunc(Number(arrayRgb[i])));
  }

  if (arrayRgb.length >= 4) {
    if (arrayRgb[3].includes('%')) {
      const str = arrayRgb[3].replace('%', '');
      if (isNaN(Number(str)) || Number(str) < 0 || Number(str) > 100) {
        throw new Error('Invalid color format.');
      }
      parsedHsl.push(Math.trunc(Number(str)));
    } else {
      if (isNaN(Number(arrayRgb[3])) || Number(arrayRgb[3]) < 0 || Number(arrayRgb[3]) > 1) {
        throw new Error('Invalid color format.');
      }
      parsedHsl.push(Number(Math.trunc(Number(arrayRgb[3]) * 100)));
    }
  }
  return parsedHsl;
};

const hashToHex = (hash: string, h: number[], s: number[], l: number[]): string => {
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

const hslToHex = (hsl: number[]): string => {
  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);

  return hex;
};

const hsbToHex = (hsb: number[]): string => {
  const rgb = hsbToRgb(hsb);
  const hex = rgbToHex(rgb);

  return hex;
};

const hashToHsl = (hash: string): number[] => {
  const hue = Math.round(parseInt(hash.slice(-7, -4), 16) * (360 / 4095));
  const saturation = Math.round(parseInt(hash.slice(-4, -2), 16) * (100 / 255));
  const lightness = Math.round(parseInt(hash.slice(-2), 16) * (100 / 255));

  return [hue, saturation, lightness];
};

const hslToRgb = (hsl: number[]): number[] => {
  const hue = hsl[0];
  const saturation = hsl[1];
  const lightness = hsl[2];
  const alpha = hsl[3];
  let max;
  let min;
  let red;
  let green;
  let blue;

  if (lightness < 50) {
    max = 2.55 * (lightness + lightness * (saturation / 100));
    min = 2.55 * (lightness - lightness * (saturation / 100));
  } else {
    max = 2.55 * (lightness + (100 - lightness) * (saturation / 100));
    min = 2.55 * (lightness - (100 - lightness) * (saturation / 100));
  }

  if (hue <= 60) {
    red = Math.ceil(max);
    green = Math.ceil((hue / 60) * (max - min) + min);
    blue = Math.ceil(min);
  } else if (hue <= 120) {
    red = Math.ceil(((120 - hue) / 60) * (max - min) + min);
    green = Math.ceil(max);
    blue = Math.ceil(min);
  } else if (hue <= 180) {
    red = Math.ceil(min);
    green = Math.ceil(max);
    blue = Math.ceil(((hue - 120) / 60) * (max - min) + min);
  } else if (hue <= 240) {
    red = Math.ceil(min);
    green = Math.ceil(((240 - hue) / 60) * (max - min) + min);
    blue = Math.ceil(max);
  } else if (hue <= 300) {
    red = Math.ceil(((hue - 240) / 60) * (max - min) + min);
    green = Math.ceil(min);
    blue = Math.ceil(max);
  } else {
    red = Math.ceil(max);
    green = Math.ceil(min);
    blue = Math.ceil(((360 - hue) / 60) * (max - min) + min);
  }

  if (alpha !== undefined) {
    return [red, green, blue, alpha];
  } else {
    return [red, green, blue];
  }
};

const hsbToRgb = (hsb: number[]): number[] => {
  const hue = hsb[0];
  const saturation = mapping(hsb[1], 0, 100, 0, 255);
  const brightness = mapping(hsb[2], 0, 100, 0, 255);
  const alpha = hsb[3];
  let red;
  let green;
  let blue;

  const max = brightness;
  const min = brightness - (saturation / 255) * brightness;

  if (hue <= 60) {
    red = max;
    green = Math.round((hue / 60) * (max - min) + min);
    blue = Math.round(min);
  } else if (hue <= 120) {
    red = Math.round(((120 - hue) / 60) * (max - min) + min);
    green = max;
    blue = Math.round(min);
  } else if (hue <= 180) {
    red = Math.round(min);
    green = max;
    blue = Math.round(((hue - 120) / 60) * (max - min) + min);
  } else if (hue <= 240) {
    red = Math.round(min);
    green = Math.round(((240 - hue) / 60) * (max - min) + min);
    blue = max;
  } else if (hue <= 300) {
    red = Math.round(((hue - 240) / 60) * (max - min) + min);
    green = Math.round(min);
    blue = max;
  } else {
    red = max;
    green = Math.round(min);
    blue = Math.round(((360 - hue) / 60) * (max - min) + min);
  }

  if (alpha !== undefined) {
    return [red, green, blue, alpha];
  } else {
    return [red, green, blue];
  }
};

const rgbToHex = (rgb: number[]): string => {
  const red = rgb[0].toString(16).padStart(2, '0').toUpperCase();
  const green = rgb[1].toString(16).padStart(2, '0').toUpperCase();
  const blue = rgb[2].toString(16).padStart(2, '0').toUpperCase();

  if (rgb.length >= 4) {
    const alpha = mapping(rgb[3], 0, 100, 0, 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${red}${green}${blue}${alpha}`;
  } else {
    return `#${red}${green}${blue}`;
  }
};

const mapping = (
  value: number,
  beforeMin: number,
  beforeMax: number,
  afterMin: number,
  afterMax: number,
) => {
  return Math.round(
    ((value - beforeMax) * (afterMax - afterMin)) / (beforeMax - beforeMin) + afterMax,
  );
};

const createHash = () => {
  const h1 = Math.random().toString(16).slice(-8);
  const h2 = Math.random().toString(16).slice(-8);
  const h3 = Math.random().toString(16).slice(-8);
  const h4 = Math.random().toString(16).slice(-8);
  return h1 + h2 + h3 + h4;
};

const isValidHash = (value: string) => {
  return /^[0-9a-f]{22,}$/i.test(value);
};

const isValidHexColor = (color: string) => {
  return (
    /^#[0-9a-f]{3}$/i.test(color) || /^#[0-9a-f]{6}$/i.test(color) || /^#[0-9a-f]{8}$/i.test(color)
  );
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
