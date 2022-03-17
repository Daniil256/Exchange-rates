import '../index.css'
import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Rate from './main/Rate'
import Calc from './main/Calc'
import Test from './other/Test'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '3'
    }
  }
  updateData = (value) => {
    this.setState({ date: value })
  }
  rate = (value) => {
    this.setState({ rate: value })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header date={this.state.date} />
          <main>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Rate updateData={this.updateData} rate={this.rate} />} />
                <Route path='/calc' element={<Calc rate={this.state} />} />
                <Route path='/test' element={<Test />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;