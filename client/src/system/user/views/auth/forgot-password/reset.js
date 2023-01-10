import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button, message } from "antd";
import CheckButton from "react-validation/build/button";
import { required, is_password} from "plugins/validator";
import IntlMessage from "components/util-components/IntlMessage";
import userAuth from "api/user/auth";

export default function ForgotPassword(props) {

  const history = useHistory();
  const { token } = props.match.params;

  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [submit, setSubmit] = useState(false);
  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  var form, checkBtn;

  useEffect(() => {
    userAuth.checkLinkOfResetPassword(token)
    .then(res => {
      if(res.data.status_code === 200){
        setLoaded(true);
      } else {
        message.error("失敗しました。", ()=>{
          history.push("/forgot-password")
        })
      }
    })
  }, [history, token])


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    setSubmit(true);
    
    userAuth.resetPassword(token, password)
    .then(res => {
        setSubmit(false);
        switch(res.data.status_code){
          case 200: {
            message.success(res.data.message, ()=>{
              history.push('/login');
            });
            break;
          }
          case 400: {
            message.error(res.data.message, ()=>{
              history.push('/forgot-password');
            });
            break;
          }
          case 401: {
            message.error(res.data.message, ()=>{
              history.push('/forgot-password');
            });
            break;
          }
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
      message.error(resMessage, ()=>{
        history.push('/forgot-password');
      });
    })
  }

  if(!loaded) return null;
  return (
    <div>
      <section className="p-card c-signup">
        <div className="c-header">
          <h3 className="c-header--title">パスワードの再設定</h3>
          <p className="c-header--subtitle">Reset Password</p>
        </div>
        <div className="c-card max-w500 mt-4">
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
              <p className="c-form--itemlabel">
                <IntlMessage id="page.auth.password" description="パスワード" />
              </p>
              <Input
                type="password"
                className="c-form--input"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                validations={[required, is_password]}
              />
              <article>
                <IntlMessage id="page.auth.rule.password.t1" description="利用できる文字は半角英数字です。" /> <br/>
								<IntlMessage id="page.auth.rule.password.t2" description="英大文字・英小文字・数字それぞれを最低1文字ずつ含む" /> <br/>
								<IntlMessage id="page.auth.rule.password.t3" description="8文字以上で入力ください。" />
              </article>

              <p className="c-form--itemlabel">
                <IntlMessage id="page.auth.password_confirm" description="パスワード確認" />
              </p>
              <Input
                type="password"
                className="c-form--input"
                name="password_confirm"
                value={password_confirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                validations={[required, is_password]}
              />

              <Button
                htmlType="submit" 
                className="c-btn c-btn-regist mt-4"
                block 
                loading={submit}>
                  <span>
                    <IntlMessage id="page.auth.reset.password.submit" description="再設定" />
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
