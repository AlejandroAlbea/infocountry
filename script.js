document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries');
    const searchInput = document.getElementById('search');
    const cambiarTemaBoton = document.getElementById('toggle-theme');
    let isDarkMode = true;

    // CODIGO DE LA API
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error al obtener los países:', error);
        }
    };

    const displayCountries = (countries) => {
        countriesContainer.innerHTML = countries.map(country => `
            <div class="country">
                <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p>Población: ${country.population.toLocaleString()}</p>
            </div>
        `).join('');
    };

    const filterCountries = () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.country').forEach(countryElement => {
            const countryName = countryElement.querySelector('h2').textContent.toLowerCase();
            countryElement.style.display = countryName.includes(searchTerm) ? '' : 'none';
        });
    };



    // BOTON PARA CAMBIAR DE MODO OSCURO A CLARO
    const cambiarTema = () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode', !isDarkMode);
        cambiarTemaBoton.textContent = isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
    };

    searchInput.addEventListener('input', filterCountries);
    cambiarTemaBoton.addEventListener('click', cambiarTema);
    // CARGAR TODA LA API
    fetchCountries();
});
