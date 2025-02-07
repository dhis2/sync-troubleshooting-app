import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Notice.module.css'

export const NoticeDetails = ({ title, loading, children }) => {
    return (
        <div className={css.notice}>
            {loading && <CircularLoader small />}
            <div className={css.contentWrapper}>
                {title && <span className={css.header}>{title}</span>}
                <div className={css.content}>{children}</div>
            </div>
        </div>
    )
}

NoticeDetails.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    loading: PropTypes.bool,
}
