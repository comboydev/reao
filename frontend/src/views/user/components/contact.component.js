import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";


const ContactSectionJP = () => {
    const history = useHistory();
    return(
        <section className="p-contact">
            <article className="c-contactarticle">
                <h1>
                    お問い合わせ
                </h1>
            </article>
            <ul className="c-contactarticle--list">
                <li>
                    FANTATIONのご利用で不明な点がある方
                </li>
                <li>
                    ご購入の相談をされたい方
                </li>
                <li>
                    お持ちのアンティークコインを売りたい方
                </li>
            </ul>
            <p className="c-contactarticle--text">
                専門のスタッフが24時間365日受け付けておりますので、なんでもお気軽にお問い合わせください。
            </p>
            <button className="c-btn c-btn--contact" onClick={() => history.push('/contact-us')}>
                <p className="c-btn-text">
                    お問い合わせはこちら
                </p>
            </button>
        </section>
    )
}

const ContactSectionEN = () => {
    const history = useHistory();
    return(
        <section className="p-contact">
            <article className="c-contactarticle">
                <h1>
                    Contact us
                </h1>
            </article>
            <ul className="c-contactarticle--list">
                <li>
                    If you have any questions about using FANTATION...
                </li>
                <li>
                    If you would like to discuss a purchase...
                </li>
                <li>
                    Want to sell your antique coins?
                </li>
            </ul>
            <p className="c-contactarticle--text">
                Our professional staff is available 24 hours a day, 7 days a week, 365 days a year, so please feel free to contact us with any questions.
            </p>
            <button className="c-btn c-btn--contact" onClick={() => history.push('/contact-us')}>
                <p className="c-btn-text">
                    Contact us
                </p>
            </button>
        </section>
    )
}

const ContactSection = ({locale}) => {
    if (locale === 'ja') return <ContactSectionJP />;
    else return <ContactSectionEN />;
}

const mapStateToProps = ({ theme }) => {
  const { locale } = theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(ContactSection));