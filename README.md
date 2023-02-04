Vue Weather-widget

Example using Webpack to bundle one or many Vue.js components into a single .js file that **can be used in any HTML/JS application.**

```html
<html>
  <body>

    ...

    <weather-widget />
    <!-- you can add many instances of the component in the same page -->
    <my-vue-component/>

    <script src="my-vue-component.js"></script>

  </body>
</html>
```

## How it works

Components are registered in `src/main.js`.

Component code is in `src/components/ComponentName.vue`.

To add a component :

- Add a `.vue` file in `src/components`
- Register the component in `src/main.js`

## Development

To test your components :

- Launch webpack : `npm run dev` (watch mode)
- Open `demo/index.html` in a browser
- Edit `src/main.js` or your component file
- Refresh the page

## Bundle a release

```
npm run build
```

File will be placed in `dist/my-vue-component.js`.

Refer to `webpack.config.js` for customization options.

## Browser compability

You may add the web component polyfill if you wish to support older browsers.

```
import 'document-register-element/build/document-register-element'
```

Thanks to @visualjerk for this proposal.
