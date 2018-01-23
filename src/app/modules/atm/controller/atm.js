const ATMService = require('../service');

const WithDraw = ({options}) => {
    return new Promise(resolve => {
        try {
            const {params} = options;
            return resolve({Result: ATMService.WithDraw(params.amount)});
        } catch (e) {
            if (e.message === 'InvalidArgument') {
                return resolve({code: 400, message: e.message});
            }
            if (e.message === 'NoteUnavailable') {
                return resolve({code: 200, message: e.message});
            }
        }
    });
};

module.exports = {
    WithDraw
};
