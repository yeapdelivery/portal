import { FormEvent, useState } from "react";

import { sendChatMessage } from "@/modules/chat/services";
import { useLoading } from "../../hooks";
import { useStore } from "../../store/stores";
import Button from "../button";
import Dialog from "../dialog";
import TextArea from "../text-area";
import { useRouter } from "next/navigation";
import { useLogger } from "../../hooks/use-logger.hook";

export interface SendMessageModal {
  userId: string;
  userName: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const ERROR_MESSAGE =
  "Não foi possível enviar a messagem tente novamente mais tarde.";

export function SendMessageModal({
  open,
  userName,
  userId,
  setOpen,
}: SendMessageModal) {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const route = useRouter();

  const store = useStore((state) => state.store);
  const [isLoading, startLoading, stopLoading] = useLoading();
  const logger = useLogger();

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    startLoading();
    event?.preventDefault();

    try {
      const messageCreated = await sendChatMessage({
        content: message,
        storeId: store.id,
        userId,
      });
      setOpen(false);
      route.push(`/chat/${messageCreated.chatId}/${userId}`);
    } catch (error) {
      setHasError(true);
      logger.error("Erro ao enviar mensagem", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content
        position="center"
        title={`Envie uma mensagem para ${userName}`}
        className="overflow-hidden"
      >
        <form onSubmit={sendMessage}>
          <div className="space-y-3">
            <TextArea
              className="h-14 pt-2"
              placeholder="Digite uma menssage"
              onChange={(event) => {
                if (hasError) {
                  setHasError(false);
                }
                setMessage(event.currentTarget.value);
              }}
            />

            {hasError && (
              <span className="text-sm text-primary-default mt-1">
                {ERROR_MESSAGE}
              </span>
            )}

            <Button
              disabled={!Boolean(message.length) || isLoading}
              isLoading={isLoading}
              type="submit"
            >
              Enviar
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
