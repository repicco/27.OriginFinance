import React, { Component } from 'react'
import Result from '../result/result'

class Form extends Component {
    constructor(){
        super()
        this.state={
            total: '',
            totalF: '',
            
            mounth: [ 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
            year: [ '2020', '2021', '2022', '2023', '2024', '2025' ],           
            countM: 0,
            countY: 0,

            calcM: '',

            calcTotal: '0',
        }
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
        this.calcParc = this.calcParc.bind(this)
    }


    add(){
        let state = this.state
        if(state.countM < 11) {
            if (state.countM == 8 && state.countY < 5){
                state.countY ++
            }
            state.countM ++
        } else {
            state.countM = 0
        }
        this.calcParc()
        
        this.setState(state)
    }

    remove(){
        let state = this.state
        if(state.countM > 0) {
            if (state.countM == 8 && state.countY > 0){
                state.countY --
            }
            state.countM --
        } else if (state.countY > 0) {
            state.countM = 11
        }
        this.calcParc()

        this.setState(state)
    }

    calcParc() {
        let state = this.state

        state.calcM = (state.countY * 12) + (state.countM) + 1

        state.calcTotal = state.total / state.calcM

        state.calcTotal = parseFloat(state.calcTotal.toFixed(2))
        state.calcTotal = state.calcTotal.toLocaleString('en-US')
        
        state.totalF = state.total
        state.totalF = parseFloat(state.totalF)
        state.totalF = state.totalF.toLocaleString('en-US')

        this.setState(state)
    }

    render(){
        return(
            <div>     
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12 l5">
                            <div className='row'>
                                <h5>Total amount</h5>
                            </div>
                            <div className='row'>
                                <div id='amount' className='col s12'>
                                    <span className="material-icons icon_amount">attach_money</span>
                                    <input id="amount_form" className='validate' type='number' value={this.state.total} onChange={(evento) => this.setState({total: evento.target.value})} placeholder='25000.00'></input>
                                </div>
                            </div>
                        </div>
                        <div className='col s12 l5 offset-l1 '>
                            <div className='row'>
                                <h5>Reach goal by</h5>
                            </div>
                            <div className='row'>
                                <div className='col s1'>
                                    <button onClick={this.remove}  className='arrow_mounth center-align'>
                                    <span className="material-icons arrow_mounth">chevron_left</span>
                                    </button>
                                </div>
                                <div className='col s8 offset-s1 center-align'>
                                    <div id='mounth' className='row'>
                                        <h5><b>{this.state.mounth[this.state.countM]}</b></h5>
                                    </div>
                                    <div className='row'>
                                        <h6>{this.state.year[this.state.countY]}</h6>
                                    </div>
                                </div>
                                <div className='col s1'>
                                    <button onClick={this.add}  className='arrow_mounth center-align'>
                                    <span className="material-icons arrow_mounth">chevron_right</span>
                                    </button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>         
            <Result result={this.state.calcTotal} countM={this.state.calcM} total={this.state.totalF} mounth={this.state.mounth[this.state.countM]} year={this.state.year[this.state.countY]}/>
            <div className='row center-align'>
                    <button onClick={this.calcParc} id='btn_confirm' className='col s12 btn btn-large'><b>Confirm</b></button>
            </div>
        </div>
        )
    }
}

export default Form