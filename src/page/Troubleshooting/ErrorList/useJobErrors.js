import { useDataQuery } from '@dhis2/app-runtime'
import flattenDeep from 'lodash-es/flattenDeep'
import { useState, useEffect } from 'react'

const errorQuery = {
    errors: {
        resource: 'jobConfigurations/errors',
    },
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'programStages[id,name]'],
        },
    },
    users: {
        resource: 'users',
        params: {
            paging: false,
            fields: ['id', 'name', 'userGroups[id,name]'],
        },
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const errorResponse = await fetchErrors()
                const fetchedErrors = errorResponse?.errors || []

                setErrors(fetchedErrors)
                setUsers(errorResponse?.users?.users || [])
                setPrograms(errorResponse?.programs?.programs || [])

                const errorIds = flattenDeep(
                    fetchedErrors.map((error) => error.errors.map((e) => e.id))
                )

                if (errorIds.length > 0) {
                    const eventResponse = await fetchEvents({ ids: errorIds })
                    const fetchedEvents = eventResponse?.events || []
                    setEvents(fetchedEvents)
                } else {
                    setEvents([])
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

/**
 * Return list of detailed errors
 * */
const prepareErrorList = ({ errors, events, programs, users }) => {
    if (!errors || errors.length === 0) {
        return { groupedElements: [] }
    }

    const getUserGroups = (userId) => {
        const user = users?.find((u) => u.id === userId)
        return user?.userGroups?.map((u) => u.name).join(', ') || null
    }

    const getProgramAndStage = (programId, stageId) => {
        const program = programs?.find((p) => p.id === programId)
        const programStage = program?.programStages?.find(
            (ps) => ps.id === stageId
        )
        return {
            programName: program?.name || null,
            programStageName: programStage?.name || null,
        }
    }

    const errorList = errors.flatMap((item) =>
        item?.errors?.map((entry) => {
            const currentUser = users?.find((user) => user.id === item.user)
            const eventElements = getEventData(entry, events)
            const { programName, programStageName } = getProgramAndStage(
                eventElements.program,
                eventElements.programStage
            )

            return {
                ...entry,
                finished: item.finished,
                jobId: item.id,
                user: currentUser?.name || item.user,
                status: 'Error',
                type: eventElements?.type || null,
                orgUnit: eventElements?.orgUnit || null,
                program: programName,
                enrollment: eventElements?.enrollment || null,
                programStage: programStageName || eventElements?.programStage,
                event: entry.id,
                userGroups: getUserGroups(item.user),
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
