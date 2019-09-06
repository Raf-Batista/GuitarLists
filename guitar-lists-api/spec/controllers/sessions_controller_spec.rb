require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe "GET #create" do
    it "successfully logs in" do
      Seller.create(username: 'test', password: 'test123')
      get :create, params: {username: 'test', password: 'test123'}
      expect(session[:user_id]).to eq(1)
    end

    it "returns JSON with loggedIn true and user_id" do
      Seller.create(username: 'test', password: 'test123')
      get :create, params: {username: 'test', password: 'test123'}
      json_response = JSON.parse(response.body)
      expect(json_response["loggedIn"]).to eq(true)
      expect(json_response["userId"]).to eq(1)
    end

    it "returns JSON with loggedIn false if user did not log in" do
      Seller.create(username: 'test', password: 'test123')
      get :create, params: {username: 'test', password: 'test'}
      json_response = JSON.parse(response.body)
      expect(json_response["loggedIn"]).to eq(false)
      expect(json_response["errors"]).to eq("an error occured")
    end
  end

  describe "GET #destroy" do
    it "returns http success" do
      get :destroy
      expect(response).to have_http_status(:success)
    end
  end

end
