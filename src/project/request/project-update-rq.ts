import { body } from "express-validator";
import { Status } from "@prisma/client";

export const projectUpdateRq = () => [
  body("title")
    .optional()
    .trim()
    .isString().withMessage("El título debe ser texto"),

  body("status")
    .optional()
    .isIn(Object.values(Status)).withMessage("Estado no válido"),

  body("startDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio debe estar en formato YYYY-MM-DD"),

  body("endDate")
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de fin debe estar en formato YYYY-MM-DD"),

  body("timeSpentHours")
    .optional()
    .isFloat({ min: 0 }).withMessage("Las horas deben ser un número positivo"),

  body("teamSize")
    .optional()
    .isInt({ min: 1 }).withMessage("El equipo debe tener al menos 1 miembro"),

  body("techStack")
    .optional()
    .isArray({ min: 1 }).withMessage("Debe incluir al menos una tecnología"),

  body("reason")
    .optional()
    .trim()
    .isString().withMessage("El motivo debe ser texto"),

  body("learnings")
    .optional()
    .trim()
    .isString().withMessage("Los aprendizajes deben ser texto"),

  body("userId")
    .optional()
    .isInt({ min: 1 }).withMessage("El ID de usuario debe ser un número entero positivo"),
];
