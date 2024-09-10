import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CheckDetails } from './CheckDetails'
import css from './CheckDetails.module.css'

export const CheckDetailsView = ({ selectedCheck }) => {
    return selectedCheck ? (
        <CheckDetails check={selectedCheck} />
    ) : (
        <ChooseCheck />
    )
}

CheckDetailsView.propTypes = {
    selectedCheck: CheckDetails.propTypes.check,
}

const ChooseCheck = () => (
    <div className={css.chooseCheckMessage}>
        {i18n.t('Choose an error from the list to see the details.')}
    </div>
)