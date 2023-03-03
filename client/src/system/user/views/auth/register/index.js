import { useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button } from 'antd';
import { is_password, required, is_email } from "plugins/validator";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";
import {
	signUp,
	showLoading,
	hideAuthMessage,
	showAuthMessage,
	signUpWithGoogle,
	signUpWithFacebook,
	signUpWithTwitter,
	signUpWithApple,
} from "redux/actions";

const Register = (props) => {
	const {
		locale,
		signUp,
		loading,
		showLoading,
		showAuthMessage,
		hideAuthMessage,
		message,
		signUpWithGoogle,
		signUpWithFacebook,
		signUpWithTwitter,
		signUpWithApple,
	} = props

	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirm] = useState("");
	var _form, _checkBtn;

	const handleRegister = (e) => {
		e.preventDefault();
		hideAuthMessage();

		_form.validateAll();
		if (_checkBtn.context._errors.length > 0)
			return;
		if (password !== passwordConfirmation) {
			showAuthMessage("パスワードの確認が一致しません。");
			return;
		}

		if (!document.getElementById('agree').checked) {
			showAuthMessage("「利用規約」に同意は必須です");
			return;
		}

		const query = new URLSearchParams(location.search);
		const introducer = query.get("introducer");

		showLoading();
		signUp({ email, password, introducer });
	}

	return (
		<section className="p-card">
			{
				locale === 'ja' ?
					<div className="c-header">
						<h3 className="c-header--title">会員登録</h3>
						<p className="c-header--subtitle">Register</p>
					</div>
					:
					<div className="c-header">
						<h3 className="c-header--title">REGISTER</h3>
						<p className="c-header--subtitle">会員登録</p>
					</div>
			}
			<div className="c-card max-w500 mt-5 c-signup">
				{
					locale === 'ja' ?
						<h2 className="c-signup--header--sub">
							すでに登録されている方は<br />こちらから<Link to="/login">ログイン</Link>してください
						</h2>
						:
						<h2 className="c-signup--header--sub">
							Already registered?<br />Please <Link to="/login">login</Link> here.
						</h2>
				}
				{
					message &&
					<div className="form-group">
						<p className="alert alert-danger alert-bg alert-center">
							{message}
						</p>
					</div>
				}
				<div className="c-signup--box">
					<div className="c-signup--box__email">
						<Form
							onSubmit={handleRegister}
							ref={c => {
								_form = c;
							}}
						>
							<div>
								<p className="c-form--itemlabel">
									<IntlMessage id="page.auth.email" defaultMessage="メールアドレス" />
								</p>
								<Input
									type="text"
									className="c-form--input"
									name="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									validations={[required, is_email]}
								/>
								<p className="c-form--itemlabel">
									<IntlMessage id="page.auth.password" defaultMessage="パスワード" />
								</p>
								<Input
									type="password"
									className="c-form--input"
									name="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									validations={[required, is_password]}
								/>
								<article>
									<IntlMessage id="page.auth.rule.password.t1" description="利用できる文字は半角英数字です。" /> <br />
									<IntlMessage id="page.auth.rule.password.t2" description="英大文字・英小文字・数字それぞれを最低1文字ずつ含む" /> <br />
									<IntlMessage id="page.auth.rule.password.t3" description="8文字以上で入力ください。" />
								</article>

								<p className="c-form--itemlabel">
									<IntlMessage id="page.auth.passwordConfirmation" defaultMessage="パスワード確認" />
								</p>
								<Input
									type="password"
									className="c-form--input"
									name="passwordConfirmation"
									value={passwordConfirmation}
									onChange={e => setPasswordConfirm(e.target.value)}
									validations={[required, is_password]}
								/>

								<p className="c-form--checklabel">
									<input type="checkbox" id="agree" />
									{
										locale === 'ja' ?
											<label htmlFor="agree"><Link to="/terms" target="_blank">利用規約</Link>に同意する</label>
											:
											<label htmlFor="agree">I accept the <Link to="/terms" target="_blank">Terms</Link> of Use</label>
									}
								</p>

								<Button
									htmlType="submit"
									className="c-btn c-btn-regist d-flex align-items-center justify-content-center"
									block
									loading={loading}>
									<span>
										<IntlMessage id="page.auth.btn.register" defaultMessage="新規登録" />
									</span>
								</Button>

							</div>
							<CheckButton
								style={{ display: "none" }}
								ref={c => {
									_checkBtn = c;
								}}
							/>
						</Form>
					</div>
					<div className="c-signup--box__sns">
						<p className="c-form--label">
							SNSでユーザー登録
						</p>
						<Button type="primary"
							className="c-btn c-btn-social c-btn-social--facebook"
							onClick={signUpWithGoogle}
						>
							Googleで登録
						</Button>
						<Button type="primary"
							className="c-btn c-btn-social c-btn-social--facebook"
							onClick={signUpWithFacebook}
						>
							Facebookで登録
						</Button>
						<Button type="primary"
							className="c-btn c-btn-social c-btn-social--twitter"
							onClick={signUpWithTwitter}
						>
							Twitterで登録
						</Button>
						<Button type="primary"
							className="c-btn c-btn-social c-btn-social--line"
							onClick={signUpWithApple}
						>
							LINEで登録
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}


const mapStateToProps = ({ theme, auth }) => {
	const { locale } = theme;
	const { loading, message, token, redirect } = auth;
	return { locale, loading, message, token, redirect }
};

const mapDispatchToProps = {
	signUp,
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	signUpWithGoogle,
	signUpWithFacebook,
	signUpWithTwitter,
	signUpWithApple,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
