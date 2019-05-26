'use strict'

import AlertMessage from "../data/AlertMessage.js";
import alertTypeEnum from "../enum/AlertTypeEnum.js";
import operatorEnum from "../enum/OperatorEnum.js";

/**
 * A class used to publish alerts on the gui to inform the user about his input actions
 */
export default class AlertWindow {

    constructor() {
        this.__currentDefaultAlert;
    }

<<<<<<< src/main/gui/AlertWindow.js
    // ****************************************************************************************** //
    // ***************************** USER INPUT SPECIFIC ALERTS ********************************* // 
=======
    publishInvalidKeyboardInputWarning(buttonPressed) {
        let description = buttonPressed + " is no valid calculator-Button";
        let note = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC";
>>>>>>> src/main/gui/AlertWindow.js

    /**
     * Shows a five seconds lasting alert to inform the user about an invalid keyboard event.
     * @param {String} buttonPressed asci-keycode of the pressed button
     */
    publishInvalidKeyboardInputWarning(buttonPressed) {
        const alertTitle = "WARNING";
        const alertDescription = buttonPressed + " is no valid calculator-Button";
        const alertNote = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC";

<<<<<<< src/main/gui/AlertWindow.js
        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);
=======
        let newMessage = new AlertMessage();
        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);
>>>>>>> src/main/gui/AlertWindow.js

        this.__parseMessageToDocument(newAlert);

