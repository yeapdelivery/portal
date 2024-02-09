"use client";

import { Dropzone } from "@/modules/app/components/dropzone";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { useState } from "react";
import { Header } from "./header";

export function ScreenStore() {
  const [files, setFiles] = useState<DropFiles[]>([]);

  function onDrop(files: DropFiles[]) {
    setFiles((oldValues) => [...oldValues, ...files]);
  }

  function onDelete(files: DropFiles[]) {
    setFiles(files);
  }

  return (
    <div>
      <section>
        <Header
          backgroundImage="/Rectangle.svg"
          profileImage="/Ellipse.svg"
          cancel={() => {}}
          name="Insano Burguer"
          save={() => {}}
        />
      </section>

      <section>
        <form>
          <div className="bg-white p-10">
            {/* put here store data */}
            <Dropzone
              files={files}
              onDrop={onDrop}
              multiple
              onDelete={onDelete}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
