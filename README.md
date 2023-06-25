# bit-icon

Generate 8-bit style icons like the initial GitHub icons. SVG and PNG support.

## Installation

```
npm install bit-icon
```

## Methods

| Name    | Type            | Description                          | Example                                                                  |
| ------- | --------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| toSvg() | string          | Output Base64-encoded SVG in DataURI | `data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcv ...` |
| toPng() | Promise<string> | Output Base64-encoded PNG in DataURI | `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAGkCAMAAABJkqEH ...` |

## Options

| Name       | Type                             | Default  | Description                                                                                                                                                                                  |
| ---------- | -------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hash       | string                           |          | A hexadecimal string of 22 or more characters used to generate image.If none, it is randomly generated.                                                                                      |
| size       | number                           | 420      | The width and height of the image to be generated.                                                                                                                                           |
| pixel      | number                           | 70       | The size of a single pixel of the icon to be generated.Note that the pixel should be no larger than 1/5 of the size to avoid overflowing.                                                    |
| color      | string \| number[]               |          | The color of the icon is calculated from the hash value. Use this option to disable that behavior and use the specified color instead. Use Hex or HSL. (e.g. #FF0000 or [0,100,50] for red). |
| background | string \| number[]               | #FFFFFF  | Used as the background color of the generated image; use Hex or HSL. (e.g. #FF0000 or [0,100,50] for red).                                                                                   |
| hue        | number[]                         | [0,360]  | Used as a range of hue in HSL colors calculated from the hash.                                                                                                                               |
| saturation | number[]                         | [45,65]  | Used as a range of saturation in HSL colors calculated from the hash.                                                                                                                        |
| lightness  | number[]                         | [55,75]  | Used as a range of lightness in HSL colors calculated from the hash.                                                                                                                         |
| type       | 'normal' \| 'reverse'\| 'random' | "normal" | It is used to fill in the color of the image to be generated. "normal" has a white background and colored body. "reverse" is the reverse of "normal". "random" is just as the name implies.  |

## Usage

import

```JavaScript
import  { BitIcon }  from "bit-icon";
```

Simple

```JavaScript
const bitIcon = new BitIcon();
const svg = bitIcon.toSvg();

// If you use it in HTML
const img = document.createElement('img');
img.src = svg;
document.body.appendChild(img);
```

Custom

```JavaScript
import  { BitIcon, Options }  from "bit-icon";

// Must be at least 22 characters in hexadecimal, such as MD5.
const hash = 'd41d8cd98f00b204e9800998ecf8427e'
const options: Options = {
    size: 100,
    pixel: 15,
    color: [215, 25, 27],
    background: [214, 32, 91],
    hue: [100, 300],
    saturation: [10, 70],
    lightness: [20, 80],
    type: 'reverse'
  };
const bitIcon = new BitIcon(hash, options);
const png = bitIcon.toPng();

// If you want to download
const link = document.createElement('a');
link.download = 'sample.png';
link.href = png;
link.click();
```
