import HttpFactory from "../factory";
interface UploadItem {
  file: File;
  type: "image" | "video" | "audio" | "file";
  prefix?: string;
}

class UploadsModule extends HttpFactory {
  async upload(uploadItem: UploadItem): Promise<string> {
    const formData = new FormData();
    formData.append("file", uploadItem.file, uploadItem.file.name);

    console.log("uploadItem", uploadItem);

    console.log("formData", formData.get("file"));
    
    const json = await this.apiPost<{ url: string }>(
      `/v1/uploads/${uploadItem.type}s`,
      formData,
      {
        params: {
          prefix: uploadItem.prefix,
        },
      }
    );

    return json.url;
  }
}

export default UploadsModule;
