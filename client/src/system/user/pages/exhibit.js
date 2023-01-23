import ContactSection from "system/user/components/ContactSection";

export default function Exhibit(){
    return(
    <>
        <section className="sell-back-yan p-card">
            <div className="w-12/12 sm:w-10/12 lg:w-7/12 m-auto">
                <div className="c-header">
                    <h3 className="c-header--title">出品・売却をお考えの方</h3>
                    <p className="c-header--subtitle">Those who are thinking of listing</p>
                </div>
                <div className="text-center">
                    <h1 className="text-lg mt-5 mb-4" style={{ fontSize: 20 }}><strong>FANTATIONでは新しいスタイルのアンティークコイン取引を提案します</strong></h1>
                    <p>
                        FANTATIONはアンティークコインのオーナー権を数多くのユーザー様でシェアする <br/>
                        アンティークコインの共同保有プラットフォームです。
                    </p>
                </div>
                <div className="sell-flow"></div>
                <div className="mx-auto  max-w750">
                    <button className="c-btn c-btn--contact c-btn--contact--black" onClick={event => window.location.href = '/register'}>
                        <p className="c-btn-text">
                            今すぐ 出品・売却相談をする
                        </p>
                    </button>
                </div>
                <div className="row mt-16 text-lg flex-col sm:flex-row">
                    <div className="col-md-6">
                        <div className="sell-coin-sub">
                            <div className="sell-coin1 text-white text-lg flex items-center justify-center">コイン出品をお考えの方</div>
                            <div className="p-4">
                                <p>
                                    出品申請いただくことでお手持ちのコインをFANTATIONに出品いただくことが可能です。将来性を見込んでいたり、思い入れの強いコインはオーナー権をご自身で一部保持しながら、売却することも可能です。<br/>
                                    売却した資金を元に次のアンティークコイン購入活動を行いつつ、売却したコインのオーナー権保有でコインと接点を持ち続ける。という新たなアンティークコインコレクションスタイルの確立が可能となります。
                                </p>
                                <p className="pt-4">※コインの出品には所定の審査があります。</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="sell-coin-sub">
                            <div className="sell-coin2 text-white text-lg flex items-center justify-center ">コイン売却をお考えの方</div>
                            <div className="p-4">
                                <p>
                                    FANTATIONではコインの買取も行っております。<br/>
                                    1,000万円を越える高額アンティークコインの買取も可能です。<br/>
                                    コインの査定は無料です。お手持ちのコインの売却を検討されていらっしゃる方はまずは下記より売却相談をください。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mx-auto max-w750">
                    <button className="c-btn c-btn--contact c-btn--contact--black" onClick={() => window.location.href = '/'}>
                        <p className="c-btn-text">
                            今すぐ 出品・売却相談をする
                        </p>
                    </button>
                </div>

                <div className="e-pattern">
                <div className="c-header mb-5" style={{ marginTop: 150 }}>
                    <h3 className="c-header--title">出品パターン</h3>
                    <p className="c-header--subtitle">Exhibition pattern</p>
                </div>
                <ul>
                <li><a href="#">
                <div><p>コインを<br/>100%出品する</p></div>
                <figure><img src="/img/home/e-pattern01.png" alt="コインを100%出品する"/></figure>
                </a></li>
                <li><a href="#">
                <div><p>オーナー権を一部<br/>保有して出品する</p></div>
                <figure><img src="/img/home/e-pattern02.png" alt="オーナー権を一部保有して出品する"/></figure>
                </a></li>
                </ul>
                </div>

                <div className="c-header mb-5" style={{ marginTop: 150 }}>
                    <h3 className="c-header--title">出品申請の流れ</h3>
                    <p className="c-header--subtitle">Flow of listing application</p>
                </div>
                <div className="sell-coin-step w-full h-16 sm:h-24 mt-20"></div>
                <div className="text-center text-4xl mt-16 sm:mt-32">STEP 1</div>
                <div className="w-full h-auto sm:p-12 p-4 bg-white flex flex-col items-center justify-center">
                    <div className="flex w-10/12 sm:w-8/12 m-auto">
                        <div className="sell-step-1"></div>
                        <div className="mt-auto mb-auto ml-4 sm:ml-8 text-lg sm:text-3xl">出品、<br className="sp-onlyt"/>売却申請をする</div>
                    </div>
                    <div className="w-10/12 sm:w-8/12 mt-3">まずは、出品売却のお問い合わせを下記よりご連絡ください。</div>
                </div>
                <div className="mt-5 mx-auto max-w750">
                    <button className="c-btn c-btn--contact c-btn--contact--black" onClick={() => window.location.href = '/'}>
                        <p className="c-btn-text">
                            今すぐ 出品・売却相談をする
                        </p>
                    </button>
                </div>
                <div className="text-center text-xl sm:text-3xl mt-14 sm:mt-28 mb-14 ms:mb-28 mt-5">出品者登録をする<br className="sp-onlyt"/>３つのメリット</div>
                <div className="sell-minter-register"></div>
                <div className="text-center text-4xl mt-16 sm:mt-32">STEP 2</div>
                <div className="w-full h-auto sm:p-12 p-4 bg-white flex flex-col items-center justify-center">
                    <div className="flex w-10/12 sm:w-9/12 m-auto">
                        <div className="sell-step-2"></div>
                        <div className="mt-auto mb-auto ml-4 sm:ml-8 text-lg sm:text-3xl">FANTATION<br className="sp-onlyt"/>担当者からご連絡</div>
                    </div>
                    <div className="w-10/12 sm:w-9/12 mt-3">申請頂いた情報をもとに審査を行い、担当者よりご連絡をさせていただきます。</div>
                </div>
                <div className="text-center text-4xl mt-16 sm:mt-32">STEP 3</div>
                <div className="w-full h-auto sm:p-12 p-4 bg-white flex flex-col items-center justify-center">
                    <div className="flex w-10/12 sm:w-9/12 m-auto">
                        <div className="sell-step-3"></div>
                        <div className="mt-auto mb-auto ml-4 sm:ml-8 text-lg sm:text-3xl">出品条件の決定</div>
                    </div>
                    <div className="w-10/12 sm:w-9/12 mt-3">出品価格、スケジュールなど詳細を双方協議の上決定させていただきます。</div>
                </div>
                <div className="text-center text-4xl mt-16 sm:mt-32">STEP 4</div>
                <div className="w-full h-auto sm:p-12 p-4 bg-white flex flex-col items-center justify-center">
                    <div className="flex w-10/12 sm:w-9/12 m-auto">
                        <div className="sell-step-4"></div>
                        <div className="mt-auto mb-auto ml-4 sm:ml-8 text-lg sm:text-3xl">出品開始</div>
                    </div>
                    <div className="w-10/12 sm:w-9/12 mt-3">対象コインをご配送いただき、STEP3で確定しました条件で出品掲載を開始します。</div>
                </div>
                <div className="mt-5 mx-auto max-w750">
                    <button className="c-btn c-btn--contact c-btn--contact--black" onClick={() => window.location.href = '/'}>
                        <p className="c-btn-text">
                            今すぐ 出品・売却相談をする
                        </p>
                    </button>
                </div>
            </div>
        </section>
        <ContactSection />
    </>
    )
}
