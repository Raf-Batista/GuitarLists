class SessionsController < ApplicationController
  def create
    @seller = Seller.find_by(username: params[:username])
    if @seller && @seller.authenticate(params[:password])
      session[:user_id] = @seller.id
      render json: {loggedIn: true, userId: @seller.id}
    else
      render json: {loggedIn: false, errors: "an error occured"}
    end
  end

  def destroy
  
  end
end
