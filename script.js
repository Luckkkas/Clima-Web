document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value.trim();

    if (!cityName) {
        showAlert('Digite o nome de uma cidade.');
        return;
    }

    const apiKey = '78158e3812637403147a6b95097d8d1f';

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();

        console.log(data);

        // Mostra o clima depois da pesquisa
        document.querySelector('#weather').classList.add('show');
        document.querySelector('#infos').classList.add('show');
        document.querySelector('#other_infos').classList.add('show');

        // Cidade
        document.querySelector('#titler').innerHTML =
            `${data.name}, ${data.sys.country}`;

        // Temperatura
        document.querySelector('#temp_value').innerHTML =
            `${Math.round(data.main.temp)} <sup>C°</sup>`;

        // Descrição
        document.querySelector('#temp_description').innerHTML =
            data.weather[0].description;

        // Temperatura máxima
        document.querySelector('#Temp_max').innerHTML =
            `${Math.round(data.main.temp_max)} <sup>C°</sup>`;

        // Temperatura mínima
        document.querySelector('#Temp_min').innerHTML =
            `${Math.round(data.main.temp_min)} <sup>C°</sup>`;

        // Umidade
        document.querySelector('#humidity').innerHTML =
            `${data.main.humidity}%`;

        // Vento
        const vento = (data.wind.speed * 3.6).toFixed(1);

        document.querySelector('#wind').innerHTML =
            `${vento} km/h`;

        // Ícone do clima
        const weatherIcon = document.querySelector('#tempo img');

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        // Limpa mensagem de erro
        showAlert('');

    } catch (error) {

        console.error(error);

        showAlert('Não foi possível encontrar essa cidade.');
    }
});


function showAlert(message) {
    document.querySelector('#alert').innerHTML = message;
}
