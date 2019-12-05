import { validate } from '@babel/types';
import { Omit } from '@/utils';
import * as PropTypes from 'prop-types'

export interface IFormProps extends React.HTMLAttributes<HTMLFormElement>{
  labelWidth?:number
   showColon?:boolean
}

export const propTypes={
  labelWidth:PropTypes.number,
  showColon:PropTypes.bool
}

export interface IItemProps extends React.HTMLAttributes<HTMLDivElement>{
  className:string
  label:string
  field:string
  errorMessage:string
  shouldValidate:boolean
  rule:any[]
  required:boolean
}

export type formType={
  resetValidate:()=>void
  validate:()=>void
}

export interface IForm extends React.ForwardRefExoticComponent<
IFormProps & React.RefAttributes<HTMLFormElement>
> {
Item:React.ReactNode
}

export const defaultProps:Partial<IFormProps>={
  showColon:true
  }

  export interface IRule{
    field:string
    rule:any[]
    ref:React.Ref<any>
  }

  export type validateType= (field:string, rule:any[], ref:React.Ref<any>) => void

  export interface IContext{
    labelWidth:number
    showColon:boolean
    collect:validateType
    collectedMap:Omit<IRule,'field'>
    validateItem:validateType
    hasValidate:boolean
  }