"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { LockKey } from "@phosphor-icons/react/dist/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading, useToast } from "@/modules/app/hooks";
import TextFiled from "@/modules/app/components/text-filed";
import Button from "@/modules/app/components/button/button";
import Toast from "@/modules/app/components/toast";
import { ToastType } from "@/modules/app/components/toast/types";
import { FormEvent } from "react";
import Link from "next/link";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

const authenticationFormSchema = z.object({
  email: z.string().email({ message: "Adicione um email válido" }).min(1),
  password: z
    .string()
    .min(6, { message: "Senha é obrigatório e no mínimo 6 caractéres" }),
});

type AuthenticationFormSchema = z.infer<typeof authenticationFormSchema>;

export default function Login() {
  const [isLoadingAuth, startLoadingAuth, stopLoadingAuth] = useLoading();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormSchema>({
    resolver: zodResolver(authenticationFormSchema),
  });
  const { error: toastError, toast, setToast } = useToast();
  const logger = useLogger();

  async function onSubmit(
    { email, password }: AuthenticationFormSchema,
    event: any
  ) {
    event.preventDefault();

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
      toastError("Usuário ou senha inválidos");
      logger.fatal("Erro ao fazer login", { error });
    } finally {
      stopLoadingAuth();
    }
  }

  async function mySubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(onSubmit)(event);
  }

  function goToRegister() {
    router.push("/register");
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center gap-10">
          <Link href="/">
            <Image src="/logo.png" alt="Logo do yeap" width={160} height={76} />
          </Link>

          <div>
            <div>
              <h1 className="font-bold text-3xl font-rubik">
                Bem-vindo- ao yeap!
              </h1>
              <p className="font-outfit font-medium text-neutral-500">
                Preencha os campos abaixo e acesse sua conta
              </p>
            </div>

            <form onSubmit={mySubmitHandler}>
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

                <Button
                  type="submit"
                  isLoading={isLoadingAuth}
                  disabled={isLoadingAuth}
                >
                  Entrar
                </Button>
              </div>
            </form>

            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                className="flex justify-center mt-5 items-center gap-2"
              >
                <LockKey size={20} weight="regular" color="#B50010" />

                <p className="font-outfit font-medium text-gray-100">
                  Esqueci minha senha
                </p>
              </button>

              <div className="flex mt-5 gap-1">
                <p className="font-outfit font-medium text-gray-100">
                  Ja está cadastrado?
                </p>
                <button
                  onClick={goToRegister}
                  className="font-outfit font-medium text-red-default"
                >
                  CADASTRE-SE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        open={toast.open}
        setOpen={(open) => {
          setToast({ message: "", open });
        }}
        type={ToastType.ERROR}
      />
    </div>
  );
}
