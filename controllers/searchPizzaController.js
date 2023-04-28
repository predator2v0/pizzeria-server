const pizzaModel = require('../models/pizza');

/**
 *
 * @param {*} req request object
 * @param {*} res response object
 * @description this method returns an array of pizzas based on the search term.
 */
const searchPizzaController = async (req, res) => {
    try {
        let searchTerm = req.query.q.trim();
        if (searchTerm) {
            searchTerm = new RegExp(searchTerm, 'ig');
            const pizzas = await pizzaModel.find({ name: searchTerm });
            if (pizzas.length > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'pizzas found successfully',
                    data: pizzas,
                });
            } else {
                res.status(404).json({
                    status: 'failure',
                    message: 'no pizzas found',
                });
            }
        } else {
            res.status(400).json({
                status: 'failure',
                message: 'please enter something in the search field',
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

module.exports = searchPizzaController;
