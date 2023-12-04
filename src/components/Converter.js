import { useState, useEffect, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { useRates } from "./fetchRates";
import { useCurrencies } from "./fetchCurrencies";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../lib/utils";

const Converter = () => {
  const [input, setInput] = useState("");
  const [convertedData, setConvertedData] = useState();
  const ratesQuery = useRates();
  const { data } = useCurrencies();

  const schema = useMemo(() => {
    if (data) {
      const currencies = Object.keys(data);
      const regexStr = currencies.join("|");
      const regex = new RegExp(
        "^\\s*\\d+\\s+(" + regexStr + ")\\s+in\\s+(" + regexStr + ")\\s*$",
        "i"
      );
      return z.object({
        input: z.string().regex(regex, {
          message: "Invalid input",
        }),
      });
    }

    return z.object({
      input: z.string(),
    });
  }, [data]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      input: "",
    },
  });

  const parseInput = (input) => {
    return input.trim().replace(/\s+/g, " ").split(" ");
  };

  const countQuery = (input) => {
    let alteredInput = parseInput(input);
    let amount = alteredInput[0];
    let curr1 = alteredInput[1].toUpperCase();
    let curr2 = alteredInput[3].toUpperCase();
    let res =
      (amount * (ratesQuery.data[curr2] / ratesQuery.data[curr1])).toFixed(2) +
      ` ${curr2}`;
    setConvertedData(res);
  };

  const onSubmit = ({ input }) => {
    setInput(
      parseInput(input)
        .map((item) => item.toLowerCase())
        .join(" ")
    );
    countQuery(input);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="converterInput">What do you want to convert?</Label>
      <Controller
        name="input"
        control={control}
        
        render={({ field, fieldState }) => (
          <div>
            <Input
              id="converterInput"
              placeholder="Example: 15 usd in rub"
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
              className={cn("mt-2", { "border-red-600": errors?.input })}
            />
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
      <Button type="submit" className="bg-sky-800 mt-4">
        Calculate
      </Button>
      {convertedData && (
        <div className="mt-4">{`${input} = ${convertedData}`}</div>
      )}
    </form>
  );
};

export default Converter;
