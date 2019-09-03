class GuitarsController < ApplicationController
  def index
    @guitars = Guitar.all
    render json: @guitars.to_json(exclude: ['created_at, updated_at'], status: 200)
  end
end
