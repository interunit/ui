export type Font = {
  fnt?: FontValues
}

type FontValues = {
  c?: string // TODO: Make this based on predefined colors
}

const fontAssembler = ({fnt}: {fnt?: FontValues}) => {
  if (!fnt) return undefined

  let result = ''

  if (fnt.c) result += `color ${fnt.c};`

  return result
}

export const font = {
  assembler: fontAssembler,
  propNames: ['fnt']
}
