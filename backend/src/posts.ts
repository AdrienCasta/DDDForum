import express, { Request, Response } from "express";

import { prisma } from "./database";

const Errors = {
  ServerError: "ServerError",
  ClientError: "ClientError",
};

const posts = (app: express.Application) => {
  app.get("/posts", async (req: Request, res: Response) => {
    try {
      const { sortBy } = req.query;

      if (sortBy !== "recent") {
        return res
          .status(400)
          .json({ error: Errors.ClientError, data: undefined, success: false });
      }

      //   const sortOrder = sortBy === "recent" ? "desc" : "asc";

      const postsWithVotes = await prisma.post.findMany({
        include: {
          votes: true,
          memberPostedBy: {
            include: {
              user: true,
            },
          },
          comments: true,
        },
        orderBy: {
          dateCreated: "desc",
        },
      });

      return res.status(200).send({
        error: undefined,
        data: { posts: postsWithVotes },
        success: true,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ error: Errors.ServerError, data: undefined, success: false });
    }
  });
};

export default posts;
