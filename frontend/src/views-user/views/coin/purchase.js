import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Row, Col, Card, Image, Button, message } from 'antd';
import NumberFormat from 'react-number-format';
import UserService from 'services/user.service';
import ContactSection from "views-user/components/contact.component";

export default function PurchaseRequest(props) {

    const history = useHistory();
    const coin = history.location.state;
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        let user = UserService.getCurrentUser();
        if(user.identityVerified !== 1){
            message.error("オーナー券を購入するには、本人確認が必要です。", 2, ()=>{
                props.history.goBack()
            });
        } else {
            setLoaded(true);
        }
    })
    
    if(!loaded) return null;
    if(!coin) return <Redirect to="/coins" />
    return (
    <>
        <section className="t-font p-card">
            <div className="tracsaction_header">
                <div className="c-header mb-4">
                    <h3 className="c-header--title">注文内容の確認</h3>
                    <p className="c-header--subtitle">Confirm your order</p>
                </div>
            </div>
            <div className="w-8/12 m-auto">
                <div>
                    <div>
                        <h2 className="text-3xl text-center mb-2 tracking-widest pt-16">
                            オーナー権購入完了までの流れ
                        </h2>
                        <p className="text-base text-yellow-600 text-center mb-10">
                            Flow until the purchase of ownership is completed
                        </p>
                    </div>
                    <div className="flex mt-20">
                        <div className="w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-1 w-20 h-20 mr-4"></div>
                                    <div className="">Step 1</div>
                                </div>
                            </div>
                            <p className="mt-2"><strong>注文枚数・金額の確認</strong><br/>
                                注文枚数を入力し、注文内容を確認後STEP2へお進みください。</p>
                        </div>
                        <div className="mr-12 ml-12 w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-2 w-20 h-20 mr-4"></div>
                                    <div className="">Step 2</div>
                                </div>
                            </div>
                            <p className="mt-2"><strong>お支払い方法の選択</strong><br/>
                            お支払い方法をご選択ください。ご選択いただいた入金方法で必要な情報をメールにてご連絡させていただきます。案内に沿って期限内にご入金をお願い致します。</p>
                        </div>
                        <div className="w-4/12">
                            <div className="flex text-4xl items-center w-full justify-between">
                                <div className="flex items-center">
                                    <div className="confirm-3 w-20 h-20 mr-4"></div>
                                    <div className="">Step 3</div>
                                </div>
                                <div className="float-right"></div>
                            </div>
                            <p className="mt-2"><strong>オーナー権保有確定</strong><br/>
                            ご入金が確認できましたら、オーナー権保有確定のメールをさせていただきます。ログイン後のマイページから保有オーナー権の一覧よりご確認ください。</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p>※ご連絡やマイページの反映が確認できない場合はサポートまでお問い合わせください。</p>
                        <p>※注意事項</p>
                        <p>・期限内にご入金が確認できなかった場合、自動キャンセルとなります。</p>
                        <p>・お振込みやご送金などご入金時に発生する手数料はお客様ご自身のご負担となります、予めご了承ください。</p>
                    </div>
                </div>
                <div  className="step1 mt-20">
                    <h2 className="text-center text-4xl mt-10 mb-10">Step 1</h2>
                    <Row gutter={16} className="mt-4 mb-2">
                        <Col xs={24} md={10} className="mx-auto mb-3">
                            <Card className="rounded mx-auto text-center" style={{ background: "linear-gradient(135deg,  #fff 40%, rgba(214, 196, 167, 0.2) 100%)" }}>
                                <Image shape="circle" src={ coin.mainImage } style={{maxWidth: '100%', width: 250}}/>
                            </Card>
                        </Col>
                        <Col xs={24} md={14} className="mx-auto" style={{ fontSize: 16 }}>
                            <div className="d-flex border-top border-bottom py-3 ">
                                <span style={{ width: 180 }}>コイン名</span>
                                <span className="text-primary font-weight-bold" style={{ fontSize: 18 }}>{coin.name}</span>
                            </div>
                            <div className="d-flex border-bottom py-3 ">
                                <span style={{ width: 180 }}>グレード</span>
                                <span>{coin.grade}</span>
                            </div>
                            <div className="d-flex border-bottom py-3 ">
                                <span style={{ width: 180 }}>発行枚数</span>
                                <span>
                                    <NumberFormat
                                        displayType={'text'} 
                                        value={`${coin.totalCount}`} 
                                        thousandSeparator={true} />
                                    　枚
                                </span>
                            </div>
                            <div className="d-flex border-bottom py-3 ">
                                <span style={{ width: 180 }}>参考取引価格</span>
                                <span>
                                    <NumberFormat
                                        displayType={'text'} 
                                        value={coin.refPrice} 
                                        prefix={'￥'} 
                                        thousandSeparator={true} />
                                    ～
                                </span>
                            </div>
                            <h3 className='pt-3 text-center mb-4'>オーナー権価格:
                                <span style={{ fontSize: 40, marginLeft: 20 }} className="d-block d-md-inline text-bold">	
                                    <NumberFormat
                                        displayType={'text'} 
                                        value={coin.cost} 
                                        thousandSeparator={true} />円
                                </span>
                            </h3>
                        </Col>
                    </Row>
                </div>
                <div className="step2">
                    <h2 className="mt-24 text-4xl text-center">Step 2</h2>
                    <div>
                        <p className="text-3xl text-center mb-2 tracking-widest pt-16">
                            お支払い方法の選択
                        </p>
                        <p className="text-base text-yellow-600 text-center mb-10">
                            Confirmation of terms of use
                        </p>
                    </div>
                    <div className="text-lg text-center">
                        <p>
                            お支払い方法を選択してください。<br/>
                            注文確定後、メールにてお送りする案内に沿って期限内にご入金お願い致します。
                        </p>
                    </div>
                    <div className="w-full mt-16 mb-16 flex items-center justify-center">
                        <label className="mr-16" htmlFor="bank">
                            <input className="ml-2 mr-2" type="radio" id="bank" value="" name="radio" /> 
                            銀行振込
                        </label>
                        <label className="mr-16" htmlFor="card">
                            <input className="ml-2 mr-2" type="radio" id="card" value="" name="radio" /> 
                            クレジットカード
                        </label>
                        <label className="mr-16" htmlFor="crypto">
                            <input className="ml-2 mr-2" type="radio" id="crypto" value="" name="radio" /> 
                            USDT送金
                        </label>
                    </div>
                    <div>
                        <p className="text-3xl text-center mb-2 tracking-widest pt-16">
                            利用規約の確認
                        </p>
                        <p className="text-base text-yellow-600 text-center mb-10">
                            Confirmation of terms of use
                        </p>
                    </div>
                    <div>
                        <p className="text-center text-lg">
                            利用規約を確認し、<br/>
                            チェックボックスにチェックを入れてください。
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-8 mb-80">
                        <label htmlFor="checkTerms">
                            <input className="mr-2" type="checkbox" id="checkTerms"/>
                            <a href="/terms" target="_blank" className="text-link" >利用規約</a>を確認し、全てを同意しました。
                        </label>
                    </div>     
                </div>
            </div>
            <div className="max-w500 mx-auto mt-20">
                <Button 
                    htmlType="submit" 
                    className="c-btn c-btn-regist"
                    block 
                    // loading={this.state.submit}
                >
                    <span className="text-lg">注文する</span>
                </Button> 
            </div>
        </section>
        <ContactSection />
    </>
    )
}