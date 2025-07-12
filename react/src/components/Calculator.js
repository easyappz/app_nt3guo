import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../styles/Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    setWaitingForSecondValue(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleSignChange = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) * -1).toString());
    }
  };

  const handlePercentage = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) / 100).toString());
    }
  };

  const buttons = [
    { label: 'AC', action: handleClearClick, className: 'button-grey' },
    { label: '+/-', action: handleSignChange, className: 'button-grey' },
    { label: '%', action: handlePercentage, className: 'button-grey' },
    { label: '÷', action: () => handleOperationClick('÷'), className: 'button-orange' },
    { label: '7', action: () => handleNumberClick('7'), className: 'button-dark' },
    { label: '8', action: () => handleNumberClick('8'), className: 'button-dark' },
    { label: '9', action: () => handleNumberClick('9'), className: 'button-dark' },
    { label: '×', action: () => handleOperationClick('×'), className: 'button-orange' },
    { label: '4', action: () => handleNumberClick('4'), className: 'button-dark' },
    { label: '5', action: () => handleNumberClick('5'), className: 'button-dark' },
    { label: '6', action: () => handleNumberClick('6'), className: 'button-dark' },
    { label: '-', action: () => handleOperationClick('-'), className: 'button-orange' },
    { label: '1', action: () => handleNumberClick('1'), className: 'button-dark' },
    { label: '2', action: () => handleNumberClick('2'), className: 'button-dark' },
    { label: '3', action: () => handleNumberClick('3'), className: 'button-dark' },
    { label: '+', action: () => handleOperationClick('+'), className: 'button-orange' },
    { label: '0', action: () => handleNumberClick('0'), className: 'button-dark span-two' },
    { label: '.', action: () => handleNumberClick('.'), className: 'button-dark' },
    { label: '=', action: handleEqualsClick, className: 'button-orange' }
  ];

  return (
    <Box className="calculator-container">
      <Box className="calculator-display">
        <Typography variant="h3" className="display-text">
          {display}
        </Typography>
      </Box>
      <Box className="calculator-buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            variant="contained"
            className={`calculator-button ${btn.className} ${btn.label === '0' ? 'span-two' : ''}`}
            onClick={btn.action}
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Calculator;
