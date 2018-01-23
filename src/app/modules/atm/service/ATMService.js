const Notes = require('../constant/Notes');
const Errors = require('../constant/Errors');

const isValidAmount = (amount) => {
    if (!amount || amount < 1) {
        return false;
    }
    return true;
};

const WithDraw = (amount) => {
    let withdrawAmount = parseFloat(amount);
    const availableNotes = Notes,
        result = [];

    if (!isValidAmount(withdrawAmount)) {
        throw new Error(Errors.InvalidArgument);
    }

    while (withdrawAmount > 0) {
        for (let i = 0; i < availableNotes.length; i++) {
            const note = availableNotes[i];
            if (withdrawAmount - note >= 0) {
                withdrawAmount -= note;
                result.push(note.toFixed(2));
                break;
            } else if (i === availableNotes.length - 1 && withdrawAmount > 0) {
                throw new Error(Errors.NoteUnavailable);
            }
        }
    }
    return result;
};

module.exports = {
    isValidAmount,
    WithDraw
};
