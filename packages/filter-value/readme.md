# FILTER VALUE

Filter value is engine for filtering data by it's value

# Installation

```
npm install --save filter-value
```

# Example Usage 

```javascript
import FilterValue from 'filter-value';
var FilterValue = require('filter-value');
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

Creating new Filter value instance
```javascript
    const filterValue = new FilterValue();
    const filterValue2 = new FilterValue(name);
    const filterValue3 = new FilterValue(name, value);
    const filterValue4 = new FilterValue(name, value, staticType);
```

## Name

```javascript
    filterValue.Name = 'new Name';
    const name = filterValue.Name;
```

## Value 

Valid values: 
- String
- Number
- Date
- Function
- Boolean
- Regexp
- Null
- Array


```javascript
    filterValue.Value = 'new value';
    const value = filterValue.Value;
```


### Range filter

Valid value for range
- Number
- String
- Date*

> Note: *Date will try to create date from given item in array if item isn't instance of Date

```javascript
    filterValue.Value = {
        from: new Date(),
        to: new Date()
    }
```

### Array filter 
Array filter can be variety of types

Valid values for array
- String
- Number
- Date
- Function
- Boolean
- Regexp
- Null

#### Limitations
Only one dimensional array can be used

```javascript
    filterValue.Value = [
        'yes',
        false,
        null,
        new Date()
    ]
```

## Type 

When type is set value will automatically retype to chosen type.
It's possible to get original value, example is shown below.

Valid types
- Boolean
- Date*
- Number
- Regexp**
- String

> *It's used native function `new Date(arg)`
>
> **Using native function `new RegExp()` with escaping characters

```javascript
    filterValue.Type = 'string';
    filterValue.removeType();
    const originalValue = filterValue.Original;
    const type = filterValue.Type;
```
