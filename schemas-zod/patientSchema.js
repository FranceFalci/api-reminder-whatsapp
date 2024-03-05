import z from 'zod'

const patientSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser una cadena de texto",
}),
  number: z.string({required_error: "El nombre es requerido"})
          .regex(/^\d{10}$/ , {message : "Formato de numero incorrecto"})
          // .refine((value) => value.startsWith("381"), {
          //    message: "El número debe comenzar con '381'",
          // }),
})


export const validatePatient = (object)=>{
 return patientSchema.safeParse(object)
}