import { CssVariables, CssReset } from '@dhis2/ui'
import React from 'react'
import { AppProvider } from './app-context'
import classes from './App.module.css'
import { AuthWall } from './auth'
import i18n from './locales/index'
import { SyncTroubleshooting } from './page'

const App = () => (
    <>
        <CssReset />
        <CssVariables colors spacers />
        <AppProvider>
            <AuthWall>
                <div className={classes.container}>
                    <div className={classes.contentWrapper}>
                        <SyncTroubleshooting />
                    </div>
                </div>
            </AuthWall>
        </AppProvider>
    </>
)

export default App
