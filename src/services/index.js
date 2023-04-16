const Models = require('../models');

const getData = async (product) => {
    const productsData = await Models.getData(product);
    return productsData;
}

module.exports = { getData }