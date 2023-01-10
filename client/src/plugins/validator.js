import { isEmail, isMobilePhone } from "validator";
import IntlMessage from "components/util-components/IntlMessage";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        <IntlMessage id="message.validation.required"/>
      </div>
    );
  }
};

const is_email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        <IntlMessage id="message.validation.is_email"/>
      </div>
    );
  }
};


const is_password = value => {
  if (!value.match("(?=.*[1,2,3,4,5,6,7,8,9,0])(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
    return (
      <div className="alert alert-danger" role="alert">
        <IntlMessage id="message.validation.is_password"/>
      </div>
    );
  }
};

const is_phoneNumber = value => {
  if(!isMobilePhone(value)){
    return (
      <div className="alert alert-danger" role="alert">
        <IntlMessage id="message.validation.is_phone"/>
      </div>
    );
  }
};

export {
  is_password,
  is_email,
  is_phoneNumber,
  required
}

