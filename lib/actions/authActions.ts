// authActions.ts

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        }
    });
    return result;
}

export async function updateUser(userId: string, userData: Partial<User>) {
    const result = await prisma.user.update({
        where: { id: userId },
        data: userData,
    });
    return result;
}
