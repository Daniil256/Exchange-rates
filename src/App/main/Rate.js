import './main.css'
import React from 'react'

class Rate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyRate: {},
            currency: ['USD', 'RUB', 'CAD', 'EUR', 'UAH', 'KZT'],
            currencySearch: '',
            currencyAll: {},
            showAll: false,
            showAllBtn: 'Показать все позиции',
            months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            current: 'USD'
        }
        this.result = {}
        this.date = ''
    }
    componentDidMount() {
        this.getRate()
    }

    getRate = () => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({ currencyAll: data })
                for (let i = 0; i < this.state.currency.length; i++) {
                    this.result[this.state.currency[i]] = this.state.currencyAll.rates[this.state.currency[i]]
                }
                this.setState({ currencyRate: this.result })
                this.date = new Date(this.state.currencyAll.date)
                this.props.updateData(this.date.getDate() + ' ' + this.state.months[this.date.getMonth()] + ' ' + this.date.getFullYear() + 'г')
                this.props.rate(this.state.currencyRate)
            })
    }

    showAllItems = () => {
        if (!this.state.showAll) {
            this.setState({
                currencyRate: this.state.currencyAll.rates,
                showAll: true,
                showAllBtn: 'Показать основные позиции'
            })
        } else {
            this.setState({
                currencyRate: this.result,
                showAll: false,
                showAllBtn: 'Показать все позиции'
            })
        }
    }
    search = (e) => {
        if (e.target.value.length > 2) {
            if (this.state.currency.includes(e.target.value)) {
                this.result = {}
                this.result[e.target.value] = this.state.currencyAll.rates[e.target.value]
                this.setState({ currencyRate: this.result })
            } else { this.setState({ currencyRate: '' }) }
        } else {
            for (let i = 0; i < this.state.currency.length; i++) {
                this.result[this.state.currency[i]] = this.state.currencyAll.rates[this.state.currency[i]]
            }
            this.setState({ currencyRate: this.result })
        }
    }
    current = (e) => {
        this.setState({ current: e.target.value })
    }

    render() {
        return (
            <div className='rate'>
                <div className='rate_options'>
                    <span >Основная валюта</span>
                    <select name='currency_type2' onChange={this.current} >
                        {Object.keys(this.state.currencyRate).map((keyname) =>
                            <option value={keyname} key={keyname}>{keyname}</option>
                        )}
                    </select>
                    <button className='showbtn' onClick={this.showAllItems}>{this.state.showAllBtn}</button>
                    <input type='text' className='input_search' placeholder='Поиск' onKeyUp={this.search} />
                </div>
                <div className='row'>
                    {Object.keys(this.state.currencyRate).map((keyname) =>
                        <div className='block' key={keyname} title='Кликните чтобы увеличить'>
                            <div className='currency_name'>{keyname}</div>
                            <div className='currency_before'>{(this.state.currencyRate[keyname] / this.state.currencyAll.rates[this.state.current]).toFixed(2)}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Rate;
