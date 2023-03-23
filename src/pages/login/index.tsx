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

  const handleLogin = async () => {
    const loginFields = await loginForm.validateFields().catch((errorInfo) => {
      console.log(errorInfo);
    });
    if (loginFields) {
      const result = await login(loginFields);
      if (result.code === 200) {
        setToken(result.data?.token as string);
        message.success(result.message);
        navigate("/");
      } else {
        message.error(result.message);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <div className="login-wrapper flex flex-col items-center">
      <Logo imgSrc="https://www.qiuqfang.top/favicon.svg" />

      <Form name="login" form={loginForm} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleLogin}>
        {t("login.login_btn_text")}
      </Button>
    </div>
  );
}

export default Login;
