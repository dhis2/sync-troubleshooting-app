import React, { useEffect, useState } from 'react'
import {
    DetailsView,
    ErrorOrLoading,
    EVENT,
    filterSearchElements,
    Layout,
    List,
    Notice,
    SORT,
    sortElements,
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
    const [updatedList, setUpdatedList] = useState(errorListTest)

    const selectedEvent = selectedTab === EVENT
    const loading = false //only using this variable with mock data

    useEffect(() => {
        const filteredList = errorListTest.filter(
            (error) => error.type === selectedTab
        )
        const sortedList = sortElements(filteredList, SORT[selectedSort].sorter)
        const list = filterSearchElements(sortedList, search)
        setUpdatedList(list)
    }, [selectedTab, selectedSort, search])

    useEffect(() => {
        setSelectedArtifact(null)
    }, [selectedTab])

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
                            artifacts={updatedList}
                        />
                    </div>
                </ErrorOrLoading>
                <DetailsView
                    selectedArtifact={selectedArtifact}
                    artifacts={updatedList}
                />
            </Layout>
        </div>
    )
}
