import './App.css'
import React from 'react'

class Header extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <header>
                <div className='container'>
                    <h1>Приложение курса валют</h1>
                    <ul>
                        <li><a href='/'>Главная</a></li>
                        <li><a href='/map'>Пункты обмена</a></li>
                        <li><a href='/contacts'>Контакты</a></li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;
