import { Select } from "@chakra-ui/react";
import { THEME } from "../../constants";

const SelectInput = ({
  options,
  placeholder,
  width,
  register,
  registerType,
  defaultType,
}) => {
  return (
    <Select
      {...register(registerType)}
      width={width}
      borderWidth="3px"
      focusBorderColor={THEME[2]}
      borderColor={THEME[0]}
      placeholder={placeholder}
      defaultValue={defaultType}
    >
      {options.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </Select>
  );
};

export default SelectInput;
