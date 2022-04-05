import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import ContactSection from "../../components/contact.component";
import UserService from "services/user.service";

const UserProfile = styled.div`
	position: relative;
	img{
		border-radius: 50%;
		width: 150px;
		height: 150px;
		object-fit: cover;
	}
`;

const UserRole = styled.div`
	margin: 15px auto 0;
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

const MyPage = () => {

	const [newsList, setNewsList] = useState([]);
	const user = UserService.getCurrentUser();

	return (
		<>
			<div className="c-memberTop-header">
				<UserProfile>
					<img src={ user.avatar } alt="user"/>
					<UserRole role={user.nickname}>一般会員</UserRole>
				</UserProfile>
			</div>
			<section className="c-memberTop__content">
				{newsList && newsList.length > 0 && (<div className="c-memberTop-newInfo">
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
				</div>)}
				<div className="c-memberTop-allInfo">
					<button className="c-btn">
						お知らせ一覧
					</button>
				</div>
				<div className="c-memberTop-menu">
					<Link className="c-memberTop-menu__item -userInfo" to="/profile">
						<div>
							<p>個人情報管理</p>
							<p>本人確認</p>
						</div>
					</Link>
					<Link className="c-memberTop-menu__item -owner" to = '/coins'>
						<div>
							<p>購入可能</p>
							<p>オーナー権確認</p>
						</div>
					</Link>
					<Link className="c-memberTop-menu__item -trade" to='/coins/owned'>
						<p>取引</p>
					</Link>
					<Link className="c-memberTop-menu__item -contact" to='/contact-us'>
						<p>お問い合わせ</p>
					</Link>
				</div>
			</section>
			<ContactSection/>
		</>
	)
}

export default MyPage;