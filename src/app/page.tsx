import { Button } from "@/modules/app/components";

export default function Home() {
  return (
    <main>
      <div className="max-w-md flex gap-4 flex-col">
        <Button>Button Primary</Button>
        <Button variant="secondary">Button secondary</Button>
        <Button variant="check">Button check</Button>
        <Button variant="error">Button error</Button>
        <Button disabled>Button disabled</Button>
      </div>
    </main>
  );
}
