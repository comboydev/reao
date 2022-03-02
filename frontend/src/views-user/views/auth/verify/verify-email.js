import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmail } from "validator";
import AuthService from "../../../services/auth.service";

const API_URL = process.env.REACT_APP_API_URL;


const VerifyEmail = (props) => {

  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const { token } = props.match.params;

  useEffect(()=>{

    AuthService.verifyEmail(token)
    .then((res) => {
      setLoaded(true);
      switch(res.data.status_code){
        case 200: {
          let user = AuthService.getCurrentUser();
          if(user){
            user.status.emailVerified = true;
            user.email = res.data.email;
            AuthService.setCurrentUser(user);
          }
          setSuccess(true);
          break;
        }
        case 400: {
          setSuccess(false);
          break;
        }
        case 401: {
          history.push('/login');
          break;
        }
        default: break;
      }
    })
    .catch(err => {
      setLoaded(true);
      setSuccess(false);
    })
  }, []);

  return (
    <section className="p-card" style={{ minHeight: '550px' }}>
      {
        loaded &&
          <div className="c-card">
            <h2 className="c-card--header mb-4 mt-4">メールアドレスの認証が<br/>完了しました！</h2>
            {
              !AuthService.getCurrentUser() &&
              <p className="c-card--article mb-5">
                すでに登録されている方は<br/>こちらから<Link to="/login">ログイン</Link>してください
              </p>
            }
          </div>
      }
    </section>
  );
}


export default VerifyEmail;