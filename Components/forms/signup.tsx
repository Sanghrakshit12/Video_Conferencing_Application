"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  Name: string().min(1, "Required"),
  username: z.string().min(1, {
    message: "email is Required"
  }).email('Invalid email'),
  password: z.string().min(8, { message: "password must contain atleat 8 character" })
  , Confirmpassword: z.string().min(1, "password Confirmation is Required")
}).refine((data) => data.password === data.Confirmpassword, {
  path: ["Confirmpassword"], message: "password do not match"
})



export default function SignUpComponent() {
  const router=useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Name: "", username: "", password: "", Confirmpassword: ""
    }
  })
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try{
      const headers={'Content-type':'application-json'}
      const resposnse=await axios.post("http://localhost:3000/api/user",{
        Name:values.Name,
        username:values.username,
        password:values.password
      },{headers:{'Content-type':'application-json'}}
      )
      window.alert("Successfully Signed up Please Sign In to Use the Application")
      router.push('/signin')
    }
  catch(err){
    console.log("Sign-up Failed");
    router.push("/AuthError")
  }
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-6">
        <div>
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Sid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="mail@example.com" {...field} />
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
          <FormField
            control={form.control}
            name="Confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-5" type="submit">Sign Up</Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>

      <p className='text-center text-sm text-gray-600 mt-2'>
        If you have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>
          Sign in
        </Link>
      </p>
    </Form>
  )
}
