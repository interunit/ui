export type Background = {
  bg?: BackgroundValue
}

type BackgroundValue = {
  c?: string // TODO: Make this based on predefined colors
}

const backgroundAssembler = ({bg}: {bg?: BackgroundValue}) => {
  if (!bg) return undefined

  let result = ''

  if (bg.c) result += `background-color: ${bg.c};`

  return result
}

export const background = {
  assembler: backgroundAssembler,
  propNames: ['bg']
}
