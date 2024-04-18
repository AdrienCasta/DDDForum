import express, { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prisma } from "./database";

const users = (app: express.Application) => {
  app.get("/users", async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });

      if (!user) {
        return res.status(404).send({
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
      }

      return res.status(200).send({
        error: undefined,
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        success: true,
      });
    } catch (error: any) {
      return res
        .status(500)
        .send({ error: Errors.ServerError, data: undefined, success: false });
    }
  });
  app.post("/users/new", async (req: Request, res: Response) => {
    const { firstName, lastName, username, email } = req.body;

    const isEmailAlreadyInUse = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isUsernameAlreadyInUse = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (isEmailAlreadyInUse) {
      return res.status(409).send({
        message: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    if (isUsernameAlreadyInUse) {
      return res.status(409).send({
        message: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          firstName,
          email,
          lastName,
          username,
          password: generateRandomPassword(10),
        },
      });

      res.status(201).send({
        error: undefined,
        data: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        success: true,
      });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).send({
          message: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      return res
        .status(500)
        .send({ error: Errors.ServerError, data: undefined, success: false });
    }
  });
  app.post("/users/edit/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { username, email, lastName } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId, 10),
        },
      });

      if (!user) {
        return res.status(404).send({
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
      }

      const existingUserWithUsername = await prisma.user.findFirst({
        where: {
          username: username,
          NOT: {
            id: user.id, // Exclude the current user from the check
          },
        },
      });

      if (existingUserWithUsername) {
        return res.status(409).send({
          error: Errors.UsernameAlreadyTaken,
          data: undefined,
          success: false,
        });
      }

      const existingUserWithEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: user.id,
          },
        },
      });

      if (existingUserWithEmail) {
        return res.status(409).send({
          error: Errors.EmailAlreadyInUse,
          data: undefined,
          success: false,
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...(username && { username }),
          ...(email && { email }),
          ...(lastName && { lastName }),
        },
      });

      return res.status(200).send({
        error: undefined,
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          username: updatedUser.username,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
        },
        success: true,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).send({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }
      return res
        .status(500)
        .send({ error: Errors.ServerError, data: undefined, success: false });
    }
  });
};

export default users;

const Errors = {
  UsernameAlreadyTaken: "UserNameAlreadyTaken",
  EmailAlreadyInUse: "EmailAlreadyInUse",
  ValidationError: "ValidationError",
  ServerError: "ServerError",
  ClientError: "ClientError",
  UserNotFound: "UserNotFound",
};

function generateRandomPassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const passwordArray = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  return passwordArray.join("");
}
