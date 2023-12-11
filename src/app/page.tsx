import { Button, TextFiled } from "@/modules/app/components";

export default function Home() {
  return (
    <main className="flex gap-10">
      <div className="min-w-[448px] flex gap-4 flex-col">
        <Button>Button Primary</Button>
        <Button variant="secondary">Button secondary</Button>
        <Button variant="check">Button check</Button>
        <Button variant="error">Button error</Button>
        <Button disabled>Button disabled</Button>
      </div>

      <div>
        <TextFiled
          htmlFor="name"
          label="Name"
          error="Preencha o carmpo corretamente"
        >
          <TextFiled.Input id="name" />
        </TextFiled>
      </div>
    </main>
  );
}
