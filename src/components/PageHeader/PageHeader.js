import PropTypes from 'prop-types'
import React from 'react'
import styles from './PageHeader.module.css'

export const PageHeader = ({ title }) => (
    <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
    </header>
)

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
}
