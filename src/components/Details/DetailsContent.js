import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
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

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            <>
                {artifact.errors.map((error, index) => (
                    <div key={error.jobId}>
                        <>
                            {index === 0 ? (
                                <CompletedTime
                                    finishedTime={error.finished}
                                    issuesCount={0}
                                    latest={true}
                                />
                            ) : (
                                <CompletedTime
                                    finishedTime={error.finished}
                                    issuesCount={0}
                                />
                            )}
                        </>
                        <div className={css.detailsContent}>
                            <Notice status="error" title={error.user}>
                                <>
                                    <span className={css.detailsItem}>
                                        {error.message}
                                    </span>
                                    <div className={css.detailsWrapper}>
                                        <DetailsItem
                                            value={error.id}
                                            label={i18n.t('Error ID:')}
                                        />
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
                                            <DetailsItem
                                                value={error.tei}
                                                label={i18n.t('TEI:')}
                                            />
                                        )}
                                        {error?.dataElement && (
                                            <DetailsItem
                                                value={error.dataElement}
                                                label={i18n.t('Data Element:')}
                                            />
                                        )}
                                        {error?.tea && (
                                            <DetailsItem
                                                value={error.tea}
                                                label={i18n.t('TEA:')}
                                            />
                                        )}
                                    </div>
                                </>
                            </Notice>
                        </div>
                    </div>
                ))}
            </>
        </div>
    )
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
