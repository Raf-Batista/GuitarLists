class SessionsController < ApplicationController
  def create
    @seller = Seller.find_by(username: params[:username])
    if @seller && @seller.authenticate(params[:password])
      session[:seller_id] = @seller.id
      render json: {loggedIn: true, sellerId: @seller.id}
    else
      render json: {loggedIn: false, errors: "an error occured"}
    end
  end

  def destroy
    session.clear
  end
end
