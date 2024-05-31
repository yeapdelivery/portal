"use client";

import { Box } from "@/modules/app/components/box";
import Button from "@/modules/app/components/button/button";
import TextFiled from "@/modules/app/components/text-filed";
import Toast from "@/modules/app/components/toast";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useUser } from "@/modules/app/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { preferencesService } from "../../services";
import { User } from "@/modules/app/models/user";
import { authService } from "@/modules/auth/services";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birthday: z.string().transform((value) => {
    const originalDate = parse(value, "dd/MM/yyyy", new Date());

    return format(originalDate, "yyyy-MM-dd'T'HH:mm");
  }),
});

const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Senha atual precisa ter no mínimo 6 caracteres"),
    newPassword: z
      .string()
      .min(6, "Nova senha precisa ter no mínimo 6 caracteres"),
    newPasswordConfirmation: z
      .string()
      .min(6, "Confirmação de senha precisa ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "As senhas não coincidem",
    path: ["newPasswordConfirmation"],
  });

type UserSchema = z.infer<typeof userSchema>;
type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export function UserEditTemplate() {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [isLoading, startLoading, stopLoading] = useLoading();
  const [isLoadingPassword, startLoadingPassword, stopLoadingPassword] =
    useLoading();
  const { error, success, setToast, toast } = useToast();

  const { register, setValue, handleSubmit } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  const {
    register: registerUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    Object.keys(user).forEach((key) => {
      let value = user[key as keyof UserSchema];

      if (key === "birthday") {
        value = format(new Date(user.birthday), "dd/MM/yyyy");
      }
      setValue(key as keyof UserSchema, value);
    });
  }, [user, setValue]);

  async function submit(data: UserSchema) {
    startLoading();
    try {
      await preferencesService.updateUser(data as User);

      const { data: userResponse } = await authService.userMe();

      setUser(userResponse);
      success("Usuário editado com sucesso");
    } catch {
      error("Erro ao editar usuário");
    } finally {
      stopLoading();
    }
  }

  async function submitUpdatePassword(passwords: UpdatePasswordSchema) {
    startLoadingPassword();
    try {
      const data = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      await authService.changePassword(data);

      success("Senha alterada com sucesso");
    } catch {
      error("Erro ao alterar senha");
    } finally {
      stopLoadingPassword();
    }
  }

  return (
    <div className="px-5">
      <Box>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <TextFiled label="Name" htmlFor="name" error={null}>
            <TextFiled.Input id="name" {...register("name")} />
          </TextFiled>
          <TextFiled label="Email" htmlFor="email" error={null}>
            <TextFiled.Input id="email" {...register("email")} />
          </TextFiled>

          <div className="flex items-start gap-4 ">
            <TextFiled
              label="Telefone"
              htmlFor="phone"
              error={null}
              className="flex-1"
            >
              <TextFiled.Input
                id="phone"
                {...register("phone")}
                mask="(99) 99999-9999"
              />
            </TextFiled>
            <TextFiled
              label="Data de nascimento"
              htmlFor="birthday"
              error={null}
              className="flex-1"
            >
              <TextFiled.Input
                id="birthday"
                {...register("birthday")}
                mask="99/99/9999"
              />
            </TextFiled>
          </div>

          <Button isLoading={isLoading} type="submit" disabled={isLoading}>
            Editar
          </Button>
        </form>
      </Box>

      <Box className="mt-10">
        <form
          className="space-y-4"
          onSubmit={handleSubmitUpdatePassword(submitUpdatePassword)}
        >
          <TextFiled
            label="Senha atual"
            htmlFor="currentPassword"
            error={null}
            className="flex-1"
          >
            <TextFiled.Input
              id="currentPassword"
              {...registerUpdatePassword("currentPassword")}
              type="password"
            />
          </TextFiled>

          <div className="flex items-start gap-4">
            <TextFiled
              label="Nova senha"
              htmlFor="newPassword"
              error={null}
              className="flex-1"
            >
              <TextFiled.Input
                id="newPassword"
                {...registerUpdatePassword("newPassword")}
                type="password"
              />
            </TextFiled>

            <TextFiled
              label="Confirmar senha"
              htmlFor="newPasswordConfirmation"
              error={null}
              className="flex-1"
            >
              <TextFiled.Input
                id="newPasswordConfirmation"
                {...registerUpdatePassword("newPasswordConfirmation")}
                type="password"
              />
            </TextFiled>
          </div>
          <Button
            variant="secondary"
            isLoading={isLoadingPassword}
            type="submit"
            disabled={isLoadingPassword}
          >
            Editar senha
          </Button>
        </form>
      </Box>

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
