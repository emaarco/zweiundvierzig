import alertTypeEnum from "../enum/AlertTypeEnum.js";

export default class AlertMessage {

    constructor() {
        this.alertType;
        this.alertTitle;
        this.alertDescription;
        this.alertNote;
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

    __alertTypeIsValid(recievedAlertType) {
        for (let alertType in alertTypeEnum) {
            if (recievedAlertType === alertTypeEnum[alertType]) {
                return true;
            }
        }
        return false;
    }
}