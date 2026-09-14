/**
 * Store that loads test attempts together with their student and test data.
 *
 * Records are grouped by test title so the attempts grid can display each
 * evaluation under its corresponding test.
 */
Ext.define('EvalApp.store.TestAttempts', {
    extend: 'EvalApp.store.baseStore',

    alias: 'store.test-attempts',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'student_id', type: 'int' },
        { name: 'test_id', type: 'int' },

        { name: 'status', type: 'string' },

        { name: 'score', type: 'float', allowNull: true },
        { name: 'percentage', type: 'float', allowNull: true },
        { name: 'passed', type: 'boolean', allowNull: true },

        {
            name: 'started_at',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'submitted_at',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'graded_at',
            type: 'date',
            dateFormat: 'c'
        },

        { name: 'title', type: 'string' },
        { name: 'full_name', type: 'string' }
    ],

    groupField: 'title',

    proxy: {
        type: 'ajax',

        url: 'http://localhost:3000/api/attempts/',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'count',
            successProperty: 'success'
        }
    },

    autoLoad: true
});