# @interunit/primitives

## 0.0.23

### Patch Changes

- Updated dependencies
  - @interunit/config@0.0.16
  - @interunit/crossplatform@0.0.16
  - @interunit/toolbox@0.0.16

## 0.0.22

### Patch Changes

- Improvements from testing and other small adjustments.

## 0.0.21

### Patch Changes

- Updated dependencies
  - @interunit/config@0.0.15
  - @interunit/crossplatform@0.0.15
  - @interunit/toolbox@0.0.15

## 0.0.20

### Patch Changes

- - Combobox
    - Alpha version ready for testing
    - Tests
    - Initial Docs
  - Popover
    - Make sure Props are passing through Popover Elements
    - Calculate alignment based on content and not just the trigger height (may need to adjust this some more
  - Toolbox
    - Add dispatch type as optional union type for onValueChange
  - Modal
    - Adjust ModalProps to use intrinsic elements instead of HTMLProps (Modal generally needs more attention)
- Updated dependencies
  - @interunit/toolbox@0.0.14
  - @interunit/crossplatform@0.0.14

## 0.0.19

### Patch Changes

- Fixing package.json exports
- Updated dependencies
  - @interunit/crossplatform@0.0.13
  - @interunit/toolbox@0.0.13
  - @interunit/config@0.0.14

## 0.0.18

### Patch Changes

- Updates for eslint tooling
- Updated dependencies
  - @interunit/crossplatform@0.0.12
  - @interunit/toolbox@0.0.12
  - @interunit/config@0.0.13

## 0.0.17

### Patch Changes

- Workspaces update + Types fixes
- Updated dependencies
  - @interunit/crossplatform@0.0.11
  - @interunit/toolbox@0.0.11
  - @interunit/config@0.0.12

## 0.0.15

### Patch Changes

- Improving Tabs typechecking with generics
- Updated dependencies
  - @interunit/crossplatform@0.0.10
  - @interunit/toolbox@0.0.10
  - @interunit/config@0.0.11

## 0.0.14

### Patch Changes

- Emit type fix?
- Updated dependencies
  - @interunit/crossplatform@0.0.9
  - @interunit/toolbox@0.0.9
  - @interunit/config@0.0.10

## 0.0.13

### Patch Changes

- Attempting to fix type emit
- Updated dependencies
  - @interunit/crossplatform@0.0.8
  - @interunit/toolbox@0.0.8
  - @interunit/config@0.0.9

## 0.0.12

### Patch Changes

- Internal tools migration, preconstruct > tsup. Attempt to fix emit issues in Tabs to then apply elsewhere if successful. Added Bun.
- Updated dependencies
  - @interunit/crossplatform@0.0.7
  - @interunit/toolbox@0.0.7
  - @interunit/config@0.0.8

## 0.0.11

### Patch Changes

- Step `"type":"module"` back from packages because of compatibility issues
- Updated dependencies
  - @interunit/crossplatform@0.0.6
  - @interunit/toolbox@0.0.6
  - @interunit/config@0.0.7

## 0.0.10

### Patch Changes

- Tabs keyboard navigation improvements + overhaul to testing stack
- Updated dependencies
  - @interunit/crossplatform@0.0.5
  - @interunit/toolbox@0.0.5
  - @interunit/config@0.0.6

## 0.0.9

### Patch Changes

- First version of the Tabs component. Also adds in a new keyboard navigation hook.
- Updated dependencies
  - @interunit/toolbox@0.0.4

## 0.0.8

### Patch Changes

- Dependency update to fix some type issues
- Updated dependencies
  - @interunit/crossplatform@0.0.4
  - @interunit/toolbox@0.0.3
  - @interunit/config@0.0.5

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
