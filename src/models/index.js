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
        console.log('---------------------------> after puppeteer launch')
        console.log(process.env.PUPPETEER_EXECUTABLE_PATH)

        const page = await browser.newPage();

        page.setDefaultNavigationTimeout(150000)
        page.setDefaultTimeout(150000)

        console.log(page.getDefaultTimeout())


        try {
            await page.goto(`https://www.buscape.com.br${product}`, {
                waitUntil: 'domcontentloaded',
                timeout: 180000
            });
            console.log('---------------------------> after page.goto')
        } catch (error) {
            console.log('error')
            console.log(error)
        }

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

        console.log('---------------------------> before browser.close')
        await browser.close();
        console.log('---------------------------> after browser.close')

        return productData;
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to retrieve data in the ${product} endpoint}`)
    }
};

module.exports = { getData };