import { useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";

const HomeJP = () => {
    const history = useHistory();
    useEffect(() => {
        $("li.c-qa--list__item").on("click", function (e) {
            $(this).next()
                .slideToggle("500")
                .siblings("li.c-qa--list__answer")
                .slideUp();
        });
    }, [])
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className="border-test"></div>
            <section className="p-mv" id="p-mv">
                <ul className="mv_slide">
                    <li className="c-mv"></li>
                    <article className="c-mvarticle">
                        <p className="c-mvarticle__text">
                            1万円から始める
                        </p>
                        <p className="c-mvarticle__text">
                            アンティークコインへの投資
                        </p>
                        <p className="c-mvarticle__small">
                            少額からアンティークコインの共同オーナー権を保有し、
                        </p>
                        <p className="c-mvarticle__small">
                            投資ができるプラットフォーム
                        </p>
                    </article>
                    <div className="c-mvimg"></div>
                    <button className="c-btn c-btn--long c-btn--mv" onClick={() => history.push("/register")}>
                        まずは会員登録（無料）
                    </button>
                </ul>
            </section>

            <section className="p-feature" id="p-feature">
                <article className="c-featurearticle">
                    <h1>
                        FANTATIONの特徴
                    </h1>
                    <h2>
                        1万円からアンティークコインのオーナーになれて<br />
                        様々な優待が受けられます
                    </h2>
                </article>
                <div className="c-featureitem">
                    <div>
                        <p className="c-featureitem--trade">
                            売買
                        </p>
                        <p className="c-featureitem--text">
                            1万円からアンティークコインを購入し、オーナー権を取得することができます。また、売却時はオークションに出品やオーナー同士の売却など、様々な方法で売却益をお返しすることも可能です。
                        </p>
                    </div>
                    <div>
                        <p className="c-featureitem--viewing">
                            鑑賞
                        </p>
                        <p className="c-featureitem--text">
                            マイページで観賞できるのはもちろんのこと、展覧会などのイベントで作品を鑑賞できる機会や、オーナー様限定の観賞会も開催致します。
                        </p>
                    </div>
                    <div>
                        <p className="c-featureitem--management">
                            管理
                        </p>
                        <p className="c-featureitem--text">
                            自動的にレポートが作成され、価格の推移やポートフォリオなどのグラフ化でわかりやすく管理出来ます。
                        </p>
                    </div>
                </div>
            </section>
            <section className="p-use" id="p-use">
                <div className="c-use--img">
                    <div className="c-use--img__inner"></div>
                </div>
                <article className="c-usearticle">
                    <h1>
                        FANTATIONのご利用はこんな方に向いています
                    </h1>
                </article>
                <div className="c-use">
                    <ul>
                        <li>
                            希少なアンティークコインを<br />手軽に所有したい
                        </li>
                        <li>
                            希少なコインを<br />複数保有したい
                        </li>
                        <li>
                            初心者なので専門家に<br />相談してみたい
                        </li>
                        <li>
                            コインオーナーとして<br />優待を受けたい
                        </li>
                        <li>
                            安全にアンティークコインを<br />保管したい
                        </li>
                        <li>
                            日本円から現物資産に<br />置き換えたい
                        </li>
                    </ul>
                </div>
            </section>
            <section className="p-coin" id="p-coin">
                <article className="c-coinarticle">
                    <h1>
                        取り扱いコイン
                    </h1>
                </article>
                <div className="c-coin--list">
                    <div className="c-coin">
                        <ul className="c-coin--detail coinLabel new">
                            <div className="c-coin__image">
                                <img src="/img/home/lion.png" alt="fantation" />
                            </div>
                            <li className="c-coin__name">
                                <dt>コイン名:</dt>
                                <dd>1839 G.BRITAIN 5 Sov W&R-279 UNA AND THE LION</dd>
                            </li>
                            <li className="c-coin__grade">
                                <dt>グレード:</dt>
                                <dd>PF 66★ ULTRA CAMEO</dd>
                            </li>
                            <li className="c-coin__numberOfCoins">
                                <dt>発行枚数:</dt>
                                <dd>400枚</dd>
                            </li>
                        </ul>
                        <ul className="c-coin--pricearea">
                            <li className="c-coin__refPrice">
                                <dt>最新のサービス内<br />成立金額/枠</dt>
                                <dd>10,000万円～</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                            <li className="c-coin__cost">
                                <dt>最新の参考オークション<br />評価額/枠</dt>
                                <dd>10000円</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul className="c-coin--detail coinLabel new">
                            <div className="c-coin__image">
                                <img src="/img/home/crown.png" alt="fantation" />
                            </div>
                            <li className="c-coin__name">
                                <dt>コイン名:</dt>
                                <dd>1847 Crown Great Britain Gothic</dd>
                            </li>
                            <li className="c-coin__grade">
                                <dt>グレード:</dt>
                                <dd>PR65 CAMEO</dd>
                            </li>
                            <li className="c-coin__numberOfCoins">
                                <dt>発行枚数:</dt>
                                <dd>8000枚</dd>
                            </li>
                        </ul>
                        <ul className="c-coin--pricearea">
                            <li className="c-coin__refPrice">
                                <dt>最新のサービス内<br />成立金額/枠</dt>
                                <dd>10,000万円～</dd>
                                <dd className="c-coin__comparison price_minus">-00,000円(-120%)</dd>
                            </li>
                            <li className="c-coin__cost">
                                <dt>最新の参考オークション<br />評価額/枠</dt>
                                <dd>10000円</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul className="c-coin--detail coinLabel new">
                            <div className="c-coin__image">
                                <img src="/img/home/guinea.png" alt="fantation" />
                            </div>
                            <li className="c-coin__name">
                                <dt>コイン名:</dt>
                                <dd>1895A 10M G.N.GUINEA</dd>
                            </li>
                            <li className="c-coin__grade">
                                <dt>グレード:</dt>
                                <dd>PR65 CAMEO</dd>
                            </li>
                            <li className="c-coin__numberOfCoins">
                                <dt>発行枚数:</dt>
                                <dd>2000枚</dd>
                            </li>
                        </ul>
                        <ul className="c-coin--pricearea">
                            <li className="c-coin__refPrice">
                                <dt>最新のサービス内<br />成立金額/枠</dt>
                                <dd>10,000万円～</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                            <li className="c-coin__cost">
                                <dt>最新の参考オークション<br />評価額/枠</dt>
                                <dd>10000円</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul className="c-coin--detail coinLabel soldout">
                            <div className="c-coin__image">
                                <img src="/img/home/bavaria.png" alt="fantation" />
                            </div>
                            <li className="c-coin__name">
                                <dt>コイン名:</dt>
                                <dd>1640 GERMANY 5D BAVARIA FR-196</dd>
                            </li>
                            <li className="c-coin__grade">
                                <dt>グレード:</dt>
                                <dd>PR65 CAMEO</dd>
                            </li>
                            <li className="c-coin__numberOfCoins">
                                <dt>発行枚数:</dt>
                                <dd>不明（※推測100～200枚程度）</dd>
                            </li>
                        </ul>
                        <ul className="c-coin--pricearea">
                            <li className="c-coin__refPrice">
                                <dt>最新のサービス内<br />成立金額/枠</dt>
                                <dd>10,000万円～</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                            <li className="c-coin__cost">
                                <dt>最新の参考オークション<br />評価額/枠</dt>
                                <dd>10000円</dd>
                                <dd className="c-coin__comparison">+00,000円(+120%)</dd>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="c-allCoinbtn--container">
                    <button className="c-btn c-allCoinbtn" onClick={() => history.push("/marketplace/items")}>
                        全てのコインを見る
                    </button>
                </div>
            </section>
            <section className="p-assets" id="p-assets">
                <h1 className="c-assetsheader">
                    資産としての<br />アンティークコインの魅力
                </h1>
                <article className="c-assetsarticle">
                    <div className="c-assetsarticle_1">
                        <p>
                            全世界で約300万人、
                        </p>
                        <p>
                            市場規模は1兆円以上
                        </p>
                        <div className="c-assetsarticle__sub">
                            アンティークコインのマーケットは、特定の国や地域ではなく、世界中にあります。コレクターは全世界で約300万人、市場規模は1兆円以上といわれており、そのコレクター達がアンティークコインの価値を不動なものにしています。そのため値上がりすることはあっても値下がりすることはあまりないのが特徴です。
                        </div>
                    </div>
                    <div>
                        <p>
                            時間が経てば経つほど
                        </p>
                        <p>
                            増す希少性
                        </p>
                        <div className="c-assetsarticle__sub">
                            値上がりする理由のひとつに、希少性があります。製造期間があるコインは現在、製造されていないため、増えることはあり得ません。その一方、焼失や劣化によって数が減る可能性はあります。つまり、時間が経てば経つほど希少性は増していきます。しかも、コレクターの許に渡ると市場へは出回りにくくなります。そのため、コレクターが増えれば増えるほど、希少性は高まります。
                        </div>
                    </div>
                </article>
                <article className="c-assetsarticle--content">
                    <div className="c-assetsarticle--content__inner">
                        <div>
                            <h1>
                                右肩上がりの相場
                            </h1>
                            <p>
                                アンティークコイン市場の指標はいろいろありますが、最大のシェアを誇るUSコインの2000年から2021年まで、21年間の推移を示すグラフです。右肩上がりに相場が動いているのがわかります。
                            </p>
                        </div>
                        <div>
                            <h2>
                                数万円から22億円まで
                            </h2>
                            <p>
                                アンティークコインには、数万円で購入できるものから22億するものまであります。当然、高価になればなるほど投資価値は高まります。とはいえ、限られた資産家でなければ高額なアンティークコインに投資はできません。しかし、【FANTATION】なら、1万円から共同オーナー権を保有できます。
                            </p>
                        </div>
                    </div>
                </article>
            </section>
            <section className="p-charm" id="p-charm">
                <article className="c-charmarticle">
                    <h1>
                        コレクションとしての<br />
                        アンティークコインの魅力
                    </h1>
                    <p className="c-charmarticle__text">
                        世界的な富豪のロスチャイルド家の繁栄は、マイアー・アムシェル・ロートシルト（1744～1812）がフランクフルトで古銭業を始めたことが起こりです。<br />ロスチャイルド家はアンティークコインから莫大な富を築いたといえます。<br />
                        しかも、アンティークコインは「ポケットに入る財産」と言われており、1億円であっても、たった1枚のコインで持ち運ぶことが可能です。<br />例えばアートやクラシックカーなどは安全な場所へ移動するのは容易ではないでしょう。<br />しかし、アンティークコインなら造作もありません。<br />
                        また、アートやクラシックカーと違って、メンテナンスの必要がないことも特徴です。「スラブ」というケースに入れて保管することで破損のリスクは回避できます。
                    </p>
                    <article className="c-charmarticle--1">
                        <h2>
                            高騰する価値
                        </h2>
                        <p className="c-charmarticle--1__text">
                            もうひとつの魅力は「資産価値」です。<br />2002年に開かれたオークションの落札価格と、15年後の2017年の<br />落札価格を比較してみると、1821年に鋳造されたジョージ3世のクラウン銀貨、<br />通称「スリーグレイセス」が98万円から1650万円。<br />
                            1826年に鋳造されたジョージ4世の5ポンド金貨が98万円から1010万円。<br />
                            1839年に鋳造されたヴィクトリア女王の5ポンド金貨、通称「ウナとライオン」が<br />150万円から1750万円。と価値が高騰しています。
                        </p>
                    </article>
                    <article className="c-charmarticle--2">
                        <h2>
                            高い安定性
                        </h2>
                        <p className="c-charmarticle--2__text">
                            アンティークコイン市場はリーマンショックでも安定を保ちました。<br />アンティークコイン市場は一度も「大暴落」を経験したことがありません。<br />
                            アンティークコインは、ロマンあふれる歴史的な魅力と、実質的な資産価値の魅力の両方で人気となっています。
                        </p>
                    </article>
                </article>
            </section>
            <section className="p-antiquecoin" id="p-antiquecoin">
                <article className="c-antiquecoinarticle--header">
                    <h1>
                        アンティークコインはもう、<br />
                        一部のコレクターの<br className="c-spBr" />ものではない
                    </h1>
                </article>
                <article className="c-antiquecoinarticle">
                    <p>
                        美術館・博物館でアンティークコインを目にしたことはあるでしょう。あの、美術館・博物館が展示していたアンティークコインが自分のものになるとしたら？
                    </p>
                    <br />
                    <p>
                        憧れだった、イギリスのヴィクトリア「ウナとライオン」5ポンド金貨（1839年）や、オーストリアのフランツ・ヨーゼフ1世治世60周年記念「雲上の女神」100コロナ金貨（1908年）など、歴史的な価値を持つアンティークコインを誰でも保有することができるとしたら？
                    </p>
                    <br />
                    <p>
                        それを可能にするのが、<br className="c-spBr" />FANTATIONです。
                    </p>
                    <button className="c-btn c-btn--signup--long c-btn--signup--long--antiquecoin" onClick={() => history.push("/register")}>
                        <p className="c-btn-text">
                            まずは会員登録（無料）
                        </p>
                    </button>
                </article>
            </section>
            <section className="p-media" id="p-media">
                <article className="c-media-article">
                    <h1>
                        掲載メディア
                    </h1>
                </article>
                <ul className="c-media-list">
                    <li><div className="c-media-logo"><img src="/img/home/media/asahi.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/bizocean.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/infoseek.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/linenews.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/nordot.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/reuters.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/sankeibiz.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/sanspo.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/zaikei.png" alt="fantation" /></div></li>
                </ul>
            </section>
            <section className="p-flow" id="p-flow">
                <article className="c-flowarticle">
                    <h1>
                        ご利用の流れ
                    </h1>
                </article>
                <div className="c-flowlist-wrap">
                    <ul className="c-flowlist">
                        <li className="c-flowlist--buy">
                            <div className="c-flowlist--buy__img"></div>
                            <div>
                                <p>
                                    購入
                                </p>
                                <span>
                                    FANTATION内にあるお好きなアンティークコインの種類と数量を選んで<br />オーナー権を購入
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--manage">
                            <div className="c-flowlist--manage__img"></div>
                            <div>
                                <p>
                                    管理
                                </p>
                                <span>
                                    マイギャラリーやポートフォリオページでいつでも簡単に保有コインを管理
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--ex">
                            <div className="c-flowlist--ex__img"></div>
                            <div>
                                <p>
                                    体験
                                </p>
                                <span>
                                    オーナー様限定の展覧会など、優待企画を通じた様々なアート体験
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--trade">
                            <div className="c-flowlist--trade__img"></div>
                            <div>
                                <p>
                                    売買
                                </p>
                                <span>
                                    オーナー権を手放したくなった場合、サービス内で売買も可能
                                </span>
                            </div>
                        </li>
                    </ul>
                    <button className="c-btn c-btn--signup--long c-btn--signup--long--flow" onClick={() => history.push("/register")}>
                        <p className="c-btn-text">
                            まずは会員登録（無料）
                        </p>
                    </button>
                </div>
            </section>

            <section className="p-qa" id="p-qa">
                <h1 className="c-qa--header">
                    Q&A
                </h1>

                <ul className="c-qa--list">
                    <li className="c-qa--list__item" id="qa-1">
                        オーナー権とはなんですか？
                    </li>
                    <li className="c-qa--list__answer" id="answer-1">
                        <p>
                            オーナー権とは、各アンティークコインの共同所有権であり、優待を受けられる権利です。
                            少額で希少性の高いコインを共同所有することが出来るので、コレクションとしてだけではなく、資産保全としてもおすすめです。
                        </p>
                    </li>

                    <li className="c-qa--list__item" id="qa-2">
                        優待とはなんですか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-2">
                        優待とは、アンティークコインのオーナーさまに付与される3つの権利のことです。その3つとは「売買・観賞・管理」です。また、他にも不定期でオーナー様向けのイベントなど企画も行っていきますので楽しみにしていてください。
                    </li>

                    <li className="c-qa--list__item" id="qa-3">
                        作品を実際に観賞することは<br className="c-spBr" />できますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-3">
                        作品はFANTATION事務局がセキュリティ対策が万全の場所で保管いたしますが、いつでも管理画面からご覧いただくことが出来ます。また、不定期の開催になりますが、全国で展示会など実際に観賞いただける企画も開催していく予定です。
                    </li>

                    <li className="c-qa--list__item" id="qa-4">
                        作品がサービス外で売却されることはありますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-4">
                        専属ディーラーが条件の良い取引と判断した場合、売却のご相談をさせていただく可能性もございます。オーナー様の承諾を得ずに無断で売却されることはありませんのでご安心ください。
                    </li>

                    <li className="c-qa--list__item" id="qa-5">
                        最低保有期間はありますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-5">
                        最低保有期間は特に設けておりません。
                    </li>

                    <li className="c-qa--list__item" id="qa-6">
                        作品の実物はどこにありますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-6">
                        セキュリティが万全の場所で保管致します。また、特に希少性が高いコインに関しては美術館に展示される可能性もあります。
                    </li>

                    <li className="c-qa--list__item" id="qa-7">
                        作品が紛失・破損した場合の補償はどうなりますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-7">
                        全額補償致します。詳しくは利用規約をご覧ください。
                    </li>

                    <li className="c-qa--list__item" id="qa-8">
                        アンティークコインを購入した後、価格が下がることもありますか？
                    </li>

                    <li className="c-qa--list__answer" id="answer-8">
                        希少性が高いコインは残存枚数や保存状態、デザイン性などが高く、コレクターの間でも注目されているコインです。そのため、価値が下がることはほとんどありません。
                    </li>
                </ul>
            </section>
            <section className="p-news" id="p-news">
                <div className="p-newsWrapper">
                    <h1 className="c-qa--header">新着情報</h1>
                    <span>サービスについてもっと知りたい方へ</span>
                    <ul className="p-newsList">
                        <li><a href="#" className="p-newsList--item">
                            <figure><img src="http://54.150.180.105:3000/img/home/news_thumnail.png" alt="万円から始める本格アートコレクション" /></figure>
                            <div className="p-newsList--item__txtBox">
                                <p className="ttl">バンクシーやKAWSのオーナーに1万円からなれる？！ANDARTで有名アートのオーナーになろう</p>
                                <p>資産としてのアート アート作品は「観る」もの、と思い込んでいませんか？ 実は 「買う」という選択肢もあります。日本人はアートを「観る」ことが大好きな国民と言われ、美術館の企画展には多くの人が詰めかけますが、アートを「買う」という文化は ...</p>
                            </div>
                        </a></li>
                        <li><a href="#" className="p-newsList--item">
                            <figure><img src="/img/home/news_thumnail.png" alt="万円から始める本格アートコレクション" /></figure>
                            <div className="p-newsList--item__txtBox">
                                <p className="ttl">バンクシーやKAWSのオーナーに1万円からなれる？！ANDARTで有名アートのオーナーになろう</p>
                                <p>資産としてのアート アート作品は「観る」もの、と思い込んでいませんか？ 実は 「買う」という選択肢もあります。日本人はアートを「観る」ことが大好きな国民と言われ、美術館の企画展には多くの人が詰めかけますが、アートを「買う」という文化は ...</p>
                            </div>
                        </a></li>
                        <li><a href="#" className="p-newsList--item">
                            <figure><img src="/img/home/news_thumnail.png" alt="万円から始める本格アートコレクション" /></figure>
                            <div className="p-newsList--item__txtBox">
                                <p className="ttl">バンクシーやKAWSのオーナーに1万円からなれる？！ANDARTで有名アートのオーナーになろう</p>
                                <p>資産としてのアート アート作品は「観る」もの、と思い込んでいませんか？ 実は 「買う」という選択肢もあります。日本人はアートを「観る」ことが大好きな国民と言われ、美術館の企画展には多くの人が詰めかけますが、アートを「買う」という文化は ...</p>
                            </div>
                        </a></li>
                    </ul>
                </div>
            </section>

            <section className="p-contact" id="p-contact">
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
                <button className="c-btn c-btn--contact" onClick={() => history.push("/contact-us")} >
                    <p className="c-btn-text">
                        お問い合わせはこちら
                    </p>
                </button>
                <button className="c-btn c-btn--contact c-btn--contact--black" onClick={() => history.push("/register")}>
                    <p className="c-btn-text">
                        まずは会員登録（無料）
                    </p>
                </button>
            </section>
            <section className="p-apply" id="p-apply">
                <div className="c-apply">
                    <div className="l-content">
                        <h2 className="l-content--header">お持ちのアンティークコインを<br />無料査定・買取させていただきます。</h2>
                        <p className="l-content--txt">
                            FANTATIONではコインの買取も行っております。<br />
                            1,000万円を越える高額アンティークコインの買取も可能です。
                            コインの査定は無料です。<br />お手持ちのコインの売却を検討されていらっしゃる方はまずは下記より売却相談をください
                        </p>
                        <a href="/">
                            <p className="c-linkbox">お申し込みへ</p>
                        </a>
                    </div>
                    <div className="r-content">
                        <img src="/img/home/lion.png" alt="lion" />
                    </div>
                </div>
            </section>
        </div>
    );
}

