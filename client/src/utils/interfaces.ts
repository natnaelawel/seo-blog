export interface IUser {
  _id: any;
  encryptPassword: Function;
  authenticate: Function;
  name: String;
  username: String;
  email: String;
  password: string;
  profile: String;
  salt: String;
  about: String;
  role: any | null;
  photo: String;
  resetPasswordLink: String;
}

export interface ICategory {
  _id: String | any;
  name: String;
  slug: String;
}

export interface ITag {
  _id: String | any;
  slug: string;
  name: String;
}
export interface IBlog {
  _id: any;
  title: String;
  slug: String;
  body: String;
  categories: ICategory[];
  tags: ITag[];
  photo: String;
  excerpt: String;
  meta_title: String;
  meta_desc: String;
  posted_by: IUser;
  updatedAt: Date;
  createdAt: Date;
}
