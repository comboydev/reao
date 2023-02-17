import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_email } from "plugins/validator";
import IntlMessage from "components/util-components/IntlMessage";
import { connect } from 'react-redux'
import api from 'api';
import { useHistory } from "react-router-dom";

const VerifyEmailForm = ({ user }) => {
  const history = useHistory();

  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);

  var form, checkBtn;

  useEffect(() => {
    if (user?.emailVerified) history.push("/mypage");
    if (user) setEmail(user.email);
  }, [user, history])

  const handleSendLink = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
      return;

    setSubmit(true);

    let current_email = user ? user.email : email;
    api.userAuth.sendLinkOfVerifyEmail(current_email, email)
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
        <div className="c-card">
          <h2 className="c-card--header mb-4 mt-4">
            <IntlMessage id="page.auth.verify.email" description="登録メールの認証" />
          </h2>
          <p className="c-card--article mb-5">
            <IntlMessage id="page.auth.verify.email.t1" description="仮登録メールを再送信します。" /><br />
            <IntlMessage id="page.auth.verify.email.t2" description="メールアドレスを確認、修正の上送信してください。" />
          </p>
          <Form
            onSubmit={handleSendLink}
            ref={c => {
              form = c;
            }}
            className="max-w500 m-auto"
          >
            <div className="form-group">
              {_success &&
                <p className="alert alert-success alert-bg alert-center">{_success}</p>
              }
              {_error &&
                <p className="alert alert-danger alert-bg alert-center">{_error}</p>
              }
            </div>
            <p className="c-signin--formitemlabel">
              <IntlMessage id="page.auth.email" description="メールアドレス" />
            </p>
            <Input
              type="email"
              className="c-signin--input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validations={[required, is_email]}
            />

            <Button
              htmlType="submit"
              className="c-btn c-btn-regist d-flex align-items-center justify-content-center mt-4"
              block
              loading={submit}>
              <span>
                <IntlMessage id="page.auth.verify.email.submit" description="仮登録メール再送信" />
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
      </section>
    </div>
  );
}


export default connect(({ appStore }) => appStore)(VerifyEmailForm)