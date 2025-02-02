import React, {useCallback} from 'react'

interface Props {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  addNewTodo: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ name, setName, addNewTodo }) => {
  return (
    <>
    </>
  )
}

export default InputField
