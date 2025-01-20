import { useDataQuery } from '@dhis2/app-runtime'
import { useState, useEffect } from 'react'

const errorQuery = {
    errors: {
        resource: 'jobConfigurations/errors',
    },
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'programType',
                'programStages[id,displayName,name]',
            ],
        },
    },
}

const usersQuery = {
    users: {
        resource: 'users',
        params: ({ ids }) => ({
            filter: `id:in:[${ids}]`,
            paging: false,
            fields: [
                'id',
                'name',
                'displayName',
                'userGroups[id,name,displayName]',
            ],
        }),
    },
}

const eventsQuery = {
    events: {
        resource: 'tracker/events',
        params: ({ ids }) => ({
            event: ids.join(';'),
            fields: [
                'event',
                'program',
                'programStage',
                'enrollment',
                'trackedEntity[id,name,attributes]',
                'orgUnit',
            ],
            paging: false,
        }),
    },
}

/**
 * Fetch errors and events based on the errors IDS
 * */
export const useJobConfigurationErrors = () => {
    const [errors, setErrors] = useState([])
    const [events, setEvents] = useState([])
    const [users, setUsers] = useState([])
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { refetch: fetchErrors } = useDataQuery(errorQuery, {
        lazy: true,
    })

    const { refetch: fetchEvents } = useDataQuery(eventsQuery, {
        lazy: true,
    })

    const { refetch: fetchUsers } = useDataQuery(usersQuery, { lazy: true })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const errorResponse = await fetchErrors()
                const fetchedErrors = errorResponse?.errors || []

                setErrors(fetchedErrors)
                setPrograms(errorResponse?.programs?.programs || [])

                const errorIds = fetchedErrors
                    .flatMap((e) => e.errors)
                    .map(({ id }) => id)
                const userIds = fetchedErrors.map((error) => error.user)

                if (errorIds.length > 0) {
                    const eventResponse = await fetchEvents({ ids: errorIds })
                    const userResponse = await fetchUsers({ ids: userIds })
                    const fetchedEvents = eventResponse?.events || []
                    const fetchedUsers = userResponse?.users?.users || []

                    setEvents(fetchedEvents)
                    setUsers(fetchedUsers)
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [fetchErrors, fetchEvents])

    return { errors, events, programs, users, loading, error }
}

/**
 * Return event and program type
 * */
const getEventData = (error, events) => {
    const currentEvent = events?.find((e) => e.event === error.id)
    const type =
        currentEvent?.programType === 'WITHOUT_REGISTRATION'
            ? 'event'
            : 'tracker'

    return {
        ...currentEvent,
        id: currentEvent?.event,
        name: currentEvent?.name,
        type: type,
    }
}

/**
 * Return a list of errors/artifacts grouped and sorted by message
 * */
const groupAndSortByMessage = (objects) => {
    const groupedMap = new Map()

    objects.forEach((obj) => {
        const key = obj.message

        if (groupedMap.has(key)) {
            groupedMap.get(key).push(obj)
        } else {
            groupedMap.set(key, [obj])
        }
    })

    const groupedArray = Array.from(groupedMap.entries()).map(
        ([key, group]) => {
            group.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

            return {
                message: group[0].message,
                id: `${group[0].id}-${group[0].code}-${key}`,
                finished: group[0].finished,
                type: group[0].type,
                code: group[0].code,
                status: group[0].status,
                errors: group,
            }
        }
    )
    return groupedArray
}

const getUserInfo = (userId, key, users) => {
    const user = users?.find((u) => u.id === userId)
    return user?.[key]?.map((u) => u.displayName).join(', ') || null
}

const getProgramAndStage = (programId, stageId, programs) => {
    const program = programs?.find((p) => p.id === programId)
    const programStage = program?.programStages?.find((ps) => ps.id === stageId)
    const type =
        program?.programType === 'WITHOUT_REGISTRATION' ? 'event' : 'tracker'

    return {
        programName: program?.displayName || null,
        programStageName: programStage?.displayName || null,
        type: type,
    }
}

/**
 * Return list of detailed errors
 * */
const prepareErrorList = ({ errors, events, programs, users }) => {
    if (!errors || errors.length === 0) {
        return { groupedElements: [] }
    }

    const errorList = errors.flatMap((item) =>
        item?.errors?.map((entry) => {
            const currentUser = users?.find((user) => user.id === item.user)
            const eventElements = getEventData(entry, events)
            const { programName, programStageName, type } = getProgramAndStage(
                eventElements.program,
                eventElements.programStage,
                programs
            )

            return {
                ...entry,
                finished: item.finished,
                jobId: item.id,
                user: currentUser?.displayName || item.user,
                status: 'Error',
                type: type || null,
                orgUnit: eventElements?.orgUnit || null,
                program: programName,
                enrollment: eventElements?.enrollment || null,
                programStage: programStageName || eventElements?.programStage,
                event: entry.id,
                userGroups: getUserInfo(item.user, 'userGroups', users),
            }
        })
    )

    return {
        groupedElements: groupAndSortByMessage(errorList) || [],
    }
}

/**
 * Return grouped errors/artifacts based on events, programs, and users
 * */
export const useJobErrors = () => {
    const { errors, events, users, programs, loading, error } =
        useJobConfigurationErrors()
    const [jobErrors, setJobErrors] = useState([])

    useEffect(() => {
        if (errors && events) {
            const { groupedElements } = prepareErrorList({
                errors,
                events: events?.events,
                programs: programs,
                users: users,
            })

            setJobErrors(groupedElements)
        }
    }, [errors, events, users, programs])

    return {
        jobErrors,
        loading,
        error,
    }
}
