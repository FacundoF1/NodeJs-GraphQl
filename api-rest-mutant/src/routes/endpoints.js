'use strict';
import router from '../components/mutants/routes';
module.exports = (app) => {
    app.use('/', router);
};