Here’s your fixed and complete `README.md` content with all markdown code blocks and formatting properly closed and aligned:

```md
# Dream Website Templates

![Version](https://img.shields.io/badge/version-1.0.8-blue.svg)  
![License](https://img.shields.io/badge/license-MIT-green.svg)

A React component for Website Templates styled with Tailwind CSS.
```

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

## Environment Variables

To properly configure the package, your project **must** include the following environment variable:

```env
NEXT_PUBLIC_MODE="staging"
NEXT_PUBLIC_GOLD_API_STAGING_ENDPOINT="wss://staging.karnaphulijewellery.com/api"
```

This variable is used internally by the package to determine the operating mode and fetch relevant data.

Make sure to add it to your `.env.local` or environment configuration before running your app.

---

## Styling

This component is built with Tailwind CSS, so make sure your project is configured to use Tailwind.

## License

This project is licensed under the MIT License.
