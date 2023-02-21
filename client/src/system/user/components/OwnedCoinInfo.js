import { Row, Col, Card, Image, Tooltip } from 'antd';
import utils from 'plugins/utils';
import { shorter10, tokenLink } from 'contracts/hooks';
import TNumberFormat from 'components/custom/TNumberFormat';
import YenFormat from 'components/custom/YenFormat';

const OwnedCoinInfo = ({ coin }) =>
    <Row gutter={16} className="mt-4 mb-5">
        <Col xs={24} md={10} className="mx-auto mb-3">
            <Card className="mx-auto text-center"
                style={{ background: "linear-gradient(135deg,  #fff 40%, rgba(214, 196, 167, 0.2) 100%)" }}
            >
                <a href={tokenLink("AQCT1155", coin.tokenId)}
                    target="_blank" rel="noreferrer"
                    className="position-absolute"
                    style={{ left: 10, top: 10 }}
                >{coin.tokenId}</a>
                <Image shape="circle" src={coin.images[0]} style={{ maxWidth: '100%', width: 250 }} />
            </Card>
        </Col>
        <Col xs={24} md={14} className="mx-auto" style={{ fontSize: 16 }}>
            <dl className="d-flex border-top border-bottom py-3">
                <dt style={{ width: 130 }} className="mr-md-5">コイン名</dt>
                <dd className="text-primary font-weight-bold">{coin.name}</dd>
            </dl>
            <dl className="d-flex border-bottom py-3">
                <dt style={{ width: 130 }} className="mr-md-5">グレード</dt>
                <dd>{coin.grade}</dd>
            </dl>
            <dl className="d-flex border-bottom py-3">
                <dt style={{ width: 130 }} className="mr-md-5">保有者</dt>
                <dd>
                    <Tooltip title={coin.owner.toLowerCase()} placement="top">
                        <i className="cursor-pointer" onClick={() => utils.copyClipboard(coin.owner.toLowerCase())}>
                            {shorter10(coin.owner).toLowerCase()}</i>
                    </Tooltip>
                </dd>
            </dl>
            <dl className="d-flex border-bottom py-3">
                <dt style={{ width: 130 }} className="mr-md-5">参考取引価格</dt>
                <dd><YenFormat value={coin.refPrice} />～</dd>
            </dl>
            <dl className="d-flex border-bottom py-3">
                <dt style={{ width: 130 }} className="mr-md-5">発行数 / 保有枠数</dt>
                <dd>
                    <TNumberFormat value={coin.totalSupply} /> /
                    <TNumberFormat
                        value={coin.amount}
                        suffix={' 枚'}
                        className="ms-1"
                    />
                </dd>
            </dl>
        </Col>
    </Row>

export default OwnedCoinInfo