---
'@toptal/picasso': minor
---

---

### Carousel

- add new component Carousel component using Glider.js
- for more details, you can check examples in [the storybook](https://picasso.toptal.net/?path=/story/components-carousel--carousel)

```jsx
<Carousel slidesToShow={2} autoplay hasArrows hasDots rewind>
  <div>slide 1</div>
  <div>slide 2</div>
  <div>slide 3</div>
</Carousel>
```

### useInterval

- new reusable hook that is an abstraction over `setInterval` and `clearInterval`

```jsx
useInterval({
  callback: () => console.log('do anything on every tick'),
  delay: 1000,
  // for example we you might want to pause the interval
  // until the component is visible on screen
  pause: true,
})
```

### useMouseEnter

- new reusable hook `useMouseEnter` that returns `true`
  when the mouse enters the element and `false` on leave

```jsx
const elementRef = useRef(null)
const hasMouseEnter = useMouseEnter(elementRef)

return <div ref={elementRef} />
```

### useOnScreen

- new reusable hook `useOnScreen` which is abstraction over [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

```jsx
const elementRef = useRef(null)
const isVisibleOnScreen = useOnScreen({
  ref: elementRef,
  // optional
  root: null,
  rootMargin: 0,
  threshold: 0,
})

return <div ref={elementRef} />
```
