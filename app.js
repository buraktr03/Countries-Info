let countries = "";

window.onload = function () {
  getAllCountries();
};

const getAllCountries = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Country can't be fetched!");
    }
    const data = await res.json();
    countryName(data);
  } catch (error) {
    console.log(error);
  }
};

const countryName = (data)=>{
    countries = data
    countries.sort((a,b))=>{
        if(a.name.common < b.name.common) 
        return -1;
    }
}