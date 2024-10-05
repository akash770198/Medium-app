import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from "shadow_ranger";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        message: "Inputs are incorrect"
      })
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        },
      })
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        jwt: token,
        user: {
          id: user.id,
          name: user.name || "Anonymous"
        },
      })
    } catch (e) {
      console.log(e)
      c.status(411)
      return c.text('Invalid')
    }
  
  })
  
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        message: "incorrect inputs"
      })
    }
  
    try {
  
        const user = await prisma.user.findFirst({
          where: {
            email: body.email,
            password: body.password,
          }
        })
  
        if (!user) {
          c.status(403)
          return c.json({
            error: "Incorrect creds"
          });
        }
  
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
          token: jwt,
          user: {
            id: user.id,
            name: user.name || "Anonymous"
          }
        })
  
    } catch (e) {
        console.log(e)
        c.status(411)
        return c.json({
          msg: 'Invalid'
        })
    }
  
  })