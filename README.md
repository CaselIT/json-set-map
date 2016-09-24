[![NPM version](https://img.shields.io/npm/v/json-set-map.svg?style=flat)](https://www.npmjs.com/package/json-set-map)
[![Build Status](https://travis-ci.org/CaselIT/json-set-map.svg?branch=master)](https://travis-ci.org/CaselIT/json-set-map)
[![Coverage Status](https://coveralls.io/repos/github/CaselIT/json-set-map/badge.svg?branch=master)](https://coveralls.io/github/CaselIT/json-set-map?branch=master)
# json-set-map
`Set` and `Map` classes extended with the method `toJSON` and a static `fromJSON`.

The original `Set` and `Map` object are not modified, so can still be used.

This library does not provides pilifills for Set and Map.

## Install
```sh
npm i json-set-map
```
The current version supports `node v6.x` and `v5.x`. Tested on browsers `Chrome v52+`, `Firefox v47+` and `Edge v38+`

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
let serializableMap = new jMap()
let serializableSet = new jSet()
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
> serializableSet.add(1).add(2)
< SerializableSet { 1, 2 }
> JSON.stringify(serializableSet)
< '[1,2]'

// Map
> originalMap.set(1,2).set(3,4)
< Map { 1 => 2, 3 => 4 }
> JSON.stringify(originalMap)
< '{}'
> serializableMap.add(1).add(2)
< SerializableMap { 1 => 2, 3 => 4 }
> JSON.stringify(serializableMap)
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

Refer to the JSDoc documentation on the files for mode details.

#### Node
JSON does not support `undefined` and is replaced with `null`. This prevents the correct deserialization of a Set with both `undefined` and `null` as element or of a Map with both element as key. 

```ts
const str = JSON.stringify(new jSet().add(null).add(undefined)) // => '[null,null]'
jSet.fromJSON(JSON.parse(str))                                  // => SerializableSet { null }
```


### TODO
* Add support for `node v4.x`