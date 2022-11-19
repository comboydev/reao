import React from "react";
import { CheckOutlined  } from '@ant-design/icons';
import { Menu, Dropdown } from "antd";
import lang from "assets/data/language.data.json";
import { connect } from "react-redux";
import { onLocaleChange } from 'redux/actions/Theme'

export const ClientNavLanguage = ({ locale, onLocaleChange }) => {
	const languageOption = (
		<Menu>
			{
				lang.map((elm, i) => {return (
					<Menu.Item 
						key={elm.langName} 
						className={locale === elm.langId? 'ant-dropdown-menu-item-active': ''} 
						onClick={() => onLocaleChange(elm.langId)}
					>
						<span className="d-flex justify-content-between align-items-center">
							<div style={{ width: 120 }}>
								<img style={{maxWidth: '20px'}} src={`/img/flags/${elm.icon}.png`} alt={elm.langName}/>
								<span className="font-weight-normal ml-2 mr-3">{elm.langName}</span>
							</div>
							{locale === elm.langId? <CheckOutlined className="text-success" /> : null}
						</span>
					</Menu.Item>
				)})
			}
		</Menu>
	)
	return (
		<Dropdown overlay={languageOption}>
			<span className="ant-dropdown-link cursor-pointer">
				JP/EN
			</span>
		</Dropdown>
	)
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default connect(mapStateToProps, {onLocaleChange})(ClientNavLanguage);
