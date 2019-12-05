import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState
} from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import {IFormProps,formType} from './type'
import { context } from './index'

const prefixCls = getPrefixCls('form')

export const Form = forwardRef(
  ({ className, labelWidth, showColon, ...restProps }:IFormProps, ref:React.Ref<formType>) => {
    const formCls = classNames(prefixCls, className)
    const [collectedMap, setCollectedMap] = useState<any>({})
    const [hasValidate, setHasValidate] = useState(false)
    const collect = useCallback((field, rule, ref) => {
      collectedMap[field] = { rule, ref }
      setCollectedMap(collectedMap)
    }, []) // eslint-disable-line
    const validateItem = useCallback(
      (field, rule, ref) => {
        const hasError = !rule(ref.current.getValue())
        collectedMap[field] = {
          rule,
          ref,
          hasError
        }
        setCollectedMap({ ...collectedMap })
      },
      [collectedMap]
    )
    useImperativeHandle(ref, () => ({
      validate: () => {
        let isValid = true
        for (const field in collectedMap) {
          const { rule, ref } = collectedMap[field]
          const hasError = rule ? !rule(ref.current.getValue()) : false
          if (hasError === true) isValid = false
          collectedMap[field] = {
            rule,
            ref,
            hasError
          }
        }
        setCollectedMap({ ...collectedMap })
        setHasValidate(true)
        return isValid
      },
      resetValidate: () => {
        for (const field in collectedMap) {
          const { rule, ref } = collectedMap[field]
          collectedMap[field] = {
            rule,
            ref,
            hasError: false
          }
        }
        setCollectedMap({ ...collectedMap })
      }
    }))
    return (
      <context.Provider
        value={{
          labelWidth,
          showColon,
          collect,
          collectedMap,
          validateItem,
          hasValidate
        }}
      >
        <form
          onSubmit={(event) => event.preventDefault()}
          className={formCls}
          {...restProps}
        />
      </context.Provider>
    )
  }
)

Form.displayName = 'Form'

Form.defaultProps = {
  showColon: true
}
