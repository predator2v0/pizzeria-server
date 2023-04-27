const pizzaModel = require('../models/pizza');
const allPizzaController = async (req, res) => {
    try {
        const pizzas = await pizzaModel.find({});

        if (pizzas) {
            res.send(pizzas);
        } else {
            console.log('error fetching pizzas');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = allPizzaController;
