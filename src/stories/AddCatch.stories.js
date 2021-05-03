import React from 'react';

import { Button } from './AddCatch';

export default {
  title: 'Example/Add',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Add = Template.bind({});
