import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import { Details } from './Details'
import css from './Details.module.css'

const NoErrorsFound = () => (
    <div className={css.chooseArtifactMessage}>
        {i18n.t('No errors found in the last 24 hours.')}
    </div>
)

const ChooseArtifact = () => (
    <div className={css.chooseArtifactMessage}>
        {i18n.t('Choose an error from the list to see the details.')}
    </div>
)

export const DetailsView = ({ artifacts, selectedArtifact }) => {
    if (isEmpty(artifacts)) {
        return <NoErrorsFound />
    }

    return selectedArtifact ? (
        <Details artifact={selectedArtifact} />
    ) : (
        <ChooseArtifact />
    )
}

DetailsView.propTypes = {
    artifacts: PropTypes.array.isRequired,
    selectedArtifact: PropTypes.shape({
        code: PropTypes.string.isRequired,
        finished: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.string,
        errors: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.string.isRequired,
                finished: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
                user: PropTypes.string.isRequired,
                dataElement: PropTypes.string,
                enrollment: PropTypes.string,
                event: PropTypes.string,
                jobId: PropTypes.string.isRequired,
                orgUnit: PropTypes.string,
                program: PropTypes.string,
                programStage: PropTypes.string,
                tea: PropTypes.string,
                tei: PropTypes.string,
                type: PropTypes.string,
            })
        ),
    }),
}