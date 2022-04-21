import '../index.css'
import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Rate from './main/Rate'
import Calc from './main/Calc'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencySearch: '',
      currencyAll: {},
      months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
      date: '',
    }
  }
  componentDidMount() {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(data => data.json())
      .then(data => {
        this.setState({ currencyAll: data })
        console.log(data)
        this.date = new Date(this.state.currencyAll.Date)
        this.setState({ date: this.date.getDate() + ' ' + this.state.months[this.date.getMonth()] + ' ' + this.date.getFullYear() + 'г' })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header date={this.state.date} />
          <main>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Rate objectFully={this.state.currencyAll.Valute} />} />
                <Route path='/calc' element={<Calc currencyObject={this.state.currencyAll.Valute} />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}