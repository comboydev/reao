import React from "react";
const serviceTerm = [
    {
        title:"第１条　テキストテキスト",
        content:"この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。"
    },
    {
        title:"第２条　テキストテキスト",
        content:"この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。"
    },
    {
        title:"第３条　テキストテキスト",
        content:"この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。"
    },
    {
        title:"第４条　テキストテキスト",
        content:"この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。"
    },
    {
        title:"第５条　テキストテキスト",
        content:"この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。 "
    }
]

export default function Service() {
    return (
        <div>
            <div className="text-4xl text-center mt-16 mb-2 tracking-widest">
            利用規約
            </div>
            <div className="text-base text-yellow-600 text-center mb-10">
            Terms of Service
            </div>
            <div className="m-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-6/12">
                {
                    serviceTerm.map((term, index) => {
                        return(
                            <div>
                                <div className="text-yellow-600 text-2xl sm:text-4xl mb-4 md:mb-8" key={index+"service"}>{term.title}</div>
                                <div className="text-sm md:text-lg mb-6 md:mb-10">{term.content}</div>
                            </div>
                        )
                    })
                }
            </div>
            <section className="p-contact mt-16" id="p-contact">
                <article className="c-contactarticle">
                <h1>お問い合わせ</h1>
                </article>
                <ul className="c-contactarticle--list">
                <li>FANTATIONのご利用で不明な点がある方</li>
                <li>ご購入の相談をされたい方</li>
                <li>お持ちのアンティークコインを売りたい方</li>
                </ul>
                <p className="c-contactarticle--text">
                専門のスタッフが24時間365日受け付けておりますので、
                <br />
                なんでもお気軽にお問い合わせください。
                </p>
                <button
                className="c-btn--contact"
                onClick={(e) => {
                    window.location.href = "/contact";
                }}
                >
                <p className="c-btn-text">お問い合わせはこちら</p>
                </button>
                <button
                className="c-btn--contact c-btn--contact--black"
                onClick={(event) => (window.location.href = "/register")}
                >
                <p className="c-btn-text">まずは会員登録（無料）</p>
                </button>
            </section>
        </div>
    )
}