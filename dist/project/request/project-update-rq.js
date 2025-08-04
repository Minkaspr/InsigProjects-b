"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectUpdateRq = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const projectUpdateRq = () => [
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .isString().withMessage("El título debe ser texto"),
    (0, express_validator_1.body)("status")
        .optional()
        .isIn(Object.values(client_1.Status)).withMessage("Estado no válido"),
    (0, express_validator_1.body)("startDate")
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio debe estar en formato YYYY-MM-DD"),
    (0, express_validator_1.body)("endDate")
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de fin debe estar en formato YYYY-MM-DD"),
    (0, express_validator_1.body)("timeSpentHours")
        .optional()
        .isFloat({ min: 0 }).withMessage("Las horas deben ser un número positivo"),
    (0, express_validator_1.body)("teamSize")
        .optional()
        .isInt({ min: 1 }).withMessage("El equipo debe tener al menos 1 miembro"),
    (0, express_validator_1.body)("techStack")
        .optional()
        .isArray({ min: 1 }).withMessage("Debe incluir al menos una tecnología"),
    (0, express_validator_1.body)("reason")
        .optional()
        .trim()
        .isString().withMessage("El motivo debe ser texto"),
    (0, express_validator_1.body)("learnings")
        .optional()
        .trim()
        .isString().withMessage("Los aprendizajes deben ser texto"),
    (0, express_validator_1.body)("userId")
        .optional()
        .isInt({ min: 1 }).withMessage("El ID de usuario debe ser un número entero positivo"),
];
exports.projectUpdateRq = projectUpdateRq;
