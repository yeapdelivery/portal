"use client";

import { Button } from "@/modules/app/components";
import Image from "next/image";

interface HeaderProps {
  backgroundImage: string;
  profileImage: string;
  name: string;
  cancel: () => void;
  save: () => void;
}

export function HeaderPreference({
  backgroundImage,
  profileImage,
  cancel,
  name,
  save,
}: HeaderProps) {
  return (
    <div>
      <Image
        data-test="background-image"
        src={backgroundImage}
        alt="company background image"
        width={1227}
        height={186}
        className="w-full"
      />
      <div className="flex justify-between" data-test="container">
        <div data-test="container-logo-button" className="-mt-9 gap-6 flex">
          <Image
            data-test="type-logo"
            src={profileImage}
            alt="company logo type"
            width={121}
            height={121}
            className="ml-6"
          />
          <div className="flex flex-col gap-1 self-center mt-5">
            <span
              data-test="company-name"
              className="text-gray-100 font-outfit text-lg font-bold"
            >
              {name}
            </span>
            <span
              data-test="company-email"
              className="text-gray-100 text-xs font-medium"
            >
              twopaypal@gmail.com
            </span>
          </div>
        </div>
        <div className="flex gap-5 mt-5 mr-4">
          <div className="w-36">
            <Button
              data-test="cancel-button"
              variant="error"
              onClick={() => cancel()}
            >
              Cancelar
            </Button>
          </div>
          <div className="w-36">
            <Button
              data-test="save-button"
              variant="check"
              onClick={() => save()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
