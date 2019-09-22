const faker = require('faker');
const timeout = 5000

const appUrlBase = 'http://localhost:3001'
const routes = {
  public: {
    home: `${appUrlBase}/`,
    login: `${appUrlBase}/login`,
    noMatch: `${appUrlBase}/asdf`,
  },
  private: {

  },
}

const user = {
  email: faker.internet.email(),
  username: faker.lorem.word(),
  password: 'password'
}

describe(
  '/ (Users can sign up and login)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto(routes.public.home)
      await page.waitFor('.signup')
      await page.type('input[name=email]', user.email)
      await page.type('input[name=username]', user.username)
      await page.type('input[name=password]', user.password)
      await page.waitFor('#home')
    }, timeout)

    afterAll(async () => {
      await page.waitFor('button[name=logout]')
      await page.click('button[name=logout]')
      await page.close()
    })

    it('should logout', async () => {

    })


  },
  timeout
)
