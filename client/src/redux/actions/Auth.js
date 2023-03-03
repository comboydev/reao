import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SIGNUP_WITH_GOOGLE,
  SIGNUP_WITH_FACEBOOK,
  SIGNUP_WITH_APPLE,
  SIGNIN_WITH_APPLE,
  SIGNIN_WITH_APPLE_AUTHENTICATED,
  SIGNIN_WITH_TWITTER,
  SIGNUP_WITH_TWITTER,
  SIGNIN_WITH_TWITTER_AUTHENTICATED,
  SIGNUP_WITH_LINE,
  SIGNIN_WITH_LINE,
  SIGNIN_WITH_LINE_AUTHENTICATED
} from '../constants/Auth';

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

/* ----------------------------------
      Email Authentication
-----------------------------------*/
export const signUp = (payload) => {
  return {
    type: SIGNUP,
    payload,
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const signIn = (payload) => {
  return {
    type: SIGNIN,
    payload,
  }
};

export const authenticated = (token) => {
  return {
    type: AUTHENTICATED,
    token
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  }
};

/* ----------------------------------
      Google Authentication
-----------------------------------*/
export const signUpWithGoogle = () => {
  return {
    type: SIGNUP_WITH_GOOGLE
  };
};

export const signInWithGoogle = () => {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};

export const signInWithGoogleAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    token
  };
};

/* ----------------------------------
      Facebook Authentication
-----------------------------------*/
export const signUpWithFacebook = () => {
  return {
    type: SIGNUP_WITH_FACEBOOK,
  };
};

export const signInWithFacebook = () => {
  return {
    type: SIGNIN_WITH_FACEBOOK
  };
};

export const signInWithFacebookAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    token
  };
};

/* ----------------------------------
      Twitter Authentication
-----------------------------------*/
export const signUpWithTwitter = () => {
  return {
    type: SIGNUP_WITH_TWITTER,
  };
};

export const signInWithTwitter = () => {
  return {
    type: SIGNIN_WITH_TWITTER
  };
};

export const signInWithTwitterAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_TWITTER_AUTHENTICATED,
    token
  };
};

/* ----------------------------------
      Apple Authentication
-----------------------------------*/
export const signUpWithApple = () => {
  return {
    type: SIGNUP_WITH_APPLE,
  };
};

export const signInWithApple = () => {
  return {
    type: SIGNIN_WITH_APPLE
  };
};

export const signInWithAppleAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_APPLE_AUTHENTICATED,
    token
  };
};

/* ----------------------------------
      LINE Authentication
-----------------------------------*/
export const signUpWithLine = () => {
  return {
    type: SIGNUP_WITH_LINE,
  };
};

export const signInWithLine = () => {
  return {
    type: SIGNIN_WITH_LINE
  };
};

export const signInWithLineAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_LINE_AUTHENTICATED,
    token
  };
};