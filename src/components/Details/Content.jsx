import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Details.module.css'
import { NoticeDetails } from './NoticeDetails'

export const contentItems = [
    {
        value: 'id',
        label: 'Error ID',
    },
    {
        value: 'jobId',
        label: 'Import Job ID',
    },
    {
        value: 'orgUnit',
        label: 'Org. Unit',
    },
    {
        value: 'program',
        label: 'Program',
    },
    {
        value: 'enrollment',
        label: 'Enrollment',
    },
    {
        value: 'programStage',
        label: 'Program Stage',
    },
    {
        value: 'event',
        label: 'Event',
    },
    {
        value: 'tei',
        label: 'Tracked Entity Instance',
    },
    {
        value: 'dataElement',
        label: 'Data Element',
    },
    {
        value: 'tea',
        label: 'Tracked Entity Attribute',
    },
    {
        value: 'userId',
        label: 'User ID',
    },
    {
        value: 'userGroups',
        label: 'User groups',
    },
    {
        value: 'userRoles',
        label: 'User roles',
    },
]

const DetailsItem = ({ label, value }) => (
    <div>
        <span className={css.detailsItemLabel}>
            {i18n.t('{{label}}:', { label, nsSeparator: '-:-' })}
        </span>
        <span className={css.detailsItemValue}>{value}</span>
    </div>
)

DetailsItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
}

export const Content = ({ artifact, error }) => (
    <div className={css.detailsContent}>
        <NoticeDetails title={error.user}>
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
        </NoticeDetails>
    </div>
)

Content.propTypes = {
    artifact: PropTypes.shape({
        message: PropTypes.string,
    }),
    error: PropTypes.shape({
        code: PropTypes.string.isRequired,
        finished: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        dataElement: PropTypes.string,
        enrollment: PropTypes.string,
        event: PropTypes.string,
        jobId: PropTypes.string.isRequired,
        orgUnit: PropTypes.string,
        program: PropTypes.string,
        programStage: PropTypes.string,
        tea: PropTypes.string,
        tei: PropTypes.string,
        type: PropTypes.string,
    }),
}
