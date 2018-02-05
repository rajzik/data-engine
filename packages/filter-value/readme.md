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
    const name = filter.Name;
    const value = filter.Value;
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


## WHAT NEXT

> Add promise like for big data!
> 
> Test all usecases
> 
> Set filter-value manually

