import NumberFormat from 'react-number-format';

const YenFormat = (props) => {
    const { value, ...extra } = props;
    return (
         <NumberFormat
            displayType={'text'}
            value={value > 10000 ? (value / 10000) : value}
            suffix={value > 10000 ? "万円" : "円"}
            thousandSeparator={true} 
            {...extra} />
    )
}

export default YenFormat;