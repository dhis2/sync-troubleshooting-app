import React, { useEffect, useState, useMemo } from 'react'
import {
    DetailsView,
    ErrorOrLoading,
    EVENT,
    filterByType,
    Layout,
    List,
    Notice,
    SORT,
    sortElements,
    Toolbar,
    ToolbarTabs,
} from '../../../components'
import { errorToDisplayMock } from './jobErrorTest'
import css from './List.module.css'
import { useJobErrors } from './use-job-errors'

export const ErrorList = () => {
    const { error, jobErrors, loading, elements } = useJobErrors()
    const [search, setSearch] = useState('')
    const [selectedTab, setSelectedTab] = useState(EVENT)
    const [selectedSort, setSelectedSort] = useState(SORT['latest'].value)
    const [selectedArtifact, setSelectedArtifact] = useState(null)

    const sorter = useMemo(() => SORT[selectedSort].sorter, [selectedSort])
    const [sortedElements, setSortedElements] = useState(null)

    // check filter tab and sorter with real data
    // check if its only because using memo??

    useEffect(() => {
        console.log('TYPE TAB', {
            error,
            jobErrors,
            selectedTab,
            sortedElements,
            errorToDisplayMock,
            elements,
        })
    }, [selectedTab])

    useEffect(() => {
        const sorted = sortElements(
            //filterByType(errorToDisplayMock, selectedTab.toUpperCase()),
            filterByType(elements, selectedTab.toUpperCase()),
            sorter
        )
        setSortedElements(sorted)
    }, [elements, selectedTab, sorter])

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
            />
            <Layout>
                <ErrorOrLoading loading={loading}>
                    <div>
                        <Notice />
                        <List
                            setSelectedArtifact={setSelectedArtifact}
                            selectedArtifact={selectedArtifact}
                            artifacts={sortedElements}
                        />
                    </div>
                </ErrorOrLoading>
                <DetailsView selectedArtifact={selectedArtifact} />
            </Layout>
        </div>
    )
}
