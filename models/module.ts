import Topic from "./topic";

interface IModule {
  id?: string;
  name: string;
  description?: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
  topics: Topic[];
}

export default class Module implements IModule {
  id?: string;
  name: string;
  description?: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
  topics: Topic[];

  constructor({ id, name, description, course, createdAt, updatedAt, topics }: IModule) {
    this.id = id;
    this.name = name;
    this.description = description || "";
    this.course = course;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.topics = topics || [];
  }

  static fromJson(json: any): Module {
    return new Module({
      id: json._id,
      name: json.name,
      description: json.description,
      course: json.course,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      topics: json.topics ? Topic.fromJsonArray(json.topics) : [],
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
      topics: this.topics ? this.topics.map((topic) => topic.toJson()) : [],
    };
  }

  static fromJsonArray(json: any[]): Module[] {
    return json.map((item) => Module.fromJson(item));
  }
}
