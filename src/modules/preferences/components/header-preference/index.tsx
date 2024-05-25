"use client";

import Button from "@/modules/app/components/button";
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
    <div className="h-full mb-8 md:mb-1.5">
      <Image
        data-test="background-image"
        src={backgroundImage}
        alt="company background image"
        width={1227}
        height={186}
        className="w-full  h-[186px] object-cover"
      />
      <div className="flex flex-col md:flex-row md:justify-between">
        <div
          data-test="container-logo-button"
          className="-mt-9 gap-2 md:gap-6 flex"
        >
          <Image
            data-test="type-logo"
            src={profileImage}
            width={121}
            height={121}
            alt="company logo type"
            className="ml-2 md:ml-6  rounded-full w-[121px] h-[121px]"
          />
          <div className="flex flex-col gap-1 self-center mt-5">
            <span
              data-test="company-name"
              className="text-gray-100 font-outfit text-lg font-bold tracking-tighter"
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
        <div className="flex gap-5 mt-1 md:mt-5 mr-6 ml-6">
          <div className="w-28 md:w-36 ">
            <Button
              data-test="cancel-button"
              variant="error"
              onClick={() => cancel()}
            >
              Cancelar
            </Button>
          </div>
          <div className="w-28 md:w-36">
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
