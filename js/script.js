document.querySelector('.darkmode-button').addEventListener('click', () => {
	document.body.classList.toggle('body-darkmode');
	Array.from(document.querySelectorAll('svg')).map(el => el.classList.toggle('svg-darkmode'));
});

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
	.then(result => {
		const data = result.data

		if(data.media_type ==='image') {
			document.querySelector('#video-container').style.display = 'none';
			document.querySelector('#image-container').setAttribute('href', data.hdurl);
			document.querySelector('#image').setAttribute('alt', data.title);
			document.querySelector('#image').setAttribute('src', data.url);
		} else {
			document.querySelector('#image-container').style.display = 'none';
			document.querySelector('#video').setAttribute('src', data.hdurl);
		};

		if('copyright' in data) {
			document.querySelector('#copyright').textContent = `Image Credit and Copyright: ${data.copyright}`;
		} else {
			document.querySelector('#copyright').textContent = 'Public Domain';
		};

		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const todayDate = new Date(data.date);
		const dateFormat = d => `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

		document.querySelector('#title').textContent = data.title;
		document.querySelector('#loading').style.display = 'none';
		document.querySelector('#date').textContent = dateFormat(todayDate);
		document.querySelector('#explanation').textContent = data.explanation;
		})

	.catch(() => {
		document.querySelector('#APOD').textContent = 'An error has occurred. Refresh the page.';
		document.querySelector('#loading').style.display = 'none';
	});
