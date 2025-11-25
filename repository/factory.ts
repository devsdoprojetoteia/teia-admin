import type { $Fetch } from "nitropack";

interface ApiConfig {
  baseURL?: string;
  headers?: {
    "Content-Type"?: string;
  };
}

class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch, options: ApiConfig = {}) {
    this.$fetch = fetcher;
  }

  async call<T>(
    method: "get" | "patch" | "post" | "put" | "delete",
    url: string,
    data?: object,
    extras = {}
  ): Promise<T> {
    const $res: T = await this.$fetch(url, {
      method,
      body: data,
      ...extras,
    });
    return $res;
  }

  async apiGet<T>(url: string, extras = {}): Promise<T> {
    console.log("apiGet", url);
    console.log("extras", extras);
    console.log("this.call", await this.call<T>("get", url, undefined, extras));
    console.log("--------------------------------");

    return await this.call<T>("get", url, undefined, extras);
  }

  async apiPost<T>(url: string, data?: object, extras = {}): Promise<T> {
    return await this.call<T>("post", url, data, extras);
  }

  async apiPut<T>(url: string, data?: object, extras = {}): Promise<T> {
    return await this.call<T>("put", url, data, extras);
  }

  async apiPatch<T>(url: string, data?: object, extras = {}): Promise<T> {
    return await this.call<T>("patch", url, data, extras);
  }

  async apiDelete<T>(url: string, extras = {}): Promise<T> {
    return await this.call<T>("delete", url, undefined, extras);
  }
}

export default HttpFactory;