"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectCreateRq = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const projectCreateRq = () => [
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty().withMessage("El título es obligatorio")
        .isString().withMessage("El título debe ser texto"),
    (0, express_validator_1.body)("status")
        .notEmpty().withMessage("El estado es obligatorio")
        .isIn(Object.values(client_1.Status)).withMessage("Estado no válido"),
    (0, express_validator_1.body)("startDate")
        .notEmpty().withMessage("La fecha de inicio es obligatoria")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio debe estar en formato YYYY-MM-DD"),
    (0, express_validator_1.body)("endDate")
        .notEmpty().withMessage("La fecha de fin es obligatoria")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de fin debe estar en formato YYYY-MM-DD"),
    (0, express_validator_1.body)("timeSpentHours")
        .notEmpty().withMessage("Las horas invertidas son obligatorias")
        .isFloat({ min: 0 }).withMessage("Las horas deben ser un número positivo"),
    (0, express_validator_1.body)("teamSize")
        .notEmpty().withMessage("El tamaño del equipo es obligatorio")
        .isInt({ min: 1 }).withMessage("El equipo debe tener al menos 1 miembro"),
    (0, express_validator_1.body)("techStack")
        .isArray({ min: 1 }).withMessage("Debe incluir al menos una tecnología"),
    (0, express_validator_1.body)("reason")
        .trim()
        .notEmpty().withMessage("El motivo es obligatorio")
        .isString().withMessage("El motivo debe ser texto"),
    (0, express_validator_1.body)("learnings")
        .trim()
        .notEmpty().withMessage("Los aprendizajes son obligatorios")
        .isString().withMessage("Los aprendizajes deben ser texto"),
    (0, express_validator_1.body)("userId")
        .notEmpty().withMessage("El ID de usuario es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID de usuario debe ser un número entero positivo"),
];
exports.projectCreateRq = projectCreateRq;
