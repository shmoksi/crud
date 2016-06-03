$(document).ready(function() {

	$('#formAdd').on('submit', function(e){
		e.preventDefault();
		$.post('/adduser', $(this).serialize(), function(data) {
			console.log(data);
			if (data.status == 'ok') {
				window.location.href = data.location;
			}
		}, 'json');
		return false;
	});

	$('#formEdit').on('submit', function(e){
		e.preventDefault();

		$.ajax({
			url: '/edituser',
			type: 'PUT',
			dataType: 'json',
			data: $(this).serialize(),
		})
		.done(function(data) {
			if (data.status == 'ok') {
				window.location.href = data.location;
			}
		});

		return false;
	});

	$('.userDelete').on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: '/deleteuser',
			type: 'DELETE',
			dataType: 'json',
			data: {id: $(this).attr('data-id')},
		})
		.done(function(data) {
			if (data.status == 'ok') {
				window.location.href = data.location;
			}
		});
	});
});