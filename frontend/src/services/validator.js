import { isEmail, isMobilePhone } from "validator";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        この項目は必須です！
      </div>
    );
  }
};

const is_email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        メールアドレスを入力してください。
      </div>
    );
  }
};


const is_password = value => {
  if (!value.match("(?=.*[1,2,3,4,5,6,7,8,9,0])(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
    return (
      <div className="alert alert-danger" role="alert">
        パスワードが条件に合わないです。
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

const is_phoneNumber = value => {
  if(!isMobilePhone(value)){
    return (
      <div className="alert alert-danger" role="alert">
        電話番号が条件に合わないです。
      </div>
    );
  }
};

export {
  is_password,
  is_email,
  is_phoneNumber,
  vpassword,
  required
}