# DATA-ENGINE

Simple data engine, to provide sort and filter. It can work with custom dataset. 


# Installation

```
npm install --save data-engine
```

# Example Usage 

```javascript
import DataEngine, { Filter, Sort, FilterValue } from 'data-engine';

var Filter = require('data-engine');
```

## Constructor 

```javascript
    const engine = new DataEngine();
    const engine2 = new DataEngine({
        data, primaryKey, sortFunction, direction,
    });
```

## Data

```javascript
    engine.setData(data);
    engine.Data = data;
    const data = engine.Data;
    const data = engine.getData();
```


## Filters

```javascript 
    const filteredData = engine.updateFilters(filter, filter2, filter3);
    const filteredData = engine.removeFilters(filter, filter2, filter3);
    const filteredData = engine.addFilter(name, value, type);
    const filteredData = engine.clearFilters();
```

## Sort
```javascript
    const sorted = engine.sortBy('Column name');
    const sorted = engine.setSortFunction((a, b) => (a > b? 1 : -1));
    const sorted = engine.setPrimaryKey('Column name');
    const sorted = engine.removePrimaryKey();
    const sorted = engine.setDefaultSort();
```
