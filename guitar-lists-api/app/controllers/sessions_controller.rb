class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: {loggedIn: true, userId: @user.id}
    else
      render json: {loggedIn: false, errors: "an error occured"}
    end
  end

  def destroy
    session.clear
  end
end
