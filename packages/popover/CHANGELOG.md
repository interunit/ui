# @interunit/popover

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
