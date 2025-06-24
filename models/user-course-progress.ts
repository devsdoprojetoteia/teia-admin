interface IProgressTopic {
  module: string;
  topic: string;
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
}

export default class UserCourseProgress implements IUserCourseProgress {
  id: string;
  user: IProgressUser;
  course: string;
  topics: IProgressTopic[];

  constructor({ id, user, course, topics }: IUserCourseProgress) {
    this.id = id;
    this.user = user;
    this.course = course;
    this.topics = topics;
  }

  static fromJson(json: any): UserCourseProgress {
    return new UserCourseProgress({
      id: json._id,
      user: json.user,
      course: json.course,
      topics: json.topics,
    });
  }

  static fromJsonArray(json: any[]): UserCourseProgress[] {
    return json.map(UserCourseProgress.fromJson);
  }
}
