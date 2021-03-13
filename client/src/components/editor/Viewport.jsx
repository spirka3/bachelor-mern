import React, { useState } from 'react';
import cx from 'classnames';

export const Viewport = ({ children }) => {

  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className={cx(['viewport'], {
        loaded: true,
        'mouse-enabled': true,
      })}
    >
      {/*<Header />*/}
      <div
        style={{ paddingTop: '59px' }}
        className={cx([
          'flex h-full overflow-hidden flex-row w-full',
          {
            'h-full': !enabled,
            fixed: enabled,
            relative: !enabled,
          },
        ])}
      >
        {/*<Toolbox />*/}
        <div className="flex-1 h-full">
          <div className="w-full h-full">
            <div
              className={cx([
                'craftjs-renderer h-full w-full transition pb-8',
                {
                  'overflow-auto': enabled,
                  'bg-renderer-gray': enabled,
                },
              ])}
            >
              <div
                className={cx([
                  'relative flex-col flex items-center',
                  {
                    'pt-8': enabled,
                  },
                ])}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
        {/*<Sidebar />*/}
      </div>
    </div>
  );
};
