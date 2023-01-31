import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button, message } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { required, is_phoneNumber, is_email } from "plugins/validator";
import IntlMessage from "components/util-components/IntlMessage";
import { connect } from "react-redux";
import JwtService from "services/jwt";
import api from 'api';


const Contact = ({ locale }) => {

	var form, checkBtn;
	const history = useHistory();
	const [name, setName] = useState('');
	const [furigana, setFurigana] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const [submit, setSubmit] = useState(false);
	const [enableBtn, setEnableBtn] = useState(false);


	useEffect(() => {
		let user = JwtService.getUser();
		if (user) {
			setEmail(user.email);
			setName(user.personalInfo?.name);
			setPhoneNumber(user.personalInfo?.phoneNumber);
			setFurigana(user.personalInfo?.furigana);
		}
		setTitle('オーナー権の購入、売却について');
	}, [])

	useEffect(() => {
		setEnableBtn(!(!name && !furigana && !phoneNumber && !email && !title && !content));
	}, [name, furigana, phoneNumber, email, title, content])


	const handleSubmit = (e) => {
		e.preventDefault();

		form.validateAll();
		if (checkBtn.context._errors.length > 0)
			return;

		const contactObject = {
			name: name,
			furigana: furigana,
			phoneNumber: phoneNumber,
			email: email,
			title: title,
			content: content
		};

		setSubmit(true);
		api.userContact.submit(contactObject)
			.then(() => {
				setSubmit(false);
				history.push("/contact-us/complete");
			})
			.catch(err => {
				setSubmit(false);
				message.error("エラーか発生しました。");
			})
	}

	const options = locale === 'ja' ?
		[
			{ value: 'オーナー権の購入、売却について', label: 'オーナー権の購入、売却について' },
			{ value: 'コインの出品、買取について', label: 'コインの出品、買取について' },
			{ value: 'メディア掲載について', label: 'メディア掲載について' },
			{ value: 'その他の問い合わせ', label: 'その他の問い合わせ' },
		] : [
			{ value: 'オーナー権の購入、売却について', label: 'Buying/Selling Ownership' },
			{ value: 'コインの出品、買取について', label: 'Purchase/Selling Coins' },
			{ value: 'メディア掲載について', label: 'Media Coverage' },
			{ value: 'その他の問い合わせ', label: 'Other Inquiries' },
		]


	return (
		<section className="p-card c-contact--form">
			{
				locale === 'ja' ?
					<div className="c-header">
						<h3 className="c-header--title">お問い合わせ</h3>
						<p className="c-header--subtitle">Contact us</p>
					</div>
					:
					<div className="c-header">
						<h3 className="c-header--title">CONTACT</h3>
						<p className="c-header--subtitle">お問い合わせ</p>
					</div>
			}
			<div className="c-card">
				<p className="text-center">
					<IntlMessage id="page.contact.txt1" />	<br />
					<IntlMessage id="page.contact.txt2" />
				</p>
				<div className="c-memberInfo__form mt-5">
					<Form
						onSubmit={handleSubmit}
						ref={c => {
							form = c;
						}}
					>
						<div className="c-form--item">
							<label htmlFor="name" className={`required ${locale}`}>
								<IntlMessage id="page.contact.name" />
							</label>
							<Input
								type="text"
								id="name"
								className="c-form--input"
								value={name || ''}
								onChange={(e) => setName(e.target.value)}
								validations={[required]}
								placeholder="例）鈴木　一郎"
							/>
						</div>
						<div className="c-form--item">
							<label htmlFor="furigana" className={`required ${locale}`}>
								<IntlMessage id="page.contact.furigana" />
							</label>
							<Input
								type="text"
								className="c-form--input"
								id="furigana"
								value={furigana || ''}
								onChange={(e) => setFurigana(e.target.value)}
								validations={[required]}
								placeholder="例）スズキ　イチロウ"
							/>
							<label className="pl-md-3 text-left">
								<IntlMessage id="page.contact.full_width" />
							</label>
						</div>
						<div className="c-form--item">
							<label htmlFor="phone">
								<IntlMessage id="page.contact.phone" />
							</label>
							<Input
								type="text"
								id="phone"
								className="c-form--input"
								value={phoneNumber || ''}
								onChange={(e) => setPhoneNumber(e.target.value)}
								validations={[is_phoneNumber]}
								placeholder="例）0123456789"
							/>
						</div>
						<div className="c-form--item">
							<label htmlFor="email" className={`required ${locale}`}>
								<IntlMessage id="page.contact.email" />
							</label>
							<Input
								type="text"
								className="c-form--input"
								id="email"
								value={email || ''}
								onChange={(e) => setEmail(e.target.value)}
								validations={[required, is_email]}
								placeholder="例）suzukiichiro@mail.ne.jp"
							/>
							<label className="pl-md-3 text-left">
								<IntlMessage id="page.contact.half_width" />
							</label>
						</div>

						<div className="c-form--item">
							<label htmlFor="title">
								<IntlMessage id="page.contact.subject" />
							</label>
							<select
								className="c-form--input"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							>
								{
									options.map((option, idx) =>
										<option value={option.value} key={idx}>{option.label}</option>
									)
								}
							</select>
						</div>

						<div className="c-form--item">
							<label htmlFor="content">
								<IntlMessage id="page.contact.detail" />
							</label>
							<Textarea
								className="c-form--input"
								id="content"
								value={content || ''}
								onChange={(e) => setContent(e.target.value)}
								validations={[required]}
							/>
						</div>

						<Button
							htmlType="submit"
							className="c-btn c-btn--memberInfo my-3"
							disabled={!enableBtn}
							loading={submit}>
							<span><IntlMessage id="page.contact.submit" /></span>
						</Button>

						<CheckButton
							style={{ display: "none" }}
							ref={c => {
								checkBtn = c;
							}}
						/>
					</Form>
				</div>
			</div>
		</section>
	)
}


const mapStateToProps = ({ theme }) => {
	const { locale } = theme;
	return { locale }
};

export default withRouter(connect(mapStateToProps)(Contact));
