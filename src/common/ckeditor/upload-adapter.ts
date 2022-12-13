import CookieService from "@/services/CookieService";
import { i18n } from "@/i18n";

interface IResolve {
  default: string;
}
export default class MyUploadAdapter {
  loader: any;
  xhr: XMLHttpRequest = new XMLHttpRequest();
  constructor(loader: any) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    this.xhr.open(
      "POST",
      `${import.meta.env.VITE_API_PATH}/upload/image`,
      true
    );
    this.xhr.setRequestHeader(
      "Authorization",
      `${
        import.meta.env.VITE_AUTHORIZATION_PREFIX
      } ${CookieService.getAccessToken()}`
    );
    this.xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(
    resolve: (arg0: IResolve) => void,
    reject: (arg0?: string) => void,
    file: any
  ) {
    const loader = this.loader;
    const genericErrorText = i18n.global.t("errors.cant_upload_file", {
      name: file.name,
    });

    this.xhr.addEventListener("error", () => reject(genericErrorText));
    this.xhr.addEventListener("abort", () => reject());
    this.xhr.addEventListener("load", () => {
      const response = this.xhr.response;

      if (!response || response.error) {
        const errorMsg = response.message[0];
        return reject(response && response.error ? errorMsg : genericErrorText);
      }

      resolve({
        default: response.url,
      });
    });

    if (this.xhr.upload) {
      this.xhr.upload.addEventListener(
        "progress",
        (evt: ProgressEvent<XMLHttpRequestEventTarget>) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        }
      );
    }
  }

  _sendRequest(file: File) {
    const data = new FormData();
    data.append("file", file);

    this.xhr.send(data);
  }
}
