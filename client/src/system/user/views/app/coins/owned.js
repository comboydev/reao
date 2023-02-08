import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    fetchPurchaseHistory,
    fetchOwnedCoins,
} from "redux/actions";
import { Table, Row, Col, Tooltip } from "antd";
import styled from 'styled-components';
import moment from 'moment';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from "components/shared-components/Loading";
import TNumberFormat from "components/custom/TNumberFormat";
import YenFormat from "components/custom/YenFormat";
import utils from 'plugins/utils';
import OwnedCoinWidget from "system/user/components/OwnedCoinWidget";
import Notice from "system/user/components/Notice";
import { shorter } from 'contracts/hooks';

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
        title: 'From',
        dataIndex: 'seller',
        key: 'seller',
        width: 200,
        render: seller =>
            <Tooltip title={seller} placement="top">
                <span className="cursor-pointer" onClick={() => utils.copyClipboard(seller)}>
                    {shorter(seller)}</span>
            </Tooltip>
    },
];

const OwnedCoins = (props) => {
    const history = useHistory();
    const {
        ownedCoins,
        loadedOwnedCoins,
        fetchOwnedCoins,
        purchaseHistory,
        loadedPurchaseHistory,
        fetchPurchaseHistory,
    } = props;

    useEffect(() => {
        fetchOwnedCoins();
        fetchPurchaseHistory();
    }, [fetchOwnedCoins, fetchPurchaseHistory]);

    if (!loadedOwnedCoins)
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
                        <TopButton className="active">購入履歴</TopButton>
                        <TopButton
                            onClick={() => history.push('/coins/sale')}
                        >オーナー券販売</TopButton>
                    </ButtonBar>
                </div>
            </section>
            <section className="p-card px-0">
                <div className="c-header mb-5">
                    <h3 className="c-header--title">保有コイン一覧</h3>
                    <p className="c-header--subtitle">Owned Coins</p>
                </div>
                {ownedCoins.length === 0 &&
                    <Notice title="保有コインかありません。" />
                }
                <div className="c-coin--list">
                    {ownedCoins.map((coin, key) =>
                        <OwnedCoinWidget coin={coin} key={key} />
                    )}
                </div>
            </section>
            <section className="p-card px-0 pt-0">
                <div className="c-header mb-5">
                    <h3 className="c-header--title">購入履歴</h3>
                    <p className="c-header--subtitle">Purchase History</p>
                </div>
                <Row className="justify-content-center ff-yuMincho px-3">
                    <Col sm={24} md={20} lg={16} >
                        <Table
                            rowKey="timestamp"
                            columns={columns}
                            className="fw-bold"
                            dataSource={purchaseHistory}
                            loading={!loadedPurchaseHistory}
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
    fetchOwnedCoins,
    fetchPurchaseHistory,
})(OwnedCoins);