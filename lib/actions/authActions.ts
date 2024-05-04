"use server"
// authActions.ts
import { Post, User } from "@prisma/client";
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
      data: {
        ...user,
        region: user.region ? user.discord : undefined, 
        discord: user.discord ? user.discord : undefined,  
        steam: user.steam ? user.steam : undefined,
        name: user.name ? user.name : undefined,
      },  // Update only the provided fields in user object
    });
    return updatedUser;
  }
  
  export async function createPost(postData: any) {
    const createdPost = await prisma.post.create({
        data: postData,
    });
    return createdPost;
}

export async function fetchPosts(): Promise<Post[]> { 
  const posts = await prisma.post.findMany({
    include: {
      author: true 
    }
  });
  return posts;
}