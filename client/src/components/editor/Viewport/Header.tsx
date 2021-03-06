import React from 'react';
import { useEditor } from '@craftjs/core';
import {Button} from "@material-ui/core";

export const Header = () => {
  const {
    enabled,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
      <div className="items-center flex w-full px-4 ">
        <div className="flex-1">
          <h2 className="mr-5 text-xl">craft.js</h2>
        </div>
        <div className="flex items-end justify-end">
          <a href={process.env.url['BASIC_EXAMPLE']}>Another Example</a>
          <a href="https://github.com/prevwong/craft.js">Github</a>
          <a href={process.env.url['DOCUMENTATION']}>Documentation</a>
        </div>
        <div className="flex">
          <Button
            onClick={() => {
              setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? 'Finish Editing' : 'Edit'}
          </Button>
        </div>
      </div>
  );
};
