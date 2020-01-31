const whitelisted = require('./whitelisted')

test('Correct Output', () => {
    expect(whitelisted(obj, whitelist)).toStrictEqual(returnedObj)
})

const obj = {
    amount: 1000,
    'name': 'Sally',
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
        { name: 'Tom',  color: 'orange' }
    ],
    backyard: {
        size: { unit: 'meter', count: 10 }
    },
    misc: [null, 1, false, 'string']
}   

const whitelist = [
    'name',
    'age',
    'isHappy',
    'isVaccinated',
    'address.*',
    'dogs.name',
    'cats.*',
    'backyard.size.unit',
    'misc'
]

const returnedObj = {
    'name': 'Sally',
    age: 5,
    isHappy: true,
    isVaccinated: null,
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
        { name: 'Tom',  color: 'orange' }
    ],
    backyard: {
        size: { unit: 'meter' }
    },
    misc: [null, 1, false, 'string']
}

test('Empty Array', () => {
    expect(whitelisted([], [])).toStrictEqual([])
    expect(whitelisted({}, [''])).toStrictEqual({})
    expect(whitelisted({}, ['a'])).toStrictEqual({})
    expect(whitelisted({}, [1])).toStrictEqual({})
    expect(whitelisted([], null)).toStrictEqual([])
    expect(whitelisted([], true)).toStrictEqual([])
    expect(whitelisted([], 1)).toStrictEqual([])
})

test('Empty Object', () => {
    expect(whitelisted({}, [])).toStrictEqual({})
    expect(whitelisted({}, [''])).toStrictEqual({})
    expect(whitelisted({}, ['a'])).toStrictEqual({})
    expect(whitelisted({}, [1])).toStrictEqual({})
    expect(whitelisted({}, null)).toStrictEqual({})
    expect(whitelisted({}, true)).toStrictEqual({})
    expect(whitelisted({}, 1)).toStrictEqual({})
})

test('Not an Object or Array', () => {
    expect(whitelisted(1, [])).toStrictEqual(null)
    expect(whitelisted(false, [])).toStrictEqual(null)
    expect(whitelisted(null, [])).toStrictEqual(null)
    expect(whitelisted('string', [])).toStrictEqual(null)
})