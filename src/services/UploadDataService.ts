import { http } from "./http";

interface IImageResponse {
  url: string;
}

class UploadDataService {
  async uploadImage(file: File): Promise<IImageResponse> {
    const body = new FormData();
    body.append("file", file);

    return await http.post("/upload/image", body);
  }
}

export default new UploadDataService();
