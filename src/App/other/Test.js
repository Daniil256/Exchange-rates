import React from 'react'
import './other.css'

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true,
            text: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }
    event = () => {
        this.setState(inState => ({
            text: !inState.text
        }))
    }

    render() {
        return (<div>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'Включено' : 'Выключено'}
            </button>
            <input onKeyPress={this.event} defaultValue={this.state.text ? 'Событие' : ''} />
        </div >
        )
    }
}
export default Test