export interface IContentItem {
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  content: string;
  order: number;
  id: string;
}

interface ITopic {
  id?: string;
  title: string;
  content: IContentItem[];
  module: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ContentItem implements IContentItem {
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  content: string;
  order: number;
  id: string;

  constructor({ type, content, order, id }: IContentItem) {
    this.type = type;
    this.content = content;
    this.order = order;
    this.id = id;
  }

  static fromJson(json: any): ContentItem {
    return new ContentItem({
      type: json.type,
      content: json.content,
      order: json.order,
      id: json._id,
    });
  }

  toJson(): any {
    return {
      type: this.type,
      content: this.content,
      order: this.order,
      id: this.id,
    };
  }

  static fromJsonArray(json: any[]): ContentItem[] {
    return json.map((item) => ContentItem.fromJson(item));
  }
}

export default class Topic implements ITopic {
  id?: string;
  title: string;
  content: ContentItem[];
  module: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, title, content, module, order, createdAt, updatedAt }: ITopic) {
    this.id = id;
    this.title = title;
    this.content = content ? content.map((item) => ContentItem.fromJson(item)) : [];
    this.module = module;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Topic {
    return new Topic({
      id: json._id,
      title: json.title,
      content: json.content ? json.content.map((item: any) => ContentItem.fromJson(item)) : [],
      module: json.module,
      order: json.order,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      content: this.content.map((item) => item.toJson()),
      module: this.module,
      order: this.order,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }

  static fromJsonArray(json: any[]): Topic[] {
    return json.map((item) => Topic.fromJson(item));
  }
} 