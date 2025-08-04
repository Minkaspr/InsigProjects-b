import { body } from "express-validator";

export const userCreateRq = () => [
  body("firstName")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio")
    .isString().withMessage("El apellido debe ser texto")
    .isLength({ min: 6 }).withMessage("El apellido debe tener al menos 6 caracteres"),

  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido")
]