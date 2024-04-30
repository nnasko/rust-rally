"use client"
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Logged in Successfully!");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-3 p-6 shadow border border-secondary bg-foreground rounded-lg"
    >
      <Input
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        startContent={<EnvelopeIcon className="w-4" />}
        className="dark col-span-2 rounded-xl"
      />
      <Input
        label="Password"
        {...register("password")}
        type={visiblePass ? "text" : "password"}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
          </button>
        }
        className="dark col-span-2"
      />
      <Button color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting} className="rounded-lg dark col-span-2 items-center flex justify-center">
        {isSubmitting ? "Logging In..." : "Login"}
      </Button>
      <Button as={Link} href="/auth/register" className="rounded-lg dark col-span-2 items-center flex justify-center">
        Register
      </Button>
    </form>
  );
};

export default LoginForm;
