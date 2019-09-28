class GuitarsController < ApplicationController
  def index
    @guitars = Guitar.all
    render json: @guitars.to_json(except: [:created_at, :updated_at]), status: 200
  end

  def show
    @guitar = Guitar.find_by(id: params[:id])
    if @guitar && @guitar.user_id == params[:user_id].to_i
      render json: @guitar.to_json(except: [:created_at, :updated_at]), status: 200
    else
      render json: {errors: 'Not Found'}
    end
  end

  def create
    if verify(params[:user_id], params[:token])
      @guitar = Guitar.new(guitar_params)
      @guitar.user = User.find(params[:user_id])
      @guitar.save ? render(json: @guitar) : render(json: @guitar.errors.full_messages)
    else
      render json: {errors: "You are not logged in"}
    end
  end

  def update
    @guitar = Guitar.find(params[:id])
    if @guitar.user_id != session[:user_id]
        render json: {errors: 'You are not logged in'} and return
    elsif @guitar.update(guitar_params)
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
