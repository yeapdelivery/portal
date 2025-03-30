import { useRouter } from "next/navigation";
import Button from "../button";
import Dialog from "../dialog";

interface HaveNewMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HaveNewMessageModal({
  open,
  onOpenChange,
}: HaveNewMessageModalProps) {
  const route = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        title="💬 Nova menssagem!"
        position="center"
        className="overflow-hidden"
      >
        <div className="space-y-4">
          <span>Você tem uma nova, visualize e responda no chat!</span>

          <Button
            onClick={() => {
              route.push("/chat");
              onOpenChange(false);
            }}
          >
            Ir para o chat
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
