"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if(variant === "REGISTER") {
      axios.post("/api/register", data)
      .then(()=> signIn("credentials",data))
      .catch(()=>{ toast.error("Something went wrong! ")})
      .finally(() => setIsLoading(false));
    } 
    
    if(variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if(callback?.error) {
          toast.error("Invalid credentials!");
        } 

        if(callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
          router.push("/users");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));


    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false }) 
    .then((callback)=>{
      if(callback?.error) {
          toast.error("Invalid credentials!");
        } 

        if(callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
          router.push("/users");
        }
    })
    .finally(() => setIsLoading(false));

  
  };

 return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-10 shadow-2xl rounded-3xl sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
        
          <motion.div 
            animate={{ height: variant === "REGISTER" ? "auto" : 0, opacity: variant === "REGISTER" ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {variant === "REGISTER" && (
              <div className="pb-4">
                <Input id="name" label="Full Name" register={register} errors={errors} disabled={isLoading} />
              </div>
            )}
          </motion.div>

          <Input label="Email address" id="email" type="email" register={register} errors={errors} disabled={isLoading} />
          <Input label="Password" id="password" type="password" register={register} errors={errors} disabled={isLoading} />

          <div className="pt-2">
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-gray-400 uppercase tracking-widest text-[10px]">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-8 px-2 text-gray-400">
          <div>{variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer text-purple-400 hover:text-purple-300 transition-colors">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;