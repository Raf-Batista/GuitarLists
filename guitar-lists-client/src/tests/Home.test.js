const puppeteer = require('puppeteer');

describe('renders home page correctly', () => {
  test('site title loads correcly', async () => {
	let browser = await puppeteer.launch({
	  headless: false
	});
	let page = await browser.newPage();

	page.emulate({
	  viewport: {
		width: 500,
		height: 2400
	  },
	  userAgent: ''
	});

	await page.goto('http://localhost:3001/');
	await page.waitForSelector('.title');

	const html = await page.$eval('.title', e => e.innerHTML);
	expect(html).toBe('Welcome to GuitarLists');

	browser.close();
  }, 16000);
});
