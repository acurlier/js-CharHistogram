"use strict";
// extends Map so that it returns a custom value an not null if a key is not present
class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }
    get(key) {
        if (this.has(key)) {
            return super.get(key);
        }
        else {
            return this.defaultValue;
        }
    }
}
// build character histogram from a text
class Histogram {
    constructor() {
        this.letterCount = new DefaultMap(0);
        this.totalLetters = 0;
    }
    add(text) {
        text = text.replace(/\s/g, "").toUpperCase(); // remove white spaces, and turn the whole text to uppercase
        for (let char of text) {
            let tempCount = this.letterCount.get(char);
            this.letterCount.set(char, tempCount + 1);
            this.totalLetters += 1;
        }
    }
    toString() {
        let entries = [...this.letterCount];
        // sort the array by count, then alphabetically
        entries.sort((a, b) => {
            if (a[1] === b[1]) { // if the char count is the same
                return a[0] < b[0] ? 1 : -1;
            }
            else {
                return b[1] - a[1];
            }
        });
        for (let entry of entries) {
            entry[1] /= (this.totalLetters * 100);
        }
        entries = entries.filter(entry => { entry[1] >= 1; }); // filter out char with frequency < 1%
        // convert the entries into lines of text
        entries.map(([char, n]) => `${char} : ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`);
    }
}
