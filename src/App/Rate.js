import './App.css'
import React from 'react'
import Calc from './Calc'

class Rate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: 'date',
            currencyRate: {}
        }
        this.currency = ['USD', 'RUB', 'CAD', 'EUR', 'UAH', 'KZT']
    }
    componentDidMount() {
        this.getRate()
    }
    getRate() {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=44c2dcfb58089d9bc5fc608e27e8f47c')
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({ date: data.date })
                let result = {}
                for (let i = 0; i < this.currency.length; i++) {
                    result[this.currency[i]] = data.rates[this.currency[i]] / data.rates.USD
                }
                this.setState({ currencyRate: result })
            })
    }
    render() {
        return (
            <div className='rate'>
                <p>Курсы валют на {this.state.date}. Основная валюта</p>
                <select name='currency_type2' >
                    {Object.keys(this.currency).map((keyname) =>
                        <option value={this.currency[keyname]} key={this.currency[keyname]}>{this.currency[keyname]}</option>
                    )}
                </select>
                <div className='row'>
                    {Object.keys(this.state.currencyRate).map((keyname) =>
                        <div className='block' key={keyname} title='Кликните чтобы увеличить'>
                            <div className='currency_name'>{keyname}</div>
                            <div className='currency_before'>{(this.state.currencyRate[keyname]).toFixed(2)}</div>
                        </div>
                    )}
                </div>
                <Calc rate={this.state.currencyRate} />
            </div>
        )
    }
}

export default Rate;
