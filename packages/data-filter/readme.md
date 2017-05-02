# FILTER

Creating new filter
``` javascript
const filterEngine = new Filter(data);
```

Updating data
```javascript
    filterEngine.setData(newData);
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


## WHAT NEXT

> Add promise like for big data!
> 
> Test all usecases
> 
> Set filter-value manually

