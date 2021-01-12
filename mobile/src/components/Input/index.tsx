import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { KeyboardType, NativeSyntheticEvent, ReturnKeyType, TextInput, TextInputProps, TextInputSubmitEditingEventData } from 'react-native';
import { Container, FieldContent, FieldsTitle, InputField  } from './styles';
import { useField } from '@unform/core';
interface IInputProps {
  name: string;
  isPassword?: boolean;
  keyType?: ReturnKeyType
  onSubmit: any;
  refInput: RefObject<TextInput>;
  keyBoardStyle?: KeyboardType;
  icon?: string
  iconColor?: string;
  title?: string;
}
interface InputValue {
  value: string;
}
const Input: React.FC<IInputProps> = ({ name, title, keyType, keyBoardStyle, icon, iconColor, isPassword = false, refInput, onSubmit, ...rest }: IInputProps) => {

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputValueRef = useRef<InputValue>({ value: defaultValue });


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {title ? <FieldsTitle>
        {title}
      </FieldsTitle>
        : null}

      <FieldContent>
        {icon ?
          <Icon name={icon} color={iconColor} size={20} />
          : null
        }
        <InputField
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
        {
          error ?
            <Icon name="cancel" size={14} color="#f81027" />
            : null
        }
      </FieldContent>
      {error ? error : null}
    </Container>
  );
};

export default Input;