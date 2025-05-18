# Dream Website Templates

![Version](https://img.shields.io/badge/version-1.0.8-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A React component for an Website Templates styled with Tailwind CSS.

## Installation

You can install this package using npm or yarn:

```sh
npm install website-templates
```

or

```sh
yarn add website-templates
```

## Usage

Import and use the component in your React application:

```jsx
import React from "react";
import { useParams } from "next/navigation";
import { WebsiteTemplates } from "website-templates";

export default function page() {
  const { websiteId } = useParams();

  return <WebsiteTemplates websiteId={websiteId} />;
}
```

---

## Props

| Prop        | Type     | Description              |
| ----------- | -------- | ------------------------ |
| `websiteId` | `string` | For getting website info |

---

## Styling

This component is built with Tailwind CSS, so make sure your project is configured to use Tailwind.

## License

This project is licensed under the MIT License.

# website-template-package

# website-template-package
