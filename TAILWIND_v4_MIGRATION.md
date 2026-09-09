# Tailwind CSS v4 Migration Guide for Picasso

This document outlines all changes from Tailwind CSS v3 to v4 and their impact on Picasso and consumer projects.

---

## 1. Browser Requirements

### Short Title

**Modern Browser Requirements**

### Official Documentation Quote

> "Tailwind CSS v4.0 is designed for modern browsers and targets Safari 16.4, Chrome 111, and Firefox 128. We depend on modern CSS features like `@property` and `color-mix()` for core framework features, and Tailwind CSS v4.0 will not work in older browsers.
>
> If you need to support older browsers, we recommend sticking with v3.4 for now. We're actively exploring a compatibility mode to help people upgrade sooner that we hope to share more news on in the future."

### What Needs to be Changed in This Repo (Picasso)

- ✅ **No changes needed** - Browser support already verified
- Analysis concluded on toptal.com website and subpages
- Browser versions covering 95% of users are compatible
- Documentation: https://toptal-core.atlassian.net/wiki/spaces/GE/pages/3131539534/List+of+supported+browsers+for+toptal.com

### What Needs to be Changed in Consumer Repos

- Verify browser support requirements match v4 minimums (Safari 16.4+, Chrome 111+, Firefox 128+). But most likely they don't need to do anything, because toptal.com/\* users already use new browsers.

### Complexity Score: **0/10**

- No code changes needed
- Only verification/documentation required

---

## 2. Removed @tailwind Directives

### Short Title

**@tailwind Directives Replaced with @import**

### Official Documentation Quote

