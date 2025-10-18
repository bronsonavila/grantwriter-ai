Rails.application.routes.draw do
  root 'proposals#new'

  resources :proposals, only: [:new, :create, :show] do
    post :generate_ideas, on: :collection
  end

  resources :events, only: [:create]

  delete '/clear_session', to: 'sessions#destroy', as: 'clear_session'
end
