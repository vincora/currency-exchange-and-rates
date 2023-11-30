import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useRates } from "./fetchRates";


const Converter = () => {
  const [input, setInput] = useState("");
  const [convertedData, setConvertedData] = useState();
  const ratesQuery = useRates();
  

  const parseInput = () => {
    const spaces = /\s+/;
    let res = input.trim().replace(spaces, ' ').split(' ');
    if (!Number(res[0])){
      throw new Error ('invalid input type')
    }
    return res
  };

  const countQuery = () => {
    let input = parseInput();
    let amount = input[0];
    let curr1 = input[1].toUpperCase();
    let curr2 = input[3].toUpperCase();
    let res = (amount * (ratesQuery.data[curr2] / ratesQuery.data[curr1])).toFixed(2) + ` ${curr2}`;
    setConvertedData(res);
  }


  return (
    <div>
      <Label htmlFor="converterInput">What do you want to convert?</Label>
      <Input
        className="mt-2"
        id="converterInput"
        placeholder="Example: 15 usd in rub"
        onChange={(e) => setInput(e.target.value)}
      ></Input>
      <Button onClick={countQuery} className="bg-sky-800 mt-4">Calculate</Button>
      {convertedData && <div className="mt-4">{`Result: ${convertedData}`}</div>}
    </div>
  );
};

export default Converter;
