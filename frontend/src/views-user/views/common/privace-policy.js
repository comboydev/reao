import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivacePolicyJP = () => {
    return(
    <section className="p-policy">
        <div className="c-header">
            <h3 className="c-header--title">プライバシーポリシー</h3>
            <p className="c-header--subtitle">Privace Policy</p>
        </div>
        <div className="c-policy">
            <article>
                株式会社ArtHolic（以下、「当社」といいます。）は、当社及びその他の当社が運営するサイト（以下、「当サイト」といいます。）を通じた各種サービスのご提供にあたり、希少性や財産的価値の高いアンティークコインや美術品等を取り扱う会社として、商品の取引の信頼性を確保する上での個人情報保護の重要性を十分に認識し、漏えい等の事故の発生を未然に防止することにより、お客様に安心して当社をご利用いただける環境、体制を構築すべく、個人情報の保護に関する法律（平成15年法律第57号。その後の改正を含みます。）及び適用ガイドライン等（以下、これらを総称して「個人情報保護法等」といいます。）を遵守して次のとおり個人情報保護方針を定め、実施します。
            </article>
        </div>

        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                個人情報の取得について
            </div>
            <article>
                当社は、偽りその他不正の手段によらず適正に個人情報を取得致します。
            </article>
        </div>
        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                個人情報の利用目的
            </div>
            <article>
                当社では、取得した個人情報を以下の目的のために利用させていただきます。以下に定めのない目的で個人情報を利用する場合、あらかじめご本人の同意を得た上で行ないます。
                <p>
                    ・お客様の本人確認を実施するため
                </p>
                <p>
                    ・バックアップの作成を含む、各種サービスのご提供及び運営のため
                </p>
                <p>
                    ・当社取扱商品の売買・配送のため
                </p>
                <p>
                    ・当社取扱美術品等の査定のため
                </p>
                <p>
                    ・金融機関の口座情報の確認、振込状況の確認のため
                </p>
                <p>
                    ・その他お客様から受託した業務を行うため
                </p>
                <p>
                    ・新規お取引や継続的なお取引時におけるお客様の与信を含めた適正な管理のため
                </p>
                <p>
                    ・お客様からのご意見、お問い合わせ等への回答を含む、保守・サポートを提供するため
                </p>
                <p>
                    ・当社のサービスに関する規約、ルール、ガイドライン、リスク説明、注意事項その他の規約
                    （以下「規約等」といいます。）等の新設、廃止又は変更等を通知するため ・規約等に違反する疑いのある行為について対応するため
                </p>
                <p>
                    ・当社の新サービスの開発、提供、保守、改善等に利用するため
                </p>
                <p>
                    ・当社取扱商品に関するお客様の動向や購入履歴を分析するため
                </p>
                <p>
                    ・当社ホームページの利便性、利用実態の調査及びアクセス解析のため
                </p>
                <p>
                    ・マーケティングのため
                </p>
                <p>
                    ・採用活動のため
                </p>
                <p>
                    ・監査に対応するため
                </p>
                <p>
                    ・捜査機関、裁判所、国税庁その他の各国政府機関からの開示その他の要請に対応するため
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                個人情報の安全管理について
            </div>
            <article>
                当社は、取り扱う個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                個人情報の委託について
            </div>
            <article>
                当社は、個人情報の取り扱いの全部または一部を第三者に委託する場合は、当該第三者について厳正な調査を行い、 取り扱いを委託された個人情報の安全管理が図られるよう当該第三者に対する必要かつ適切な監督を行います。
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                個人情報の開示・訂正等について
            </div>
            <article>
                <p>
                    当社は、ご本人から自己の個人情報についての開示の請求がある場合、合理的な期間、適切な範囲内で速やかに開示を致します。
                </p>
                <p>
                    その際、ご本人であることが確認できない場合には、開示に応じません。
                </p>
                <p>
                    個人情報の内容に誤りがあり、ご本人から訂正・追加・削除の請求がある場合、調査の上、速やかにこれらの請求に対応致します。
                </p>
                <p>
                    その際、ご本人であることが確認できない場合には、これらの請求に応じません。
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                免責事項
            </div>
            <article>
                <p>
                    (1) 当サイトに掲載している情報は、情報の正確性、適時性若しくは完全性について保証するものではありません。
                </p>
                <p>
                    (2) 当サイトの情報や当サイトを通じてアクセス可能な情報が、コンピュータウイルスやスパイウェアなどに感染していないことを保証するものではありません。
                </p>
                <p>
                    (3) 当サイトのご利用に起因して生じた損害については、当社は一切責任を負いかねます。当サイトの情報はお客さまご自身の責任においてご利用下さい。
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                本方針の変更
            </div>
            <article>
                本方針の内容は変更されることがあります。変更後の本方針については当サイトに掲載した時から効力を生じるものとします。
            </article>
        </div>

        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                著作権について
            </div>
            <article>
                <p>
                    当サイトのコンテンツ、著作権は当社が所有しています。当サイト掲載の情報などについての無断掲載を禁じます。
                </p>
                <p>
                    個人情報保護方針及び個人情報の取り扱いに対し不同意であった場合
                </p>
                <p>
                    当社では、業務遂行に対し必要な範囲と目的においてお客様より個人情報を取得し、適切なサービスを提供することが可能になります。
                </p>
                <p>
                    そのため、お客様が当社の個人情報保護方針及び個人情報の 取り扱いに規定する内容につき、その全部又は一部にご同意いただけず、必要な個人情報が取得できない場合、当社のサービス及び業務について、お客様に満足いただける水準でのご提供ができず、又はサービス及び業務のご提供そのものができなくなる可能性がございます。
                </p>
            </article>
        </div>

        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Cookie（クッキー）等について
            </div>
            <article>
                <p>
                    Cookieとはお客様のウェブサイト閲覧情報を、そのお客様のコンピューター（PCやスマートフォン、タブレットなどインターネット接続可能な機器）に記憶させる機能のことです。Cookieを使用し、当社では、ウェブサイト訪問回数や訪問したページなどの閲覧情報を取得しています。なお、Cookie情報から、お客様の個人情報を特定することは出来ません。お客様は、ブラウザの設定によりCookieを拒否することができますが、拒否された場合は、一部のサービスが受けられない場合があることをご了承下さい。
                </p>
                <p>
                    Cookieは、当社ウェブサイト上で提供される機能を利用するために設けられるものと、当社と提携する第三者によって設定されるものの2種類があります。提携する広告配信サービス提供会社によって、当社のオンライン広告を最適な場所に掲載することができるよう設定されることがあります。
                </p>
            </article>
        </div>

        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Cookieの利用目的
            </div>
            <article>
                <p>
                    (1) お客様がウェブサイトを閲覧する際に、お客様のコンピューターを識別し、サービスを利用できるために使用しております。そのため、お客様がコンピューター上にCookieを保存することによって、同じ情報を繰り返し入力することがなくなるなど、ブラウザ上でウェブサイトへアクセスする利便性が高まります。
                </p>
                <p>
                    (2) 当社では、Cookieを使用して収集した情報を利用して、お客様のウェブサイトの利用状況（アクセス状況、トラフィック、ルーティング等）を分析し、ウェブサイト自体のパフォーマンス改善や、当社からお客様に提供するサービスの向上、改善のために使用することがあります。
                </p>
                <p>
                    また、この分析にあたっては、主に以下のツールが利用され、ツール提供者に情報提供されることがあります。
                </p>
                <p>
                    Google Analytics
                </p>
                <p>
                    ツール提供者： Google Inc.
                </p>
                <p>
                    Googleプライバシーポリシー：<a href="https://www.google.com/intl/ja/policies/privacy/partners/">https://www.google.com/intl/ja/policies/privacy/partners/</a>
                </p>
                <p>
                    新規ウィンドウツールを通して収集される情報：お客様のウェブサイトの利用状況（アクセス状況、トラフィック、 サイト回遊等）
                </p>
            </article>
            <div className="c-policy--articleHeader">
                Cookieの拒否方法
            </div>
            <article>
                <p>
                    (1) 全てのCookieを拒否する方法
                </p>
                <p>
                    お客様がブラウザの設定を変更することによりCookieを無効にすることが可能です。ただし、Cookieを無効にした場合は、当社ウェブサイト以外でも一部のサービスが受けられない場合があることをご了承下さい。
                </p>
                <p>
                    Google Chrome
                </p>
                <a href="https://support.google.com/chrome/bin/-answer.py?hl=ja&answer=95647&p=cpn_cookies">
                    https://support.google.com/chrome/bin/-answer.py?hl=ja&answer=95647&p=cpn_cookies
                </a>
                <p>
                    Cookieの設定の変更方法については、各ブラウザの製造元へご確認ください。
                </p>
                <p>
                    (2) 特定のCookieを拒否する方法
                </p>
                <p>
                    グーグル株式会社およびGoogleネットワーク
                </p>
                <p>
                    プライバシーポリシー：<a href="https://www.google.com/intl/ja/policies/privacy/#infochoices">https://www.google.com/intl/ja/policies/privacy/#infochoices</a>
                </p>
                <p>
                    情報送信停止の方法：<a href="https://support.google.com/ads/answer/2662922?hl=ja">https://support.google.com/ads/answer/2662922?hl=ja</a>
                </p>
            </article>
        </div>
        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                お問い合わせ
            </div>
            <article>
                <p>
                    開示等のお申し出、ご意見、ご質問その他の個人情報の取り扱いに関するお問い合わせは、以下の窓口にご連絡ください。
                </p>
                <p>
                    Mail：<a href="mailto:info@fantation-coin.com">info@fantation-coin.com</a><br/>
                    LINE：<a href="https://lin.ee/AMTD31g">https://lin.ee/AMTD31g</a>
                </p>
            </article>
            <p className="text-right mt-5">2022年1月11日 施行</p>
        </div>
    </section>
    )
}

