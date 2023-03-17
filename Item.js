const ExpressError = require('./ExpressError');
const items = require('./fakeDB');

class Item {
    constructor(name, price) {
        if( (name && price) && !(isNaN(+price)) ) {
            this.name = name.toLowerCase();
            this.price = +parseFloat(price).toFixed(2);
        } else {
            throw new ExpressError('Please enter valid fields', 400);
        };
    };



    // get all list items
    static async getItems() {
        return await items;
    };



    // get one item in list array
    static async getItem(itemName) {
        return await items.find( ({name}) => name === itemName )
    };



    // updates one item
    static async updateItem(itemName, name, price) {
        let item = await Item.getItem(itemName);
        if(!item) throw new ExpressError('No item found to update', 400);
        item.name = name.toLowerCase();
        item.price = +parseFloat(price).toFixed(2);
        return item;
    };



    // appends an item to the list array
    static async setItems(item) {
        // check if parameter is an instance of Item
        if(!item instanceof Item) throw TypeError('Not an Item type');
        // checks if item is already in list
        if( items.some( ({name}) => name === item.name ) ) throw new ExpressError('Already in list', 400);
        // success push to item array
        await items.push(item);
    };



    // delete an item in the list array
    static async deleteItem(itemName) {
        let item = items.find( ({name}) => name === itemName );
        if( !(items.find( ({name}) => name === itemName )) ) return -1;
        let idx = items.indexOf(items.find( ({name}) => name === itemName ));
        if(idx === -1) return -1;
        await items.splice(idx,1);
    }



    // seed list array with some fake data
    // static async seedItems() {
    //         await items.push(new Item('kite', 3))
    //         await items.push(new Item('bike', 5.13))
    //         await items.push(new Item('car', 35.13))
    //         await items.push(new Item('mountain', 95.13))
    //         await items.push(new Item('states', 13535.13))
    //         await items.push(new Item('country', 34834738475.13))
    // };
};



// Item.seedItems();

module.exports = Item;