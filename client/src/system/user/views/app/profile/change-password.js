import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from "plugins/validator"
import api from 'api';
import { connect } from "react-redux";

const ChangePassword = ({ user }) => {
  const history = useHistory();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [submit, setSubmit] = useState(false);
  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');

  const email = user.email;
  var form, checkBtn;

  const updatePassword = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
      return;

    if (newPassword !== newPasswordConfirm) {
      setError("パスワードの確認が一致しません。");
      return;
    }

    setSuccess('');
    setError('');
    setSubmit(true);

    api.userAuth
      .changePassword(email, password, newPassword)
      .then((res) => {
        setSubmit(false);
        if (res.data.statusCode === 200) {
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
        {_error &&
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
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />

            <p className="c-form--itemlabel">新しいパスワード</p>
            <Input
              type="password"
              className="c-form--input"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              validations={[required]}
            />

            <p className="c-form--itemlabel">新しいパスワード確認</p>
            <Input
              type="password"
              className="c-form--input"
              value={newPasswordConfirm}
              onChange={e => setNewPasswordConfirm(e.target.value)}
              validations={[required]}
            />

            <Button type="primary"
              htmlType="submit"
              className="c-btn c-btn-regist mt-4"
              loading={submit}>
              {!submit && <span>変更</span>}
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

export default connect(({ appStore }) => appStore)(ChangePassword)