import React from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const Converter = () => {
  return (
    <div>
      <Label htmlFor='converterInput'>What do you want to calculate?</Label>
      <Input className='mt-2' id='converterInput' placeholder='Example: 15 usd in rub'></Input>
      <Button className='bg-sky-800 mt-4'>Calculate</Button>
    </div>
  )
}

export default Converter