Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users do
    resources :guitars
  end
  resources :guitars, only: [:index]
end
