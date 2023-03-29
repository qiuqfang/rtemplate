import { login } from "@/api";
import Logo from "@/components/logo";
import { useUserStore } from "@/store/user";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./index.less";

function Login() {
  const navigate = useNavigate();

  const setToken = useUserStore((state) => state.setToken);

  const [loginForm] = Form.useForm();

  const { t } = useTranslation();

  const handleLogin = async () => {
    if ("dev" === process.env.MODE) {
      const loginFields = await loginForm.validateFields().catch((errorInfo) => {
        console.log(errorInfo);
      });
      if (loginFields) {
        const result = await login(loginFields);
        if (result.code === 200) {
          setToken(result.data?.token as string);
          message.success(t("common.loginSuccess") as string);
          navigate("/");
        } else {
          message.error(t("common.loginFail") as string);
        }
      }
    } else {
      setToken(window.crypto.randomUUID());
      message.success(t("common.loginSuccess") as string);
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper flex flex-col items-center">
      <Logo imgSrc="https://www.qiuqfang.top/favicon.svg" />

      <Form name="login" form={loginForm} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: t("login.usernamePlaceholder") as string }]}
        >
          <Input placeholder={t("login.usernamePlaceholder") as string} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t("login.usernamePlaceholder") as string }]}
        >
          <Input.Password placeholder={t("login.passwordPlaceholder") as string} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleLogin}>
        {t("common.login")}
      </Button>
    </div>
  );
}

export default Login;
