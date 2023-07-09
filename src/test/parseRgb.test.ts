import { parseRgb } from '../index';

test('basic pattern', () => {
  const result = parseRgb('(0,0,0)');
  expect(result).toEqual([0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseRgb('(0,0,0,0)');
  expect(result).toEqual([0, 0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseRgb('(0,0,0,0%)');
  expect(result).toEqual([0, 0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseRgb('(0,0,0,50%)');
  expect(result).toEqual([0, 0, 0, 50]);
});

test('basic pattern', () => {
  const result = parseRgb('(255,255,255)');
  expect(result).toEqual([255, 255, 255]);
});

test('basic pattern', () => {
  const result = parseRgb('(255,255,255,0.5)');
  expect(result).toEqual([255, 255, 255, 50]);
});

test('basic pattern', () => {
  const result = parseRgb('(255,255,255,1)');
  expect(result).toEqual([255, 255, 255, 100]);
});

test('basic pattern', () => {
  const result = parseRgb('(255,255,255,100%)');
  expect(result).toEqual([255, 255, 255, 100]);
});

test('error pattern', () => {
  const result = () => parseRgb('(256,255,255)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(255,256,255)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(255,255,256)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(-1,0,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(0,-1,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(0,0,-1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(0,0,0,-0.1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(0,0,0,1.1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('255,255,255,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('(255,255,255,0');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseRgb('255,255,255,0');
  expect(result).toThrow('Invalid color format.');
});
