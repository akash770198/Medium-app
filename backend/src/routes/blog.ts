import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from 'shadow_ranger'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

//middleware
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)

        if (user) {
            c.set('userId', String(user.id));
            await next();
        } else {
            c.status(403)
            return c.json({
                msg: "you are not logged in"
            })
        }
    } catch (e) {
        c.status(403)
        return c.json({
            msg: "you are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {

    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message: "incorrect format of input blog"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId //will receive from middleware
        }
    })

    return c.json({
        id: post.id,
        createdAt: post.createdAt
    })
})

blogRouter.put('/edit', async (c) => {
    const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message: "incorrect format of input blog"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })
})

//Todo: add pagination
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            },
            authorId: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return c.json({
        posts
    })
})

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author:{
                    select:{
                        name: true
                    }
                },
                authorId: true
            }
        })

        return c.json({
            post
        });
    } catch (e) {
        console.log(e);
        c.status(411)
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})

// New route to get all posts of a particular user
blogRouter.get('/unique/:userId', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    const userId = c.req.param('userId');

    try {
        const userWithPosts = await prisma.user.findUnique({
            where: { id: userId },
            include: { 
                posts: true 
            },
        });

        if (!userWithPosts) {
            c.status(404);
            return c.json({ message: "User not found" });
        }

        return c.json({
            user: {
                name: userWithPosts.name || "Anonymous",
                posts: userWithPosts.posts,
            }
        });
    } catch (e) {
        console.log(e);
        c.status(500);
        return c.json({ message: "An error occurred while fetching the posts" });
    }
});

blogRouter.delete('/delete/:id', async (c) => {
    const postId = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Find the post to check if the user is the author
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                authorId: true,
            },
        });

        if (!post) {
            c.status(404);
            return c.json({ message: "Post not found" });
        }

        // Check if the logged-in user is the author of the post
        if (post.authorId !== userId) {
            c.status(403);
            return c.json({ message: "You are not authorized to delete this post" });
        }

        // Delete the post
        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return c.json({ message: "Post deleted successfully" });
    } catch (e) {
        console.log(e);
        c.status(500);
        return c.json({ message: "An error occurred while deleting the post" });
    }
});

