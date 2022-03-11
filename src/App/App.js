import './App.css'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Rate from './Rate'
import About from './About'
import Contacts from './Contacts'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

class App extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  cookie() {

  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Rate />} />
                <Route path='/map' element={<About />} />
                <Route path='/contacts' element={<Contacts />} />
              </Routes>
              <div className='cookie'>
                <span>На нашем сайте используется cookie. Нажимте ок, чтобы согласиться с правилами</span>
                <button onClick={this.cookie}>OK</button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
