import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { selectedLocale } from '../../utils'
import { StatusIcon } from '../List'
import { Content } from './Content'
import css from './Details.module.css'

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
                            <CompletedTime
                                finishedTime={artifact.finished}
                                issuesCount={0}
                            />
                        </>
                        <Content artifact={artifact} error={error} />
                    </div>
                ))}
            </>
        </div>
    )
}

DetailsContent.propTypes = {
    artifact: PropTypes.object,
}
