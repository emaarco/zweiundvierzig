"use strict";

const operatorEnum = (op) => {
    switch (op) {
        case "add":
            op = "+";
            break;
        case "subtract":
            op = "-";
            break;
        case "divide":
            op = "/";
            break;
        case "multiply":
            op = "*";
            break;
        case "calculate":
            op = "=";
            break;
        default:
            break;
    }
    console.log(op);
    return op;
};

export default operatorEnum;