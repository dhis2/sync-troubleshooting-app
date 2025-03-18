import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { EVENT } from '../../shared'
import { LastRunTime } from './LastRunTime'
import css from './List.module.css'
import { StatusIcon } from './StatusIcon'

export const List = ({ setSelectedArtifact, selectedArtifact, artifacts }) => {
    return (
        <div>
            {artifacts?.map((artifact) => (
                <ListItem
                    key={artifact.id}
                    setSelectedArtifact={setSelectedArtifact}
                    artifact={artifact}
                    selected={artifact.id === selectedArtifact?.id}
                />
            ))}
        </div>
    )
}

List.propTypes = {
    setSelectedArtifact: PropTypes.func.isRequired,
    artifacts: PropTypes.array,
    selectedArtifact: PropTypes.object,
}

export const ListItem = memo(function ListItem({
    setSelectedArtifact,
    artifact,
    selected,
}) {
    const getType = (value) =>
        value === EVENT ? i18n.t('Event') : i18n.t('Tracker')

    return (
        <div
            className={cx(css.listItem, { [css.selected]: selected })}
            onClick={() => setSelectedArtifact(artifact)}
        >
            <div className={css.artifactInfo}>
                <span className={cx(css.header, css.ellipsisMultiline)}>
                    {artifact.message}
                </span>
                <div className={css.subtitle}>
                    <span>{getType(artifact.type)}</span>
                    <VerticalDivider />
                    <span className={css.subtitleSection}>{artifact.code}</span>
                    <VerticalDivider />
                    <LastRunTime value={artifact.finished} />
                </div>
            </div>
            <span className={css.statusIcon}>
                <StatusIcon
                    count={artifact.errors.length}
                    loading={artifact.loading}
                />
            </span>
        </div>
    )
})

ListItem.propTypes = {
    artifact: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    setSelectedArtifact: PropTypes.func.isRequired,
}

const VerticalDivider = () => <span>|</span>
