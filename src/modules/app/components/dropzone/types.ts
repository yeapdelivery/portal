export interface DropFiles {
  id: string;
  base64: string | ArrayBuffer;
  src: string;
  name: string;
  size: number;
  type: string;
}
