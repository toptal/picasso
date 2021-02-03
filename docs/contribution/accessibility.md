# Accessibility

We want projects using `Picasso` to be accessible to all users, so they can understand, navigate, and interact with the app.

To detect and fix the a11y issues, we have an addon in the Storybook. Here are the steps to open it:

1. Go to a component's page you want to check.
2. Click on the 3 dots icon in the top left corner and choose `Show addons` (or just press `A`).
3. Click on `Accessibility` tab.

![a11y-addon](https://user-images.githubusercontent.com/17337276/106719181-31800600-662c-11eb-9250-2e690fbd83fc.gif)

The addon displays three tabs:

- Violations - rule failed.
- Passes - rules passed.
- Incompletions - “incomplete” means that a rule does not definitely pass, but cannot quite tell whether it definitely fails.
