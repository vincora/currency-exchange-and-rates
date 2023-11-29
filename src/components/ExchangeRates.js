import React, { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";

const apiKey = process.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

const fetchRates = async () => {
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.rates;
};

const fetchCurrencies = async () => {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const response = await fetch(
    `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${apiKey}`,
    options
  );
  const data = await response.json();
  return data;
};


const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const ratesQuery = useQuery({ queryKey: ["ratesList"], queryFn: fetchRates });
  const currenciesQuery = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });

  if (ratesQuery.isLoading) {
    return <h3>Loading...</h3>;
  }
  if (ratesQuery.isError) {
    return <h3>{JSON.stringify(ratesQuery.error)}</h3>;
  }
  if (!ratesQuery.data){
    return <h3>No data</h3>
  }

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
            {currenciesQuery.data &&
              Object.keys(currenciesQuery.data).map((key) => (
                <SelectItem key={key} value={key}>
                  {currenciesQuery.data[key]}
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
          {
            Object.keys(ratesQuery.data).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{currenciesQuery.data && currenciesQuery.data[key]}</TableCell>
                <TableCell className="text-right">
                  {(
                    ratesQuery.data[key] / ratesQuery.data[baseCurrency]
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExchangeRates;
