type PopoverArrow = Omit<PrimitiveBoxProps, 'el'> & {
    size?: CSSUnit;
    borderRadius?: CSSUnit;
    strokeWidth?: CSSUnit;
    strokeColor?: string;
    fillColor?: string;
};