export type PopoverPositioning = Omit<PrimitiveBoxProps, 'el'> & {
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    offset?: CSSUnit;
    width?: 'trigger' | CSSUnit;
    maxWidth?: CSSUnit;
    zIndex?: number;
};