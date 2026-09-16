# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

```tsx
import { CheckCircle2, ChevronRight, Wrench } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { ServiceRequest } from "../types/serviceRequest";

interface MechanicInProgressContainerProps {
    request: ServiceRequest;
    onViewDetails: () => void;
    onComplete: () => void;
    isCompleting?: boolean;
}

export default function MechanicInProgressContainer({
    request,
    onViewDetails,
    onComplete,
    isCompleting = false,
}: MechanicInProgressContainerProps) {
    const cyclist = request.cyclist?.user;

    const cyclistName =
        `${cyclist?.first_name ?? ""} ${cyclist?.last_name ?? ""}`.trim() ||
        "Unknown Cyclist";

    const bikeProblem = request.bike_problem?.name ?? "Bike Problem";

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fc4c02]/10">
                    <Wrench className="h-5 w-5 text-[#fc4c02]" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#fc4c02]">
                        Repair in Progress
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-900">
                        {cyclistName}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
                    <span className="text-xs font-medium text-[#fc4c02]">
                        In Progress
                    </span>
                </div>
            </div>

            {/* Request Summary */}
            <button
                type="button"
                onClick={onViewDetails}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
            >
                <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Bike Problem</p>

                    <p className="truncate text-sm font-medium text-gray-900">
                        {bikeProblem}
                    </p>

                    {request.description && (
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                            {request.description}
                        </p>
                    )}
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
            </button>

            {/* Complete Button */}
            <div className="border-t border-gray-100 px-4 py-3">
                <Button
                    type="button"
                    onClick={onComplete}
                    disabled={isCompleting}
                    className="h-11 w-full rounded-xl bg-[#fc4c02] font-medium text-white hover:bg-[#e64500]"
                >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {isCompleting ? "Completing..." : "Complete Service"}
                </Button>
            </div>
        </div>
    );
}
```

Then sa `MechanicHomeComponent`, idagdag mo yung condition for `in_progress`:

```tsx
const isInProgress = currentRequest?.status === "in_progress";
```

Import:

```tsx
import MechanicInProgressContainer from "../../service_request/components/MechanicInProgressContainer";
```

Then sa bottom container, **before `isEnRoute` / `isAccepted`**, ilagay:

```tsx
{isInProgress && currentRequest ? (
    <MechanicInProgressContainer
        request={currentRequest}
        onViewDetails={() => {
            setSelectedRequest(currentRequest);
            setCyclistInfoOpen(true);
        }}
        onComplete={handleComplete}
        isCompleting={false}
    />
) : isEnRoute && currentRequest ? (
    <MechanicEnRouteContainer
        request={currentRequest}
        onViewDetails={() => {
            setSelectedRequest(currentRequest);
            setCyclistInfoOpen(true);
        }}
    />
) : isAccepted && currentRequest ? (
    // existing...
) : (
    // existing...
)}
```

For `handleComplete`, kailangan natin gamitin yung existing **complete service-request mutation** mo. Kung wala pa yung hook/mutation, send mo yung current `useMechanicCurrentServiceRequest.ts` para maidagdag natin nang tugma sa existing code mo.
