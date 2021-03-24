import { MemoryStore, Store } from "express-session";

import { ISessionDriver } from "../middlewares/core/002-express-session-middleware";

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
