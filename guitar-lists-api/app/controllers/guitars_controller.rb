class GuitarsController < ApplicationController
  def index
    @guitars = Guitar.all
    render json: @guitars.to_json(except: [:created_at, :updated_at])
  end

  def show
    @guitar = Guitar.find(params[:id])
    render json: @guitar.to_json(except: [:created_at, :updated_at])
  end

  def create
    if params[:seller_id].to_i != session[:seller_id]
      render json: {errors: 'You are not logged in'} and return
    else
      @guitar = Guitar.new(guitar_params)
      @guitar.seller = Seller.find(params[:seller_id])
    end
    if @guitar.save
      render json: @guitar
    else
      render json: @guitar.errors.full_messages
    end
  end

  def update
    @guitar = Guitar.find(params[:id])
    if @guitar.update(guitar_params)
      render json: @guitar
    else
      render json: {errors: @guitar.errors.full_messages}
    end
  end

  def destroy
    if Guitar.delete(params[:id]) != 0 # Deleting a record that doesn't exist will return a 0
      render json: {message: 'Guitar was deleted'}
    else
      render json: {errors: 'There was an error'}
    end
  end

  private

  def guitar_params
    params.require(:guitar).permit(:model, :spec, :price, :condition, :location)
  end
end
