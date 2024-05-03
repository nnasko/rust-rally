// authActions.ts
import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcryptjs";
import { UpdateUserType } from "../types";

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image" | "discord" | "steam" | "region" | "language">) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        }
    });
    return result;
}

export async function updateUser(userId: string, user: UpdateUserType) {
    const updatedUser = await prisma.user.update({
    where: { id: userId },
      data: user,  // Update only the provided fields in user object
    });
    return updatedUser;
  }