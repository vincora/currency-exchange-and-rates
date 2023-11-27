import React, { useState, useEffect } from "react";
import styles from "./ExchangeRates.module.scss";

const fetchData = (baseCurrency = "USD") => {
  const apiKey = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${baseCurrency}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.rates)
    .catch((err) => console.error(err.message));
};
const fetchCurrencies = () => {
  const options = { method: "GET", headers: { accept: "application/json" } };

  return fetch(
    "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=0",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
fetchCurrencies();

const CurrencyList = () => {
  const [currList, setCurrList] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  useEffect(() => {
    fetchData()
      .then((data) => setCurrList(data))
      .catch((err) => console.log(`Error in useEffect: ${err.message}`));
  }, []);

  return (
    <div>
      <select
        name="baseCur"
        id=""
        onChange={(event) => setBaseCurrency(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
        <option value="EUR">EUR</option>
      </select>
      <ul className={styles.list}>
        {currList &&
          Object.keys(currList).map((key) => (
            <li key={key}>{`${key}: ${currList[key] / currList[baseCurrency]}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default CurrencyList;
