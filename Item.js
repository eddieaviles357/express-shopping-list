const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        this.name = name || 'ball';
        this.price = price || 5;
    }

    static getItems() {
        return items;
    }
    static setItems(item) {
        if(!item instanceof Item) throw TypeError('Not an Item type');
        items.push(item);
    }
}

module.exports = Item;