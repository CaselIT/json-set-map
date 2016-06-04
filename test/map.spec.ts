import * as test from 'tape';

import { Map as SerializableMap } from '../index';

import { keyParser, KeyTest, valueParser, ValueTest } from './test-utils';

test('Map tests', t => {
  t.test('Method toJSON', st => {
    st.plan(2);
    const entries: [number, number][] = [[1, 2], [3, 4]];
    const map = new SerializableMap<number, number>(entries);
    st.deepEqual(map.toJSON(), entries);
    st.deepEqual(JSON.stringify(map), JSON.stringify(entries));
    st.end();
  });
  t.test('Method fromJSON', st => {
    st.test('Call with empty array', sst => {
      sst.plan(3);
      const map = SerializableMap.fromJSON([]);
      sst.ok(map instanceof SerializableMap, 'Is SerializableMap instance');
      sst.ok(map instanceof Map, 'Is Map instance');
      sst.equal(map.size, 0);
      sst.end();
    });
    st.test('Call with array', sst => {
      const entries: [number, number][] = [[1, 2], [3, 4]];
      sst.plan(3 + 2 * entries.length);
      const map = SerializableMap.fromJSON<number, number>(entries);
      sst.ok(map instanceof SerializableMap, 'Is SerializableMap instance');
      sst.ok(map instanceof Map, 'Is Map instance');
      sst.equal(map.size, entries.length);
      for (let entry of entries) {
        sst.ok(map.has(entry[0]), 'Has element');
        sst.equal(map.get(entry[0]), entry[1]);
      }
      sst.end();
    });
    st.test('Use keyParser', sst => {
      const entries: [number, number][] = [[1, 2], [3, 4]];
      sst.plan(3 + 3 * entries.length);
      const map = SerializableMap.fromJSON<KeyTest, number>(entries, { keyParser });
      sst.ok(map instanceof SerializableMap, 'Is SerializableMap instance');
      sst.ok(map instanceof Map, 'Is Map instance');
      sst.equal(map.size, entries.length);
      for (let mapEntry of map) {
        sst.ok(mapEntry[0] instanceof KeyTest, 'Key was parsed');
        sst.equal(typeof mapEntry[1], 'number', 'Value was not parsed');
        for (let entry of entries)
          if (entry[0] === mapEntry[0].key) {
            sst.equal(mapEntry[1], entry[1]);
            break;
          }
      }
      sst.end();
    });
    st.test('Use valueParser', sst => {
      const entries: [number, number][] = [[1, 2], [3, 4]];
      sst.plan(3 + 3 * entries.length);
      const map = SerializableMap.fromJSON<number, ValueTest>(entries, { valueParser });
      sst.ok(map instanceof SerializableMap, 'Is SerializableMap instance');
      sst.ok(map instanceof Map, 'Is Map instance');
      sst.equal(map.size, entries.length);
      for (let mapEntry of map) {
        sst.equal(typeof mapEntry[0], 'number', 'key was not parsed');
        sst.ok(mapEntry[1] instanceof ValueTest, 'Value was parsed');
        for (let entry of entries)
          if (entry[0] === mapEntry[0]) {
            sst.equal(mapEntry[1].value, entry[1]);
            break;
          }
      }
      sst.end();
    });
    st.test('Use key and valueParser', sst => {
      const entries: [number, number][] = [[1, 2], [3, 4]];
      sst.plan(3 + 3 * entries.length);
      const map = SerializableMap.fromJSON<KeyTest, ValueTest>(entries, { keyParser, valueParser });
      sst.ok(map instanceof SerializableMap, 'Is SerializableMap instance');
      sst.ok(map instanceof Map, 'Is Map instance');
      sst.equal(map.size, entries.length);
      for (let mapEntry of map) {
        sst.ok(mapEntry[0] instanceof KeyTest, 'Key was parsed');
        sst.ok(mapEntry[1] instanceof ValueTest, 'Value was parsed');
        for (let entry of entries)
          if (entry[0] === mapEntry[0].key) {
            sst.equal(mapEntry[1].value, entry[1]);
            break;
          }
      }
      sst.end();
    });
  });
});
