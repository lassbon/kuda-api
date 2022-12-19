const {stock} = require (`../models/stock`)
const { v4: uuidv4 } = require('uuid')



const findStock = (stock_name,stock_category) => {

    return stock.create({
      
        stock_id: uuidv4(),
        stock_name: stock_name,
        stock_category:stock_category
    })
}








module.exports = {findStock}