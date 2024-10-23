import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Details.module.css'
import { Notice } from './Notice'

export const contentItems = [
    {
        value: 'id',
        label: i18n.t('Error ID:'),
    },
    {
        value: 'jobId',
        label: i18n.t('Import Job ID:'),
    },
    {
        value: 'orgUnit',
        label: i18n.t('Org Unit:'),
    },
    {
        value: 'program',
        label: i18n.t('Program:'),
    },
    {
        value: 'enrollment',
        label: i18n.t('Enrollment:'),
    },
    {
        value: 'programStage',
        label: i18n.t('Program Stage:'),
    },
    {
        value: 'event',
        label: i18n.t('Event:'),
    },
    {
        value: 'tei',
        label: i18n.t('TEI:'),
    },
    {
        value: 'dataElement',
        label: i18n.t('Data Element:'),
    },
    {
        value: 'tea',
        label: i18n.t('TEA:'),
    },
]

const DetailsItem = ({ label, value }) => (
    <div className={css.detailsItemWrapper}>
        <span className={css.detailsItemLabel}>{label}</span>
        <span className={css.detailsItemValue}>{value}</span>
    </div>
)

DetailsItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
}

export const Content = ({ artifact, error }) => (
    <div className={css.detailsContent}>
        <Notice status="error" title={error.user}>
            <>
                <span className={css.detailsItem}>{artifact.message}</span>
                <div className={css.detailsWrapper}>
                    {contentItems.map(
                        (item) =>
                            error?.[item.value] && (
                                <DetailsItem
                                    key={item.value}
                                    value={error[item.value]}
                                    label={item.label}
                                />
                            )
                    )}
                </div>
            </>
        </Notice>
    </div>
)

Content.propTypes = {
    artifact: PropTypes.object,
    error: PropTypes.object,
}
