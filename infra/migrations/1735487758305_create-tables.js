/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable(
        "user",
        {
            id: {
                type: "uuid",
                notNull: true,
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            username: {
                type: "varchar(30)",
                notNull: true,
                unique: true
            },
            email: {
                // maximum length of an email address
                type: "varchar(254)",
                notNull: true,
                unique: true
            },
            password: {
                type: "varchar(60)",
                notNull: true,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("(now() at time zone 'utc')"),
            }
        }
    );
    pgm.createTable(
        "template",
        {
            id: {
                type: "uuid",
                notNull: true,
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            name: {
                type: "varchar(100)",
                notNull: true,
                unique: true,
            },
            user_id: {
                type: "uuid",
                notNull: true,
                references: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
        }
    );
    pgm.createTable(
        "field",
        {
            id: {
                type: "uuid",
                notNull: true,
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            name: {
                type: "varchar(100)",
                notNull: true,
                unique: true,
            }
        }
    );
    pgm.createTable(
        "template_field",
        {
            template_id: {
                type: "uuid",
                notNull: true,
                references: "template",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            field_id: {
                type: "uuid",
                notNull: true,
                references: "field",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        },
        {
            "constraints": {
                "primaryKey": ["template_id", "field_id"]
            }
        }
    );
    pgm.createTable(
        "entry",
        {
            id: {
                type: "uuid",
                notNull: true,
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            name: {
                type: "varchar(100)",
                notNull: true,
            },
            template_id: {
                type: "uuid",
                notNull: true,
                references: "template",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            updated_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("(now() at time zone 'utc')"),
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("(now() at time zone 'utc')"),
            }
        }
    );
    pgm.createTable(
        "field_value",
        {
            id: {
                type: "uuid",
                notNull: true,
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            value: {
                type: "text",
                notNull: false,
            },
            is_computed: {
                type: "boolean",
                notNull: true,
                default: false
            },
            entry_id: {
                type: "uuid",
                notNull: true,
                references: "entry",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            field_id: {
                type: "uuid",
                notNull: true,
                references: "field",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        }
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
