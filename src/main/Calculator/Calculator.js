'use strict';

class Calculator {

    constructor(term) {
        this.num1 = term.num1;
        this.operator = term.operator;
        this.num2 = term.num2;
    }

    calculate () {
        let result = ''; 
        
        if (this.operator === 'add') {
            result = parseFloat(this.num1) + parseFloat(this.num2);
        } else if (operator === 'multiply') {
            result = parseFloat(this.num1) * parseFloat(this.num2);
        } else if (operator === 'subtract') {
            result = parseFloat(this.num1) - parseFloat(this.num2);
        } else if (operatoren === 'divide') {
            result = parseFloat(this.num1) / parseFloat(this.num2);
        }
    
        return result;
    }
}
