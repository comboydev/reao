import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_email } from "plugins/validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";
import {
  signIn,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook
} from "redux/actions";


const Login = (props) => {
  const {
    locale,
    token,
    signIn,
    loading,
    showLoading,
    hideAuthMessage,
    signInWithGoogle,
    message,
  } = props

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var _form, _checkBtn;

  const handleLogin = (e) => {
    e.preventDefault();

    _form.validateAll();
    if (_checkBtn.context._errors.length > 0)
      return;

    hideAuthMessage(true);
    showLoading();
    signIn({ email, password });
  }

  if (token) return <Redirect to="/mypage" />
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
          message && (
            <div className="form-group">
              <div className="alert alert-danger alert-bg alert-center" role="alert">
                {message}
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
                className="c-btn c-btn-regist d-flex align-items-center justify-content-center mt-4"
                block
                loading={loading}>
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
          <div className="c-signin--box__sns">
            <p className="c-signin--formlabel">
              SNSでログイン
            </p>
            <Button type="primary"
              className="c-btn c-btn-social c-btn-social--facebook"
              onClick={signInWithGoogle}
            >
              Googleでログイン
            </Button>
            <Button type="primary"
              className="c-btn c-btn-social c-btn-social--facebook"
            >
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
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale } = theme;
  const { loading, message, token, redirect } = auth;
  return { locale, loading, message, token, redirect }
};

const mapDispatchToProps = {
  signIn,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));