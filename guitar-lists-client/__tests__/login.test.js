const timeout = 5000

describe(
  '/ (Users can sign up and login)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3001/login')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })


    it('should login a User', async () => {
      await page.waitFor('.loginForm')
      await page.type('input[name=email]', 'test@email.com')
      await page.type('input[name=password]', 'test123')
      await page.click('input[type=submit]')
      await page.setRequestInterception(true);
      page.on('request', request => {
          if (request.url === 'http://localhost:3001/users') {
              request.respond({
                  content: 'application/json',
                  headers: {"Access-Control-Allow-Origin": "*"},
                  body: JSON.stringify({email:'test@email.com', username: 'test'})
              });
          }
          else {
              request.continue();
          }

      });
      await page.waitForSelector("#home");
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Welcome test')

    })
  },
  timeout
)
