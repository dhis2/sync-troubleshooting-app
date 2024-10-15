import React, { useState } from 'react'
import {
    EVENT,
    Layout,
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

    const selectedEvent = selectedTab === EVENT

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
                <div>
                    <Notice />
                    <div>
                        {errorListTest.map(({ type, code, id }) => (
                            <ListItem key={id} type={type} code={code} />
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

const ListItem = ({ type, code }) => (
    <div>
        <span>{type}</span>
        <VerticalDivider />
        <span>{code}</span>
    </div>
)

const VerticalDivider = () => <span>|</span>
