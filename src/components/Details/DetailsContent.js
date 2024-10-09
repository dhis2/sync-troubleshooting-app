import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { IconChevronDown24, IconChevronUp24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { selectedLocale } from '../../utils'
import { StatusIcon } from '../List/StatusIcon'
import css from './Details.module.css'
import { Notice } from './Notice'

const CompletedTime = ({ issuesCount, finishedTime, latest }) => {
    const { fromServerDate } = useTimeZoneConversion()

    const latestRun = fromServerDate(finishedTime)
    const formattedLatestRun = Intl.DateTimeFormat([selectedLocale], {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(latestRun)

    return (
        <header title={latestRun.getClientZonedISOString()}>
            {latest
                ? i18n.t('Latest error {{time}}', {
                      time: formattedLatestRun,
                      interpolation: { escapeValue: false },
                  })
                : i18n.t('Error {{time}}', {
                      time: formattedLatestRun,
                      interpolation: { escapeValue: false },
                  })}
            <StatusIcon count={issuesCount} />
        </header>
    )
}

CompletedTime.propTypes = {
    finishedTime: PropTypes.string,
    issuesCount: PropTypes.number,
    latest: PropTypes.bool,
}

const DetailsSummary = ({ error }) => (
    <div className={css.detailsContent}>
        <Notice status="error" title={error.user}>
            <>
                <span className={css.detailsItem}>{error.message}</span>
                <div className={css.detailsWrapper}>
                    <DetailsItem value={error.id} label={i18n.t('Error ID:')} />
                    <DetailsItem
                        value={error.jobId}
                        label={i18n.t('Import Job ID:')}
                    />

                    {error?.orgUnit && (
                        <DetailsItem
                            value={error.orgUnit}
                            label={i18n.t('Org Unit:')}
                        />
                    )}
                    {error?.program && (
                        <DetailsItem
                            value={error.program}
                            label={i18n.t('Program:')}
                        />
                    )}
                    {error?.enrollment && (
                        <DetailsItem
                            value={error.enrollment}
                            label={i18n.t('Enrollment:')}
                        />
                    )}
                    {error?.programStage && (
                        <DetailsItem
                            value={error.programStage}
                            label={i18n.t('Program Stage:')}
                        />
                    )}
                    {error?.event && (
                        <DetailsItem
                            value={error.event}
                            label={i18n.t('Event:')}
                        />
                    )}
                    {error?.tei && (
                        <DetailsItem value={error.tei} label={i18n.t('TEI:')} />
                    )}
                    {error?.dataElement && (
                        <DetailsItem
                            value={error.dataElement}
                            label={i18n.t('Data Element:')}
                        />
                    )}
                    {error?.tea && (
                        <DetailsItem value={error.tea} label={i18n.t('TEA:')} />
                    )}
                </div>
            </>
        </Notice>
    </div>
)

DetailsSummary.propTypes = {
    error: PropTypes.shape({
        user: PropTypes.string,
        message: PropTypes.string,
        id: PropTypes.string,
        jobId: PropTypes.string,
        orgUnit: PropTypes.string,
        program: PropTypes.string,
        programStage: PropTypes.string,
        enrollment: PropTypes.string,
        event: PropTypes.string,
        tei: PropTypes.string,
        dataElement: PropTypes.string,
        tea: PropTypes.string,
    }),
}

const Details = ({ item, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div>
            <div
                className={css.detailsExpandableWrapper}
                onClick={toggleExpand}
            >
                <div className={css.completedTimeWrapper}>
                    {index === 0 ? (
                        <CompletedTime
                            finishedTime={item.finished}
                            issuesCount={0}
                            latest={true}
                        />
                    ) : (
                        <CompletedTime
                            finishedTime={item.finished}
                            issuesCount={0}
                        />
                    )}
                    {isExpanded ? <IconChevronUp24 /> : <IconChevronDown24 />}
                </div>
            </div>
            {isExpanded && <DetailsSummary error={item} />}
        </div>
    )
}

Details.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number.isRequired,
}

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            <>
                {artifact.errors.map((error, index) => (
                    <Details key={index} item={error} index={index} />
                ))}
            </>
        </div>
    )
}

DetailsContent.propTypes = {
    artifact: PropTypes.object.isRequired,
}

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
