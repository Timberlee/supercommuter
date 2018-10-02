class ApplicationController < ActionController::Base
  def home
    render file: 'app/views/sc-v2.html'
  end
end
