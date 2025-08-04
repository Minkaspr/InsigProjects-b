"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateRq = void 0;
const express_validator_1 = require("express-validator");
const userUpdateRq = () => [
    (0, express_validator_1.body)("firstName")
        .optional()
        .trim()
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    (0, express_validator_1.body)("lastName")
        .optional()
        .trim()
        .isString().withMessage("El apellido debe ser texto")
        .isLength({ min: 6 }).withMessage("El apellido debe tener al menos 6 caracteres"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .isEmail().withMessage("Debe ser un email válido")
];
exports.userUpdateRq = userUpdateRq;
