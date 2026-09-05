const API_URL = import.meta.env.VITE_API_URL;

export function getImageUrl(path?: string | null) {
    if (!path) return "";

    if (path.startsWith("http")) {
        return path;
    }

    return `${API_URL}/storage/${path}`;
}