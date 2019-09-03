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
        expect(json_response[0].keys).to_not match(["created_at", "updated_at"])
      end
    end
end
