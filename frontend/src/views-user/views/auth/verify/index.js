import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Button} from "antd";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import { required, is_email } from "views-user/services/validator";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


const VerifyEmailForm = () => {

  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [_success, setSuccess] = useState('');
  const [_error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);

  var form, checkBtn;
  var user = AuthService.getCurrentUser();

  useEffect(()=>{
    setEmail(user.email);
  }, [])

  
  const handleSendLink = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    setSubmit(true);

    AuthService.sendLinkOfVerifyEmail(user.email, email)
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
        <div className="c-card">
          <h2 className="c-card--header mb-4 mt-4">メールアドレスの認証が<br/>完了していません</h2>
          <p className="c-card--article mb-5">
            仮登録メールを再送信します。<br/>
            メールアドレスを確認、修正の上送信してください。
          </p>
          <Form
            onSubmit={handleSendLink}
            ref={c => {
              form = c;
            }}
            style = {{ 
              textAlign:'left',
              maxWidth: '450px',
              margin: 'auto'
            }}
          >
            <div className="form-group">
              {_success &&
                <p className="alert alert-success alert-bg alert-center">{_success}</p>
              }
              { _error && 
                <p className="alert alert-danger alert-bg alert-center">{_error}</p>
              }
            </div>
            <p className="c-signin--formitemlabel">メールアドレス</p>
            <Input
              type="email"
              className="c-signin--input"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              validations={[required, is_email]}
            />

            <Button type="primary" 
              htmlType="submit" 
              className="c-btn c-btn-regist signin"
              block 
              loading={submit}>
              {!submit && <span>仮登録メール再送信</span> }
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


export default VerifyEmailForm;