import {P} from '@interunit/primitives'

type PropToDisplay = {
  name: string
  type: string
  required: false
  description: string
  default?: string
}
const PropsTable = ({propsToDisplay}: {propsToDisplay: PropToDisplay[]}) => {
  return (
    <P.BX
      el="div"
      className="bg-bg-blended border grid grid-cols-[1fr_1fr_3fr] gap-y-4 [&>div]:p-4 "
    >
      <P.BX el="div" className="text-md border-b-[1px]">
        Prop
      </P.BX>
      <P.BX el="div" className="text-sm text-muted border-b-[1px]">
        Default
      </P.BX>
      <P.BX el="div" className="border-b-[1px]">
        Description
      </P.BX>

      {propsToDisplay.map(prop => {
        return (
          <>
            <P.BX el="div" className="">
              <P.BX el="div" className="text-md">
                {prop.name}
                {prop.required && '*'}
              </P.BX>
              <P.BX el="div" className="text-sm text-text-light-accent">
                {prop.type}
              </P.BX>
            </P.BX>
            <P.BX el="div" className="text-sm text-text-light-accent">
              {prop.default ? prop.default : '-'}
            </P.BX>
            <P.BX el="div" className="text-sm">
              {prop.description}
            </P.BX>
          </>
        )
      })}
    </P.BX>
  )
}

export {PropsTable}
