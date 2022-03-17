import './header.css'
import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className='container'>
                    <h1>Курс валют на {this.props.date} </h1>
                    <ul>
                        <li><a href='/'>Главная</a></li>
                        <li><a href='/calc'>Калькулятор валюты</a></li>
                        <li><a href='/test'>Контакты</a></li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;
