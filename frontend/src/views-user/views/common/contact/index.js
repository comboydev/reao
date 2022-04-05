import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import UserService from "services/user.service";
import { required, is_phoneNumber, is_email } from "services/validator";


const Contact = () => {

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


	useEffect(()=>{
		let user = UserService.getCurrentUser();
		if(user){
			setEmail(user.email);
			setName(user.personalInfo?.name);
			setPhoneNumber(user.personalInfo?.phoneNumber);
			setFurigana(user.personalInfo?.furigana);
		}
		setTitle('オーナー権の購入、売却について');
	}, [])

	useEffect(()=>{
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
		UserService.submitContact(contactObject)
		.then(()=>{
			setSubmit(false);
			history.push("/contact-us/complete");
		})
		.catch(err => {
			setSubmit(false);
			message.error("エラーか発生しました。");
		})
	}
	
	return (
	<section className="p-card c-contact--form">
		<div className="c-header mb-4">
			<h3 className="c-header--title">お問い合わせ</h3>
			<p className="c-header--subtitle">Contact us</p>
		</div>
		<div className="c-card">
			<p className="text-center">
				お問い合わせいただいた内容につきましては、折り返しご連絡させていただきます。<br/>
				※ご連絡までに２～３営業日ほどお時間をいただいております。
			</p>
			<div className="c-memberInfo__form mt-5">
				<Form
					onSubmit={handleSubmit}
					ref={c => {
						form = c;
					}}
				>
				<div className="c-form--item">
					<label htmlFor="name" className="required">お名前</label>
					<Input
						type="text"
						id="name"
						className="c-form--input"
						value={name || ''}
						onChange={(e)=>setName(e.target.value)}
						validations={[required]}
						placeholder = "例）鈴木　一郎"
					/>
				</div>
				<div className="c-form--item">
					<label htmlFor="furigana" className="required">フリガナ</label>
					<Input
						type="text"
						className="c-form--input"
						id="furigana"
						value={furigana || ''}
						onChange={(e)=>setFurigana(e.target.value)}
						validations={[required]}
						placeholder="例）スズキ　イチロウ"
					/>
					<label className="pl-md-3 text-left">※全角カタカナ</label>
				</div>
				<div className="c-form--item">
					<label htmlFor="phone">電話番号</label>
					<Input
						type="text"
						id="phone"
						className="c-form--input"
						value={phoneNumber || ''}
						onChange={(e)=>setPhoneNumber(e.target.value)}
						validations={[is_phoneNumber]}
						placeholder = "例）0123456789"
					/>
				</div>
				<div className="c-form--item">
					<label htmlFor="email" className="required">メールアドレス</label>
					<Input
						type="text"
						className="c-form--input"
						id="email"
						value={email || ''}
						onChange={(e)=>setEmail(e.target.value)}
						validations={[required, is_email]}
						placeholder="例）suzukiichiro@mail.ne.jp"
					/>
					<label className="pl-md-3 text-left">※半角英数字</label>
				</div>

				<div className="c-form--item">
					<label htmlFor="title">お問い合わせ内容</label>
					<select
						className="c-form--input"
						id="title"
						value={title}
						onChange={(e)=>setTitle(e.target.value)}
					>
						<option>オーナー権の購入、売却について</option>
						<option>コインの出品、買取について</option>
						<option>メディア掲載について</option>
						<option>その他のお問い合わせ</option>
					</select>
				</div>

				<div className="c-form--item">
					<label htmlFor="content">お問い合わせメッセージ</label>
					<Textarea
						className="c-form--input"
						id="content"
						value={content || ''}
						onChange={(e)=>setContent(e.target.value)}
						validations={[required]}
					/>
				</div>

				<Button 
					htmlType="submit" 
					className="c-btn c-btn--memberInfo my-3"
					disabled = {!enableBtn}
					loading={submit}>
					<span>送信する</span>
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


export default Contact;