const PrivacePolicyEN = () => {
    return(
    <section className="p-policy">
        <div className="c-header">
            <h3 className="c-header--title">Privace Policy</h3>
            <p className="c-header--subtitle">プライバシーポリシー</p>
        </div>
        <div className="c-policy">
            <article>
                ArtHolic Inc. (hereinafter referred to as the "Company") provides various services through the Company and other websites operated by the Company (hereinafter referred to as the "Website"). (hereinafter referred to as "the Company"), as a company that handles antique coins and works of art with high rarity and high property value, fully recognizes the importance of protecting personal information in order to ensure the reliability of product transactions and to prevent the occurrence of accidents such as leaks, so that customers can use the Company's services with peace of mind. In order to create an environment and system that allows customers to use our company with peace of mind, we will comply with the Act on the Protection of Personal Information (Act No. 57 of 2003, including subsequent amendments). The Company shall comply with the Act on the Protection of Personal Information (Act No. 57 of 2003, including subsequent amendments) and applicable guidelines, etc. (hereinafter referred to as the "Act"). The Company shall comply with the Act on the Protection of Personal Information (Act No. 57 of 2003, including subsequent amendments) and applicable guidelines, etc. (hereinafter collectively referred to as the "Personal Information Protection Act, etc.") to create an environment and system that allows customers to use the Company with confidence. The Company has established and implemented the following personal information protection policy in compliance with the Act on the Protection of Personal Information (Act No. 57 of 2003, as amended) and applicable guidelines (hereinafter collectively referred to as the "Act").
            </article>
        </div>

        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Acquisition of Personal Information
            </div>
            <article>
                The Company will acquire personal information in an appropriate manner, without deception or other wrongful means.
            </article>
        </div>
        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Purpose of Use of Personal Information
            </div>
            <article>
                We will use the personal information we have acquired for the following purposes. If we use personal information for purposes not specified below, we will obtain the prior consent of the person concerned.
                <p>
                    ・To verify the identity of the customer.
                </p>
                <p>
                    ・To provide and operate various services, including the creation of backups
                </p>
                <p>
                    ・To sell, purchase, and deliver products handled by the Company
                </p>
                <p>
                    ・To assess the value of art works handled by the Company
                </p>
                <p>
                    ・To confirm account information at financial institutions and to check the status of transfers.
                </p>
                <p>
                    ・To perform other services entrusted by our customers
                </p>
                <p>
                    ・To properly manage new transactions and ongoing transactions, including customer credit.
                </p>
                <p>
                    ・To provide maintenance and support, including responses to customer comments, inquiries, etc.
                </p>
                <p>
                    ・To provide maintenance and support, including responses to customer comments, inquiries, etc. To notify you of the establishment, abolition, or modification of the Terms of Service, rules, guidelines, risk explanations, precautions, and other terms related to our services (the "Terms of Service, etc.").
                </p>
                <p>
                    ・To develop, provide, maintain, and improve our new services
                </p>
                <p>
                    ・To analyze customer trends and purchase histories related to products handled by the Company
                </p>
                <p>
                    ・To analyze customer trends and purchase histories related to products handled by the Company
                </p>
                <p>
                    ・For marketing purposes
                </p>
                <p>
                    ・To conduct recruitment activities
                </p>
                <p>
                    ・To respond to audits
                </p>
                <p>
                    ・To respond to requests for disclosure or other actions from investigative agencies, courts, the IRS, or other government agencies of various countries.
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Safety Management of Personal Information
            </div>
            <article>
                We will take necessary and appropriate measures to prevent leakage, loss, or damage of personal information and to otherwise safely manage personal information.
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Outsourcing of Personal Information
            </div>
            <article>
                In the event that we outsource all or part of the handling of personal information to a third party, we will conduct a rigorous investigation of the third party, and will exercise necessary and appropriate supervision over the third party to ensure the safe management of the personal information entrusted to the third party.
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Disclosure and Correction of Personal Information
            </div>
            <article>
                <p>
                    When we receive a request from an individual to disclose his/her own personal information, we will promptly disclose the information within a reasonable period of time and to an appropriate extent.
                </p>
                <p>
                    If we are unable to confirm the identity of the person making such a request, we will not disclose the information.
                </p>
                <p>
                    If there is an error in the content of personal information and the person requests correction, addition, or deletion of the information, we will promptly respond to the request after investigation.
                </p>
                <p>
                    If we are unable to confirm the identity of the person making the request, we will not comply with the request.
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Disclaimer
            </div>
            <article>
                <p>
                    (1) The accuracy, timeliness, or completeness of the information posted on this site is not guaranteed.
                </p>
                <p>
                    (2) We do not guarantee that the information on this site or information accessible through this site is free from computer viruses or spyware.
                </p>
                <p>
                    (3) We are not responsible for any damages resulting from the use of this site. Please use the information on this site at your own risk.
                </p>
            </article>
        </div>
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Changes to this Policy
            </div>
            <article>
                The content of this policy is subject to change. The revised policy will be effective from the time it is posted on this site.
            </article>
        </div>

        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Copyrights
            </div>
            <article>
                <p>
                    The contents and copyrights of this site are owned by the Company. Unauthorized posting of information on this site is prohibited.
                </p>
                <p>
                    In case of disagreement with our privacy policy and handling of personal information
                </p>
                <p>
                    We collect personal information from our customers within the scope and for the purposes necessary for the performance of our business, so that we can provide appropriate services.
                </p>
                <p>
                    Therefore, if a customer does not agree in whole or in part to our Privacy Policy and the handling of personal information, and we are unable to obtain the necessary personal information, we may not be able to provide our services and operations at a level satisfactory to the customer, or we may not be able to provide our services and operations at all. If you do not consent to all or a part of the provisions, and we are unable to obtain the necessary personal information, there is a possibility that we may not be able to provide our services and operations at a level satisfactory to you, or we may not be able to provide our services and operations.
                </p>
            </article>
        </div>

        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Cookies, etc.
            </div>
            <article>
                <p>
                    Cookies are functions that allow a customer's computer (PC, smartphone, tablet, or other Internet-capable device) to store the customer's website browsing information. Cookies are used to collect browsing information such as the number of visits to the website and the pages visited. Please note that cookie information cannot be used to identify personal information of customers. You may set your browser to refuse cookies, but please note that if you do, you may not be able to use some of our services.
                </p>
                <p>
                    There are two types of cookies: those set in order to use the functions provided on the Company's website and those set by third parties affiliated with the Company. Cookies may be set by our affiliated ad-serving service providers to enable them to place our online advertisements in the most appropriate locations.
                </p>
            </article>
        </div>

        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Purposes of Use of Cookies
            </div>
            <article>
                <p>
                    (1) We use cookies to identify your computer when you visit our website and to enable you to use our services. Therefore, by storing a cookie on your computer, you will not have to repeatedly enter the same information, and this will make it more convenient for you to access the website on your browser.
                </p>
                <p>
                    (2) We may use the information collected through the use of cookies to analyze your use of the website (access status, traffic, routing, etc.) and to improve the performance of the website itself and to improve and enhance the services we provide to you. We may use this information to improve the performance of the website itself and to improve the services we provide to our customers.
                </p>
                <p>
                    For this analysis, the following tools are mainly used and information may be provided to the tool providers
                </p>
                <p>
                    Google Analytics
                </p>
                <p>
                    Tool provider: Google Inc.
                </p>
                <p>
                    Google Privacy Policy: <a href="https://www.google.com/intl/ja/policies/privacy/partners/">https://www.google.com/intl/ja/policies/privacy/partners/</a>
                </p>
                <p>
                    Information collected through the New Window tool: your use of the website (visits, traffic, site visits, etc.)
                </p>
            </article>
            <div className="c-policy--articleHeader">
                How to reject cookies
            </div>
            <article>
                <p>
                    (1) How to reject all cookies
                </p>
                <p>
                    You can disable cookies by changing the settings on your browser. However, please note that if you disable cookies, you may not be able to use some of our services outside of our website.
                </p>
                <p>
                    Google Chrome
                </p>
                <a href="https://support.google.com/chrome/bin/-answer.py?hl=ja&answer=95647&p=cpn_cookies">
                    https://support.google.com/chrome/bin/-answer.py?hl=ja&answer=95647&p=cpn_cookies
                </a>
                <p>
                    Please contact the provider of your browser for information on how to change cookie settings.
                </p>
                <p>
                    (2) How to reject certain cookies
                </p>
                <p>
                    Google Inc. and Google Network
                </p>
                <p>
                    Privacy Policy: <a href="https://www.google.com/intl/ja/policies/privacy/#infochoices">https://www.google.com/intl/ja/policies/privacy/#infochoices</a>
                </p>
                <p>
                    How to stop sending information: <a href="https://support.google.com/ads/answer/2662922?hl=ja">https://support.google.com/ads/answer/2662922?hl=ja</a>
                </p>
            </article>
        </div>
        
        <div className="c-policy">
            <div className="c-policy--articleHeader">
                Inquiries
            </div>
            <article>
                <p>
                    For requests for disclosure, comments, questions, or other inquiries regarding the handling of personal information, please contact us at the following address.
                </p>
                <p>
                    Mail：<a href="mailto:info@fantation-coin.com">info@fantation-coin.com</a><br/>
                    LINE：<a href="https://lin.ee/AMTD31g">https://lin.ee/AMTD31g</a>
                </p>
            </article>
            <p className="text-right mt-5">Effective from January 11, 2022</p>
        </div>
    </section>
    )
}

const PrivacePolicy = ({locale}) => {
    if (locale == 'ja') return <PrivacePolicyJP />;
    else return <PrivacePolicyEN />;
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(PrivacePolicy));