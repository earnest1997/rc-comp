import { Button } from './Button'
import { ButtonGroup } from './ButtonGroup'
import './style'

type TButton = typeof Button & { Group: typeof ButtonGroup }
;(Button as TButton).Group = ButtonGroup

export default Button as TButton
