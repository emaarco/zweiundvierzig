class TermBuilder {

    constructor(term, calculator, alertWindow) {
        this.term = term;
        this.calculator = calculator
        this.alertWindow = alertWindow;
    }

    // TODO: 
    // insert alerts
    // do proper comments
    // add proper return to display > need marco
    // add special event deleteall (CLA) and delete (CLE) lookup enum 
    consumeNumberEvent(num) {
        if (this.term.num1.slice(-1) === "." || this.term.num2.slice(-1)) {
            // insert alert command
            console.log("You already set the seperator");
        } else if (num === "." && this.term.flag === "num1" && this.term.num1.includes(".")) {
            // insert alert command
            console.log("You already set the seperator");
        } else if (num === "." && this.term.flag === "num2" && this.term.num2.includes(".")) {
            // insert alert command
            console.log("you already set the seperator");
        } else {
            // concat the number/seperator to num string
            if (operator === "") {
                this.term.num1.concat(num);
            } else {
                this.term.num2.concat(num);
                this.term.flag = "num2";
            }
        }
    }
   
    consumerOperatorEvent(operator) {
        this.term.flag = "operator";

        // Gimmick: minus und minus ist plus
        if (this.term.operator === "subtract" && operator === "subtract") {
            this.term.operator = "add";
            // insert INFO
            console.log("new Operator is +, because - and - is +")
        } else if (this.term.operator !== "") {
            this.term.operator = operator;
            // insert alert or info?
            // insert mapping from add to + etc
            console.log("Replaced operator {} with {}", this.term.operator, operator);
        } else {
            this.term.operator = operator;
        }
    }

    consumeCalculateEvent(calculate) {
        if (this.term.num1 === "") {
            // alert
            console.log("Please enter first number");
        } else if (this.term.operator === "") {
            // alert
            console.log("please enter a operator and second number");
        } else if (this.term.num2 === "") {
            // alert
            console.log("Please enter second number");
        } else {
            // call calculator
            calculator.calculate(this.term);
            this.term.flag = "result";
        }
    }
    
    // auch termübergreifend löschen (zb num1 wenn bereits in flag num2)
    consumeSpecialEvent(special) {
        if (this.term.flag === "result") {
            this.term.result =  this.term.result.slice(0, this.term.result.length-1);
            if (this.term.result === "") {
                this.term.flag === "num2";
            }
        } else if (this.term.flag === "num2") {
            this.term.num2 = this.term.num2.slice(0, this.term.num2.length-1);
            if (this.term.num2 === "") {
                this.term.flag === "operator";
            }
        } else if (this.term.flag === "operator") {
            this.term.operator = "";
            this.term.flag = "num1";
        } else if (this.term.flag === "num1") {
            if (this.term.num1 === "") {
                // info
                console.log("You cant delete the emptiness");
            } else {
                this.term.num1 = this.term.num1.slice(0, this.term.num1.length-1);
            }
        }
    }
}