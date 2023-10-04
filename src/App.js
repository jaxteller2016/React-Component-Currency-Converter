import React, { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  // Step 1: Create state variables
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [inputError, setInputError] = useState('');

  // Step 2: Use the useEffect hook to fetch data from the API
  useEffect(() => {
    async function fetchConvertedAmount() {
      try {
        const apiURL = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

        // Fetch data from the API and update the state with the converted amount
        const res = await fetch(apiURL);
        const data = await res.json();
        // Update the convertedAmount state variable with the fetched data
        setConvertedAmount(data.rates[toCurrency]);
        setInputError(''); // Clear any previous input error
      } catch (err) {
        console.error(
          `⛔️ Cannot convert ${fromCurrency} to ${toCurrency}. Please choose different currencies`
        );
        setInputError(
          `Cannot convert ${fromCurrency} to ${toCurrency}. Please choose different currencies`
        );
      }
    }
    if (inputError === '') {
      fetchConvertedAmount();
    }
  }, [amount, fromCurrency, toCurrency, inputError]);

  // Step 3: Handle user input changes and input validation
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      // Input is a valid number (digits with optional decimal point)
      setAmount(inputValue);
      setInputError('');
    } else {
      // Input is not a valid number
      setAmount(inputValue);
      setInputError('Please enter a valid number');
    }
  };
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
    setInputError('');
  };
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    setInputError('');
  };

  return (
    <div>
      <input type='text' value={amount} onChange={handleAmountChange} />
      <select value={fromCurrency} onChange={handleFromCurrencyChange}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={toCurrency} onChange={handleToCurrencyChange}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      {inputError ? (
        <p>{inputError}</p>
      ) : (
        <p>
          {convertedAmount !== null
            ? `Converted Amount: ${convertedAmount}`
            : 'OUTPUT'}
        </p>
      )}
    </div>
  );
}
