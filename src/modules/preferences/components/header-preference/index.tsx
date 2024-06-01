"use client";

import Image from "next/image";
import { CoverFile } from "../cover-file/cover-file";
import { EmptyImage } from "@/modules/app/components/empty-image";

interface HeaderProps {
  backgroundImage: string;
  profileImage: string;
  name: string;
  email: string;
}

export function HeaderPreference({ profileImage, name, email }: HeaderProps) {
  return (
    <div className="h-full mb-8 md:mb-1.5">
      <CoverFile />
      <div className="flex flex-col md:flex-row md:justify-between">
        <div
          data-test="container-logo-button"
          className="-mt-9 z-50 gap-2 md:gap-6 flex"
        >
          {profileImage ? (
            <Image
              data-test="type-logo"
              src={profileImage}
              width={121}
              height={121}
              alt="company logo type"
              className="ml-2 md:ml-6  rounded-full w-[121px] h-[121px]"
            />
          ) : (
            <div className="rounded-full w-[121px] h-[121px] border">
              <EmptyImage className="rounded-full" />
            </div>
          )}

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
              {email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
