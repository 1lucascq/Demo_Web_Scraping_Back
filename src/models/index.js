const puppeteer = require("puppeteer");
require('dotenv').config();

const getData = async (product) => {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--no-single-process',
                '--no-zygote'
            ],
            executablePath: process.env.NODE_ENV === 'production'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
        });

        const page = await browser.newPage();

        page.setDefaultNavigationTimeout(0)
        page.setDefaultTimeout(0)

        await page.goto(`https://www.buscape.com.br${product}`, {
            waitUntil: "networkidle2",
            timeout: 0
        });

        // NOTE: The code to load ALL data in the page is commented to reduce loading time in server (the app was deployed in a very lazy free plan server in Render.com).
        // const productData = await page.$$eval('[data-testid="product-card"]', (productCard) => {
        //     return productCard.map((card) => {
        //         const name = card.querySelector('[data-testid="product-card::name"]').textContent;
        //         const price = card.querySelector('[data-testid="product-card::price"]').textContent;
        //         const image = card.querySelector('[data-testid="product-card::image"] img').src;

        //         return {name, price, image}
        //     })
        // });

        const productData = await page.$eval('[data-testid="product-card"]', (productCard) => {
            const name = productCard.querySelector('[data-testid="product-card::name"]').textContent;
            const price = productCard.querySelector('[data-testid="product-card::price"]').textContent;
            const image = productCard.querySelector('[data-testid="product-card::image"] img').src;

            return {name, price, image}
        });

        await browser.close();

        return productData;
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to retrieve data in the ${product} endpoint}`)
    }
};

module.exports = { getData };