const HomeEN = () => {
    const history = useHistory();
    useEffect(() => {
        $(".c-qa--list__item").on("click", function (e) {
            $(this).next()
                .slideToggle("500")
                .siblings('li.c-qa--list__answer')
                .slideUp();
        });
    })
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className="border-test"></div>
            <section className="p-mv" id="p-mv">
                <ul className="mv_slide">
                    <li className="c-mv"></li>
                    <article className="c-mvarticle">
                        <p className="c-mvarticle__text">
                            Start from 10,000 yen,
                        </p>
                        <p className="c-mvarticle__text">
                            Investing in antique coins,
                        </p>
                        <p className="c-mvarticle__small">
                            Co-ownership of antique coins from a small amount,
                        </p>
                        <p className="c-mvarticle__small">
                            A platform where you can invest
                        </p>
                    </article>
                    <div className="c-mvimg"></div>
                    <button className="c-btn c-btn--long c-btn--mv" onClick={() => history.push("/register")}>
                        Register ( free )
                    </button>
                </ul>
            </section>

            <section className="p-feature" id="p-feature">
                <article className="c-featurearticle">
                    <h1>
                        FANTATION Features
                    </h1>
                    <h2>
                        You can become an antique coin owner from 10,000 yen.<br />
                        Various preferential reward is available
                    </h2>
                </article>
                <div className="c-featureitem">
                    <div>
                        <p className="c-featureitem--trade">
                            Buying and Selling
                        </p>
                        <p className="c-featureitem--text">
                            You can purchase antique coins starting at 10,000 yen and acquire ownership.
                            When you sell, we can also return the proceeds to you in a variety of ways, such as through an auction or an owner-to-owner sale.
                        </p>
                    </div>
                    <div>
                        <p className="c-featureitem--viewing">
                            Appreciation<br /><br />
                        </p>
                        <p className="c-featureitem--text">
                            In addition to viewing artworks on My Page, we will also provide opportunities to
                            view artworks at exhibitions and other events, and hold viewing parties exclusively for owners.
                        </p>
                    </div>
                    <div>
                        <p className="c-featureitem--management">
                            Management<br /><br />
                        </p>
                        <p className="c-featureitem--text">
                            Automatic reports are generated and graphs of price trends, portfolios, etc. can be managed in an easy-to-understand manner.
                        </p>
                    </div>
                </div>
            </section>
            <section className="p-use" id="p-use">
                <div className="c-use--img">
                    <div className="c-use--img__inner"></div>
                </div>
                <article className="c-usearticle">
                    <h1>
                        FANTATION is suitable for
                    </h1>
                </article>
                <div className="c-use">
                    <ul>
                        <li>
                            Rare antique coins<br />to own it easily.
                        </li>
                        <li>
                            Rare coins<br />to own more than one
                        </li>
                        <li>
                            For beginner<br />I would like to consult with you.
                        </li>
                        <li>
                            For coin owner<br />receive preferential treatment
                        </li>
                        <li>
                            Antique coins safely<br />I want to store
                        </li>
                        <li>
                            Japanese Yen to physical assets<br />I want to replace
                        </li>
                    </ul>
                </div>
            </section>
            <section className="p-coin" id="p-coin">
                <article className="c-coinarticle">
                    <h1>Coins</h1>
                </article>
                <div className="c-coin--list">
                    <div className="c-coin">
                        <ul>
                            <div className="c-coin__image">
                                <img src="/img/home/lion.png" alt="fantation" />
                            </div>
                            <dl className="c-coin__name">
                                <dt>・Item:</dt>
                                <dd>1839 G.BRITAIN 5 Sov W&R-279 UNA AND THE LION</dd>
                            </dl>
                            <dl>
                                <dt>・Grade:</dt>
                                <dd>PF 66★ ULTRA CAMEO</dd>
                            </dl>
                            <dl>
                                <dt>・Publish Qty:</dt>
                                <dd>400 sheets</dd>
                            </dl>
                        </ul>
                        <ul>
                            <dl className="c-coin__refPrice">
                                <dt>・Sale Price:</dt>
                                <dd>$750,000～</dd>
                            </dl>
                            <dl className="c-coin__cost">
                                <dt>・Price of Ownership:</dt>
                                <dd>$75</dd>
                            </dl>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul>
                            <div className="c-coin__image">
                                <img src="/img/home/crown.png" alt="fantation" />
                            </div>
                            <dl className="c-coin__name">
                                <dt>・Item:</dt>
                                <dd>1847 Crown Great Britain Gothic</dd>
                            </dl>
                            <dl>
                                <dt>・Grade:</dt>
                                <dd>PR65 CAMEO</dd>
                            </dl>
                            <dl>
                                <dt>・Publish Qty:</dt>
                                <dd>8000 sheets</dd>
                            </dl>
                        </ul>
                        <ul>
                            <dl className="c-coin__refPrice">
                                <dt>・Sale Price:</dt>
                                <dd>$30,000～</dd>
                            </dl>
                            <dl className="c-coin__cost">
                                <dt>・Price of Ownership:</dt>
                                <dd>$75</dd>
                            </dl>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul>
                            <div className="c-coin__image">
                                <img src="/img/home/guinea.png" alt="fantation" />
                            </div>
                            <dl className="c-coin__name">
                                <dt>・Item:</dt>
                                <dd>1895A 10M G.N.GUINEA</dd>
                            </dl>
                            <dl>
                                <dt>・Grade:</dt>
                                <dd>PR65 CAMEO</dd>
                            </dl>
                            <dl>
                                <dt>・Publish Qty:</dt>
                                <dd>2000 sheets</dd>
                            </dl>
                        </ul>
                        <ul>
                            <dl className="c-coin__refPrice">
                                <dt>・Sale Price:</dt>
                                <dd>$45,000～</dd>
                            </dl>
                            <dl className="c-coin__cost">
                                <dt>・Price of Ownership:</dt>
                                <dd>$75</dd>
                            </dl>
                        </ul>
                    </div>

                    <div className="c-coin">
                        <ul>
                            <div className="c-coin__image">
                                <img src="/img/home/bavaria.png" alt="fantation" />
                            </div>
                            <dl className="c-coin__name">
                                <dt>・Item:</dt>
                                <dd>1640 GERMANY 5D BAVARIA FR-196</dd>
                            </dl>
                            <dl>
                                <dt>・Grade:</dt>
                                <dd>PR65 CAMEO</dd>
                            </dl>
                            <dl>
                                <dt>・Publish Qty:</dt>
                                <dd>(※Estimated 100-200 sheets)</dd>
                            </dl>
                        </ul>
                        <ul>
                            <dl className="c-coin__refPrice">
                                <dt>・Sale Price:</dt>
                                <dd>$37,500～</dd>
                            </dl>
                            <dl className="c-coin__cost">
                                <dt>・Price of Ownership:</dt>
                                <dd>$75</dd>
                            </dl>
                        </ul>
                    </div>
                </div>
                <div className="c-allCoinbtn--container">
                    <button className="c-btn c-allCoinbtn" onClick={() => history.push("/marketplace/items")}>
                        All Coins
                    </button>
                </div>
            </section>
            <section className="p-assets" id="p-assets">
                <h1 className="c-assetsheader">
                    Charm of Antique Coins<br className="sp-onlyt" /> as an property
                </h1>
                <article className="c-assetsarticle">
                    <div className="c-assetsarticle_1">
                        <p>
                            Approximately <br />3 million people worldwide
                        </p>
                        <p>
                            over 1 trillion JPY maket value
                        </p>
                        <div className="c-assetsarticle__sub">
                            The market for antique coins is not only in a specific country or region, but all over the world.
                            It is said that there are approximately 3 million collectors worldwide, with a market value of over 1 trillion JPY,
                            and these collectors are the ones who consistantly keep the value of antique coins. As a result,its value increases and might not going down.
                        </div>
                    </div>
                    <div>
                        <p>
                            Scarcity
                        </p>
                        <p>
                            increases over time.
                        </p>
                        <div className="c-assetsarticle__sub">
                            One of the reasons for price increases is scarcity. Coins that have been in production for a period of time cannot increase because they are no longer being produced.
                            On the other hand, they can decrease in number due to burning or deterioration. In other words, rarity increases with time.
                            Moreover, once they are in the hands of collectors, they are less likely to appear on the market again. Therefore, the more collectors there are, the more rare they become.
                        </div>
                    </div>
                </article>
                <article className="c-assetsarticle--content">
                    <div className="c-assetsarticle--content__inner">
                        <div>
                            <h1>
                                Steadily rising market price
                            </h1>
                            <p>
                                There are many indicators of the antique coin market, but the largest share of US coins, from 2000 to 2021, the
                                This graph shows the transition over a 21-year period. You can see that the market is moving steadily upward.
                            </p>
                        </div>
                        <div>
                            <h2>
                                From tens of thousands of yen to 2.2 billion yen
                            </h2>
                            <p>
                                Antique coins range from those costing tens of thousands of dollars to those costing 2.2 billion.
                                Naturally, the more expensive they are, the more valuable the investment. Nevertheless, only a limited number of wealthy individuals can invest in expensive antique coins.
                                With [FANTATION], however, you can own co-ownership for as little as 10,000 yen.
                            </p>
                        </div>
                    </div>
                </article>
            </section>
            <section className="p-charm" id="p-charm">
                <article className="c-charmarticle">
                    <h1>
                        As a collection<br />
                        Charm of Antique Coins
                    </h1>
                    <p className="c-charmarticle__text">
                        The prosperity of the Rothschild family, one of the richest families in the world, began when Maier Amschel Rothschild (1744-1812) started an antique coin business in Frankfurt. <br />
                        It can be said that the Rothschilds amassed enormous wealth from antique coins.<br />
                        Moreover, antique coins are said to be "property that fits in your pocket," and even 100 million yen can be carried in just one coin.<br />
                        For example, it would not be easy to move art or classic cars to a safe place.<br />
                        But with antique coins, it is no problem.<br />
                        Also, unlike art and classic cars, they do not require maintenance. The risk of damage can be avoided by storing them in the case.
                    </p>
                    <article className="c-charmarticle--1">
                        <h2>
                            Soaring Value
                        </h2>
                        <p className="c-charmarticle--1__text">
                            Another attraction is "asset value.<br />
                            The winning bid price at an auction held in 2002 and 15 years later, in 2017, <br />
                            The winning bid compared the price of a George III crown silver coin minted in 1821, <br />
                            The "Three Graces," as they are commonly called, ranged from 980,000 yen to 16.5 million yen.<br />
                            The five-pound gold coin of George IV, minted in 1826, ranges from 980,000 yen to 10,010,000 yen.<br />
                            The 5 pound gold coin of Queen Victoria, minted in 1839, known as the "Una and the Lion
                            1.5 million yen to 17.5 million yen. and the value has skyrocketed.
                        </p>
                    </article>
                    <article className="c-charmarticle--2">
                        <h2>
                            High stability
                        </h2>
                        <p className="c-charmarticle--2__text">
                            The antique coin market remained stable even through the Lehman Brothers collapse.<br />
                            The antique coin market has never experienced a "big crash.<br />
                            Antique coins have become popular both for their romantic historical appeal and for their substantial asset value.
                        </p>
                    </article>
                </article>
            </section>
            <section className="p-antiquecoin" id="p-antiquecoin">
                <article className="c-antiquecoinarticle--header">
                    <h1>
                        Antique coins are no longer just for a few collectors.<br />
                    </h1>
                </article>
                <article className="c-antiquecoinarticle">
                    <p>
                        You have probably seen antique coins in museums. What if that antique coin that the museum/museum displayed could be yours?
                    </p>
                    <br />
                    <p>
                        What if everyone could own antique coins of historical value, such as the coveted British Victoria "Una and the Lion" 5 pound gold coin (1839)
                        and the Austrian "Goddess Above the Clouds" 100 corona gold coin (1908) commemorating the 60th anniversary of the reign of Franz Joseph I?
                    </p>
                    <br />
                    <p>
                        FANTATION makes this possible.
                    </p>
                    <button className="c-btn c-btn--signup--long c-btn--signup--long--antiquecoin" onClick={() => history.push("/register")}>
                        <p className="c-btn-text">
                            Register ( free )
                        </p>
                    </button>
                </article>
            </section>
            <section className="p-media" id="p-media">
                <article className="c-media-article">
                    <h1>
                        MEDIA
                    </h1>
                </article>
                <ul className="c-media-list">
                    <li><div className="c-media-logo"><img src="/img/home/media/asahi.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/bizocean.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/infoseek.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/linenews.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/nordot.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/reuters.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/sankeibiz.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/sanspo.png" alt="fantation" /></div></li>
                    <li><div className="c-media-logo"><img src="/img/home/media/zaikei.png" alt="fantation" /></div></li>
                </ul>
            </section>
            <section className="p-flow" id="p-flow">
                <article className="c-flowarticle">
                    <h1>
                        Guide of Use
                    </h1>
                </article>
                <div className="c-flowlist-wrap">
                    <ul className="c-flowlist">
                        <li className="c-flowlist--buy">
                            <div className="c-flowlist--buy__img"></div>
                            <div>
                                <p>
                                    Purchase
                                </p>
                                <span>
                                    Select the type and quantity of antique coins of your choice in FANTATION.<br />Purchase Owner Rights
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--manage">
                            <div className="c-flowlist--manage__img"></div>
                            <div>
                                <p>
                                    Management
                                </p>
                                <span>
                                    Easily manage your coin holdings at any time with My Gallery and Portfolio pages
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--ex">
                            <div className="c-flowlist--ex__img"></div>
                            <div>
                                <p>
                                    Personal experience
                                </p>
                                <span>
                                    Various art experiences through preferential programs such as exclusive exhibitions for owners
                                </span>
                            </div>
                        </li>
                        <li className="c-flowlist--trade">
                            <div className="c-flowlist--trade__img"></div>
                            <div>
                                <p>
                                    Trade
                                </p>
                                <span>
                                    If you want to give up your ownership, you can buy or sell them within the service.
                                </span>
                            </div>
                        </li>
                    </ul>
                    <button className="c-btn c-btn--signup--long c-btn--signup--long--flow" onClick={() => history.push("/register")}>
                        <p className="c-btn-text">
                            Register ( free )
                        </p>
                    </button>
                </div>
            </section>
            <section className="p-qa" id="p-qa">
                <h1 className="c-qa--header">
                    Q&A
                </h1>

                <ul className="c-qa--list">
                    <li className="c-qa--list__item" id="qa-1">
                        What is ownership?
                    </li>
                    <li className="c-qa--list__answer" id="answer-1">
                        <p>
                            Ownership is the right to joint ownership of each antique coin and to receive preferential treatment.
                            It is a great way to jointly own rare coins by pay less fee, not only as a collection, but also as asset protection.
                        </p>
                    </li>

                    <li className="c-qa--list__item" id="qa-2">
                        What are preferential treatment?
                    </li>

                    <li className="c-qa--list__answer" id="answer-2">
                        Preferential treatment refers to the three rights granted to owners of antique coins.
                        This three rights are "buying and selling, viewing, and management.
                        We will also be planning other events for owners on an irregular basis, so please look forward to them.
                    </li>

                    <li className="c-qa--list__item" id="qa-3">
                        Can I actually view the works?
                    </li>

                    <li className="c-qa--list__answer" id="answer-3">
                        The FANTATION office will store the works in a secure location,
                        but you can view them at any time from the management screen.
                        We also plan to hold exhibitions and other events throughout the country where you can actually view the works, although they will be held on an irregular basis.
                    </li>

                    <li className="c-qa--list__item" id="qa-4">
                        Is it possible for a work to be sold outside of your service?
                    </li>

                    <li className="c-qa--list__answer" id="answer-4">
                        If the exclusive dealer determines with good trading condition,
                        there is a possibility that we will discuss the sale with you. Please be assured that your work will not be sold without the owner's consent.
                    </li>

                    <li className="c-qa--list__item" id="qa-5">
                        Is there a limitation on holding period?
                    </li>

                    <li className="c-qa--list__answer" id="answer-5">
                        There is no limitation holding period.
                    </li>

                    <li className="c-qa--list__item" id="qa-6">
                        Where are the actual artworks located?
                    </li>

                    <li className="c-qa--list__answer" id="answer-6">
                        The actual pieces will be kept in a secure location.
                        In addition, there is a possibility that some of the rarest coins may be displayed in museums.
                    </li>

                    <li className="c-qa--list__item" id="qa-7">
                        What will be the compensation if my work is lost or damaged?
                    </li>

                    <li className="c-qa--list__answer" id="answer-7">
                        We will compensate you for the full amount. Please see our Terms of Use for details.
                    </li>

                    <li className="c-qa--list__item" id="qa-8">
                        Can the price of an antique coin drop after I purchase it?
                    </li>

                    <li className="c-qa--list__answer" id="answer-8">
                        Rare coins are highly demanded by collectors because of the number of coins remaining, their condition of preservation, and their design.
                        Therefore, they rarely loose value.
                    </li>
                </ul>
            </section>
            <section className="p-contact" id="p-contact">
                <article className="c-contactarticle">
                    <h1>
                        Contact Us
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
                <button className="c-btn c-btn--contact" onClick={() => history.push('/contact-us')} >
                    <p className="c-btn-text">
                        Contact us
                    </p>
                </button>
                <button className="c-btn c-btn--contact c-btn--contact--black" onClick={() => history.push('/register')}>
                    <p className="c-btn-text">
                        Register ( free )
                    </p>
                </button>
            </section>
            <section className="p-apply" id="p-apply">
                <div className="c-apply">
                    <div className="l-content">
                        <h2 className="l-content--header">We will evaluate and purchase<br className="pc-onlyt" /> your antique coins for free.</h2>
                        <p className="l-content--txt">
                            FANTATION also buys coins. <br />
                            It is also possible to purchase high-priced antique coins over 10 million yen. <br />
                            Coin valuation is free.<br />
                            If you are considering selling your coins, please contact us from the following.
                        </p>
                        <Link to="/">
                            <p className="c-linkbox">Apply...</p>
                        </Link>
                    </div>
                    <div className="r-content">
                        <img src="/img/home/lion.png" alt="lion" />
                    </div>
                </div>
            </section>
        </div>
    );
}


const Home = ({ locale }) => {
    if (locale === 'ja') return <HomeJP />;
    else return <HomeEN />;
}

const mapStateToProps = ({ theme }) => {
    const { locale } = theme;
    return { locale }
};

export default withRouter(connect(mapStateToProps)(Home));
