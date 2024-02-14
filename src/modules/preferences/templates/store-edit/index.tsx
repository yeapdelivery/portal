"use client";

import { DropFiles } from "@/modules/app/components/dropzone/types";
import { useState } from "react";
import { HeaderPreference } from "../../components/header-preference";
import Dropzone from "@/modules/app/components/dropzone";

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
        <HeaderPreference
          backgroundImage="/Rectangle.svg"
          name="Insano Burguer"
          profileImage="/Ellipse.svg"
          cancel={() => {}}
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
