$(function() {
	var messages_element=$("#slogan h2");
	var messages={
		working:"Yeah... right! Stop cheating, I'm watching you!",
		parasiting:"Bitch, stop parasiting and go build a better world!",
		pause:"DON'T STOP ME NOW!"
	};

	var workingcopy_element=$("#text_working .button");
	var workingcopy={
		active:"STOP WORKING!",
		resume:"GO ON WORKING!"
	};

	var parasitingcopy_element=$("#text_parasiting .button");
	var parasitingcopy={
		active:"STOP PARASITING!",
		resume:"GO ON PARASITING!"
	}

	var hero_shot_element=$("#hero_shot");
	var hero_shots={
		a:"a",
		b:"b",
		c:"c",
		d:"d",
		e:"e",
		f:"f",
		g:"g",
		h:"h",
		i:"i",
		j:"j",
		k:"k",
		l:"l"
	}

	$('#counter_total').runner();
	$('#counter_working').runner().on('runnerStart', startTotal).on('runnerStop', stopTotal);
	$('#counter_parasiting').runner().on('runnerStart', startTotal).on('runnerStop', stopTotal);

	function startTotal() {
		$('#counter_total').runner('start');
	}

	function stopTotal() {
		if($('#counter_working').runner('info').running == false && $('#counter_parasiting').runner('info').running == false) {
			$('#counter_total').runner('stop');
			messages_element.text(messages.pause);
		}
	}

	$('#text_working').on("click", function() {
		$('#counter_working').runner('toggle');
		$('#counter_parasiting').runner('stop');
		$('#text_parasiting .button').removeClass('button_active');
		$('#text_working .button').toggleClass('button_active');
		$('#stop').fadeIn("slow");
		if($('#counter_working').runner('info').running) {
			messages_element.text(messages.working);
			workingcopy_element.text(workingcopy.active);
		}
		else{
			workingcopy_element.text(workingcopy.resume);
		}
		if($('#counter_parasiting').runner('info').time != 0) {
			parasitingcopy_element.text(parasitingcopy.resume);
		}
	});

	$('#text_parasiting').on("click", function() {
		$('#counter_parasiting').runner('toggle');
		$('#counter_working').runner('stop');
		$('#text_parasiting .button').toggleClass('button_active');
		$('#text_working .button').removeClass('button_active');
		$('#stop').fadeIn("slow");
		if($('#counter_parasiting').runner('info').running) {
			messages_element.text(messages.parasiting);
			parasitingcopy_element.text(parasitingcopy.active);
		}
		else{
			parasitingcopy_element.text(parasitingcopy.resume);
		}
		if($('#counter_working').runner('info').time != 0) {
			workingcopy_element.text(workingcopy.resume);
		}
	});

	$('#stop').on("click", function() {
		$('#counter_total').runner('stop');
		$('#counter_parasiting').runner('stop');
		$('#counter_working').runner('stop');
		var parasiteTime = $('#counter_parasiting').runner('info').formattedTime;
		var workTime = $('#counter_working').runner('info').formattedTime;
		
		var request = $.ajax({
			
		  url: "/result",
		  type: "POST",
		  data: { work_time: workTime,
						  parasite_time: parasiteTime
			 			},
		  dataType: "json",

		  success: function(data){
				$("#yield").html(data.html);
				var ctx = document.getElementById('doughnut_chart').getContext('2d');
				var chart_data = [
					{
						value: parseFloat(data.parasiteTime),
						color: '#F2C215'
					},
					{
						value: parseFloat(data.workTime),
						color: '#FFF'
					}
				]
				var opt = {segmentShowStroke : false, animateScale: true, percentageInnerCutout : 85};
				var chart = new Chart(ctx).Doughnut(chart_data,	opt);
				
				var	percentage = parseFloat(data.parasiteTime) / (parseFloat(data.parasiteTime) + parseFloat(data.workTime));
				var formattedPercentage = (percentage * 100).toFixed(0) + "%";
				
				$("#percentage").html(formattedPercentage);
				$("#score_value").html(data.parasiteTime);
			}
		});
	});

	$('#reset').on("click", function() {
		$('#counter_total').runner('reset',true);
		$('#counter_parasiting').runner('reset',true);
		$('#counter_working').runner('reset',true);
	});

})
