import { readFileSync } from 'fs';

/**
 * This file is responsible for mocking the 'index.html' document. 
 * Otherwise it wouldn´t be available in the jest tests
 */
const text = readFileSync("index.html", 'utf8');
document.body.innerHTML = text;