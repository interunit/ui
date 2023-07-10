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
      className="bg-bg-blended border grid grid-cols-[1fr_1fr_3fr] [&>div]:p-4 overflow-x-auto"
    >
      <P.BX
        el="div"
        className="text-md border-b-[1px] border-r-[1px] border-r-border-accent"
      >
        Prop
      </P.BX>
      <P.BX
        el="div"
        className="text-md text-muted border-b-[1px] border-r-[1px] border-r-border-accent"
      >
        Default
      </P.BX>
      <P.BX el="div" className="border-b-[1px]">
        Description
      </P.BX>

      {propsToDisplay.map(prop => {
        return (
          <>
            <P.BX
              el="div"
              className="border-r-[1px] border-b-[1px] border-border-accent"
            >
              <P.BX el="div" className="text-md">
                {prop.name}
                {prop.required && '*'}
              </P.BX>
              <P.BX el="div" className="text-sm text-text-light-accent ">
                {prop.type}
              </P.BX>
            </P.BX>
            <P.BX
              el="div"
              className="text-sm text-text-light-accent border-r-[1px] border-b-[1px] border-border-accent"
            >
              {prop.default ? prop.default : '-'}
            </P.BX>
            <P.BX
              el="div"
              className="text-sm border-b-[1px] border-border-accent"
            >
              {prop.description}
            </P.BX>
          </>
        )
      })}
    </P.BX>
  )
}

export {PropsTable}
