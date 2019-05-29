"use strict";

import CalculationLogWindow from "../../main/gui/CalculationLogWindow.js";
import NavigationEventListener from "../../main/listener/NavigationEventListener.js";

// create mocks
jest.mock("../../main/gui/CalculationLogWindow.js")

// Initialize the instances needed
const calculationLogWindow = new CalculationLogWindow();
const listenerUnderTest = new NavigationEventListener(calculationLogWindow);

test ("switch to last calculations tab when action occured", () => {
    listenerUnderTest.pressedLastCalculationsTab();
    expect(calculationLogWindow.switchToLastCalculationsTab).toHaveBeenCalledTimes(1);
});

test ("switch to save/load tab when action occured", () => {
    listenerUnderTest.pressedSaveAndLoadTab();
    expect(calculationLogWindow.switchToSaveAndLoadTab).toHaveBeenCalledTimes(1);
});


