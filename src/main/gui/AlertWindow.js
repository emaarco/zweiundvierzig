import AlertMessage from "../data/AlertMessage.js";
import alertTypeEnum from "../enum/AlertTypeEnum.js";

export default class AlertWindow {

    constructor() { }

    publishInvalidKeyboardInputWarning(buttonPressed) {
        let description = buttonPressed + " is no valid calculator-Button";
        let note = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC"

        let currentMessage = this.__getCurrentlyActiveAlert();

        let newMessage = new AlertMessage();
        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note)

        this.__parseMessageToDocument(newMessage);

        setTimeout(() => {
            this.__parseMessageToDocument(currentMessage);
        }, 2500);
    }


    publishCalculatorOfflineAlert() {
        let description = "The calculator is currently turned off!";
        let note = "You need to turn it on, in order to generate calculations."
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.SECONDARY);
        newMessage.setAlertTitle("OFFLINE:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note)

        this.__parseMessageToDocument(newMessage);
    }

    publishCalculatorOnlineAlert() {
        let description = "The calculator is turned on. You can enter your calculation now!";
        let note = "You can use either your keyboard or the displayed buttons to enter a valid term."
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.INFO);
        newMessage.setAlertTitle("INFO:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note)

        this.__parseMessageToDocument(newMessage);
    }

    // ****************************************************************************************** //

    __getCurrentlyActiveAlert() {
        let alertMessage = new AlertMessage();

        alertMessage.setAlertType(document.getElementById("alertMessage").className);
        alertMessage.setAlertTitle(document.getElementById("alertHeading").innerHTML)
        alertMessage.setAlertDescription(document.getElementById("alertDescription").innerHTML)
        alertMessage.setAlertNote(document.getElementById("alertNote").innerHTML)

        return alertMessage;
    }

    __parseMessageToDocument(alertMessage) {
        if (alertMessage instanceof AlertMessage) {
            document.getElementById("alertMessage").className = alertMessage.alertType;
            document.getElementById("alertHeading").innerHTML = alertMessage.alertTitle;
            document.getElementById("alertDescription").innerHTML = alertMessage.alertDescription;
            document.getElementById("alertNote").innerHTML = alertMessage.alertNote;
        }
    }
} 