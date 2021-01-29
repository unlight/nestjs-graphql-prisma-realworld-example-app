/**
 * Base abstract class with empty methods.
 * Created for easy mocking by testing tools.
 */
export class DummyRepository {
    findFirst(...args: unknown[]): unknown {
        throw new Error('findFirst method is not implemented');
    }
    findUnique(...args: unknown[]): unknown {
        throw new Error('findUnique method is not implemented');
    }
    findMany(...args: unknown[]): unknown {
        throw new Error('findMany method is not implemented');
    }
    create(...args: unknown[]): unknown {
        throw new Error('create method is not implemented');
    }
    delete(...args: unknown[]): unknown {
        throw new Error('delete method is not implemented');
    }
    update(...args: unknown[]): unknown {
        throw new Error('update method is not implemented');
    }
    deleteMany(...args: unknown[]): unknown {
        throw new Error('deleteMany method is not implemented');
    }
    updateMany(...args: unknown[]): unknown {
        throw new Error('updateMany method is not implemented');
    }
    upsert(...args: unknown[]): unknown {
        throw new Error('upsert method is not implemented');
    }
    count(...args: unknown[]): unknown {
        throw new Error('count method is not implemented');
    }
    aggregate(...args: unknown[]): unknown {
        throw new Error('aggregate method is not implemented');
    }
}
