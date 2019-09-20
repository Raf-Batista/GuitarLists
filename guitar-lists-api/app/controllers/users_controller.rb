class UsersController < ApplicationController

  def index
    @users = User.all

    render json: @users.to_json(
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
    @user = User.find(params[:id])
    render json: @user.to_json(
      include: {
        guitars: {
          except: [:created_at, :updated_at]
          }
        },
        except: [:created_at, :updated_at, :password_digest])
  end

    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        render json: {email: @user.email}
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    def update
      @user = User.find(params[:id])
      if @user.id == session[:user_id]
        @user.update(user_params)
        render json: @user
      else
        render json: {errors: "You are not logged in"}
      end
    end

    def destroy
      if User.delete(params[:id]) != 0 # Deleting a record that doesn't exist will return a 0
        render json: {message: 'Your account has been deleted'}
      else
        render json: {message: 'There was an error'}
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password)
    end
end
