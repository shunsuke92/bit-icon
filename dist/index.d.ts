export type Options = {
    size?: number;
    pixel?: number;
    color?: string | number[];
    background?: string | number[];
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
