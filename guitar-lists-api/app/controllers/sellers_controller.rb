class SellersController < ApplicationController

  def index
    @sellers = Seller.all

    render json: @sellers.to_json(
      include: {
        #JSON will return guitars that belong to sellers
        guitars: {
          #JSON will not return these attributes for guitars
          except: [:created_at, :updated_at]
          }
        },
        #JSON will not return these attributes for sellers
        except: [:created_at, :updated_at, :password_digest]
        ),
      status: 200
  end
end
