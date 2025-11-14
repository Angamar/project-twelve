#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

// Get the component name from CLI args
const componentName = process.argv[2];

if (!componentName) {
  console.error(
    "❌ Please provide a component name: yarn create-component MyComponent",
  );
  process.exit(1);
}

// Required for resolving paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define target directory
const componentDir = resolve(
  __dirname,
  "packages",
  "ui",
  "src",
  "components",
  componentName,
);

if (existsSync(componentDir)) {
  console.error(`❌ Component "${componentName}" already exists.`);
  process.exit(1);
}

mkdirSync(componentDir, { recursive: true });

// Lowercase name for CSS class
const className = `${componentName.toLowerCase()}Section`;

// Generate ComponentName.tsx
const componentTsx = `interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export default function ${componentName}({ children, className }: ${componentName}Props) {
  return (
    <section className={className}>
      <div className={styles.${className}}>
        ${componentName} Component
        {children}
      </div>
    </section>
  );
}`;

// Generate ComponentName.module.css
const componentCss = `.${className} {
  /* Add your component styles here */
}`;

// Generate ComponentName.test.tsx
const componentTest = `import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>${componentName} content</${componentName}>);
    expect(screen.getByText('${componentName} Component')).toBeInTheDocument();
  });
});`;

// Generate index.ts
const indexFile = `export { default } from './${componentName}';`;

// Write files
const files = [
  [`${componentName}.tsx`, componentTsx],
  [`${componentName}.module.css`, componentCss],
  [`${componentName}.test.tsx`, componentTest],
  [`index.ts`, indexFile],
];

files.forEach(([filename, content]) => {
  const filePath = join(componentDir, filename);
  writeFileSync(filePath, content, "utf8");
});

console.log(`✅ Component "${componentName}" created successfully!`);
console.log(`📁 Location: ${componentDir}`);
console.log(`📄 Files created:`);
files.forEach(([filename]) => console.log(`   - ${filename}`));
console.log(`\n🎨 Don't forget to add the missing import for styles in ${componentName}.tsx`);