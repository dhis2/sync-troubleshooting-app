import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { Details } from './Details'
import css from './Details.module.css'

const ChooseArtifact = () => (
    <div className={css.chooseArtifactMessage}>
        {i18n.t('Choose an error from the list to see the details.')}
    </div>
)

export const DetailsView = ({ selectedArtifact }) => {
    return selectedArtifact ? (
        <Details artifact={selectedArtifact} />
    ) : (
        <ChooseArtifact />
    )
}

DetailsView.propTypes = {
    selectedArtifact: PropTypes.shape({
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
    }),
}
