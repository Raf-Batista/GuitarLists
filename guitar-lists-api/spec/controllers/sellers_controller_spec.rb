require 'rails_helper'

RSpec.describe SellersController, type: :request do

    describe "Get #index" do
      let!(:sellers) { 3.times{|index| Seller.create(username: "test#{index+1}", password: "test123")} }
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
        expect(json_response[0].keys).to match(["id", "username"])
      end

      it 'should not return password_digest, created_at, and updated_at' do
        json_response = JSON.parse(response.body)
        expect(json_response[0].keys).to_not match(["password_digest", "created_at", "updated_at"])
      end

      it 'should return an array of guitars' do
        json_response = JSON.parse(response.body)
        expect(json_response[0][:guitars].class).to eq('Array')
      end

      it 'should return correct number of guitars' do
        json_response = JSON.parse(response.body)
        expect(json_response[0][:guitars].size).to eq(2)
      end

    end

end
