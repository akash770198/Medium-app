import z from 'zod'

//for signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

//for signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

//for creating blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

//for updating blog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

//type inference in zod...what this key i.e signupInput looks like..so that frontend dev will know the type  
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

