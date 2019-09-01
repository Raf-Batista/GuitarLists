require 'rails_helper'

RSpec.describe Seller, type: :model do
  describe 'validations' do
    # Shoulda-Matcher validations
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password) }
    it { should have_secure_password }
    it { should have_many(:guitars) }

    it 'Should not create a username if it already exists' do
      Seller.create(username: 'first', password: 'abc123')
      second = Seller.create(username: 'first', password: 'abc123')

      expect(second.valid?).to eq(false)
    end

    it 'Should not create a username with a password less than 5 characters' do
      user = Seller.create(username: 'first', password: 'abc')

      expect(user.valid?).to eq(false)
    end
  end
end
