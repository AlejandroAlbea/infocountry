document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries');
    const searchInput = document.getElementById('search');
    const toggleThemeButton = document.getElementById('toggle-theme');

    let isDarkMode = true;

    // OBTENER PAISES Y CONTINENTES
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            const countriesByContinent = groupCountriesByContinent(countries);
            displayCountriesByContinent(countriesByContinent);
        } catch (error) {
            console.error('Error al obtener los países:', error);
        }
    };

    // AGRUPAR SEGÚN CONTIENTE
    const groupCountriesByContinent = (countries) => {
        const countriesByContinent = {};
        countries.forEach(country => {
            const continent = country.region;
            if (!countriesByContinent[continent]) {
                countriesByContinent[continent] = [];
            }
            countriesByContinent[continent].push(country);
        });
        return countriesByContinent;
    };

    // MOSTRAR PAIS
    const displayCountriesByContinent = (countriesByContinent) => {
        countriesContainer.innerHTML = '';

        for (const continent in countriesByContinent) {
            const continentHeader = document.createElement('h2');
            continentHeader.textContent = continent === '' ? 'Otros' : continent; // Manejar casos donde el continente es desconocido

            const continentCountries = countriesByContinent[continent];
            const continentDiv = document.createElement('div');
            continentDiv.classList.add('continent');

            continentCountries.forEach(country => {
                const countryElement = document.createElement('div');
                countryElement.classList.add('country');
                countryElement.innerHTML = `
                    <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
                    <h3>${country.name.common}</h3>
                    <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p>Población: ${country.population.toLocaleString()}</p>
                `;
                continentDiv.appendChild(countryElement);
            });

            countriesContainer.appendChild(continentHeader);
            countriesContainer.appendChild(continentDiv);
        }
    };

    // BUSCAR PAÍS
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const countryElements = document.querySelectorAll('.country');
        countryElements.forEach(countryElement => {
            const countryName = countryElement.querySelector('h3').textContent.toLowerCase();
            if (countryName.includes(searchTerm)) {
                countryElement.style.display = '';
            } else {
                countryElement.style.display = 'none';
            }
        });
    });

    // CAMBIAR MODO CLARO-OSCURO
    toggleThemeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode', !isDarkMode);
        toggleThemeButton.textContent = isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
    });

    // CARGAR API
    fetchCountries();
});
