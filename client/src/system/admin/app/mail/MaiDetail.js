import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLabelColor } from './MailLabels';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { Tooltip, message, Tag } from 'antd';
import {
	LeftCircleOutlined,
	StarOutlined,
	DeleteOutlined,
	StarFilled,
	UndoOutlined,
	RollbackOutlined
} from '@ant-design/icons';
import moment from "moment";
import api from 'api';


const MaiDetail = (props) => {
	const { category, id } = props.match.params;
	const history = useHistory();

	const [mail, setMail] = useState('');
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
		api.adminMail.getOne(id)
			.then(res => {
				setLoaded(true);
				setMail(res.data);
			})
			.catch(err => {
				setLoaded(true);
				message.error("失敗しました。", () => {
					history.push(`/admin/mail/${category}`);
				});
			})
	}, [category, id, history])


	const back = () => {
		props.history.goBack()
	}

	const handleReply = () => {
		history.push({
			pathname: `/admin/mail/compose`,
			state: { mail: mail }
		});
	}

	const handleTick = () => {
		api.adminMail.setStared(id, !mail.starred)
			.then(res => {
				const newData = { ...res.data, avatar: mail.avatar };
				setMail(newData);
			})
			.catch(err => {
				message.error("失敗しました。")
			})
	}

	const handleDelete = () => {
		api.adminMail.setDeleted(id, true)
			.then(res => {
				const newData = { ...res.data, avatar: mail.avatar };
				setMail(newData);
			})
			.catch(err => {
				message.error("失敗しました。")
			})
	}

	const handleRestore = () => {
		api.adminMail.setDeleted(id, false)
			.then(res => {
				const newData = { ...res.data, avatar: mail.avatar };
				setMail(newData);
			})
			.catch(err => {
				message.error("失敗しました。")
			})
	}

	const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
		first.toLocaleUpperCase(locale) + rest.join('')    //convert the first letter of string to uppercase


	if (!(loaded && mail)) return null;
	return (
		<div className="mail-detail">
			<div className="d-lg-flex align-items-center justify-content-between">
				<div className="d-flex align-items-center mb-3">
					<div className="font-size-md mr-3" onClick={back}>
						<LeftCircleOutlined className="mail-detail-action-icon font-size-md ml-0" />
					</div>
					<AvatarStatus src={mail.avatar} name={mail.name} subTitle={`${mail.email}`} />
				</div>
				<div className="mail-detail-action mb-3">
					<Tag color={getLabelColor(mail.label)} className="mr-4">{capitalizeFirstLetter(mail.label)}</Tag>
					<span className="mr-2 text-muted">
						{moment(mail.createdAt).format("YYYY/MM/DD HH:mm")}
					</span>
					{
						!mail.deleted ?
							<>
								<Tooltip title="Reply" onClick={handleReply}>
									<RollbackOutlined className="anticon mail-detail-action-icon" />
								</Tooltip>
								<Tooltip title="Star" onClick={handleTick}>
									{
										mail.starred ?
											<StarFilled className="mail-detail-action-icon star checked" />
											: <StarOutlined className="mail-detail-action-icon star" />
									}
								</Tooltip>
								<Tooltip title="Delete" onClick={handleDelete}>
									<DeleteOutlined className="mail-detail-action-icon" />
								</Tooltip>
							</>
							: <>
								{
									mail.starred ?
										<StarFilled className="mail-detail-action-icon star checked" />
										: <StarOutlined className="mail-detail-action-icon star" />
								}
								<Tooltip title="Restore" onClick={handleRestore}>
									<UndoOutlined className="mail-detail-action-icon" />
								</Tooltip>
							</>
					}
				</div>
			</div>
			<div className="mail-detail-content">
				<h4 className="mt-4 mb-4">「{mail.title}」</h4>
				<div dangerouslySetInnerHTML={{ __html: mail.content }} className="pre-wrap" />
			</div>
		</div>
	)
}

export default MaiDetail
