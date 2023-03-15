const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        this.name = name || 'ball';
        this.price = price || 5;
    }

    static async getItems() {
        return await items;
    }
    static async setItems(item) {
        if(!item instanceof Item) throw TypeError('Not an Item type');
        await items.push(item);
    }
}

module.exports = Item;