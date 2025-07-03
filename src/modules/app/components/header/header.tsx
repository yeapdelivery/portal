import Image from "next/image";
import StatusOpen from "../status-open";
import HourHeader from "./hour-header";
import { Chat } from "@phosphor-icons/react";
import { useChat } from "@/modules/chat/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  const unreadMessages = useChat((state) => state.unreadMessages);

  const route = useRouter();

  function goToChat() {
    route.push("/chat");
  }

  return (
    <div
      data-cy="header-container"
      className="h-24 md:h-16 border-b border-gray-800 bg-white px-6 relative z-[1000]"
    >
      <div className="h-full items-center justify-between hidden md:flex">
        <div className="flex items-center gap-2">
          <Image src="/help.svg" alt="help" width={14.71} height={14.71} />
          <span data-cy="help">Preciso de ajuda</span>
        </div>

        <div className="flex items-center gap-4">
          {/* <HourHeader /> */}
          <StatusOpen />

          <button className="relative" onClick={goToChat}>
            <Chat className="text-gray-400" size={20} />

            {unreadMessages.length > 0 && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary-default absolute top-0 right-0" />
            )}
          </button>

          <hr className="border h-6 border-gray-700" />

          <div data-cy="profile" className="flex items-center gap-2">
            <span className="text-sm font-medium">{name}</span>
          </div>
        </div>
      </div>

      <div
        data-cy="logo-mobile"
        className="flex md:hidden items-end justify-center h-full py-2"
      >
        <Link href="/">
          <Image src="/logo.png" height={42} width={98} alt="logo" />
        </Link>
      </div>
    </div>
  );
}
