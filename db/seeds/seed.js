const db = require("../connection");
const format = require("pg-format");

const seed = ({ dishData, ingredientsData, userData, ingredientsDataJunction }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS dish_ingredients;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS ingredients;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS dishes;`);
    })
    .then(() => {
      const dishesTablePromise = db.query(`
        CREATE TABLE dishes (
          dish_id SERIAL PRIMARY KEY,
          dish_name VARCHAR(100) NOT NULL,
          description VARCHAR(400),
          total_price NUMERIC (5,2),
          preparation_time VARCHAR(20) NOT NULL,
          calories_per_serving INTEGER,
          image_url VARCHAR(300)
        );`);

      const ingredientsTablePromise = db.query(`
        CREATE TABLE ingredients (
          ingredient_id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        );`);

      return Promise.all([dishesTablePromise, ingredientsTablePromise]);
    })
    .then(() => {
      const insertDishesQueryStr = format(
        "INSERT INTO dishes (dish_id, dish_name, description, total_price, preparation_time, calories_per_serving, image_url) VALUES %L;",
        dishData.map(
          ({
            dish_id,
            dish_name,
            description,
            total_price,
            preparation_time,
            calories_per_serving,
            image
          }) => [
            dish_id,
            dish_name,
            description,
            total_price,
            preparation_time,
            calories_per_serving,
            image
          ]
        )
      );
      const dishPromise = db.query(insertDishesQueryStr);

      const insertIngredientsQueryStr = format(
        "INSERT INTO ingredients (ingredient_id, name) VALUES %L;",
        ingredientsData.map(({ ingredient_id, name }) => [ingredient_id, name])
      );
      const ingredientsPromise = db.query(insertIngredientsQueryStr);

      return Promise.all([dishPromise, ingredientsPromise]);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE dish_ingredients (
          dish_id INT,
          ingredient_id INT,
          FOREIGN KEY (dish_id) REFERENCES dishes(dish_id),
          FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
        );
      `);
    })
    .then(() => {
      const insertDishIngredientsQueryStr = format(
        `INSERT into dish_ingredients (dish_id, ingredient_id) VALUES %L;`,
        ingredientsDataJunction.map(({ dish_id, ingredient_id }) => [dish_id, ingredient_id])
      );

      return db.query(insertDishIngredientsQueryStr);
    });
};

module.exports = seed;
