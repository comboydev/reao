import React from "react"

export default function Company(){
    return(
        <div>
            <div className="text-4xl text-center mt-16 mb-2 tracking-widest">
            会社概要
            </div>
            <div className="text-base text-yellow-600 text-center mb-10">
            Company
            </div>
            <div className="lg:w-6/12 sm:w-10/12 w-11/12 m-auto text-lg">
                <div className="flex border-t border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">会社名</div>
                    <div className="w-9/12">株式会社ArtHolic</div>
                </div>
                <div className="flex border-t border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">所在地</div>
                    <div className="w-9/12">
                        <div>〒 810-0021</div>
                        <div>福岡県福岡市中央区今泉1-16-12-3F</div>
                    </div>
                </div>
                {/* <div className="flex border-t border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">代表者</div>
                    <div className="w-9/12">テキストテキスト</div>
                </div> */}
                <div className="flex border-t border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">設立</div>
                    <div className="w-9/12">2017年7月29日</div>
                </div>
                {/* <div className="flex border-t border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">資本金</div>
                    <div className="w-9/12">テキストテキスト</div>
                </div> */}
                <div className="flex border-t border-b border-black pt-3 pb-3">
                    <div className="w-3/12 text-center">事業内容</div>
                    <div className="w-9/12">
                        <div>共同購入、保有のプラットフォームサービス事業</div>
                        <div>アンティークコインの卸、販売事業</div>
                    </div>
                </div>
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