import './App.css'
import React from 'react'

class Footer extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <footer>
                <div className='container'>
                    <div className='about'>
                        <h2>Курс валют</h2>
                        <p>Все права защищены</p>
                    </div>
                    <ul>
                        <li><a href='/'>Карта сайта</a></li>
                        <li><a href='/'>Google Sitemap</a></li>
                    </ul>
                    <ul>
                        <li><a href='/'>Контакты</a></li>
                        <li><a href='/'>Гарантии</a></li>
                        <li><a href='/'>О сервисе</a></li>
                        <li><a href='/'>Условия возврата</a></li>
                        <li><a href='/'>Соглашение о использовании сервиса</a></li>
                    </ul>
                </div>
            </footer>
        )
    }
}

export default Footer;
