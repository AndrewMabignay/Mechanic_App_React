const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

export function getImageUrl(path?: string | null) {
    if (!path) return "";

    if (path.startsWith("https")) {
        return path;
    }

    if (path.startsWith("http")) {
        return path;
    }

    return `${IMAGE_URL}/storage/${path}`;
}
