/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { CreateStoreData, SignUpData, authService } from "../services";
import { Step, Stepper } from "@/modules/app/components/stepper";
import { RegisterStoreInfo, RegisterUser, Resume } from "../components";
import Image from "next/image";
import { RegisterAddress } from "../components/register-address";
import { useLoading } from "@/modules/app/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const steps: Step[] = [
  {
    id: 1,
    title: "Responsável da loja",
  },
  {
    id: 2,
    title: "Endereço da loja",
  },
  {
    id: 3,
    title: "Informações da loja",
  },
  {
    id: 4,
    title: "Resumo",
  },
];

export function RegisterLayout() {
  const [user, setUser] = useState<SignUpData>();
  const [store, setStore] = useState<CreateStoreData>();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeSteps, setActiveSteps] = useState([1]);
  const [loading, startLoader, stopLoader] = useLoading();
  const router = useRouter();

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Tem certeza que deseja sair da página?";
    };
  }, []);

  function onUpdateUser(data: SignUpData) {
    setUser(data);
    updateCurrentStep(currentStep + 1);
    updateSteps(currentStep + 1);
  }

  function onUpdateStore(data: CreateStoreData) {
    setStore((prev) => ({ ...prev, ...data }));
    updateCurrentStep(currentStep + 1);
    updateSteps(currentStep + 1);
  }

  function onPreviousStep() {
    setCurrentStep(currentStep - 1);
  }

  function updateCurrentStep(step: number) {
    setCurrentStep(step);
  }

  function updateSteps(step: number) {
    if (!activeSteps.includes(step)) {
      setActiveSteps([...activeSteps, step]);
    }
  }

  async function submit() {
    try {
      startLoader();
      delete (user as any)?.confirmPassword;

      const { data: userCreated } = await authService.signUp(user);

      await authService.createStore({
        ...store,
        userId: userCreated.id,
      });

      const response = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      router.push("/pedidos");
    } catch (error) {
      console.error(error);
    } finally {
      stopLoader();
    }
  }

  return (
    <div className="max-w-3xl m-auto mb-10">
      <div className="flex justify-center">
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={160}
          height={76}
        />
      </div>

      <div className="flex items-center justify-center">
        <Image
          src="/delivery-lustra.png"
          alt="Picture of the author"
          width={160}
          height={76}
        />

        <h1 className="text-2xl font-bold">Olá, vamos criar sua conta!</h1>
      </div>

      <div className="mt-10">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          activeSteps={activeSteps}
        >
          <RegisterUser onUpdateUser={onUpdateUser} />
          <RegisterAddress
            onUpdateAddress={onUpdateStore}
            previousStep={onPreviousStep}
          />

          <RegisterStoreInfo
            onUpdateStore={onUpdateStore}
            previousStep={onPreviousStep}
          />

          <Resume
            user={user}
            store={store}
            loading={loading}
            previousStep={onPreviousStep}
            submit={submit}
          />
        </Stepper>
      </div>
    </div>
  );
}
