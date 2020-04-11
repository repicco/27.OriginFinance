import React from 'react'
import Result from '../result/result'

function Form() {
    function calcMounth() {
        const mounth = [ 'January', 'February', 'March', 'April', 'May' ]
        const year = [ '2020', '2021', '2022', '2023', '2024', '2025' ]
        const mounthYear = [ mounth, year] 
        console.log(mounthYear)
    }

    return (
        <div>     
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12 l5">
                            <div className='row'>
                                <h5>Total amount</h5>
                            </div>
                            <div className='row'>
                                <div id='amount' className='col s12'>
                                    <span className="material-icons icon_amount">attach_money</span>
                                    <input id="amount_form" className='validate' type='number'></input>
                                </div>
                            </div>
                        </div>
                        <div className='col s12 l5 offset-l1 '>
                            <div className='row'>
                                <h5>Reach goal by</h5>
                            </div>
                            <div className='row'>
                                <div className='col s1'>
                                    <button className='arrow_mounth center-align'>
                                    <span class="material-icons arrow_mounth">chevron_left</span>
                                    </button>
                                </div>
                                <div className='col s8 offset-s1 center-align'>
                                    <div id='mounth' className='row'>
                                        <h5><b>October</b></h5>
                                    </div>
                                    <div className='row'>
                                        <h6>2020</h6>
                                    </div>
                                </div>
                                <div classname='col s1'>
                                    <button className='arrow_mounth center-align'>
                                    <span class="material-icons arrow_mounth">chevron_right</span>
                                    </button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </form>
            </div>         
            <Result/>
            <div className='row center-align'>
                    <button id='btn_confirm' onClick={calcMounth()} className='col s12 btn btn-large'><b>Confirm</b></button>
            </div>
        </div>
    )
}

export default Form