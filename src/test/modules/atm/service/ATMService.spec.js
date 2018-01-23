const expect = require('chai').expect;
const ATMService = require('../../../../app/modules/atm/service');

describe('Validate Amount', function() {
    it('ATMService.isValidAmount() should return ' +
        'false if 0 amount passed in', function() {
        expect(ATMService.isValidAmount(0)).to.equal(false);
    });

    it('ATMService.isValidAmount() should return ' +
        'false if -1 amount passed in', function() {
        expect(ATMService.isValidAmount(-1)).to.equal(false);
    });

    it('ATMService.isValidAmount() should return ' +
        'false if -0001 amount passed in', function() {
        //disalbe Octal literals should not be used
        /*eslint-disable */
        expect(ATMService.isValidAmount(-0001)).to.equal(false);
    });

    it('ATMService.isValidAmount() should return ' +
        'false if -000109 amount passed in', function() {
        //disalbe Octal literals should not be used
        /*eslint-disable */
        expect(ATMService.isValidAmount(-000109)).to.equal(false);
    });

    it('ATMService.isValidAmount() should return ' +
        'true if 10 amount passed in', function() {
        expect(ATMService.isValidAmount(10)).to.equal(true);
    });
});

describe('Withdraw Cash', function() {

    it('ATMService.WithDraw() should throw ' +
        'InvalidArgument if -1.00 amount passed in', function() {
        try {
            ATMService.WithDraw('-1.00');
        } catch (e) {
            expect(e.message).to.equal('InvalidArgument');
        }
    });

    it('ATMService.WithDraw() should throw ' +
        'NoteUnavailable if 15 amount passed in', function() {
        try {
            ATMService.WithDraw('15.00');
        } catch (e) {
            expect(e.message).to.equal('NoteUnavailable');
        }
    });

    it('ATMService.WithDraw() should throw ' +
        'NoteUnavailable if 3 amount passed in', function() {
        try {
            ATMService.WithDraw(3.00);
        } catch (e) {
            expect(e.message).to.equal('NoteUnavailable');
        }
    });

    it('ATMService.WithDraw() should throw ' +
        'NoteUnavailable if 99 amount passed in', function() {
        try {
            ATMService.WithDraw(99.00);
        } catch (e) {
            expect(e.message).to.equal('NoteUnavailable');
        }
    });

    it('ATMService.WithDraw() should throw ' +
        'NoteUnavailable if 105 amount passed in', function() {
        try {
            ATMService.WithDraw(105.00);
        } catch (e) {
            expect(e.message).to.equal('NoteUnavailable');
        }
    });

    it('ATMService.WithDraw() should throw ' +
        'NoteUnavailable if 20.5 amount passed in', function() {
        try {
            ATMService.WithDraw(20.5);
        } catch (e) {
            expect(e.message).to.equal('NoteUnavailable');
        }
    });

    it('ATMService.WithDraw() should return ' +
        'array [10.00] if 10.00 amount passed in', function() {
        const notes = ATMService.WithDraw(10.00);
        expect(notes).to.have.ordered.members(['10.00']);
    });

    it('ATMService.WithDraw() should return ' +
        'array  [20.00] if 20.00 amount passed in', function() {
        const notes = ATMService.WithDraw(20.00);
        expect(notes).to.have.ordered.members(['20.00']);
    });

    it('ATMService.WithDraw() should return ' +
        'array  [20.00, 10.00] if 30.00 amount passed in', function() {
        const notes = ATMService.WithDraw(30.00);
        expect(notes).to.have.ordered.members(['20.00', '10.00']);
    });

    it('ATMService.WithDraw() should return ' +
        'array  [50.00, 20.00, 10.00] if 80.00 amount passed in', function() {
        const notes = ATMService.WithDraw(80.00);
        expect(notes).to.have.ordered.members(['50.00', '20.00', '10.00']);
    });

    it('ATMService.WithDraw() should return ' +
        'array  [50,00, 20.00, 20.00] if 90.00 amount passed in', function() {
        const notes = ATMService.WithDraw(90.00);
        expect(notes).to.have.ordered.members(['50.00', '20.00', '20.00']);
    });

    it('ATMService.WithDraw() should return ' +
        'array  [100.00] if 100.00 amount passed in', function() {
        const notes = ATMService.WithDraw(100.00);
        expect(notes).to.have.ordered.members(['100.00']);
    });
});
