import React, { useState, useEffect} from 'react';
import './App.css';
import CurrencyInput from './CurrencyInput.js'
import axios from 'axios';
import { func } from 'prop-types';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=6bce31367643bcef0f015bbdaefc54b9')
    .then(response => {
      setRates(response.data.rates);
    });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    const newAmount2 = format(amount1 * rates[currency2] / rates[currency1]);
    setAmount2(newAmount2);
    setAmount1(amount1);

  }

  function handleCurrency1Change(currency1) {
    const newAmount2 = format(amount1 * rates[currency2] / rates[currency1]);
    setAmount2(newAmount2);
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    const newAmount2 = format(amount2 * rates[currency1] / rates[currency2]);
    setAmount1(newAmount2);
    setAmount2(amount2);

  }

  function handleCurrency2Change(currency2) {
    const newAmount2 = format(amount2 * rates[currency1] / rates[currency2]);
    setAmount1(newAmount2);
    setCurrency2(currency2);
  }

  return (
    <div>
    <h1>Currency Converter</h1>
      <CurrencyInput
      onAmountChange={handleAmount1Change}
      onCurrencyChange={handleCurrency1Change}
       currencies={Object.keys(rates)} 
       amount={amount1} 
       currency={currency1}
      />
      <CurrencyInput
      onAmountChange={handleAmount2Change}
      onCurrencyChange={handleCurrency2Change}
       currencies={Object.keys(rates)} 
       amount={amount2} 
       currency={currency2}
      />
    </div>
  );
}

export default App;
