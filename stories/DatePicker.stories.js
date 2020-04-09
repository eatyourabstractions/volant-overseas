import React from 'react';
import { action } from '@storybook/addon-actions';

import DatePicker from '../pages/components/AutomaticForm/DatePicker';

export default {
  component: DatePicker,
  title: 'DatePicker',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

 const data = {
  id: '1',
  label: 'registration Date'
};


export const Default = () => <DatePicker info={ data}  />;


