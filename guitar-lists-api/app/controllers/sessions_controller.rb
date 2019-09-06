class SessionsController < ApplicationController
  def create
    session[:test] = 'it worked'
  end

  def destroy
  end
end
