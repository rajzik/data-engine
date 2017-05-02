# DATA ENGINE PREVIEW
 
Simple data engine, to provide sort and filter. It can work with custom dataset. 

# DATA-ENGINE

Create new data-engine
```javascript
    const engine = new DataEngine();
    const engine2 = new DataEngine(data);
    const engine3 = new DataEngine(data, 'primary key');
    const engine4 = new DataEngine(data, 'primary key', sortFunction);
```

Set data 
```javascript
    engine.setData(data);
```

Updating filters
```javascript 
    // will return filtered and sorted data
    const filteredData = engine.update(filter, filter2, filter3);
```

Updating sort
```javascript
    const sorted = engine.updateSort('new name');
```

> Note: when you call update sort with same key it will automatically reverse array;

removing filters
```javascript
    const filteredData = engine.removerFilter('name of filter', filter);
```

Clearing filters
```javascript
    const filteredData = engine.clearFilters();
```

Clearing sort
```javascript
    const filteredData = engine.clearSort();
```

Resorting
```javascript
    const filteredData = engine.resort();
```

Getting data
```javascript
    const filteredData = engine.getData();
```

> Note: Data engine should have same functions from sort and filter that are mentioned below.


# FILTER-VALUE 

Creating new filter value

```javascript
const filter = new FilterValue('name');
const filter2 = new FilterValue('name', 'Criteria');
const filter3 = new FilterValue('name', 'Criteria', 'type');
```

Updating filter value 
```javascript
    filter.updateName('New Name');
    filter.updateValue(/New value/i);
    filter.updateType('regex');
```

Removing type 
```javascript
    filter.removeType();
```

Getting values
``` javascript
    const name = filter.getName();
    const value = filter.getValue();
```

## Possible value types

* `boolean`
* `function`
* `array`
* `regexp`
* `date`
* `string`
* `number`
* `range` **

> ** Note: range can only contains `string`, `number` or `date`

## Static type values

* `number`
* `string`
* `regexp`
* `boolean`

When static type is set, it will try to parse value as this type!

## WARNING

> Note: Filter value using prototype changes which are dangerous.
> 
> Note: When you using regexp please use `FilterValue.regexEscape('Some regular expression')`


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


# SORT

Creating new Sort
```javascript
    const sort = new Sort(data);
    const sort2 = new Sort(data, 'Primary key');
    const sort3 = new Sort(data, 'Primary key', CustomSortFunction);
    // Data = Array of some json objects, primary key = fallback name for sort when data of same key have same value, CustomSortFunction = Custom function which will be called when you call sortBy
```

Updating data
```javascript
    // this line will return data as is.
    const data = sort.updateData(newData);
    // This line will resort data.
    const data2 = sort.updateData(newData, true);
```

Updating criteria
```javascript
    sort.setSortFunction(CustomFunction);
    sort.setPrimaryKey('new key');
```

Removing criteria
```javascript
    sort.removePrimaryKey();
    sort.setDefaultSort();
```

Sorting data
```javascript
    const data = sort.sortBy('name');
```

Getting data 
```javascript
    const data = sort.getData();
```

Resorting data
```javascript
    const data = sort.justSort();
```


## WHAT NEXT

> Add promise like for big data!
> 
> Test all usecases
> 
> Set filter-value manually

