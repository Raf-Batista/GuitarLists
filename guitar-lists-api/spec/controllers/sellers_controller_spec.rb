require 'rails_helper'

RSpec.describe SellersController do

    describe 'Get #index' do
      let!(:sellers) do
        3.times do |index|
          seller = Seller.create(username: "test#{index+1}", password: "test123")
          seller.guitars.build(model: "test-model#{index+1}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
          seller.guitars.build(model: "test-model#{index+10}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        end
      end

      before(:example) { get :index }

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

  describe 'Get #show' do
    let!(:seller) do
      seller = Seller.create(username: "test", password: "test123")
      seller.guitars.build(model: "test-model-1", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
      seller.guitars.build(model: "test-model-2", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
    end

    it 'returns HTTP success' do
       get :show, params: {id: Seller.first.id}
      expect(response).to have_http_status(:success)
    end

    it 'does not return created_at and updated_at' do
      get :show, params: {id: Seller.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response.keys).to match(["id", "username", "guitars"])
    end

    it 'returns an array of guitars' do
      get :show, params: {id: Seller.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].class).to eq(Array)
    end

    it 'returns an correct number of guitars' do
      get :show, params: {id: Seller.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].size).to eq(2)
    end
  end

  describe 'Post #create' do
    it 'successfully creates a seller ' do
      post :create, params: { seller: {username: 'test', password: 'test123'} }
      expect(Seller.all.size).to eq(1)
    end

    it 'renders newly created seller ' do
      post :create, params: { seller: {username: 'test', password: 'test123'} }
      json_response = JSON.parse(response.body)
      expect(json_response["username"]).to eq('test')
    end

    it 'renders user error message when creating seller that exists' do
      Seller.create(username: 'test', password: 'test123')
      post :create, params: { seller: {username: 'test', password: 'test123'} }
      json_response = JSON.parse(response.body)

      expect(json_response["errors"][0]).to eq('Username has already been taken')
    end

    it 'renders password error message when password is too short' do
      post :create, params: { seller: {username: 'test', password: 'test'} }
      json_response = JSON.parse(response.body)
      expect(json_response["errors"][0]).to eq('Password is too short (minimum is 5 characters)')
    end
  end

  describe 'Patch #update' do
    it 'successfully updates username' do
      Seller.create(username: 'before', password: 'test123')
      patch :update, params: { id: 1, seller: {username: 'after'} }
      expect(Seller.first.username).to eq('after')
    end

    it 'successfully updates password' do
      Seller.create(username: 'before', password: 'test123')
      patch :update, params: { id: 1, seller: {password: 'password_has_changed'} }
      expect(Seller.first.authenticate('password_has_changed')).to be_truthy
    end

    it 'renders updated seller' do
      Seller.create(username: 'before', password: 'test123')
      patch :update, params: { id: 1, seller: {username: 'after'} }
      json_response = JSON.parse(response.body)
      expect(json_response["username"]).to eq('after')
    end

  end

  describe 'Delete #destroy' do
    it 'successfully deletes a seller' do
      Seller.create(username: 'test', password: 'test123')
      delete :destroy, params: {id: 1}
      expect(Seller.all.size).to eq(0)
    end

    it 'renders a JSON message after deleting a seller' do
      Seller.create(username: 'test', password: 'test123')
      delete :destroy, params: {id: 1}
      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to eq('Your account has been deleted')
    end
    it "renders a JSON message when trying to delete seller that doesn't exist" do
      Seller.delete_all
      delete :destroy, params: {id: 1}
      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to eq('There was an error')
    end
  end
end
