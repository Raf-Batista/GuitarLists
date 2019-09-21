require 'jwt'

class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      payload = {email: @user.email}
      token = JWT.encode payload, ENV["HMAC_SECRET"], 'HS256'
      render json: {email: @user.email, token: token}
    else
      render json: {errors: "Invalid credentials"}
    end
  end

  def destroy
    session.clear
  end
end
