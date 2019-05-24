'use strict'

import keyboardToCalculatorEventMappingEnum from "../../main/enum/KeyboardToCalculatorEventMappingEnum.js";
import KeyboardToCalculatorMapper from "../../main/mapper/KeyboardToCalculatorMapper.js"

 /***
  * Enum will map the keyboardInput into an corresponding calculatorEvent
  */
test("Successfull mapping from keyboardEvent to calculatorEvent using a valid event", () => {
    let resp1 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("Backspace");
    let resp2 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("Enter");
    let resp3 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("Escape");
    let resp4 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent(",");
    let resp5 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("+");
    let resp6 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("-");
    let resp7 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("/");
    let resp8 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("*");
    let resp9 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("=");
    
    expect(resp1).toBe(keyboardToCalculatorEventMappingEnum.Backspace);
    expect(resp2).toBe(keyboardToCalculatorEventMappingEnum.Enter);
    expect(resp3).toBe(keyboardToCalculatorEventMappingEnum.Escape);
    expect(resp4).toBe(keyboardToCalculatorEventMappingEnum[","]);
    expect(resp5).toBe(keyboardToCalculatorEventMappingEnum["+"]);
    expect(resp6).toBe(keyboardToCalculatorEventMappingEnum["-"]);
    expect(resp7).toBe(keyboardToCalculatorEventMappingEnum["/"]);
    expect(resp8).toBe(keyboardToCalculatorEventMappingEnum["*"]);
    expect(resp9).toBe(keyboardToCalculatorEventMappingEnum["="]);
});

/***
 * Invalid request => requestEvent => responseEvent - no mapping possible
 */
test("Failing mapping due to invalid keyboardEvent", () => {
    let resp1 = KeyboardToCalculatorMapper.mapKeyboardToCalculatorEvent("invalidDummy");
    expect(resp1).toBe(resp1);
});


