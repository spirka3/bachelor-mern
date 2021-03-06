import React from 'react';
import cx from 'classnames';
import { useEditor } from '@craftjs/core';
import { Toolbox } from './Toolbox';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Viewport: React.FC = ({ children }) => {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      className={cx(['viewport'], {
        loaded: true,
        'mouse-enabled': true,
      })}
    >
      <Header />
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
        <Toolbox />
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
              ref={(ref) =>
                connectors.select(connectors.hover(ref, null), null)
              }
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
        <Sidebar />
      </div>
    </div>
  );
};
