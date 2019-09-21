require 'jwt'

class ApplicationController < ActionController::API

  def login(user)
    payload = {email: user.email, username: user.username}
    token = JWT.encode payload, ENV["HMAC_SECRET"], 'HS256'

    token
  end
end
