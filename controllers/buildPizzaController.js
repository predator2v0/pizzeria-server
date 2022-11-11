const ingredientModel = require("../models/ingredient");

const buildPizzaController = async (req, res) => {
    try {
        const ingredients = await ingredientModel.find({});
        if (ingredients) {
            res.send(ingredients);
        } else {
            console.log("error in fetching ingredients");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = buildPizzaController;