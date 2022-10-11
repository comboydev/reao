import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const RegisterComplete = ({ locale }) => {
  if(locale === 'ja')
    return (
      <div>
        <section className="p-card">
          <h1 className="c-signup--header">会員登録</h1>
          <div className="c-card mt-5 max-w600">
            <h2 className="c-card--header mb-4 mt-4">メール認証をお願いします</h2>
            <p className="c-card--article mb-5">
              ご登録のメールアドレスにメールを送付させていただきました。<br/>
              ご本人様確認のためメール内のURLにアクセスしていただき、<br/>本登録を完了させてください。
            </p>
          </div>
        </section>
      </div>
    );
  else 
    return (
      <div>
        <section className="p-card">
          <h1 className="c-signup--header">REGISTER</h1>
          <div className="c-card mt-5 max-w600">
            <h2 className="c-card--header mb-4 mt-4">Please authenticate your email</h2>
            <p className="c-card--article mb-5">
              We have sent an email to your registered email address.<br/>
              Please access the URL in the email to verify your identity, <br/>so that complete the main registration.
            </p>
          </div>
        </section>
      </div>
    );
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(RegisterComplete));