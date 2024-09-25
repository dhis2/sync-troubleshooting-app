import { filterSearchElements } from '../sorter'

const errorList = [
    {
        code: 'E1012',
        finished: '2024-09-03T17:44:42.538304',
        id: 'oKn0OF5z7YZ',
        message:
            'Could not find DataElement: `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
        user: 'GOLswS44mh8',
    },
    {
        code: 'E1011',
        finished: '2024-09-02T17:44:42.538304',
        id: 'oKn0OF5z7Yl',
        message:
            'Could not find OrganisationUnit: `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
        user: 'GOLswS44mh8',
    },
    {
        code: 'E1011',
        finished: '2024-09-05T17:44:42.538304',
        id: 'oKn0OF5z7Y8',
        message:
            'Could not find OrganisationUnit: `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
        user: 'GOLswS44mh8',
    },
    {
        code: 'E1014',
        finished: '2024-09-04T17:44:42.538304',
        id: 'oKn0OF5z7YW',
        message:
            'Wrong valueType `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
        user: 'GOLswS44mh8',
    },
    {
        code: 'E1014',
        finished: '2024-09-06T17:44:42.538304',
        id: 'oKn0OF5z7Y9',
        message:
            'Wrong valueType: `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
        user: 'GOLswS44mh8',
    },
]

test('"List" is filtered using search by message', () => {
    const expression = 'Wrong'

    const filteredList = [
        {
            code: 'E1014',
            finished: '2024-09-04T17:44:42.538304',
            id: 'oKn0OF5z7YW',
            message:
                'Wrong valueType `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
            user: 'GOLswS44mh8',
        },
        {
            code: 'E1014',
            finished: '2024-09-06T17:44:42.538304',
            id: 'oKn0OF5z7Y9',
            message:
                'Wrong valueType: `MetadataIdentifier(idScheme=UID, identifier=testOrg, attributeValue=null)`, linked to Event.',
            user: 'GOLswS44mh8',
        },
    ]

    expect(filterSearchElements(errorList, expression)).toEqual(filteredList)
})