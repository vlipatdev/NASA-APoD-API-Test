$('#darkmode-icon').click(function() {
	$('body').toggleClass('body-darkmode');
	$('svg').toggleClass('svg-darkmode');
})

$.ajax({
	url: 'https://api.nasa.gov/planetary/apod?api_key=H0SZyM87XABTNLMJyMApX41QSQn4tbBjI5bs1Pg7', //Apply for an API Key: https://api.nasa.gov/index.html#apply-for-an-api-key
	success: function(data) {
		if(data.media_type === 'image') {
			$('#video-container').css('display', 'none');
			$('#image-container').attr('href', data.hdurl);
			$('#image').attr('alt', data.title);
			$('#image').attr('src', data.url);

		} else {
			$('#image-container').css('display', 'none');
			$('#video').attr('src', data.url);
		}

		if('copyright' in data) {
			$('#copyright').text('Image Credit and Copyright: ' + data.copyright);
		} else {
			$('#copyright').text('Public Domain');
		}

		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
		];
		var todayDate = new Date(data.date);
		function dateFormat(d) {
		  return monthNames[todayDate.getMonth()] + ' ' + todayDate.getDate() + ', ' + todayDate.getFullYear();
		}

		$('#title').text(data.title);
		$('#loading').css('display', 'none');
		$('#date').text(dateFormat(todayDate));
		$('#explanation').text(data.explanation);
	},

	error: function() {
		$('#APOD').text('An error has occurred. Refresh the page.');
		$('#loading').css('display', 'none');
		$('#darkmode-icon').css('display', 'none');
	}
})