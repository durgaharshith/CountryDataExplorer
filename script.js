const categoryForm = document.getElementById('categoryForm');
const valueForm = document.getElementById('valueForm');
const countryInfo = document.getElementById('countryInfo');
const homeBtnContainer = document.getElementById('homeBtnContainer');
const homeBtn = document.getElementById('homeBtn');

categoryForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;

  if (category !== '') {
    categoryForm.style.display = 'none';
    valueForm.style.display = 'block';
  }
});

valueForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const value = document.getElementById('value').value;

  let apiUrl = '';

  if (category === 'name') {
    apiUrl = `https://restcountries.com/v3.1/name/${value}?fullText=true&fields=name,capital,currencies,languages,region,subregion`;
  } else if (category === 'currency') {
    apiUrl = `https://restcountries.com/v3.1/currency/${value}?fields=name,capital,currencies,languages,region,subregion`;
  } else if (category === 'language') {
    apiUrl = `https://restcountries.com/v3.1/lang/${value}?fields=name,capital,currencies,languages,region,subregion`;
  } else if (category === 'capitalCity') {
    apiUrl = `https://restcountries.com/v3.1/capital/${value}?fields=name,capital,currencies,languages,region,subregion`;
  } else if (category === 'region') {
    apiUrl = `https://restcountries.com/v3.1/region/${value}?fields=name,capital,currencies,languages,region,subregion`;
  } else if (category === 'subregion') {
    apiUrl = `https://restcountries.com/v3.1/subregion/${value}?fields=name,capital,currencies,languages,region,subregion`;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        let countryInfoHTML = '';

        data.forEach(country => {
          const { name, capital, currencies, languages, region, subregion } = country;

          const currencyNames = Object.values(currencies).map(currency => currency.name).join(', ');
          const languageNames = Object.values(languages).map(language => language.name).join(', ');

          countryInfoHTML += `
            <h2>${name.common}</h2>
            <p>Capital: ${capital}</p>
            <p>Region: ${region}</p>
            <p>Subregion: ${subregion}</p>
            <p>Currencies: ${currencyNames}</p>
            
            <hr>
          `;
        });

        countryInfo.innerHTML = countryInfoHTML;
        homeBtnContainer.style.display = 'block';
      } else {
        countryInfo.innerHTML = 'No countries found for the specified value.';
        homeBtnContainer.style.display = 'block';
      }
    })
    .catch(error => {
      countryInfo.innerHTML = 'An error occurred while fetching the country information.';
      console.error(error);
      homeBtnContainer.style.display = 'block';
    });
});

homeBtn.addEventListener('click', function() {
  categoryForm.style.display = 'block';
  valueForm.style.display = 'none';
  countryInfo.innerHTML = '';
  homeBtnContainer.style.display = 'none';
});
