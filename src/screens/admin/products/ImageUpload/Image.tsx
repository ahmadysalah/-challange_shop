import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Field, FieldProps } from "formik";
import { Icon, Typography } from "@mui/material";
import { ImageWrapper } from "../Products.styled";
import { notify } from "../../../../utils/helpers";

const Image = () => {
  return (
    <ImageWrapper htmlFor="images">
      <Field name="images">
        {({ field, form }: FieldProps) => (
          <>
            <input
              id="images"
              type={"file"}
              multiple
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target && e.target.files && e.target.files.length > 4) {
                  notify("error", "please  don  take  more  than  for  items")
                  form.setFieldError("images", "please  don  take  more  than  for  items")
                  form.setFieldTouched("images", true)
                  return
                }

                form.setFieldValue("images", e.target.files);
              }}
              onFocus={(e) => {
                form.setFieldTouched("images", true);
              }}
            />
            {console.log("formform", form)}
            {field.value && field.value?.[0] ? (
              <img
                src={
                  typeof field.value?.[0] === "object"
                    ? URL.createObjectURL(field.value?.[0])
                    : field.value?.[0]
                }
                alt="images"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <>
                <Icon component={CloudUploadIcon} />
                <Typography variant="caption" color="text.secondary">
                  Product Images (4 images allowed)
                </Typography>
              </>
            )}
          </>
        )}
      </Field>



    </ImageWrapper>
  );
};

export default Image;
