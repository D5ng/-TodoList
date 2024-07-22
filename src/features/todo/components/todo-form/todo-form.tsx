import { FormEventHandler } from "react"
import { Input } from "shared/@common/components"
import { useInput } from "shared/@common/hooks"
import { greaterThanMinLength, isEmpty } from "shared/@common/utils"
import type { Todo } from "features/todo/types"
import classes from "./todo-form.module.css"

interface Props {
  onCreateTodo: (todo: Todo) => void
}

export default function TodoForm(props: Props) {
  const { value, onChangeValue, onResetValue, hasError, onBlurTouched, onResetTouched } = useInput({
    defaultValue: "",
    validateFn: (value: string) => greaterThanMinLength(value, 1),
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (isEmpty(value)) return

    const newTodo: Todo = {
      id: new Date().getTime(),
      title: value,
      isDone: false,
    }

    props.onCreateTodo(newTodo)
    onResetValue()
    onResetTouched()
  }

  const isDisabled = isEmpty(value) || hasError

  return (
    <form
      className={`${classes["todo-form"]} ${hasError ? classes["todo-form__invalid"] : ""}`}
      onSubmit={handleSubmit}
    >
      <legend className={classes["todo-form__legend"]}>Add Task</legend>
      <Input
        type="text"
        placeholder="Add Task here"
        id={"todo-form-input"}
        value={value}
        onChange={onChangeValue}
        className={classes["todo-form__input"]}
        onBlur={onBlurTouched}
      />
      {hasError && <p className={classes["todo-form__error"]}>유효하지 않은 입력값이에요.</p>}
      <button className={classes["todo-form__submit"]} disabled={isDisabled}>
        SAVE
      </button>
    </form>
  )
}
