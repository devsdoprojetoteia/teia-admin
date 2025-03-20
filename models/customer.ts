interface ICustomer {
  id?: string;
  name: String;
  corporateName?: String;
  cnpj?: String;
  address?: String;
  phone?: String;
  email?: String;
  notes?: String;
  pointPrice?: Number;
  pointsPerDay?: Number;
}

export default class Customer implements ICustomer {
  id?: string;
  name: String;
  corporateName?: String;
  cnpj?: String;
  address?: String;
  phone?: String;
  email?: String;
  notes?: String;
  pointPrice?: Number;
  pointsPerDay?: Number;

  constructor({
    id,
    name,
    corporateName,
    cnpj,
    address,
    phone,
    email,
    notes,
    pointPrice,
    pointsPerDay,
  }: ICustomer) {
    this.id = id;
    this.name = name;
    this.corporateName = corporateName;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.notes = notes;
    this.pointPrice = pointPrice;
    this.pointsPerDay = pointsPerDay;
  }

  static fromJson(json: any): Customer {
    return new Customer({
      id: json._id,
      name: json.name,
      corporateName: json.corporate_name,
      cnpj: json.cnpj,
      address: json.address,
      phone: json.phone,
      email: json.email,
      notes: json.notes,
      pointPrice: json.point_price,
      pointsPerDay: json.points_per_day,
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      name: this.name,
      corporate_name: this.corporateName,
      cnpj: this.cnpj,
      address: this.address,
      phone: this.phone,
      email: this.email,
      notes: this.notes,
      point_price: this.pointPrice,
      points_per_day: this.pointsPerDay,
    };
  }

  static fromJsonArray(json: any[]): Customer[] {
    return json.map(Customer.fromJson);
  }
}
