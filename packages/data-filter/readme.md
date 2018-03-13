# FILTER



Filter engine for array of objects. 
Filter will not work with plain array. 


# Installation

```
npm install --save data-filter
```

# Example Usage 

```javascript
import Filter, { Sort, FilterValue } from 'data-engine';

var Filter = require('data-filter');
```


## Example data
```javascript
const a = [
    {
        'column1': 1,
        'column2': false,
        'column3': 'test',
    }, {
        'column1': 2,
        'column2': true,
        'column3': 'test2',
    }
]
```

## Constructor

Creating new Filter instance
```javascript
    const filter = new Filter({ data: [] });
    const filter2 = new Filter({ sortEngine: new Sort() });
```

## Data

```javascript
    // Setter
    filter.Data = [];
    filter.setData([]);
    filter.Data = undefined; // Will set data to empty array
    // Getter
    const originalData = sort.Data;
    const filteredData = sort.FilteredData;
    const filteredData = sort.getFilteredData();
```

## Adding filter value

You can add or create new filterValue, it is possible to add multiple FilterValues and once with update function.

```javascript
    const filtered = filter.addFilter(name, value, type);
    const filtered = filter.update(filterValue1, filterValue2, ...);
    
```

## Removing filter value
You can remove filter by its name or you can pass filterValue instance
```javascript
    const filtered = filter.removeFilters('Name of filter', filterValue);
    const filtered = filter.removeFilters('Name of filter');
```

## Clear filters

```javascript
    const filtered = filter.clearFilters();
```

## Getting filter

```javascript
    const filter = filter.getFilter('Name of filter');
```

## Sort engine

It is possible to pass sort engine object to filter, this will always return filtered and sorted data by criteria added to filter and sort.

```javascript
    filter.SortEngine = new Sort();
    const sortEngine = filter.SortEngine;
    // See: sort-engine
    filter.SortEngine.sortBy('name')
```

