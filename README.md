# jsoon-set-map
`Set` and `Map` classes extended with the method `toJSON` and a static `fromJSON`.

The original `Set` and `Map` object are not modified, so can still be used.

This library does not provides pilifills for Set and Map.

## Install
```sh
npm i json-set-map
```
The current version supports only `node v6.x` and `node v5.x`

## Usage
* Typescript and es6
```ts
import { Set, Map } from 'json-set-map'
```
* Nodejs
```js
var Set = require('json-set-map').Set;
var Map = require('json-set-map').Map;
```
The unmodified Set and Map class can still be used:
```ts
import { Set as jSet, Map as jMap } from 'json-set-map'
let originalMap = new Map()
let originalSet = new Set()
let mapSubclass = new jMap()
let setSubclass = new jSet()
```

## API

### Method `toJSON`

Called automaticly by `JSON.stringify`
```
// Set
> originalSet.add(1).add(2)
< Set { 1, 2 }
> JSON.stringify(originalSet)
< '{}'
> setSubclass.add(1).add(2)
< SerializableSet { 1, 2 }
> JSON.stringify(setSubclass)
< '[1,2]'

// Map
> originalMap.set(1,2).set(3,4)
< Map { 1 => 2, 3 => 4 }
> JSON.stringify(originalMap)
< '{}'
> mapSubclass.add(1).add(2)
< SerializableMap { 1 => 2, 3 => 4 }
> JSON.stringify(mapSubclass)
< '[[1,2],[3,4]]'
```

### Method `fromJSON`
Static method useful to load a `Set` or `Map` from the object returned by `JSON.parse`. A parser function can be used to load the objects of the array as shown in the example below. 
```
> import { Set, Map } from 'json-set-map'

// Used without a parser it's the same as calling new Set
> Set.fromJSON(["2016-05-16T22:26:47.534Z","2016-05-16T22:26:47.533Z"])
< SerializableSet { '2016-05-16T22:26:47.534Z', '2016-05-16T22:26:47.533Z' } // Items are strings

// A parser function can be used to load the object.
> let parser=(d) => new Date(d)
> Set.fromJSON(["2016-05-16T22:26:47.534Z","2016-05-16T22:26:47.533Z"], { parser })
< SerializableSet { 2016-05-16T22:26:47.534Z, 2016-05-16T22:26:47.533Z } // Items are Dates

// Used without a parser it's the same as calling new Map 
> Map.fromJSON([['KeY','ValuE']])
< SerializableMap { 'KeY' => 'ValuE' }

// Separate parser function for the key and the value can be used.
> let keyParser = (item) => item.toUpperCase()
> let valueParser = (item) => item.toLowerCase()
> Map.fromJSON([['KeY','ValuE']], {keyParser, valueParser})
< SerializableMap { 'KEY' => 'value' }
```

See the JSDoc on the files for mode details.


### TODO
* Add support for `node v4.x`