import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from "plugins/validator"
import JwtService from "services/jwt";
import userAuth from "api/user/auth";

export default function ChangePassword(){

  const history = useHistory();

  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password_confirm, setNewPasswordConfirm] = useState('');
  const [submit, setSubmit] = useState(false);
  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');
  
  const currentUser = JwtService.getUser();
  const email = currentUser.email;
  var form, checkBtn;
 


  const updatePassword = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    if (new_password !== new_password_confirm) {
      setError("パスワードの確認が一致しません。");
      return;
    }

    setSuccess('');
    setError('');
    setSubmit(true);

    userAuth
      .changePassword(email, password, new_password)
      .then((res) => {
        setSubmit(false);
        if(res.data.status_code === 200){
          message.success(res.data.message);
          history.push('/profile')
        } else {
          message.error(res.data.message)
        }
      })
      .catch(error => {
        setSubmit(false);
        message.error('エラーか発生しました。')
      }
    );
  }

  return (
    <section className="p-card px-0">
      <div className="c-header">
        <h3 className="c-header--title">パスワードの変更</h3>
        <p className="c-header--subtitle">Change Password</p>
      </div>
      <div className="c-signin">
        {_success &&
          <p className="alert alert-success alert-bg alert-center">{_success}</p>
        }
        { _error && 
          <p className="alert alert-danger alert-bg alert-center">{_error}</p>
        }
        <div>
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
              validations={[required]}
            />

            <p className="c-form--itemlabel">新しいパスワード確認</p>
            <Input
              type="password"
              className="c-form--input"
              value={new_password_confirm}
              onChange={e=>setNewPasswordConfirm(e.target.value)}
              validations={[required]}
            />
            
            <Button type="primary" 
              htmlType="submit" 
              className="c-btn c-btn-regist mt-4"
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
        </div>
      </div>
    </section>
  );
}
