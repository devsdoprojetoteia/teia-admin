import HttpFactory from "../factory";
import Provider from "../../models/provider";

class ProvidersModule extends HttpFactory {
  async list(): Promise<Provider[]> {
    const json = await this.apiGet<any[]>(`/api/providers`);
    return Provider.fromJsonArray(json);
  }
  async getPublic(providerSlug: string): Promise<Provider> {
    const json = await this.apiGet(`/api/providers/public/${providerSlug}`);
    return Provider.fromJson(json);
  }
  async get(id: string): Promise<Provider> {
    const json = await this.apiGet(`/api/providers/${id}`);
    return Provider.fromJson(json);
  }

  async create(data: Provider): Promise<Provider> {
    const json = await this.apiPost(`/api/providers`, data);
    return Provider.fromJson(json);
  }

  async update(id: string, data: Provider): Promise<Provider> {
    const json = await this.apiPut(`/api/providers/${id}`, data);
    return Provider.fromJson(json);
  }

  async delete(id: string): Promise<Provider> {
    const json = await this.apiDelete(`/api/providers/${id}`);
    return Provider.fromJson(json);
  }
}

export default ProvidersModule;
