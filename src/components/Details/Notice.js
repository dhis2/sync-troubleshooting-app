import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Notice.module.css'

export const Notice = ({ title, children, status }) => {
    return (
        <div className={css.notice}>
            {status === 'loading' && <CircularLoader small />}
            <div className={css.contentWrapper}>
                {title && <header>{title}</header>}
                <div className={css.content}>{children}</div>
            </div>
        </div>
    )
}

Notice.propTypes = {
    children: PropTypes.node,
    status: PropTypes.oneOf(['loading', 'error']),
    title: PropTypes.string,
}
