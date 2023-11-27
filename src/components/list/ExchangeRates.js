import React, { useState, useEffect } from "react";
import styles from "./ExchangeRates.module.scss";

const apiKey = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

const fetchRates = (baseCurrency = "USD") => {
  
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
  `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${apiKey}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((err) => console.error(err));
};

const CurrencyList = () => {
  const [ratesList, setRatesList] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [curr, setCurr] = useState({});

  useEffect(() => {
    fetchRates()
      .then((data) => setRatesList(data))
      .catch((err) => console.log(`Error in useEffect fetching rates: ${err.message}`));
    fetchCurrencies()
      .then((data) => setCurr(data))
      .catch((err) => console.log(`Error in useEffect fetching currencies list: ${err.message}`));
  }, []);

  return (
    <div className={styles.template}>
      <select
        className={styles.select}
        name="baseCur"
        id=""
        onChange={(event) => setBaseCurrency(event.target.value)}
        
      >
        <option value="choose" disabled >Choose base currency</option>
        {curr &&
          Object.keys(curr).map((key) => (
            <option key={key} value={key}>
              {curr[key]}
            </option>
          ))}
      </select>
      <ul className={styles.list}>
        {ratesList &&
          Object.keys(ratesList).map((key) => (
            <li key={key}>{`${key}: ${
              (ratesList[key] / ratesList[baseCurrency]).toFixed(2)
            }`}</li>
          ))}
      </ul>
    </div>
  );
};

export default CurrencyList;
