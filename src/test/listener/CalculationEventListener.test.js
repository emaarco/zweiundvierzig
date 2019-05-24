'use strict';

import CalculationEventListener from "../../main/listener/CalculationEventListener.js"

// Initializing the test instances / mocks
const listenerUnderTest = new CalculationEventListener();
const subscribers = new Set();

test("Dummy", () => {
    expect(true).toBe(true);
});


//TODO: tests as soon as the consumer class is available
/*
test("Adding a subscriber successfully", () => {
    
});

test("Cannot add a subscriber as he is not inheriting from the CalculatorConsumerBase", () => {  
});

test("Send number event to every subscriber", () => {
});

test("Send operator event to every subscriber", () => {
    
});

test("Send special event to every subscriber", () => {
    
});
*/
