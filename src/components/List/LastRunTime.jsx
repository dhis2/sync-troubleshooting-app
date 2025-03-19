import { useTimeZoneConversion } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React from 'react'
import { getRelativeTime } from '../../utils'

export const LastRunTime = ({ className, value }) => {
    const { fromServerDate } = useTimeZoneConversion()
    const serverDate = fromServerDate(value)

    if (!value) {
        return null
    }

    return (
        <span
            className={className}
            title={serverDate.getServerZonedISOString()}
        >
            {getRelativeTime(serverDate)}
        </span>
    )
}

LastRunTime.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
}
