const timeout = 5000

describe(
  '/ (Users can sign up and login)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3001')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should sign up a User', async () => {
      await page.waitFor('.signup')
      await page.type('input[name=username]', 'test')
      await page.type('input[name=password]', 'test123')
      await page.click('input[type=submit]')
      await page.setRequestInterception(true);
      page.on('request', request => {
          if (request.url === 'http://localhost:3001/users') {
              request.respond({
                  content: 'application/json',
                  headers: {"Access-Control-Allow-Origin": "*"},
                  body: JSON.stringify({user: {username: 'test', password: 'password'}})
              });
          }
          else {
              request.continue();
          }
      });

      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Welcome test')

    })

    it('should redirect to the sellers page after signing up', async () => {
      await page.waitFor('.signup')
      await page.type('input[name=username]', 'test')
      await page.type('input[name=password]', 'test123')
      await page.click('submit')

      expect(page.url).toMatch('http://localhost:3001/sellers/1')

    })

    it('should login a Users', async () => {
      await page.waitFor('.login')
      await page.click('.login')
      await page.type('input[name=username]', 'test')
      await page.type('input[name=password]', 'test123')
      await page.click('input[type=submit]')

      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Welcome test')

    })
  },
  timeout
)
