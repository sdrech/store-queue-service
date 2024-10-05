import Store from '../src/store/store.class';

const VALID_KEY_A = 'a'
const VALID_VALUE_A = 'aaaaa'
const VALID_VALUE_A_NEW = 'aaa'
const VALID_KEY_B = 'b'
const VALID_VALUE_B = 'bbbbb'
const VALID_KEY_ONE = 'one'
const VALID_VALUE_ONE = 'value_one'
const EMPTY_STRING = ''
const SPACED_STRING = ' '

///////

describe('=== Validation the constructor of Store Class ===', () => {

    test('positive number is a valid size of Store', () => {
        const store = new Store(3)
        const received = store.getStorage()

        expect(received).toBeInstanceOf(Map)
        expect(store).toBeInstanceOf(Object)
        expect(store.get).toBeInstanceOf(Function)
        expect(store.put).toBeInstanceOf(Function)
    })

    test('do not accept zero-sized Store', () => {
        expect(() => new Store(0)).toThrow(Error)
        expect(() => new Store(0)).toThrow(/Store size/)
    })

    test('do not accept negative numbers as a size of Store', () => {
        expect(() => new Store(-1)).toThrow(Error)
        expect(() => new Store(-1)).toThrow(/Store size/)
    })

    test('do not accept string as a size of Store', () => {
        // @ts-ignore   IGNORE WRONG TYPE OF KEY
        expect(() => new Store('1')).toThrow(Error)
        // @ts-ignore   IGNORE WRONG TYPE OF KEY
        expect(() => new Store('1')).toThrow(/Store size/)
    })
})

///////

describe('=== Validation arguments for get() and put() methods ===', () => {
    let store: Store

    beforeEach(() => {
        store = new Store(2)
    });

    test('successfully accept lowercase alphabet as a key', () => {
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        const received = store.get(VALID_KEY_ONE)
        expect(received).toBe(VALID_VALUE_ONE)
    })

    test('successfully accept one lowercase letter as a key', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        const received = store.get(VALID_KEY_A)
        expect(received).toBe(VALID_VALUE_A)
    })

    test('do not accept Capital case letters as a key', () => {
        const key = 'ONE'
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept lower & Capital case letters as a key', () => {
        const key = 'One'
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept numbers as a key', () => {
        const key = 1
        // @ts-ignore   IGNORE WRONG TYPE OF KEY
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        // @ts-ignore   IGNORE WRONG TYPE OF KEY
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept the mix of string & numbers as a key', () => {
        const key = 'key1'
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept any signs inside the key', () => {
        const key = 'key_with_sign'
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept space sign as a key', () => {
        const key = null
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(key, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept empty string as a key', () => {
        expect(() => store.put(EMPTY_STRING, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(EMPTY_STRING, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })

    test('do not accept space sign as a key', () => {
        expect(() => store.put(SPACED_STRING, VALID_VALUE_ONE)).toThrow(Error)
        expect(() => store.put(SPACED_STRING, VALID_VALUE_ONE)).toThrow(/Key must be/)
    })
})

///////

describe('=== Validation business logic for Store Class ===', () => {
    let store: Store
    const maxSize = 2

    beforeEach(() => {
        store = new Store(maxSize)
    })

    test('get() returns NULL in case of empty Store', () => {
        const receivedValue = store.get(VALID_KEY_ONE)
        expect(receivedValue).toBeNull()
    })

    test('get() returns NULL if key is absent (in non-empty Store)', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        expect(store.get(VALID_KEY_ONE)).toBeNull()
    })

    test('put() and get() handle empty value to/from the Store', () => {
        store.put(VALID_KEY_ONE, EMPTY_STRING);
        expect(store.get(VALID_KEY_ONE)).toBe(EMPTY_STRING)
    })

    test('put() and get() handle only space sign as a value', () => {
        store.put(VALID_KEY_ONE, SPACED_STRING);
        expect(store.get(VALID_KEY_ONE)).toBe(SPACED_STRING)
    })

    test('put() overwrites existing record', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A)
        store.put(VALID_KEY_A, VALID_VALUE_A_NEW)
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A_NEW)
    })

    test('put() overwrites existing record', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A)
        store.put(VALID_KEY_A, VALID_VALUE_A_NEW)
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A_NEW)

        const storage = store.getStorage()
        expect(storage.size).toBe(1)
    })

    test('get() of absent keys does not affect Store size', () => {
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        expect(store.get(VALID_KEY_A)).toBeNull()
        expect(store.get(VALID_KEY_B)).toBeNull()

        const storage = store.getStorage()
        expect(storage.size).toBe(1)
    })

    test('get() changes the order of records, permanent Store size', () => {
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        store.put(VALID_KEY_A, VALID_VALUE_A)
        const expectedOne = store.get(VALID_KEY_ONE)
        store.put(VALID_KEY_B, VALID_VALUE_B)

        expect(expectedOne).toBe(VALID_VALUE_ONE)
        expect(store.get(VALID_KEY_A)).toBeNull()
        expect(store.get(VALID_KEY_B)).toBe(VALID_VALUE_B)

        const storage = store.getStorage()
        expect(storage.size).toBe(maxSize)
    })

    test('put() overwrites the latest used record by new one', () => {
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        store.put(VALID_KEY_A, VALID_VALUE_A)
        store.put(VALID_KEY_B, VALID_VALUE_B)

        expect(store.get(VALID_KEY_ONE)).toBeNull()
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A)
        expect(store.get(VALID_KEY_B)).toBe(VALID_VALUE_B)

        const storage = store.getStorage()
        expect(storage.size).toBe(maxSize)
    })

    test('put() changes the order of records, permanent Store size', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        store.put(VALID_KEY_B, VALID_VALUE_B)
        store.put(VALID_KEY_A, VALID_VALUE_A_NEW)
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        
        expect(store.get(VALID_KEY_A)).toBe(VALID_VALUE_A_NEW)
        expect(store.get(VALID_KEY_B)).toBeNull()
        expect(store.get(VALID_KEY_ONE)).toBe(VALID_VALUE_ONE)

        const storage = store.getStorage()
        expect(storage.size).toBe(maxSize)
    })

    test('put() changes 2 times the order of records, permanent Store size', () => {
        store.put(VALID_KEY_A, VALID_VALUE_A)
        store.put(VALID_KEY_B, VALID_VALUE_B)
        store.put(VALID_KEY_A, VALID_VALUE_A_NEW)
        store.put(VALID_KEY_B, EMPTY_STRING)
        store.put(VALID_KEY_ONE, VALID_VALUE_ONE)
        
        expect(store.get(VALID_KEY_A)).toBeNull()
        expect(store.get(VALID_KEY_B)).toBe(EMPTY_STRING)
        expect(store.get(VALID_KEY_ONE)).toBe(VALID_VALUE_ONE)

        const storage = store.getStorage()
        expect(storage.size).toBe(maxSize)
    })
})
