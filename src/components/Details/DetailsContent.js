import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { IconChevronDown24, IconChevronUp24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { selectedLocale } from '../../utils'
import { StatusIcon } from '../List'
import { Content } from './Content'
import css from './Details.module.css'

const CompletedTime = ({ finishedTime, latest }) => {
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
            <StatusIcon count={0} />
        </header>
    )
}

CompletedTime.propTypes = {
    finishedTime: PropTypes.string,
    latest: PropTypes.bool,
}

const ExpandableContent = ({ latest, artifact, item }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={css.detailsExpandableWrapper} onClick={toggleExpand}>
            <div className={css.completedTimeWrapper}>
                {latest ? (
                    <CompletedTime
                        finishedTime={artifact.finished}
                        latest={true}
                    />
                ) : (
                    <CompletedTime finishedTime={artifact.finished} />
                )}
                {isExpanded ? <IconChevronUp24 /> : <IconChevronDown24 />}
            </div>
            {isExpanded && <Content artifact={artifact} error={item} />}
        </div>
    )
}

ExpandableContent.propTypes = {
    latest: PropTypes.bool,
    artifact: PropTypes.shape({
        finished: PropTypes.string,
        message: PropTypes.string,
    }),
    item: PropTypes.object,
}

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            {artifact.errors.map((error, index) => (
                <ExpandableContent
                    key={index}
                    latest={index === 0}
                    artifact={artifact}
                    item={error}
                />
            ))}
        </div>
    )
}

DetailsContent.propTypes = {
    artifact: PropTypes.shape({
        message: PropTypes.string,
        id: PropTypes.string,
        type: PropTypes.string,
        code: PropTypes.string,
        status: PropTypes.string,
        errors: PropTypes.array,
    }),
}
