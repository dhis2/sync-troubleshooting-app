import PropTypes from 'prop-types'
import React from 'react'
import { ArtifactInfo } from './ArtifactInfo'
import css from './Details.module.css'
import { DetailsContent } from './DetailsContent'

export const Details = ({ artifact }) => {
    return (
        <div className={css.wrapper}>
            <ArtifactInfo artifact={artifact} />
            <DetailsContent artifact={artifact} />
        </div>
    )
}

Details.propTypes = {
    artifact: PropTypes.shape({
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
