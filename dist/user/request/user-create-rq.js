"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateRq = void 0;
const express_validator_1 = require("express-validator");
const userCreateRq = () => [
    (0, express_validator_1.body)("firstName")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    (0, express_validator_1.body)("lastName")
        .trim()
        .notEmpty().withMessage("El apellido es obligatorio")
        .isString().withMessage("El apellido debe ser texto")
        .isLength({ min: 6 }).withMessage("El apellido debe tener al menos 6 caracteres"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido")
];
exports.userCreateRq = userCreateRq;
