const ExpressError = require('./ExpressError');
const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        if( (name && price) && !(isNaN(+price)) ) {
            this.name = name.toLowerCase();
            this.price = +parseFloat(price).toFixed(2);
        } else {
            throw new ExpressError('Please enter valid fields', 400);
        }
    }

    // get one item in list array
    static async getItem(itemName) {
        let query = itemName.toLowerCase();
        return await items.find( ({name}) => name === query )
    }

    // get all list items
    static async getItems() {
        return await items;
    }
    
    static async setItems(item) {
        // check if parameter is an instance of Item
        if(!item instanceof Item) throw TypeError('Not an Item type');
        // checks if item is already in list
        if( items.some( ({name}) => name === item.name ) ) throw new ExpressError('Already in list', 400);
        // success push to item array
        await items.push(item);
    }

    static seedItems() {
            items.push(new Item('kite', 3))
            items.push(new Item('bike', 5.13))
            items.push(new Item('car', 35.13))
            items.push(new Item('mountain', 95.13))
            items.push(new Item('states', 13535.13))
            items.push(new Item('country', 34834738475.13))
    }
}

Item.seedItems()

module.exports = Item;