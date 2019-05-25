'use strict'

import alertTypeEnum from "../enum/AlertTypeEnum.js";

export default class AlertMessage {

    constructor() {
        this.alertType;
        this.alertTitle;
        this.alertDescription;
        this.alertNote;
        this.isDefaultAlert;
    }

    setAlertType(alertType) {
        if (this.__alertTypeIsValid(alertType)) {
            this.alertType = alertType;
        }
    }

    setAlertTitle(alertTitle) {
        this.alertTitle = alertTitle;
    }

    setAlertDescription(alertDescription) {
        this.alertDescription = alertDescription;
    }

    setAlertNote(alertNote) {
        this.alertNote = alertNote;
    }

    setIsDefaultAlert(isDefault) {
        this.isDefaultAlert = isDefault;
    }

    __alertTypeIsValid(recievedAlertType) {
        for (let alertType in alertTypeEnum) {
            if (recievedAlertType === alertTypeEnum[alertType]) {
                return true;
            }
        }
        return false;
    }

}