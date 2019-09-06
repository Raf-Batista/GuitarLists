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

      before(:example) { get :index, params: {seller_id: 1} }

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
      end

      before(:example) { get :show, params: {seller_id: 1, id: 1} }

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

    describe 'Post #create' do
      before(:example) do
        Seller.create(username: "test", password: "test123")
        session[:seller_id] = Seller.last.id
      end

      after(:example) do
        Guitar.delete_all
        session.clear
      end

      it 'successfully creates a guitar' do
        post :create, params: {seller_id: 1, guitar: {model: 'new_guitar', spec: 'new_spec', price: 5, condition: 'new', location: 'somewhere'}}
        expect(Seller.first.guitars.first).to eq(Guitar.first)
      end
      it 'Renders JSON data after creating a guitar' do
        post :create, params: {seller_id: 1, guitar: {model: 'new_guitar', spec: 'new_spec', price: 5, condition: 'new', location: 'somewhere'}}

        json_response = JSON.parse(response.body)
        expect(json_response["model"]).to eq("new_guitar")
        expect(json_response["spec"]).to eq("new_spec")
      end

      it 'Renders error message when creating guitar unsuccessful' do
        post :create, params: {seller_id: 1, guitar: {model: '', spec: '', price: 5, condition: 'new', location: 'somewhere'}}
        json_response = JSON.parse(response.body)
        expect(json_response[0]).to eq("Model can't be blank")
        expect(json_response[1]).to eq("Spec can't be blank")
      end

      it 'will not create a guitar if not logged in' do
        post :create, params: {seller_id: 100, guitar: {model: '', spec: '', price: 5, condition: 'new', location: 'somewhere'}}
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to eq("You are not logged in")
      end
    end

    describe 'Patch #update' do

      before(:example) do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "before_model", spec: "before_spec", price: 5, condition: "new", location: "somewhere").save
        session[:seller_id] = Seller.last.id
      end

      after(:example) do
        Guitar.delete_all
        session.clear
      end

      it 'successfully updates a guitar' do
        patch :update, params: { seller_id: 1, id: 1, guitar: {model: 'after_update'} }
        expect(Guitar.first.model).to eq('after_update')
      end

      it 'successfully updates multiple attributes' do
        patch :update, params: { seller_id: 1, id: 1, guitar: {model: 'after_update', spec: 'after_spec'} }
        expect(Guitar.first.model).to eq('after_update')
        expect(Guitar.first.spec).to eq('after_spec')
      end

      it 'renders JSON data after updating' do
        patch :update, params: { seller_id: 1, id: 1, guitar: {model: 'after_update'} }
        json_response = JSON.parse(response.body)
        expect(json_response["model"]).to eq('after_update')
      end

      it "renders 'model can't be blank' error message" do
        patch :update, params: { seller_id: 1, id: 1, guitar: {model: ''} }
        json_response = JSON.parse(response.body)
        expect(json_response["errors"][0]).to eq("Model can't be blank")
      end

      it 'will not update if not logged in as the seller of the guitar' do
        session[:seller_id] = 100
        patch :update, params: { seller_id: 1, id: 1, guitar: {model: ''} }
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to eq("You are not logged in")
      end
    end

    describe 'Delete #destroy' do

      it 'can successfully delete a guitar' do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "before_model", spec: "before_spec", price: 5, condition: "new", location: "somewhere").save
        delete :destroy, params: { seller_id: 1, id: 1 }
        expect(Guitar.all.size).to eq(0)
      end

      it 'renders message when deleting a guitar' do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "before_model", spec: "before_spec", price: 5, condition: "new", location: "somewhere").save
        delete :destroy, params: { seller_id: 1, id: 1 }
        json_response = JSON.parse(response.body)
        expect(json_response["message"]).to eq("Guitar was deleted")
      end

      it "renders an error when deleting a guitar that doesn't exist" do
        seller = Seller.create(username: "test", password: "test123")
        seller.guitars.build(model: "before_model", spec: "before_spec", price: 5, condition: "new", location: "somewhere").save
        delete :destroy, params: { seller_id: 1, id: 100 }
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to eq("There was an error")
      end
    end
end
