import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Form, InputNumber, message, notification } from 'antd';
import { onLoadJpy2MaticRate } from "redux/actions";
import Marketplace from "contracts/services/marketplace";
import YenFormat from "../YenFormat";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const ListTokenModal = (props) => {
    const { visible, coin, onCancel, jpy2Matic, onLoadJpy2MaticRate } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [listingPrice, setListingPrice] = useState(0);

    useEffect(() => {
        onLoadJpy2MaticRate();
    })

    const handleListToken = () => {
        form.validateFields()
            .then(async values => {
                setLoading(true);
                try {
                    await Marketplace.listToken(coin.tokenId, values.price, values.amount);
                    notification.success({ message: "出品完了しました!" });
                    history.push('/admin/coins/sale');
                } catch (err) {
                    console.log(err);
                    onCancel();
                    setLoading(false);
                    if (err.data.code === -32000) message.error("出品費用が不足しています。");
                    else message.error("Transaction Failed.");
                }
            });
    }

    const handleChange = () => {
        const values = form.getFieldsValue();
        if (values.price && values.amount) {
            setListingPrice(values.price * values.amount * 0.1);
        }
    }

    return (
        <Modal
            title="マーケットに出品する"
            visible={visible}
            onOk={handleListToken}
            onCancel={onCancel}
            okText="出品"
            okButtonProps={{
                loading: loading,
            }}
        >
            <Form form={form} {...formItemLayout} onValuesChange={handleChange}>
                <Form.Item
                    name="price"
                    label="販売価格"
                    rules={[{ required: true, message: 'この項目は必須です!' }]}
                    className="mt-4"
                >
                    <InputNumber
                        className="w-100"
                        min={0}
                        addonBefore="￥"
                        placeholder="10,000"
                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="出品枚数"
                    rules={[{ required: true, message: 'この項目は必須です!' }]}
                >
                    <InputNumber
                        className="w-100"
                        min={1}
                        max={coin.amount}
                        addonBefore="枚"
                        placeholder={`1 ~ ${coin.amount} 枚`}
                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>
                <Form.Item
                    label="出品費用"
                >
                    <h2 className="text-center mb-0">
                        <YenFormat value={listingPrice.toFixed()} />
                    </h2>
                    {
                        (jpy2Matic && listingPrice) ?
                            <p className="text-center">{(listingPrice * jpy2Matic).toFixed(3)} MATIC</p>
                            : <></>
                    }
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default connect(
    ({ marketplace }) => (marketplace), { onLoadJpy2MaticRate }
)(ListTokenModal);