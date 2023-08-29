```ts 
export type PopoverProps = {
    triggerType?: 'click' | 'hover';
    defaultIsOpen?: boolean;
    settings?: PopoverSettings;
    onPopoverChange?: (popoverState: PopoverState) => void;
    children: React.ReactNode;
};
 ```