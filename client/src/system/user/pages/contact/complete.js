import { useHistory } from "react-router-dom";

const ContactComplete = () => {
    const history = useHistory();
    
    const back = () => {
		history.goBack()
	}

    return(
    <section className="p-card">
        <div className="c-header">
			<h3 className="c-header--title">お問い合わせ完了</h3>
			<p className="c-header--subtitle">Completed Contact us</p>
		</div>
        <div className="c-card max-w750">
			<p className="text-center">
                お問い合わせいただきありがとうございます。<br/>
				※ご連絡までに当日～1営業日ほどお時間をいただいております。<br/>
                お問い合わせいただいた内容につきましては、折り返しご連絡させていただきます。
			</p>
            <button 
                className="c-btn c-btn--back mt-5" 
                onClick={back}>
                トップに戻る
            </button>
		</div>
    </section>
    )
}

export default ContactComplete