> "In v4 you import Tailwind using a regular CSS `@import` statement, not using the `@tailwind` directives you used in v3:
>
> ````css
> /* v3 */
> @tailwind base;
> @tailwind components;
> @tailwind utilities;
>
> /* v4 */
> @import "tailwindcss";
> ```"
> ````

### What Needs to be Changed in This Repo (Picasso)

- Update `cypress/assets/tailwind.css`:

  ```css
  /* Before */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* After */
  @layer theme, base, components, utilities;
  @import 'tailwindcss/theme.css' layer(theme);
  @import 'tailwindcss/utilities.css' layer(utilities);
  @config "../../tailwind.config.js";
  ```

- Update `packages/base/Test-Utils/src/test-utils/styles.css`:

  ```css
  /* Before */
  @tailwind components;
  @tailwind utilities;

  /* After */
  @layer theme, base, components, utilities;
  @import 'tailwindcss/theme.css' layer(theme);
  @import 'tailwindcss/utilities.css' layer(utilities);
  @config "../../../../tailwind.config.js";
  ```

- **Note:** We omit `preflight.css` import to disable preflight (replaces `corePlugins: { preflight: false }`)

### What Needs to be Changed in Consumer Repos

- **ALL projects must update their CSS files:**
  - Replace `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` with `@import` statements
  - Add `@config "./tailwind.config.js"` directive
  - If preflight was disabled, use individual imports omitting `preflight.css`
- **Example migration:**

  ```css
  /* Before (v3) */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* After (v4) - with preflight disabled */
  @layer theme, base, components, utilities;
  @import 'tailwindcss/theme.css' layer(theme);
  @import 'tailwindcss/utilities.css' layer(utilities);
  @config "./tailwind.config.js";
  ```

### Complexity Score: **3/10**

- Mechanical replacement in CSS files
- Low risk, but affects all CSS files
- Upgrade tool should handle most cases
- Path resolving in CSS `@config "../../../../tailwind.config.js"` might be tricky in some cases and needs extra attention.

---

## 3. Removed and Renamed Utilities

### Short Title

**Deprecated Utilities Removed, Utility Classes Renamed, and Important Modifier Position Changed**

### Official Documentation Quote

> "We've removed any utilities that were deprecated in v3 and have been undocumented for several years. Here's a list of what's been removed along with the modern alternative:
>
> | Deprecated              | Replacement                                       |
> | ----------------------- | ------------------------------------------------- |
> | `bg-opacity-*`          | Use opacity modifiers like `bg-black/50`          |
> | `text-opacity-*`        | Use opacity modifiers like `text-black/50`        |
> | `border-opacity-*`      | Use opacity modifiers like `border-black/50`      |
> | `divide-opacity-*`      | Use opacity modifiers like `divide-black/50`      |
> | `ring-opacity-*`        | Use opacity modifiers like `ring-black/50`        |
> | `placeholder-opacity-*` | Use opacity modifiers like `placeholder-black/50` |
> | `flex-shrink-*`         | `shrink-*`                                        |
> | `flex-grow-*`           | `grow-*`                                          |
> | `overflow-ellipsis`     | `text-ellipsis`                                   |
> | `decoration-slice`      | `box-decoration-slice`                            |
> | `decoration-clone`      | `box-decoration-clone`                            |
>
> We've also renamed the following utilities in v4 to make them more consistent and predictable:
>
> | v3             | v4               |
> | -------------- | ---------------- |
> | `shadow-sm`    | `shadow-xs`      |
> | `shadow`       | `shadow-sm`      |
> | `rounded-sm`   | `rounded-xs`     |
> | `rounded`      | `rounded-sm`     |
> | `outline-none` | `outline-hidden` |
> | `ring`         | `ring-3`         |
>
> We've renamed the default shadow, radius and blur scales to make sure every utility has a named value. The 'bare' versions still work for backward compatibility, but the `<utility>-sm` utilities will look different unless updated to their respective `<utility>-xs` versions."
>
> Additionally, the important modifier position has changed in v4:
>
> ```html
> <!-- Before (v3) -->
> <div class="!flex !bg-red-500 hover:!bg-red-600"></div>
>
> <!-- After (v4) -->
> <div class="flex! bg-red-500! hover:bg-red-600!"></div>
> ```
>
> The old way is still supported for compatibility but is deprecated."

### What Needs to be Changed in This Repo (Picasso)

- Run `npx @tailwindcss/upgrade` - should auto-fix most cases (including important modifier position change)
- Manual fixes may be needed for arbitrary values like `bg-opacity-[32]` → `bg-black/[0.32]`
- Update test assertions that check for old class names also should be manual and will not be covered by automated tool
- **Note:** Important modifier change is backward compatible - old syntax (`!flex`) still works, migration is optional

### What Needs to be Changed in Consumer Repos

- **High impact** - Many projects likely use these utilities
- Run `npx @tailwindcss/upgrade` - should handle most cases automatically (including important modifier position change)
- **Critical:** Visual regression testing required for renamed utilities
  - `shadow-sm` → `shadow-xs` (different visual appearance)
  - `rounded` → `rounded-sm` (different border radius)
  - `outline-none` → `outline-hidden` (behavior change)
  - `ring` → `ring-3` (different ring width)
- Manual review needed for:
  - Arbitrary opacity values (e.g., `bg-opacity-[32]`)
  - Test assertions that check for old class names
- Update any custom utilities or class merging logic that references these
- **Note:** Important modifier change (`!flex` → `flex!`) is backward compatible - old syntax still works, migration is optional

### Complexity Score: **3/10**

- Mostly automated via `npx @tailwindcss/upgrade` tool
- Low effort, but requires testing
- Some manual fixes for edge cases (arbitrary values)
- Visual regression testing recommended for renamed utilities

---

## 4. PostCSS/Vite Plugin Changes

### Short Title

**PostCSS Plugin Moved to @tailwindcss/postcss Package**

### Official Documentation Quote

> "In v3, the `tailwindcss` package was a PostCSS plugin, but in v4 the PostCSS plugin lives in a dedicated `@tailwindcss/postcss` package.
>
> Additionally, in v4 imports and vendor prefixing is now handled for you automatically, so you can remove `postcss-import` and `autoprefixer` if they are in your project.
>
> If you're using Vite, we recommend migrating from the PostCSS plugin to our new dedicated Vite plugin for improved performance and the best developer experience."

### What Needs to be Changed in This Repo (Picasso)

- **Files to update:**

  - `.storybook/main.js` - Change PostCSS plugin from `tailwindcss` to `@tailwindcss/postcss`

    ```js
    // Before
    plugins: {
      tailwindcss: {
        config: require.resolve('../tailwind.config.js'),
      },
      autoprefixer: {},
    }

    // After
    plugins: {
      '@tailwindcss/postcss': {}, // Config comes from @config in CSS
      // Remove: autoprefixer
    }
    ```

  - `cypress.config.mjs` - Same changes as Storybook

### What Needs to be Changed in Consumer Repos

- **ALL projects must update:**

  - **Webpack configs:** Change `tailwindcss` plugin to `@tailwindcss/postcss`
    ```js
    // webpack.config.js
    plugins: {
      '@tailwindcss/postcss': {}, // Config from @config in CSS
      // Remove: autoprefixer
    }
    ```
  - **Vite configs:** Migrate to `@tailwindcss/vite` plugin (recommended)

    ```js
    // vite.config.ts
    import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
      plugins: [tailwindcss()],
    })
    ```

  - **PostCSS configs:** Update plugin name
  - **Package dependencies:** Add `@tailwindcss/postcss` or `@tailwindcss/vite`, remove `autoprefixer`

- Test all build pipelines after changes

### Complexity Score: **5/10**

- Requires updating build configurations
- Need to test build pipelines thoroughly
- Storybook/Vite projects need special attention
- Medium effort, but critical for builds to work

---

## 5. Prefix Syntax Change

### Short Title

**Prefixes Now Look Like Variants**

### Official Documentation Quote

> "Prefixes now look like variants and are always at the beginning of the class name:
>
> ```html
> <!-- Before -->
> <div class="tw-flex tw-bg-red-500 tw:hover:bg-red-600"></div>
>
> <!-- After -->
> <div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600"></div>
> ```
>
> When using a prefix, you should still configure your theme variables as if you aren't using a prefix."

### What Needs to be Changed in This Repo (Picasso)

- ✅ **No changes needed** - Picasso doesn't use prefixes

### What Needs to be Changed in Consumer Repos

- **Low impact** - Only affects projects using prefixes
- Only `client-signup` repo uses prefixes (might be more repos, hard to find)
- **Migration steps:**
  1. Search for prefix usage: `cc-`, `tw-`, etc.
  2. Replace: `cc-` → `cc:`, `tw-` → `tw:`
  3. Update any prefix configuration in `tailwind.config.js` if needed
  4. Test prefix functionality
- **Example:**

  ```html
  <!-- Before -->
  <div class="cc-bg-red cc-hover:bg-red-600"></div>

  <!-- After -->
  <div class="cc:bg-red cc:hover:bg-red-600"></div>
  ```

### Complexity Score: **2/10**

- Only affects projects with prefixes
- Mechanical find/replace
- Low effort, but requires coordination with affected teams

---

## 6. JavaScript Config Files Require @config Directive

### Short Title

**JavaScript Configs No Longer Auto-Detected - @config Required**

### Official Documentation Quote

> "JavaScript config files are still supported for backward compatibility, but they are no longer detected automatically in v4.
>
> If you still need to use a JavaScript config file, you can load it explicitly using the `@config` directive:
>
> ```css
> @config "../../tailwind.config.js";
> ```
>
> The `corePlugins`, `safelist`, and `separator` options from the JavaScript-based config are not supported in v4.0. To safelist utilities in v4 use `@source inline()`."

### What Needs to be Changed in This Repo (Picasso)

- **Files to update:**
  1. `tailwind.config.js` - Remove `corePlugins: { preflight: false }` (not supported)
  2. `cypress/assets/tailwind.css` - Add `@import` and `@config` directives
  3. `packages/base/Test-Utils/src/test-utils/styles.css` - Add `@import` and `@config` directives
  4. `.storybook/main.js` - Update PostCSS plugin (already uses explicit config - good)
  5. `cypress.config.mjs` - Update PostCSS plugin (already uses explicit config - good)
- **Critical: Preflight handling**
  - **Problem:** Picasso disables preflight (uses Material-UI CssBaseline instead)
  - **Solution:** Import Tailwind parts individually, omitting `preflight.css`:
    ```css
    @layer theme, base, components, utilities;
    @import 'tailwindcss/theme.css' layer(theme);
    @import 'tailwindcss/utilities.css' layer(utilities);
    @config "./tailwind.config.js";
    ```
  - Reference: https://tailwindcss.com/docs/preflight#disabling-preflight

### What Needs to be Changed in Consumer Repos

- **CRITICAL BREAKING CHANGE - ALL projects must update:**

  1. **CSS files:** Replace `@tailwind` directives with `@import` and add `@config`

     ```css
     /* Before (v3) */
     @tailwind base;
     @tailwind components;
     @tailwind utilities;

     /* After (v4) - with preflight disabled */
     @layer theme, base, components, utilities;
     @import 'tailwindcss/theme.css' layer(theme);
     @import 'tailwindcss/utilities.css' layer(utilities);
     @config "./tailwind.config.js";
     ```

  2. **tailwind.config.js:** Remove `corePlugins: { preflight: false }` if present
  3. **Webpack/PostCSS configs:** Update to use `@tailwindcss/postcss` plugin
  4. **Complex configs:** Functions like `scanWholeMonorepo()` in Staff Portal still work - just remove `corePlugins`

- **Important:** Even if webpack config passes config path to PostCSS (e.g., `tailwindcss: { config: require.resolve('../tailwind.config.js') }`), you MUST also add `@config` directive in CSS files. In v4, JavaScript configs are no longer auto-detected - the `@config` directive is the explicit way to load them.
- **For complex configs with functions:** Keep JavaScript config - cannot migrate to CSS (CSS is static)

### Complexity Score: **8/10**

- **CRITICAL BREAKING CHANGE**
- Affects all consumer projects
- Requires coordination across teams
- Preflight alternative needs careful implementation
- High effort due to breaking nature and widespread impact

---

## 7. External Package Dependencies Analysis

### Short Title

**No External Packages Block Tailwind v4 Migration**

### Analysis Summary

After running `yarn why tailwindcss` and inspecting `node_modules`:

**✅ Excellent News:**

- **No external packages require `tailwindcss` as a peer dependency**
- **No external packages have `tailwindcss` as a hard dependency** (except for internal use)
- Only internal Picasso packages (`@toptal/picasso-tailwind`, `@toptal/base-tailwind`) depend on tailwindcss

**External Packages Found (Non-blocking):**

1. **`jest-html-reporters@3.1.7`** (via `@toptal/davinci-qa`)

   - Has `tailwindcss: ^3.0.2` in **devDependencies only**
   - Used only for building/testing the reporter itself
   - **NOT a peer dependency** - won't conflict with v4
   - **Action:** No changes needed

2. **`tailwind-merge@2.3.0`** (used by `@toptal/picasso-tailwind-merge`)
   - No `tailwindcss` peer dependency
   - Works with any Tailwind version (it's just a class merger)
   - **Action:** No changes needed

---

## 8. Davinci

Davinci is a separate repo, but it uses tailwind v.3.
Shouldn't be a blocker for now, but worth to create a ticket for davinci to upgrade to tailwind v4 too.
