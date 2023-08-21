# @interunit/primitives

## 0.0.7

### Patch Changes

- Internal changes to make maintaining the project easier. No changes in functionaity to InterUnit components
- Updated dependencies
  - @interunit/crossplatform@0.0.3
  - @interunit/toolbox@0.0.2
  - @interunit/config@0.0.4

## 0.0.6

### Patch Changes

- - Better ergonomics for the Popover component
  - Updated Popover docs
  - Improved platformStyleTranslation + NativeWind dry run
  - useOutsideClick no-op for native until support is created
- Updated dependencies
  - @interunit/crossplatform@0.0.2
  - @interunit/config@0.0.3

## 0.0.5

### Patch Changes

- Click and press was getting deleted in Child, we want to make sure that persists so we can use it in Button and properly implement onClickOrPress

## 0.0.4

### Patch Changes

- Child component executes functions passed to Child and the same functions that exist on target, previously only one of the matching functions executed

## 0.0.3

### Patch Changes

- Improve inline styles by creating merged types and allowing for some style translation between web and native (more to come).

## 0.0.2

### Patch Changes

- Updates to support better popover and modal support. Making way for supporting collapsible component

## 0.0.1

### Patch Changes

- First alpha release of primitives
