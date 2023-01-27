import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ContactSection from "system/user/components/ContactSection";
import JwtService from "services/jwt";
import utils from 'plugins/utils';
import { shorter } from 'contracts/hooks';

const UserRole = styled.div`
	margin: 35px auto 0;
	position: relative;
	text-align: center;
	background-color: #a78754;
	border-radius: 50px;
	color: white;
	font-size: 14px;
	max-width: 90px;
	font-family: "yu-mincho-pr6n", "sans-serif";
	&:after{
		content: '${props=>props.role}';
		position: absolute;
		color: white;
		font-size: 20px;
		font-family: "serif";
		margin-top: 40px;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
	}
`;

const MyPage = (props) => {
	const user = JwtService.getUser();
	const { walletAccount } = props;
	return (
		<>
			<div className="c-memberTop-header position-relative">
				<div className="position-relative">
					<Avatar src={user?.avatar} size={150} icon={<UserOutlined />} className="d-flex align-items-center justify-content-center" />
					<UserRole>一般会員</UserRole>
					<Tooltip title={walletAccount.toLowerCase()} placement="top">
                        <span className="d-block cursor-pointer text-center text-white mt-2" onClick={() => utils.copyClipboard(walletAccount.toLowerCase())}>
                            { shorter(walletAccount).toLowerCase() }</span>
                    </Tooltip>
				</div>
			</div>
			<section className="c-memberTop__content">
				{/* {newsList && newsList.length > 0 && (<div className="c-memberTop-newInfo">
					<div className="c-memberTop-newInfo__header">
						新着情報
					</div>
					<div className="c-memberTop-newInfo__content">
						{newsList.map((item, index) => (
						<ul key={index}>
								<li>
									{ new Date(item.newsDate).toISOString().split('T')[0] }
								</li>
								<li>
									{item.content}
								</li>
							</ul>
						))}

					</div>
				</div>)} */}
				<div className="c-memberTop-allInfo">
					<button className="c-btn">
						お知らせ一覧
					</button>
				</div>
				<div className="c-memberTop-menu">
					<Link className="c-memberTop-menu__item -userInfo" to="/profile">
						個人情報管理<br />本人確認
					</Link>
					<Link className="c-memberTop-menu__item -owner" to = '/marketplace/items'>
						購入可能<br />オーナー権確認
					</Link>
					<Link className="c-memberTop-menu__item -trade" to='/coins/owned'>
						取引
					</Link>
					<Link className="c-memberTop-menu__item -contact" to='/contact-us'>
						お問い合わせ
					</Link>
				</div>
			</section>
			<ContactSection/>
		</>
	)
}

export default connect(
    ({ marketplace }) => (marketplace)
)(MyPage);