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

const ExpandableContent = ({ isLatestRun, artifact, children }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={css.detailsExpandableWrapper}>
            <div
                className={css.completedTimeWrapper}
                onClick={toggleExpand}
                role="button"
            >
                <CompletedTime
                    finishedTime={artifact.finished}
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
    artifact: PropTypes.shape({
        finished: PropTypes.string,
        message: PropTypes.string,
    }),
    children: PropTypes.node,
}

export const DetailsContent = ({ artifact }) => {
    return (
        <div className={css.detailsContentWrapper}>
            {artifact.errors.map((error, index) => (
                <ExpandableContent
                    key={index}
                    isLatestRun={index === 0}
                    artifact={artifact}
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
