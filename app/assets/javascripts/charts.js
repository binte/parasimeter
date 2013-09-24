$(function () {

	var ctx = document.getElementById('pie_chart').getContext('2d');
	
	var data = [
		{
			value: 50,
			color: '#F38630'
		},
		{
			value: 50,
			color: '#F00000'
		}
	]

	var chart = new Chart(ctx).Pie(data);
});
