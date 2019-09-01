Guitars 4 sale

Site where users can sell their guitars through a craigslist list post

###Front End


Seller container
Sellers
Seller

Guitar container ( guitar belongs to seller)
Guitars
Guitar

Guitar form (image upload)


contact page

home page renders search

Nav Bar

Search
  search for sellers in location ( filter )
  search by guitar models

Routes
/
/guitars
/guitar/:id
/seller/:id
/contact


Redux
Sellers state
Guitar state



Jest, Puppeteer and Faker for end to end testing

Jest for Async testing usings mocks


###Back End

# models

Seller
  validates username
  validates password
  has many guitars
  has rating ( implement this later )
  has guitars sold

Guitar
  validates model
  has many belongs to seller  
  use activestorage to attach image, this can be done later


RSpec Model tests                           


# Controllers

Seller
  index
  create
  update
  delete

Guitar
  index
  Create
  Update
  Delete










  Write tests for models
