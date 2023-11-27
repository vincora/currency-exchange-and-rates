import React, { useState } from 'react'

const CurrencySelector = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
  return (
    <select name="baseCur" id="">
        <option value="usd">USD</option>
        <option value="rub">RUB</option>
        <option value="eur">EUR</option>
    </select>
  )
}

export default CurrencySelector