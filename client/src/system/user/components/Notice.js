import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Notice = ({ title, token }) => {
    return (
        <div className="c-card text-center">
            <div className="c-card--header">
                <h3>{title}</h3>
            </div>
            <div className="c-card--article">
                <p className="mt-4 mb-2">公式LINEにご登録の上、配信をお待ち下さい。</p>
                <a href="https://lin.ee/2CfvHFM"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" border="0"></img></a>
            </div>
            <Link to={token ? '/mypage' : '/'}
                className="c-card--link">
                トップに戻る
            </Link>
        </div>
    )
}

export default connect(({ auth }) => auth)(Notice);