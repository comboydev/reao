import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Button} from "antd";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        この項目は必須です！
      </div>
    );
  }
};

const val_email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        これは有効なメールではありません。
      </div>
    );
  }
};

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState('');
  var form, checkBtn;


  const handleLogin = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    setMessage('');
    setSubmit(true);
    
    AuthService.login(email)
    .then((response) => {
        window.location.href = "/top";
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

  return (
    <div>
      <section className="p-signin">
        <h1 className="c-signin--header">ログイン</h1>
        <div className="c-signin">
          <h2 className="c-signin--header--sub">
            まだ登録がお済みでない方は<br/>こちらから<Link to="/register">会員登録</Link>してください
          </h2>
          {
            message && (
            <div className="form-group">
              <div className="alert alert-danger alert-bg alert-center" role="alert">
                {message}
              </div>
            </div>
          )}
          <div>
            <Form
              onSubmit={handleLogin}
              ref={c => {
                form = c;
              }}
            >
              <p className="c-form--itemlabel">メールアドレス</p>
              <Input
                type="email"
                className="c-form--input"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                validations={[required, val_email]}
              />
              <Button type="primary" 
                htmlType="submit" 
                className="c-btn c-btn-regist signin"
                block 
                loading={submit}>
                {!submit && <span>リセットリンクを送信する</span> }
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
