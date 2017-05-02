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

