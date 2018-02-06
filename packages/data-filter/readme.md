# FILTER

Creating new filter
``` javascript
const filterEngine = new Filter(data);
// with fetching from server
const filterEngine = new Filter(data, fetchFunction);
// with instance of sort
const filterEngine = new Filter(data, fetchFunction, sort);
// only with sort
const filterEngine = new Filter(data, null, sort);
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

Setting fetch function
Fetch function has to return data from server when called;
it's javascript promise
```javascript
    filterEngine.FetchFunction = () => {};
```

Fetching data from server
```javascript
    const filteredData = await filterEngine.fetchData(...args);
```

Getting sort engine from filter
```javascript
    const sorter = filterEngine.SortEngine;
```

