import React, { Component } from "react";
import AuthService from "../../../services/auth.service";

export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeFurigana = this.onChangeFurigana.bind(this);
		this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeContent = this.onChangeContent.bind(this);

		this.submitContact = this.submitContact.bind(this);
		this.state = {};
	}
	componentDidMount() {
		this.setState({
			username: "",
			furigana: "",
			phoneNumber: "",
			email: "",
			title: "",
			content: "",
		});
	}
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onChangeFurigana(e) {
		this.setState({
			furigana: e.target.value,
		});
	}
	onChangePhoneNumber(e) {
		this.setState({
			phoneNumber: e.target.value,
		});
	}
	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}
	onChangeTitle(e) {
		this.setState({
			title: e.target.value,
		});
	}
	onChangeContent(e) {
		this.setState({
			content: e.target.value,
		});
	}
	submitContact() {
		const contactObject = {
			username: this.state.username,
			furigana: this.state.furigana,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			title: this.state.title,
			content: this.state.content
		};
		AuthService.submitContact(contactObject)
			.then(response => {console.log('reponse', response)
				this.setState({
					message: null,
					successful: true
				});
				window.location.href = '/complete'
			},
				error => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						successful: false,
						message: "エラーがあります。"
					});
				}
			);
		this.setState({
			successful: true,
			message: "送信中です。"
		});
	}
	render() {
		return (
			<>
				<section className="p-memberContact">
					<div className="c-memberContactHeader">
						お問い合わせ
					</div>
					{!this.state.successful && (
						<div>
							<div className="c-memberContact">
								<p>お問い合わせいただいた内容につきましては、折り返しご連絡させていただきます。
									※ご連絡までに当日～1営業日ほどお時間をいただいております。</p>
								<form action="">
									<div>
										<label htmlFor="">お名前</label>
										<input type="text" name="" id="" value={this.state.username} onChange={this.onChangeUsername} />
									</div>
									<div>
										<label htmlFor="">フリガナ</label>
										<input type="text" name="" id="" value={this.state.furigana} onChange={this.onChangeFurigana} />
									</div>
									<div>
										<label htmlFor="">電話番号</label>
										<input type="text" name="" id="" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} />
									</div>
									<div>
										<label htmlFor="">メールアドレス</label>
										<input type="text" name="" id="" value={this.state.email} onChange={this.onChangeEmail} />
									</div>
									<div>
										<label htmlFor="">お問い合わせ内容</label>
										<input type="text" name="" id="" value={this.state.title} onChange={this.onChangeTitle} />
									</div>
									<div className="c-memberContact__field">
										<label htmlFor="">お問い合わせメッセージ</label>
										<textarea type="text" name="" id="" rows="5" value={this.state.content} onChange={this.onChangeContent}></textarea>
									</div>
								</form>
							</div>

							<div className="c-memberContactBtn">
								<button onClick={this.submitContact} style={{ width: "100%", height: "100%", textAlign: "center" }}>
									送信する
								</button>
							</div>
						</div>
					)}
					{this.state.message && (
						<div className="form-group">
							<div
								className={
									this.state.successful
										? "alert alert-success"
										: "alert alert-danger"
								}
								role="alert"
							>
								{this.state.message}
							</div>
						</div>
					)}
				</section>
			</>
		)
	}
}