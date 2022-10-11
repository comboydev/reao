import { Menu, Button, Badge } from 'antd';
import { 
	InboxOutlined, 
	FileTextOutlined, 
	MailOutlined, 
	StarOutlined, 
	DeleteOutlined, 
	EditOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MailMenu = (props) => {
	const { match, location } = props
	return (
		<div className="w-100">
			<div className="p-3">
				<Link to={`${match.url}/compose`}>
					<Button type="primary" block>
						<EditOutlined />
						<span>新規作成</span>
					</Button>
				</Link>
			</div>
			<Menu
				defaultSelectedKeys={`${match.url}/inbox`}
				mode="inline"
				selectedKeys={[location.pathname]}
			>
				<Menu.Item key={`${match.url}/inbox`}>
					<InboxOutlined />
					<span>Inbox</span>
					<Link to={`${match.url}/inbox`}/>
				</Menu.Item>
				<Menu.Item  key={`${match.url}/starred`}>
					<StarOutlined />
					<span>Starred</span>
					<Link to={`${match.url}/starred`}/>
				</Menu.Item>
				<Menu.Item  key={`${match.url}/deleted`}>
					<DeleteOutlined />
					<span>Deleted</span>
					<Link to={`${match.url}/deleted`}/>
				</Menu.Item>
				<Menu.ItemGroup title="Labels">
					<Menu.Item key={`${match.url}/new`}>
						<Badge color="red" />
						<span>New</span>
						<Link to={`${match.url}/new`}/>
					</Menu.Item>
					<Menu.Item key={`${match.url}/replied`}>
						<Badge color="cyan" />
						<span>Replied</span>
						<Link to={`${match.url}/replied`}/>
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu>
		</div>
	)
}

export default MailMenu
