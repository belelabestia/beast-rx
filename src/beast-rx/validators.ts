import { brand, Branded, Creator } from './brand';

export type Email = Branded<string>;
export type NonEmptyString = Branded<string>;

const emailRegex =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export const email: Creator<string, Email> = (text) =>
  emailRegex.test(text) ? brand<string, Email>(text) : null;

export const nonEmptyString: Creator<string, NonEmptyString> = (text) =>
  text != '' ? brand<string, NonEmptyString>(text) : null;
