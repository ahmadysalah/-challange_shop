import { Field, FieldProps } from "formik";
import { Select, ErrorMessage, Label } from "./FormSelect.styled";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";

interface IProps {
  name: string;
  label: string;
  data: {
    label: string;
    value: string | number;
  }[];
  multiple?: boolean;
}

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: 200
    },
  },
};
const FormSelect = (props: IProps) => {

  return (
    <Field name={props.name}>
      {({ field, meta, form }: FieldProps) => (
        <>
          {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
          <Select
            multiple={props?.multiple}
            multiline
            displayEmpty
            value={field.value}
            onChange={(e: SelectChangeEvent<any>) => {

              if (e.target?.value?.length > 3) {

                form.setFieldError(props.name, meta?.error)
                form.setFieldTouched(props.name, true)
                // return
              }

              form.setFieldValue(props.name, e.target.value)
              e.stopPropagation()

            }
            }
            MenuProps={MenuProps}

          >
            {props.data.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {meta?.touched && meta?.error && (
            <ErrorMessage>{meta?.error}</ErrorMessage>
          )}
        </>
      )}
    </Field>
  );
};

export default FormSelect;
