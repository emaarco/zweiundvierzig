"use strict";

import navigationTabStatusEnum from "../enum/NavigationTabStatusEnum.js";

export default class CalculationLogWindow {
    
    /**
     * 
     */
    switchToLastCalculationsTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("saveAndLoadTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
        document.getElementById("saveAndLoadContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
    }

    /**
     * 
     */
    switchToSaveAndLoadTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("saveAndLoadTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
        document.getElementById("saveAndLoadContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
    }

}