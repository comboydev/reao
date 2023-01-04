import NumberFormat from 'react-number-format';

const TNumberFormat = (props) => {
    return (
         <NumberFormat
            displayType={'text'}
            thousandSeparator={true}
            {...props} />
    )
}

export default TNumberFormat;