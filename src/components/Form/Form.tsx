import React, { ReactNode } from "react";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import * as Yup from "yup"; // Import Yup or any other validation library you are using

interface AppFormProps<T extends FormikValues> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  validationSchema?: Yup.ObjectSchema<any>;
  enableReinitialize?:boolean
  children: ReactNode;
}

function AppForm<T extends FormikValues>({ initialValues, onSubmit, validationSchema,enableReinitialize, children }: AppFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps: FormikProps<T>) => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
