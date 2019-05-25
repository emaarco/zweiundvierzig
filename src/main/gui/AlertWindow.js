'use strict'

import AlertMessage from "../data/AlertMessage.js";
import alertTypeEnum from "../enum/AlertTypeEnum.js";

/**
 * A class used to publish alerts on the gui to inform the user about his input actions
 */
export default class AlertWindow {

    constructor() {
        this.__currentDefaultAlert;
    }

    // ****************************************************************************************** //
    // ***************************** USER INPUT SPECIFIC ALERTS ********************************* // 

    /**
     * Shows a five seconds lasting alert to inform the user about an invalid keyboard event.
     * @param {String} buttonPressed asci-keycode of the pressed button
     */
    publishInvalidKeyboardInputWarning(buttonPressed) {
        const alertTitle = "WARNING";
        const alertDescription = buttonPressed + " is no valid calculator-Button";
        const alertNote = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);

        setTimeout(() => {
            this.__parseMessageToDocument(this.__getCurrentDefaultAlert());
        }, 2500);
    }


    /**
     * Publishes an alert to inform the user, that the calculator is turned off.
     */
    publishCalculatorOfflineAlert() {
        const alertTitle = "INFO";
        const alertDescription = "The calculator is currently turned off";
        const alertNote = "In case you want to make a calculation, you need to turn it on"

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.SECONDARY, alertTitle, alertDescription, alertNote, false)

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * Publishes an alert to inform the user, that the calculator is turned on
     */
    publishCalculatorOnlineAlert() {
        const alertTitle = "INFO";
        const alertDescription = "The calculator is turned on. You can enter your calculation now!";
        const alertNote = "You can use either your keyboard or the displayed buttons to enter a valid term.";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, true);

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

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMinusMinusIsPlusAlert() {
        const alertTitle = "EASTEREGG";
        const alertDescription = "You entered two consecutive minus signs, thats a plus!";
        const alertNote = "- + - = +";        

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

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
        
        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishTooManyOperatorAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "You are only allowed to use one operator per calculation!";
        const alertNote = "Hit equal before inserting next calculation!";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMissingFirstNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate with missing values!";
        const alertNote = "Please insert values!";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    publishMissingOperatorAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without an operator!";
        const alertNote = "Please enter an operator!";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);
        
        this.__parseMessageToDocument(newAlert);
    }

    publishMissingSecondNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without a second value!";
        const alertNote = "Enter a second value!";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
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

        const alertTitle = "THE VOID:";
        const alertDescription = "You can't delete nothing! Stop hitting backspace!";
        const alertNote = "Do you want to enter the void?";

        const newAlert = this.__buildDefaultAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);
        
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
     */
    __buildDefaultAlert(alertType, alertTitle, alertDescription, alertNote, isDefault) {
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
     * @param {AlertMessage} defaultAlert 
     */
    __setCurrentDefaultAlert(defaultAlert) {
        if (defaultAlert instanceof AlertMessage) {
            this.__currentDefaultAlert = defaultAlert;
        }
    }

    /**
     * Getter metohd to retrieve to current default alert
     * @returns current Default alert
     */
    __getCurrentDefaultAlert() {
        return this.__currentDefaultAlert;
    }
} 