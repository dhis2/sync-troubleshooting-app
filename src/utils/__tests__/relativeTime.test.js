import { getRelativeTime } from '../relativeTime'

test('Relative time, past days', () => {
    const dateValue = '2024-09-05T17:44:42.538304'
    const relative = new Date(dateValue)
    const initialDate = new Date('2024-09-01T17:44:42.538304')

    expect(getRelativeTime(initialDate, relative)).toBe('4 days ago')
})

test('Relative time, future days', () => {
    const dateValue = '2024-09-03T17:44:42.538304'
    const relative = new Date(dateValue)
    const initialDate = new Date('2024-09-01T17:44:42.538304')

    expect(getRelativeTime(relative, initialDate)).toBe('in 2 days')
})

test('Relative time, hours ago', () => {
    const clientDate =
        'Tue Sep 23 2024 19:44:42 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 15:44:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(relative, from)).toBe('20 hours ago')
})

test('Relative time, in x hours', () => {
    const clientDate =
        'Tue Sep 23 2024 19:44:42 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 02:40:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(from, relative)).toBe('in 7 hours')
})

test('Relative time, minutes ago', () => {
    const clientDate =
        'Tue Sep 24 2024 15:40:42 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 15:44:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(relative, from)).toBe('4 minutes ago')
})

test('Relative time, in x minutes', () => {
    const clientDate =
        'Tue Sep 24 2024 15:35:42 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 15:44:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(from, relative)).toBe('in 9 minutes')
})

test('Relative time, seconds ago', () => {
    const clientDate =
        'Tue Sep 24 2024 02:40:20 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 02:40:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(relative, from)).toBe('22 seconds ago')
})

test('Relative time, in x seconds', () => {
    const clientDate =
        'Tue Sep 24 2024 02:40:25 GMT+0200 (Central European Summer Time)'
    const relative = new Date(clientDate)
    const from = new Date(
        'Tue Sep 24 2024 02:40:42 GMT+0200 (Central European Summer Time)'
    )

    expect(getRelativeTime(from, relative)).toBe('in 17 seconds')
})
