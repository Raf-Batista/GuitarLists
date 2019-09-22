const timeout = 5000

describe(
  '/ (Users can sign up and login)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3001/')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should sign up a User', async () => {
      await page.waitFor('.signup')
      await page.type('input[name=email]', 'test@email.com')
      await page.type('input[name=username]', 'test')
      await page.type('input[name=password]', 'password')
      await page.click('input[type=submit]')


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
  },
  timeout
)
