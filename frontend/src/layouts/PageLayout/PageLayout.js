import React from 'react'
import { IndexLink } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
    <div className='container text-center'>
        <h1>Pina Colada</h1>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>

        <div className='page-layout__viewport'>
            {children}
        </div>
    </div>
)
PageLayout.propTypes = {
    children: PropTypes.node,
}

export default PageLayout

// {' · '}
// <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
