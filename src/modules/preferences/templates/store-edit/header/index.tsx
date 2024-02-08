import { Button } from "@/modules/app/components";
import { tv } from "tailwind-variants";
import Image from "next/image";

const buttonStyle = tv({
  slots: {
    button: [
      "w-36 h-8 flex items-center justify-center text-xs font-bold",
      "text-gray-500 bg-transparent border border-solid border-gray-500",
      "rounded-lg hover:bg-transparent hover:text-gray-400 hover:bg-gray-700",
      "transition-all duration-300 hover:border-none",
    ],
  },
  variants: {
    save: {
      true: {
        button: [
          "bg-red-default text-white border-none hover:bg-red-primary-dark",
          "hover:text-white",
        ],
      },
    },
  },
});

export function Header() {
  const { button } = buttonStyle();

  return (
    <div>
      <Image
        data-cy="background-image"
        src="/Rectangle.svg"
        alt="company background image"
        width={1227}
        height={186}
        className="w-full"
      />
      <div className="flex justify-between" data-cy="container">
        <div data-cy="container-logo-button" className="-mt-9 gap-6 flex">
          <Image
            data-cy="type-logo"
            src="/Ellipse.svg"
            alt="company logo type"
            width={121}
            height={121}
            className="ml-6"
          />
          <div className="flex flex-col gap-1 self-center mt-5">
            <span
              data-cy="company-name"
              className="text-gray-100 font-outfit text-lg font-bold"
            >
              Insano Burguer
            </span>
            <span
              data-cy="company-email"
              className="text-gray-100 text-xs font-medium"
            >
              twopaypal@gmail.com
            </span>
          </div>
        </div>
        <div className="flex gap-5 mt-5 mr-4">
          <Button data-cy="cancel-button" className={button()}>
            Cancelar
          </Button>
          <Button data-cy="save-button" className={button({ save: true })}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
