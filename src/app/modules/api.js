const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../../../APIdoc/swagger.json');
const atmHandler = require('./atm');
const api = require('../api');
const config = require('../config');
const {app_path} = config.get('api');

const apiRoutes = function(middleware) {
    try {
        const router = express.Router();
        const {api: {cors}} = middleware;
        // enable CORS
        router.use(cors());

        router.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        router.use(`${app_path}/cash-machine`, atmHandler.routes(api.http));

        return router;
    } catch (e) {
        console.log(e);
    }
};

module.exports = apiRoutes;
