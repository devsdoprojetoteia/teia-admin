import HttpFactory from "../factory";
import Provider from "../../models/provider";

class ProvidersModule extends HttpFactory {
  async list(): Promise<Provider[]> {
    const json = await this.apiGet<any[]>(`/v1/providers`);
    return Provider.fromJsonArray(json);
  }
  async getPublic(providerSlug: string): Promise<Provider> {
    const json = await this.apiGet(`/v1/providers/public/${providerSlug}`);
    return Provider.fromJson(json);
  }
  async get(id: string): Promise<Provider> {
    const json = await this.apiGet(`/v1/providers/${id}`);
    return Provider.fromJson(json);
  }

  async create(data: Provider): Promise<Provider> {
    const json = await this.apiPost(`/v1/providers`, data);
    return Provider.fromJson(json);
  }

  async update(id: string, data: Provider): Promise<Provider> {
    const json = await this.apiPut(`/v1/providers/${id}`, data);
    return Provider.fromJson(json);
  }

  async delete(id: string): Promise<Provider> {
    const json = await this.apiDelete(`/v1/providers/${id}`);
    return Provider.fromJson(json);
  }
}

export default ProvidersModule;
