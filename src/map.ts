import { Parser } from './utils';

/** Extends Map to add toJSON and fromJSON */
export default class SerializableMap<K, V> extends Map<K, V> {
  /**
   * Called automatically by JSON.stringify
   * @return {[K, V][]} An array of two elements tuple.
   */
  toJSON(): [K, V][] {
    return [...this.entries()];
  }
  /**
   * Creates a new map instance from the array of tuple returned by JSON.parse.
   * If no parser is specified, this method returns `new SerializableMap<K, V>(iterable)`
   * @param {any[]} iterable The array of tuples.
   * @param {(item: any) => K} [options.keyParser] Function to use as parser for the key objects.
   * @param {(item: any) => V} [options.valueParser] Function to use as parser for the value objects.
   * @return {SerializableMap<K, V>} The map loaded with the values parsed from the array.
   */
  static fromJSON<K, V>(iterable: Iterable<any>, options?: { keyParser?: Parser<K>, valueParser?: Parser<V> }): SerializableMap<K, V> {
    options = options || {};
    if (!options.keyParser && !options.valueParser)
      return new SerializableMap<K, V>(iterable);
    const map = new SerializableMap<K, V>();
    for (let item of iterable)
      map.set(options.keyParser ? options.keyParser(item[0]) : item[0],
        options.valueParser ? options.valueParser(item[1]) : item[1]);
    return map;
  }
}
