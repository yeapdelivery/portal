"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/modules/app/components/button/button";
import TextFiled from "@/modules/app/components/text-filed";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";

const createUserSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Adicione um email válido" }).min(1),
    phone: z
      .string()
      .min(1, { message: "Telefone é obrigatório" })
      .transform((value) => value.replace(/\D/g, "")),
    birthday: z
      .string()
      .min(1, { message: "Aniversário é obrigatório" })
      .transform((value) => {
        const originalDate = parse(value, "dd/MM/yyyy", new Date());

        return format(originalDate, "yyyy-MM-dd'T'HH:mm");
      }),
    password: z
      .string()
      .min(6, { message: "Senha é obrigatório e no mínimo 6 caractéres" }),
    confirmPassword: z.string().min(6, {
      message: "Confirmação mínimo 6 caractéres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type CreateUserSchema = z.infer<typeof createUserSchema>;

interface RegisterUserProps {
  onUpdateUser: (user: CreateUserSchema) => void;
}

export function RegisterUser({ onUpdateUser }: RegisterUserProps) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  function submit(data: CreateUserSchema) {
    onUpdateUser(data);
  }

  return (
    <div className="flex-1 w-full">
      <div className="flex-1">
        <div>
          <div className="mt-10">
            <h1 className="font-bold text-3xl text-center font-rubik">
              Responsável da loja
            </h1>
          </div>
        </div>

        <div className="mt-7">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
            <div className="flex gap-8">
              <TextFiled
                error={errors?.name?.message}
                htmlFor="name"
                className="flex-1"
                label="Nome"
                required
              >
                <TextFiled.Input
                  id="name"
                  placeholder="Digite seu nome"
                  {...register("name")}
                />
              </TextFiled>

              <TextFiled
                error={errors?.email?.message}
                htmlFor="name"
                className="flex-1"
                label="E-mail"
                required
              >
                <TextFiled.Input
                  id="name"
                  placeholder="Digite seu email"
                  {...register("email")}
                />
              </TextFiled>
            </div>
            <div className="flex gap-8">
              <TextFiled
                error={errors?.phone?.message}
                htmlFor="phone"
                label="Telefone"
                className="flex-1"
                required
              >
                <TextFiled.Input
                  id="phone"
                  placeholder="Digite seu telefone"
                  mask="(99) 99999-9999"
                  {...register("phone")}
                />
              </TextFiled>

              <TextFiled
                error={errors?.birthday?.message}
                htmlFor="birthday"
                label="Data de nascimento"
                className="flex-1"
                required
              >
                <TextFiled.Input
                  id="birthday"
                  placeholder="Data de nascimento"
                  mask="99/99/9999"
                  {...register("birthday")}
                />
              </TextFiled>
            </div>

            <TextFiled
              error={errors?.password?.message}
              htmlFor="password"
              label="Senha"
              required
            >
              <TextFiled.Input
                id="password"
                placeholder="Digite seu nome"
                type="password"
                {...register("password")}
              />
            </TextFiled>

            <TextFiled
              error={errors?.confirmPassword?.message}
              htmlFor="confirm-password"
              label="Confrimar senha"
              required
            >
              <TextFiled.Input
                id="confirm-password"
                placeholder="Digite seu nome"
                type="password"
                {...register("confirmPassword")}
              />
            </TextFiled>

            <Button type="submit">Próximo</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
