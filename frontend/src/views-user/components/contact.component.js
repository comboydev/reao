const ContactSection = () => {
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
        <button className="c-btn c-btn--contact" onClick={(e) => { window.location.href = '/contact-us'}}>
            <p className="c-btn-text">
                お問い合わせはこちら
            </p>
        </button>
    </section>
    )
}

export default ContactSection