import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const apiKey = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

const fetchRates = async (baseCurrency = "USD") => {
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
    const response = await fetch(
      `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${apiKey}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
      .catch((err) =>
        console.log(`Error in useEffect fetching rates: ${err.message}`)
      );
    fetchCurrencies()
      .then((data) => setCurr(data))
      .catch((err) =>
        console.log(
          `Error in useEffect fetching currencies list: ${err.message}`
        )
      );
  }, []);

  return (
    <div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Choose base currency</label>
        <Select
          value={baseCurrency}
          onValueChange={(value) => setBaseCurrency(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
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
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">Code</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Quote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratesList &&
            Object.keys(ratesList).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{curr[key]}</TableCell>
                <TableCell className="text-right">
                  {(ratesList[key] / ratesList[baseCurrency]).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExchangeRates;
