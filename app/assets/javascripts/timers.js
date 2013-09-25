$(function() {
	$('#counter_total').runner();
	$('#counter_working').runner();
	$('#counter_parasiting').runner();

	$('#text_working').on("click", function() {
		$('#counter_total').runner('start');
		$('#counter_working').runner('start');
		$('#counter_parasiting').runner('stop');
		$('#text_working .button').addClass('button_active');
		$('#text_parasiting .button').removeClass('button_active');
		$('#stop').fadeIn("slow");
	});

	$('#text_parasiting').on("click", function() {
		$('#counter_total').runner('start');
		$('#counter_parasiting').runner('start');
		$('#counter_working').runner('stop');
		$('#text_parasiting .button').addClass('button_active');
		$('#text_working .button').removeClass('button_active');
		$('#stop').fadeIn("slow");
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
				var opt = {segmentShowStroke : false, animateScale: true, percentageInnerCutout : 80};
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
