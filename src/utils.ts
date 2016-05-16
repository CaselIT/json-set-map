
/** Parser function interface */
export interface Parser<T> {
  /**
   * A function that takes as argument the serialization of an object
   * and returns a new instance of the object.
   * @param {any} item The serialized representation of the objed.
   * @return {T} The loaded object instance.
   */
  (item: any): T;
}
