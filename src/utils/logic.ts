const shortener = (input: number): string => {

    const digits = `${input}`;

    if (digits.length === 3) {
        return `${digits.substring(0, 1)}H`;
    }
    if (digits.length === 4) {
        return `${digits.substring(0, 1)}T`;
    }
    if (digits.length === 5) {
        return `${digits.substring(0, 2)}T`;
    }
    if (digits.length === 6) {
        return `${digits.substring(0, 1)}L`;
    }
    if (digits.length === 7) {
        return `${digits.substring(0, 1)}M`;
    }
    return digits;
};

export {shortener};