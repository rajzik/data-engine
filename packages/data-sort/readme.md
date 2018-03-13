# SORT

Sort engine for array of object, this sort will not work with plain array.

Sort has some criterias like `primary key`, `default direction`, `custom sort function`.
This criteria can be changed in runtime. All criteria are optional, but can significantly change how sort will look like. 

# Installation

```
npm install --save data-sort
```

# Example Usage 

```javascript
var Filter = require('data-sort');
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

Creating new Sort
```javascript
    const sort = new Sort({ data: [] });
    const sort2 = new Sort({ primaryKey: 'Primary key'});
    const sort3 = new Sort({ sortFunction: (a, b) => (a > b? 1 : -1)});
    const sort3 = new Sort({ direction: true});
```

## Data

```javascript
    // Setter
    sort.Data = [];
    sort.setData([], false);
    // Getter
    const sortedData = sort.Data;
    const sortedData = sort.getData();
```

## Sorting 

```javascript
    // Sorting by collumn name
    const sorted = sort.sortBy('Column name');
    // Calling this function again with same argument will cause revere
    const reversed = sort.sortBy('Column name');
```

## Custom sort function
```javascript
    // Setting your own comparing function
    sort.SortFunction = (a, b) => (a > b? 1: -1);
    // Setting default sort
    sort.setDefaultSort();
```

## Primary key

```javascript
    // Setting primary - fallback key
    sort.PrimaryKey = 'column name';
    // Removing primary key
    sort.removePrimaryKey();
```
