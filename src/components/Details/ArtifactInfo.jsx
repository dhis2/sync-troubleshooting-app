import i18n from '@dhis2/d2-i18n'
import { Tag, Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { EVENT } from '../../shared'
import css from './Details.module.css'

export const ArtifactInfo = ({ artifact }) => {
    return (
        <div className={css.artifactInfo}>
            <ArtifactHeader name={artifact.message} />
            <Divider dense />
            <div className={css.keyInfoWrapper}>
                <ArtifactKeyInfo name={i18n.t('Status')}>
                    <Tag negative>{artifact.status}</Tag>
                </ArtifactKeyInfo>
                <ArtifactKeyInfo name={i18n.t('Code')}>
                    <Tag neutral>{artifact.code}</Tag>
                </ArtifactKeyInfo>
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

const ArtifactHeader = ({ name }) => {
    return (
        <span className={css.header}>
            <h2>{name}</h2>
        </span>
    )
}

ArtifactHeader.propTypes = {
    name: PropTypes.string,
}

const ArtifactKeyInfo = ({ name, children }) => {
    return (
        <div className={css.keyInfo}>
            <h3>{name}</h3>
            {children}
        </div>
    )
}

ArtifactKeyInfo.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
}

const ArtifactInfoType = ({ value }) => {
    const type = value === EVENT ? i18n.t('Event') : i18n.t('Enrollment')
    return (
        <ArtifactKeyInfo name={i18n.t('Type')}>
            <span>{type}</span>
        </ArtifactKeyInfo>
    )
}

ArtifactInfoType.propTypes = {
    value: PropTypes.string,
}
