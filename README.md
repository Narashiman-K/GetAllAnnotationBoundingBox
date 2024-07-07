# Disclaimer
This software is provided as-is, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

The user is solely responsible for determining the appropriateness of using or redistributing the software and assumes any risks associated with the exercise of permissions under the license.

# PSPDFKit for Web Example – Vite.js with React app

This example shows How to get all Annotations on the page with coordinates. It shows how to create annotations from clipboard data. It shows how to cut, copy, and paste annotations between pages. It also shows how to jump and zoom into the annotations based on the bounding box values. or just jump to the next annotation without zooming into the annotation. 

## Prerequisites

- [Node.js](http://nodejs.org/)

Are you [evaluating our SDK](https://pspdfkit.com/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://pspdfkit.com/sales/
## Support, Issues and License Questions
PSPDFKit offers support for customers with an active SDK license via https://pspdfkit.com/support/request/


## Getting Started

Clone the repo:

```bash
git clone https://github.com/Narashiman-K/GetAllAnnotationBoundingBox.git
cd GetAllAnnotationBoundingBox
```

Install the project dependencies:

```shell script
npm install
```

## Running the Example

We are ready to launch the app to check the functionality! 🎉

```shell script
npm run dev
```

You can now open http://localhost:5173 in your browser and enjoy!

To create a production build of the app and serve it:

```shell script
npm run build
npm run preview
```

You can now preview your build http://localhost:4173 in your browser.

Enjoy 🍕

## React Component

The React component which implements the PSPDFKit for Web integration can be found at `src/components/PdfViewerComponent.jsx`.

In order to make the PSPDFKit SDK assets available they have to be copied from the `node_modules/pspdfkit/dist` folder to `public/pspdfkit-lib` folder. For that purpose this example uses a copy plugin which you can find at `vite.config.js`.

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://pspdfkit.com/guides/web/current/miscellaneous/contributing/) so that we can accept your contributions.
