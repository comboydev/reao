import { useState } from "react";
import { Link, useLocation, useHistory, withRouter } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button } from 'antd';
import { is_password, required, is_email } from "plugins/validator";
import { connect } from "react-redux";
import IntlMessage from "components/util-components/IntlMessage";
import userAuth from "api/user/auth";

const Register = ({ locale }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    
	const _location = useLocation();
	const _history = useHistory();
  
    const [_submit, setSubmit] = useState(false);
    const [_error, setError] = useState("");
    const [_success, setSuccess] = useState("");
    var _form, _checkBtn;

	
    const handleRegister = (e) => {
      e.preventDefault();

		setError("");
		setSuccess("");
		setSubmit(false);

		_form.validateAll();
		if (_checkBtn.context._errors.length > 0)
			return;
		if (password !== password_confirm) {
			setError("パスワードの確認が一致しません。");
			return;
		}

		if (!document.getElementById('agree').checked) {
			setError("「利用規約」に同意は必須です");
			return;
		}

		setSubmit(true);

		let query = new URLSearchParams(_location.search);
		let introducer = query.get("introducer");

		userAuth.register(email, password, introducer)
		.then(response => {
			if(response.data.status_code === 200){
				setSubmit(false);
				_history.push("/register/complete");
			}
		})
		.catch(error => {
			console.log(error);
			const resMessage =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();

			setSubmit(false);
			setError(resMessage);
		});
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
						すでに登録されている方は<br/>こちらから<Link to="/login">ログイン</Link>してください
					</h2>
					:
					<h2 className="c-signup--header--sub">
						Already registered?<br/>Please <Link to="/login">login</Link> here.
					</h2>
				}
				{
					_error && 
					<div className="form-group">
						<p className="alert alert-danger alert-bg alert-center">
						{_error}
						</p>
					</div>
				}
				{
					_success &&
					<div className="form-group">
						<p className="alert alert-success alert-bg alert-center">
						{_success}
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
								<IntlMessage id="page.auth.rule.password.t1" description="利用できる文字は半角英数字です。" /> <br/>
								<IntlMessage id="page.auth.rule.password.t2" description="英大文字・英小文字・数字それぞれを最低1文字ずつ含む" /> <br/>
								<IntlMessage id="page.auth.rule.password.t3" description="8文字以上で入力ください。" />
							</article>

							<p className="c-form--itemlabel">
								<IntlMessage id="page.auth.password_confirm" defaultMessage="パスワード確認" />		
							</p>
							<Input
								type="password"
								className="c-form--input"
								name="password_confirm"
								value={password_confirm}
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
								className="c-btn c-btn-regist"
								block 
								loading={_submit}>
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
					{/* <div className="c-signup--box__sns">
						<p className="c-form--label">
						SNSでユーザー登録
						</p>
						<Button type="primary"
						className="c-btn c-btn-social c-btn-social--facebook"
						>
						Facebookで登録
						</Button>
						<Button type="primary"
						className="c-btn c-btn-social c-btn-social--twitter">
						Twitterで登録
						</Button>
						<Button type="primary"                                                      
						className="c-btn c-btn-social c-btn-social--line">                                          
						LINEで登録
						</Button>                                                                                             
					</div>*/}
				</div>
			</div>
		</section>
    );
}


const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default withRouter(connect(mapStateToProps)(Register));
