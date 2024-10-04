import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
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

const EVENT = 'EVENT' || 'event'

export const ListItem = memo(function ListItem({
    setSelectedArtifact,
    artifact,
    selected,
}) {
    const getType = (value) =>
        value === EVENT ? i18n.t('Event') : i18n.t('Tracked Entity')

    return (
        <div
            className={cx(css.listItem, { [css.selected]: selected })}
            onClick={() => setSelectedArtifact(artifact)}
        >
            <div className={css.artifactInfo}>
                <header>{artifact.message}</header>
                <div className={css.subtitle}>
                    <span>{getType(artifact.type)}</span>
                    <VerticalDivider />
                    <span className={css.subtitleSection}>{artifact.code}</span>
                    {artifact.finished ? (
                        <>
                            <VerticalDivider />
                            <LastRunTime value={artifact.finished} />
                        </>
                    ) : null}
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
