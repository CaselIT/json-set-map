export class KeyTest {
  constructor(public key: number) { }
  toJSON() { return this.key; }
}
export function keyParser(item: any) {
  return new KeyTest(item);
}
export class ValueTest {
  constructor(public value: number) { }
  toJSON() { return this.value; }
}
export function valueParser(item: any) {
  return new ValueTest(item);
}
