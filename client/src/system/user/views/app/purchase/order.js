import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Row, Col, Button, message, Radio, Form, InputNumber, Checkbox, Modal } from 'antd';
import ContactSection from "system/user/components/ContactSection";
import CoinInfo from 'system/user/components/OwnedCoinInfo';
import { PAYMENT_TYPE } from "constants/AppConstant";
import userOrder from 'api/user/order';
import { connect } from "react-redux";

const PurchaseRequest = (props) => {
    const { user } = props;

    const history = useHistory();
    const coin = history.location.state;
    const [orderForm] = Form.useForm();

    const [loaded, setLoaded] = useState(false);
    const [show_modal, setShowModal] = useState(false);
    const [check_terms, setCheckTerms] = useState(false);
    const [submit, setSubmit] = useState(false);


    useEffect(() => {
        if (user.identityVerified !== 1) {
            message.error("オーナー券を購入するには、本人確認が必要です。", 2, () => {
                props.history.goBack()
            });
        } else {
            setLoaded(true);
        }
    }, [props.history])


    const onCheckboxChange = (e) => {
        setCheckTerms(e.target.checked);
    };


    const onVisibleModal = () => {
        if (!check_terms) {
            message.warning("利用規約を確認して同意してください。")
            return;
        }
        setShowModal(true);
    }


    const ConfirmModal = () => {
        return (
            <Modal
                title="注文内容確認"
                visible={show_modal}
                onOk={onSubmit}
                confirmLoading={submit}
                onCancel={() => { setShowModal(false) }}
            >
                <div className="text-center">
                    <img src={coin.mainImage} className="mb-4" alt="coin-main" style={{ maxWidth: 200 }} />
                    <Row gutter={20}>
                        <Col xs={12} className="mb-2">
                            <p className="text-right">オーナー権価格:</p>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p className="text-left">{coin.ownership.cost} 円/枚</p>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p className="text-right">注文枚数:</p>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p className="text-left">{orderForm.getFieldValue().orderCount} 枚</p>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p className="text-right">支払い方法:</p>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p className="text-left">{PAYMENT_TYPE[orderForm.getFieldValue().paymentType].label}</p>
                        </Col>
                    </Row>
                </div>
            </Modal>
        )
    }


    const onSubmit = () => {
        let formValues = orderForm.getFieldValue();
        let req = {
            ownershipID: coin.ownership.id,
            buyerID: user.id,
            orderCount: formValues.orderCount,
            paymentType: formValues.paymentType
        }

        setSubmit(true);
        setShowModal(false);
        userOrder.create(req)
            .then(res => {
                setSubmit(false);
                switch (res.data.statusCode) {
                    case 200: message.success(res.data.message); break;
                    case 401: message.warning(res.data.message); break;
                    default: break;
                }
            })
            .catch(err => {
                setSubmit(false);
                message.error("注文が失敗しました。");
            })
    }

    if (!loaded) return null;
    if (!coin) return <Redirect to="/coins" />
    return (
        <>
            <section className="t-font p-card">
                <Form
                    name="changePasswordForm"
                    layout="vertical"
                    form={orderForm}
                    initialValues={
                        {
                            paymentType: 0,
                            orderCount: coin.ownership.minCount
                        }
                    }
                >
                    <div className="tracsaction_header">
                        <div className="c-header">
                            <h3 className="c-header--title">注文内容の確認</h3>
                            <p className="c-header--subtitle">Confirm your order</p>
                        </div>
                    </div>
                    <div className="m-auto max-w900">
                        <div>
                            <div>
                                <h2 className="text-3xl text-center mb-2 tracking-widest pt-16">
                                    オーナー権購入完了までの流れ
                                </h2>
                                <p className="text-base text-yellow-600 text-center mb-10">
                                    Flow until the purchase of ownership is completed
                                </p>
                            </div>
                            <div className="row mt-20">
                                <div className="col-md-4 my-3">
                                    <div className="flex text-4xl items-center w-full justify-between">
                                        <div className="flex items-center">
                                            <div className="confirm-1 w-20 h-20 mr-4"></div>
                                            <div className="">STEP 1</div>
                                        </div>
                                    </div>
                                    <p className="mt-2"><strong>注文枚数・金額の確認</strong><br />
                                        注文枚数を入力し、注文内容を確認後STEP2へお進みください。</p>
                                </div>
                                <div className="col-md-4 my-3">
                                    <div className="flex text-4xl items-center w-full justify-between">
                                        <div className="flex items-center">
                                            <div className="confirm-2 w-20 h-20 mr-4"></div>
                                            <div className="">STEP 2</div>
                                        </div>
                                    </div>
                                    <p className="mt-2"><strong>お支払い方法の選択</strong><br />
                                        お支払い方法をご選択ください。ご選択いただいた入金方法で必要な情報をメールにてご連絡させていただきます。案内に沿って期限内にご入金をお願い致します。</p>
                                </div>
                                <div className="col-md-4 my-3">
                                    <div className="flex text-4xl items-center w-full justify-between">
                                        <div className="flex items-center">
                                            <div className="confirm-3 w-20 h-20 mr-4"></div>
                                            <div className="">STEP 3</div>
                                        </div>
                                        <div className="float-right"></div>
                                    </div>
                                    <p className="mt-2"><strong>オーナー権保有確定</strong><br />
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
                        <div className="step1 mt-20">
                            <h2 className="text-center text-4xl mt-10 mb-10">STEP 1</h2>

                            <CoinInfo coin={coin} />

                            <div className="max-w500 m-auto pt-3">
                                <Form.Item
                                    name="orderCount"
                                    label={`注文枚数の選択(${coin.ownership.minCount} ~ ${coin.ownership.count} 枚)`}
                                >
                                    <InputNumber
                                        className="w-100"
                                        min={coin.ownership.minCount}
                                        max={coin.ownership.count}
                                        addonAfter="枚"
                                        size="large"
                                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="step2">
                            <h2 className="mt-24 text-4xl text-center">STEP 2</h2>
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
                                    お支払い方法を選択してください。<br />
                                    注文確定後、メールにてお送りする案内に沿って期限内にご入金お願い致します。
                                </p>
                            </div>
                            <div className="w-full mt-16 mb-16 flex items-center justify-center">
                                <Form.Item name="paymentType">
                                    <Radio.Group>
                                        {
                                            PAYMENT_TYPE.map((d, i) =>
                                                <Radio value={d.value} key={i}>{d.label}</Radio>
                                            )
                                        }
                                    </Radio.Group>
                                </Form.Item>
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
                                    利用規約を確認し、<br />
                                    チェックボックスにチェックを入れてください。
                                </p>
                            </div>
                            <div className="flex items-center justify-center mt-8 mb-80">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your nickname',
                                        },
                                    ]}
                                >
                                    <Checkbox checked={check_terms} onChange={onCheckboxChange}>
                                        <a href="/terms" target="_blank" className="text-link text-lg" >利用規約</a>を確認し、全てを同意しました。
                                    </Checkbox>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="max-w500 mx-auto mt-20">
                        <Button
                            className="c-btn c-btn-regist"
                            block
                            onClick={onVisibleModal}
                        >
                            <span className="text-lg">注文する</span>
                        </Button>
                        <ConfirmModal />
                    </div>
                </Form>
            </section>
            <ContactSection />
        </>
    )
}

export default connect(({ appStore }) => appStore)(PurchaseRequest)