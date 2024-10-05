import Store from './store/store.class'

const store = new Store(2)

store.put('a', '1')
store.get('a')
store.get('b')
store.put('b', '2')
store.put('c', '3')
store.get('a')
store.get('a')

store.put('b', '222')
store.get('a')
store.get('a')
store.get('c')

// real 25 unit-test are in "/tests/store.test.ts" file