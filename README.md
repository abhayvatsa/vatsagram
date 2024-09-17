# 📸 Vatsagram

A minimalistic, unbranded, performant web application for photos. Written in
[React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and
[Next.js](https://nextjs.org/docs). Using
[Sharp](https://github.com/lovell/sharp) for image processing. Deployed on
[Vercel](https://vercel.com/).

The purpose of this application is to render a photo site with optimal speed. To achieve this, the layout and initial HTML load are optimized for a fast user experience. Images are processed using Sharp to generate various responsive sizes, with a minimal number of low-resolution, blurred versions injected into the initial HTML as base64-encoded strings. The remaining base64-encoded images are loaded progressively to enhance performance.

See it live at [vatsagram.com](https://vatsagram.com).
