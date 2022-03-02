import React, {Component} from "react";
import AuthService from "../../../services/auth.service";

class ContactComplete extends Component {
    render() {
        return(
            <>
                <section className="p-complete">
                    <div className="c-complete">
                        <div className="c-complete--header">
                            <h1>お問い合わせ完了</h1>
                        </div>
                        <div className="c-complete--article">
                            <p>
                                お問い合わせいただきありがとうございます。
                            </p>
                            <p>
                                ※ご連絡までに当日～1営業日ほどお時間をいただいております。
                            </p>
                            <p>
                                お問い合わせいただいた内容につきましては、折り返しご連絡させていただきます。
                            </p>
                        </div>
                        <button onClick={ e => {
                            const currentUser = AuthService.getCurrentUser();
                            if (currentUser)
                                window.location.href = "/top";
                            else
                            window.location.href = "/";
                        }}>
                            トップに戻る
                        </button>
                    </div>
                </section>
            </>
        )
    }
}

export default ContactComplete