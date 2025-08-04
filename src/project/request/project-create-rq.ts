import { body } from "express-validator";
import { Status } from "@prisma/client";

export const projectCreateRq = () => [
  body("title")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isString().withMessage("El título debe ser texto"),

  body("status")
    .notEmpty().withMessage("El estado es obligatorio")
    .isIn(Object.values(Status)).withMessage("Estado no válido"),

  body("startDate")
    .notEmpty().withMessage("La fecha de inicio es obligatoria")
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio debe estar en formato YYYY-MM-DD"),

  body("endDate")
    .notEmpty().withMessage("La fecha de fin es obligatoria")
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de fin debe estar en formato YYYY-MM-DD"),

  body("timeSpentHours")
    .notEmpty().withMessage("Las horas invertidas son obligatorias")
    .isFloat({ min: 0 }).withMessage("Las horas deben ser un número positivo"),

  body("teamSize")
    .notEmpty().withMessage("El tamaño del equipo es obligatorio")
    .isInt({ min: 1 }).withMessage("El equipo debe tener al menos 1 miembro"),

  body("techStack")
    .isArray({ min: 1 }).withMessage("Debe incluir al menos una tecnología"),

  body("reason")
    .trim()
    .notEmpty().withMessage("El motivo es obligatorio")
    .isString().withMessage("El motivo debe ser texto"),

  body("learnings")
    .trim()
    .notEmpty().withMessage("Los aprendizajes son obligatorios")
    .isString().withMessage("Los aprendizajes deben ser texto"),

  body("userId")
    .notEmpty().withMessage("El ID de usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El ID de usuario debe ser un número entero positivo"),
];
