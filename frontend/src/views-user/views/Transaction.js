import React from "react";

export default function Transaction() {
  return (
    <div>
      <div className="tracsaction_header">
        <div className="transaction_header_content">
          <div className="tracsaction_header_ja tracking-widest">取引</div>
          <div className="tracsaction_header_en">TRANSACTION</div>
        </div>
      </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"59vw", margin: "auto", marginBottom:"120px"}}>
            <div style={{width:"28.4375vw", height:"92px", textAlign: "center", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"25px", color:"#a78754", border:"1px solid #a78754"}}>購入履歴</div>
            <div style={{width:"28.4375vw", height:"92px", textAlign: "center", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"25px", color:"white", backgroundColor:"#A78754"}}>オーナー権売却</div>
        </div>
        {/* <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",margin: "auto"}}>
            <div style={{display: "grid", gridTemplateColumns: "28.4375vw 28.4375vw", gridTemplateRows: "27.70833vw 27.70833vw", gridGap: "1.5104166vw 2.0833vw", gap: "1.5104166vw 2.0833vw"}}>購入履歴</div>
            <div style={{display: "grid", gridTemplateColumns: "28.4375vw 28.4375vw", gridTemplateRows: "27.70833vw 27.70833vw", gridGap: "1.5104166vw 2.0833vw", gap: "1.5104166vw 2.0833vw"}}>オーナー権売却</div>
        </div> */}
        <div style={{fontSize:"40px", textAlign: "center"}}>購入コイン一覧</div>
        <div style={{fontSize:"15px", color:"#a78754", textAlign: "center", marginTop:"15px", marginBottom:"30px"}}>Purchase Coin</div>
      <div className="c-coin"
        style={{
          width: "fit-content",
          margin: "auto",
          gridTemplateRows: "30.70833vw 30.70833vw 30.70833vw 30.70833vw",
        }}
      >
        <ul className="c-coin__lion">
          <li>
            <p className="c-coin__lion__nameHeader">・コイン名:</p>
            <p className="c-coin__lion__name">
              1839 G.BRITAIN 5 Sov W&R-279
              <br />
              UNA AND THE LION
            </p>
          </li>
          <li>
            <p className="c-coin__lion__greadHeader">・グレード:</p>
            <p className="c-coin__lion__gread">PF 66★ ULTRA CAMEO</p>
          </li>
          <li>
            <p className="c-coin__lion__printNumber">・発行枚数:400枚</p>
          </li>
          <br></br>
          <li className="c-coin__lion__price">
            <p
              className="c-coin__lion__priceHeader"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              ・参考取引価格:
            </p>
            <div style={{ marginLeft: "auto", fontSize: "25px" }}>
              <p className="c-coin__lion__priceHigh">
                10,000万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__lion__ownerPrice">
            <p className="c-coin__lion__ownerPriceHeader">・オーナー権価格:</p>
            <p
              className="c-coin__lion__ownerPrice__price"
              style={{ marginLeft: "auto" }}
            >
              10000円
            </p>
          </li>
          <br />
          <li>
            <div
              style={{
                backgroundColor: "#A78754",
                width: "90%",
                height:"40px",
                margin: "auto",
                textAlign: "center",
                fontSize: "20px",
                color: "white",
                borderRadius: "3px",
                cursor: "pointer",
                display: "flex", alignItems:"center", justifyContent:"center"
              }}
            >
              コインの詳細をみる
            </div>
          </li>
        </ul>

        <ul className="c-coin__crown">
          <li>
            <p className="c-coin__crown__nameHeader">・コイン名:</p>
            <p className="c-coin__crown__name">
              1847 Crown Great Britain Gothic
            </p>
          </li>
          <li>
            <p className="c-coin__crown__greadHeader">・グレード:</p>
            <p className="c-coin__crown__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__crown__printNumber">・発行枚数:8000枚</p>
          </li>
          <br />
          <li className="c-coin__crown__price">
            <p className="c-coin__crown__priceHeader" style={{ marginTop: "auto", marginBottom: "auto" }}>・参考取引価格:</p>
            <div style={{ marginLeft: "auto", fontSize: "25px" }}>
              <p className="c-coin__crown__priceHigh">
                400万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__crown__ownerPrice">
            <p className="c-coin__crown__ownerPriceHeader">・オーナー権価格:</p>
            <p className="c-coin__crown__ownerPrice__price" style={{ marginLeft: "auto"}}>10000円</p>
          </li><br /> 
          <li>
            <div
              style={{
                backgroundColor: "#A78754",
                width: "90%",
                height:"40px",
                margin: "auto",
                textAlign: "center",
                fontSize: "20px",
                color: "white",
                borderRadius: "3px",
                cursor: "pointer",
                display: "flex", alignItems:"center", justifyContent:"center"
              }}
            >
              コインの詳細をみる
            </div>
          </li>
        </ul>

        <ul className="c-coin__guinea">
          <li>
            <p className="c-coin__guinea__nameHeader">・コイン名:</p>
            <p className="c-coin__guinea__name">1895A 10M G.N.GUINEA</p>
          </li>
          <li>
            <p className="c-coin__guinea__greadHeader">・グレード:</p>
            <p className="c-coin__guinea__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__guinea__printNumber">・発行枚数:2000枚</p>
          </li>
          <li className="c-coin__guinea__price">
            <p className="c-coin__guinea__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__guinea__priceHigh">
                600万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__guinea__ownerPrice">
            <p className="c-coin__guinea__ownerPriceHeader">
              ・オーナー権価格:
            </p>
            <p className="c-coin__guinea__ownerPrice__price">10000円</p>
          </li>
        </ul>

        <ul className="c-coin__bavaria">
          <li>
            <p className="c-coin__bavaria__nameHeader">・コイン名:</p>
            <p className="c-coin__bavaria__name">
              1640 GERMANY 5D BAVARIA FR-196
            </p>
          </li>
          <li>
            <p className="c-coin__bavaria__greadHeader">・グレード:</p>
            <p className="c-coin__bavaria__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__bavaria__printNumber">
              ・発行枚数:<span>不明（※推測100～200枚程度）</span>
            </p>
          </li>
          <li className="c-coin__bavaria__price">
            <p className="c-coin__bavaria__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__bavaria__priceHigh">
                500万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__bavaria__ownerPrice">
            <p className="c-coin__bavaria__ownerPriceHeader">
              ・オーナー権価格:
            </p>
            <p className="c-coin__bavaria__ownerPrice__price">10000円</p>
          </li>
        </ul>
        <ul className="c-coin__lion">
          <li>
            <p className="c-coin__lion__nameHeader">・コイン名:</p>
            <p className="c-coin__lion__name">
              1839 G.BRITAIN 5 Sov W&R-279
              <br />
              UNA AND THE LION
            </p>
          </li>
          <li>
            <p className="c-coin__lion__greadHeader">・グレード:</p>
            <p className="c-coin__lion__gread">PF 66★ ULTRA CAMEO</p>
          </li>
          <li>
            <p className="c-coin__lion__printNumber">・発行枚数:400枚</p>
          </li>
          <li className="c-coin__lion__price">
            <p className="c-coin__lion__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__lion__priceHigh">
                10,000万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__lion__ownerPrice">
            <p className="c-coin__lion__ownerPriceHeader">・オーナー権価格:</p>
            <p className="c-coin__lion__ownerPrice__price">10000円</p>
          </li>
        </ul>

        <ul className="c-coin__crown">
          <li>
            <p className="c-coin__crown__nameHeader">・コイン名:</p>
            <p className="c-coin__crown__name">
              1847 Crown Great Britain Gothic
            </p>
          </li>
          <li>
            <p className="c-coin__crown__greadHeader">・グレード:</p>
            <p className="c-coin__crown__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__crown__printNumber">・発行枚数:8000枚</p>
          </li>
          <li className="c-coin__crown__price">
            <p className="c-coin__crown__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__crown__priceHigh">
                400万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__crown__ownerPrice">
            <p className="c-coin__crown__ownerPriceHeader">・オーナー権価格:</p>
            <p className="c-coin__crown__ownerPrice__price">10000円</p>
          </li>
        </ul>

        <ul className="c-coin__guinea">
          <li>
            <p className="c-coin__guinea__nameHeader">・コイン名:</p>
            <p className="c-coin__guinea__name">1895A 10M G.N.GUINEA</p>
          </li>
          <li>
            <p className="c-coin__guinea__greadHeader">・グレード:</p>
            <p className="c-coin__guinea__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__guinea__printNumber">・発行枚数:2000枚</p>
          </li>
          <li className="c-coin__guinea__price">
            <p className="c-coin__guinea__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__guinea__priceHigh">
                600万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__guinea__ownerPrice">
            <p className="c-coin__guinea__ownerPriceHeader">
              ・オーナー権価格:
            </p>
            <p className="c-coin__guinea__ownerPrice__price">10000円</p>
          </li>
        </ul>

        <ul className="c-coin__bavaria">
          <li>
            <p className="c-coin__bavaria__nameHeader">・コイン名:</p>
            <p className="c-coin__bavaria__name">
              1640 GERMANY 5D BAVARIA FR-196
            </p>
          </li>
          <li>
            <p className="c-coin__bavaria__greadHeader">・グレード:</p>
            <p className="c-coin__bavaria__gread">PR65 CAMEO</p>
          </li>
          <li>
            <p className="c-coin__bavaria__printNumber">
              ・発行枚数:<span>不明（※推測100～200枚程度）</span>
            </p>
          </li>
          <li className="c-coin__bavaria__price">
            <p className="c-coin__bavaria__priceHeader">・参考取引価格:</p>
            <div>
              <p className="c-coin__bavaria__priceHigh">
                500万円～
                <br />
              </p>
            </div>
          </li>
          <li className="c-coin__bavaria__ownerPrice">
            <p className="c-coin__bavaria__ownerPriceHeader">
              ・オーナー権価格:
            </p>
            <p className="c-coin__bavaria__ownerPrice__price">10000円</p>
          </li>
        </ul>
      </div>
      <div className="transaction_table" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"58.6%", margin: "auto", marginTop:"80px"}}>
        <div style={{fontSize:"40px", color:"#222222"}}>売却履歴</div>
        <div style={{fontSize:"15px", color:"#a78754"}}>Sale History</div>
          <table style={{width:"100%", backgroundColor: "#332f2d", border:"white 1px solid", marginTop:"18px"}}>
            <tr>
              <th>日付</th>
              <th>コイン名</th>
              <th>枚数</th>
              <th>金額</th>
            </tr>
            <tr>
              <td>2022.01.01</td>
              <td>1839 G.BRITAIN 5 Sov W&R-279 UNA  AND THE LION </td>
              <td>200枚</td>
              <td>10,000円</td>
            </tr>
            <tr>
              <td>2022.01.01</td>
              <td>1839 G.BRITAIN 5 Sov W&R-279 UNA  AND THE LION </td>
              <td>200枚</td>
              <td>10,000円</td>
            </tr>
            <tr>
              <td>2022.01.01</td>
              <td>1839 G.BRITAIN 5 Sov W&R-279 UNA  AND THE LION </td>
              <td>200枚</td>
              <td>10,000円</td>
            </tr>
            <tr>
              <td>2022.01.01</td>
              <td>1839 G.BRITAIN 5 Sov W&R-279 UNA  AND THE LION </td>
              <td>200枚</td>
              <td>10,000円</td>
            </tr>
            <tr>
              <td>2022.01.01</td>
              <td>1839 G.BRITAIN 5 Sov W&R-279 UNA  AND THE LION </td>
              <td>200枚</td>
              <td>10,000円</td>
            </tr>
          </table>
      </div>
      <section className="p-contact" id="p-contact">
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
  );
}
