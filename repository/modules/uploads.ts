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

    const json = await this.apiPost<{ url: string }>(
      `/api/upload/${uploadItem.type}`,
      formData,
      {
        params: {
          prefix: uploadItem.prefix,
        },
      }
    );
    console.log("json", json);

    return json.url;
  }
}

export default UploadsModule;
