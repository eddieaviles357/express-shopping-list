const ExpressError = require('./ExpressError');
const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        if( (name && price) && !(isNaN(+price)) ) {
            this.name = name;
            this.price = +parseFloat(price).toFixed(2);
        } else {
            throw new ExpressError('Please enter valid fields', 400);
        }
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