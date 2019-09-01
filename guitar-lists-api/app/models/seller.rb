class Seller < ApplicationRecord

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 5, too_short: "Password should be %{count} or more characters" }
  has_secure_password
end
