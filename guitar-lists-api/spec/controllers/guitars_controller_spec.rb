require 'rails_helper'

RSpec.describe GuitarsController, type: :request do
    describe 'Get #index' do
      let!(:sellers) do
        3.times do |index|
          seller = Seller.create(username: "test#{index+1}", password: "test123")
          seller.guitars.build(model: "test-model#{index+1}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
          seller.guitars.build(model: "test-model#{index+10}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        end
      end

      before(:example) { get '/guitars' }

      it 'returns HTTP success' do
        expect(response).to have_http_status(:success)
      end

      it 'should returns correct number of guitars' do
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(6)
      end

      it 'should only returns correct attributes' do
        json_response = JSON.parse(response.body)
        expect(json_response[0].keys).to match(["id", "model", "seller_id", "price", "condition", "location", "spec"])
      end

      it 'should return sellerId' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]["seller_id"]).to be_truthy
      end
    end

    describe 'Get #show' do
      let!(:guitar) do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "test-model-1", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        seller.guitars.build(model: "test-model-2", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
      end

      it 'return HTTP success' do
        get 'http://localhost:3000/guitars/1'
        expect(response).to have_http_status(:success)
      end

      it 'returns a guitar' do
        get 'http://localhost:3000/guitars/1'
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(Guitar.first.id)
      end

      it "returns a guitar's seller" do
        get 'http://localhost:3000/guitars/1'
        json_response = JSON.parse(response.body)
        expect(json_response["seller_id"]).to eq(Seller.first.id)
      end

      it "does not return created_at or updated_at" do
        get 'http://localhost:3000/guitars/1'
        json_response = JSON.parse(response.body)
    #    binding.pry
        expect(json_response.keys).to match(["id", "model", "seller_id", "price", "condition", "location", "spec"])
      end

    end
end