        setTimeout(() => {
            this.__parseMessageToDocument(this.__getCurrentDefaultAlert());
        }, 2500);
    }


    /**
     * Publishes an alert to inform the user, that the calculator is turned off.
     */
    publishCalculatorOfflineAlert() {
<<<<<<< src/main/gui/AlertWindow.js
        const alertTitle = "INFO";
        const alertDescription = "The calculator is currently turned off";
        const alertNote = "In case you want to make a calculation, you need to turn it on"

        const newAlert = this.__buildAlert(alertTypeEnum.SECONDARY, alertTitle, alertDescription, alertNote, false)
=======
        let description = "The calculator is currently turned off!";
        let note = "You need to turn it on, in order to generate calculations.";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.SECONDARY);
        newMessage.setAlertTitle("OFFLINE:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);
>>>>>>> src/main/gui/AlertWindow.js

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * Publishes an alert to inform the user, that the calculator is turned on
     */
    publishCalculatorOnlineAlert() {
<<<<<<< src/main/gui/AlertWindow.js
        const alertTitle = "INFO";
        const alertDescription = "The calculator is turned on. You can enter your calculation now!";
        const alertNote = "You can use either your keyboard or the displayed buttons to enter a valid term.";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, true);
=======
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

    publishReplaceOperatorAlert(op1, op2) {
        let description = "You cant input two operators consecutively.";
        let note = "Replaced operator " + operatorEnum(op1) + " with " + operatorEnum(op2);
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.DANGER);
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

        newMessage.setAlertType(alertTypeEnum.DANGER);
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

    publishDivisionZero() {
        let description = "Division through 0 is not allowed!";
        let note = "Please enter a Value bigger than 0!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishInvalidTerm() {
        let description = "Invalid Term!";
        let note = "Please enter a valid Value!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);

        this.__parseMessageToDocument(newMessage);
    }

    publishInvalidOperator() {
        let description = "Invalid Term!";
        let note = "Please enter a valid Operator!";
        let newMessage = new AlertMessage();

        newMessage.setAlertType(alertTypeEnum.DANGER);
        newMessage.setAlertTitle("WARNING:");
        newMessage.setAlertDescription(description);
        newMessage.setAlertNote(note);
>>>>>>> src/main/gui/AlertWindow.js

        this.__parseMessageToDocument(newAlert);
    }

    // ****************************************************************************************** //
    // ***************************** TERM SPECIFIC ALERTS *************************************** // 

    /**
     * 
     */    
    publishSeperatorAlreadySetAlert() {
        const alertTitle = "INFO";
        const alertDescription = "You have already set a seperator!";
        const alertNote = "You cant have two seperators in one number!";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMinusMinusIsPlusAlert() {
        const alertTitle = "EASTEREGG";
        const alertDescription = "You entered two consecutive minus signs, thats a plus!";
        const alertNote = "- + - = +";        

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * TODO: ADD ENUM FOR OPS
     * 
     * @param {*} op1 
     * @param {*} op2 
     */
    publishReplaceOperatorAlert(op1, op2) {
        const alertTitle = "WARNING:";
        const alertDescription = "You cant input two operators consecutively.";
        const alertNote = "Replaced operator " + op1 + " with " + op2;
        
        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishTooManyOperatorAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "You are only allowed to use one operator per calculation!";
        const alertNote = "Hit equal before inserting next calculation!";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMissingFirstNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate with missing values!";
        const alertNote = "Please insert values!";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMissingOperatorAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without an operator!";
        const alertNote = "Please enter an operator!";

<<<<<<< src/main/gui/AlertWindow.js
        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);
        
        this.__parseMessageToDocument(newAlert);
    }

    publishMissingSecondNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without a second value!";
        const alertNote = "Enter a second value!";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishEnterTheVoidAlert(voidCount) {
        if (voidCount >= 5) {
            document.body.style.backgroundImage = "url('../../../img/The_Void.jpg')"; //https://wiki.godvillegame.com/images/f/f7/The_Void.jpg
            document.getElementsByClassName("container")[0].style.visibility = "hidden";
=======
        alertMessage.setAlertType(document.getElementById("alertMessage").className);
        alertMessage.setAlertTitle(document.getElementById("alertHeading").innerHTML);
        alertMessage.setAlertDescription(document.getElementById("alertDescription").innerHTML);
        alertMessage.setAlertNote(document.getElementById("alertNote").innerHTML);
>>>>>>> src/main/gui/AlertWindow.js

            setTimeout(() => {
                document.getElementsByClassName("container")[0].style.visibility = "visible";
                document.body.style.backgroundImage = "none";
            }, 5000);
        }

        const alertTitle = "THE VOID:";
        const alertDescription = "You can't delete nothing! Stop hitting backspace!";
        const alertNote = "Do you want to enter the void?";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);
        
        this.__parseMessageToDocument(newAlert);
    }

    /**
     * Publishes an alert to inform the user, that the calculation has been deleted. 
     */
    publishClearAllAlert() {
        const alertTitle = "INFO:";
        const alertDescription = "Your recent calculation has been deleted";
        const alertNote = "You can now start entering a new calculation";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    // ****************************************************************************************** //
    // ***************************** PRIVATE HELPER METHODS ************************************* // 

    /**
     * Factory method to create a new alert.
     * Will set the alert created, as the default alert, in case 'isDefault' is true
     * @param {alertTypeEnum} alertType type of the alert (css-id / class type)
     * @param {String} alertTitle alert title to be shown in the gui
     * @param {String} alertDescription alert description to be shown in the gui
     * @param {String} alertNote alert note to be shown in the gui
     * @param {boolean} isDefault defines whether the alert is an default alert or not
     * @returns {AlertMessage} the alert, created
     */
    __buildAlert(alertType, alertTitle, alertDescription, alertNote, isDefault) {
        const newAlert = new AlertMessage(alertType, alertTitle, alertDescription, alertNote, isDefault);

        newAlert.setAlertType(alertType);
        newAlert.setAlertTitle(alertTitle);
        newAlert.setAlertDescription(alertDescription);
        newAlert.setAlertNote(alertNote);
        newAlert.setIsDefaultAlert(isDefault);

        if (newAlert.isDefaultAlert) {
            this.__currentDefaultAlert = newAlert;
        }

        return newAlert;   
    }

    /**
     * Displays a new alert in the gui
     * @param {AlertMessage} alertMessage alert to be shown in the gui
     */
    __parseMessageToDocument(alertMessage) {
        if (alertMessage instanceof AlertMessage) {
            document.getElementById("alertMessage").className = alertMessage.alertType;
            document.getElementById("alertHeading").innerHTML = alertMessage.alertTitle;
            document.getElementById("alertDescription").innerHTML = alertMessage.alertDescription;
            document.getElementById("alertNote").innerHTML = alertMessage.alertNote;
        }
    }

    /**
     * Setter method to set a default Alert
     * @param {AlertMessage} defaultAlert new default alert
     */
    __setCurrentDefaultAlert(defaultAlert) {
        if (defaultAlert instanceof AlertMessage) {
            this.__currentDefaultAlert = defaultAlert;
        }
    }

    /**
     * Getter metohd to retrieve to current default alert
     * @returns {AlertMessage} current Default alert
     */
    __getCurrentDefaultAlert() {
        return this.__currentDefaultAlert;
    }
} 