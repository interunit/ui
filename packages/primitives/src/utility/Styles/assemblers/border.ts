import { type OrderingProperty, formatOrderingProperty } from '../helpers//orderingProperty'

const DEFAULT_BORDER_WIDTH_UNIT = 'px'
const DEFAULT_BORDER_RADIUS_UNIT = 'px'
export type Border = {
    // Border Color
    c?: string; // TODO: Make this based on predefined colors
    // Border Width
    w?: OrderingProperty;
    // Border Style
    s?: 'solid' | 'dashed' | 'dotted';
    // Border Radius
    r?: OrderingProperty;
}

const borderAssembler = ({bdr}: {bdr: Border}) => {
    if(!bdr) return undefined

    let result = ''

    if(bdr.c) result += `border-color: ${bdr.c};`

    if(bdr.w) result += `border-width: ${formatOrderingProperty({value: bdr.w, unit: DEFAULT_BORDER_WIDTH_UNIT})};`

    if(bdr.s) result += `border-style: ${bdr.s};`

    if(bdr.r) result += `border-radius: ${formatOrderingProperty({value: bdr.r, unit: DEFAULT_BORDER_RADIUS_UNIT})};`

    return result;

}

export const border = {
    assembler: borderAssembler,
    propNames: ['bdr']
}
