import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { selectedLocale } from '../../utils'
import { StatusIcon } from '../List/StatusIcon'
import css from './Details.module.css'
import { Notice } from './Notice'

const CompletedTime = ({ issuesCount, finishedTime }) => {
    const { fromServerDate } = useTimeZoneConversion()

    const latestRun = fromServerDate(finishedTime)
    const formattedLatestRun = Intl.DateTimeFormat([selectedLocale], {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(latestRun)

    return (
        <header title={latestRun.getClientZonedISOString()}>
            {i18n.t('Latest error {{time}}', {
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
}

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            <CompletedTime finishedTime={artifact.finished} issuesCount={0} />
            <div className={css.detailsContent}>
                <Notice status="error" title={artifact.user}>
                    <>
                        <span className={css.detailsItem}>
                            {artifact.message}
                        </span>
                        <div className={css.detailsWrapper}>
                            <DetailsItem
                                value={artifact.id}
                                label={i18n.t('Error ID:')}
                            />
                            <DetailsItem
                                value={artifact.jobId}
                                label={i18n.t('Import Job ID:')}
                            />

                            {artifact?.orgUnit && (
                                <DetailsItem
                                    value={artifact.orgUnit}
                                    label={i18n.t('Org Unit:')}
                                />
                            )}
                            {artifact?.program && (
                                <DetailsItem
                                    value={artifact.program}
                                    label={i18n.t('Program:')}
                                />
                            )}
                            {artifact?.enrollment && (
                                <DetailsItem
                                    value={artifact.enrollment}
                                    label={i18n.t('Enrollment:')}
                                />
                            )}
                            {artifact?.programStage && (
                                <DetailsItem
                                    value={artifact.programStage}
                                    label={i18n.t('Program Stage:')}
                                />
                            )}
                            {artifact?.event && (
                                <DetailsItem
                                    value={artifact.event}
                                    label={i18n.t('Event:')}
                                />
                            )}
                            {artifact?.tei && (
                                <DetailsItem
                                    value={artifact.tei}
                                    label={i18n.t('TEI:')}
                                />
                            )}
                            {artifact?.dataElement && (
                                <DetailsItem
                                    value={artifact.dataElement}
                                    label={i18n.t('Data Element:')}
                                />
                            )}
                            {artifact?.tea && (
                                <DetailsItem
                                    value={artifact.tea}
                                    label={i18n.t('TEA:')}
                                />
                            )}
                        </div>
                    </>
                </Notice>
            </div>
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
