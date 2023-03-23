import { ResultType } from "./../api/request";
import { LoginDataType, LoginResultType } from "./../api/index";
import { rest } from "msw";

export const handlers = [
  rest.post("/login", async (req, res, ctx) => {
    const result = {
      code: 200,
      data: {},
      error: "",
      message: "登录成功",
    } as ResultType<LoginResultType>;

    const data = (await req.json()) as LoginDataType;
    console.log(data);
    if (data.username && data.password) {
      result.data.token = window.crypto.randomUUID();
    } else {
      result.code = 500;
      result.error = "Server error";
      result.message = "登录失败";
    }

    return res(ctx.json(result));
  }),
];
