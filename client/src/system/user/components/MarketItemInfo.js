import { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Image, Tooltip, Button } from 'antd';
import PurchaseModal from "components/custom/modals/PurchaseModal";
import utils from 'plugins/utils';
import { shorter10, tokenLink } from 'contracts/hooks';
import YenFormat from "components/custom/YenFormat";
import TNumberFormat from "components/custom/TNumberFormat";
import { imageUri } from "services/image";

const MarketItemInfo = (props) => {
    const { item, jpy2Matic, walletAccount } = props
    const [visible, setVisible] = useState(false);
    return (
        <Row gutter={16} className="mt-4 mb-2">
            <Col xs={24} md={10} className="mx-auto mb-3">
                <Card className="mx-auto text-center"
                    style={{ background: "linear-gradient(135deg,  #fff 40%, rgba(214, 196, 167, 0.2) 100%)" }}
                >
                    <a href={tokenLink("AQCT1155", item.tokenId)}
                        target="_blank" rel="noreferrer"
                        className="position-absolute"
                        style={{ left: 10, top: 10 }}
                    >{item.tokenId}</a>
                    <Image shape="circle" src={imageUri(item.images[0])} style={{ maxWidth: '100%', width: 250 }} />
                </Card>
            </Col>
            <Col xs={24} md={14} className="mx-auto">
                <dl className="d-flex border-top border-bottom py-3">
                    <dt style={{ width: 130 }} className="mr-md-5">コイン名</dt>
                    <dd className="text-primary font-weight-bold">{item.name}</dd>
                </dl>
                <dl className="d-flex border-bottom py-3">
                    <dt style={{ width: 130 }} className="mr-md-5">グレード</dt>
                    <dd>{item.grade}</dd>
                </dl>
                <dl className="d-flex border-bottom py-3">
                    <dt style={{ width: 130 }} className="mr-md-5">販売者</dt>
                    <dd>
                        <Tooltip title={item.seller.toLowerCase()} placement="top">
                            <i className="cursor-pointer" onClick={() => utils.copyClipboard(item.seller.toLowerCase())}>
                                {shorter10(item.seller).toLowerCase()}</i>
                        </Tooltip>
                    </dd>
                </dl>
                <dl className="d-flex border-bottom py-3">
                    <dt style={{ width: 130 }} className="mr-md-5">参考取引価格</dt>
                    <dd>
                        <YenFormat value={item.refPrice} />
                        ～
                    </dd>
                </dl>
                <dl className="d-flex border-bottom py-3">
                    <dt style={{ width: 130 }} className="mr-md-5">発行数 / 販売数</dt>
                    <dd>
                        <TNumberFormat
                            value={item.totalSupply}
                        /> /
                        <TNumberFormat
                            value={item.amount}
                            suffix={' 枚'}
                            className="ms-1"
                        />
                    </dd>
                </dl>
                <dl className='py-3 text-center'>
                    オーナー権価格:
                    <p style={{ fontSize: 40, marginLeft: 20 }} className="d-block d-md-inline fw-bold">
                        <YenFormat value={item.price} />
                    </p>
                    <span className="ms-2">({
                        jpy2Matic && (item.price * jpy2Matic).toFixed(3)} MATIC)</span>
                </dl>
                {walletAccount.toLowerCase() !== item.seller.toLowerCase() &&
                    <Button
                        className="c-btn c-coin--detailbtn"
                        onClick={() => setVisible(true)}
                    >購入する</Button>
                }
                <PurchaseModal
                    item={item}
                    visible={visible}
                    onCancel={() => setVisible(false)}
                />
            </Col>
        </Row>
    )
}

export default connect(
    ({ marketplace }) => (marketplace)
)(MarketItemInfo);