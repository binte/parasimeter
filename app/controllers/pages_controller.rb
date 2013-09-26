class PagesController < ApplicationController

	def home

	end
	
	def result
	  
	end
	
	def gen_chart
	  @phrase = Phrase.last
	  render json: { html: render_to_string("result", layout: false, locals: { phrase: @phrase }), workTime: params[:work_time], parasiteTime: params[:parasite_time]}
	end
	
end