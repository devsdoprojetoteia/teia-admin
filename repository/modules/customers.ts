import HttpFactory from "../factory";
import Customer from "../../models/customer";
import type CustomerSummary from "~~/models/customer-summary";

class CustomersModule extends HttpFactory {
  async summary(id: string): Promise<CustomerSummary> {
    return await this.apiGet<CustomerSummary>(
      `/api/dashboard/customer/summary`,
      {
        params: {
          customer: id,
        },
      }
    );
  }

  async get(id: string): Promise<Customer> {
    const json = await this.apiGet(`/api/customers/${id}`);
    return Customer.fromJson(json);
  }

  async update(id: string, data: Customer): Promise<Customer> {
    const json = await this.apiPut(`/api/customers/${id}`, data);
    return Customer.fromJson(json);
  }
}

export default CustomersModule;
