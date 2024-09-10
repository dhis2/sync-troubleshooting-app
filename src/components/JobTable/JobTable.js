import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    TableHead,
    DataTableRow,
    DataTableColumnHeader,
    TableBody,
    DataTableCell,
} from '@dhis2/ui'
import React from 'react'

export const JobTable = ({ rows }) => {
    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>
                        {i18n.t('Import Job ID')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Import Job type')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('User id')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Incident date')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Last executed')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Errors')}
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow
                        key={index}
                        jobID={row.id}
                        type={row.type}
                        user={row.user}
                        createdAt={row.created}
                        executedAt={row.executed}
                        errors={row.errors}
                    />
                ))}
            </TableBody>
        </DataTable>
    )
}

const TableRow = ({ jobID, type, user, createdAt, executedAt, errors }) => (
    <DataTableRow>
        <DataTableCell>{jobID}</DataTableCell>
        <DataTableCell>{type}</DataTableCell>
        <DataTableCell>{user}</DataTableCell>
        <DataTableCell>{createdAt}</DataTableCell>
        <DataTableCell>{executedAt}</DataTableCell>
        <DataTableCell>
            {errors?.map((error) => (
                <ErrorList
                    key={error.id}
                    id={error.id}
                    type={error.type}
                    code={error.code}
                    message={error.message}
                />
            ))}
        </DataTableCell>
    </DataTableRow>
)

const ErrorList = ({ id, message, code, type }) => (
    <p>
        <em>{id}</em> / <strong>{code}</strong> /<strong>{type}</strong>/
        {message}
    </p>
)
