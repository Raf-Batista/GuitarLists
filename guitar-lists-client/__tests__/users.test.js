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
      await page.click('button[type=submit]')
      await page.waitFor('#home')
    })

    it('should logout', async () => {
      await page.waitFor('#root > div > nav > div > a.logout.nav-link')
      await page.click('#root > div > nav > div > a.logout.nav-link')
      await page.waitFor('#home')
    })


  },
  timeout
)
