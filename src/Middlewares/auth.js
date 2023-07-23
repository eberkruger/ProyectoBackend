export const authorization = (authorizationType) => {
  return (req, res, next) => {
    const { user } = req.session

    if (authorizationType === "ADMIN") {
      // Esta validación permite el paso solo a usuarios con rol de administrador
      if (user && user.role === 'admin') {
        next()
      } else {
        res.status(403).send("Acceso denegado. Debes ser administrador.")
      }
    } else if (authorizationType === "USER") {
      // Esta validación permite el paso solo a usuarios autenticados, independientemente de su rol
      if (user) {
        next()
      } else {
        res.status(401).send("Acceso no autorizado. Debes iniciar sesión. Seguir el siguiente enlace http://localhost:8080/login")
      }
    } else if (authorizationType === "GUEST") {
      // Esta validación permite el paso solo a usuarios no autenticados
      if (!user) {
        next()
      } else {
        res.status(403).send("Acceso denegado. Debes cerrar sesión.")
      }
    } else {
      // Si se proporciona un tipo de autorización no válido, responder con un error 400
      res.status(400).send("Tipo de autorización no válido.")
    }
  }
}