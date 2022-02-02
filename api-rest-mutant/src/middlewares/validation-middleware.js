'use strict';
import Validator from '../helpers/validate';
const isMutant = async (req, res, next) => {
    const validationRule = { 
        "dna": "required",
        "dna.*": "required|string|min:1", 
    };
    await Validator( req.body, validationRule, {
        required: 'Campo requerido. Olvidó dar un :attribute',
        string: 'Caracter es del tipo :attribute',
        min: 'Longitud miníma es 1'
    }, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
};

module.exports = {
    isMutant
};