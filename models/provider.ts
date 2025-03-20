interface IProvider {
  id?: string;
  slug: string;
  name: string;
  description: string;
  corporateName?: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  theme?: string;
  primaryColor?: string;
  about?: string;
  logo?: string;
}

export default class Provider implements IProvider {
  id?: string;
  slug: string;
  name: string;
  description: string;
  corporateName?: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  theme?: string;
  primaryColor?: string;
  about?: string;
  logo?: string;

  constructor({
    id,
    slug,
    name,
    description,
    corporateName,
    cnpj,
    address,
    phone,
    email,
    notes,
    theme,
    primaryColor,
    about,
    logo,
  }: IProvider) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.corporateName = corporateName;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.notes = notes;
    this.theme = theme;
    this.primaryColor = primaryColor;
    this.about = about;
    this.logo = logo;
  }

  static fromJson(json: any): Provider {
    return new Provider({
      id: json._id,
      slug: json.slug,
      name: json.name,
      description: json.description,
      corporateName: json.corporate_name,
      cnpj: json.cnpj,
      address: json.address,
      phone: json.phone,
      email: json.email,
      notes: json.notes,
      theme: json.theme,
      primaryColor: json.primary_color,
      about: json.about,
      logo: json.logo,
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      slug: this.slug,
      name: this.name,
      description: this.description,
      corporate_name: this.corporateName,
      cnpj: this.cnpj,
      address: this.address,
      phone: this.phone,
      email: this.email,
      notes: this.notes,
      theme: this.theme,
      primary_color: this.primaryColor,
      about: this.about,
      logo: this.logo,
    };
  }

  static fromJsonArray(json: any[]): Provider[] {
    return json.map((provider) => Provider.fromJson(provider));
  }
}
