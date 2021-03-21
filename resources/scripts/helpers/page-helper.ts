/**
 * Page helper
 */
export class PageHelper {
    /**
     * Redirect to specified url
     * @param url string Url
     */
    public static redirect(url: string): void {
        window.location.href = url;
    }
}
