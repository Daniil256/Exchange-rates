import './App.css'
import React from 'react'

class Calc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 0
        }
    }
    static getDerivedStateFromProps(props, state) {
        return { rate: props.rate }
    }
    calcRate2 = (e) => {
        e.preventDefault()
        let currencyValue = e.target.elements['currency_value'].value
        let currencyType = e.target.elements['currency_type'].value
        this.setState({ result: (currencyValue / this.state.rate[currencyType]).toFixed(2) })
    }
    calcRate = (e) => {
        e.preventDefault()
        let currencyValue = e.target.elements['currency_value'].value
        let currencyType = e.target.elements['currency_type'].value
        let currencyType2 = e.target.elements['currency_type2'].value
        this.setState({ result: (currencyValue / this.state.rate[currencyType] * this.state.rate[currencyType2]).toFixed(2) })
    }

    render() {
        return (
            <div className='calc'>
                <p>Калькулятор обмена</p>
                <div className='block_buy_cell'>
                    <form onSubmit={this.calcRate}>
                        <input className='currency_input' type='number' name='currency_value' placeholder='введите сумму' />
                        <select name='currency_type' >
                            {Object.keys(this.props.rate).map((keyname) =>
                                <option value={keyname} key={keyname}>{keyname}</option>
                            )}
                        </select>
                        <button>Рассчитать</button><br />
                        <span className='currency_input'>{this.state.result}</span>
                        <select name='currency_type2' >
                            {Object.keys(this.props.rate).map((keyname) =>
                                <option value={keyname} key={keyname}>{keyname}</option>
                            )}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}

export default Calc;
