Parasimeter::Application.routes.draw do
  root to: 'pages#home'
  
  post '/result', to: 'pages#gen_chart'
end
