// Format number to Indian currency format (e.g., 1,00,000)
export const formatIndianNumber = (num) => {
    if (!num) return '';
    const numStr = num.toString();
    const [wholePart, decimalPart] = numStr.split('.');

    // Format whole part with Indian number system
    const lastThree = wholePart.substring(wholePart.length - 3);
    const otherNumbers = wholePart.substring(0, wholePart.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;

    // Add decimal part if exists
    return decimalPart ? `${formatted}.${decimalPart}` : formatted;
};

// Parse Indian formatted number back to regular number
export const parseIndianNumber = (formattedNum) => {
    if (!formattedNum) return '';
    return formattedNum.replace(/,/g, '');
}; 