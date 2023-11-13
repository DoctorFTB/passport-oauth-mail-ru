import { Strategy as BaseStrategy } from 'passport';

export interface Profile {
  provider: string;

  id: string;

  username: string;
  displayName: string;

  name: {
    givenName: string;
    familyName: string;
  }

  gender?: 'm' | 'f';

  emails: { value: string }[];

  photos?: { value: string }[];

  _raw: string;
  _json: {
    client_id: string;
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    nickname: string;
    image: string;
    locale: string;
    gender?: 'm' | 'f';
  }
}

interface Config {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

type Callback<U> = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: string | null, user: U) => void,
) => void;

export class Strategy<U> extends BaseStrategy {
  public constructor(config: Config, callback: Callback<U>);
}
