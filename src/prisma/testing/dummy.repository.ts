/**
 * Base abstract class with empty methods.
 * Created for easy mocking by testing tools.
 */
export class DummyRepository {
    findFirst(..._args: unknown[]): unknown {
        throw new Error('findFirst method is not implemented');
    }
    findUnique(..._args: unknown[]): unknown {
        throw new Error('findUnique method is not implemented');
    }
    findMany(..._args: unknown[]): unknown {
        throw new Error('findMany method is not implemented');
    }
    create(..._args: unknown[]): unknown {
        throw new Error('create method is not implemented');
    }
    delete(..._args: unknown[]): unknown {
        throw new Error('delete method is not implemented');
    }
    update(..._args: unknown[]): unknown {
        throw new Error('update method is not implemented');
    }
    deleteMany(..._args: unknown[]): unknown {
        throw new Error('deleteMany method is not implemented');
    }
    updateMany(..._args: unknown[]): unknown {
        throw new Error('updateMany method is not implemented');
    }
    upsert(..._args: unknown[]): unknown {
        throw new Error('upsert method is not implemented');
    }
    count(..._args: unknown[]): unknown {
        throw new Error('count method is not implemented');
    }
    aggregate(..._args: unknown[]): unknown {
        throw new Error('aggregate method is not implemented');
    }
}
