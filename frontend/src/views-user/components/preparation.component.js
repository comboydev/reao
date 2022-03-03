import React from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";

const Preparation = () => {
    return(
    <section className="p-card">
        <div className="c-card">
            <div className="c-card--header">
                <h1>只今準備中です</h1>
            </div>
            <div className="c-card--article">
                <p>
                    公式LINEにご登録の上、配信をお待ち下さい。
                </p>
                <a href="https://lin.ee/2CfvHFM"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" border="0"></img></a>
            </div>
            <Link to={
                AuthService.getCurrentUser() 
                ? '/mypage' : '/' } 
                className="c-card--link">
                    トップに戻る
            </Link>
        </div>
    </section>
    )
}

export default Preparation