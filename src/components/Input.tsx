import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react"
import { cn } from "../utils"
import { Dropdown, Chip } from "."
import { User } from "../@types"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  values: User[]
}

export const Input = ({ className, values, ...props }: InputProps) => {
  const [hide, setHide] = useState(false)
  const [data, setData] = useState<User[]>([])
  const [chipData, setChipData] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = (
    e: ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    setData(values)
  }, [values])

  const removeChip = (val: User) => {
    setChipData(chipData.filter((item) => item.id !== val.id))
    setData((prevData) => [...prevData, val])
  }
  const addValues = (val: User) => {
    setChipData((prevData) => [...prevData, val])
    setData(data.filter((item) => item.id !== val.id))
    setSearch("")
    inputRef.current.focus()
  }

  const removeLast = (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.key === "Backspace") {
      setChipData((previous) => previous.slice(0, -1))
    }
  }

  const showDropdonwn = () => {
    setHide((val) => !val)
  }

  const hideDropdonwn = () => {
    setTimeout(() => {
      setHide((val) => !val)
    }, 500)
  }
  return (
    <>
      <div className='border-b-2 border-purple-600 w-1/2 mx-auto flex flex-wrap gap-x-2 gap-y-1 pb-1'>
        {chipData.length > 0
          ? chipData.map((item) => (
              <Chip key={item.id} onClick={() => removeChip(item)}>
                <div className='flex justify-center items-center gap-2'>
                  <img
                    className='inline-block rounded-full'
                    src={item.pic}
                    alt={item.name}
                    height={15}
                    width={15}
                  />
                  {item.name}
                </div>
              </Chip>
            ))
          : null}

        <input
          ref={inputRef}
          onChange={onChange}
          onKeyUp={removeLast}
          value={search}
          onFocus={showDropdonwn}
          onBlur={hideDropdonwn}
          className={cn(
            "min-w-full bg-transparent dropdown focus:outline-none  p-2 h-auto",
            className
          )}
          {...props}
        />
      </div>
      {hide ? (
        <Dropdown>
          <>
            {data
              .filter((item) =>
                search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search)
              )
              .map((item) => (
                <div
                  onClick={() => addValues(item)}
                  className='hover:bg-slate-300 px-2 py-1 cursor-default bg-slate-50 '
                  key={item.id}>
                  <div className='flex justify-between items-center gap-x-1'>
                    <img
                      className='rounded-full inline-block'
                      src={item.pic}
                      alt={item.name}
                      height={35}
                      width={35}
                    />
                    {item.name}
                    <p className='text-gray-400'>{item.email}</p>
                  </div>
                </div>
              ))}
          </>
        </Dropdown>
      ) : null}
    </>
  )
}
