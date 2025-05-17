"use client";

import Image from "next/image";
import { CoverFile } from "../cover-file/cover-file";
import { EmptyImage } from "@/modules/app/components/empty-image";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import { preferencesService } from "../../services";
import Toast from "@/modules/app/components/toast";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { X } from "@phosphor-icons/react/dist/ssr";
import Spinner from "@/modules/app/components/spinner";

interface HeaderProps {
  backgroundImage: string;
  profileImage: string;
  name: string;
  email: string;
}

export function HeaderPreference({ profileImage, name, email }: HeaderProps) {
  const [isLogoUpdating, startLoaderLogo, stopLoaderLogo] = useLoading();
  const [store, setStore] = useStore((state) => [state.store, state.setStore]);
  const { toast, error, success, setToast } = useToast();
  const logger = useLogger();

  async function onDrop(files: FileList) {
    startLoaderLogo();
    try {
      const form = new FormData();
      form.append("logo", files[0]);

      const { data: responseData } = await preferencesService.uploadLogo(
        form,
        store.id
      );

      setStore({
        ...store,
        logo: responseData.logo,
      });

      success("Logo atualizado com sucesso!");
    } catch {
      logger.error("Erro ao atualizar logo");
      error("Erro ao atualizar logo");
    } finally {
      stopLoaderLogo();
    }
  }

  return (
    <div className="h-full mb-8 md:mb-1.5">
      <CoverFile />
      <div className="flex flex-col md:flex-row md:justify-between">
        <div
          data-test="container-logo-button"
          className="-mt-9 z-50 gap-2 md:gap-6 flex"
        >
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  onDrop(e.target.files);
                }
              }}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="logo"
            />

            {isLogoUpdating && (
              <div className="w-[121px] h-[121px] bg-gray-800 rounded-full flex items-center justify-center ml-2 md:ml-6">
                <Spinner />
              </div>
            )}

            {profileImage && !isLogoUpdating && (
              <div>
                <Image
                  data-test="type-logo"
                  src={profileImage}
                  width={121}
                  height={121}
                  alt="company logo type"
                  className="ml-2 md:ml-6 rounded-full w-[121px] h-[121px] border border-gray-700"
                />

                <X
                  size={20}
                  className="absolute top-2 right-2 cursor-pointer text-white bg-slate-500 rounded-full p-1"
                  onClick={() => {
                    setStore({
                      ...store,
                      logo: "",
                    });
                  }}
                />
              </div>
            )}

            {!profileImage && !isLogoUpdating && (
              <div className="rounded-full w-[121px] h-[121px] ml-2 md:ml-6">
                <EmptyImage className="rounded-full" />
              </div>
            )}
          </div>

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

      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
