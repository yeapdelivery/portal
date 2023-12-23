import { Button, TextFiled } from "@/modules/app/components";
import { LockKey } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function Home() {
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

            <div className="mt-5 flex flex-col gap-5">
              <TextFiled htmlFor="email" label="E-mail ou celular" error={null}>
                <TextFiled.Input id="email" placeholder="email@email.com" />
              </TextFiled>
              <TextFiled htmlFor="password" label="Senha" error={null}>
                <TextFiled.Input id="password" placeholder="Crie sua senha" />
              </TextFiled>

              <Button>Entrar</Button>
            </div>

            <div className="flex items-center justify-center">
              <button className="flex justify-center mt-5 items-center gap-2">
                <LockKey size={20} weight="regular" color="#B50010" />

                <p className="font-outfit font-medium text-gray-100">
                  Esqueci minha senha
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
