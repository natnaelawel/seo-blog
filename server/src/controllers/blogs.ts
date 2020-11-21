import { Request, Response } from "express";

export const getBlogs = (_req: Request, res: Response) => {
  res.json({ message: "Blogs" });
};

// {
//     "compilerOptions": {
//         "module": "commonjs",
//         "esModuleInterop": true,
//         "allowSyntheticDefaultImports": true,
//         "target": "es6",
//         "noImplicitAny": true,
//         "moduleResolution": "node",
//         "sourceMap": true,
//         "outDir": "dist",
//         "baseUrl": ".",
//         "paths": {
//             "*": [
//                 "node_modules/*",
//                 "src/types/*"
//             ]
//         }
//     },
//     "include": [
//         "src/**/*",
//         "next-env.d.ts",
//         "src/**/*.ts",
//         "src/**/*.tsx"
//     ]
// }
