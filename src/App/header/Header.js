import './header.css'
import React from 'react'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div className='container'>
                    <h1>Курс валют на {this.props.date} </h1>
                    <ul>
                        <li><a href='/'>Курс валют</a></li>
                        <li><a href='/calc'>Калькулятор валюты</a></li>
                    </ul>
                </div>
            </header>
        )
    }
}