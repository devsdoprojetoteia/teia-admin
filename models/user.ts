export default interface User {
  _id?: String;
  name: String;
  email: String;
  role: String;
  password?: String;
  services?: String;
  picture?: String;
  phone?: String;
  developer: Boolean;
  disabled: Boolean;
  customer?: String;
  status?: String;
  uid?: String;
}
