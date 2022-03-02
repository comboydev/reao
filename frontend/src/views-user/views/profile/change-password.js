import React, { useState } from "react";
import { Button } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

const vpassword = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        この項目は必須です！
      </div>
    );
  }
};

export default function ChangePassword(){

  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password_confirm, setNewPasswordConfirm] = useState('');
  const [submit, setSubmit] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  
  const currentUser = AuthService.getCurrentUser();
  const email = currentUser.email;
  var form, checkBtn;
 

  const updatePassword = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    if (new_password !== new_password_confirm) {
      setMessage("パスワードの確認が一致しません。");
      return;
    }


    setMessage('');
    setSubmit(true);
    setSuccessful(false);

    AuthService
      .changePassword(email, password, new_password)
      .then((res) => {
        setSubmit(false);
        setSuccessful(true);
        setMessage("パスワードを変更しました。");
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setSubmit(false);
        setMessage(resMessage);
      }
    );
  }

  return (
    <div>
      <section className="p-signup">
        <h1 className="c-changepassword--header">パスワード変更</h1>
        <div className="c-signin">
          {
          message && (
            <div className="form-group">
              <div className={
                  successful
                    ? "alert alert-success alert-bg"
                    : "alert alert-danger alert-bg"
                } role="alert">
                {message}
              </div>
            </div>
          )}
          <div>
            {
              !successful &&
              <Form
                onSubmit={updatePassword}
                ref={c => {
                  form = c;
                }}
              >
                <p className="c-form--itemlabel">既存パスワード</p>
                <Input
                  type="password"
                  className="c-form--input"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  validations={[required]}
                />

                <p className="c-form--itemlabel">新しいパスワード</p>
                <Input
                  type="password"
                  className="c-form--input"
                  value={new_password}
                  onChange={e=>setNewPassword(e.target.value)}
                  validations={[required, vpassword]}
                />

                <p className="c-form--itemlabel">新しいパスワード確認</p>
                <Input
                  type="password"
                  className="c-form--input"
                  value={new_password_confirm}
                  onChange={e=>setNewPasswordConfirm(e.target.value)}
                  validations={[required, vpassword]}
                />
                
                <Button type="primary" 
                  htmlType="submit" 
                  className="c-btn c-btn-regist signin"
                  block 
                  loading={submit}>
                  {!submit && <span>変更</span> }
                </Button>

                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    checkBtn = c;
                  }}
                />
              </Form>
            }
          </div>
        </div>
      </section>
    </div>
  );
}
