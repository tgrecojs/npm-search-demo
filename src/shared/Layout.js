import React from 'react'
import {ThemeProvider} from 'emotion-theming';
import { Global, css } from '@emotion/core'
import Footer from './Footer'
import theme from './theme.config';

const Layout = ({children}) => (
    <ThemeProvider theme={theme}>
    <Global styles={css`
    @import url('https://fonts.googleapis.com/css?family=Antic+Slab|Quantico');
        body {
            margin: 0;
            font-family: 'Antic Slab', serif;
            font-size: 16px;
        }
        #root {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            background: #e9f9f3;

        }
        .wrapper {
            flex: 1;
            width: 100%;
        }
        button {
                        font-family: 'Quantico', sans-serif;
                        font-size: 1.75;
        }
        `} />
        <div id="wrapper">
            {children}
        </div>
        <Footer />
    </ThemeProvider>
)

export default Layout