class SellersController < ApplicationController

  def index
    @sellers = Seller.all

    render json: @sellers.to_json(except: [:created_at, :updated_at, :password_digest]), status: 200
  end
end
