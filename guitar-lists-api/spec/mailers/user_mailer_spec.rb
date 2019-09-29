require "rails_helper"

RSpec.describe UserMailer, type: :mailer do

  describe "welcome" do
    it "has the correct subject in the mail" do
      user = User.create(email: 'test@example.com', username: 'test', password: 'test123')
      UserMailer.welcome(user).deliver_now
      mail = ActionMailer::Base.deliveries.last
      expect(mail.subject).to eq('Welcome to GuitarLists')
    end
  end

end
