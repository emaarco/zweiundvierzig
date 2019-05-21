import calculatorButtonIdEnum from "../enum/CalculatorButtonIdEnum.js";

export default class CalculatorWindow {

    constructor() {}

    changeActivationStatus(calculatorIsOn) {

        calculatorButtonIdEnum.numberButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = !calculatorIsOn;
        });
        calculatorButtonIdEnum.operationButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = !calculatorIsOn;
        });
        calculatorButtonIdEnum.seperatorButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = !calculatorIsOn;
        });
        calculatorButtonIdEnum.clearButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = !calculatorIsOn;
        });
        calculatorButtonIdEnum.lastResultButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = !calculatorIsOn;
        });
        this.__changeColorOfOnOffButton(calculatorIsOn);
    }

    /**
     * 
     */
    setupCalculatorButtonColors() {  
        calculatorButtonIdEnum.numberButton.forEach((bttnId) => {
            document.getElementById(bttnId)
        });
        calculatorButtonIdEnum.operationButton.forEach((bttnId) => {
            document.getElementById(bttnId).style.backgroundColor = "#ffebcc";
        });
        calculatorButtonIdEnum.clearButton.forEach((bttnId) => {
            document.getElementById(bttnId).style.backgroundColor = "#ffd6cc"
        });
        this.__changeColorOfOnOffButton(true);
    }

    /**
     * 
     * @param {Boolean} calculatorIsOn 
     */
    __changeColorOfOnOffButton(calculatorIsOn) {
        if (calculatorIsOn) {
            calculatorButtonIdEnum.onOffButton.forEach((bttnId) => {
                document.getElementById(bttnId).style.backgroundColor = "#ffd6cc";
            });
        } else {
            calculatorButtonIdEnum.onOffButton.forEach((bttnId) => {
                document.getElementById(bttnId).style.backgroundColor = "#e5ffe5";
            });
        }
    }

}