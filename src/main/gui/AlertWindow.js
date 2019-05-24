import AlertMessage from "../data/AlertMessage.js";
import alertTypeEnum from "../enum/AlertTypeEnum.js";

export default class AlertWindow {

    constructor() { }

    publishInvalidKeyboardInputWarning(buttonPressed) {
        let description = buttonPressed + " is no valid calculator-Button";
        let note = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC";

        let currentMessage = this.__getCurrentlyActiveAlert();

        let newMessage = new AlertMessage();
        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);

        setTimeout(() => {
            this.__parseMessageToDocument(currentMessage);
        }, 2500);
    }


    publishCalculatorOfflineAlert() {
        let description = "The calculator is currently turned off!";
        let note = "You need to turn it on, in order to generate calculations.";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.SECONDARY);
        newMessage.setAlertTitle("OFFLINE:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishCalculatorOnlineAlert() {
        let description = "The calculator is turned on. You can enter your calculation now!";
        let note = "You can use either your keyboard or the displayed buttons to enter a valid term.";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.INFO);
        newMessage.setAlertTitle("INFO:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    /**
     * The Following Alerts are Term Specific 
     */
    publishSeperatorAlreadySetAlert() {
        let description = "You have already set a seperator. ";
        let note = "You cant have two seperators in one number!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.INFO);
        newMessage.setAlertTitle("INFO:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishMinusMinusIsPlusAlert() {
        let description = "You entered two consecutive minus signs, thats a plus!";
        let note = "- + - = +";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.INFO);
        newMessage.setAlertTitle("Easteregg:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    /**
     * TODO: ADD ENUM FOR OPS
     * 
     * @param {*} op1 
     * @param {*} op2 
     */
    publishReplaceOperatorAlert(op1, op2) {
        let description = "You cant input two operators consecutively.";
        let note = "Replaced operator " + op1 + " with " + op2;
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.WARNING);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    } 

    publishTooManyOperatorAlert() {
        let description = "You are only allowed to use one operator per calculation!";
        let note = "Hit equal before inserting next calculation!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.WARNING);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishMissingFirstNumberAlert() {
        let description = "Can't calculate with missing values!";
        let note = "Please insert values!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.WARNING);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishMissingOperatorAlert() {
        let description = "Can't calculate without an operator!";
        let note = "Please enter an operator!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.WARNING);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishMissingSecondNumberAlert() {
        let description = "Can't calculate without a second value!";
        let note = "Enter a second value!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.WARNING);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishEnterTheVoidAlert(voidCount) {
        if (voidCount >= 5) {
            document.body.style.backgroundImage = "url('../../../img/The_Void.jpg')"; //https://wiki.godvillegame.com/images/f/f7/The_Void.jpg
            document.getElementsByClassName("container")[0].style.visibility = "hidden";
            
            setTimeout(() => {
                document.getElementsByClassName("container")[0].style.visibility = "visible";
                document.body.style.backgroundImage = "none";
            }, 5000);
        }
        let description = "You can't delete nothing! Stop hitting backspace!";
        let note = "Do you want to enter the void?";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("THE VOID:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    // ****************************************************************************************** //

    __getCurrentlyActiveAlert() {
        let alertMessage = new AlertMessage();

        alertMessage.setAlertType(document.getElementById("alertMessage").className);
        alertMessage.setAlertTitle(document.getElementById("alertHeading").innerHTML);
        alertMessage.setAlertDescription(document.getElementById("alertDescription").innerHTML);
        alertMessage.setAlertNote(document.getElementById("alertNote").innerHTML);

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