import z from 'zod'

const userSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser una cadena de texto",
}),
  email: z.string().email({ message: "Formato de email no valido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })

})


export const validateUser = (object)=>{
  return userSchema.safeParse(object)
}