const puppeteer = require("puppeteer");

const getData = async (product) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.buscape.com.br${product}`);

        const productData = await page.$$eval('[data-testid="product-card"]', (productCard) => {
            return productCard.map((card) => {
                const name = card.querySelector('[data-testid="product-card::name"]').textContent;
                const price = card.querySelector('[data-testid="product-card::price"]').textContent;
                const image = card.querySelector('[data-testid="product-card::image"] img').src;

                return {name, price, image}
            })
        });

        await browser.close();

        return productData;
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to retrieve data in the ${product} endpoint}`)
    }
};

module.exports = { getData };