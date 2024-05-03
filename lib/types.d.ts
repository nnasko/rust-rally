import { User } from "@prisma/client";

declare module "next-auth"{
    interface Session{
        user:User
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        user:User;
    }
}
export type UpdateUserType = {
    age?: number;
    name?: string;
    discord?: string;
    steam?: string;
    region?: string;
  };