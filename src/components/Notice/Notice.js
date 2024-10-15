import i18n from '@dhis2/d2-i18n'
import React from 'react'
import css from './Notice.module.css'

export const Notice = () => {
    return (
        <div className={css.box}>
            <small>{i18n.t('Errors observed in the past 24 hours.')}</small>
        </div>
    )
}
