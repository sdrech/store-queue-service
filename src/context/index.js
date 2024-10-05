var store
const maxItemsForm = document.getElementById('maxItemsForm');
const getValueForm = document.getElementById('getValueForm');
const putValueForm = document.getElementById('putValueForm');
const keyToGetField = document.getElementById('keyToGet');
const valueReceivedField = document.getElementById('valueReceived');
const keyToPutField = document.getElementById('keyToPut');
const valueToPutField = document.getElementById('valueToPut');


window.onload = function() {
    setStorageSize();
};

function setStorageSize() {
    const maxItems = document.getElementById('maxItems').value;
    store = new Store(Number(maxItems));

    clearInputFields();
    showStorageContent();
}

function showStorageContent() {
    const storeStage = document.getElementById('store');
    const storage = store.getStorage();

    let storeContent = '';
    for (const record of storage.entries()) {
        storeContent += `{ ${record} }<br>`;
    }
    storeStage.innerHTML = storeContent || '[ empty ]';
}

function clearInputFields(ignoreGetFields = false) {
    keyToPutField.value = '';
    valueToPutField.value = '';

    if (!ignoreGetFields) {
        keyToGetField.value = '';
        valueReceivedField.value = '';
    }
}

maxItemsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setStorageSize();
});

getValueForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const keyName = keyToGetField.value;
    const keyValue = store.get(keyName);
    valueReceivedField.value = String(keyValue);

    clearInputFields(true);
    showStorageContent();
});

putValueForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const keyName = keyToPutField.value;
    const keyValue = valueToPutField.value;
    store.put(keyName, keyValue);

    clearInputFields();
    showStorageContent();
});