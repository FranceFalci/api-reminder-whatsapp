import z from 'zod'

const eventSchema = z.object({
  notes : z.string().optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  patient:  z.string()

})


export const validateEvent = (object)=>{
 return eventSchema.safeParse(object)
}