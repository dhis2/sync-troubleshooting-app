import React, { useState, useEffect } from 'react'
import {
    CheckDetailsView,
    ErrorOrLoading,
    EVENT,
    FILTER,
    Layout,
    List,
    SORT,
    Toolbar,
    ToolbarTabs,
} from '../../../components'
import css from './Event.module.css'
import { jobErrors } from './jobErrorsTest'

const EventList = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(FILTER['status'].value)
    const [selectedTab, setSelectedTab] = useState(EVENT)
    const [selectedSort, setSelectedSort] = useState(SORT['latest'].value)

    const [selectedCheck, setSelectedCheck] = useState(null)

    const selectedEvent = selectedTab === EVENT
    const loading = false

    useEffect(() => {
        console.log({
            jobErrors,
            filter,
            selectedEvent,
            selectedSort,
            selectedCheck,
        })
    }, [jobErrors])

    return (
        <div className={css.listWrapper}>
            <ToolbarTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <Toolbar
                search={search}
                setSearch={setSearch}
                setFilter={setFilter}
                filter={filter}
                sort={selectedSort}
                setSort={setSelectedSort}
                selectedEvent={selectedEvent}
            />
            <Layout>
                <ErrorOrLoading loading={loading}>
                    <List
                        selectedCheck={selectedCheck}
                        setSelectedCheck={setSelectedCheck}
                        checks={jobErrors}
                    />
                </ErrorOrLoading>
                <CheckDetailsView
                    key={selectedCheck?.id}
                    selectedCheck={selectedCheck}
                />
            </Layout>
        </div>
    )
}

export default EventList
