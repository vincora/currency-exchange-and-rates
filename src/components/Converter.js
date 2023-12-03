import { useState, useEffect, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { useForm, Controller } from "react-hook-form";
import { useRates } from "./fetchRates";
import { useCurrencies } from "./fetchCurrencies";

const Converter = () => {
  const [input, setInput] = useState("");
  const [convertedData, setConvertedData] = useState();
  const ratesQuery = useRates();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      input: "",
    },
  });

  const { data } = useCurrencies();

  const regex = useMemo(() => {
    console.log("useMemo", { data });
    const currencies = Object.keys(data ?? {});

    const str = currencies.join("|");

    return new RegExp(
      "^\\s*\\d+\\s+(" + str + ")\\s+in\\s+(" + str + ")\\s*$",
      "i"
    );
  }, [data]);

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
    setInput(input);
    countQuery(input);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ input: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="converterInput">What do you want to convert?</Label>
      <Controller
        name="input"
        control={control}
        rules={{
          pattern: {
            value: regex,
            message: "Invalid input",
          },
        }}
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
      <Button className="bg-sky-800 mt-4">Calculate</Button>
      {convertedData && (
        <div className="mt-4">{`${input} = ${convertedData}`}</div>
      )}
    </form>
  );
};

export default Converter;
