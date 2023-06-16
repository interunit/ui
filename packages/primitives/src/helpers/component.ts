export const optionalProp = (prop: any) => {
    return {...(prop && { [prop]: prop})}
}
