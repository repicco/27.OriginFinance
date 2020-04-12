import React from 'react'

function Result(props) {

    return (
        <div>
            <div className='row'>
                <div className='col s6'>
                    <h4><b>Monthly <span className='desk'>amount</span></b></h4>
                </div>
                <div className='mob col s5 offset-s1'>
                    <span className="material-icons main_result">attach_money</span>
                    <span className='main_result main_number'><b>{props.result}</b></span>
                </div>
            </div>
            <div className='row'>
                <div className='col s12 text_result'>
                    <p>You're plannig <b>{props.countM} monthly deposits</b> to reach your <b>${props.total}</b> goal by <b>{props.mounth} {props.year}.</b></p>
                </div>
            </div>
        </div>
    )
}

export default Result