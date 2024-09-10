import propTypes from 'prop-types'
import React from 'react'
import css from './CheckDetails.module.css'
import { CheckInfo } from './CheckInfo'
//import { CheckRunContent } from './CheckRunContent.js'

export const CheckDetails = ({ check }) => {
    return (
        <div className={css.wrapper}>
            <CheckInfo check={check} />

            {/*<div className={css.detailsRunWrapper}>
                <CheckRunContent check={check}/>
            </div>*/}
        </div>
    )
}

CheckDetails.propTypes = {
    check: propTypes.shape({
        description: propTypes.string,
        finishedTime: propTypes.string,
        startTime: propTypes.string,
    }),
}
