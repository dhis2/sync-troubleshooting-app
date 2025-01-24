import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from '../App.module.css'
import { useIsAuthorized } from './useIsAuthorized'

export const AuthWall = ({ children }) => {
    const { hasAuthority } = useIsAuthorized()

    if (!hasAuthority) {
        return (
            <div className={classes.wallContainer}>
                <NoticeBox error title={i18n.t('Access denied')}>
                    {i18n.t(
                        "You don't have access to the Synchronization Troubleshooting App. Contact a system administrator to request access."
                    )}
                </NoticeBox>
            </div>
        )
    }

    return children
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}
