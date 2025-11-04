interface IProgressAnswer {
  question: string;
  answer: string;
  createdAt: Date;
}

interface IProgressUser {
  id: string;
  name: string;
  phone: string;
}

interface IUserCourseAnswer {
  id: string;
  user: IProgressUser;
  course: string;
  answers: IProgressAnswer[];
}

export default class UserCourseAnswer implements IUserCourseAnswer {
  id: string;
  user: IProgressUser;
  course: string;
  answers: IProgressAnswer[];
  constructor({ id, user, course, answers }: IUserCourseAnswer) {
    this.id = id;
    this.user = user;
    this.course = course;
    this.answers = answers;
  }

  static fromJson(json: any): UserCourseAnswer {
    return new UserCourseAnswer({
      id: json._id,
      user: json.user,
      course: json.course,
      answers: json.answers || [],
    });
  }

  static fromJsonArray(json: any[]): UserCourseAnswer[] {
    return json.map(UserCourseAnswer.fromJson);
  }
}
