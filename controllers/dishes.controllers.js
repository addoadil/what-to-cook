const { selectAllDishes, selectDishByName } = require("../models/dishes.models")

exports.getAllDishes = (req, res, next) => {
    selectAllDishes()
        .then((dishes) => {
            res.status(200).send(dishes)
        })
        .catch((err) => {
            return next(err);
        });
};

exports.getDishByName = (req, res, next) => {
    const { name } = req.query;
    selectDishByName(name)
        .then((dish) => {
            const returnDish = dish[0]
            res.status(200).send(returnDish)
        })
        .catch((err) => {
            next(err);
        });
};