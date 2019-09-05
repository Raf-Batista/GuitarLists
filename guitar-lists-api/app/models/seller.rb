class Seller < ApplicationRecord

  validates :username, presence: true, uniqueness: { message: 'Username has already been taken. Please login or choose a different username' }
  # when using #sellers_params in SellersController #update, update will return false. Passing 'if' with a proc, validate password length if
    # the seller is a new record or the password is not blank. If it is blank it will still return true when updating but password will not be changed
  validates :password, length: { minimum: 5, too_short: "Password should be %{count} or more characters" }, if: Proc.new{ |obj| obj.new_record? || !obj.password.blank? }
  has_many :guitars
  has_secure_password
end
