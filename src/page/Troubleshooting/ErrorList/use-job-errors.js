import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useMemo, useState } from 'react'

/**
 * 1. Create errors event and TEI, just to have a response of how it will look
 * 2. Create a function that divides artifacts by type
 * 3. Get all elements needed using queries
 * 4. Refactor functions and runtime
 * 5. Try to only show elements using sorter and filter
 * */

const pollQuery = {
    errors: {
        resource: 'jobConfigurations/errors',
    },
    users: {
        resource: 'users',
        params: {
            paging: false,
        },
    },
    programRules: {
        resource: 'programRules',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'program[id,name,programStages[id,name]]',
            ],
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'valueType',
                'optionSetValue',
            ],
        },
    },
}

export const useJobErrors = () => {
    const [jobErrors, setErrors] = useState(null)
    const [elements, setElements] = useState(null)
    /*const wrappedQuery = useConst(() => ({
        poll: query,
    }))*/
    const { data: dataPR, loadingPR } = useDataQuery(programRuleQuery)
    const { refetch, error, loading, data } = useDataQuery(pollQuery, {
        //lazy: true,
        /*onComplete: (data) => {
            const {errorList} = usePrepareErrorList(data.errors, refetchPR)
            setErrors(errorList)
            if (checkDone(data.errors)) {
                console.error(data.errors)
                //cancel()
            }

            console.info({data, errorList})
        },*/
    })

    //useProgramRules({})

    useEffect(() => {
        if (data && data?.errors && dataPR && dataPR?.programRules) {
            const errorL = data?.errors
            const { errorList, groupedElements } = prepareErrorList({
                list: data?.errors,
                users: data?.users?.users,
                dataElements: data?.dataElements?.dataElements,
                prList: dataPR?.programRules?.programRules,
            })

            console.info('useJobErrors', {
                data: data.errors,
                errorL,
                PR: dataPR?.programRules?.programRules,
                DE: dataPR.dataElements,
                errorList,
                groupedElements,
            })
            setErrors(errorList)
            setElements(groupedElements)
        }
    }, [data, dataPR])

    return {
        jobErrors,
        elements,
        error,
        loading,
        refetch,
    }
}

const prepareErrorList = ({ list, users, dataElements, prList }) => {
    const errorList = []
    console.log({ list, prList, users })
    list?.forEach((item) => {
        item.errors?.forEach((entry) => {
            //const programRuleId = extractProgramRuleId(entry.message)
            const { programRule, dataElement, program, event } =
                extractPossibleElements(entry.message)
            const currentPR = prList.find((e) => e.id === programRule)
            const currentDE = dataElements.find((e) => e.id === dataElement)
            const currentUser = users?.find((user) => user.id === item.user)

            console.log('iterate', {
                programRule,
                currentPR,
                dataElement,
                program,
                event
            })

            //const programRuleList = []
            //programRuleList.push(extractProgramRuleId(entry.message))
            //console.log('programRules', programRuleList)
            /*refetchPR({programRuleList})
                .then((a) => {
                console.info('refetch then',{a, programRuleList})
            })*/
            const error = {
                ...entry,
                finished: item.finished,
                jobId: item.id,
                user: currentUser.displayName || item.user,
                status: 'Error',
                orgUnit: '',
                program: currentPR?.program.name, //name
                enrollment: '',
                programStage: currentPR?.program.programStages[0].name, //name
                event: event,
                tei: '',
                dataElement: currentDE?.name || dataElement, //name
                tea: '', //name
            }
            errorList.push(error)
        })
    })

    return {
        errorList,
        groupedElements: groupAndSortByMessageOrId(errorList),
    }
}

const extractProgramRuleId = (inputString) => {
    const regex = /program rule \(`([^`]+)`\)/
    const match = inputString.match(regex)

    if (match && match[1]) {
        return match[1]
    } else {
        return null // or you can return an empty string or a specific message indicating no match found
    }
}

const extractDataElementId = (inputString) => {
    const regex = /DataElement \(`([^`]+)`\)/
    const match = inputString.match(regex)

    if (match && match[1]) {
        return match[1]
    } else {
        return null // or you can return an empty string or a specific message indicating no match found
    }
}

