interface IModule {
  id?: string;
  name: string;
  description?: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Module implements IModule {
  id?: string;
  name: string;
  description?: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, description, course, createdAt, updatedAt }: IModule) {
    this.id = id;
    this.name = name;
    this.description = description || "";
    this.course = course;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Module {
    return new Module({
      id: json._id,
      name: json.name,
      description: json.description,
      course: json.course,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      name: this.name,
      description: this.description,
      course: this.course,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJsonArray(json: any[]): Module[] {
    return json.map((item) => Module.fromJson(item));
  }
}
