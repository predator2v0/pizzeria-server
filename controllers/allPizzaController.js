const pizzaModel = require('../models/pizza');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description this method returns all the pizzas from the database.
 */
const allPizzaController = async (req, res) => {
    try {
        const pizzas = await pizzaModel.find({});
        if (pizzas) {
            res.status(200).json({
                status: 'success',
                message: 'pizzas found successfully',
                data: pizzas,
            });
        } else {
            res.status(404).json({
                status: 'failure',
                message: 'pizzas not found',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failure',
            message: 'internal server error',
        });
    }
};

module.exports = allPizzaController;
