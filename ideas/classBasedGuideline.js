// WeatherApp class
class WeatherApp {
	constructor() {
		this.apiKey = 'YOUR_API_KEY';
		this.apiUrl = 'https://api.weatherapi.com/v1';
		this.locationInput = document.getElementById('location-input');
		this.weatherDisplay = document.getElementById('weather-display');
		this.weatherTemplate = document.getElementById('weather-template');
	}

	// Initialize the weather application
	init() {
		this.setupEventListeners();
	}

	// Set up event listeners
	setupEventListeners() {
		// Handle form submission
		document
			.getElementById('weather-form')
			.addEventListener('submit', (event) => {
				event.preventDefault();
				const location = this.locationInput.value;
				this.getWeatherData(location);
			});
	}

	// Get weather data from the API
	async getWeatherData(location) {
		try {
			const response = await fetch(
				`${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`
			);
			if (response.ok) {
				const data = await response.json();
				this.displayWeatherData(data);
			} else {
				throw new Error('Failed to fetch weather data.');
			}
		} catch (error) {
			console.error(error);
			// Display an error message to the user
		}
	}

	// Display weather data
	displayWeatherData(data) {
		// Clear previous weather data
		this.weatherDisplay.innerHTML = '';

		// Render weather template with data
		const template = this.weatherTemplate.content.cloneNode(true);
		template.querySelector('.location').textContent = data.location.name;
		template.querySelector('.temperature').textContent = data.current.temp_c;
		// Populate other weather information

		this.weatherDisplay.appendChild(template);
	}
}

// Create an instance of the WeatherApp class
const weatherApp = new WeatherApp();

// Initialize the weather application
weatherApp.init();

/*
    Build off of this example where this class will be initialized at the index of the project 

    Some ideas to try
    - 1. Have all event listeners in their own dir and function 
        - It takes an HTML elm as an arg and applies evt listener to it 
        - Export evt listener to fuction creating HTML 
    - 2. Have separate dir and functions to create HTML dynamically with JS
        - import function into the class  
    - 3. Have the class methods render the required information 
    - 4. Persist all the internal state (if any) to localStorage from the class inside the index for now. 

*/
