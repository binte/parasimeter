$(function() {
	$('#counter_total').runner();
	$('#counter_working').runner();
	$('#counter_parasiting').runner();

	$('#text_working').on("click", function() {
		$('#counter_total').runner('start');
		$('#counter_working').runner('start');
		$('#counter_parasiting').runner('stop');
	});

	$('#text_parasiting').on("click", function() {
		$('#counter_total').runner('start');
		$('#counter_parasiting').runner('start');
		$('#counter_working').runner('stop');
	});

	$('#stop').on("click", function() {
		$('#counter_total').runner('stop');
		$('#counter_parasiting').runner('stop');
		$('#counter_working').runner('stop');
	});

	$('#reset').on("click", function() {
		$('#counter_total').runner('reset',true);
		$('#counter_parasiting').runner('reset',true);
		$('#counter_working').runner('reset',true);
	});
})
