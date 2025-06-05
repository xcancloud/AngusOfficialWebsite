const round = (num) => {
    if (!num && num !== 0) {
        return '';
    }

    let roundedNumber = Math.round(Number(num) * 100) / 100 + '';
    if (roundedNumber.indexOf('.') !== -1) {
        const decimalPlaces = roundedNumber.substring(roundedNumber.indexOf('.'));
        if (decimalPlaces.length === 2) {
            roundedNumber = roundedNumber + '0';
        }
    } else {
        roundedNumber = roundedNumber + '.00';
    }

    return roundedNumber;
};

export { round };
export default { round };