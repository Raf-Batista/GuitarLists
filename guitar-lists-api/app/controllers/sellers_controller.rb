class SellersController < ApplicationController

  def index
    @sellers = Seller.all

    render json: @sellers.to_json(
      include: {
        #JSON will return guitars that belong to sellers
        guitars: {
          #JSON will not return these attributes that belong to guitars
          except: [:created_at, :updated_at]
          }
        },
        #JSON will not return these attributes that belong to sellers
        except: [:created_at, :updated_at, :password_digest]
        ),
      status: 200
  end

  def show
    @seller = Seller.find(params[:id])
    render json: @seller.to_json(
      include: {
        guitars: {
          except: [:created_at, :updated_at]
          }
        },
        except: [:created_at, :updated_at, :password_digest])
  end

    def create
      @seller = Seller.new(seller_params)
      if @seller.save
        session[:seller_id] = @seller.id
        render json: @seller
      else
        render json: {errors: @seller.errors.full_messages}
      end
    end

    def update
      @seller = Seller.find(params[:id])
      if @seller.id == session[:seller_id]
        @seller.update(seller_params)
        render json: @seller
      else
        render json: {errors: "You are not logged in"}
      end
    end

    def destroy
      if Seller.delete(params[:id]) != 0 # Deleting a record that doesn't exist will return a 0
        render json: {message: 'Your account has been deleted'}
      else
        render json: {message: 'There was an error'}
      end
    end

    private

    def seller_params
      params.require(:seller).permit(:username, :password)
    end
end
