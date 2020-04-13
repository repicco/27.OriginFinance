import React from 'react'

function Result(props) {

    return (
        <div>
            <div className='row'>
                <div className='col s4 l5'>
                    <h4 className='monthly_result'><b>Monthly <span className='desk'>amount</span></b></h4>
                </div>
                <div className='mob col s6 offset-s1 l6 offset-l1 right-align'>
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