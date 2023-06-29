let countries = [];

window.onload = function () {
  getAllCountries();
};

const getAllCountries = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Country data couldn't be fetched!");
    }
    const data = await res.json();
    countries = data;
    populateDropdownMenu(data);
  } catch (error) {
    console.log(error);
  }
};

const populateDropdownMenu = (data) => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.innerHTML = "";

  data.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });

  data.forEach((country) => {
    const { name } = country;
    dropdownMenu.innerHTML += `<li><a class="dropdown-item" href="#" onclick="selectCountry('${name.common}')">${name.common}</a></li>`;
  });
};


const selectCountry = (countryName) => {
  const selectedCountry = countries.find(
    (country) => country.name.common === countryName
  );
  if (selectedCountry) {
    countriesCardDOM(selectedCountry);
  }
};

const countriesCardDOM = (country) => {
  const {
    flags: { png },
    name: { common },
    region,
    capital,
    languages,
    currencies,
    population,
    borders,
    maps: { googleMaps },
  } = country;

  const cardSection = document.querySelector(".card");
  const commonUp = common.toUpperCase();

  cardSection.innerHTML = `
    <div class="card mx-auto" style="width: 22rem;">
      <img src="${png}" class="card-img-top" alt="${common}'s flag">
      <div class="card-body">
        <h5 class="card-title text-center"><span class="fw-bold">${commonUp}</span></h5>
        <p class="card-text"><i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> REGION: </span>${region}</p><hr>
        <p class="card-text"><i class="fas fa-lg fa-landmark"></i><span class="fw-bold"> CAPITAL: </span>${capital}</p><hr>
        <p class="card-text"><i class="fas fa-lg fa-comments"></i><span class="fw-bold"> LANGUAGES: </span>${Object.values(
          languages
        )}</p><hr>
        <p class="card-text"><i class="fas fa-lg fa-money-bill-wave"></i><span class="fw-bold"> CURRENCIES: </span>${
          Object.values(currencies)[0].name
        }, 
        ${Object.values(currencies)[0].symbol}</p><hr>
        <p class="card-text"><i class="fa-solid fa-people-group"></i></i><span class="fw-bold"> POPULATION: </span>${population}</p><hr>
        <p class="card-text"><i class="fa-sharp fa-solid fa-road-barrier"></i><span class="fw-bold"> BORDERS: </span>${borders}</p><hr>
        <p class="card-text"><i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> MAP: </span><a href=${googleMaps} target='_blank'>Go to Google Map</a></p>
      </div>
    </div>
  `;
};
