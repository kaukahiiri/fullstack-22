import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      find countries with: &nbsp;
      <input value={props.newFilter} onChange={props.handleFilter} />
    </div>
  );
};

const Countries = ({ countries, oneFound }) => {
  console.log(oneFound);
  if (oneFound) {
    return (
      <div>
        <h3>{countries[0]}</h3>
        capital: {countries[1]} <br />
        area: {countries[2]} <br />
        <br />
        <strong>languages:</strong> <br />
        <ul>
          {countries[3].map((lang) => (
            <li>{lang}</li>
          ))}
        </ul>
        <img src={countries[4]} width="100" height="60" />
      </div>
    );
  } else {
    if (countries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Found Countries</h3>
          <ul>
            {countries.map((country) => (
              <li>{country}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
};

const App = () => {
  const [filteredCountries, setCountryFilter] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [oneFound, setOneFound] = useState(false);
  console.log("after create...", filteredCountries);
  console.log("after create filter is...", newFilter);

  useEffect(() => {
    console.log("effect, newFilter is: ", newFilter);
    if (newFilter !== "") {
      axios
        .get("https://restcountries.com/v2/name/" + newFilter)
        .then((response) => {
          console.log("promise fulfilled");
          handleResponse(response.data);
          console.log(response.data);
        })
        .catch((err) => err);
    }
  }, [newFilter]);

  const handleResponse = (countries) => {
    console.log("no of countries", countries.length);
    console.log("listOfCountries", countries);
    setCountryFilter([]);
    if (countries.length === 1) {
      var langArr = countries[0].languages.map((language) => language.name);
      const countryArr = [
        countries[0].name,
        countries[0].capital,
        countries[0].area,
        langArr,
        countries[0].flag,
      ];
      setCountryFilter(countryArr);
      setOneFound(true);
    } else {
      setCountryFilter(countries.map((country) => country.name));
      if (oneFound) {
        setOneFound(false);
      }
    }
  };
  console.log("found", filteredCountries.length, "countries");

  const handleXXXFilter = (event) => {
    console.log("in XXXFilter", event.target.value);
    setNewFilter(event.target.value);
    if (oneFound) {
      setOneFound(false);
    }
  };

  console.log("rendering...", filteredCountries);
  return (
    <div>
      <h2>Country Intel</h2>
      <Filter newFilter={newFilter} handleFilter={handleXXXFilter} />

      <Countries countries={filteredCountries} oneFound={oneFound} />
    </div>
  );
};

export default App;
