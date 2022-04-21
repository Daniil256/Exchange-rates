import './main.css'
import React from 'react'

export default class Rate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyRate: [],
            currency: ['USD', 'CAD', 'EUR', 'UAH', 'KZT'],
            currencyAll: {},
            showAll: false,
            showAllBtn: 'Показать все позиции',
            current: 'AUD',
            marker: {},
        }
        this.result = []
        this.x = this.state.current
        this.arraySearch = []
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                currencyAll: this.props.objectFully,
                currencyFullName: this.props.currencyFullName
            })
            for (let i = 0; i < Object.keys(this.state.currencyAll).length; i++) {
                this.result.push(Object.keys(this.state.currencyAll)[i])
            }
            this.setState({ currencyRate: this.state.currency })
            this.marker()
        }, 800)
    }

    marker = () => {
        const markerYesterday = {}

        const markerToday = {}

        const markerObject = {}

        Object.keys(this.state.currencyAll).map((keyname) =>
            markerYesterday[this.state.currencyAll[keyname].CharCode] = ((this.state.currencyAll[this.x].Previous / this.state.currencyAll[this.state.current].Nominal) / (this.state.currencyAll[keyname].Previous / this.state.currencyAll[keyname].Nominal)).toFixed(2))
        Object.keys(this.state.currencyAll).map((keyname) =>
            markerToday[this.state.currencyAll[keyname].CharCode] = ((this.state.currencyAll[this.x].Value / this.state.currencyAll[this.state.current].Nominal) / (this.state.currencyAll[keyname].Value / this.state.currencyAll[keyname].Nominal)).toFixed(2))

        for (let i = 0; i < Object.keys(this.state.currencyAll).length; i++) {
            if (markerYesterday[Object.keys(this.state.currencyAll)[i]] > markerToday[Object.keys(this.state.currencyAll)[i]]) {
                markerObject[Object.keys(this.state.currencyAll)[i]] = '1.png'
            }
            else if (markerYesterday[Object.keys(this.state.currencyAll)[i]] < markerToday[Object.keys(this.state.currencyAll)[i]]) {
                markerObject[Object.keys(this.state.currencyAll)[i]] = '2.png'
            }
            else if (markerYesterday[Object.keys(this.state.currencyAll)[i]] === markerToday[Object.keys(this.state.currencyAll)[i]]) {
                markerObject[Object.keys(this.state.currencyAll)[i]] = '3.png'
            }
        }
        this.setState({ marker: markerObject })

    }
    showAllItems = () => {
        if (!this.state.showAll) {
            this.setState({
                currencyRate: this.result,
                showAll: true,
                showAllBtn: 'Показать основные позиции'
            })
        } else {
            this.setState({
                currencyRate: this.state.currency,
                showAll: false,
                showAllBtn: 'Показать все позиции'
            })
        }
    }
    search = (e) => {
        this.arraySearch = []

        for (let i = 0; i < Object.keys(this.state.currencyAll).length; i++) {
            if (Object.keys(this.state.currencyAll)[i].match(e.target.value)) {
                this.arraySearch.push(Object.keys(this.state.currencyAll)[i].match(e.target.value).input)
            }
        }

        this.setState({ currencyRate: this.arraySearch })

        if (e.target.value === '' && this.state.showAll === false) {
            this.setState({ currencyRate: this.state.currency })
        }
    }

    current = (e) => {

        this.x = e.target.value
        this.setState({ current: e.target.value })

        this.marker()
    }

    render() {
        return (
            <div className='rate'>
                <div className='rate_options'>
                    <span >Основная валюта</span>
                    <select name='currency_type2' onChange={this.current} >
                        {Object.keys(this.state.currencyAll).map((keyname) =>
                            <option value={keyname} key={keyname}>{this.state.currencyAll[keyname].Name} {keyname}</option>
                        )}
                    </select>
                    <button className='showbtn' onClick={this.showAllItems}>{this.state.showAllBtn}</button>
                    <input type='text' className='input_search' placeholder='Поиск' onChange={this.search} />
                </div>
                <div className='row'>

                    <div className='block'  >
                        <div className='currency_full_name'></div>
                        <div className='currency_previous'>Вчера</div>
                        <div className='currency_value'>Сегодня</div>
                        <div className='currency_marker'></div>
                    </div>
                    {(this.state.currencyRate).map((keyname) =>
                        <div className='block' key={keyname}  >
                            <div className='currency_full_name'>{this.state.currencyAll[keyname].Name} {this.state.currencyAll[keyname].CharCode}</div>
                            <div className='currency_previous'>1 {this.state.current} = {((this.state.currencyAll[this.state.current].Previous / this.state.currencyAll[this.state.current].Nominal) / (this.state.currencyAll[keyname].Previous / this.state.currencyAll[keyname].Nominal)).toFixed(2)} {keyname}</div>
                            <div className='currency_value'>1 {this.state.current} = {((this.state.currencyAll[this.state.current].Value / this.state.currencyAll[this.state.current].Nominal) / (this.state.currencyAll[keyname].Value / this.state.currencyAll[keyname].Nominal)).toFixed(2)} {keyname}</div>
                            <div className='currency_marker'><img src={this.state.marker[keyname]} width='20' alt='no' /></div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}