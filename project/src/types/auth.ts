export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  avatarUrl: string,
  email: string,
  id: number | null,
  isPro: boolean,
  name: string,
  token: string
};
