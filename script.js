class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement;
      this.currentOperandElement = currentOperandElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      if (this.currentOperand === '0') return;
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      if (this.currentOperand === '' || this.currentOperand === '-') {
        this.currentOperand = '0';
      }
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      if (this.currentOperand === '0' && number !== '.') {
        this.currentOperand = number.toString();
      } else {
        this.currentOperand = this.currentOperand.toString() + number.toString();
      }
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = `${this.currentOperand} ${operation}`;
      this.currentOperand = '0';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (this.operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': 
          computation = current === 0 ? 'Error' : prev / current;
          break;
        case '%': computation = prev % current; break;
        default: return;
      }
  
      this.currentOperand = computation.toString();
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    updateDisplay() {
      this.currentOperandElement.innerText = this.currentOperand;
      this.previousOperandElement.innerText = this.previousOperand;
    }
  }
  
  const prevElement = document.getElementById('previous-operand');
  const currElement = document.getElementById('current-operand');
  const calculator = new Calculator(prevElement, currElement);
  
  document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.getAttribute('data-number'));
      calculator.updateDisplay();
    });
  });
  
  document.querySelectorAll('[data-operation]').forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.getAttribute('data-operation'));
      calculator.updateDisplay();
    });
  });
  
  document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
