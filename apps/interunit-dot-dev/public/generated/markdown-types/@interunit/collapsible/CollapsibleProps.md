type CollapsibleProps = {
    defaultIsOpen?: boolean;
    triggerType?: 'click' | 'hover';
    onCollapsibleChange?: (collapsibleState: CollapsibleState) => void;
    a11y?: A11yProps;
    children: React.ReactNode;
};