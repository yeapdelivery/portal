/* eslint-disable @next/next/no-img-element */
import Toast from "@/modules/app/components/toast";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { preferencesService } from "../../services";
import Spinner from "@/modules/app/components/spinner/spinner";

const coverFile = tv({
  slots: {
    container: [
      "relative h-[186px] z-10",
      "group",
      "flex items-center justify-center",
    ],
    overlay: [
      "absolute inset-0 bg-black bg-opacity-50",
      "opacity-0 group-hover:opacity-100 flex items-center justify-center",
      "text-white text-lg font-semibold",
      "cursor-pointer transition-all duration-300 ease-in-out",
    ],
  },
});

export function CoverFile() {
  const { container, overlay } = coverFile();
  const [store, setStore] = useStore((state) => [state.store, state.setStore]);
  const { toast, error, success, setToast } = useToast();
  const [isLoading, startLoader, stopLoader] = useLoading();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    try {
      startLoader();
      if (!file) {
        return;
      }

      const form = new FormData();
      form.append("cover", file);

      const { data: responseData } =
        await preferencesService.uploadBackgroundImage(form, store.id);

      setStore({
        ...store,
        cover: responseData.cover,
      });

      success("Imagem de fundo atualizada com sucesso!");
    } catch {
      error("Erro ao atualizar imagem de fundo");
    } finally {
      stopLoader();
    }
  }

  return (
    <div className={container()}>
      <input
        type="file"
        accept="image/*"
        className="opacity-0 absolute inset-0 z-10 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className={overlay()}>Alterar imagem de fundo</div>
      {!isLoading ? (
        <img
          data-test="background-image"
          src={store.cover}
          alt="company background image"
          width={1227}
          height={186}
          className="w-full h-[186px] object-cover"
        />
      ) : (
        <Spinner />
      )}
      <Toast
        message={toast.message}
        open={toast.open}
        type={toast.type}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