const extractId = (text, key) => {
    // Construct a dynamic regular expression to match the key followed by an ID inside backticks
    //const regex = new RegExp(`${key}\\s*[\\'\\\`\"](\\w+)[\\'\\\`\"]`)
    /*const regex = new RegExp(`${key}\\s*\\(.*?identifier=([\\w]+)`, 'i');

    // Match the ID
    const match = text.match(regex)

    // Return the matched ID or null if not found
    return match ? match[1] : null*/

    // First, try to find a match where the key is followed by an identifier in backticks
    let regex = new RegExp(`${key}\\s*[\\'\\\`\"](\\w+)[\\'\\\`\"]`, 'i');

    let match = text.match(regex);

    // If a backtick pattern is found, return the matched ID
    if (match) {
        return match[1];
    }

    // If no match is found, try to find a match where the key is followed by "identifier="
    regex = new RegExp(`${key}\\s*\\(.*?identifier=([\\w]+)`, 'i');

    match = text.match(regex);

    // Return the matched ID or null if no match is found
    return match ? match[1] : null;
}

const extractPossibleElements = (inputString) => {
    const programRuleId = extractId(inputString, 'program rule')
    const dataElementId = extractId(inputString, 'DataElement')
    const programId = extractId(inputString, 'program')
    const eventId = extractId(inputString, 'event' || 'Event')

    return {
        programRule: programRuleId,
        dataElement: dataElementId,
        program: programId,
        event: eventId,
    }
}

/**
 * How and what to get with Event/Program rules error:
 * - Program rule ID, you can extract it from the message error
 * - with a program rule, you can get the program (id and name) and programStage (please double-check if there is more than one PS)
 * - value next to program rule is a data element, with data element name
 *  You can do it girl! :)
 * */

const programRuleQuery = {
    programRules: {
        resource: 'programRules',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'program[id,name,programStages[id,name]]',
            ],
            //filter: `id:in:[${list}]`,
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'valueType',
                'optionSetValue',
            ],
            //filter: `id:in:[${list}]`,
        },
    },
}

/*const programQuery = (list) => ({
    dataElements: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['id', 'name','displayName', 'programStages'],
            filter: `id:in:[${list}]`,
        },
    },
})*/

export const dataElementQuery = (list) => ({
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'valueType',
                'optionSetValue',
            ],
            filter: `id:in:[${list}]`,
        },
    },
})

const programRuleErrorQuery = ({ programRuleList, dataElementList }) => ({
    programRules: {
        resource: 'programRules',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'program[id,name,programStages[id,name]]',
            ],
            filter: `id:in:[dahuKlP7jR2${programRuleList}]`,
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'name',
                'valueType',
                'optionSetValue',
            ],
            filter: `id:in:[${dataElementList}]`,
        },
    },
})

const useProgramRules = ({ programRuleList }) =>
    useDataQuery(programRuleErrorQuery, {
        variables: {
            list: programRuleList,
            //programRuleList: programRuleList,
            //dataElementList: dataElementList || '',
            lazy: true,
        },
        /*onComplete: (data) => {
            setProgram(data)
            console.log('programRules result',{data, programRules})
        }*/
    })

/*export const useReadDataElementsQuery = ({ programId }) =>
    useDataQuery(dataElementsQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })*/

const prepareMessage = (message) => {}

const groupAndSortByMessageOrId = (objects) => {
    const groupedMap = new Map()

    // Iterate over each object in the array
    objects.forEach((obj) => {
        // Use the message if it exists, otherwise fall back to id
        const key = obj.id || obj.message

        // If the key already exists in the groupedMap, push the object into the existing array
        if (groupedMap.has(key)) {
            groupedMap.get(key).push(obj)
        } else {
            // If the key doesn't exist, create a new array with the current object
            groupedMap.set(key, [obj])
        }
    })

    // Convert the grouped map into the desired structure
    const groupedArray = Array.from(groupedMap.entries()).map(
        ([key, group]) => {
            // Sort the group by timestamp (newest first)
            group.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

            // Construct the result for this group
            return {
                message: group[0].message,
                id: group[0].id,
                finished: group[0].finished, // The latest timestamp (newest first)
                type: group[0].type, // Assuming type can be derived or set
                code: group[0].code, // Assuming code can be derived or set
                status: group[0].status, // Assuming status can be derived or set
                errors: group, // The entire group of objects sorted by timestamp
            }
        }
    )

    return groupedArray
}
