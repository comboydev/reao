import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    onLoadSaleHistory,
    onLoadCoinsOnSale,
} from "redux/actions";
import { Table, Row, Col, Tooltip } from "antd";
import styled from 'styled-components';
import utils from 'plugins/utils';
import moment from "moment";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from "components/shared-components/Loading";
import MarketItemWidget from "system/user/components/MarketItemWidget";
import YenFormat from "components/custom/YenFormat";
import TNumberFormat from "components/custom/TNumberFormat";
import Notice from "system/user/components/Notice";
import { shorter } from "contracts/hooks";

const ButtonBar = styled.div`
    display: grid;
    grid-template-columns: 450px 450px;
    grid-gap: 3.125vw;
    gap: 3.125vw;
    justify-content: center;
    padding: 60px 0 25px;
    @media (max-width: 950px) {
        grid-template-columns: 100%;
        padding: 4vw 0;
        gap: 2vw;
    }
`

const TopButton = styled.button`
	display: block;
    border: 1px solid #A78754;
    text-align: center;
    color: #A78754;
    font-family: "yu-mincho-pr6n", "sans-serif";
    font-size: 20px;
    transition: 0.3s all;
    letter-spacing: 3px;
    height: 65px;
    &:hover {
        opacity: 0.8;
        background-color: #A78754;
        color: white;
    }
    &.active {
        background-color: #A78754;
        color: white;
    }

    @media (max-width: 950px) {
        height: 55px;
        margin: 0 4vw;
        font-size: 18px;
    }

    @media (max-width: 550px) {
        height: 50px;
        font-size: 16px;
    }
`;

const columns = [
    {
        title: '日付',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: 200,
        render: timestamp =>
            <span>
                {moment(timestamp).format('YYYY/MM/DD  HH:mm')}
            </span>,
    },
    {
        title: 'コイン名',
        dataIndex: 'name',
        key: 'name',
        width: 400,
        render: (_, record) =>
            <AvatarStatus size={30} type="square"
                src={record.images[0]}
                name={record.name}
            />
    },
    {
        title: '枚数',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
        render: amount => <TNumberFormat value={amount} suffix=' 枚' />
    },
    {
        title: '金額',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: price => <YenFormat value={price} />
    },
    {
        title: 'To',
        dataIndex: 'buyer',
        key: 'buyer',
        width: 200,
        render: buyer =>
            <Tooltip title={buyer} placement="top">
                <span className="cursor-pointer" onClick={() => utils.copyClipboard(buyer)}>
                    {shorter(buyer)}</span>
            </Tooltip>
    },
];

const CoinsOnSale = (props) => {
    const history = useHistory();
    const {
        coinsOnSale,
        loadedCoinsOnSale,
        onLoadCoinsOnSale,
        saleHistory,
        loadedSaleHistory,
        onLoadSaleHistory,
    } = props;

    useEffect(() => {
        onLoadCoinsOnSale();
        onLoadSaleHistory();
    }, [onLoadCoinsOnSale, onLoadSaleHistory]);

    if (!loadedCoinsOnSale)
        return <Loading cover="page" />;
    return (
        <>
            <section>
                <div className="c-memberTop-header" style={{ height: 200 }}>
                    <div className="c-header mb-0">
                        <h3 className="c-header--title text-white">取 引</h3>
                        <p className="c-header--subtitle fs-6">Transaction</p>
                    </div>
                </div>
                <div className="bg-white">
                    <ButtonBar>
                        <TopButton
                            onClick={() => history.push('/coins/owned')}
                        >購入履歴</TopButton>
                        <TopButton className="active">オーナー券販売</TopButton>
                    </ButtonBar>
                </div>
            </section>
            <section className="p-card px-0">
                <div className="c-header mb-5">
                    <h3 className="c-header--title">販売コイン一覧</h3>
                    <p className="c-header--subtitle">Coins on Sale</p>
                </div>
                {coinsOnSale.length === 0 &&
                    <Notice title="販売コインかありません。" />
                }
                <div className="c-coin--list">
                    {coinsOnSale.map((item, key) =>
                        <MarketItemWidget item={item} key={key} />
                    )}
                </div>
            </section>
            <section className="p-card px-0 pt-0">
                <div className="c-header mb-5">
                    <h3 className="c-header--title">販売履歴</h3>
                    <p className="c-header--subtitle">Sale History</p>
                </div>
                <Row className="justify-content-center ff-yuMincho px-3">
                    <Col sm={24} md={20} lg={16} >
                        <Table
                            rowKey="timestamp"
                            columns={columns}
                            className="fw-bold"
                            dataSource={saleHistory}
                            loading={!loadedSaleHistory}
                            bordered
                            pagination={{ pageSize: 20 }}
                            scroll={{ x: 800 }}
                        />
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default connect(
    ({ marketplace }) => (marketplace), {
    onLoadCoinsOnSale,
    onLoadSaleHistory,
})(CoinsOnSale);