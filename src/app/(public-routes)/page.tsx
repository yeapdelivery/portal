"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LockKey } from "@phosphor-icons/react/dist/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/modules/app/hooks/useLoading";

import { Button, TextFiled } from "@/modules/app/components";

const authenticationFormSchema = z.object({
  email: z.string().email({ message: "Adicione um email válido" }).min(1),
  password: z
    .string()
    .min(6, { message: "Senha é obrigatório e no mínimo 6 caractéres" }),
});

type AuthenticationFormSchema = z.infer<typeof authenticationFormSchema>;

export default function Home() {
  const [isLoadingAuth, startLoadingAuth, stopLoadingAuth] = useLoading();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormSchema>({
    resolver: zodResolver(authenticationFormSchema),
  });

  async function onSubmit({ email, password }: AuthenticationFormSchema) {
    startLoadingAuth();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      router.push("/pedidos");
    } catch (error) {
      alert("error");
    } finally {
      stopLoadingAuth();
    }
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center gap-10">
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={160}
            height={76}
          />

          <div>
            <div>
              <h1 className="font-bold text-3xl font-rubik">
                Bem-vindo- ao yeap!
              </h1>
              <p className="font-outfit font-medium text-neutral-500">
                Preencha os campos abaixo e acesse sua conta
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 flex flex-col gap-5">
                <TextFiled
                  htmlFor="email"
                  label="E-mail ou celular"
                  error={(errors?.email?.message as string) || null}
                >
                  <TextFiled.Input
                    id="email"
                    placeholder="email@email.com"
                    {...register("email")}
                  />
                </TextFiled>
                <TextFiled
                  htmlFor="password"
                  label="Senha"
                  error={(errors?.password?.message as string) || null}
                >
                  <TextFiled.Input
                    id="password"
                    type="password"
                    placeholder="Crie sua senha"
                    {...register("password")}
                  />
                </TextFiled>

                <Button type="submit" isLoading={isLoadingAuth}>
                  Entrar
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="flex justify-center mt-5 items-center gap-2"
                >
                  <LockKey size={20} weight="regular" color="#B50010" />

                  <p className="font-outfit font-medium text-gray-100">
                    Esqueci minha senha
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
