/**
 * @description
 * This function takes a string and an array of strings, and returns
 * a string of comma-separated values that match the given string.
 * The given string is matched against the first character of each
 * string in the array, and if there is a match, the rest of the
 * string from the array is compared to the given string. If there
 * is a match, the string is added to the set of suggestions.
 * @param {string} inputString - The string to compare against
 * @param {array} source - The array of strings to compare against
 * @returns {string} - A string of comma-separated values that match
 */
const autoSuggestion = (inputString, source) => {
    let suggestions = new Set();
    let suggestionsMap = new Set();
    if (!inputString) {
        return;
    }
    for (let i = 0; i < inputString.length; i++) {
        let firstCharacter = inputString[0].toLowerCase();
        for (let j = 0; j < source.length; j++) {
            for (let k = 0; k < source[j].length; k++) {
                if (firstCharacter === source[j][k].toLowerCase()) {
                    let subString = source[j].slice(k, k + inputString.length);
                    if (subString.toLowerCase() == inputString.toLowerCase()) {
                        //console.log('Suggestion: ' + testCon[j]);
                        suggestions.add(source[j]);
                        suggestionsMap.add(j);
                    }
                }
            }
        }
    }
    return [Array.from(suggestionsMap), Array.from(suggestions)];
    //return suggestions;
    //console.log(userNameInputField.value);
};

// let testCon = [
//     'Waffle',
//     'Chocolate Waffle',
//     'Cupcake',
//     'Banana Fondant',
//     'Hot Chocolate',
// ];

// console.log('Suggestions: ', autoSuggestion('Waf', testCon));

export default autoSuggestion;
