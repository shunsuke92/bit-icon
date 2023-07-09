import { inputColorToHex } from '../index';

// HEX
test('basic pattern', () => {
  const result = inputColorToHex('#304285');
  expect(result).toEqual('#304285');
});

test('basic pattern', () => {
  const result = inputColorToHex('#304');
  expect(result).toEqual('#304');
});

test('basic pattern', () => {
  const result = inputColorToHex('#30428500');
  expect(result).toEqual('#30428500');
});

test('basic pattern', () => {
  const result = inputColorToHex('#30428580');
  expect(result).toEqual('#30428580');
});

test('basic pattern', () => {
  const result = inputColorToHex('#304285FF');
  expect(result).toEqual('#304285FF');
});

test('basic pattern', () => {
  const result = inputColorToHex('# 30 42 85 ');
  expect(result).toEqual('#304285');
});

test('error pattern', () => {
  const result = () => inputColorToHex('304285');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#3');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#30');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#3042');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#30428');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#3042855');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => inputColorToHex('#304285001');
  expect(result).toThrow('Invalid color format.');
});

// RGB
test('basic pattern', () => {
  const result = inputColorToHex('rgb(48,66,133)');
  expect(result).toEqual('#304285');
});

test('basic pattern', () => {
  const result = inputColorToHex('rgb(48,66,133,0)');
  expect(result).toEqual('#30428500');
});

test('basic pattern', () => {
  const result = inputColorToHex('rgb(48,66,133,0.5)');
  expect(result).toEqual('#30428580');
});

test('basic pattern', () => {
  const result = inputColorToHex('rgb(48,66,133,50%)');
  expect(result).toEqual('#30428580');
});

test('basic pattern', () => {
  const result = inputColorToHex('rgb(48,66,133,100%)');
  expect(result).toEqual('#304285FF');
});

test('basic pattern', () => {
  const result = inputColorToHex(' rgb ( 48 , 66 , 133 )');
  expect(result).toEqual('#304285');
});

test('error pattern', () => {
  const result = () => inputColorToHex('rgba(48,66,133)');
  expect(result).toThrow('Invalid color format.');
});

// HSL
test('basic pattern', () => {
  const result = inputColorToHex('hsl(227,47,35)');
  expect(result).toEqual('#304284');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsl(227,47,35,0)');
  expect(result).toEqual('#30428400');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsl(227,47,35,0.5)');
  expect(result).toEqual('#30428480');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsl(227,47,35,50%)');
  expect(result).toEqual('#30428480');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsl(227,47,35,100%)');
  expect(result).toEqual('#304284FF');
});

test('basic pattern', () => {
  const result = inputColorToHex(' hsl ( 227 , 47 , 35 , 100% )');
  expect(result).toEqual('#304284FF');
});

// HSB
test('basic pattern', () => {
  const result = inputColorToHex('hsb(227,64,52)');
  expect(result).toEqual('#304285');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsb(227,64,52,0)');
  expect(result).toEqual('#30428500');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsb(227,64,52,0.5)');
  expect(result).toEqual('#30428580');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsb(227,64,52,50%)');
  expect(result).toEqual('#30428580');
});

test('basic pattern', () => {
  const result = inputColorToHex('hsb(227,64,52,100%)');
  expect(result).toEqual('#304285FF');
});

test('basic pattern', () => {
  const result = inputColorToHex(' hsb ( 227 , 64 , 52 , 100 % ) ');
  expect(result).toEqual('#304285FF');
});
