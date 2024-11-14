import { CircularLoader, IconErrorFilled16, colors } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './List.module.css'

export const ErrorIcon = ({ numberOfErrors }) => {
    return (
        <span className={css.errorIcon}>
            <IconErrorFilled16 color={colors.red700} />
            <span>{numberOfErrors}</span>
        </span>
    )
}

ErrorIcon.propTypes = {
    numberOfErrors: PropTypes.number.isRequired,
}

export const LoadingIcon = () => <CircularLoader small />

export const StatusIcon = ({ count, loading }) => {
    if (loading) {
        return <LoadingIcon />
    }

    if (count === 0) {
        return <IconErrorFilled16 color={colors.red700} />
    }

    if (count > 0) {
        return <ErrorIcon numberOfErrors={count} />
    }
    return null
}

StatusIcon.propTypes = {
    count: PropTypes.number,
    loading: PropTypes.bool,
}
