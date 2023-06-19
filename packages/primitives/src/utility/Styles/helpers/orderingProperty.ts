export type OrderingProperty =
  | [number, number, number, number]
  | [number, number]
  | [number]
  | number

export const formatOrderingProperty = ({
  value,
  unit
}: {
  value: OrderingProperty
  unit?: string
}) => {
  if (!value) return undefined

  if (typeof value === 'number') {
    return `${value}${unit || ''}`
  }
  if (Array.isArray(value)) {
    return value.map(v => `${v}${unit || ''}`).join(' ')
  }
}
