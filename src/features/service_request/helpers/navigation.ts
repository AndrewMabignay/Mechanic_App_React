import type { NavigationInstruction } from "../../../components/Map";

export function getDirectionLabel(direction: NavigationInstruction): string {
    if (direction.type === "arrive") {
        return "Arrive at destination";
    }

    if (direction.type === "depart") {
        return "Start";
    }

    if (direction.type === "roundabout") {
        return "Enter roundabout";
    }

    if (direction.type === "turn") {
        switch (direction.modifier) {
            case "left":
                return "Turn left";

            case "right":
                return "Turn right";

            case "slight left":
                return "Slight left";

            case "slight right":
                return "Slight right";

            case "sharp left":
                return "Sharp left";

            case "sharp right":
                return "Sharp right";

            case "straight":
                return "Continue straight";

            default:
                return "Continue";
        }
    }

    if (direction.type === "continue") {
        switch (direction.modifier) {
            case "left":
                return "Keep left";

            case "right":
                return "Keep right";

            default:
                return "Continue straight";
        }
    }

    return "Continue";
}
