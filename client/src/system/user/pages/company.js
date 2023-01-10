import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ContactSection from "system/user/components/ContactSection";

const CompanyJP = () => {
	return(
	<>
		<section className="p-card c-company">
			<div className="c-header">
				<h3 className="c-header--title">会社概要</h3>
				<p className="c-header--subtitle">Company</p>
			</div>
			<div className="c-card max-w750">
				<ul>
					<li>
						<dt>会社名</dt>
						<dd>株式会社ArtHolic</dd>
					</li>
					<li>
						<dt>所在地</dt>
						<dd>
							<p>〒 810-0021</p>
							<p>福岡県福岡市中央区今泉1-16-12-3F</p>
						</dd>
					</li>
					<li>
						<dt>設立</dt>
						<dd>2017年7月29日</dd>
					</li>
					<li>
						<dt>事業内容</dt>
						<dd>
							<div>共同購入、保有のプラットフォームサービス事業</div>
							<div>アンティークコインの卸、販売事業</div>
						</dd>
					</li>
				</ul>
			</div>
		</section>
		<ContactSection/>
	</>
	)
}

const CompanyEN = () => {
	return(
	<>
		<section className="p-card c-company">
			<div className="c-header">
				<h3 className="c-header--title">COMPANY</h3>
				<p className="c-header--subtitle">会社概要</p>
			</div>
			<div className="c-card max-w750">
				<ul>
					<li>
						<dt>Company Name</dt>
						<dd>ArtHolic Inc.</dd>
					</li>
					<li>
						<dt>Address</dt>
						<dd>
							<p>Postal code 810-0021</p>
							<p>1-16-12-3F Imaizumi, Chuo-ku, Fukuoka City, <br /> Fukuoka Prefecture</p>
						</dd>
					</li>
					<li>
						<dt>Established</dt>
						<dd>July 29, 2017</dd>
					</li>
					<li>
						<dt>Our Business</dt>
						<dd>
							<div>Joint purchase and holding platform service business</div>
							<div>Wholesale and distribution of antique coins</div>
						</dd>
					</li>
				</ul>
			</div>
		</section>
		<ContactSection/>
	</>
	)
}

const Company = ({locale}) => {
	if (locale === 'ja') return <CompanyJP />;
	else return <CompanyEN />;
}

const mapStateToProps = ({ theme }) => {
	const { locale } =  theme;
	return { locale }
};

export default withRouter(connect(mapStateToProps)(Company));
