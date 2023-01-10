import CoinForm from '../form';

const EditCoin = (props) =>
	<CoinForm mode="edit" param={props.match.params} />

export default EditCoin
