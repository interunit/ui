export type Background = {
  c?: string // TODO: Make this based on predefined colors
}

const backgroundAssembler = ({bg}: {bg: Background}) => {
  if (!bg) return undefined

  let result = ''

  if (bg.c) result += `background-color: ${bg.c};`

  return result
}

export const background = {
  assembler: backgroundAssembler,
  propNames: ['bg'],
}
