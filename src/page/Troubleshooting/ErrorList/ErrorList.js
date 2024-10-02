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
import { errorListTest } from './jobErrorTest'
import css from './List.module.css'
import { useJobErrors } from './use-job-errors'

export const ErrorList = () => {
    const { error, jobErrors, loading } = useJobErrors()
    const [search, setSearch] = useState('')
    const [selectedTab, setSelectedTab] = useState(EVENT)
    const [selectedSort, setSelectedSort] = useState(SORT['latest'].value)
    const [selectedArtifact, setSelectedArtifact] = useState(null)

    const sorter = useMemo(() => SORT[selectedSort].sorter, [selectedSort])

    const sortedElements = useMemo(
        () =>
            sortElements(
                filterByType(errorListTest, selectedTab.toUpperCase()),
                sorter
            ),
        [errorListTest, selectedTab, sorter]
    )

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
