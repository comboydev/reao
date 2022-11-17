import React from 'react';
import FacebookLogin from 'react-facebook-login'

// export default function FacebookLogins(){
//   const responseFacebook = (response) => {
//     console.log(response);
//     setData(response);
//     setPicture(response.picture.data.url);
//     if (response.accessToken) {
//       setLogin(true);
//     } else {
//       setLogin(false);
//     }
//   }
//   return(
//     <div>
//        <FacebookLogin
//               appId="921201001964201"
//               autoLoad={true}
//               fields="name,email,picture"
//               scope="public_profile,user_friends"
//               callback={responseFacebook}
//               icon="fa-facebook" />
//     </div>
//   )
// }
class FacebookLogins extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }
  componentClicked(){
    console.log("this is face click")
  }
  render() {
    return (
      <div>
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        callback={this.responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )} />
      <button className="c-btn-social c-btn-social--facebook">
                Facebookでログイン
              </button>
      </div>

    )
  }
}

export default FacebookLogins;