const timeout = 5000

describe(
  '/ (NavBar)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3001')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should go to about page from home page', async () => {
      await Promise.all([page.click('a.about'), page.waitForNavigation()]);
      await expect(page.url()).toMatch('http://localhost:3001/about')
    })
  },
  timeout
)
