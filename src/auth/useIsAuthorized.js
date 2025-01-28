import { useAppContext } from '../app-context'

const ALL = 'ALL'
const F_JOB_LOG_READ = 'F_JOB_LOG_READ'
const validAuthorities = new Set([ALL, F_JOB_LOG_READ])

export const useIsAuthorized = () => {
    const { authorities } = useAppContext()

    const hasAuthority = authorities.some((auth) => validAuthorities.has(auth))

    return { hasAuthority }
}
