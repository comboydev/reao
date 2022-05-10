import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button } from 'antd';
import UserService from "services/user.service";
import { is_password, required, is_email } from "services/validator";


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      successful: false,
      message: "",
      submit: false
    };
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePasswordConfirm(e) {
    this.setState({
      password_confirm: e.target.value
    });
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      submit: false
    });

    this.form.validateAll();
    if (this.checkBtn.context._errors.length > 0)
      return;

    if (this.state.password !== this.state.password_confirm) {
      this.setState({
        successful: false,
        message: "パスワードの確認が一致しません。"
      });
      return;
    }

    this.setState({
      submit: true
    })

    UserService.register(
      this.state.email,
      this.state.password
    )
    .then(response => {
      //  login   
      if(response.data.status_code === 200){
        delete response.data.status_code;
        UserService.setCurrentUser(response.data);
        window.location.href = "/mypage";
      }
    })
    .catch(error => {
      console.log(error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        successful: false,
        message: resMessage,
        submit: false
      });
    });
  }

  render() {
    return (
      <div>
        <section className="p-card">
          <h1 className="c-signup--header">会員登録</h1>
        <div className="c-card max-w500 mt-5 c-signup">
            <h2 className="c-signup--header--sub">
              すでに登録されている方は<br/>こちらから<Link to="/login">ログイン</Link>してください
            </h2>
            {
              this.state.message && (
                <div className="form-group">
                  <p
                    className={
                      this.state.successful
                        ? "alert alert-success alert-bg alert-center"
                        : "alert alert-danger alert-bg alert-center"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </p>
                </div>
            )}
            <div className="c-signup--box">
              <div className="c-signup--box__email">
                <Form
                  onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div>
                      <p className="c-form--itemlabel">メールアドレス</p>
                      <Input
                        type="text"
                        className="c-form--input"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, is_email]}
                      />
                      <p className="c-form--itemlabel">パスワード</p>
                      <Input
                        type="password"
                        className="c-form--input"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, is_password]}
                      />
                      <article>
                        <p>利用できる文字は半角英数字です。</p>
                        <p>英大文字・英小文字・数字それぞれを最低1文字ずつ含む</p>
                        <p>8文字以上で入力ください。</p>
                      </article>

                      <p className="c-form--itemlabel">パスワード確認</p>
                      <Input
                        type="password"
                        className="c-form--input"
                        name="password_confirm"
                        value={this.state.password_confirm}
                        onChange={this.onChangePasswordConfirm}
                        validations={[required, is_password]}
                      />

                      <p className="c-form--checklabel">
                        <input type="checkbox" id="agree" />
                        <label htmlFor="agree"><Link to="/terms" target="_blank">利用規約</Link>に同意する</label>
                      </p>
                      
                      <Button 
                        htmlType="submit" 
                        className="c-btn c-btn-regist"
                        block 
                        loading={this.state.submit}>
                        <span>新規登録</span>
                      </Button>

                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
              {/* <div className="c-signup--box__sns">
                <p className="c-form--label">
                  SNSでユーザー登録
                </p>
                <Button type="primary"
                  className="c-btn c-btn-social c-btn-social--facebook"
                >
                  Facebookで登録
                </Button>
                <Button type="primary"
                  className="c-btn c-btn-social c-btn-social--twitter">
                  Twitterで登録
                </Button>
                <Button type="primary"                                                      
                  className="c-btn c-btn-social c-btn-social--line">                                          
                  LINEで登録
                </Button>                                                                                             
              </div>                                                                 */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
