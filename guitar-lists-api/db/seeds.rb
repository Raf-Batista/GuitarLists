# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(email: 'test1@email.com', username: 'test1', password: 'password')
user1.guitars.build(model: 'test_model1', price: 100, condition: 'new', location: 'no_where', spec: 'test_spec').save

user2 = User.create(email: 'test2@email.com', username: 'test2', password: 'password')
user2.guitars.build(model: 'test_model2', price: 200, condition: 'new', location: 'no where', spec: 'test_spec').save
