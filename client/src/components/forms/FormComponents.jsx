import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import {Button, Form as F, FormControl, FormGroup, FormLabel} from "react-bootstrap"
import {upperFirst} from "lodash";
import uuid from "react-uuid";
import {ExclamationTriangle} from "react-bootstrap-icons";

// src: https://react-hook-form.com/advanced-usage/#SmartFormComponent
export function Form({ defaultValues, children, onSubmit, className, style }) {
  const methods = useForm({ defaultValues });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <F onSubmit={handleSubmit(onSubmit)} className={className} style={style}>
      {Array.isArray(children)
        ? children.map(child => {
          return child.props?.name
            ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
            : child;
        })
        : children
      }
    </F>
  );
}

export function Input({ register, name, label, placeholder, type='text', required,  ...rest }) {

  label = label ? label : name
  placeholder = placeholder ? placeholder : `Enter ${label}`

  return (
    <FormGroup>
      <FormLabel>{upperFirst(label)}</FormLabel>
      <FormControl
        name={name}
        type={type}
        placeholder={placeholder}
        ref={register}
        required={required}
        {...rest}
      />
    </FormGroup>
  )
}

export function Select({ register, options, name, label, required, ...rest }) {

  label = label ? label : name

  const selectOptions = () => {
    return (
      <>
        <option hidden value="">Select option ...</option>
        {options.map((value, i) => (
          <option key={`${value}_${i}`} value={value}>{value}</option>
        ))}
      </>
    )
  }

  return (
    <FormGroup>
      <FormLabel>{upperFirst(label)}</FormLabel>
      <FormControl
        as="select"
        name={name}
        label={label}
        ref={register({validate: v => v !== ""})}
        required
        {...rest}
        // onChange={(e) => setSelectedType(e.target.value)}
        // value={selectedType}
      >
        {selectOptions()}
      </FormControl>
    </FormGroup>
  )
}

export function Submit({ register, variant='dark', ...rest }) {
  return <Button type="submit" variant={variant} {...rest} />
}

export const Error = ({error}) => {
  if (!error) {
    return null
  }
  return <span style={{color: "red"}}><ExclamationTriangle/> {error}</span>
}
