// jest --detectOpenHandles
process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const Item = require('../item');

const items = require('../fakeDB');

beforeEach(() => {
    items.push(new Item('kite', 3));
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items routes', () => {

  test('GET /items all items', async() => {
    let res = await request(app)
                    .get('/items');
    let body = res.body;
    expect(res.statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("items", [{ "name": "kite", "price": 3 }]);
  });

  test('GET /items single item', async() => {
    let res = await request(app)
                    .get('/items/kite');
    let body = res.body;
    expect(res.statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("item", { "name": "kite", "price": 3 });
  });

  test('GET /items not in db', async() => {
    let res = await request(app)
                    .get('/items/error');
    let body = res.body;
    expect(res.statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Not found");
  });

});


describe('POST /items', () => {

    test('POST /items add item to db', async() => {
        let res = await request(app)
                        .post('/items')
                        .send({"name": "bike", "price": 10});
        let body = res.body;
        expect(res.statusCode).toEqual(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("added", { "name": "bike", "price": 10 });
    });

    test('POST /items already in database', async() => {
        let res = await request(app)
                        .post('/items')
                        .send({"name": "kite", "price": 3});
        let body = res.body;
        expect(res.statusCode).toEqual(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("error", "Already in list" );
    });
});

describe('PATCH /items/:name', () => {

    test('PATCH /items/:name update item in the db ', async() => {
        let res = await request(app)
                    .patch('/items/kite')
                    .send({"name": "bike", "price": 6});
        let body = res.body;
        expect(res.statusCode).toEqual(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("updated", { "name": "bike", "price": 6 });
    });

    test('PATCH /items/:name no item in db', async() => {
        let res = await request(app)
                        .patch('/items/car')
                        .send({"name": "cat", "price": 2});
        let body = res.body;
        expect(res.statusCode).toEqual(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("error", 'No item found to update');
    });
});

describe('DELETE /items/:name', () => {

    test('DELETE /items/:name delete item in the db ', async() => {
        let res = await request(app)
                    .delete('/items/kite');
        let body = res.body;
        expect(res.statusCode).toEqual(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", 'deleted');
    });

    test('DELETE /items/:name delete item not found in db ', async() => {
        let res = await request(app)
                    .delete('/items/cat');
        let body = res.body;
        expect(res.statusCode).toEqual(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("error", 'Item not found');
    });
});
