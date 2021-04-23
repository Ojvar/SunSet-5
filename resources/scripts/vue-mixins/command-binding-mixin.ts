import { Vue } from "@Scripts/vendors/vue";

/**
 * CommandBinding payload Type
 */
export type CommandBindingPayloadType<T = any> = {
    sender: any;
    data: {
        data: T;
        command: string;
    };
};

/**
 * Command binding mixin
 */
export const CommandBindingMixin = () => {
    return Vue.extend({
        methods: {
            /**
             * Emit command
             * @param command {any}
             * @param data? {any}
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
};
