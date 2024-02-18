import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useTranslation } from "react-i18next"
import { addPlayerDB, checkPlayerExist } from "./api/gameFunctions"
import Cookies from 'universal-cookie';
// import fire from './fire'

export default function GoogleBtn (props) {
  let cookies = new Cookies();
  //const CLIENT_ID = '447555755943-b3ps2ofbdu8hhejvlksnm4b5o1h5q1vr.apps.googleusercontent.com';
  const CLIENT_ID = '213014914750-ul8qlavh60vm16d6e9d1lqoi2hjvc2hu.apps.googleusercontent.com';
  //const CLIENT_ID = '111265817797-1pv99pti5lt8nps2o51v28ph05ei0od8.apps.googleusercontent.com';
  const [isLogined, setLogined] = useState(cookies.get('login') || false)
  const [t] = useTranslation("global")
  let timeExpiration = new Date(Date.now() + (1000 * 3600 * 8))

  const responseGoogle = (response) => {
    var profile = response.getBasicProfile()
    if (profile) {
      cookies.set('login', true, { path: '/', expires: timeExpiration });
      setLogined(true)
      //CHECK IF PROFILE EXIST
      checkPlayerExist(profile.getName(), profile.getEmail(), profile.getImageUrl())
    }
    else {
      setLogined(false)
      cookies.remove('login', { path: '/' });
    }
  }

  const errorGoogleResponse = () => {
    alert('You have an error with Google response, please contact with staff')
  }

  const logout = () => {
    setLogined(false)
    cookies.remove('login', { path: '/' });
    //removePlayerDB(cookies.get('key'))
    cookies.remove('key', { path: '/' });
    window.location.href = '/'
  }

    return (
    <div>
      { isLogined ? 
        (props.type === 'header' ?
          <GoogleLogout
            clientId={CLIENT_ID}
            onLogoutSuccess={logout}
            render={renderProps => (
              <div className="c-header-mobile--option" onClick={logout} disabled={renderProps.disabled}>{t("header.logout")}</div>
            )}
            id="logoutButton"
          ></GoogleLogout> :
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            render={renderProps => (
              <div onClick={logout} disabled={renderProps.disabled} className="c-gbutton__home">
              <div style={{margiRight: "10px", padding: "10px"}}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg></div>
              {t("header.logout")}
            </div>
            )}
            id="logoutButton"
          ></GoogleLogout>)
        :
        (props.type === 'header' ?
          <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={errorGoogleResponse}
          render={renderProps => (
            <div className="c-header-mobile--option" onClick={renderProps.onClick} disabled={renderProps.disabled}>{t("header.login")}</div>
          )}
          cookiePolicy={'single_host_origin'}
          /> : 
            <GoogleLogin
            clientId={CLIENT_ID}
            buttonText={t("home.login")}
            onSuccess={responseGoogle}
            onFailure={errorGoogleResponse}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <div onClick={renderProps.onClick} disabled={renderProps.disabled} className="c-gbutton__home">
                <div style={{margiRight: "10px", padding: "10px"}}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg></div>
                {t("header.login")}
              </div>
            )}
            />
        )
      }
    </div>
    )
}