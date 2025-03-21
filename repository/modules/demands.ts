import Demand from "~~/models/demand";
import type { FormValues } from "~~/models/dynamic-form";
import HttpFactory from "../factory";

class DemandsModule extends HttpFactory {
  async list() {
    const json = await this.apiGet<any[]>(`/v1/demands`);
    return Demand.fromJsonArray(json);
  }
  async get(id: string): Promise<Demand> {
    const json = await this.apiGet(`/v1/demands/${id}`);
    return Demand.fromJson(json);
  }

  async create(data: FormValues): Promise<Demand> {
    const json = await this.apiPost(`/v1/demands`, data);
    return Demand.fromJson(json);
  }

  async update(id: string, data: FormValues): Promise<Demand> {
    const json = await this.apiPut(`/v1/demands/${id}`, data);
    return Demand.fromJson(json);
  }
}

export default DemandsModule;
