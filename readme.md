# Whitelist nested object keys



```
npm install whitelisted
```
```
const whitelisted = requre('whitelisted') 
```
```
obj = {
    amount: 1000,
    name: 'Sally',
    age: 5,
    isHappy: true,
    isVaccinated: null,
    address: {
        street: '123 St',
        city: 'Hobbs',
        coords: { lat: '123', lon: '456' }
    },
    'dogs': [
        { name: 'Max', color: 'brown' },
        { name: 'Bentley', color: 'white' }
    ],
    cats: [
        { name: 'Tom',  color: 'grey' }
    ],
    backyard: {
        size: { unit: 'meter', count: 10 }
    },
    misc: [null, 1, false, 'string']
}   

whitelist = [
    'name',
    'age',
    'isHappy',
    'address.*',
    'dogs.name',
    'cats.*',
    'backyard.size.unit',
    'misc'
]
```

```
whitelisted(obj, whitelist)
```

**Converts to**

```
{
    name: 'Sally',
    age: 5,
    isHappy: true,
    address: {
        street: '123 St',
        city: 'Hobbs',
        coords: { lat: '123', lon: '456' }
    },
    'dogs': [
        { name: 'Max' },
        { name: 'Bentley' }
    ],
    cats: [
        { name: 'Tom',  color: 'grey' }
    ],
    backyard: {
        size: { unit: 'meter' }
    },
    misc: [null, 1, false, 'string']
}
```

## Whitelist keys
```
whitelist = [ 'name', 'misc' ]

// returns
{
    name: 'Sally',
    misc: [null, 1, false, 'string']
}
```

## Whitelist nested child object literal
```
whitelist = [ 'address.city' ]

// returns
{
    address: { city: 'Hobbs' }
}
```

## Whitelist nested child array of object literals
```
whitelist = [ 'cats.color' ]

// returns
{
    cats: [
        { color: 'grey' }
    ]
}
```

## Whitelist all nested children of a key
```
whitelist = [ 'address.*' ]

// returns
{
    address: {
        street: '123 St',
        city: 'Hobbs',
        coords: { lat: '123', lon: '456' }
    }
}
```