import React from "react";
import TwitterLogin from "react-twitter-login";

export default (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey="CONSUMER_KEY"
      consumerSecret="CONSUMER_SECRET"
      className="c-btn-social c-btn-social--twitter"
    >
              <button className="c-btn-social c-btn-social--twitter" style={{margin:"auto"}}>
                Twitterでログイン
              </button>
    </TwitterLogin>
  );
};