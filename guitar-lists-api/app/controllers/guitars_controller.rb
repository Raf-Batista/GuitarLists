class GuitarsController < ApplicationController
  def index
    @guitars = Guitar.all
    render json: @guitars.to_json(except: [:created_at, :updated_at])
  end

  def show
    @guitar = Guitar.find(params[:id])
    render json: @guitar.to_json(except: [:created_at, :updated_at])
  end

  def update
    @guitar = Guitar.find(params[:id])
    @guitar.update(guitar_params)
  end

  private

  def guitar_params
    params.require(:guitar).permit(:model, :spec, :price, :condition, :location)
  end
end
