import React from "react"

export default function Confirm() {
    return (
        <div className="t-font">
            <div className="tracsaction_header">
                <div className="transaction_header_content">
                    <div className="tracsaction_header_ja tracking-widest">注文内容の確認</div>
                    <div className="tracsaction_header_en">Confirm your order</div>
                </div>
            </div>
            <div className="w-8/12 m-auto">
                <div>
                    <div className="text-4xl text-center mb-2 tracking-widest pt-16">
                        オーナー権購入完了までの流れ
                    </div>
                    <div className="text-base text-yellow-600 text-center mb-10">
                        Flow until the purchase of ownership is completed
                    </div>
                    <div className="flex mt-20">
                        <div className="w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-1 w-20 h-20 mr-4"></div>
                                    <div className="">Step 1</div>
                                </div>
                                <div className="float-right"></div>
                            </div>
                            <div>注文枚数・金額の確認</div>
                            <div>注文枚数を入力し、注文内容を確認後STEP2へお進みください。</div>
                        </div>
                        <div className="mr-12 ml-12 w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-2 w-20 h-20 mr-4"></div>
                                    <div className="">Step 2</div>
                                </div>
                                <div className="float-right"></div>
                            </div>
                            <div>お支払い方法の選択</div>
                            <div>お支払い方法をご選択ください。ご選択いただいた入金方法で必要な情報をメールにてご連絡させていただきます。案内に沿って期限内にご入金をお願い致します。</div>
                        </div>
                        <div className="w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-3 w-20 h-20 mr-4"></div>
                                    <div className="">Step 3</div>
                                </div>
                                <div className="float-right"></div>
                            </div>
                            <div>オーナー権保有確定</div>
                            <div>ご入金が確認できましたら、オーナー権保有確定のメールをさせていただきます。ログイン後のマイページから保有オーナー権の一覧よりご確認ください。</div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div>※ご連絡やマイページの反映が確認できない場合はサポートまでお問い合わせください。</div>
                    <div>※注意事項</div>
                    <div>・期限内にご入金が確認できなかった場合、自動キャンセルとなります。</div>
                    <div>・お振込みやご送金などご入金時に発生する手数料はお客様ご自身のご負担となります、予めご了承ください。</div>
                </div>
                <div className="text-center text-4xl mt-10 mb-10">Step 1</div>
                <div className="flex pb-24">
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
                        <div className="flex pt-4 pb-4 border-t border-zinc-300">
                            <div className="w-3/12">参考取引価格</div>
                            <div className="w-9/12">10,000万円～</div>
                        </div>
                        <div className="flex pt-4 pb-4 border-t border-zinc-300">
                            <div className="w-3/12">参考取引価格</div>
                            <div className="w-9/12">10,000万円～</div>
                        </div>
                        <div className="flex text-center m-auto w-fit pt-6 pb-6 border-t border-zinc-300">
                            <div className="mt-auto">オーナー権価格：</div>
                            <div className="text-3xl lg:text-6xl">10,000万円～</div>
                        </div>
                        {/* <div className="w-full bg-yellow-600">コインの詳細をみる</div> */}
                        <div className="mt-4 w-fit ml-auto">よくある質問はこちら</div>
                    </div>
                </div>
                <div className="mt-24 text-4xl text-center">Step 2</div>
                <div className="text-4xl text-center mb-2 tracking-widest pt-16">
                    お支払い方法の選択
                </div>
                <div className="text-base text-yellow-600 text-center mb-10">
                    Confirmation of terms of use
                </div>
                <div className="text-lg text-center">
                    <div>お支払い方法を選択してください。</div>
                    <div>注文確定後、メールにてお送りする案内に沿って期限内にご入金お願い致します。</div>
                </div>
                <div className="w-full mt-16 mb-16 flex items-center justify-center">
                    <input className="ml-2 mr-2" type="radio" id="bank" value="" name="radio" /> <div className="mr-16">銀行振込</div>
                    <input className="ml-2 mr-2" type="radio" id="card" value="" name="radio" /> <div className="mr-16">クレジットカード</div>
                    <input className="ml-2 mr-2" type="radio" id="crypto" value="" name="radio" /> <div className="mr-16">USDT送金</div>
                </div>
                <div>
                    <div className="text-4xl text-center mb-2 tracking-widest pt-16">
                        利用規約の確認
                    </div>
                    <div className="text-base text-yellow-600 text-center mb-10">
                        Confirmation of terms of use
                    </div>
                </div>
                <div>
                    <div className="text-center text-lg">利用規約を確認し、</div>
                    <div className="text-center text-lg">チェックボックスにチェックを入れてください。</div>
                </div>
                <div className="mt-24 w-6/12 ml-auto mr-auto leading-10 tracking-widest">
                    テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。
                    テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。
                    テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。
                    テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。テキスト入ります。
                </div>
                <div className="flex items-center justify-center mt-8 mb-80">
                    <input className="mr-2" type="checkbox"/><div className="text-lg"><a href="/">利用規約</a>を確認し、全てを同意しました。</div>
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