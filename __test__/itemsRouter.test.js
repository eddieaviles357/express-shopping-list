process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const Item = require('../item');

const items = require('../fakeDB');

beforeEach(() => {
    items.push(new Item('Kite', 3));
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items routes', () => {

  test('GET /items all items', async() => {
    let res = await request(app)
                    .get('/items');
    let body = res.body;
    expect(res.statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("items", [{ "name": "kite", "price": 3 }]);
  });

  test('GET /items single item', async() => {
    let res = await request(app)
                    .get('/items/kite');
    let body = res.body;
    expect(res.statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("item", { "name": "kite", "price": 3 });
  });

  test('GET /items not in db', async() => {
    let res = await request(app)
                    .get('/items/error');
    let body = res.body;
    expect(res.statusCode).toBe(200);
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
        console.log(body);
    });
});
