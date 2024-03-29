import css from 'styled-jsx/css';

// Theme inspired by: https://docs.microsoft.com/_themes/docs.theme/master/en-us/_themes/styles/e21f92b6.site-ltr.css
export default css.global`
  @media (prefers-color-scheme: dark) {
    :root {
      --theme-text: #e3e3e3;
      --theme-body-background: #171717;
      --theme-border: #454545;
    }
  }

  @media (prefers-color-scheme: light) {
    :root {
      --theme-text: #171717;
      --theme-body-background: #fafafa;
      --theme-border: #e3e3e3;
    }
  }

  html,
  body {
    background-color: var(--theme-body-background);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: var(--theme-text);
  }
`;
