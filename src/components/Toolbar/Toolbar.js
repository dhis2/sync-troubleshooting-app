import i18n from '@dhis2/d2-i18n'
import { Input, SingleSelect, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FILTER_OPTIONS, SORT_OPTIONS } from './sorter'
import css from './Toolbar.module.css'

export const Toolbar = ({
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
}) => {
    return (
        <div className={css.toolbar}>
            <Input
                dense
                className={css.searchInput}
                placeholder={i18n.t('Search')}
                name="search"
                onChange={({ value }) => setSearch(value)}
                value={search}
            />
            <SingleSelect
                selected={sort}
                dense
                placeholder={i18n.t('Sort')}
                prefix={i18n.t('Sort by')}
                className={css.searchInput}
                onChange={({ selected }) => setSort(selected)}
            >
                {SORT_OPTIONS.map(({ label, value }) => (
                    <SingleSelectOption
                        key={value}
                        label={label}
                        value={value}
                    />
                ))}
            </SingleSelect>
            <SingleSelect
                selected={filter}
                dense
                placeholder={i18n.t('Filter')}
                prefix={i18n.t('Filter by')}
                className={css.searchInput}
                onChange={({ selected }) => setFilter(selected)}
            >
                {FILTER_OPTIONS.map(({ label, value }) => (
                    <SingleSelectOption
                        key={value}
                        label={label}
                        value={value}
                    />
                ))}
            </SingleSelect>
        </div>
    )
}

Toolbar.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
}