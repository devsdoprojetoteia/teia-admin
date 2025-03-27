interface IUser {
  id?: string;
  name: string;
  phone: string;
  password?: string;
  role: string;
}

export default class User implements IUser {
  id?: string;
  name: string;
  phone: string;
  password?: string;
  role: string;

  constructor({ id, name, phone, password, role }: IUser) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.role = role;
  }

  static fromJson(json: any): User {
    return new User({
      id: json._id,
      name: json.name,
      phone: json.phone,
      password: json.password,
      role: json.role,
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      name: this.name,
      phone: this.phone,
      password: this.password,
      role: this.role,
    };
  }

  static fromJsonArray(json: any[]): User[] {
    return json.map((item) => User.fromJson(item));
  }

  public static roles = [
    { title: "Administrador", value: "administrador" },
    { title: "Tutor", value: "tutor" },
    { title: "Estudante", value: "estudante" },
  ];

  get roleItem() {
    return User.roles.find((role) => role.value === this.role);
  }

  get roleLabel() {
    const role = this.roleItem;
    return role ? role.title : "";
  }
}
