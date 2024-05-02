// authActions.ts

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcryptjs";

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image" | "discord" | "steam" | "region" | "language">) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        }
    });
    return result;
}

