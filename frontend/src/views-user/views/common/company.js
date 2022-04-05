import ContactSection from "views-user/components/contact.component";

const Company = () => {
    return(
    <>
      <section className="p-card c-company">
        <div className="c-header mb-4">
          <h3 className="c-header--title">会社概要</h3>
          <p className="c-header--subtitle">Company</p>
        </div>
        <div className="c-card max-w750">
          <ul>
              <li>
                  <dt>会社名</dt>
                  <dd>株式会社ArtHolic</dd>
              </li>
              <li>
                  <dt>所在地</dt>
                  <dd>
                      <p>〒 810-0021</p>
                      <p>福岡県福岡市中央区今泉1-16-12-3F</p>
                  </dd>
              </li>
              <li>
                  <dt>設立</dt>
                  <dd>2017年7月29日</dd>
              </li>
              <li>
                  <dt>事業内容</dt>
                  <dd>
                      <div>共同購入、保有のプラットフォームサービス事業</div>
                      <div>アンティークコインの卸、販売事業</div>
                  </dd>
              </li>
          </ul>
        </div>
      </section>
      <ContactSection/>
    </>
    )
}



export default Company;