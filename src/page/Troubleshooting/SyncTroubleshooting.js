import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { PageHeader } from '../../components'
import EventList from './Event/Event'
import css from './SyncTroubleshooting.module.css'

export const SyncTroubleshooting = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <PageHeader
                    className={css.header}
                    title={i18n.t('Synchronization Troubleshooting')}
                />
            </div>
            <EventList />
        </div>
    )
}
