import CalculatorWindow from "../gui/CalculatorWindow.js";

export default class CalculatorOnOffEventListener {

    /**
     * 
     * @param {CalculatorWindow} calculatorWindow 
     * @param {AlertWindow} alertWindow 
     */
    constructor(calculatorWindow, alertWindow) {
        this.__calculatorWindow = calculatorWindow;
        this.__alertWindow = alertWindow;
        this.__calculatorIsOn = true;
    }


    consumeOnOffEvent() {
        this.__calculatorIsOn = !this.__calculatorIsOn;
        this.__calculatorWindow.changeActivationStatus(this.__calculatorIsOn);
        if (!this.__calculatorIsOn) {
            this.__alertWindow.publishCalculatorOfflineAlert();
        } else {
            this.__alertWindow.publishCalculatorOnlineAlert();
        }
    }
}