require 'rails_helper'

RSpec.describe Seller, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password) }
    it { should have_secure_password }
    it { should have_many(:guitars) }
  end
end
