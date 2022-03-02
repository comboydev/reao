import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

import AuthService from "../../services/auth.service";

const UserProfile = styled.div`
	position: relative;
	img{
		border-radius: 50%;
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
		font-family: "trajan-pro-3", "serif";
		margin-top: 40px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const MyPage = () => {

	const [newsList, setNewsList] = useState([]);
	const user = AuthService.getCurrentUser();

	return (
		<>
			<div className="c-memberTop-header">
				<UserProfile>
					<img src={
						user.avatar 
						? user.avatar 
						: "/image/user.png" 
					} alt="user"/>
					<UserRole role={user.id}>一般会員</UserRole>
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
					<Link className="c-memberTop-menu__item -owner" to = '/preparation'>
						<div>
							<p>購入可能</p>
							<p>オーナー権確認</p>
						</div>
					</Link>
					<Link className="c-memberTop-menu__item -trade" to='/preparation'>
						<p>取引</p>
					</Link>
					<Link className="c-memberTop-menu__item -contact" to='/contact'>
						<p>お問い合わせ</p>
					</Link>
				</div>
			</section>
			<section className="p-contact">
				<article className="c-contactarticle">
					<h1>
						お問い合わせ
					</h1>
				</article>
				<ul className="c-contactarticle--list">
					<li>
						FANTATIONのご利用で不明な点がある方
					</li>
					<li>
						ご購入の相談をされたい方
					</li>
					<li>
						お持ちのアンティークコインを売りたい方
					</li>
				</ul>
				<p className="c-contactarticle--text">
					専門のスタッフが24時間365日受け付けておりますので、<br />なんでもお気軽にお問い合わせください。
				</p>
				<button className="c-btn--contact" onClick={(e) => { window.location.href = '/contact' }}>
					<p className="c-btn-text">
						お問い合わせはこちら
					</p>
				</button>

			</section>
		</>
	)
}

export default MyPage;