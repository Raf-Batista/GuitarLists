require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  before(:context) do
    User.create(email: 'test@example.com', username: 'test', password: 'test123')
  end

  describe "welcome" do
    it "has the correct subject in the mail" do
      mail = ActionMailer::Base.deliveries.last
      expect(mail.subject).to eq('Welcome to GuitarLists')
    end
  end

end
