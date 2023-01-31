import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_email } from "plugins/validator";
import IntlMessage from "components/util-components/IntlMessage";
import api from 'api';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);
  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');

  var form, checkBtn;


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
      return;

    setSubmit(true);

    api.userAuth.sendLinkOfResetPassword(email)
      .then(res => {
        setSubmit(false);
        switch (res.data.statusCode) {
          case 200: setSuccess(res.data.message); break;
          case 400: setError(res.data.message); break;
          default: break;
        }
      })
      .catch(error => {
        setSubmit(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(resMessage);
      })
  }

  return (
    <div>
      <section className="p-card">
        <div className="c-header">
          <h3 className="c-header--title">
            <IntlMessage id="page.auth.forgot.password.title.jp" description="パスワードの再設定" />
          </h3>
          <p className="c-header--subtitle">
            <IntlMessage id="page.auth.forgot.password.title.en" description="Forgot your password?" />
          </p>
        </div>
        <div className="c-card max-w500 mt-4">
          <h2 className="c-signin--header--sub">
            <IntlMessage id="page.auth.forgot.password.t1" description="登録したメールアドレスに" /> <br />
            <IntlMessage id="page.auth.forgot.password.t2" description="パスワードリセットリンクをお送りします。" />
          </h2>
          {_success &&
            <p className="alert alert-success alert-bg alert-center">{_success}</p>
          }
          {_error &&
            <p className="alert alert-danger alert-bg alert-center">{_error}</p>
          }
          <div>
            <Form
              onSubmit={handleSubmit}
              ref={c => {
                form = c;
              }}
            >
              <p className="c-form--itemlabel">
                <IntlMessage id="page.auth.email" description="登録メール" />
              </p>
              <Input
                type="email"
                className="c-form--input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validations={[required, is_email]}
              />
              <Button
                htmlType="submit"
                className="c-btn c-btn-regist mt-4"
                block
                loading={submit}>
                <span>
                  <IntlMessage id="page.auth.forgot.password.submit" description="リセットリンクを送信" />
                </span>
              </Button>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
