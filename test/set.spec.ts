import * as test from 'tape';

import { Set as SerializableSet } from '../index';

import { keyParser, KeyTest } from './test-utils';

test('Set tests', t => {
  t.test('Method toJSON', st => {
    st.plan(2);
    const items: number[] = [1, 2, 3, 4];
    const set = new SerializableSet<number>(items);
    st.deepEqual(set.toJSON(), items);
    st.deepEqual(JSON.stringify(set), JSON.stringify(items));
    st.end();
  });
  t.test('Method fromJSON', st => {
    st.test('Call with empty array', sst => {
      sst.plan(3);
      const set = SerializableSet.fromJSON([]);
      sst.ok(set instanceof SerializableSet, 'Is SerializableSet instance');
      sst.ok(set instanceof Set, 'Is Set instance');
      sst.equal(set.size, 0);
      sst.end();
    });
    st.test('Call with array', sst => {
      const items: number[] = [1, 2, 3, 4];
      sst.plan(3 + items.length);
      const set = SerializableSet.fromJSON<number>(items);
      sst.ok(set instanceof SerializableSet, 'Is SerializableSet instance');
      sst.ok(set instanceof Set, 'Is Set instance');
      sst.equal(set.size, items.length);
      for (let item of items) {
        sst.ok(set.has(item), 'Has element');
      }
      sst.end();
    });
    st.test('Use parser', sst => {
      const items: number[] = [1, 2, 3, 4];
      sst.plan(3 + 2 * items.length);
      const set = SerializableSet.fromJSON<KeyTest>(items, { parser: keyParser });
      sst.ok(set instanceof SerializableSet, 'Is SerializableSet instance');
      sst.ok(set instanceof Set, 'Is Set instance');
      sst.equal(set.size, items.length);
      for (let setItem of set) {
        sst.ok(setItem instanceof KeyTest, 'Item was parsed');
        let found = false;
        for (let item of items)
          if (item === setItem.key) {
            found = true;
            break;
          }
        sst.ok(found, 'The item was added to the Set');
      }
      sst.end();
    });
  });
});
