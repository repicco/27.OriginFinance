import React, { Component } from 'react'
import Header from './components/header/header'
import Form, { add, remove } from './components/form/form'

class Main extends Component {
    render(){
        return(
            <div>
                <Header/>
                <Form/>
            </div>
        )
    }
}

export default Main