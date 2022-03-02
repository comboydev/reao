import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmail } from "validator";
import AuthService from "../../../services/auth.service";

const API_URL = process.env.REACT_APP_API_URL;

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        この項目は必須です！
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        メールアドレスを入力してください。
      </div>
    );
  }
};


const vpassword = value => {
  if (!value.match("(?=.*[1,2,3,4,5,6,7,8,9,0])(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
    return (
      <div className="alert alert-danger" role="alert">
        パスワードが条件に合わないです。
      </div>
    );
  }
};

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

    AuthService.registerTemp(
      this.state.email,
      this.state.password
    )
    .then(response => {
      console.log(response);
      this.setState({
        message: response.data.message,
        successful: true,
        submit: false
      });
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
        <section className="p-signup">
          <h1 className="c-title">メール確認</h1>
          <div className="c-signup">
            <h2 className="c-signup--header--sub" style={{ marginBottom: '0px' }}>
              メール確認完了しました。<br/><br/>
              すでに登録されている方は<br/>こちらから<Link to="/login">ログイン</Link>してください
            </h2>
          </div>
        </section>
      </div>
    );
  }
}
