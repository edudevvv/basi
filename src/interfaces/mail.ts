export interface IDataMail {
  user: string;
  pass: string;
}

export interface ISendMail {
  from: string;
  to: string;
  subject: string;
}