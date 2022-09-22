import { FieldError } from '../generated/graphql'

export const extractErrorMessage = (error: any) => {
    return error.response?.data?.message || error.message || error.toString()
}

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {}
    errors.forEach(({ field, message }) => {
        errorMap[field] = message
    })

    return errorMap
}

export const camelCaseToNormal = (string: string | undefined) => {
    if (string) {
        return (
            string
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function (str) {
                    return str.toUpperCase()
                })
        )
    } else return ''
}
