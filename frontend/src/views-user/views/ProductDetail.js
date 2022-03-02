import React from "react"

export default function ProductDetail() {
    return (
        <div className="t-font">
            <div className="text-4xl text-center mt-16 mb-2 tracking-widest">
                取り扱いコイン
            </div>
            <div className="text-base text-yellow-600 text-center mb-10">
                Coin details
            </div>
            <div className="w-11/12 md:w-10/12 xl:w-8/12 m-auto">
                <div className="flex text-white text-base sm:text:xl lg:text-3xl text-center mb-12">
                    <div className="bg-zinc-900 w-36 p-2 flex justify-center items-center">販売中</div>
                    <div className="bg-zinc-600 w-full p-2">1839 G.BRITAIN 5 Sov W&R-279 UNA AND THE LION</div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-6/12 w-fit m-auto text-center">イメージ</div>
                    <div className="w-full sm:w-6/12 text-base lg:text-xl">
                        <div className="flex border-t border-zinc-300 pt-4 pb-4">
                            <div className="w-3/12">コイン名</div>
                            <div className="w-9/12">1839 G.BRITAIN 5 Sov W&R-279 UNA AND THE LION</div>
                        </div>
                        <div className="flex pt-4 pb-4 border-t border-zinc-300">
                            <div className="w-3/12">グレード</div>
                            <div className="w-9/12">PF 66★ ULTRA CAMEO</div>
                        </div>
                        <div className="flex pt-4 pb-4 border-t border-zinc-300">
                            <div className="w-3/12">参考取引価格</div>
                            <div className="w-9/12">10,000万円～</div>
                        </div>
                        <div className="flex text-center m-auto w-fit pt-6 pb-6 border-t border-zinc-300">
                            <div className="mt-auto">オーナー権価格：</div>
                            <div className="text-3xl lg:text-6xl">10,000万円～</div>
                        </div>
                        <button className="c-allCoinbtn-production" onClick={e => window.location.href = '/preparation'}>
                        注文する
                        </button>
                        {/* <div className="w-full bg-yellow-600">コインの詳細をみる</div> */}
                        <div className="mt-4 w-fit ml-auto">よくある質問はこちら</div>
                    </div>
                </div>
                <div>
                    <div className="text-yellow-600 text-2xl sm:text-4xl mb-4 md:mb-8 mt-16 text-center">コインについて</div>
                    <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-6/12 text-base sm:text-xl">
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">発行枚数</td>
                                <td>400枚</td>
                            </tr>
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">年代</td>
                                <td>1500年代</td>
                            </tr>
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">素材</td>
                                <td>純金</td>
                            </tr>
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">直径</td>
                                <td>50 mm</td>
                            </tr>                
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">重量</td>
                                <td>20 g</td>
                            </tr>
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">オークション落札実績</td>
                                <td>30件</td>
                            </tr>   
                            <tr>
                                <td className="text-yellow-600 pr-16 leading-10">オークション落札率</td>
                                <td>100%</td>
                            </tr>           
                        </div>
                        <div className="w-full sm:w-6/12 w-fit m-auto text-center"></div>
                    </div>
                </div>
                <div>
                    <div className="text-yellow-600 text-2xl sm:text-4xl mb-4 md:mb-8 mt-16 text-center">コインについて</div>
                    <div className="text-sm md:text-lg mb-6 md:mb-10">この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</div>
                </div>
                <div className="w-fit bg-stone-700 text-white w-80 pt-4 pb-4 text-center text-xl mt-16 ml-auto mr-auto">一覧ページへ戻る</div>
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