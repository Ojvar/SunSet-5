import { ISessionDriver } from "@CORE/middlewares/core/003-express-session-middleware";
import { MemoryStore, Store } from "express-session";

/**
 * Memory session driver
 */
export default class MemorySessionDriver implements ISessionDriver {
    /**
     * Setup session
     * @param session {ExpressSession} Session
     */
    public async setup(payload?: any): Promise<Store> {
        const memoryStore: MemoryStore = new MemoryStore();

        return memoryStore;
    }
}
