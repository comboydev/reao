import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Form, InputNumber, message, notification } from 'antd';
import TNumberFormat from 'components/custom/TNumberFormat';
import Marketplace from "contracts/services/marketplace";

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

const PurchaseModal = (props) => {
    const { visible, item, onCancel, jpy2Matic } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [amount, setAmount] = useState(1);
    const [loading, setLoading] = useState(false);

    const purchase = () => {
        form.validateFields()
        .then(async value => {
            setLoading(true);
            try {
                await Marketplace.buyItem(item.itemId, value.amount, item.price);
                notification.success({ message: "購入完了しました!" });
                history.push(`/coins/detail/${item.tokenId}`);
            } catch (err) {
                console.log(err);
                onCancel();
                setLoading(false);
                if (err.data.code === -32000) message.error("購入費用が不足しています。");
                else message.error("購入失敗しました。");
            }
        })
    }

    return (
        <Modal
            title="オーナー券を購入する"
            visible={visible}
            onCancel={onCancel}
            okText="購入"
            onOk={purchase}
            okButtonProps={{
                loading: loading,
                className: 'd-inline-flex align-items-center justify-content-center'
            }}
        >
            <Form form={form}
                initialValues={{ amount }}
                {...formItemLayout}
            >
                <Form.Item
                    name="amount"
                    label="購入枚数"
                    rules={[{ required: true, message: 'この項目は必須です!' }]}>
                    <InputNumber 
                        className="w-100"
                        min={1}
                        max={item.amount}
                        addonAfter="枚"
                        placeholder={`1 ~ ${item.amount} 枚`}
                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        onChange={(value) => setAmount(value)}
                    />
                </Form.Item>
            </Form>
            <p className="fs-2 fw-bold text-center">
                <TNumberFormat value={item.price * amount} />円
            </p>
            <p className="text-center mt-2">({
                jpy2Matic && (item.price * amount * jpy2Matic).toFixed(3)} MATIC)</p>
        </Modal>
    )
}            

export default connect(
    ({ marketplace }) => (marketplace)
)(PurchaseModal);