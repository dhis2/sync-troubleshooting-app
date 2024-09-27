import i18n from '@dhis2/d2-i18n'
import { Tag, Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Details.module.css'

export const ArtifactInfo = ({ artifact }) => {
    return (
        <div className={css.artifactInfo}>
            <ArtifactHeader name={artifact.message}></ArtifactHeader>
            <Divider dense />

            <div className={css.keyInfoWrapper}>
                <ArtifactInfoStatus value={artifact.status} />
                <div className={css.keyInfo}>
                    <h3>{i18n.t('Code')}</h3>
                    <Tag neutral>{artifact.code}</Tag>
                </div>
                <ArtifactInfoType value={artifact.type} />
            </div>
        </div>
    )
}

ArtifactInfo.propTypes = {
    artifact: PropTypes.shape({
        message: PropTypes.string,
        status: PropTypes.string,
        code: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
}

const ArtifactHeader = ({ name, children }) => {
    return (
        <header>
            <h2>{name}</h2>
            {children}
        </header>
    )
}

ArtifactHeader.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
}

const ArtifactInfoStatus = ({ value }) => {
    const isError = value === 'Error'

    return (
        <div className={css.keyInfo}>
            <h3>{i18n.t('Status')}</h3>
            {isError ? <Tag negative>{value}</Tag> : <Tag>{value}</Tag>}
        </div>
    )
}

ArtifactInfo.propTypes = {
    value: PropTypes.string,
}

const EVENT = 'EVENT' || 'event'

const ArtifactInfoType = ({ value }) => {
    const getType = () =>
        value === EVENT ? i18n.t('Event') : i18n.t('Enrollment')

    return (
        <div className={css.keyInfo}>
            <h3>{i18n.t('Type')}</h3>
            <span>{getType()}</span>
        </div>
    )
}

ArtifactInfoType.propTypes = {
    value: PropTypes.string,
}
