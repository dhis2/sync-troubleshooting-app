import i18n from '@dhis2/d2-i18n'
import { Tab, TabBar } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Toolbar.module.css'

export const EVENT = 'event'
export const TRACKER = 'tracked_entity'

export const ToolbarTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <TabBar className={css.toolbarTabs}>
            <Tab
                selected={selectedTab === EVENT}
                onClick={() => setSelectedTab(EVENT)}
            >
                {i18n.t('Event')}
            </Tab>
            <Tab
                selected={selectedTab === TRACKER}
                onClick={() => setSelectedTab(TRACKER)}
            >
                {i18n.t('Tracker')}
            </Tab>
        </TabBar>
    )
}

ToolbarTabs.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
}
