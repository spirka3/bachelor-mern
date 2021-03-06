import React, { useState } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text } from '../selectors';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Button } from '../selectors/Button/Button';
import { Viewport, RenderNode } from '../editor/index';
import '../styles/app.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function TestPage() {
  const [enabled] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        <Editor
          resolver={{
            Container,
            Text,
            Button
          }}
          enabled={enabled}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element canvas is={Container}
                width="800px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={['40', '40', '40', '40']}
              >
                <Text
                  fontSize="23"
                  fontWeight="400"
                  text="Craft.js is a React framework for building powerful &amp; feature-rich drag-n-drop page editors."
                />
              </Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default TestPage;
