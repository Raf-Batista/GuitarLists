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
        render json: @seller
      else
        render json: {errors: @seller.errors.to_h} # return errors as a hash
      end
    end

    private

    def seller_params
      params.require(:seller).permit(:username, :password)
    end
end
