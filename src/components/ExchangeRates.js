import { useState } from "react";
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

import { useRates } from "./fetchRates";
import { useCurrencies } from "./fetchCurrencies";

const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const ratesQuery = useRates();
  const currenciesQuery = useCurrencies();

  if (ratesQuery.isLoading) {
    return <h3>Loading...</h3>;
  }
  if (ratesQuery.isError) {
    return <h3>{JSON.stringify(ratesQuery.error)}</h3>;
  }
  if (!ratesQuery.data) {
    return <h3>No data</h3>;
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
          {Object.keys(ratesQuery.data).map((key) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                {currenciesQuery.data && currenciesQuery.data[key]}
              </TableCell>
              <TableCell className="text-right">
                {(ratesQuery.data[key] / ratesQuery.data[baseCurrency]).toFixed(
                  2
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExchangeRates;
