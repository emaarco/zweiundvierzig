'use strict';

import CalculationEventListener from "../../main/listener/CalculationEventListener.js"

test("Adding a subscriber successfully", () => {
    let calculationListener = new CalculationEventListener();
    calculationListener.addSubscriber("dummy");
    expect(calculationListener.subscribers.size).toBe(1);
});

test("Cannot add a subscriber as he is not inheriting from the CalculatorConsumerBase", () => {  
});

test("Send number event to every subscriber", () => {
});

test("Send operator event to every subscriber", () => {
    
});

test("Send special event to every subscriber", () => {
    
});
