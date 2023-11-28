import React, { useState, useEffect } from "react";
import styles from "./ExchangeRates.module.scss";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


const apiKey = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

const fetchRates =  async (baseCurrency = "USD") => {
  
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${baseCurrency}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.rates;
  } catch (err) {
    return console.error(err.message);
  }
};
const fetchCurrencies = async () => {
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(`https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${apiKey}`,
    options)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (err) {
    return console.error(err.message);
  }
};

const ExchangeRates = () => {
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
      <h2>Choose base currency</h2>
      <Select
        onValueChange={(value) => setBaseCurrency(value)}
      >
        <SelectTrigger className="w-full" value="default">
          <SelectValue placeholder={baseCurrency} />
        </SelectTrigger>
        <SelectContent>
          {curr &&
            Object.keys(curr).map((key) => (
              <SelectItem key={key} value={key}>
                {curr[key]}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
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

export default ExchangeRates;
