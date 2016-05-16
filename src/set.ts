import { Parser } from './utils';

/** Extends Set to add toJSON and fromJSON */
export default class SerializableSet<T> extends Set<T> {
  /**
   * Called automaticly by JSON.stringify
   * @return {T[]} An array of elements.
   */
  toJSON(): T[] {
    return [...this.values()];
  }
  /**
   * Creates a new set instance the array returned by JSON.parse. 
   * If no parser is specified, this method returns `new SerializableSet<T>(iterable)`
   * @param {any[]} iterable The array of elements.
   * @param {(item: any)=>T} [parser] Function to use as parser for the objects.
   * @return {SerializableSet<T>} The set loaded with the values parsed from the array.
   */
  static fromJSON<T>(iterable: Iterable<any>, {parser}: { parser?: Parser<T> } = {}): SerializableSet<T> {
    if (!parser)
      return new SerializableSet<T>(iterable);
    const set = new SerializableSet<T>();
    for (let item of iterable)
      set.add(parser(item));
    return set;
  }
}
