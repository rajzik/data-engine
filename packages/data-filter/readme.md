# FILTER

Creating new filter
``` javascript
const filterEngine = new Filter(data);
// with instance of sort
const filterEngine = new Filter(data, sort);
```

Updating data
```javascript
    filterEngine.setData(newData);
```

Getting original data
```javascript
    const originalData = filterEngine.Data;
```

Adding and updating filters
```javascript 
    const filteredData = filterEngine.update(filter, filter2, filter3 /*Add as many as you need*/);
```

Removing filters
```javascript
    const filteredData = filterEngine.removeFilter(filter, 'name' /*As many as you need*/);
```

Clearing filters
```javascript
    const filteredData = filterEngine.clearFilters();
```

Getting data
```javascript
    const filteredData = filterEngine.getFilteredData();
```

Getting sort engine from filter
```javascript
    const sorter = filterEngine.SortEngine;
```

