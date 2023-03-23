import request, { ResultType } from "./request";

export type LoginDataType = {
  username: string;
  password: string;
};

export type LoginResultType = {
  token?: string;
};

export const login = async (data: LoginDataType) => {
  return (await request.post("/login", data)) as ResultType<LoginResultType>;
};
