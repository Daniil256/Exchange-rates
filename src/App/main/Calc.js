import './main.css'
import React from 'react'

class Calc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 0,
            inputValue: 0,
            selectBefore: 'USD',
            selectAfter: 'USD',
        }
    }
    static getDerivedStateFromProps(props) {
        return { rate: props.rate }
    }

    calcRate = (e) => {
        e.preventDefault()
        this.setState({
            inputValue: e.target.value,
            result: (e.target.value / this.state.rate[this.state.selectBefore] * this.state.rate[this.state.selectAfter]).toFixed(2)
        })
    }
    changeBeforeSelect = (e) => {
        this.setState({
            selectBefore: e.target.value,
            result: (this.state.inputValue / this.state.rate[e.target.value] * this.state.rate[this.state.selectAfter]).toFixed(2)
        })
    }
    changeAfterSelect = (e) => {
        this.setState({
            selectAfter: e.target.value,
            result: (this.state.inputValue / this.state.rate[this.state.selectBefore] * this.state.rate[e.target.value]).toFixed(2)
        })
    }

    render() {
        return (
            <div className='calc'>
                <p>Калькулятор обмена</p>
                <div className='block_buy_cell'>
                    <input onKeyUp={this.calcRate} className='currency_input' type='number' name='currency_value' placeholder='введите сумму' />
                    <select name='currency_type' onChange={this.changeBeforeSelect} >
                        {Object.keys(this.props.rate).map((keyname) =>
                            <option value={keyname} key={keyname}>{keyname}</option>
                        )}
                    </select>
                    <span type='number' className='currency_input'>{this.state.result}</span>
                    <select name='currency_type2' onChange={this.changeAfterSelect} >
                        {Object.keys(this.props.rate).map((keyname) =>
                            <option value={keyname} key={keyname}>{keyname}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }
}

export default Calc;
