"use client";

import { Dropzone } from "@/modules/app/components/dropzone";
import { useState } from "react";

export function ScreenStore() {
  const [files, setFiles] = useState<File[]>([]);

  function onDrop(files: FileList) {
    console.log(files);
  }

  return (
    <div>
      <section>{/* here put header */}</section>

      <section>
        <form>
          <div className="bg-white p-10">
            {/* put here store data */}
            <Dropzone files={files} onDrop={onDrop} />
          </div>
        </form>
      </section>
    </div>
  );
}
