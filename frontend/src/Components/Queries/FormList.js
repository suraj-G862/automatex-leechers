import React from 'react';
import FormItem from './FormItem';

function FormList({ forms }) {
  return (
    <div className="mt-4 space-y-4">
      {forms.map((form, index) => (
        <FormItem key={index} form={form} />
      ))}
    </div>
  );
}

export default FormList;
