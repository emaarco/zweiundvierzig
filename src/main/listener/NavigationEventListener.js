export default class NavigationEventListener {

    constructor(calculationLogWindow) {
        this.__calculationLogWindow = calculationLogWindow;
    }
    
    pressedLastCalculationsTab() {
        this.__calculationLogWindow.switchToLastCalculationsTab();
    }

    pressedSaveAndLoadTab() {
        this.__calculationLogWindow.switchToSaveAndLoadTab();
    }
}