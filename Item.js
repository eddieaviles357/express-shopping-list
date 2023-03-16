const ExpressError = require('./ExpressError');
const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        if( (name && price) && !(isNaN(+price)) ) {
            this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            this.price = +parseFloat(price).toFixed(2);
        } else {
            throw new ExpressError('Please enter valid fields', 400);
        }
    }

    static async getItem(name) {
        return await items.find( ({itemName}) => itemName === name );
    }

    static async getItems() {
        // get all list items
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
}

module.exports = Item;