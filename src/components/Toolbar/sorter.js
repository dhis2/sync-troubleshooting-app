import i18n from '@dhis2/d2-i18n'

export const SORT = {
    latest: {
        label: i18n.t('Latest'),
        value: 'latest',
        sorter: (a, b) => b.finished.localeCompare(a.finished),
    },
    oldest: {
        label: i18n.t('Oldest'),
        value: 'oldest',
        sorter: (a, b) => a.finished.localeCompare(b.finished),
    },
    type: {
        label: i18n.t('Type'),
        value: 'type',
        sorter: (a, b) => a.code.localeCompare(b.code),
    },
    'A-Z': {
        label: i18n.t('A-Z'),
        value: 'A-Z',
        sorter: (a, b) => a.message.localeCompare(b.message),
    },
}

export const SORT_OPTIONS = Object.values(SORT).map((sort) => ({
    label: sort.label,
    value: sort.value,
}))

/**
 * Sort elements based on the sort expression
 * */
export const sortElements = (list, expression) => list.sort(expression)

/**
 * Search elements/errors based on their message
 *  */
export const filterElementMessage = (element, filter) => {
    if (!filter || !filter.trim().length === 0) {
        return true
    }

    return element.message?.toLowerCase().includes(filter.toLowerCase())
}

export const filterSearchElements = (list, searchExpression) =>
    list?.filter((element) => filterElementMessage(element, searchExpression))
