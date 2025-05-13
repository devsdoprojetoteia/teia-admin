interface ITopic {
  id?: string;
  title: string;
  content: string;
  module: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export default class Topic implements ITopic {
  id?: string;
  title: string;
  content: string;
  module: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, title, content, module, order, createdAt, updatedAt }: ITopic) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.module = module;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Topic {
    return new Topic({
      id: json._id,
      title: json.title,
      content: json.content,
      module: json.module,
      order: json.order,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      title: this.title,
      content: this.content,
      module: this.module,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJsonArray(json: any[]): Topic[] {
    return json.map((item) => Topic.fromJson(item));
  }
} 