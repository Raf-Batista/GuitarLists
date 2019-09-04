class GuitarsController < ApplicationController
  def index
    @guitars = Guitar.all
    render json: @guitars.to_json(except: [:created_at, :updated_at])
  end

  def show
    @guitar = Guitar.find(params[:id])
    render json: @guitar.to_json(except: [:created_at, :updated_at])
  end

end
