# TLDR

## Image resizing

Resize a portrait or paysage image to a 4000x4000px max or image size if width and/or height is under 4k.

Two versions are computed:

- A squared one for instagram post
- A native ratio one for twitter

#### Dependencies

- [sharp](https://github.com/lovell/sharp)

#### To define

To compute the `DEFAULT_PADDING_RATIO` constant :

```js
// padding: padding in px you want for a 1000x1000 image
const DEFAULT_PADDING_RATIO = padding / 1000 / 2
```
