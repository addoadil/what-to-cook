const db = require('../db/connection');

exports.selectAllDishes = () => {
    return db.query('SELECT * FROM dishes;')
        .then((dishes) => {
            return dishes.rows;
        });
};

exports.selectDishByName = (dish_name) => {
    return db.query(`SELECT * from dishes WHERE dish_name = $1;`, [dish_name])
        .then((dish) => {
            return dish.rows;
        });
};