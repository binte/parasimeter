class PagesController < ApplicationController

	def home

	end
	
	def result
	  
	end
	
	def gen_chart
	  
	  work_time = params[:work_time].to_f
	  parasite_time = params[:parasite_time].to_f
	  
	  percentage = ( parasite_time / (work_time + parasite_time) * 100).to_i
	  @phrase = Phrase.where("min <= ? AND max >= ?", percentage, percentage).sample
	  
	  render json: { 
	    html: render_to_string("result", layout: false, locals: { phrase: @phrase }), 
	    workTime: work_time, 
	    parasiteTime: parasite_time,
	    percentage: percentage
	  }
	end
	
end