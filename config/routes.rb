Parasimeter::Application.routes.draw do
  root to: 'pages#home'
  
  get '/result', to: 'pages#result'
end
