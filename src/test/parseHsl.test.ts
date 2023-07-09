import { parseHsl } from '../index';

test('basic pattern', () => {
  const result = parseHsl('(0,0,0)');
  expect(result).toEqual([0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseHsl('(0,0,0,0)');
  expect(result).toEqual([0, 0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseHsl('(0,0,0,0%)');
  expect(result).toEqual([0, 0, 0, 0]);
});

test('basic pattern', () => {
  const result = parseHsl('(0,0,0,50%)');
  expect(result).toEqual([0, 0, 0, 50]);
});

test('basic pattern', () => {
  const result = parseHsl('(360,100,100)');
  expect(result).toEqual([360, 100, 100]);
});

test('basic pattern', () => {
  const result = parseHsl('(360,100,100,0.5)');
  expect(result).toEqual([360, 100, 100, 50]);
});

test('basic pattern', () => {
  const result = parseHsl('(360,100,100,1)');
  expect(result).toEqual([360, 100, 100, 100]);
});

test('basic pattern', () => {
  const result = parseHsl('(360,100,100,100%)');
  expect(result).toEqual([360, 100, 100, 100]);
});

test('error pattern', () => {
  const result = () => parseHsl('(361,100,100)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(360,101,100)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(360,100,101)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(-1,0,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(0,-1,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(0,0,-1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(0,0,0,-0.1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(0,0,0,1.1)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('360,100,100,0)');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('(360,100,100,0');
  expect(result).toThrow('Invalid color format.');
});

test('error pattern', () => {
  const result = () => parseHsl('360,100,100,0');
  expect(result).toThrow('Invalid color format.');
});
