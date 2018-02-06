# SORT

Creating new Sort
```javascript
    const sort = new Sort(data);
    const sort2 = new Sort(data, 'Primary key');
    const sort3 = new Sort(data, 'Primary key', CustomSortFunction);

```

Updating data
```javascript
    // This line will resort data.
    const data = sort.updateData(newData);
    // this line will return data as is.
    const data2 = sort.updateData(newData, false);
```

Updating criteria
```javascript
    sort.setSortFunction(CustomFunction);
    sort.SortFunction = CustomFunction;
    sort.setPrimaryKey('new key');
    sort.PrimaryKey = 'new key';
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
    const data = sort.sortData();
```


## WHAT NEXT

> Add promise like for big data!
