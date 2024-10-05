"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_class_1 = __importDefault(require("./store/store.class"));
const store = new store_class_1.default(2);
store.put('a', '1');
store.get('a');
store.get('b');
store.put('b', '2');
store.put('c', '3');
store.get('a');
store.get('a');
store.put('b', '222');
store.get('a');
store.get('a');
store.get('c');
