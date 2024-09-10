import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { LastRunTime } from './LastRunTime'
import css from './List.module.css'

export const List = ({ setSelectedCheck, selectedCheck, checks }) => {
    return (
        <div>
            {checks?.map((check) => (
                <ListItem
                    key={check.id}
                    setSelectedCheck={setSelectedCheck}
                    check={check}
                    selected={check.id === selectedCheck?.id}
                />
            ))}
        </div>
    )
}

List.propTypes = {
    setSelectedCheck: PropTypes.func.isRequired,
    checks: PropTypes.array,
    selectedCheck: PropTypes.object,
}

export const ListItem = memo(function ListItem({
    setSelectedCheck,
    check,
    selected,
}) {
    return (
        <div
            className={cx(css.listItem, { [css.selected]: selected })}
            onClick={() => setSelectedCheck(check)}
        >
            <div className={css.checkInfo}>
                <header>{check.message}</header>
                <div className={css.subtitle}>
                    <span>{check.type}</span>
                    <VerticalDivider />
                    <span className={css.subtitleSection}>{check.code}</span>
                    {check.finished ? (
                        <>
                            <VerticalDivider />
                            <LastRunTime value={check.finished} />
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
})

ListItem.propTypes = {
    check: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    setSelectedCheck: PropTypes.func.isRequired,
}

const VerticalDivider = () => <span>|</span>
