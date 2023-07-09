const db = require('../db/connection');

exports.selectAllDishes = () => {
    return db.query('SELECT * FROM dishes;')
        .then((dishes) => {
            return dishes.rows;
        });
};

exports.selectDishByName = (dish_name) => {
    if (Number(dish_name)) {
        return Promise.reject({ status: 400, msg: 'Bad request' });
    };
    return db.query(`SELECT * from dishes WHERE dish_name = $1;`, [dish_name])
        .then((dish) => {
            if (!dish.rows.length) return Promise.reject({ status: 404, msg: 'Not found' });
            return dish.rows;
        });
};