import { CssVariables, CssReset } from '@dhis2/ui'
import React from 'react'
import classes from './App.module.css'
import i18n from './locales/index'
import { SyncTroubleshooting } from './page'

// create basic components like sidebar, cards, title

const App = () => (
    <>
        <CssReset />
        <CssVariables colors spacers />
        <div className={classes.container}>
            <div className={classes.contentWrapper}>
                <SyncTroubleshooting />
            </div>
        </div>
    </>
)

export default App
