import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Button} from "antd";
import CheckButton from "react-validation/build/button";
import UserService from "services/user.service";
import { required, is_email } from "services/validator";



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    
    UserService.login(email, password)
    .then(response => {
        setSubmit(false);
        if(response.data.status_code === 200){
          delete response.data.status_code;
          UserService.setCurrentUser(response.data);
          window.location.href = "/mypage";
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

  if(UserService.getCurrentUser()) return <Redirect to="/mypage"/>
  return (
    <div>
      <section className="p-card">
        <h1 className="c-signin--header">ログイン</h1>
        <div className="c-card max-w500 mt-5">
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
          <div className="c-signin--box">
            <div className="c-signin--box__email">
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
                  validations={[required, is_email]}
                />
                <p className="c-form--itemlabel">パスワード</p>
                <Input
                  type="password"
                  className="c-form--input"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  validations={[required]}
                />
                <Button
                  htmlType="submit" 
                  className="c-btn c-btn-regist mt-4"
                  block 
                  loading={submit}>
                  <span>ログイン</span>
                </Button>

                <Link to="/forgot-password" className="c-form--link">パスワードの再設定</Link>
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    checkBtn = c;
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
    </div>
  );
}
