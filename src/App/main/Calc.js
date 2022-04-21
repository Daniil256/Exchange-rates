import './main.css'
import React from 'react'

export default class Calc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyObject: {},
            result: 0,
            selectYesterday: 'AUD',
            selectToday: 'AUD',
            inputValue: 0,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                currencyObject: this.props.currencyObject,
            })
        }, 200)
    }

    takeSelectBefore = (e) => {
        this.setState({
            selectYesterday: e.target.value,
            result: (this.state.inputValue * (this.state.currencyObject[e.target.value].Value / this.state.currencyObject[e.target.value].Nominal) / (this.state.currencyObject[this.state.selectToday].Value / this.state.currencyObject[this.state.selectToday].Nominal)).toFixed(5)
        })
    }
    takeSelectAfter = (e) => {
        this.setState({
            selectToday: e.target.value,
            result: (this.state.inputValue * (this.state.currencyObject[this.state.selectYesterday].Value / this.state.currencyObject[this.state.selectYesterday].Nominal) / (this.state.currencyObject[e.target.value].Value / this.state.currencyObject[e.target.value].Nominal)).toFixed(5)
        })
    }
    takeInput = (e) => {
        this.setState({
            inputValue: e.target.value,
            result: (e.target.value * (this.state.currencyObject[this.state.selectYesterday].Value / this.state.currencyObject[this.state.selectYesterday].Nominal) / (this.state.currencyObject[this.state.selectToday].Value / this.state.currencyObject[this.state.selectToday].Nominal)).toFixed(5)
        })
    }

    render() {
        return (
            <div className='calc'>
                <h2>Калькулятор валюты</h2>
                <div className='input'>
                    <input onChange={this.takeInput} className='currency_input' type='number' name='currency_value' placeholder='введите сумму' />
                    <select name='currency_type' onChange={this.takeSelectBefore} >
                        {Object.keys(this.state.currencyObject).map((keyname) =>
                            <option value={keyname} key={keyname}>{this.state.currencyObject[keyname].Name} {keyname}</option>
                        )}
                    </select>
                </div>
                <div className='output'>
                    <span type='number' className='currency_input'>{this.state.result}</span>
                    <select name='currency_type2' onChange={this.takeSelectAfter} >
                        {Object.keys(this.state.currencyObject).map((keyname) =>
                            <option value={keyname} key={keyname}>{this.state.currencyObject[keyname].Name} {keyname}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }
}