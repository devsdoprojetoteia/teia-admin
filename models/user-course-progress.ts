interface IProgressTopic {
  module: string;
  topic: string;
  createdAt: Date;
}

interface IProgressModule {
  module: string;
  createdAt: Date;
}

interface IProgressUser {
  id: string;
  name: string;
  phone: string;
}

interface IUserCourseProgress {
  id: string;
  user: IProgressUser;
  course: string;
  topics: IProgressTopic[];
  modules: IProgressModule[];
}

export default class UserCourseProgress implements IUserCourseProgress {
  id: string;
  user: IProgressUser;
  course: string;
  topics: IProgressTopic[];
  modules: IProgressModule[];
  constructor({ id, user, course, topics, modules }: IUserCourseProgress) {
    this.id = id;
    this.user = user;
    this.course = course;
    this.topics = topics;
    this.modules = modules;
  }

  static fromJson(json: any): UserCourseProgress {
    return new UserCourseProgress({
      id: json._id,
      user: json.user,
      course: json.course,
      topics: json.topics || [],
      modules: json.modules || [],
    });
  }

  static fromJsonArray(json: any[]): UserCourseProgress[] {
    return json.map(UserCourseProgress.fromJson);
  }
}
