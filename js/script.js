$('#darkmode-icon').click(function() {
	$('body').toggleClass('body-darkmode');
	$('svg').toggleClass('svg-darkmode');
})

$.ajax({
	url: 'https://api.nasa.gov/planetary/apod?api_key=H0SZyM87XABTNLMJyMApX41QSQn4tbBjI5bs1Pg7', //Apply for an API Key: https://api.nasa.gov/index.html#apply-for-an-api-key
	success: function(data) {
		if(data.media_type === 'image') {
			$('#video-container').css('display', 'none');
			$('#image').attr('alt', data.title);
			$('#image').attr('src', data.url);

			if('hdurl' in data) {
				$('#image-container').attr('href', data.hdurl);
			} else {
				$('#image-container').attr('href', data.url);
			}

		} else {
			$('#image-container').css('display', 'none');
			$('#video').attr('src', data.url);
		}

		if('copyright' in data) {
			$('#copyright').text('Image Credit and Copyright: ' + data.copyright);
		} else {
			$('#copyright').text('Public Domain');
		}

		$('#title').text(data.title);
		$('#loading').css('display', 'none');
		$('#date').text(data.date);
		$('#explanation').text(data.explanation);
	},

	error: function() {
		$('#APOD').text('An error has occurred. Refresh the page.');
		$('#loading').css('display', 'none');
	}
})