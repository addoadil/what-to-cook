const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const testData = require('../db/test-data/index');

beforeEach(() => {
    return seed(testData)
});

describe('GET /api/dishes', () => {
    test("Should return a status of 200 and return all dishes as an array of objects", () => {
        return request(app)
            .get('/api/dishes')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                expect(body).toHaveLength(10);
                body.forEach((dish) => {
                    expect(dish).toHaveProperty('dish_id');
                    expect(dish).toHaveProperty('dish_name');
                    expect(dish).toHaveProperty('description');
                    expect(dish).toHaveProperty('total_price');
                    expect(dish).toHaveProperty('preparation_time');
                    expect(dish).toHaveProperty('calories_per_serving');
                    expect(dish).toHaveProperty('image_url');
                });
            });
    });
});

describe('GET /api/search?name={dishName}', () => {
    test('Should return a status of 200 with dish object when searched for specific dish', () => {
        return request(app)
            .get('/api/search?name=biryani')
            .expect(200)
            .then(({ body }) => {
                expect(body).toHaveProperty('dish_id');
                expect(body).toHaveProperty('dish_name');
                expect(body).toHaveProperty('description');
                expect(body).toHaveProperty('total_price');
                expect(body).toHaveProperty('preparation_time');
                expect(body).toHaveProperty('calories_per_serving');
                expect(body).toHaveProperty('image_url');
            });
    });
});

afterAll(() => {
    db.end()
});