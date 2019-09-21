class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      token = login(@user)
      render json: {email: @user.email, token: token}
    else
      render json: {errors: "Invalid credentials"}
    end
  end

  def destroy
    session.clear
  end
end
