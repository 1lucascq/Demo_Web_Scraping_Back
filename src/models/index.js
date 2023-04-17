const puppeteer = require("puppeteer");
require('dotenv').config();

const getData = async (product) => {
    console.log('---------------------------> in model')
    try {
        console.log('---------------------------> in try')
        const browser = await puppeteer.launch({
            args: [
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--single-process',
                '--no-zygote'
            ],
            executablePath: process.env.NODE_ENV === 'production'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
        });
        console.log('---------------------------> after puppeteer launch')
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(150000)
        console.log('---------------------------> setting timeout')
        console.log(page.getDefaultTimeout)
        console.log('---------------------------> timeout defined')

        await page.goto(`https://www.buscape.com.br${product}`);
        console.log('---------------------------> after page.goto')

        await page.setDefaultNavigationTimeout(180000)
        console.log('---------------------------> setting timeout')
        console.log(page.getDefaultTimeout)
        console.log('---------------------------> timeout defined')

        const productData = await page.$$eval('[data-testid="product-card"]', (productCard) => {
            console.log('---------------------------> getData started')
            console.log(productCard)
            return productCard.map((card) => {
                const name = card.querySelector('[data-testid="product-card::name"]').textContent;
                const price = card.querySelector('[data-testid="product-card::price"]').textContent;
                const image = card.querySelector('[data-testid="product-card::image"] img').src;

                return {name, price, image}
            })
        });

        console.log('---------------------------> before end')
        await browser.close();

        return productData;
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to retrieve data in the ${product} endpoint}`)
    }
};

module.exports = { getData };