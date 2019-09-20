require 'rails_helper'

RSpec.describe UsersController do

    describe 'Get #index' do
      let!(:users) do
        3.times do |index|
          user = User.create(username: "test#{index+1}", password: "test123")
          user.guitars.build(model: "test-model#{index+1}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
          user.guitars.build(model: "test-model#{index+10}", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
        end
      end

      before(:example) { get :index }

      it 'returns HTTP Success' do
        expect(response).to have_http_status(:success)
      end

      it 'should return the correct number of users' do
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
    let!(:user) do
      user = User.create(username: "test", password: "test123")
      user.guitars.build(model: "test-model-1", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
      user.guitars.build(model: "test-model-2", spec: "test-specs", price: 5, condition: "new", location: "somewhere").save
    end

    it 'returns HTTP success' do
       get :show, params: {id: User.first.id}
      expect(response).to have_http_status(:success)
    end

    it 'does not return created_at and updated_at' do
      get :show, params: {id: User.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response.keys).to match(["id", "username", "guitars"])
    end

    it 'returns an array of guitars' do
      get :show, params: {id: User.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].class).to eq(Array)
    end

    it 'returns an correct number of guitars' do
      get :show, params: {id: User.first.id}
      json_response = JSON.parse(response.body)
      expect(json_response["guitars"].size).to eq(2)
    end
  end

  describe 'Post #create' do
    it 'successfully creates a seller ' do
      post :create, params: { user: {username: 'test', password: 'test123'} }
      expect(User.all.size).to eq(1)
    end

    it 'logs in a user after create ' do
      post :create, params: { user: {username: 'test', password: 'test123'} }
      expect(session[:user_id]).to eq(1)
    end

    it 'renders newly created user ' do
      post :create, params: { user: {username: 'test', password: 'test123'} }
      json_response = JSON.parse(response.body)
      expect(json_response["username"]).to eq('test')
    end

    it 'renders user error message when creating user that exists' do
      User.create(username: 'test', password: 'test123')
      post :create, params: { user: {username: 'test', password: 'test123'} }
      json_response = JSON.parse(response.body)

      expect(json_response["errors"][0]).to eq('Username has already been taken')
    end

    it 'renders password error message when password is too short' do
      post :create, params: { user: {username: 'test', password: 'test'} }
      json_response = JSON.parse(response.body)
      expect(json_response["errors"][0]).to eq('Password is too short (minimum is 5 characters)')
    end
  end

  describe 'Patch #update' do
    before(:example) {session.clear}

    it 'successfully updates username' do
      User.create(username: 'before', password: 'test123')
      session[:user_id] = User.first.id
      patch :update, params: { id: 1, user: {username: 'after'} }
      expect(User.first.username).to eq('after')
    end

    it 'successfully updates password' do
      User.create(username: 'before', password: 'test123')
      session[:user_id] = User.first.id
      patch :update, params: { id: 1, user: {password: 'password_has_changed'} }
      expect(User.first.authenticate('password_has_changed')).to be_truthy
    end

    it 'renders updated seller' do
      User.create(username: 'before', password: 'test123')
      session[:user_id] = User.first.id
      patch :update, params: { id: 1, user: {username: 'after'} }
      json_response = JSON.parse(response.body)
      expect(json_response["username"]).to eq('after')
    end

    it 'Will not update username if not logged in as seller' do
      User.create(username: 'first', password: 'test123')
      User.create(username: 'second', password: 'test123')
      session[:user_id] = User.last.id
      patch :update, params: { id: 1, user: {username: 'username_has_been_changed'} }, session: { user_id: 2 }

      json_response = JSON.parse(response.body)
      expect(User.first.username).to eq('first')
      expect(json_response["errors"]).to eq('You are not logged in')
    end

  end

  describe 'Delete #destroy' do
    it 'successfully deletes a seller' do
      User.create(username: 'test', password: 'test123')
      delete :destroy, params: {id: 1}
      expect(User.all.size).to eq(0)
    end

    it 'renders a JSON message after deleting a seller' do
      User.create(username: 'test', password: 'test123')
      delete :destroy, params: {id: 1}
      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to eq('Your account has been deleted')
    end
    it "renders a JSON message when trying to delete seller that doesn't exist" do
      User.delete_all
      delete :destroy, params: {id: 1}
      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to eq('There was an error')
    end
  end
end
