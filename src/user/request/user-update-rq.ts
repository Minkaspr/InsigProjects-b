import { body } from "express-validator";

export const userUpdateRq = () => [
  body("firstName")
    .optional()
    .trim()
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("lastName")
    .optional()
    .trim()
    .isString().withMessage("El apellido debe ser texto")
    .isLength({ min: 6 }).withMessage("El apellido debe tener al menos 6 caracteres"),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Debe ser un email válido")
];
