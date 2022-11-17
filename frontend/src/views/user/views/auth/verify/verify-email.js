import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserService from "services/user.service";
import { message } from "antd";

const VerifyEmail = (props) => {

  const history = useHistory();
  const { token } = props.match.params;

  useEffect(() => {
    UserService.verifyEmail(token)
    .then((res) => {
      switch(res.data.status_code){
        case 200: {
          message.success(res.data.message);
          if( UserService.getCurrentUser() ){
            let user = res.data.user;
            delete user.password;
            UserService.setCurrentUser(user);
            history.push('/mypage');
          } else {
            history.push('/login');
          }
          break;
        }
        case 400: {
          message.error(res.data.message, ()=>{
            history.push('/verify/email');
          });
          break;
        }
        case 401: {
          message.error(res.data.message, () =>{
            history.push('/verify/email');
          });
          break;
        }
        default: break;
      }
    })
    .catch(err => {
      message.error(err.response.data.message, ()=>{
        history.push('/verify/email');
      });
    })
  }, [history, token]);

  return null;
}


export default VerifyEmail;