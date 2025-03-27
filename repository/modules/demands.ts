import Demand from "~~/models/demand";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class DemandsModule extends HttpFactory {
  async list() {
    const json = await this.apiGet<any[]>(`/api/demands`);
    return Demand.fromJsonArray(json);
  }
  async get(id: string): Promise<Demand> {
    const json = await this.apiGet(`/api/demands/${id}`);
    return Demand.fromJson(json);
  }

  async create(data: FormValues): Promise<Demand> {
    const json = await this.apiPost(`/api/demands`, data);
    return Demand.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<Demand> {
    const json = await this.apiPut(`/api/demands/${id}`, data);
    return Demand.fromJson(json);
  }
}

export default DemandsModule;
