import type Module from "./module";

interface ICourse {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  modules?: Module[];
}

export default class Course implements ICourse {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  modules?: Module[];

  constructor({ id, name, description, phone, published, modules }: ICourse) {
    this.id = id;
    this.name = name;
    this.description = description || "";
    this.phone = phone;
    this.published = published || false;
    this.modules = modules || [];
  }

  static fromJson(json: any): Course {
    const data = {
      id: json._id,
      name: json.name,
      description: json.description,
      phone: json.phone,
      published: json.published || false,
      modules: json.modules || [],
    };
    console.log("json", data);
    return new Course(data);
  }

  toJson(): any {
    return {
      _id: this.id,
      name: this.name,
      description: this.description,
      phone: this.phone,
      published: this.published,
      modules: this.modules,
    };
  }

  static fromJsonArray(json: any[]): Course[] {
    return json.map((item) => Course.fromJson(item));
  }
}
