import i18n from '@dhis2/d2-i18n'

const language = i18n.language?.replace('_', '-') || 'en-gb'

export const [selectedLocale] = Intl.DateTimeFormat.supportedLocalesOf([
    language,
    'en-gb',
])

/**
 * Find which of the two locales is supported by the user's browser for relative time formatting
 * */
const [relativeTimeLocale] = Intl.RelativeTimeFormat.supportedLocalesOf([
    language,
    'en',
])

/**
 * Time unit and its equivalent value in milliseconds
 * */
const timeUnits = [
    { unit: 'year', ms: 31536000000 },
    { unit: 'month', ms: 2628000000 },
    { unit: 'day', ms: 86400000 },
    { unit: 'hour', ms: 3600000 },
    { unit: 'minute', ms: 60000 },
    { unit: 'second', ms: 1000 },
]

const relativeTimeFormatter = new Intl.RelativeTimeFormat(relativeTimeLocale, {
    numeric: 'always',
})

/**
 * Finds the most appropriate time unit
 * */
const getClosestTimeUnit = (deltaMs, minUnit = 'millisecond') => {
    const absoluteDelta = Math.abs(deltaMs)
    for (const { unit, ms } of timeUnits) {
        if (absoluteDelta >= ms || unit === minUnit) {
            return { unit, value: Math.round(deltaMs / ms) }
        }
    }
    return { unit: 'millisecond', value: deltaMs }
}

/**
 * Get language sensitive relative time message from elapsed time
 */
const getRelativeTimeFromDelta = (deltaMs) => {
    if (Math.abs(deltaMs) < 1000) {
        return i18n.t('Now')
    }
    const { value, unit } = getClosestTimeUnit(deltaMs, 'second')
    return relativeTimeFormatter.format(value, unit)
}

/**
 * Get language sensitive relative time message from Dates
 */
export const getRelativeTime = (relative, baseDate = new Date()) => {
    const deltaMs = relative.getTime() - baseDate.getTime()
    return getRelativeTimeFromDelta(deltaMs)
}
