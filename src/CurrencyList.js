import React, { useState, useEffect } from "react";
import { apiKey } from "./apiKey";

const fetchData = (baseCurrency = 'USD') => {
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

const CurrencyList = () => {
  const [currList, setCurrList] = useState({});
  useEffect(() => {
    fetchData()
      .then((data) => setCurrList(data))
      .catch((err) => console.log(`Error in useEffect: ${err.message}`));
  }, []);

  return (
    <ul>
      {currList &&
        Object.keys(currList).map((key) => (
          <li key={key}>{`${key}: ${currList[key]}`}</li>
        ))}
    </ul>
  );
};

export default CurrencyList;
