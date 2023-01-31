import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_email } from "plugins/validator";
import { notification } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";
import api from 'api';
import JwtService from "services/jwt";


const Login = ({ locale }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_submit, setSubmit] = useState(false);
  const [_message, setMessage] = useState('');
  var _form, _checkBtn;

  const handleLogin = (e) => {
    e.preventDefault();

    _form.validateAll();
    if (_checkBtn.context._errors.length > 0)
      return;

    setMessage('');
    setSubmit(true);

    api.userAuth.login(email, password)
      .then(response => {
        setSubmit(false);
        if (response.data.statusCode === 200) {
          delete response.data.statusCode;
          JwtService.setUser(response.data);
          notification.success({ message: "ログインしました!" });
          history.push("/mypage");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSubmit(false);
      });
  }

  if (JwtService.getUser()) return <Redirect to="/mypage" />

  return (
    <section className="p-card">
      {
        locale === 'ja' ?
          <div className="c-header">
            <h3 className="c-header--title">ログイン</h3>
            <p className="c-header--subtitle">Login</p>
          </div>
          :
          <div className="c-header">
            <h3 className="c-header--title">LOGIN</h3>
            <p className="c-header--subtitle">ログイン</p>
          </div>
      }
      <div className="c-card max-w500 mt-5">
        {
          locale === 'ja' ?
            <h2 className="c-signin--header--sub">
              まだ登録がお済みでない方は<br />こちらから<Link to="/register">会員登録</Link>してください
            </h2>
            : <h2 className="c-signin--header--sub">
              Not registered yet?<br />Please <Link to="/register">register</Link> here.
            </h2>
        }
        {
          _message && (
            <div className="form-group">
              <div className="alert alert-danger alert-bg alert-center" role="alert">
                {_message}
              </div>
            </div>
          )}
        <div className="c-signin--box">
          <div className="c-signin--box__email">
            <Form
              onSubmit={handleLogin}
              ref={c => {
                _form = c;
              }}
            >
              <p className="c-form--itemlabel">
                <IntlMessage id="page.auth.email" defaultMessage="メールアドレス" />
              </p>
              <Input
                type="email"
                className="c-form--input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validations={[required, is_email]}
              />
              <p className="c-form--itemlabel">
                <IntlMessage id="page.auth.password" defaultMessage="パスワード" />
              </p>
              <Input
                type="password"
                className="c-form--input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validations={[required]}
              />
              <Button
                htmlType="submit"
                className="c-btn c-btn-regist mt-4"
                block
                loading={_submit}>
                <span>
                  <IntlMessage id="page.auth.btn.login" defaultMessage="ログイン" />
                </span>
              </Button>

              <Link to="/forgot-password" className="c-form--link">
                <IntlMessage id="page.auth.forgot_password" defaultMessage="パスワードの再設定" />
              </Link>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  _checkBtn = c;
                }}
              />
            </Form>
          </div>
          {/* <div className="c-signin--box__sns">
            <p className="c-signin--formlabel">
              SNSでログイン
            </p>
            <Button type="primary"
              className="c-btn c-btn-social c-btn-social--facebook">
              Facebookでログイン
            </Button>
            <Button type="primary"
              className="c-btn c-btn-social c-btn-social--twitter">
              Twitterでログイン
            </Button>
            <Button type="primary"
              className="c-btn c-btn-social c-btn-social--line">
              LINEでログイン
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ theme }) => {
  const { locale } = theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(Login));