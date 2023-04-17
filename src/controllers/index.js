const Services = require('../services');

const getData = async (req, res, _next) => {
    try {
        console.log('---------------------------> index started')
        const product = req.path;
        const productsData = await Services.getData(product);
        console.log('---------------------------> Passed through Services.getData')

        if (!productsData) {
            return res.status(404).json({ message: `Não foram encontrados dados relacionados a ${product.slice(1)}.`});
        }

        return res.status(200).json(productsData);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Erro no servidor."});
    }
}

module.exports = { getData };
