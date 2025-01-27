import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { IconChevronDown24, IconChevronUp24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { selectedLocale } from '../../utils'
import { StatusIcon } from '../List'
import { Content } from './Content'
import css from './Details.module.css'

const CompletedTime = ({ finishedTime, latest }) => {
    const { fromServerDate } = useTimeZoneConversion()
    const latestRun = fromServerDate(finishedTime)

    const formattedDate = Intl.DateTimeFormat([selectedLocale], {
        dateStyle: 'short',
        timeStyle: 'medium',
        hour12: false,
    }).format(latestRun)

    const milliseconds = String(latestRun.getMilliseconds()).padStart(3, '0')
    const formattedLatestRun = `${formattedDate}.${milliseconds}`

    return (
        <span
            className={css.header}
            title={latestRun.getClientZonedISOString()}
        >
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
        </span>
    )
}

CompletedTime.propTypes = {
    finishedTime: PropTypes.string,
    latest: PropTypes.bool,
}

const ExpandableContent = ({ isLatestRun, finishedTime, children }) => {
    const [isExpanded, setIsExpanded] = useState(isLatestRun)

    const toggleExpand = useCallback(() => {
        setIsExpanded((prevExpanded) => !prevExpanded)
    }, [])

    return (
        <div className={css.detailsExpandableWrapper}>
            <div
                className={css.completedTimeWrapper}
                onClick={toggleExpand}
                role="button"
            >
                <CompletedTime
                    finishedTime={finishedTime}
                    latest={isLatestRun}
                />
                {isExpanded ? <IconChevronUp24 /> : <IconChevronDown24 />}
            </div>
            {isExpanded && children}
        </div>
    )
}

ExpandableContent.propTypes = {
    isLatestRun: PropTypes.bool,
    finishedTime: PropTypes.string,
    children: PropTypes.node,
}

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            {artifact.errors.map((error, index) => (
                <ExpandableContent
                    key={index}
                    isLatestRun={index === 0}
                    finishedTime={error.finished}
                >
                    <Content artifact={artifact} error={error} />
                </ExpandableContent>
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
