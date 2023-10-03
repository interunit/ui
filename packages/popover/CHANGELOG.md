# @interunit/popover

## 0.0.25

### Patch Changes

- Updated dependencies
  - @interunit/config@0.0.16
  - @interunit/a11y@0.0.21
  - @interunit/crossplatform@0.0.16
  - @interunit/modal@0.0.19
  - @interunit/primitives@0.0.23
  - @interunit/toolbox@0.0.16

## 0.0.24

### Patch Changes

- Improvements from testing and other small adjustments.
- Updated dependencies
  - @interunit/primitives@0.0.22
  - @interunit/modal@0.0.18
  - @interunit/a11y@0.0.20

## 0.0.23

### Patch Changes

- - A11y
    - Fix onOutsideClick hook
  - Config
    - Optional change the env var to avoid issues
  - Popover
    - Update docs
    - re-enable outside click
    - Add 'none' option for trigger interactionA
    - Fix offset calculation
- Updated dependencies
  - @interunit/config@0.0.15
  - @interunit/a11y@0.0.19
  - @interunit/crossplatform@0.0.15
  - @interunit/modal@0.0.17
  - @interunit/primitives@0.0.21
  - @interunit/toolbox@0.0.15

## 0.0.22

### Patch Changes

- event.preventDefault() shouldn't be prescribed here

## 0.0.21

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
  - @interunit/primitives@0.0.20
  - @interunit/toolbox@0.0.14
  - @interunit/modal@0.0.16
  - @interunit/a11y@0.0.18
  - @interunit/crossplatform@0.0.14

## 0.0.20

### Patch Changes

- Fixing package.json exports
- Updated dependencies
  - @interunit/crossplatform@0.0.13
  - @interunit/primitives@0.0.19
  - @interunit/toolbox@0.0.13
  - @interunit/config@0.0.14
  - @interunit/modal@0.0.15
  - @interunit/a11y@0.0.17

## 0.0.19

### Patch Changes

- Updates for eslint tooling
- Updated dependencies
  - @interunit/api-extractor@0.0.2
  - @interunit/crossplatform@0.0.12
  - @interunit/primitives@0.0.18
  - @interunit/toolbox@0.0.12
  - @interunit/config@0.0.13
  - @interunit/modal@0.0.14
  - @interunit/a11y@0.0.16

## 0.0.18

### Patch Changes

- Workspaces update + Types fixes
- Updated dependencies
  - @interunit/crossplatform@0.0.11
  - @interunit/primitives@0.0.17
  - @interunit/toolbox@0.0.11
  - @interunit/config@0.0.12
  - @interunit/modal@0.0.13
  - @interunit/a11y@0.0.15

## 0.0.17

### Patch Changes

- Improving Tabs typechecking with generics
- Updated dependencies
  - @interunit/crossplatform@0.0.10
  - @interunit/primitives@0.0.15
  - @interunit/toolbox@0.0.10
  - @interunit/config@0.0.11
  - @interunit/modal@0.0.12
  - @interunit/a11y@0.0.14

## 0.0.16

### Patch Changes

- Emit type fix?
- Updated dependencies
  - @interunit/crossplatform@0.0.9
  - @interunit/primitives@0.0.14
  - @interunit/toolbox@0.0.9
  - @interunit/config@0.0.10
  - @interunit/modal@0.0.11
  - @interunit/a11y@0.0.13

## 0.0.15

### Patch Changes

- Attempting to fix type emit
- Updated dependencies
  - @interunit/crossplatform@0.0.8
  - @interunit/primitives@0.0.13
  - @interunit/toolbox@0.0.8
  - @interunit/config@0.0.9
  - @interunit/modal@0.0.10
  - @interunit/a11y@0.0.12

## 0.0.14

### Patch Changes

- Internal tools migration, preconstruct > tsup. Attempt to fix emit issues in Tabs to then apply elsewhere if successful. Added Bun.
- Updated dependencies
  - @interunit/crossplatform@0.0.7
  - @interunit/primitives@0.0.12
  - @interunit/toolbox@0.0.7
  - @interunit/config@0.0.8
  - @interunit/modal@0.0.9
  - @interunit/a11y@0.0.11

## 0.0.13

### Patch Changes

- Step `"type":"module"` back from packages because of compatibility issues
- Updated dependencies
  - @interunit/crossplatform@0.0.6
  - @interunit/primitives@0.0.11
  - @interunit/toolbox@0.0.6
  - @interunit/config@0.0.7
  - @interunit/modal@0.0.8
  - @interunit/a11y@0.0.10

## 0.0.12

### Patch Changes

- Tabs keyboard navigation improvements + overhaul to testing stack
- Updated dependencies
  - @interunit/crossplatform@0.0.5
  - @interunit/primitives@0.0.10
  - @interunit/toolbox@0.0.5
  - @interunit/config@0.0.6

## 0.0.11

### Patch Changes

- Dependency update to fix some type issues
- Updated dependencies
  - @interunit/crossplatform@0.0.4
  - @interunit/primitives@0.0.8
  - @interunit/toolbox@0.0.3
  - @interunit/config@0.0.5
  - @interunit/modal@0.0.7
  - @interunit/a11y@0.0.8

## 0.0.10

### Patch Changes

- Internal changes to make maintaining the project easier. No changes in functionaity to InterUnit components
- Updated dependencies
  - @interunit/crossplatform@0.0.3
  - @interunit/primitives@0.0.7
  - @interunit/toolbox@0.0.2
  - @interunit/config@0.0.4
  - @interunit/modal@0.0.6
  - @interunit/a11y@0.0.7

## 0.0.9

### Patch Changes

- - Better ergonomics for the Popover component
  - Updated Popover docs
  - Improved platformStyleTranslation + NativeWind dry run
  - useOutsideClick no-op for native until support is created
- Updated dependencies
  - @interunit/crossplatform@0.0.2
  - @interunit/primitives@0.0.6
  - @interunit/config@0.0.3
  - @interunit/modal@0.0.5
  - @interunit/a11y@0.0.6

## 0.0.8

### Patch Changes

- Center aligning popover + arrow support

## 0.0.7

### Patch Changes

- Make Popover update when props changing for popoverPositioning

## 0.0.6

### Patch Changes

- Improve inline styles by creating merged types and allowing for some style translation between web and native (more to come).
- Updated dependencies
  - @interunit/primitives@0.0.3

## 0.0.5

### Patch Changes

- Fix useOutsideClick issue

## 0.0.4

### Patch Changes

- Moves useOutsideClick into the popover as this seems weird to be a concern of the Modal component
- Updated dependencies
  - @interunit/modal@0.0.4

## 0.0.3

### Patch Changes

- Updates to support better popover and modal support. Making way for supporting collapsible component
- Updated dependencies
  - @interunit/primitives@0.0.2
  - @interunit/modal@0.0.3
  - @interunit/a11y@0.0.4
