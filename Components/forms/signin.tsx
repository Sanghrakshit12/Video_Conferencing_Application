"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function SignInComponent() {
  const FormSchema = z.object({
    username: z
      .string()
      .min(1, {
        message: "email is Required",
      })
      .email("Invalid email"),
    password: z
      .string()
      .min(8, { message: "password must contain atleat 8 character" }),
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const signindata = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (signindata?.error) {
        console.log(signindata.error);
        toast({
          title: "Oops! Something Went Wrong",
          description: "Error Signing In",
        });
        router.push("/");
      } else {
        toast({
          title: "Hello From NexMeet",
          description: "Sign In Successful",
        });
        router.push("/admin");
      }
    } catch (err) {
      router.push("/AuthError");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-6">
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="mail@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-5 w-full" type="submit">
          Sign In
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </Form>
  );
}
