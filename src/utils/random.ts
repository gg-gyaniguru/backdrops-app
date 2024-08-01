const random = (digits: number):string => {
    let random = '';
    do {
        let key = Math.floor(Math.random() * 123)
        if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
            random += String.fromCharCode(key);
        }
    } while (random.length < digits);
    return random;
};

export default random;