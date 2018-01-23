const express = require('express');
const ATMController = require('../controller');
const router = express.Router();

function ATMRoutes(handler) {
    router.route('/withdraw/:amount')
        .get(handler(ATMController.WithDraw));
    return router;
}
module.exports = ATMRoutes;
