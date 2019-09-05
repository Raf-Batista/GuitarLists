require 'rails_helper'

RSpec.describe GuitarsController do #, type: :request do
    describe 'Get #index' do
      let!(:sellers) do
        3.times do |index|
          seller = Seller.create(username: "test#{index+1}", password: "test123")
          seller.guitars.build(model: "test-model#{index+1}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
          seller.guitars.build(model: "test-model#{index+10}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        end
      end

      before(:example) { get :index }

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
      before(:example) {get :show, params: {id: 1}}

      it 'return HTTP success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns a guitar' do
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(Guitar.first.id)
      end

      it "returns a guitar's seller" do
        json_response = JSON.parse(response.body)
        expect(json_response["seller_id"]).to eq(Seller.first.id)
      end

      it "does not return created_at or updated_at" do
        json_response = JSON.parse(response.body)
        expect(json_response.keys).to match(["id", "model", "seller_id", "price", "condition", "location", "spec"])
      end
    end

    describe 'Updates guitar' do

      before(:example) do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "before_model", spec: "before_spec", price: 5, condition: "new", location: "somewhere").save
      end

      it 'successfully updates a guitar' do
        post :update, params: { id: 1, guitar: {model: 'after_update'} }
        expect(Guitar.first.model).to eq('after_update')
      end

      it 'successfully updates multiple attributes' do
        post :update, params: { id: 1, guitar: {model: 'after_update', spec: 'after_spec'} }
        expect(Guitar.first.model).to eq('after_update')
        expect(Guitar.first.spec).to eq('after_spec')
      end
    end
end
