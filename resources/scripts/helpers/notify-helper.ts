/**
 * NotifyTypeEnum
 */
export enum NotifyTypeEnum {
    INFO = "info",
    WATNING = "watning",
    SUCCESS = "success",
    DANGER = "danger",
    SILLY = "silly",
}

/**
 * Export notify-helper
 */
export class NotifyHelper {
    /**
     * Show notify alarm
     * @param type
     * @param buefy
     * @param message
     * @param title
     */
    public static notify(
        type: NotifyTypeEnum,
        buefy: any,
        message: string,
        title?: string
    ): void {
        alert(`${type}\t${title}\n\t${message}`);
    }

    /**
     * Show info alarm
     * @param buefy
     * @param message
     * @param title
     */
    public static info(buefy: any, message: string, title?: string): void {
        this.notify(NotifyTypeEnum.INFO, buefy, message, title);
    }

    /**
     * Show danger alarm
     * @param buefy
     * @param message
     * @param title
     */
    public static danger(buefy: any, message: string, title?: string): void {
        this.notify(NotifyTypeEnum.DANGER, buefy, message, title);
    }

    /**
     * Show warning alarm
     * @param buefy
     * @param message
     * @param title
     */
    public static warning(buefy: any, message: string, title?: string): void {
        this.notify(NotifyTypeEnum.WATNING, buefy, message, title);
    }

    /**
     * Show success alarm
     * @param buefy
     * @param message
     * @param title
     */
    public static success(buefy: any, message: string, title?: string): void {
        this.notify(NotifyTypeEnum.SUCCESS, buefy, message, title);
    }

    /**
     * Show silly alarm
     * @param buefy
     * @param message
     * @param title
     */
    public static silly(buefy: any, message: string, title?: string): void {
        this.notify(NotifyTypeEnum.SILLY, buefy, message, title);
    }
}
