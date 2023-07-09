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
export declare class BitIcon {
    #private;
    hash: string;
    size: number;
    pixel: number;
    color: string;
    background: string;
    hue: number[];
    saturation: number[];
    lightness: number[];
    type: 'normal' | 'reverse' | 'random';
    constructor(hash?: string, options?: Options);
    toSvg(): string;
    toPng(): Promise<string>;
}
export declare const inputColorToHex: (color: string) => string;
export declare const parseRgb: (rgb: string) => number[];
export declare const parseHsl: (rgb: string) => number[];
