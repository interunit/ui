type PopoverState = {
    isOpen: boolean;
    focusType: 'none' | 'default';
    setTrigger: ((trigger: React.ReactElement | null) => void) | null;
    setContent: ((content: React.ReactElement | null) => void) | null;
    togglePopover: () => void;
    trigger?: React.ReactElement | null;
    content?: React.ReactElement | null;
    triggerType: 'click' | 'hover';
    triggerDimensions: Dimensions;
    contentDimensions: Dimensions;
};