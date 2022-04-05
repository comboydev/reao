import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Button} from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_email} from "services/validator";
import UserService from "services/user.service";


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
    
    UserService.sendLinkOfResetPassword(email)
    .then(res => {
        setSubmit(false);
        switch(res.data.status_code){
          case 200: setSuccess(res.data.message); break;
          case 400: setError(res.data.message);  break;
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
          <h3 className="c-header--title">パスワードの再設定</h3>
          <p className="c-header--subtitle">Forgot your password?</p>
        </div>
        <div className="c-card max-w500 mt-4">
          <h2 className="c-signin--header--sub">
            登録したメールアドレスに<br/>パスワードリセットリンクをお送りします。
          </h2>
          {_success &&
            <p className="alert alert-success alert-bg alert-center">{_success}</p>
          }
          { _error && 
            <p className="alert alert-danger alert-bg alert-center">{_error}</p>
          }
          <div>
            <Form
              onSubmit={handleSubmit}
              ref={c => {
                form = c;
              }}
            >
              <p className="c-form--itemlabel">登録メールアドレス</p>
              <Input
                type="email"
                className="c-form--input"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                validations={[required, is_email]}
              />
              <Button
                htmlType="submit" 
                className="c-btn c-btn-regist mt-4"
                block 
                loading={submit}>
                 <span>リセットリンクを送信</span>
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
