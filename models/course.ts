import Module from "./module";

export interface IFile {
  type: "image" | "video" | "audio" | "file";
  url: string;
  thumb?: string;
  average?: string;
}

export interface ITeam {
  avatar?: IFile | null;
  name: string;
  role: string;
  linkedin: string;
}

interface ICourse {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  duration: string;
  learning: string[];
  requirements: string[];
  team: ITeam[];
  modules?: Module[];
}

export default class Course implements ICourse {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  duration: string;
  learning: string[];
  requirements: string[];
  team: ITeam[];
  modules?: Module[];

  constructor({ id, name, description, phone, published, duration, learning, requirements, team, modules }: ICourse) {
    this.id = id;
    this.name = name;
    this.description = description || "";
    this.phone = phone;
    this.published = published || false;
    this.duration = duration || "";
    this.learning = learning || [];
    this.requirements = requirements || [];
    this.team = team || [];
    this.modules = modules || [];
  }

  static fromJson(json: any): Course {
    const data = {
      id: json._id,
      name: json.name,
      description: json.description,
      phone: json.phone,
      published: json.published || false,
      duration: json.duration || "",
      learning: json.learning || [],
      requirements: json.requirements || [],
      team: json.team || [],
      modules: Module.fromJsonArray(json.modules || []),
    };
    // console.log("json", data);
    return new Course(data);
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      phone: this.phone,
      published: this.published,
      duration: this.duration,
      learning: this.learning,
      requirements: this.requirements,
      team: this.team,
      modules: this.modules?.map(module => module.toJson()) || [],
    };
  }

  static fromJsonArray(json: any[]): Course[] {
    return json.map((item) => Course.fromJson(item));
  }
}
