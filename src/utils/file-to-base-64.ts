const fileToBase64 = async (
  file: File
): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error("Não foi possivel abrir o arquivo"));
  });
};

export default fileToBase64;
