const pizzaModel = require("../models/pizza");
const allPizzaController = async (req, res) => {
    try {
        let pizzas;
        const query = new RegExp(req.query.q, 'ig')
        if(query){
            pizzas = await pizzaModel.find({"name": query});
        } else{
            pizzas = await pizzaModel.find({});
        }
        
        if (pizzas) {
            res.send(pizzas);
        } else {
            console.log("error fetching pizzas");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = allPizzaController;