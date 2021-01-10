import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { KeyboardType, NativeSyntheticEvent, ReturnKeyType, TextInput, TextInputProps, TextInputSubmitEditingEventData } from 'react-native';

import { useField } from '@unform/core';
interface IInputProps{
  name:string;
  isPassword?:boolean;
  keyType?:ReturnKeyType
  onSubmit:any;
  refInput:RefObject<TextInput>;
  keyBoardStyle?:KeyboardType;
}
interface InputValue{
  value:string;
}
const Input:React.FC<IInputProps> = ({ name, keyType, keyBoardStyle, isPassword =false,refInput, onSubmit, ...rest }:IInputProps) =>{
  
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputValueRef = useRef<InputValue>({value:defaultValue});


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextInput
    keyboardType={keyBoardStyle}
    ref={refInput}
    onSubmitEditing={onSubmit}
    returnKeyType={keyType}
      keyboardAppearance="dark"
      secureTextEntry={isPassword}
      defaultValue={defaultValue}
      onChangeText={value => {
        if (inputValueRef.current) {
          inputValueRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
};

export default Input;