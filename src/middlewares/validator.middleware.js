export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Parsea y valida el cuerpo de la solicitud utilizando el esquema proporcionado
    next(); // Llama a la siguiente función en la cadena de middleware si la validación es exitosa
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((error) => error.message) }); // Retorna un error 400 con mensajes detallados de los errores de validación
  }
};
