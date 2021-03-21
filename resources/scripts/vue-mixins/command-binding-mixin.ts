/**
 * CommandBinding payload Type
 */
export type CommandBindingPayloadType = {
    sender: any;
    data: {
        data: any;
        command: string;
    };
};

/**
 * Command binding mixin
 */
export const CommandBindingMixin = () => ({
    methods: {
        /**
         * Emit command
         */
        emitCommand(command: any, data?: any): void {
            this.$emit("on-command", {
                sender: this,
                data: {
                    data,
                    command,
                },
            } as CommandBindingPayloadType);
        },
    },
});
