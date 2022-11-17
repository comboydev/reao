import { Row, Col, Card, Image } from 'antd';
import NumberFormat from 'react-number-format';

const CoinInfo = ({ coin }) => {
    const avatarSize = 250;
    return(
    <Row gutter={16} className="mt-4 mb-2">
        <Col xs={24} md={10} className="mx-auto mb-3">
            <Card className="rounded mx-auto text-center" style={{ background: "linear-gradient(135deg,  #fff 40%, rgba(214, 196, 167, 0.2) 100%)" }}>
                <Image shape="circle" src={ coin.mainImage } style={{maxWidth: '100%', width: avatarSize}}/>
            </Card>
        </Col>
        <Col xs={24} md={14} className="mx-auto" style={{ fontSize: 16 }}>
            <p className="d-flex border-top border-bottom py-3 ">
                <span style={{ width: 180 }}>コイン名</span>
                <span className="text-primary font-weight-bold" style={{ fontSize: 18 }}>{coin.name}</span>
            </p>
            <p className="d-flex border-bottom py-3 ">
                <span style={{ width: 180 }}>グレード</span>
                <span>{coin.grade}</span>
            </p>
            <p className="d-flex border-bottom py-3 ">
                <span style={{ width: 180 }}>発行枚数</span>
                <span>
					<NumberFormat
						displayType={'text'} 
						value={coin.totalCount} 
						suffix={' 枚'} 
						thousandSeparator={true} 
					/>
                </span>
            </p>
            <p className="d-flex border-bottom py-3 ">
                <span style={{ width: 180 }}>参考取引価格</span>
                <span>
                    <NumberFormat
                        displayType={'text'} 
                        value={coin.refPrice} 
                        prefix={'￥'} 
                        thousandSeparator={true} />
                    ～
                </span>
            </p>
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
    )
}

export default CoinInfo