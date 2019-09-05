class Seller < ApplicationRecord

  validates :username, presence: true
  validates :username, uniqueness: { message: 'Username has already been taken. Please login or choose a different username' }
  validates :password, length: { minimum: 5, too_short: "Password should be %{count} or more characters" }, on: :create
  has_many :guitars
  has_secure_password
end
