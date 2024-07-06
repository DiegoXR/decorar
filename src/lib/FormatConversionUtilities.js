// This function converts a string of the format 10 x 20 

/**
 * @param {string} input
 * @param {boolean} [extractWidth]
 */
export function extractDimensionFromString(input, extractWidth){
    // Remove empty spaces from the string
    const formattedString = input.replace(/\s/g, '');

    // Detect 'x' character to split the string
    const parts = formattedString.split('x');

    // Extract the number before or after the 'x' and convert it to an integer
    let numberToReturn = 1;
    
    if (extractWidth){
        numberToReturn = parseFloat(parts[0]);
    }else{
        numberToReturn = parseFloat(parts[1]);
    }
     
    // Check if the first part is a valid integer
    if (!isNaN(numberToReturn)) {
        return numberToReturn;
    } else {
        console.log("Extracted dimension from string is not a number. Returned 1 by default");
        return 1; // Return null if the extraction fails
    }
}
