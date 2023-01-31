import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import api from 'api';
import JwtService from "services/jwt";

const VerifyEmail = (props) => {

  const history = useHistory();
  const { token } = props.match.params;

  useEffect(() => {
    api.userAuth.verifyEmail(token)
      .then((res) => {
        switch (res.data.statusCode) {
          case 200: {
            message.success(res.data.message);
            if (JwtService.getUser()) {
              let user = res.data.user;
              delete user.password;
              JwtService.setUser(user);
              history.push('/mypage');
            } else {
              history.push('/login');
            }
            break;
          }
          case 400: {
            message.error(res.data.message, () => {
              history.push('/verify/email');
            });
            break;
          }
          case 401: {
            message.error(res.data.message, () => {
              history.push('/verify/email');
            });
            break;
          }
          default: break;
        }
      })
      .catch(err => {
        message.error(err.response.data.message, () => {
          history.push('/verify/email');
        });
      })
  }, [history, token]);

  return null;
}


export default VerifyEmail;