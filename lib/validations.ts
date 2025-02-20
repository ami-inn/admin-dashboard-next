import { z } from 'zod'

export const signupSchema = z.object({
    fullName: z.string().min(3, 'Fullname must be at least 3 characters long').max(255, 'Fullname must be at most 255 characters long'),
    email: z.string().email('Invalid email address'),
    universityId: z.coerce.number(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    universityCard: z.string().nonempty('University card is required'),
})


export const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})