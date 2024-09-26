import React, { useState } from 'react'
import {
    ErrorOrLoading,
    EVENT,
    Layout,
    List,
    Notice,
    SORT,
    Toolbar,
    ToolbarTabs,
} from '../../../components'
import { errorListTest } from './jobErrorTest'
import css from './List.module.css'

export const ErrorList = () => {
    const [search, setSearch] = useState('')
    const [selectedTab, setSelectedTab] = useState(EVENT)
    const [selectedSort, setSelectedSort] = useState(SORT['latest'].value)
    const [selectedArtifact, setSelectedArtifact] = useState(null)

    const selectedEvent = selectedTab === EVENT
    const loading = false

    return (
        <div className={css.listWrapper}>
            <ToolbarTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <Toolbar
                search={search}
                setSearch={setSearch}
                sort={selectedSort}
                setSort={setSelectedSort}
                selectedEvent={selectedEvent}
            />
            <Layout>
                <ErrorOrLoading loading={loading}>
                    <div>
                        <Notice />
                        <List
                            setSelectedArtifact={setSelectedArtifact}
                            selectedArtifact={selectedArtifact}
                            artifacts={errorListTest}
                        />
                    </div>
                </ErrorOrLoading>
            </Layout>
        </div>
    )
}
