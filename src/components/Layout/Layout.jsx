import PropTypes from 'prop-types'
import React from 'react'
import css from './Layout.module.css'

export const Layout = ({ children }) => {
    return <div className={css.layoutWrapper}>{children}</div>
}

Layout.propTypes = {
    children: PropTypes.node,
}
