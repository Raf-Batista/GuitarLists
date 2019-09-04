require 'rails_helper'

RSpec.describe SellersController, type: :request do

    describe "Renders Seller" do
      let!(:sellers) do
        3.times do |index|
          seller = Seller.create(username: "test#{index+1}", password: "test123")
          seller.guitars.build(model: "test-model#{index+1}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
          seller.guitars.build(model: "test-model#{index+10}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        end
      end

      before(:example) { get '/sellers' }

      it 'returns HTTP Success' do
        expect(response).to have_http_status(:success)
      end

      it 'should return the correct number of sellers' do
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(3)
      end

      it 'should return with the correct keys' do
        json_response = JSON.parse(response.body)
        expect(json_response[0].keys).to match(["id", "username", "guitars"])
      end

      it 'should return an array of guitars' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]["guitars"].class).to eq(Array)
      end

      it 'should return correct number of guitars' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]["guitars"].size).to eq(2)
      end
  end

  describe 'Renders single Seller' do
  let!(:seller) do
    seller = Seller.create(username: "test", password: "test123")
    seller.guitars.build(model: "test-model-1", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
    seller.guitars.build(model: "test-model-2", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
  end

    it 'returns HTTP success' do
      # spec didn't work using symbols with params
      # get :show, params: {id: Seller.first.id}
      get "http://localhost:3000/sellers/#{Seller.first.id}"
      expect(response).to have_http_status(:success)
    end

    it 'does not return created_at and updated_at' do
      get "http://localhost:3000/sellers/#{Seller.first.id}"
      json_response = JSON.parse(response.body)
      expect(json_response.keys).to match(["id", "username", "guitars"])
    end

    it 'returns an array of guitars' do
      get "http://localhost:3000/sellers/#{Seller.first.id}"
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].class).to eq(Array)
    end

    it 'returns an correct number of guitars' do
      get "http://localhost:3000/sellers/#{Seller.first.id}"
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].size).to eq(2)
    end
  end

end
